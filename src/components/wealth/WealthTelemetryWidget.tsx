"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Building2, CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function WealthTelemetryWidget() {
  const [submitted, setSubmitted] = useState(false);
  const [capital, setCapital] = useState("10000000"); // ₹1 Crore default

  return (
    <GlassCard className="p-8 border-[#22e600]/40 bg-black/90 font-sora">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-[#22e600]/20 text-[#22e600] text-[10px] font-bold font-mono uppercase tracking-wider block mb-1">
            ALBIREO WEALTH ADVISORY DESK
          </span>
          <h2 className="text-2xl font-extrabold text-white">HNW Regulated Capital Allocation Desk</h2>
        </div>
        <div className="p-3 bg-[#0b0b0b] border border-border rounded-xl font-mono text-xs">
          <span className="text-muted-foreground block text-[10px]">Target AUM Telemetry</span>
          <span className="text-[#22e600] font-bold text-lg">₹100 Crore Target</span>
        </div>
      </div>

      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
        >
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">Portfolio Capital Allocation (INR)</label>
              <select
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="w-full bg-hero-bg border border-border rounded p-3 text-white font-mono"
              >
                <option value="10000000">₹1 Crore (Minimum Tier)</option>
                <option value="25000000">₹2.5 Crore</option>
                <option value="50000000">₹5 Crore</option>
                <option value="100000000">₹10 Crore+</option>
              </select>
            </div>

            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">Investor Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Kavin B"
                className="w-full bg-hero-bg border border-border rounded p-3 text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground block mb-1 font-semibold">Contact Email Address</label>
              <input
                type="email"
                required
                placeholder="investor@familyoffice.com"
                className="w-full bg-hero-bg border border-border rounded p-3 text-white"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full font-bold uppercase tracking-wider bg-[#22e600] text-black hover:bg-[#22e600]/90 mt-6 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Private Wealth Advisory Mandate
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-6 bg-[#22e600]/10 border border-[#22e600]/40 rounded-xl text-center space-y-2 font-sora">
          <CheckCircle2 className="w-10 h-10 text-[#22e600] mx-auto" />
          <h3 className="text-lg font-bold text-white">Inquiry Received by Albireo Wealth Desk</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Our regulated capital advisory team will review your portfolio allocation parameters and contact your office directly.
          </p>
        </div>
      )}
    </GlassCard>
  );
}
