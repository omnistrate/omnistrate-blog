import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function SearchBar({ value = "", onChange, disabled = false }: SearchBarProps) {
  return (
    <div className="flex justify-center mb-12 mt-16 mb:mt-20 lg:mt-24">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search by title or tag (cloud, kubernetes)..."
          className="w-full px-6 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={disabled}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
