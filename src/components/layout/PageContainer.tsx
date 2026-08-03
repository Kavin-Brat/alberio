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
    <div className={`w-full flex-1 bg-albireo-blue flex flex-col items-center px-4 lg:px-8 py-12 ${className}`}>
      <div className="w-full max-w-[1600px] flex flex-col gap-10">
        {children}
      </div>
    </div>
  );
}
