"use client";

import React from "react";
import Button from "@/components/ui/Button";

export interface OrderTicketFormProps {
  lotSize: string;
  setLotSize: (val: string) => void;
  bidPrice: number;
  askPrice: number;
}

/**
 * Order Ticket Form Child Component
 * Handles trade lot size input and instant Buy/Sell execution buttons.
 */
export default function OrderTicketForm({
  lotSize,
  setLotSize,
  bidPrice,
  askPrice,
}: OrderTicketFormProps) {
  return (
    <div className="space-y-4 pt-2 border-t border-slate-800 text-xs font-sora">
      <div>
        <label className="text-slate-400 block mb-1 font-semibold">Volume (Lots)</label>
        <input
          type="text"
          value={lotSize}
          onChange={(e) => setLotSize(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white font-mono focus:border-[#00FF00] focus:outline-hidden"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="primary"
          size="md"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase"
        >
          BUY {askPrice}
        </Button>
        <Button
          variant="primary"
          size="md"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold uppercase"
        >
          SELL {bidPrice}
        </Button>
      </div>
    </div>
  );
}
