"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "./components/container";
import { PostCard } from "./components/post-card";
import postsMetadata from "@/data/posts-metadata.json";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return postsMetadata;

    const term = searchTerm.toLowerCase();
    return postsMetadata.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term);
      const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(term)) || false;
      return titleMatch || tagMatch;
    });
  }, [searchTerm]);

  return (
    <main>
      <Container>
        <div className="w-full">
          <div className="flex justify-center mb-12 mt-12 mb:mt-16">
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
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
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
