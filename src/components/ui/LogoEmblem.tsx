"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoEmblemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * ALBERIO Precision Emblem Logo Component
 * High-definition vector emblem featuring a polished 3D geometric 'A',
 * metallic silver/gold facets, and a sharp, glowing neon-green upward trend arrow.
 */
export function LogoEmblem({ size = "md", className, ...props }: LogoEmblemProps) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 group select-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Soft Ambient Neon Glow */}
      <div className="absolute inset-0 rounded-full bg-primary/25 blur-md group-hover:bg-primary/45 transition-all duration-500" />

      {/* Pixel-Perfect Precision SVG Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 filter drop-shadow-[0_0_12px_rgba(34,230,0,0.4)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Metallic Silver Gradient */}
          <linearGradient id="silverFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Brushed Gold Gradient */}
          <linearGradient id="goldFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>

          {/* Neon Mint Green Trend Gradient */}
          <linearGradient id="neonGreenTrend" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22E600" />
            <stop offset="100%" stopColor="#57F287" />
          </linearGradient>

          {/* Inner Dark Charcoal Fill */}
          <radialGradient id="charcoalBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14181F" />
            <stop offset="100%" stopColor="#080A0E" />
          </radialGradient>
        </defs>

        {/* Outer Hexagonal Shield Ring */}
        <polygon
          points="50,4 90,25 90,75 50,96 10,75 10,25"
          fill="url(#charcoalBg)"
          stroke="url(#silverFacet)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Dotted Ring Accent */}
        <polygon
          points="50,10 84,28 84,72 50,90 16,72 16,28"
          stroke="url(#neonGreenTrend)"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.6"
        />

        {/* 3D Geometric 'A' Left Facet (Silver) */}
        <polygon
          points="50,18 24,76 38,76 50,46"
          fill="url(#silverFacet)"
        />

        {/* 3D Geometric 'A' Right Facet (Gold) */}
        <polygon
          points="50,18 50,46 62,76 76,76"
          fill="url(#goldFacet)"
        />

        {/* Crossbar Platform */}
        <polygon
          points="35,62 65,62 62,56 38,56"
          fill="url(#silverFacet)"
          opacity="0.9"
        />

        {/* Central Rising Candlestick / Upward Trend Arrow */}
        <polygon
          points="50,14 58,32 52,32 52,78 48,78 48,32 42,32"
          fill="url(#neonGreenTrend)"
        />

        {/* Arrowhead Highlight Glow */}
        <circle cx="50" cy="14" r="3" fill="#57F287" />
      </svg>
    </div>
  );
}

export default LogoEmblem;
