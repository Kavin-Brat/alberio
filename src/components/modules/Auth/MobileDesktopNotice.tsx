"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Monitor } from "lucide-react";
import Link from "next/link";

export interface MobileDesktopNoticeProps {
  title?: string;
  description?: string;
}

/**
 * Mobile Desktop Notice Component
 * Displayed on mobile viewports (<1024px) for desktop-only authentication pages.
 */
export default function MobileDesktopNotice({
  title = "Desktop Access Required",
  description = "Please log in with a desktop device to access it.",
}: MobileDesktopNoticeProps) {

  return (
    <div className="lg:hidden">
      <GlassCard className="p-8 border-[#00FF00]/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-4 rounded-2xl shadow-2xl">
        <Monitor className="w-12 h-12 text-[#00FF00] animate-bounce" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          {description}
        </p>
        <Link href="/" className="w-full">
          <Button variant="primary" size="sm" className="w-full font-bold uppercase bg-[#00FF00] text-black">
            Return to Landing Page &rarr;
          </Button>
        </Link>
      </GlassCard>
    </div>
  );
}
