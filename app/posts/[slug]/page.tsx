import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/actions/post";

import { Container } from "@/app/components/container";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { PostHeader } from "./components/post-header";
import { PostBody } from "./components/post-body";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Omnistrate Engineering Blog`;

  return {
    title,
    description: post.excerpt || "Engineering insights from the Omnistrate team",
    openGraph: {
      title,
      description: post.excerpt || "Engineering insights from the Omnistrate team"
    }
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <Container>
      <article className="mb-16 md:mb-24 mt-6 md:mt-8">
        <PostHeader title={post.title} excerpt={post.excerpt} readTime={`${post.readTime} min read`} />
        <PostBody content={content} />
      </article>
    </Container>
  );
}
