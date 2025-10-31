import type { MetadataRoute } from "next";
import { getAllPosts } from "@/actions/post";
import { SITE_URL } from "@/constants/site";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...postEntries
  ];
};

export default sitemap;
