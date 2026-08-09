"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Building2, Key, Download, Code2, ShieldCheck, Activity, Layers, CheckCircle2, Lock, ExternalLink, RefreshCw, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function ProfessionalDeskPage() {
  const { user, hasEntitlement, isSuperAdmin } = useAuth();
  const [apiKey, setApiKey] = useState("alb_live_pk_9824_x91028471928");
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestRiskApi = async () => {
    setLoadingApi(true);
    try {
      const res = await fetch("/api/risk");
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      setApiResponse("Failed to fetch API endpoint.");
    }
    setLoadingApi(false);
  };

  const handleTestComplianceApi = async () => {
    setLoadingApi(true);
    try {
      const res = await fetch("/api/compliance");
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      setApiResponse("Failed to fetch API endpoint.");
    }
    setLoadingApi(false);
  };

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <GlassCard className="p-8 border-profit/40 bg-secondary/50 font-sora relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-profit/20 text-profit border border-profit/40 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
                <Building2 className="w-3.5 h-3.5 text-profit" /> Level 5 Professional & Institutional Desk
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              Albireo Professional Suite
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-2xl">
              Engineered for serious traders, professional researchers, small funds, advisors, and prop firm desks. Advanced APIs, raw data exports, and institutional risk telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              onClick={handleTestRiskApi}
              className="font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,230,0,0.3)]"
            >
              Test Live Risk API Endpoint
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* API KEY & INTEGRATION MANAGER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <GlassCard className="p-6 border-border flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
                  REST & WebSocket API Keys
                </h2>
              </div>
              <span className="text-xs text-profit font-mono font-bold">ACTIVE API KEY</span>
            </div>

            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Use your API key to query portfolio Value at Risk (VaR), CFTC smart money positioning, and prop-firm compliance telemetry directly into your custom scripts or trading desks.
            </p>

            <div className="flex items-center gap-2 bg-hero-bg border border-border p-3 rounded-lg font-mono text-xs text-foreground">
              <span className="truncate flex-1">{apiKey}</span>
              <button
                onClick={handleCopyKey}
                className="p-1.5 rounded hover:bg-secondary text-primary transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-profit" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleTestRiskApi} className="font-bold flex-1 text-xs">
                Fetch GET /api/risk
              </Button>
              <Button variant="outline" size="sm" onClick={handleTestComplianceApi} className="font-bold flex-1 text-xs">
                Fetch GET /api/compliance
              </Button>
            </div>
          </GlassCard>

          {/* DATA EXPORTERS */}
          <GlassCard className="p-6 border-border flex flex-col gap-4">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider border-b border-border pb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-profit" /> Institutional Raw Data Exporters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-hero-bg border border-border rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground block">Trade Journal (CSV)</span>
                  <span className="text-[10px] text-muted-foreground">Raw tick execution logs</span>
                </div>
                <Button variant="secondary" size="sm" className="font-bold text-[10px]">Export</Button>
              </div>

              <div className="p-3 bg-hero-bg border border-border rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground block">Monte Carlo Curves (JSON)</span>
                  <span className="text-[10px] text-muted-foreground">5,000 resample paths</span>
                </div>
                <Button variant="secondary" size="sm" className="font-bold text-[10px]">Export</Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: LIVE API TELEMETRY RESPONSE DISPLAY */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <GlassCard className="p-6 border-primary/40 bg-secondary/40 flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="font-sora font-bold text-foreground uppercase">Live API Telemetry Response</span>
              </div>
              <span className="text-[10px] text-profit font-bold">200 OK</span>
            </div>

            {loadingApi ? (
              <div className="p-12 flex flex-col items-center justify-center gap-2 text-primary">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-xs">Querying Albireo Professional API...</span>
              </div>
            ) : (
              <pre className="p-4 bg-hero-bg border border-border rounded-xl text-foreground text-[11px] overflow-x-auto max-h-96 leading-relaxed">
                {apiResponse ||
                  `Click 'Fetch GET /api/risk' or 'Fetch GET /api/compliance' to test live JSON response.`}
              </pre>
            )}
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
