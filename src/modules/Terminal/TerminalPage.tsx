"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TerminalHeader from "@/components/modules/Terminal/TerminalHeader";
import TickerGrid from "@/components/modules/Terminal/TickerGrid";
import OrderTicketForm from "@/components/modules/Terminal/OrderTicketForm";
import CandlestickVisualizer from "@/components/modules/Terminal/CandlestickVisualizer";

/**
 * Parent Page Component: ECN Trading Terminal Page
 * Composes Terminal child components: TerminalHeader, TickerGrid, OrderTicketForm, CandlestickVisualizer
 */
export default function TerminalPage() {
  const [selectedPair, setSelectedPair] = useState("EUR/USD");
  const [lotSize, setLotSize] = useState("1.00");

  const PAIRS = [
    { symbol: "EUR/USD", bid: 1.08542, ask: 1.08544, spread: 0.2, change: "+0.14%" },
    { symbol: "GBP/USD", bid: 1.26410, ask: 1.26413, spread: 0.3, change: "-0.08%" },
    { symbol: "USD/JPY", bid: 154.210, ask: 154.214, spread: 0.4, change: "+0.32%" },
    { symbol: "AUD/USD", bid: 0.65420, ask: 0.65422, spread: 0.2, change: "-0.21%" },
    { symbol: "XAU/USD", bid: 2342.50, ask: 2342.80, spread: 0.3, change: "+0.85%" },
    { symbol: "BTC/USD", bid: 64250.0, ask: 64255.0, spread: 5.0, change: "+2.40%" },
  ];

  const currentPairData = PAIRS.find((p) => p.symbol === selectedPair) || PAIRS[0];

  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="space-y-6 font-sora">
          {/* Child Component 1: Terminal Header */}
          <TerminalHeader />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pair Selector & Order Ticket */}
            <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Selected Instrument</span>
                <h3 className="text-xl font-black text-white font-mono">{currentPairData.symbol}</h3>
              </div>

              {/* Child Component 2: Ticker Grid */}
              <TickerGrid
                pairs={PAIRS}
                selectedPair={selectedPair}
                onSelectPair={setSelectedPair}
              />

              {/* Child Component 3: Order Ticket Form */}
              <OrderTicketForm
                lotSize={lotSize}
                setLotSize={setLotSize}
                bidPrice={currentPairData.bid}
                askPrice={currentPairData.ask}
              />
            </GlassCard>

            {/* Depth of Market & Execution Analytics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Child Component 4: Candlestick Visualizer */}
              <CandlestickVisualizer
                symbol={currentPairData.symbol}
                spread={currentPairData.spread}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
