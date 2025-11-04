"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Container } from "./components/container";
import { PostCard } from "./components/post-card";
import { SearchBar } from "./components/search-bar";
import { LoadingState } from "./components/loading-state";
import postsMetadata from "@/data/posts-metadata.json";
import { DisplayLG, TextMD, TextXL } from "@/components/text";

const POSTS_PER_PAGE = 24;

function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayCount(POSTS_PER_PAGE); // Reset display count when search changes
  }, [searchTerm]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return postsMetadata;

    const term = searchTerm.toLowerCase();
    return postsMetadata.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term);
      const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(term)) || false;
      return titleMatch || tagMatch;
    });
  }, [searchTerm]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, displayCount);
  }, [filteredPosts, displayCount]);

  const hasMore = displayCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
    }
  }, [hasMore, filteredPosts.length]);

  // Infinite scroll observer
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

  return (
    <Container>
      <TextMD className="text-center mb-3 mt-8 md:mt-12 lg:mt-16">Engineering the Modern Control Plane</TextMD>
      <DisplayLG className="text-center mb-6 tracking-tight">What It Takes to Distribute Software at Scale</DisplayLG>
      <TextXL className="font-normal text-[#535862] text-center mx-auto max-w-4xl">
        From SaaS to Agent-as-a-Service, master software distribution and build the platform that runs anything, anywhere, securely for your most demanding customers.
      </TextXL>

      <SearchBar ref={searchBarRef} value={searchTerm} onChange={setSearchTerm} />

      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16 md:mb-20">
            {displayedPosts.map((post) => (
              // @ts-expect-error Need to fix this
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Infinite scroll trigger */}
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
        <LoadingState message={searchTerm ? `No posts found matching "${searchTerm}"` : "No posts found."} />
      )}
    </Container>
  );
}

export default Homepage;
