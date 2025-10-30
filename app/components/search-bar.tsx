import { forwardRef } from "react";
import { TextMD } from "@/components/text";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  currentPage?: number;
  totalPages?: number;
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ value = "", onChange, disabled = false, currentPage, totalPages }, ref) => {
    return (
      <div ref={ref} className="flex flex-col items-center mb-12 mt-8 lg:mt-12">
        <div className="relative w-full" style={{ maxWidth: "566px" }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search"
            className="w-full h-12 px-6 pr-12 text-[#535862] bg-white border border-[#D5D7DA] rounded-lg"
            style={{ boxShadow: "0px 1px 2px 0px #0A0D120D" }}
            disabled={disabled}
          />
        </div>
        {currentPage && totalPages && (
          <TextMD className="mt-4 font-medium">
            Page {currentPage} of {totalPages}
          </TextMD>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
