"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "cyan" | "violet";
}

export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-sora font-bold uppercase tracking-wider transition-colors",
        {
          "bg-secondary text-muted-foreground border border-border": variant === "default",
          "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(34,230,0,0.2)]": variant === "gold" || variant === "cyan" || variant === "violet",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
