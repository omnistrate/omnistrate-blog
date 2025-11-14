import { PostChip } from "@/app/components/post-chip";
import { DisplaySM, TextSM, TextXS } from "@/components/text";
import { BlogCategory } from "@/types/post";
import { formatDate } from "@/lib/utils";

import { Home } from "lucide-react";
import Link from "next/link";
import { PostTag } from "./post-tag";

type PostHeaderProps = {
  title: string;
  readTime: string;
  category?: BlogCategory;
  author: string;
  date: string;
  tags?: string[];
};

export const PostHeader: React.FC<PostHeaderProps> = ({ title, readTime, category, author, date, tags }) => {
  return (
    <div className="max-w-full">
      <Link
        href="/"
        className="block w-fit rounded-full mb-4 bg-gradient-to-t from-[#FFFFFF] to-[#FFFFFF1F] p-0.5 shadow-[0_1px_2px_0_#0A0D120D]"
      >
        <div className="flex items-center py-2 px-3 bg-[#121926] rounded-full">
          <Home className="w-5 h-5 mr-1.5 text-[#FFFFFF]" />
          <TextSM className="font-semibold text-[#FFFFFF]">Blog</TextSM>
        </div>
      </Link>

      <PostChip category={category || "Miscellaneous"} readTime={readTime} className="mb-4" />
      <DisplaySM className="font-bold text-[#181D27] mb-4">{title}</DisplaySM>

      <TextXS className="mb-4 font-medium text-[#181D27]">
        <span className="font-semibold">
          by{" "}
          <Link href={`/?author=${encodeURIComponent(author)}`} className="text-blue-600">
            {author}
          </Link>
        </span>{" "}
        | {formatDate(date)}
      </TextXS>

      <div className="pt-3 flex flex-wrap gap-2 border-t border-[#E9EAEB] mb-8">
        {tags?.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
