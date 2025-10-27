type PostTagsProps = {
  tags: string[];
  className?: string;
  align?: "left" | "center";
};

export const PostTags: React.FC<PostTagsProps> = ({ tags, className = "", align = "left" }) => {
  if (!tags || tags.length === 0) return null;

  const alignmentClass = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex flex-wrap gap-1 ${alignmentClass} ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
