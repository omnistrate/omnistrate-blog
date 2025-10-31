import { PostChip } from "@/app/components/post-chip";
import { DisplayMD, TextXL, TextXS } from "@/components/text";
import { BlogCategory } from "@/types/post";

import { Home } from "lucide-react";
import Link from "next/link";

type PostHeaderProps = {
  title: string;
  excerpt: string;
  readTime: string;
  category?: BlogCategory;
};

export const PostHeader: React.FC<PostHeaderProps> = ({ title, excerpt, readTime, category }) => {
  return (
    <div className="max-w-3xl">
      <Link href="/" className="rounded-full w-fit flex items-center border border-[#E3E8EF] py-0.5 px-2 mb-4">
        <Home className="w-3 h-3 mr-0.5" />
        <TextXS className="font-medium text-[#364152]">Blog</TextXS>
      </Link>

      <PostChip category={category || "Miscellaneous"} readTime={readTime} className="mb-4" />
      <DisplayMD className="tracking-tight mb-6">{title}</DisplayMD>
      <TextXL className="font-normal text-[#535862]">{excerpt}</TextXL>
    </div>
  );
};
