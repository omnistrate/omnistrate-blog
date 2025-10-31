import Link from "next/link";
import Image from "next/image";

import { PostChip } from "./post-chip";
import { PostMetadata } from "@/types/post";
import { TextSM, TextXL } from "@/components/text";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: PostMetadata;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/posts/${encodeURIComponent(post.slug)}`}
        className={cn(
          "relative h-60 rounded-2xl flex items-center justify-center mb-4 overflow-hidden",
          post.coverImage && "border border-[#EDEDED]"
        )}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <Image
            src="/images/posts/default-cover.svg"
            alt={post.title}
            fill
            loading="lazy"
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </Link>
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
