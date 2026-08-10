"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FileSpreadsheet, Upload } from "lucide-react";

export interface CsvUploaderCardProps {
  initialBalance: number;
  setInitialBalance: (val: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRunSampleDemo: () => void;
}

/**
 * CSV Uploader Card Child Component
 * Handles CSV trade log file drag & drop input and initial balance settings.
 */
export default function CsvUploaderCard({
  initialBalance,
  setInitialBalance,
  onFileUpload,
  onRunSampleDemo,
}: CsvUploaderCardProps) {
  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] space-y-4 font-sora">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <FileSpreadsheet className="w-5 h-5 text-[#00FF00]" /> Upload Trade CSV
      </h3>

      <div>
        <label className="text-slate-400 text-xs block mb-1 font-semibold font-mono">
          Initial Evaluation Balance ($)
        </label>
        <input
          type="number"
          value={initialBalance}
          onChange={(e) => setInitialBalance(Number(e.target.value))}
          className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white font-mono text-xs focus:border-[#00FF00] focus:outline-hidden"
        />
      </div>

      <div className="border-2 border-dashed border-slate-800 hover:border-[#00FF00]/60 rounded-xl p-6 text-center transition-colors">
        <Upload className="w-8 h-8 text-[#00FF00] mx-auto mb-2" />
        <span className="text-xs text-slate-300 font-bold block mb-1">Click to select CSV File</span>
        <span className="text-[10px] text-slate-500 font-mono block">Supports MetaTrader 4, MT5 & cTrader format</span>
        <input
          type="file"
          accept=".csv"
          onChange={onFileUpload}
          className="hidden"
          id="csv-file-input"
        />
        <label
          htmlFor="csv-file-input"
          className="mt-3 inline-block px-4 py-2 bg-slate-900 hover:bg-slate-800 text-[#00FF00] font-mono text-xs font-bold rounded cursor-pointer border border-slate-700"
        >
          Browse Computer
        </label>
      </div>

      <div className="pt-2 border-t border-slate-800">
        <Button
          variant="secondary"
          size="sm"
          onClick={onRunSampleDemo}
          className="w-full font-mono text-xs uppercase flex items-center justify-center gap-1.5"
        >
          Run Sample Audit Demo &rarr;
        </Button>
      </div>
    </GlassCard>
  );
}
