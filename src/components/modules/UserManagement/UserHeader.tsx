"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export interface UserHeaderProps {
  onRefresh: () => void;
}

/**
 * User Header Child Component
 * Renders user directory page title and top actions bar.
 */
export default function UserHeader({ onRefresh }: UserHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sora">
      <div>
        <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
          ADMINISTRATION & SECURITY
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          User Management Directory
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          View, audit, manage roles, and toggle account activation across all platform users.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          className="font-bold text-xs uppercase flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
        <Link href="/admin/roles">
          <Button variant="primary" size="sm" className="font-bold text-xs uppercase bg-[#00FF00] text-black">
            Manage Roles &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
