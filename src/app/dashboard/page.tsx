"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ACADEMY_COURSES } from "@/data/academyData";
import { User, BookOpen, GraduationCap, PlayCircle, Activity, BarChart3, Calculator, Award, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Crown, DollarSign, Layers, Compass, LineChart, FileText, Bookmark, Star, Plus, Check } from "lucide-react";
import Link from "next/link";
import CertificateModal from "@/components/academy/CertificateModal";
import CreateAccountModal from "@/components/auth/CreateAccountModal";
import AIResearchModal from "@/components/research/AIResearchModal";
import CourseProgressWidget from "@/components/academy/CourseProgressWidget";
import SubscriptionStatusWidget from "@/components/dashboard/SubscriptionStatusWidget";

export default function UserDashboardPage() {
  const { user, hasEntitlement, isSuperAdmin, switchUser } = useAuth();
  
  // Modals state
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isAIResearchOpen, setIsAIResearchOpen] = useState(false);

  // Level 3 Trader Persona state
  const [persona, setPersona] = useState<"Beginner" | "Trader" | "PropTrader" | "Investor">("PropTrader");

  // Interactive Capital Working Environment state
  const [capital, setCapital] = useState<number>(user.progress.capitalAmountINR || 1000000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [selectedAsset, setSelectedAsset] = useState<string>("EUR/USD");
  const [calculatedLotSize, setCalculatedLotSize] = useState<number>(0.85);

  // Interactive Watchlist state
  const [watchlist, setWatchlist] = useState([
    { symbol: "EUR/USD", price: "1.0850", change: "+0.45%", trend: "UP" },
    { symbol: "GBP/USD", price: "1.2650", change: "+0.28%", trend: "UP" },
    { symbol: "USD/JPY", price: "154.20", change: "-0.62%", trend: "DOWN" },
    { symbol: "Gold (XAU)", price: "$2,420.50", change: "+1.15%", trend: "UP" }
  ]);

  const handleRecalculateCapital = (val: number, risk: number) => {
    setCapital(val);
    setRiskPercent(risk);
    const dollarRisk = (val * (risk / 100)) / 83;
    const lot = dollarRisk / 1500;
    setCalculatedLotSize(parseFloat(lot.toFixed(2)));
  };

  const activeCourse = ACADEMY_COURSES.find(
    (c) => c.slug === (user.progress.enrolledCourseSlug || "forex-basics-free")
  ) || ACADEMY_COURSES[0];

  const FUNNEL_LEVELS = [
    { level: 1, title: "Level 1: Free Visitor", desc: "Access free articles & basic tools" },
    { level: 2, title: "Level 2: Registered Account", desc: "Saved journal & course progress" },
    { level: 3, title: "Level 3: Engaged Trader", desc: "Active drills & simulations" },
    { level: 4, title: "Level 4: Albireo Pro", desc: "Unlimited Monte Carlo & analytics" },
    { level: 5, title: "Level 5: Professional", desc: "Advanced risk APIs & institutional reports" },
    { level: 6, title: "Level 6: Albireo Wealth", desc: "Regulated capital & advisory" }
  ];

  return (
    <PageContainer>
      {/* LEVEL 2 CONVERSION BANNER (IF VISITOR) */}
      {user.progress.funnelLevel <= 1 && (
        <GlassCard className="p-6 border-primary/50 bg-secondary/80 font-sora flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_30px_rgba(34,230,0,0.15)]">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit mb-1">
              <Sparkles className="w-3 h-3" /> Level 2 Conversion
            </span>
            <h3 className="text-base font-bold text-foreground">
              Want to save your course progress, quiz scores & trade journal?
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              Create your free Level 2 Albireo Account to sync saved market watchlists and download certificates.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateAccountOpen(true)}
            className="shrink-0 font-bold uppercase tracking-wider"
          >
            Create Free Account
          </Button>
        </GlassCard>
      )}

      {/* USER WELCOME BANNER */}
      <GlassCard className="p-8 border-primary/40 bg-secondary/50 font-sora relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3 h-3 text-primary" /> {user.subscriptionTier} Member
              </span>
              <span className="px-2 py-0.5 rounded bg-profit/20 text-profit font-mono font-bold text-[10px]">
                Funnel Level {user.progress.funnelLevel} / 6
              </span>
              <span className="text-xs text-muted-foreground">Joined {user.joinedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Good morning, <span className="text-primary">{user.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              Your personalized trading intelligence, saved workspace, and capital risk cockpit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAIResearchOpen(true)}
              className="font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Research
            </Button>

            <Link href="/professional">
              <Button variant="secondary" size="sm" className="font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-profit" /> Level 5 Pro Desk
              </Button>
            </Link>

            {isSuperAdmin && (
              <Link href="/admin">
                <Button variant="cyber" size="sm" className="font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> CEO Command Center
                </Button>
              </Link>
            )}

            {!hasEntitlement("UNLIMITED_MONTE_CARLO") && (
              <Link href="/pricing">
                <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.3)]">
                  <Sparkles className="w-3.5 h-3.5" /> Upgrade to Pro (₹299/mo)
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Level 3 Persona Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-border/80 text-xs">
          <span className="font-bold uppercase tracking-wider text-primary text-[10px] mr-2">
            Level 3 Active Persona:
          </span>
          <button
            onClick={() => setPersona("Beginner")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              persona === "Beginner"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            🔰 Beginner
          </button>
          <button
            onClick={() => setPersona("Trader")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              persona === "Trader"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            📈 Retail Trader
          </button>
          <button
            onClick={() => setPersona("PropTrader")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              persona === "PropTrader"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            🏆 Prop Trader
          </button>
          <button
            onClick={() => setPersona("Investor")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              persona === "Investor"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            💼 Investor
          </button>
        </div>
      </GlassCard>

      {/* 6-LEVEL FUNNEL PROGRESSION TRACKER */}
      <GlassCard className="p-6 border-border font-sora">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3 mb-4">
          Albireo User Journey & Funnel Progression
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {FUNNEL_LEVELS.map((f) => (
            <div
              key={f.level}
              className={`p-3 rounded-lg border flex flex-col justify-between gap-2 transition-all ${
                user.progress.funnelLevel >= f.level
                  ? "bg-secondary border-profit/50 text-foreground"
                  : "bg-hero-bg/50 border-border/50 opacity-40"
              }`}
            >
              <div>
                <span className={`text-[9px] font-bold uppercase block ${user.progress.funnelLevel >= f.level ? "text-profit" : "text-muted-foreground"}`}>
                  {user.progress.funnelLevel >= f.level ? "✓ COMPLETED" : "LOCKED"}
                </span>
                <span className="font-bold text-xs leading-snug block mt-1">{f.title}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-light leading-tight">{f.desc}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* INTERACTIVE CAPITAL WORKING ENVIRONMENT ("I HAVE ₹X CAPITAL") */}
      <GlassCard className="p-6 sm:p-8 border-profit/40 bg-secondary/60 font-sora">
        <div className="flex flex-col gap-4 border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-profit/20 text-profit border border-profit/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-profit" /> Portfolio Working Environment
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">
            Capital Allocation & Drawdown Risk Builder
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light">
            Input your account portfolio capital below to automatically calculate position sizing, risk per trade, and run drawdown simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Capital Controls */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div>
              <label className="text-xs font-bold text-foreground block mb-2">
                Your Total Trading Capital: <span className="text-profit font-mono text-base">₹{capital.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={capital}
                onChange={(e) => handleRecalculateCapital(Number(e.target.value), riskPercent)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
                <span>₹50,000</span>
                <span>₹10 Lakhs</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Max Risk Per Trade (%)</label>
                <select
                  value={riskPercent}
                  onChange={(e) => handleRecalculateCapital(capital, Number(e.target.value))}
                  className="w-full bg-hero-bg border border-border rounded p-2 text-xs font-mono text-foreground"
                >
                  <option value={0.5}>0.5% (Ultra Safe)</option>
                  <option value={1.0}>1.0% (Standard)</option>
                  <option value={1.5}>1.5% (Moderate)</option>
                  <option value={2.0}>2.0% (Aggressive)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Primary Instrument</label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full bg-hero-bg border border-border rounded p-2 text-xs text-foreground"
                >
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="GBP/USD">GBP/USD</option>
                  <option value="Gold (XAU)">Gold (XAU)</option>
                  <option value="USD/JPY">USD/JPY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Live Simulation Output Box */}
          <div className="lg:col-span-6 bg-hero-bg border border-border p-6 rounded-xl flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <span className="font-sora font-bold text-foreground uppercase text-xs">Calculated Risk Output</span>
              <span className="text-profit font-bold text-xs">{selectedAsset}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-secondary rounded border border-border">
                <span className="text-[10px] text-muted-foreground block font-sora">Dollar Risk Cap</span>
                <span className="font-bold text-profit">₹{(capital * (riskPercent / 100)).toLocaleString()}</span>
              </div>
              <div className="p-3 bg-secondary rounded border border-border">
                <span className="text-[10px] text-muted-foreground block font-sora">Recommended Lot</span>
                <span className="font-bold text-primary">{calculatedLotSize} Standard Lots</span>
              </div>
              <div className="p-3 bg-secondary rounded border border-border">
                <span className="text-[10px] text-muted-foreground block font-sora">Ruin Probability</span>
                <span className="font-bold text-foreground">0.05%</span>
              </div>
            </div>

            <Link href="/tools" className="mt-2">
              <Button variant="primary" size="sm" className="w-full font-bold">
                Run 1,000-Iteration Monte Carlo Simulation &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* LEVEL 2 SAVED WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
        {/* LEFT COLUMN: LEARNING & QUIZ SCORES & CERTIFICATES */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ITEM 9 DEDICATED COURSE PROGRESS COCKPIT */}
          <CourseProgressWidget />

          {/* SAVED RESEARCH REPORTS & WATCHLIST */}
          <GlassCard className="p-6 border-border flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h2 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-primary" /> Saved Market Watchlist & Reports
              </h2>
              <span className="text-xs text-muted-foreground">Level 2 Saved Workspace</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {watchlist.map((item, idx) => (
                <div key={idx} className="p-3 bg-hero-bg rounded-lg border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground block">{item.symbol}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.price}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${item.trend === "UP" ? "bg-profit/20 text-profit" : "bg-destructive/20 text-destructive"}`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: USER RISK PROFILE & ITEM 10 PRO SUBSCRIPTION STATUS */}
        <div className="lg:col-span-4 flex flex-col gap-6 font-sora">
          {/* ITEM 10 DEDICATED SUBSCRIPTION DASHBOARD WIDGET */}
          <SubscriptionStatusWidget />

          {/* Risk Profile Card */}
          <GlassCard className="p-6 border-border flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
              Account Risk Profile
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Risk Tolerance</span>
                <span className="font-bold text-primary">{user.riskProfile}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Simulations Executed</span>
                <span className="font-mono font-bold text-foreground">{user.progress.simulationsRun}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Trades Logged</span>
                <span className="font-mono font-bold text-foreground">{user.progress.tradesLoggedCount} / {hasEntitlement("UNLIMITED_JOURNAL") ? "Unlimited" : "50"}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* MODALS */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        studentName={user.name}
        courseTitle={activeCourse.title}
        completionDate={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        certificateId={`ALB-CERT-${user.id.slice(-4).toUpperCase()}-2026`}
      />

      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
      />

      <AIResearchModal
        isOpen={isAIResearchOpen}
        onClose={() => setIsAIResearchOpen(false)}
        assetSymbol={selectedAsset}
      />
    </PageContainer>
  );
}
