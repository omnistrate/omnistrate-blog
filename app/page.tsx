"use client";

import { Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "./components/container";
import { PostCard } from "./components/post-card";
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

const Homepage = () => {
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
          <div className="flex justify-center mb-12 mt-16 mb:mt-20 lg:mt-24">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or tag (cloud, kubernetes)..."
                className="w-full px-6 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

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
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? `No posts found matching "${searchTerm}"` : "No posts found."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default Homepage;
