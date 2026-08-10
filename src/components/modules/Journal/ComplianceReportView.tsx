"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import { ComplianceReport } from "@/services/complianceEngine";
import { CheckCircle2, ShieldAlert, Activity } from "lucide-react";

export interface ComplianceReportViewProps {
  report: ComplianceReport | null;
}

/**
 * Compliance Report View Child Component
 * Displays High Water Mark, daily loss limit, and consistency audit results.
 */
export default function ComplianceReportView({ report }: ComplianceReportViewProps) {
  if (!report) {
    return (
      <GlassCard className="p-12 border-slate-800 bg-[#0b0b0b] text-center font-mono text-xs text-slate-500 flex flex-col items-center gap-3 font-sora">
        <Activity className="w-10 h-10 text-[#00FF00] animate-pulse" />
        <span>Upload a CSV file or run the sample demo to view automated compliance reports.</span>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] space-y-6 font-sora">
      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase">Audit Result Status</span>
          <div className="flex items-center gap-2 mt-1">
            {report.complianceStatus === "PASSED" ? (
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> PASSED COMPLIANCE
              </span>
            ) : (
              <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-mono font-bold text-xs flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> RULE VIOLATED
              </span>
            )}
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-500">Trades Parsed:</span>
          <span className="text-white font-bold block">{report.parsedTradesCount} trades</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase">Actionable Guardian Recommendations:</span>
        <div className="space-y-2">
          {report.actionableRecommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              {rec}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
