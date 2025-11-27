import { Author } from "./author";

export type BlogCategory =
  | "Product Updates"
  | "Industry Insights"
  | "Customer Stories"
  | "Engineering & Tech"
  | "Partners & Ecosystem"
  | "Miscellaneous";

export type PostType = "Post" | "Case Study";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  tags?: string[];
  readTime?: number;
  category?: BlogCategory;
  type: PostType;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};

export type PostMetadata = {
  slug: string;
  title: string;
  date: string;
  author?: Author;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  readTime?: number;
  category?: BlogCategory;
  type: PostType;
};
