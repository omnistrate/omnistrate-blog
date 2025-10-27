import type { MetadataRoute } from "next";
import { getAllPosts } from "@/actions/post";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://blog.omnistrate.com/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [
    {
      url: "https://blog.omnistrate.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...postEntries
  ];
};

export default sitemap;
