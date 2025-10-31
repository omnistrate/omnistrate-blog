import { TextXS } from "@/components/text";
import { cn } from "@/lib/utils";

type PostChipProps = {
  category: string;
  readTime: string;
} & React.ComponentProps<"div">;

export const PostChip: React.FC<PostChipProps> = ({ category, readTime, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "w-fit mb-4 flex items-center rounded-full p-1 pr-2.5 border border-[#E3E8EF] bg-[#F8FAFC] gap-2",
        props.className
      )}
    >
      <TextXS className="bg-[#FFFFFF] border border-[#E3E8EF] rounded-full px-2 py-0.5">{category}</TextXS>
      <TextXS>{readTime}</TextXS>
    </div>
  );
};
