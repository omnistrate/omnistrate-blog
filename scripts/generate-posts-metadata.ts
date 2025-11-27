import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { PostMetadata } from "@/types/post";

const parseTags = (tags: string | string[]): string[] => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const generateMetadata = async () => {
  const postsDirectory = join(process.cwd(), "posts");
  const dataDirectory = join(process.cwd(), "data");
  const outputPath = join(dataDirectory, "posts-metadata.json");

  if (!fs.existsSync(postsDirectory)) {
    console.error("posts directory does not exist");
    process.exit(1);
  }

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  const files = fs.readdirSync(postsDirectory);
  const posts: PostMetadata[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const fullPath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "");

    posts.push({
      slug,
      title: data.title || "",
      date: data.date || "",
      author: data.author,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      tags: parseTags(data.tags),
      readTime: data.readTime,
      category: data.category,
      type: data.type || "Post"
    });
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2), "utf8");
  console.log(`✓ Generated metadata for ${posts.length} posts → ${outputPath}`);
};

generateMetadata().catch((error) => {
  console.error("Error generating metadata:", error);
  process.exit(1);
});
