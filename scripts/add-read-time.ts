import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// Average reading speed: 200 words per minute
const WORDS_PER_MINUTE = 200;

const calculateReadTime = (content: string): number => {
  // Remove markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links (keep text)
    .replace(/#+ /g, "") // Remove headers
    .replace(/[*_~]/g, "") // Remove emphasis markers
    .replace(/\n/g, " "); // Replace newlines with spaces

  // Count words
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate read time in minutes (round up to nearest minute)
  const readTime = Math.ceil(words / WORDS_PER_MINUTE);

  return readTime;
};

const extractFirstImage = (content: string): string => {
  // First, try to match inline image syntax: ![alt](url)
  const inlineImageRegex = /!\[.*?\]\((.*?)\)/;
  const inlineMatch = content.match(inlineImageRegex);

  if (inlineMatch) {
    return inlineMatch[1];
  }

  // If no inline image, try reference-style: ![alt][ref] with [ref]: url
  const referenceImageRegex = /!\[.*?\]\[(\d+)\]/;
  const referenceMatch = content.match(referenceImageRegex);

  if (referenceMatch) {
    const refNumber = referenceMatch[1];
    // Find the reference definition: [1]: url
    const urlRegex = new RegExp(`\\[${refNumber}\\]:\\s*(.+?)(?:\\n|$)`, 'm');
    const urlMatch = content.match(urlRegex);

    if (urlMatch) {
      return urlMatch[1].trim();
    }
  }

  return "";
};

const addReadTimeToPost = (filePath: string): void => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Check if both readTime and coverImage already exist (and coverImage is not empty)
  if (data.readTime && data.coverImage !== undefined && data.coverImage !== "") {
    console.log(`⊘ Skipped ${filePath} (readTime and coverImage already exist)`);
    return;
  }

  let updated = false;

  // Calculate and add read time if it doesn't exist
  if (!data.readTime) {
    const readTime = calculateReadTime(content);
    data.readTime = readTime;
    updated = true;
  }

  // Extract and add cover image if it doesn't exist or is empty
  if (data.coverImage === undefined || data.coverImage === "") {
    const coverImage = extractFirstImage(content);
    data.coverImage = coverImage;
    updated = true;
  }

  if (!updated) {
    console.log(`⊘ Skipped ${filePath} (no updates needed)`);
    return;
  }

  // Reconstruct the file with updated front matter
  const updatedContent = matter.stringify(content, data);

  // Write back to file
  fs.writeFileSync(filePath, updatedContent, "utf8");

  console.log(`✓ Updated ${filePath}`);
};

const addReadTimeToAllPosts = async () => {
  const postsDirectory = join(process.cwd(), "posts");

  if (!fs.existsSync(postsDirectory)) {
    console.error("posts directory does not exist");
    process.exit(1);
  }

  const files = fs.readdirSync(postsDirectory);
  let processedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const fullPath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    if (data.readTime && data.coverImage !== undefined && data.coverImage !== "") {
      skippedCount++;
    } else {
      processedCount++;
    }

    addReadTimeToPost(fullPath);
  }

  console.log(`\n✓ Processed ${processedCount} posts`);
  console.log(`⊘ Skipped ${skippedCount} posts`);
};

addReadTimeToAllPosts().catch((error) => {
  console.error("Error adding read time:", error);
  process.exit(1);
});
