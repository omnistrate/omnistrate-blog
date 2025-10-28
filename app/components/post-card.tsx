import Link from "next/link";
import { PostTags } from "@/app/posts/[slug]/components/post-tags";
import { PostMetadata } from "@/types/post";

type PostCardProps = {
  post: PostMetadata;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="group flex h-full">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col w-full">
        <div className="relative aspect-video bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex items-center justify-center p-4">
            <h3 className="font-bold text-xl md:text-2xl text-white text-center leading-tight drop-shadow-lg line-clamp-3">
              {post.title}
            </h3>
          </div>
        </div>

        <div className="p-6 flex flex-col h-full">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex-shrink-0 max-h-[3.5rem] overflow-hidden">
              <PostTags tags={post.tags} />
            </div>
          )}

          <div className="flex-grow flex flex-col min-h-0">
            {post.excerpt && (
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className="truncate">{post.author?.name || "Omnistrate Team"}</span>
            <span className="ml-2 whitespace-nowrap">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
