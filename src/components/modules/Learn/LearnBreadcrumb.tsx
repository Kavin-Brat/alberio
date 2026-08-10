"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface LearnBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Learn Breadcrumb Child Component
 * Renders a navigational breadcrumb trail for the learn section.
 * The last item is non-clickable (current page).
 */
export default function LearnBreadcrumb({ items, className }: LearnBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-[11px] font-mono text-slate-500 flex-wrap", className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-700 shrink-0" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-slate-300 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast ? "text-[#00FF00] font-bold" : "text-slate-500")}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
