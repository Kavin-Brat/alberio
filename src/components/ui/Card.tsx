"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  topAccent?: boolean;
}

/**
 * Reusable Atomic Card Component
 * Implements the Graphite background color surface design system.
 */
export default function Card({
  hoverEffect = false,
  topAccent = false,
  children,
  className = "",
  ...props
}: CardProps) {
  /**
   * Base: glassmorphism card (backdrop-blur + translucent bg + subtle border).
   * Matching portfolio-2k26 glassmorphism recipe (Section 1).
   */
  const baseStyle = "bg-slate-50/20 dark:bg-slate-900/10 backdrop-blur-sm border border-slate-200/30 dark:border-slate-800/40 rounded-2xl p-6 relative overflow-hidden transition-all duration-300";
  /** Hover: lift + accent gold border glow */
  const hoverStyle = hoverEffect ? "hover:border-cygnus-gold/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20" : "";
  const accentStyle = topAccent ? "border-t-2 border-t-accent-gold" : "";

  return (
    <div
      className={`${baseStyle} ${hoverStyle} ${accentStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
