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

const addReadTimeToPost = (filePath: string): void => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Skip if readTime already exists
  if (data.readTime) {
    console.log(`⊘ Skipped ${filePath} (readTime already exists)`);
    return;
  }

  // Calculate read time
  const readTime = calculateReadTime(content);

  // Add readTime to front matter
  data.readTime = readTime;

  // Reconstruct the file with updated front matter
  const updatedContent = matter.stringify(content, data);

  // Write back to file
  fs.writeFileSync(filePath, updatedContent, "utf8");

  console.log(`✓ Added readTime (${readTime} min) to ${filePath}`);
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

    if (data.readTime) {
      skippedCount++;
    } else {
      processedCount++;
    }

    addReadTimeToPost(fullPath);
  }

  console.log(`\n✓ Processed ${processedCount} posts`);
  console.log(`⊘ Skipped ${skippedCount} posts (already had readTime)`);
};

addReadTimeToAllPosts().catch((error) => {
  console.error("Error adding read time:", error);
  process.exit(1);
});
