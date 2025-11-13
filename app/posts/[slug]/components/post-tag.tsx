import { TextSM } from "@/components/text";

export const PostTag = ({ tag }: { tag: string }) => {
  return (
    <div className="border border-[#E3E8EF] bg-[#F8FAFC] rounded-full py-0.5 px-2.5">
      <TextSM className="font-medium text-[#364152]">{tag}</TextSM>
    </div>
  );
};
