type PostBodyProps = {
  content: string;
};

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
