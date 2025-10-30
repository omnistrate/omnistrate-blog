import { Avatar } from "@/app/components/avatar";
import { DateFormatter } from "@/app/components/date-formatter";

import { Author } from "@/types/author";

type PostHeaderProps = {
  title: string;
  date: string;
  author: Author;
};

export const PostHeader: React.FC<PostHeaderProps> = ({ title, date, author }) => {
  return (
    <div className="py-12 md:py-16 mb-12 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto px-6 text-center" style={{ maxWidth: '1280px' }}>
        {/* Date */}
        <div className="mb-6">
          <time className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            <DateFormatter dateString={date} />
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
          {title}
        </h1>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <Avatar name={author.name} picture={author.picture} />
          <div className="text-left">
            <p className="text-gray-900 dark:text-white font-medium"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
