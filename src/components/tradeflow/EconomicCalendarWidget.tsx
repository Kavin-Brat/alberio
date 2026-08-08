"use client";

/**
 * Tradeflow Global - Real-Time Economic Calendar Widget Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders scheduled economic news events,
 *   volatility impact ratings (HIGH/MEDIUM/LOW), and forecast metrics.
 */

import React from "react";
import { EconomicEvent } from "@/types/tradeflow";
import { Calendar, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const mockEconomicEvents: EconomicEvent[] = [
  { id: "EVT-101", time: "13:30 GMT", currency: "USD", eventName: "US Non-Farm Payrolls (NFP)", impact: "HIGH", forecast: "185K", previous: "206K" },
  { id: "EVT-102", time: "13:30 GMT", currency: "USD", eventName: "Core CPI Inflation (MoM)", impact: "HIGH", forecast: "0.2%", previous: "0.3%" },
  { id: "EVT-103", time: "18:00 GMT", currency: "USD", eventName: "FOMC Rate Decision", impact: "HIGH", forecast: "5.25%", previous: "5.25%" },
  { id: "EVT-104", time: "07:00 GMT", currency: "GBP", eventName: "UK GDP (QoQ)", impact: "MEDIUM", forecast: "0.6%", previous: "0.7%" },
  { id: "EVT-105", time: "12:30 GMT", currency: "EUR", eventName: "ECB Press Conference", impact: "HIGH", forecast: "3.75%", previous: "4.00%" },
];

export function EconomicCalendarWidget() {
  return (
    <div className="flex flex-col h-full bg-secondary-dark border border-border rounded-lg overflow-hidden font-sora shadow-xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-hero-bg/80 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            Economic Calendar
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/30 px-2 py-0.5 rounded-xs border border-border flex items-center gap-1">
          <Clock className="w-3 h-3 text-primary" /> Live Feeds
        </span>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/40 p-2">
        {mockEconomicEvents.map((evt) => (
          <div key={evt.id} className="p-2.5 rounded-md hover:bg-muted/30 transition-colors flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-xs text-[10px] border border-primary/20">
                  {evt.currency}
                </span>
                <span className="font-bold text-foreground text-xs">{evt.eventName}</span>
              </div>
              <span className={cn(
                "text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-xs flex items-center gap-1 border",
                evt.impact === "HIGH" ? "bg-loss/15 text-loss border-loss/30" : "bg-yellow-500/15 text-yellow-500 border-yellow-500/30"
              )}>
                <AlertTriangle className="w-2.5 h-2.5" />
                {evt.impact}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Time: <strong className="text-foreground">{evt.time}</strong></span>
              <span>Forecast: <strong className="text-foreground">{evt.forecast}</strong></span>
              <span>Prev: <strong className="text-muted-foreground">{evt.previous}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EconomicCalendarWidget;
