"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  topAccent?: boolean;
}

/**
 * Reusable Glassmorphism Card Component
 * Styled using Albireo's dark charcoal & luminous green aesthetic.
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
        "relative overflow-hidden rounded-xl bg-secondary-dark/70 border border-border/80 backdrop-blur-md p-6 transition-all duration-300",
        hoverEffect &&
          "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(34,230,0,0.15)] hover:-translate-y-1",
        topAccent && "border-t-2 border-t-primary",
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
