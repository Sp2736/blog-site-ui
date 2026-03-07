"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { CATEGORY_COLORS, DEFAULT_COLOR } from "@/lib/categories";
import { BlogPost } from "@/lib/types";

export function PostCard({ post }: { post: BlogPost }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const { toast } = useToast();

  const colorConfig = CATEGORY_COLORS[post.category] || DEFAULT_COLOR;

  // Check local storage when card loads
  useEffect(() => {
    const likedPosts = JSON.parse(
      localStorage.getItem("wandered_likes") || "[]",
    );

    if (likedPosts.includes(post.id)) {
      setIsLiked(true);
    }
  }, [post.id]);

  const handleLike = () => {
    if (isLiked) return;

    setIsLiked(true);
    setLikeCount((prev) => prev + 1);

    const likedPosts = JSON.parse(
      localStorage.getItem("wandered_likes") || "[]",
    );

    localStorage.setItem(
      "wandered_likes",
      JSON.stringify([...likedPosts, post.id]),
    );
  };

  const handleShare = () => {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/posts/${post.slug}`;

  navigator.clipboard.writeText(fullUrl);

  toast({
    title: "Link Copied! 🔗",
    description: "The URL has been copied to your clipboard.",
    duration: 2000,
  });
};

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={`group relative flex flex-col justify-between p-4 rounded-xl border bg-background/95 sm:bg-card/30 sm:backdrop-blur-xl overflow-hidden transition-colors duration-300 ${colorConfig.border} sm:hover:border-transparent`}
      style={{ "--category-color": colorConfig.hex } as React.CSSProperties}
    >
      {/* Liquid hover fill */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden sm:block"
        variants={{
          initial: {
            top: "100%",
            borderTopLeftRadius: "100%",
            borderTopRightRadius: "100%",
            opacity: 1,
          },
          hover: {
            top: "0%",
            borderTopLeftRadius: "0%",
            borderTopRightRadius: "0%",
            opacity: 1,
          },
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{ backgroundColor: colorConfig.hex }}
      />

      {/* Mobile glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-20 sm:hidden pointer-events-none rounded-b-2xl"
        style={{
          background: `linear-gradient(to top, ${colorConfig.hex}, transparent)`,
        }}
      />

      <div className="space-y-4 z-10 relative">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${colorConfig.bg} ${colorConfig.text} sm:group-hover:bg-white/20 sm:group-hover:text-white`}
        >
          {post.category}
        </span>

        <h3 className="text-xl font-bold tracking-tight text-foreground font-space-grotesk line-clamp-3 transition-colors duration-300 sm:group-hover:text-white">
          {post.title}
        </h3>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50 sm:group-hover:border-white/30 transition-colors duration-300 z-10 relative">
        <div className="flex items-center gap-3">
          
          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full text-muted-foreground hover:bg-black/10 transition-colors"
          >
            <Share2 size={18} />
          </motion.button>
        </div>

        {/* Read Button */}
        <Link href={`/posts/${post.slug}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: colorConfig.hex }}
          >
            <BookOpen size={16} />
            <span>Read</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
