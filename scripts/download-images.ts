import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const IMAGES_DIR = join(process.cwd(), "public", "images", "posts");
const DOWNLOAD_DELAY_MS = 2000; // 2 second delay between downloads to avoid rate limiting
const CHECK_DELAY_MS = 500; // 500ms delay between content-type checks

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Check if a URL returns an image by examining Content-Type header
const isImageUrl = async (url: string): Promise<boolean> => {
  try {
    console.log(`  Checking: ${url}`);
    const response = await fetch(url, { method: "HEAD" });

    if (!response.ok) {
      console.log(`   Not accessible (${response.status})`);
      return false;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType) {
      console.log(`   No content-type header`);
      return false;
    }

    const isImage = contentType.startsWith("image/");

    // Exclude animated GIFs by checking content-type
    if (contentType === "image/gif") {
      console.log(`   Skipping GIF (potentially animated)`);
      return false;
    }

    if (isImage) {
      console.log(`   Valid image (${contentType})`);
    } else {
      console.log(`   Not an image (${contentType})`);
    }

    return isImage;
  } catch (error) {
    console.log(`   Error checking URL: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
};

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

const getImageExtension = (url: string, contentType?: string): string => {
  // Try to get extension from content-type first
  if (contentType) {
    const typeMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      "image/bmp": "bmp",
      "image/tiff": "tiff",
    };
    if (typeMap[contentType]) {
      return typeMap[contentType];
    }
  }

  // Try to get extension from URL
  try {
    const urlPath = new URL(url).pathname;
    const match = urlPath.match(/\.([a-z0-9]+)$/i);
    if (match) {
      return match[1];
    }
  } catch {
    // Invalid URL
  }

  // Default to jpg if no extension found
  return "jpg";
};

const sanitizeFilename = (name: string): string => {
  return name.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
};

// Extract all URLs from markdown content
const extractAllUrls = (content: string): Set<string> => {
  const urls = new Set<string>();

  // Match inline images: ![alt](url)
  const inlineImageRegex = /!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g;
  let match;
  while ((match = inlineImageRegex.exec(content)) !== null) {
    urls.add(match[2].trim());
  }

  // Match reference-style definitions: [1]: url
  const referenceRegex = /\[([^\]]+)\]:\s*(https?:\/\/\S+)/g;
  while ((match = referenceRegex.exec(content)) !== null) {
    urls.add(match[2].trim());
  }

  // Match inline links (to catch any stray image URLs): [text](url)
  const inlineLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  while ((match = inlineLinkRegex.exec(content)) !== null) {
    urls.add(match[2].trim());
  }

  return urls;
};

const processMarkdownFile = async (filePath: string): Promise<void> => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const slug = data.slug || filePath.split("/").pop()?.replace(".md", "") || "unknown";
  let updatedContent = content;
  let imageCounter = 1;
  const imageMap = new Map<string, string>(); // URL -> local path
  let firstImagePath: string | null = null;

  console.log(`\nExtracting URLs from ${filePath}...`);

  // Extract all URLs from content
  const allUrls = extractAllUrls(content);

  // Also check coverImage from frontmatter
  if (data.coverImage && typeof data.coverImage === "string" && data.coverImage.startsWith("http")) {
    allUrls.add(data.coverImage);
  }

  console.log(`Found ${allUrls.size} unique URLs`);

  // Check each URL to see if it's an image
  const validImageUrls: string[] = [];
  for (const url of allUrls) {
    const isImage = await isImageUrl(url);
    if (isImage) {
      validImageUrls.push(url);
    }
    // Add delay between checks to avoid rate limiting
    await delay(CHECK_DELAY_MS);
  }

  console.log(`\nFound ${validImageUrls.length} valid image URLs`);

  // Download and replace each valid image URL
  for (const url of validImageUrls) {
    if (imageMap.has(url)) {
      console.log(`Already downloaded: ${url}`);
      continue;
    }

    // Get content type for better extension detection
    let contentType: string | undefined;
    try {
      const response = await fetch(url, { method: "HEAD" });
      contentType = response.headers.get("content-type") || undefined;
    } catch {
      // Ignore error, will use URL-based extension
    }

    const extension = getImageExtension(url, contentType);
    const filename = `${sanitizeFilename(slug)}-${imageCounter}.${extension}`;
    const localFilePath = join(IMAGES_DIR, filename);
    const publicPath = `/images/posts/${filename}`;

    console.log(`\nDownloading: ${url}`);
    console.log(`  -> ${filename}`);

    const success = await downloadImage(url, localFilePath);

    if (success) {
      imageMap.set(url, publicPath);

      // Track first image for coverImage
      if (!firstImagePath) {
        firstImagePath = publicPath;
      }

      // Replace all occurrences of this URL in the content
      updatedContent = updatedContent.split(url).join(publicPath);

      imageCounter++;
      console.log(`   Downloaded successfully`);

      // Add delay to avoid rate limiting
      await delay(DOWNLOAD_DELAY_MS);
    } else {
      console.log(`   Download failed`);
    }
  }

  // Update coverImage in frontmatter
  if (data.coverImage && typeof data.coverImage === "string" && data.coverImage.startsWith("http")) {
    if (imageMap.has(data.coverImage)) {
      data.coverImage = imageMap.get(data.coverImage)!;
      console.log(`\nUpdated coverImage in frontmatter`);
    }
  } else if (!data.coverImage && firstImagePath) {
    // If no coverImage is set, use the first image from the content
    data.coverImage = firstImagePath;
    console.log(`\nSet coverImage to first image: ${firstImagePath}`);
  }

  // Only update file if content changed
  const originalCoverImage = matter(fileContents).data.coverImage;
  if (updatedContent !== content || data.coverImage !== originalCoverImage) {
    const updatedFileContents = matter.stringify(updatedContent, data);
    fs.writeFileSync(filePath, updatedFileContents, "utf8");
    console.log(`\n Updated ${filePath}`);
    console.log(`  Images downloaded: ${imageMap.size}`);
  } else {
    console.log(`\n˜ No changes for ${filePath}`);
  }
};

const processAllPosts = async () => {
  const postsDirectory = join(process.cwd(), "posts");

  if (!fs.existsSync(postsDirectory)) {
    console.error("posts directory does not exist");
    process.exit(1);
  }

  const files = fs.readdirSync(postsDirectory);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  console.log(`Found ${markdownFiles.length} markdown files in posts directory`);
  console.log(`Images will be saved to: ${IMAGES_DIR}`);
  console.log(`Rate limiting: ${CHECK_DELAY_MS}ms between checks, ${DOWNLOAD_DELAY_MS}ms between downloads\n`);

  let processedCount = 0;
  let totalImagesDownloaded = 0;

  for (const file of markdownFiles) {
    const fullPath = join(postsDirectory, file);
    console.log(`\n${"=".repeat(80)}`);
    console.log(`Processing: ${file}`);
    console.log("=".repeat(80));

    try {
      const beforeCount = fs.readdirSync(IMAGES_DIR).length;
      await processMarkdownFile(fullPath);
      const afterCount = fs.readdirSync(IMAGES_DIR).length;
      const imagesDownloaded = afterCount - beforeCount;
      totalImagesDownloaded += imagesDownloaded;
      processedCount++;
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log(`\n${"=".repeat(80)}`);
  console.log(` Processed ${processedCount} posts`);
  console.log(` Downloaded ${totalImagesDownloaded} images total`);
  console.log(`Images saved to: ${IMAGES_DIR}`);
  console.log("=".repeat(80));
};

processAllPosts().catch((error) => {
  console.error("Error processing posts:", error);
  process.exit(1);
});
