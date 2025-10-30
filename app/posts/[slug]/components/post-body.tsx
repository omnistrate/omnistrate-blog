type PostBodyProps = {
  content: string;
};

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="mt-8">
      <div
        className="prose prose-sm lg:prose-lg max-w-none
                   prose-a:no-underline prose-a:text-blue-600 prose-a:hover:underline prose-hr:hidden
                   prose-pre:overflow-x-visible prose-pre:whitespace-pre-wrap prose-pre:break-words
                   prose-code:whitespace-pre-wrap prose-code:break-words prose-img:mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
