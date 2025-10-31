import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

type PostBodyProps = {
  content: string;
};

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="mt-8">
      <article
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
            h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              format: "md"
            }
          }}
        />
      </article>
    </div>
  );
};
