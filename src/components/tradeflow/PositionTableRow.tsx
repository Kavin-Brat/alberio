"use client";

/**
 * Tradeflow Global - Open Position Table Row Sub-Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders an individual position row,
 *   floating PnL badge, and close position trigger.
 */

import React from "react";
import { Position } from "@/types/tradeflow";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface PositionTableRowProps {
  position: Position;
  onClose: (id: string) => void;
}

export function PositionTableRow({ position: pos, onClose }: PositionTableRowProps) {
  const isProfit = pos.unrealizedPnL >= 0;

  return (
    <tr className="hover:bg-muted/30 transition-colors font-mono">
      <td className="px-4 py-3 font-bold text-foreground">{pos.id}</td>
      <td className="px-4 py-3 font-bold text-primary">{pos.symbol}</td>
      <td className="px-4 py-3 font-bold">
        <span
          className={cn(
            "px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase inline-flex items-center gap-1",
            pos.side === "BUY"
              ? "bg-profit/15 text-profit border border-profit/30"
              : "bg-loss/15 text-loss border border-loss/30"
          )}
        >
          {pos.side === "BUY" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {pos.side}
        </span>
      </td>
      <td className="px-4 py-3 text-right text-foreground font-bold">{pos.volumeLots}</td>
      <td className="px-4 py-3 text-right text-foreground">{pos.entryPrice}</td>
      <td className="px-4 py-3 text-right text-foreground">{pos.currentPrice}</td>
      <td className="px-4 py-3 text-right text-muted-foreground">${pos.marginUsed.toFixed(2)}</td>
      <td className={cn("px-4 py-3 text-right font-bold text-sm", isProfit ? "text-profit" : "text-loss")}>
        {isProfit ? "+" : ""}${pos.unrealizedPnL.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center">
        <Button
          onClick={() => onClose(pos.id)}
          variant="danger"
          size="sm"
          className="px-2.5 py-1 text-[10px]"
        >
          Close
        </Button>
      </td>
    </tr>
  );
}

export default PositionTableRow;
