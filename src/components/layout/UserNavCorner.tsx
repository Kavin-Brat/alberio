"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Crown, Sparkles, LogOut, ChevronDown, LayoutDashboard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function UserNavCorner() {
  const { user, isSuperAdmin, switchUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-sora" ref={dropdownRef}>
      {/* Top Right Corner Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-black/90 border border-primary/40 hover:border-primary transition-all cursor-pointer shadow-[0_0_15px_rgba(34,230,0,0.2)]"
      >
        <div className="w-7 h-7 rounded-full bg-primary text-black font-extrabold flex items-center justify-center text-xs shrink-0 font-mono">
          {user.name.charAt(0)}
        </div>

        <div className="hidden sm:flex flex-col text-left truncate max-w-36">
          <span className="text-[11px] font-bold text-white truncate">{user.name}</span>
          <span className="text-[9px] text-[#22e600] font-mono truncate">{user.email}</span>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#22e600]/20 text-[#22e600] font-mono text-[9px] font-bold uppercase hidden md:inline">
          {user.role}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Account Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0b0b0b] border border-primary/40 rounded-xl shadow-2xl p-3 flex flex-col gap-2 backdrop-blur-xl animate-fade-in z-50 text-xs">
          {/* User Info Header */}
          <div className="p-2 bg-black rounded-lg border border-border/80 flex flex-col gap-1">
            <span className="font-bold text-white block">{user.name}</span>
            <span className="text-[10px] text-[#22e600] font-mono block">{user.email}</span>
            <div className="flex justify-between items-center pt-1 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
              <span>Tier: {user.subscriptionTier}</span>
              <span className="text-[#22e600] font-bold">L{user.progress.funnelLevel} / 6</span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-secondary flex items-center gap-2 text-white font-semibold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-[#22e600]" />
            <span>Personal Cockpit</span>
          </Link>

          {isSuperAdmin && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-secondary flex items-center gap-2 text-[#22e600] font-semibold transition-colors"
            >
              <Crown className="w-4 h-4 text-[#22e600]" />
              <span>CEO Command Center</span>
            </Link>
          )}

          {isSuperAdmin && (
            <Link
              href="/admin/users"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-secondary flex items-center gap-2 text-white font-semibold transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#22e600]" />
              <span>User & Role Management</span>
            </Link>
          )}

          <div className="border-t border-border pt-1">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-destructive/20 flex items-center gap-2 text-destructive font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
