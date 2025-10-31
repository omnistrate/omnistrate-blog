import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const IMAGES_DIR = join(process.cwd(), "public", "images", "posts");
const DOWNLOAD_DELAY_MS = 1000; // 1 second delay between downloads to avoid rate limiting

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const downloadImage = async (url: string, filepath: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
      return false;
    }

    const fileStream = createWriteStream(filepath);
    await pipeline(response.body as any, fileStream);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
};

const getImageExtension = (url: string): string => {
  // Try to get extension from URL
  const urlPath = new URL(url).pathname;
  const match = urlPath.match(/\.([a-z0-9]+)$/i);
  if (match) {
    return match[1];
  }

  // Default to jpg if no extension found
  return "jpg";
};

const sanitizeFilename = (name: string): string => {
  return name.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
};

const isImageUrl = (url: string): boolean => {
  // Check if URL has an image extension
  const imageExtensions = /\.(jpg|jpeg|png|gif|svg|webp|bmp|ico|tiff)(\?.*)?$/i;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const pathname = urlObj.pathname.toLowerCase();

    // Check for common image hosting services
    const imageHosts = [
      'drive.google.com',        // Google Drive
      'imgur.com',               // Imgur
      'i.imgur.com',             // Imgur direct
      'mcusercontent.com',       // Mailchimp
      'cloudinary.com',          // Cloudinary
      'amazonaws.com',           // AWS S3
      'googleusercontent.com',   // Google User Content
      'githubusercontent.com',   // GitHub
      'unsplash.com',           // Unsplash
      'pexels.com',             // Pexels
      'images.unsplash.com',    // Unsplash
      'res.cloudinary.com'      // Cloudinary
    ];

    // If it's from a known image hosting service, assume it's an image
    if (imageHosts.some(host => hostname.includes(host))) {
      return true;
    }

    // Otherwise check for file extension
    return imageExtensions.test(pathname);
  } catch {
    return false;
  }
};

