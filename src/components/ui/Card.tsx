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
  const baseStyle = "bg-surface-card border border-border-custom rounded-2xl p-6 relative overflow-hidden transition-all duration-300";
  const hoverStyle = hoverEffect ? "hover:border-accent-gold/45 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25" : "";
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
