"use client";

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Layout Page Container
 * Enforces the max container limit at 1600px and responsive paddings.
 */
export default function PageContainer({
  children,
  className = ""
}: PageContainerProps) {
  return (
    <div className={`w-full flex-1 px-4 sm:px-6 lg:px-8 py-12 relative z-10 ${className}`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        {children}
      </div>
    </div>
  );
}
