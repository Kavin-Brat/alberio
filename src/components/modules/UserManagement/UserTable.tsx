"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import { UserCheck, UserX } from "lucide-react";

export interface UserTableProps {
  users: any[];
  onToggleStatus: (userId: string, currentStatus: boolean) => void;
}

/**
 * User Table Child Component
 * Renders platform users data table with active/deactivated toggles.
 */
export default function UserTable({ users, onToggleStatus }: UserTableProps) {
  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] space-y-4 font-sora">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-2">User Details</th>
              <th className="py-3 px-2">Role</th>
              <th className="py-3 px-2">Risk Profile</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-2 font-bold text-white">
                  <div>{u.name}</div>
                  <div className="text-[10px] text-[#00FF00] font-light">{u.email}</div>
                </td>
                <td className="py-3 px-2">
                  <span className="px-2 py-0.5 rounded bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30 font-bold text-[10px]">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-2 text-slate-300">{u.riskProfile || "Moderate"}</td>
                <td className="py-3 px-2">
                  {u.isActive ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <UserX className="w-3.5 h-3.5" /> Deactivated
                    </span>
                  )}
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(u.id, u.isActive)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      u.isActive
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40"
                    }`}
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
