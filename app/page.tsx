"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "./components/container";
import { PostCard } from "./components/post-card";
import { SearchBar } from "./components/search-bar";
import { LoadingState } from "./components/loading-state";
import postsMetadata from "@/data/posts-metadata.json";
import { DisplayMD, TextMD } from "@/components/text";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseFiltersFromUrl, buildUrlWithFilters } from "@/lib/filters";

const CATEGORIES = [
  { value: "all", label: "View all" },
  { value: "Industry Insights", label: "Industry Insights" },
  { value: "Customer Stories", label: "Customer Stories" },
  { value: "Engineering & Tech", label: "Engineering & Tech" },
  { value: "Partners & Ecosystem", label: "Partners & Ecosystem" },
  { value: "Product Updates", label: "Product Updates" }
];

const StyledTabTrigger = (props: React.ComponentProps<typeof TabsTrigger>) => (
  <TabsTrigger
    {...props}
    className="text-[#717680] data-[state=active]:text-[#414651] font-semibold text-sm data-[state=active]:bg-white data-[state=active]:border-[#D5D7DA] data-[state=active]:border data-[state=active]:shadow-none cursor-pointer rounded-md"
  />
);

function Homepage() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filters from URL params
  const initialFilters = parseFiltersFromUrl(searchParams);

  const [searchTerm, setSearchTerm] = useState(initialFilters.search || "");
  const [selectedAuthor, setSelectedAuthor] = useState<string>(initialFilters.author || "all");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilters.category || "all");

  const filteredPosts = useMemo(() => {
    let filtered = postsMetadata;

    // Filter by Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by Author
    if (selectedAuthor !== "all") {
      filtered = filtered.filter((post) => post.author?.name === selectedAuthor);
    }

    // Filter by Search Term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(term);
        const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(term)) || false;
        return titleMatch || tagMatch;
      });
    }

    return filtered;
  }, [searchTerm, selectedAuthor, selectedCategory]);

  // Sorted By Post Count
  const authors = useMemo(() => {
    const authorCount: Record<string, number> = {};
    postsMetadata.forEach((post) => {
      if (post.author) {
        authorCount[post.author.name] = (authorCount[post.author.name] || 0) + 1;
      }
    });
    return Object.keys(authorCount).sort((a, b) => authorCount[b] - authorCount[a]);
  }, []);

  // Update URL whenever filters change
  const updateUrl = useCallback(
    (filters: { category: string; author: string; search: string }) => {
      const url = buildUrlWithFilters("/", filters);
      router.replace(url);
    },
    [router]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      updateUrl({ category, author: selectedAuthor, search: searchTerm });
    },
    [selectedAuthor, searchTerm, updateUrl]
  );

  const handleAuthorChange = useCallback(
    (author: string) => {
      setSelectedAuthor(author);
      updateUrl({ category: selectedCategory, author, search: searchTerm });
    },
    [selectedCategory, searchTerm, updateUrl]
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      setSearchTerm(search);
      updateUrl({ category: selectedCategory, author: selectedAuthor, search });
    },
    [selectedCategory, selectedAuthor, updateUrl]
  );

  return (
    <Container>
      <TextMD className="text-center mb-3 mt-8 md:mt-12 lg:mt-16"></TextMD>
      <DisplayMD className="text-center mb-6 tracking-tight font-semibold">
        Platform Engineering Blog: Architecture, Automation & Scale
      </DisplayMD>

      <SearchBar ref={searchBarRef} value={searchTerm} onChange={handleSearchChange} />

      <div className="flex flex-row items-stretch lg:items-center justify-between gap-x-4 gap-y-4 lg:gap-y-6 mb-6">
        {/* Category Select - Mobile Only */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="flex-1 max-w-[calc(50%-0.5rem)] lg:hidden">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="max-h-[240px]">
            <SelectGroup>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Category Tabs - Desktop Only */}
        <Tabs
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="hidden lg:block lg:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <TabsList className="gap-x-2 p-0 border border-[#E9EAEB] bg-[#FAFAFA] rounded-md flex-nowrap w-max">
            {CATEGORIES.map((category) => (
              <StyledTabTrigger key={category.value} value={category.value}>
                {category.label}
              </StyledTabTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Author Select */}
        <Select value={selectedAuthor} onValueChange={handleAuthorChange}>
          <SelectTrigger className="flex-1 max-w-[calc(50%-0.5rem)] lg:max-w-[170px]">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent className="max-h-[240px]">
            <SelectGroup>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16 md:mb-20">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              // @ts-expect-error Need to fix this
              post={post}
              currentFilters={{ category: selectedCategory, author: selectedAuthor, search: searchTerm }}
            />
          ))}
        </div>
      ) : (
        <LoadingState
          message={
            searchTerm || selectedAuthor !== "all" || selectedCategory !== "all"
              ? `No posts found${searchTerm ? ` matching "${searchTerm}"` : ""}${
                  selectedCategory !== "all" ? ` in ${selectedCategory}` : ""
                }${selectedAuthor !== "all" ? ` by ${selectedAuthor}` : ""}`
              : "No posts found."
          }
        />
      )}
      <ScrollToTopButton />
    </Container>
  );
}

export default Homepage;
