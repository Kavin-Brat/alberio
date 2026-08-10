"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Plus, RefreshCw } from "lucide-react";

export interface RoleHeaderProps {
  onRefresh: () => void;
  onCreateRole: () => void;
}

/**
 * Role Header Child Component
 * Renders RBAC governance title and Create Role actions bar.
 */
export default function RoleHeader({ onRefresh, onCreateRole }: RoleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sora">
      <div>
        <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
          SECURITY & RBAC GOVERNANCE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          Role & Entitlement Matrix
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          Configure role keys, permission scopes, and user assignment limits.
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
        <Button
          variant="primary"
          size="sm"
          onClick={onCreateRole}
          className="font-bold text-xs uppercase bg-[#00FF00] text-black flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Custom Role
        </Button>
      </div>
    </div>
  );
}
