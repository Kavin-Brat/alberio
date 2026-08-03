"use client";

import React from "react";
import { Star } from "lucide-react";

interface FavoriteStarProps {
  active: boolean;
  onClick: () => void;
  title?: string;
  className?: string;
}

/**
 * Reusable Atomic Favorite Star Bookmark Toggle Button
 * Conforms to inactive, active glowing, and hover scaling transition specs.
 */
export default function FavoriteStar({
  active,
  onClick,
  title = "Toggle Favorite",
  className = ""
}: FavoriteStarProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
      className={`p-1.5 hover:bg-surface-hover/80 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold ${className}`}
      type="button"
    >
      <Star
        className={`w-4 h-4 favorite-icon ${active ? "active" : ""}`}
      />
    </button>
  );
}
