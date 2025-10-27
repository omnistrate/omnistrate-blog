import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

import { Post } from "@/types/post";

const postsDirectory = join(process.cwd(), "posts");

// Helper function to parse tags from either string or array format
function parseTags(tags: string): string[] {
  if (!tags) return [];

  // If already an array, return it
  if (Array.isArray(tags)) {
    return tags;
  }

  // If it's a string like "aws, cloud, kubernetes", split by comma
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn("_posts directory does not exist");
      return [];
    }

    const files = fs.readdirSync(postsDirectory);
    console.log("Found files in _posts:", files.length);

    // Filter only .md files and extract slugs (remove date prefix and .md)
    const slugs = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        // Remove date prefix (YYYY-MM-DD-) and .md extension
        return file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      });

    console.log("Extracted slugs:", slugs.length);
    return slugs;
  } catch (error) {
    console.error("Error reading _posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.md$/, "");

    // Find the actual file that matches this slug
    const files = fs.readdirSync(postsDirectory);
    const matchingFile = files.find((file) => {
      // Match files like: YYYY-MM-DD-slug.md or slug.md
      return file.endsWith(`${realSlug}.md`) || file === `${realSlug}.md`;
    });

    if (!matchingFile) {
      console.warn(`Post file not found for slug: ${realSlug}`);
      return null;
    }

    const fullPath = join(postsDirectory, matchingFile);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Post file not found: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    console.log("Successfully loaded post:", realSlug);

    // Parse tags and return post
    return {
      ...data,
      slug: realSlug,
      content,
      tags: parseTags(data.tags) // ← Parse tags here
    } as Post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  try {
    console.log("Getting all posts...");

    const slugs = getPostSlugs();

    if (slugs.length === 0) {
      console.warn("No post files found in _posts directory");
      return [];
    }

    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is Post => post !== null)
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

    console.log(`Successfully loaded ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}
