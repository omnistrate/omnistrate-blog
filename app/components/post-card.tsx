import Link from "next/link";
import Image from "next/image";

import { PostChip } from "./post-chip";
import { PostMetadata } from "@/types/post";
import { TextSM, TextXL } from "@/components/text";
import { cn } from "@/lib/utils";
import { BlogCategory } from "@/types/post";

type PostCardProps = {
  post: PostMetadata;
};

const getCategoryDefaultImage = (category: BlogCategory): string => {
  const categoryImages: Record<BlogCategory, string> = {
    "Product Updates": "/images/posts/product-updates.svg",
    "Engineering & Tech": "/images/posts/eng-tech.svg",
    "Partners & Ecosystem": "/images/posts/partners.svg",
    "Customer Stories": "/images/posts/customer-stories.svg",
    "Industry Insights": "/images/posts/industry-insights.svg",
    Miscellaneous: "/images/posts/default-cover.svg"
  };

  return categoryImages[category];
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const defaultImage = getCategoryDefaultImage(post.category || "Miscellaneous");

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "p-1 h-60 rounded-2xl flex items-center justify-center overflow-hidden mb-4",
          post.coverImage && "border border-[#EDEDED]"
        )}
      >
        <Link
          href={`/posts/${encodeURIComponent(post.slug)}`}
          className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-xl"
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              loading="lazy"
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={defaultImage}
              alt={post.title}
              fill
              loading="lazy"
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <PostChip category={post.category || "Miscellaneous"} readTime={`${post.readTime} min read`} />

        <div className="flex-1">
          <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="flex gap-4 mb-2">
            <TextXL className="line-clamp-2">{post.title}</TextXL>
          </Link>

          <TextSM className="mb-6 line-clamp-3">{post.excerpt}</TextSM>
        </div>

        <TextSM className="font-semibold text-[#202939]">
          {post.author?.name} •{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </TextSM>
      </div>
    </div>
  );
};
