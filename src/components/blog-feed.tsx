"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/types";
import { PostCard } from "@/components/post-card";
import { CategoryFilter } from "@/components/CategoryFilter";

export function BlogFeed({ posts }: { posts: BlogPost[] }) {
  // State to remember the selected category
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter the posts dynamically before rendering them
  const filteredPosts = posts.filter((post) => {
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* The Grid of Filtered Blog-cards */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        // Empty state if a category has no posts yet
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-card/10 backdrop-blur-md rounded-3xl border border-border/50 w-full max-w-2xl mx-auto">
          <div className="text-4xl text-muted-foreground opacity-50">📭</div>
          <h3 className="text-xl font-semibold font-space-grotesk text-foreground">
            No blogs found
          </h3>
          <p className="text-muted-foreground">
            I haven't published any thoughts in this category yet!!
          </p>
        </div>
      )}
    </div>
  );
}
