"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  valueColor?: string;
  topAccent?: boolean;
  className?: string;
}

export default function KPICard({
  label,
  value,
  subtext,
  valueColor = "text-white",
  topAccent = false,
  className = ""
}: KPICardProps) {
  return (
    <GlassCard topAccent={topAccent} className={`flex flex-col justify-between p-5 min-h-[110px] ${className}`}>
      <span className="text-[10px] font-heading font-bold text-light-purple uppercase tracking-widest">
        {label}
      </span>
      <span className={`text-xl md:text-2xl font-heading font-bold mt-2 ${valueColor}`}>
        {value}
      </span>
      {subtext && (
        <span className="text-[10px] text-light-purple/70 mt-1 font-sans">
          {subtext}
        </span>
      )}
    </GlassCard>
  );
}
