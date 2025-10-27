import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTags } from "./post-tags";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags?: string[];
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) {
  return (
    <div className="group">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} showTitle={true} />
      </div>
      
      {tags && tags.length > 0 && (
        <PostTags tags={tags} className="mb-3" />
      )}
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        <DateFormatter dateString={date} />
      </div>
      
      <p className="text-base leading-relaxed mb-4 text-gray-700 dark:text-gray-300">{excerpt}</p>
      
      <Avatar name={author?.name} picture={author?.picture} />
    </div>
  );
}