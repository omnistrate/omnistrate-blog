import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { YouTubeEmbed } from "./youtube-embed";

type PostBodyProps = {
  content: string;
};

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="max-w-5xl mx-auto pt-6">
      <article
      // Some of the Styling for Code Blocks comes from global.css
        className="prose prose-sm md:prose-lg max-w-none
                   prose-a:no-underline prose-a:text-blue-600 prose-a:hover:underline prose-hr:hidden
                   prose-img:mx-auto"
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
