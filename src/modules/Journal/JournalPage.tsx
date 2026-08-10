"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ComplianceEngine, ComplianceReport } from "@/services/complianceEngine";
import CsvUploaderCard from "@/components/modules/Journal/CsvUploaderCard";
import ComplianceReportView from "@/components/modules/Journal/ComplianceReportView";

/**
 * Parent Page Component: Trade Journal & Compliance Audit Page
 * Composes Journal child components: CsvUploaderCard, ComplianceReportView
 */
export default function JournalPage() {
  const [initialBalance, setInitialBalance] = useState<number>(100000);
  const [report, setReport] = useState<ComplianceReport | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const result = ComplianceEngine.analyzeTradeCSV(text, initialBalance);
        setReport(result);
      };
      reader.readAsText(file);
    }
  };

  const handleRunSampleAudit = () => {
    const sampleCSV = `Ticket,OpenTime,Type,Lots,Symbol,Price,SL,TP,CloseTime,Profit
1001,2026-08-01 10:00,BUY,1.0,EURUSD,1.0850,1.0820,1.0900,2026-08-01 14:00,500
1002,2026-08-02 11:00,SELL,1.5,GBPUSD,1.2650,1.2680,1.2600,2026-08-02 16:00,-1200
1003,2026-08-03 09:30,BUY,2.0,XAUUSD,2340.0,2330.0,2360.0,2026-08-03 15:30,4000
1004,2026-08-04 12:00,SELL,1.0,USDJPY,154.00,154.50,153.00,2026-08-04 18:00,800`;

    const result = ComplianceEngine.analyzeTradeCSV(sampleCSV, initialBalance);
    setReport(result);
  };

  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="space-y-6 font-sora">
          {/* Header */}
          <div>
            <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
              TRADE JOURNAL & COMPLIANCE PARSER
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Prop-Firm Compliance Audit Engine
            </h1>
            <p className="text-xs text-slate-400 font-light mt-1">
              Upload your MetaTrader or cTrader CSV log file to compute High Water Marks, 5% daily loss limits, and 30% consistency scores.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Child Component 1: CSV Uploader */}
            <CsvUploaderCard
              initialBalance={initialBalance}
              setInitialBalance={setInitialBalance}
              onFileUpload={handleFileUpload}
              onRunSampleDemo={handleRunSampleAudit}
            />

            {/* Child Component 2: Compliance Audit Report */}
            <div className="lg:col-span-2 space-y-6">
              <ComplianceReportView report={report} />
            </div>
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
