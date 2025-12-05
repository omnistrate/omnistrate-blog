import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/actions/post";

import { Container } from "@/app/components/container";
import { PostHeader } from "./components/post-header";
import { PostBody } from "./components/post-body";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { CaseStudyPostHeader } from "./components/case-study-post-header";
import { CaseStudyPostBody } from "./components/case-study-post-body";
import { parseFiltersFromUrl } from "@/lib/filters";

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

export default async function Post({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // Parse filters from URL to preserve them when navigating back to homepage
  const rawSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams(
    Object.entries(rawSearchParams).reduce((acc, [key, value]) => {
      if (value) acc[key] = Array.isArray(value) ? value[0] : value;
      return acc;
    }, {} as Record<string, string>)
  );
  const returnFilters = parseFiltersFromUrl(urlSearchParams);

  return post.type === "Post" ? (
    <Container>
      <div className="mb-16 md:mb-24 mt-6 md:mt-8">
        <PostHeader
          title={post.title}
          readTime={`${post.readTime} min read`}
          category={post.category}
          author={post.author?.name || "Omnistrate Team"}
          date={post.date}
          tags={post.tags}
          returnFilters={returnFilters}
        />
        <PostBody post={post} />
      </div>
      <ScrollToTopButton />
    </Container>
  ) : (
    <>
      <CaseStudyPostHeader title={post.title} returnFilters={returnFilters} />
      <CaseStudyPostBody post={post} />
      <ScrollToTopButton />
    </>
  );
}
