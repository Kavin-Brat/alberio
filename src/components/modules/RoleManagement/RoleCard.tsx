"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";

export interface RoleCardProps {
  role: {
    id: string;
    roleKey: string;
    displayName: string;
    description: string;
    isSystem?: boolean;
    userCount?: number;
    permissions?: string[];
  };
}

/**
 * Role Card Child Component
 * Renders individual role specification card with permissions and user counts.
 */
export default function RoleCard({ role }: RoleCardProps) {
  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] flex flex-col justify-between gap-4 font-sora">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="px-2 py-0.5 rounded bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30 font-mono font-bold text-[10px]">
            {role.roleKey}
          </span>
          {role.isSystem && (
            <span className="text-[9px] text-slate-500 font-mono uppercase">System Core</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white">{role.displayName}</h3>
        <p className="text-xs text-slate-400 font-light">{role.description}</p>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
        <span className="text-slate-500">Active Users: {role.userCount || 0}</span>
        <span className="text-[#00FF00] font-bold">
          {role.permissions?.length || 0} Entitlements
        </span>
      </div>
    </GlassCard>
  );
}