const processMarkdownFile = async (filePath: string): Promise<void> => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const slug = data.slug || filePath.split("/").pop()?.replace(".md", "") || "unknown";
  let updatedContent = content;
  let imageCounter = 1;
  const imageMap = new Map<string, string>(); // URL -> local path
  let firstImagePath: string | null = null; // Track the first image for coverImage

  // Find all image URLs (inline and reference-style)
  const inlineImageRegex = /!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g;
  const referenceImageUsageRegex = /!\[([^\]]*)\]\[(\d+)\]/g;
  const referenceImageRegex = /\[(\d+)\]:\s*(https?:\/\/\S+)/g;

  // Process inline images
  let match;
  const inlineMatches: Array<{ alt: string; url: string }> = [];
  while ((match = inlineImageRegex.exec(content)) !== null) {
    inlineMatches.push({ alt: match[1], url: match[2] });
  }

  // Find which reference numbers are actually used for images
  const usedImageRefs = new Set<string>();
  while ((match = referenceImageUsageRegex.exec(content)) !== null) {
    usedImageRefs.add(match[2]); // match[2] is the reference number
  }

  // Process reference-style image URLs (only those used as images)
  const referenceMatches: Array<{ ref: string; url: string }> = [];
  while ((match = referenceImageRegex.exec(content)) !== null) {
    const ref = match[1];
    const url = match[2];

    // Only include if this reference is used for an image AND the URL looks like an image
    if (usedImageRefs.has(ref) && isImageUrl(url)) {
      referenceMatches.push({ ref, url });
    }
  }

  // Download and replace inline images
  for (const { alt, url } of inlineMatches) {
    // Skip if not an image URL
    if (!isImageUrl(url)) {
      console.log(`Skipping non-image URL: ${url}`);
      continue;
    }

    if (imageMap.has(url)) {
      // Already processed this URL
      const localPath = imageMap.get(url)!;
      updatedContent = updatedContent.replace(url, localPath);
      continue;
    }

    const extension = getImageExtension(url);
    const filename = `${sanitizeFilename(slug)}-${imageCounter}.${extension}`;
    const localFilePath = join(IMAGES_DIR, filename);
    const publicPath = `/images/posts/${filename}`;

    console.log(`Downloading: ${url} -> ${filename}`);
    const success = await downloadImage(url, localFilePath);

    if (success) {
      imageMap.set(url, publicPath);
      updatedContent = updatedContent.replace(url, publicPath);

      // Track first image for coverImage
      if (!firstImagePath) {
        firstImagePath = publicPath;
      }

      imageCounter++;

      // Add delay to avoid rate limiting
      await delay(DOWNLOAD_DELAY_MS);
    }
  }

  // Download and replace reference-style images
  for (const { ref, url } of referenceMatches) {
    if (imageMap.has(url)) {
      // Already processed this URL
      const localPath = imageMap.get(url)!;
      updatedContent = updatedContent.replace(`[${ref}]: ${url}`, `[${ref}]: ${localPath}`);
      continue;
    }

    const extension = getImageExtension(url);
    const filename = `${sanitizeFilename(slug)}-${imageCounter}.${extension}`;
    const localFilePath = join(IMAGES_DIR, filename);
    const publicPath = `/images/posts/${filename}`;

    console.log(`Downloading: ${url} -> ${filename}`);
    const success = await downloadImage(url, localFilePath);

    if (success) {
      imageMap.set(url, publicPath);
      updatedContent = updatedContent.replace(`[${ref}]: ${url}`, `[${ref}]: ${publicPath}`);

      // Track first image for coverImage
      if (!firstImagePath) {
        firstImagePath = publicPath;
      }

      imageCounter++;

      // Add delay to avoid rate limiting
      await delay(DOWNLOAD_DELAY_MS);
    }
  }

  // Update coverImage in frontmatter
  // Priority: 1) Download remote coverImage, 2) Use first image in content if no coverImage set
  if (data.coverImage && data.coverImage.startsWith("http")) {
    if (imageMap.has(data.coverImage)) {
      data.coverImage = imageMap.get(data.coverImage)!;
      // Track as first image if not already set
      if (!firstImagePath) {
        firstImagePath = data.coverImage;
      }
    } else {
      const extension = getImageExtension(data.coverImage);
      const filename = `${sanitizeFilename(slug)}-cover.${extension}`;
      const localFilePath = join(IMAGES_DIR, filename);
      const publicPath = `/images/posts/${filename}`;

      console.log(`Downloading cover: ${data.coverImage} -> ${filename}`);
      const success = await downloadImage(data.coverImage, localFilePath);

      if (success) {
        data.coverImage = publicPath;
        // Track as first image if not already set
        if (!firstImagePath) {
          firstImagePath = publicPath;
        }
        // Add delay to avoid rate limiting
        await delay(DOWNLOAD_DELAY_MS);
      }
    }
  } else if (!data.coverImage && firstImagePath) {
    // If no coverImage is set, use the first image from the content
    data.coverImage = firstImagePath;
    console.log(`Setting coverImage to first image: ${firstImagePath}`);
  }

  // Only update file if content changed
  if (updatedContent !== content || data.coverImage !== matter(fileContents).data.coverImage) {
    const updatedFileContents = matter.stringify(updatedContent, data);
    fs.writeFileSync(filePath, updatedFileContents, "utf8");
    console.log(`✓ Updated ${filePath}`);
  } else {
    console.log(`⊘ No changes for ${filePath}`);
  }
};

const processAllPosts = async () => {
  const postsDirectory = join(process.cwd(), "posts");

  if (!fs.existsSync(postsDirectory)) {
    console.error("posts directory does not exist");
    process.exit(1);
  }

  const files = fs.readdirSync(postsDirectory);
  let processedCount = 0;

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = join(postsDirectory, file);
    console.log(`\nProcessing: ${file}`);

    try {
      await processMarkdownFile(fullPath);
      processedCount++;
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log(`\n✓ Processed ${processedCount} posts`);
  console.log(`Images saved to: ${IMAGES_DIR}`);
};

processAllPosts().catch((error) => {
  console.error("Error processing posts:", error);
  process.exit(1);
});
