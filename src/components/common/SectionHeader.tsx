"use client";

import React from "react";

interface SectionHeaderProps {
  categoryPill?: string;
  headline: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Reusable Section Header Component
 */
export default function SectionHeader({
  categoryPill,
  headline,
  description,
  align = "center",
  className = ""
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl font-sora ${alignmentClass} ${className}`}>
      {categoryPill && (
        <span className="text-[11px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block mb-2">
          {categoryPill}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
        {headline}
      </h2>
      {description && (
        <p className="text-xs sm:text-sm text-slate-400 font-light mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
