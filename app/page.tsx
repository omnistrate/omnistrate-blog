"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const POSTS_PER_PAGE = 24;

function HomepageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchTerm(searchQuery);
    setCurrentPage(1); // Reset to page 1 when search changes
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() && searchTerm !== searchQuery) {
        router.push(`/?search=${encodeURIComponent(searchTerm)}`);
      } else if (!searchTerm.trim() && searchQuery) {
        router.push("/");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, searchQuery, router]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <Container>
        <div className="w-full">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {filteredPosts.length > 0 ? (
            <>
              <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                  {paginatedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>

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
        </div>
      </Container>
    </main>
  );
}

export default function Homepage() {
  return (
    <Suspense
      fallback={
        <main>
          <Container>
            <div className="w-full">
              <SearchBar disabled />
              <LoadingState />
            </div>
          </Container>
        </main>
      }
    >
      <HomepageContent />
    </Suspense>
  );
}
