"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
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

const POSTS_PER_PAGE = 24;

const StyledTabTrigger = (props: React.ComponentProps<typeof TabsTrigger>) => (
  <TabsTrigger
    {...props}
    className="text-[#717680] data-[state=active]:text-[#414651] font-semibold text-sm data-[state=active]:bg-white data-[state=active]:border-[#D5D7DA] data-[state=active]:border data-[state=active]:shadow-none cursor-pointer rounded-md"
  />
);

function Homepage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialAuthor = searchParams.get("author") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>(initialAuthor);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    setDisplayCount(POSTS_PER_PAGE); // Reset display count when search, author, or category filter changes
  }, [searchTerm, selectedAuthor, selectedCategory]);

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

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, displayCount);
  }, [filteredPosts, displayCount]);

  const hasMore = displayCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
    }
  }, [hasMore, filteredPosts.length]);

  // Infinite Scroll Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loadMore]);

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

  const handleAuthorChange = useCallback(
    (author: string) => {
      setSelectedAuthor(author);
      // Update URL with author query parameter
      if (author !== "all") {
        router.push(`/?author=${encodeURIComponent(author)}`);
      } else {
        router.push("/");
      }
    },
    [router]
  );

  return (
    <Container>
      <TextMD className="text-center mb-3 mt-8 md:mt-12 lg:mt-16"></TextMD>
      <DisplayMD className="text-center mb-6 tracking-tight font-semibold">
        Platform Engineering Blog: Architecture, Automation & Scale
      </DisplayMD>

      <SearchBar ref={searchBarRef} value={searchTerm} onChange={setSearchTerm} />

      <div className="hidden sm:flex flex-col lg:flex-row items-center justify-between gap-x-4 gap-y-6 mb-6">
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full lg:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <TabsList className="gap-x-2 p-0 border border-[#E9EAEB] bg-[#FAFAFA] rounded-md flex-nowrap w-max">
            <StyledTabTrigger value="all">View all</StyledTabTrigger>
            <StyledTabTrigger value="Industry Insights">Industry Insights</StyledTabTrigger>
            <StyledTabTrigger value="Customer Stories">Customer Stories</StyledTabTrigger>
            <StyledTabTrigger value="Engineering & Tech">Engineering & Tech</StyledTabTrigger>
            <StyledTabTrigger value="Partners & Ecosystem">Partners & Ecosystem</StyledTabTrigger>
            <StyledTabTrigger value="Product Updates">Product Updates</StyledTabTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedAuthor} onValueChange={handleAuthorChange}>
          <SelectTrigger className="w-full sm:w-[240px] lg:w-[170px]">
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16 md:mb-20">
            {displayedPosts.map((post) => (
              // @ts-expect-error Need to fix this
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-8 mb-16">
              <div className="flex items-center gap-2 text-[#535862]">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#535862]"></div>
                <TextMD>Loading more posts...</TextMD>
              </div>
            </div>
          )}
        </>
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
