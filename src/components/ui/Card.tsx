"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  topAccent?: boolean;
}

/**
 * Reusable Glassmorphism Card Component
 * Styled using deneb's cyber-dark aesthetic.
 */
export function GlassCard({
  hoverEffect = true,
  topAccent = false,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-secondary-dark/70 border border-cyber-cyan/15 backdrop-blur-md p-6 transition-all duration-300",
        hoverEffect &&
          "hover:border-cyber-cyan/40 hover:shadow-[0_0_25px_rgba(102,252,241,0.15)] hover:-translate-y-1",
        topAccent && "border-t-2 border-t-cyber-cyan",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Card(props: CardProps) {
  return <GlassCard {...props} />;
}
