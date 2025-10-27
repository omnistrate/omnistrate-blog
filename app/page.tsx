import Container from "@/app/components/container";
import { getAllPosts } from "@/lib/api";
import { PostTags } from "@/app/components/post-tags";
import Link from "next/link";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
  
        {/* Search Bar - Center Aligned */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by tag (cloud, open-source)..."
              className="w-full px-6 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* All Posts in Grid Format */}
        {allPosts.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/posts/${post.slug}`} 
                  className="group flex"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col w-full">
                    
                    {/* Cover Image with Title Overlay */}
                    <div className="relative aspect-video bg-gradient-to-br from-teal-400 to-blue-500">
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : null}
                      
                      {/* Title Overlay with Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex items-center justify-center p-4">
                        <h3 className="font-bold text-xl md:text-2xl text-white text-center leading-tight drop-shadow-lg line-clamp-3">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <PostTags tags={post.tags} className="mb-3" />
                      )}
                      
                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {/* Author and Date */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                        <span>{post.author?.name || 'Omnistrate Team'}</span>
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {allPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
          </div>
        )}
      </Container>
    </main>
  );
}