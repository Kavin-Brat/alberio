"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export interface UserWelcomeBannerProps {
  user: {
    name: string;
    role: string;
    joinedDate: string;
  };
}

/**
 * User Welcome Banner Child Component
 * Displays trader profile pill, account role status, and launcher CTA buttons.
 */
export default function UserWelcomeBanner({ user }: UserWelcomeBannerProps) {
  return (
    <GlassCard className="p-8 border-[#00FF00]/40 bg-[#0b0b0b] font-sora relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00FF00]/20 border border-[#00FF00]/50 text-[#00FF00] font-bold flex items-center justify-center font-mono">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Account Role: <span className="text-[#00FF00] font-bold">{user.role}</span> | Member since {user.joinedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/terminal">
            <Button variant="primary" size="sm" className="font-bold text-xs uppercase bg-[#00FF00] text-black">
              Launch ECN Terminal &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
