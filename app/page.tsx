"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Container } from "./components/container";
import { PostCard } from "./components/post-card";
import { SearchBar } from "./components/search-bar";
import { LoadingState } from "./components/loading-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import postsMetadata from "@/data/posts-metadata.json";
import { DisplayLG, TextMD, TextXL } from "@/components/text";

const POSTS_PER_PAGE = 24;

function Homepage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search changes
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

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = searchBarRef.current;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100; // Add 100px offset for better visibility

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <Container>
      <TextMD className="text-center mb-3 mt- 8 md:mt-12 lg:mt-16">Our blog</TextMD>
      <DisplayLG className="text-center mb-6 tracking-tight">Insights for the Builders of Cloud Platforms</DisplayLG>
      <TextXL className="font-normal text-[#535862] text-center mx-auto max-w-4xl">
        Stories, lessons, and product deep dives from the team behind Omnistrate — helping you launch, scale, and
        distribute SaaS smarter.
      </TextXL>

      <SearchBar
        ref={searchBarRef}
        value={searchTerm}
        onChange={setSearchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16 md:mb-20">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mb-16">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <LoadingState message={searchTerm ? `No posts found matching "${searchTerm}"` : "No posts found."} />
      )}
    </Container>
  );
}

export default Homepage;
