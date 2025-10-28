import { Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  tags?: string[];
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
};
