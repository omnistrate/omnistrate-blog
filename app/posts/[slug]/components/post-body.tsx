import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MDXRemote } from "next-mdx-remote/rsc";

import { YouTubeEmbed } from "./post-components/youtube-embed";
import { CodeBlock } from "./post-components/code-block";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

type PostBodyProps = {
  post: Post;
};

export const PostBody: React.FC<PostBodyProps> = ({ post }) => {
  const { content = "" } = post;

  return (
    <div className="max-w-5xl mx-auto pt-6">
      <article
        // Some of the Styling for Code Blocks comes from global.css
        className={cn("prose prose-sm md:prose-lg max-w-none", "prose-hr:hidden prose-img:mx-auto")}
      >
        <MDXRemote
          source={content}
          components={{
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                {...props}
              >
                {children}
              </a>
            ),
            h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
            pre: CodeBlock,
            YouTube: ({ videoId }: { videoId: string }) => <YouTubeEmbed videoId={videoId} />
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
              format: "mdx"
            }
          }}
        />
      </article>
    </div>
  );
};
