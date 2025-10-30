type PostBodyProps = {
  content: string;
};

export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className="prose prose-lg max-w-none dark:prose-invert 
                   prose-a:text-blue-600 [&_a]:no-underline [&_a:hover]:underline 
                   [&_hr]:hidden
                   [&_pre]:overflow-x-visible [&_pre]:whitespace-pre-wrap [&_pre]:break-words
                   [&_code]:whitespace-pre-wrap [&_code]:break-words" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};