"use client";

import React from "react";

interface StatBoxProps {
  label: string;
  value: string;
  highlight?: boolean;
  borderRight?: boolean;
}

/**
 * Reusable Metric Telemetry StatBox Component
 */
export default function StatBox({
  label,
  value,
  highlight = false,
  borderRight = true
}: StatBoxProps) {
  return (
    <div className={`p-3 font-mono ${borderRight ? "border-r border-slate-800" : ""}`}>
      <span className="text-[10px] text-slate-400 uppercase block mb-1">{label}</span>
      <span className={`text-xl font-bold ${highlight ? "text-[#00FF00]" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
