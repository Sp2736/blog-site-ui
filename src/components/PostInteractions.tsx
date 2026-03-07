"use client";

import { useState, useTransition } from "react";
import { Heart, Share2, Check } from "lucide-react";
import { incrementLike } from "@/lib/actions";

export function PostInteractions({
  postId,
  initialLikes,
  postUrl,
}: {
  postId: string;
  initialLikes: number;
  postUrl: string;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Handle Like Button
  const handleLike = () => {
    if (hasLiked) return; // Prevent spam clicking

    // Instantly update the UI (Optimistic Update)
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    // Tell the database in the background
    startTransition(() => {
      incrementLike(postId);
    });
  };

  // Handle Share Button
  const handleShare = () => {
    const fullLink = `${window.location.origin}/blog/${postUrl}`;

    navigator.clipboard.writeText(fullLink);
    setIsCopied(true);

    // Reset the icon back to 'Share' after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 text-slate-500">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={hasLiked || isPending}
        className={`flex items-center gap-1.5 transition-all ${
          hasLiked ? "text-red-500" : "hover:text-red-400"
        }`}
      >
        <Heart
          size={18}
          className={`transition-transform ${hasLiked ? "fill-current scale-110" : "scale-100"}`}
        />
        <span className="text-sm font-medium">{likes}</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
      >
        {isCopied ? (
          <>
            <Check size={18} className="text-green-500" />
            <span className="text-sm font-medium text-green-500">Copied!</span>
          </>
        ) : (
          <>
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </>
        )}
      </button>
    </div>
  );
}
