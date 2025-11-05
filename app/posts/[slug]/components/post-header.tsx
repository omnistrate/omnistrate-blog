import { PostChip } from "@/app/components/post-chip";
import { DisplayMD, TextXL, TextXS } from "@/components/text";
import { BlogCategory } from "@/types/post";
import { formatDate } from "@/lib/utils";

import { Home } from "lucide-react";
import Link from "next/link";

type PostHeaderProps = {
  title: string;
  readTime: string;
  category?: BlogCategory;
  author: string;
  date: string;
};

export const PostHeader: React.FC<PostHeaderProps> = ({ 
  title, 
  readTime, 
  category,
  author,
  date 
}) => {
  return (
    <div className="max-w-full">
      <Link href="/" className="rounded-full w-fit flex items-center border border-[#E3E8EF] py-0.5 px-2 mb-4">
        <Home className="w-3 h-3 mr-0.5" />
        <TextXS className="font-medium text-[#364152]">Blog</TextXS>
      </Link>

      <PostChip category={category || "Miscellaneous"} readTime={readTime} className="mb-6" />
      <DisplayMD className="tracking-tight mb-8">{title}</DisplayMD>
      

      <div className="mb-8">
        <span  className="text-sm font-normal text-gray-500">by</span> <span className="text-sm font-semibold text-gray-700"> {author}</span>
          
        <span className="text-sm font-normal text-gray-500"> |</span>
        <time dateTime={date} className="text-sm font-normal text-gray-500"> {formatDate(date)}</time>
          
        
      </div>

     
    </div>
  );
};