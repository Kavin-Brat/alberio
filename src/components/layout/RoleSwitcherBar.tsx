"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { User, ShieldCheck, Sparkles, GraduationCap, LayoutDashboard, Crown, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function RoleSwitcherBar() {
  const { user, allMockUsers, switchUser, isSuperAdmin } = useAuth();

  return (
    <div className="w-full bg-secondary/90 border-b border-border/80 text-foreground font-sora text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 relative z-50">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-primary text-[10px] uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          <Sparkles className="w-3 h-3" /> Local Testing Environment
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[11px]">Logged in as:</span>
          <span className="font-bold text-foreground flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-primary" /> {user.name}
          </span>
          <span className="px-2 py-0.2 rounded bg-hero-bg text-primary border border-primary/30 text-[10px] font-mono font-bold">
            {user.subscriptionTier}
          </span>
        </div>
      </div>

      {/* Switch Dummy User Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground hidden sm:inline">Switch Role:</span>
          <select
            value={user.id}
            onChange={(e) => switchUser(e.target.value)}
            className="bg-hero-bg text-foreground border border-border rounded px-2.5 py-0.5 text-[11px] font-semibold cursor-pointer hover:border-primary focus:outline-hidden"
          >
            {allMockUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-[11px] font-bold text-primary hover:text-foreground transition-colors flex items-center gap-1"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> User Cockpit
          </Link>

          {isSuperAdmin && (
            <Link
              href="/admin"
              className="text-[11px] font-bold text-profit hover:text-foreground transition-colors flex items-center gap-1 bg-profit/10 px-2 py-0.5 rounded border border-profit/30"
            >
              <Crown className="w-3.5 h-3.5" /> CEO Command Center
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
