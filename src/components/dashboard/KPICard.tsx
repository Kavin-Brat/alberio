"use client";

import React from "react";
import Card from "@/components/ui/Card";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  valueColor?: string;
  topAccent?: boolean;
  className?: string;
}

/**
 * Reusable Dashboard KPI Summary Metric Component
 * Features optional color highlighting and top accents.
 */
export default function KPICard({
  label,
  value,
  subtext,
  valueColor = "text-text-primary",
  topAccent = false,
  className = ""
}: KPICardProps) {
  return (
    <Card topAccent={topAccent} className={`flex flex-col justify-between p-5 min-h-[110px] ${className}`}>
      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
        {label}
      </span>
      <span className={`text-xl md:text-2xl font-black mt-2 ${valueColor}`}>
        {value}
      </span>
      {subtext && (
        <span className="text-[10px] text-text-muted/70 mt-1">
          {subtext}
        </span>
      )}
    </Card>
  );
}
