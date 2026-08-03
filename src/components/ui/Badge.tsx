"use client";

import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold";
}

/**
 * Reusable Atomic Badge Tag Component
 * Implements standard dark tags and gold status highlighted tags.
 */
export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const baseStyle = "dark-tag";
  const variants = {
    default: "",
    gold: "gold-highlight"
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
