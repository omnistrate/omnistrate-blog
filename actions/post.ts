"use server";

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

const postsDirectory = join(process.cwd(), "posts");

function parseTags(tags: string | string[]): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn("posts directory does not exist");
      return [];
    }

    const files = fs.readdirSync(postsDirectory);

    const slugs = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, ""));

    return slugs;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const files = fs.readdirSync(postsDirectory);
    const matchingFile = files.find((file) => {
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

    return {
      ...data,
      slug: realSlug,
      content,
      tags: parseTags(data.tags)
    } as Post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const slugs = await getPostSlugs();

    if (slugs.length === 0) {
      console.warn("No post files found in posts directory");
      return [];
    }

    const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
      .filter((post): post is Post => post !== null)
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

    return posts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}
