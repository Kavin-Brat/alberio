"use client";

import React from "react";

/**
 * Terminal Header Child Component
 * Renders ECN terminal title and live stream status indicator.
 */
export default function TerminalHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sora">
      <div>
        <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
          INSTITUTIONAL ECN TERMINAL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          Real-Time Order Ticket & Price Stream
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          Zero-latency quote execution, margin utilization gauge, and ECN liquidity Depth-of-Market.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30 font-mono text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-ping" /> ECN STREAM LIVE
        </span>
      </div>
    </div>
  );
}
