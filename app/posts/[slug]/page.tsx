import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/actions/post";

import { Container } from "@/app/components/container";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { PostHeader } from "./components/post-header";
import { PostTags } from "./components/post-tags";
import { PostBody } from "./components/post-body";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="pt-16">
      <Container>
        <div className="py-8">
          <article className="mb-16">
            <PostHeader title={post.title} date={post.date} author={post.author} />
            {post.tags && post.tags.length > 0 && <PostTags tags={post.tags} className="mb-8" align="center" />}
            <PostBody content={content} />
          </article>
        </div>
      </Container>
    </main>
  );
}

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
      description: post.excerpt || "Engineering insights from the Omnistrate team",
      images: post?.ogImage?.url ? [post.ogImage.url] : ["/default.webp"]
    }
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
