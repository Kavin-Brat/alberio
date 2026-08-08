"use client";

import { useState, useEffect } from "react";
import { Search, Calculator, ShieldAlert, Award, FileDown, ExternalLink, RefreshCw, Star } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Badge from "@/components/ui/Badge";
import FavoriteStar from "@/components/ui/FavoriteStar";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";

interface PropFirmPreset {
  id: string;
  name: string;
  market: "forex" | "futures" | "crypto" | "forex-crypto";
  drawdownType: "static" | "trailing-balance" | "trailing-equity";
  startingBalance: number;
  maxDrawdownPct: number;
  maxDailyDrawdownPct: number;
  profitSplit: number;
  rating: number;
  steps: "1-step" | "2-step" | "instant";
  tag: string;
  discountCode: string;
  affiliateLink: string;
}

const PRESETS: PropFirmPreset[] = [
  {
    id: "ftmo",
    name: "FTMO",
    market: "forex-crypto",
    drawdownType: "static",
    startingBalance: 100000,
    maxDrawdownPct: 10,
    maxDailyDrawdownPct: 5,
    profitSplit: 90,
    rating: 4.9,
    steps: "2-step",
    tag: "Top Rated",
    discountCode: "ALBIREO10",
    affiliateLink: "https://ftmo.com"
  },
  {
    id: "topstep",
    name: "Topstep",
    market: "futures",
    drawdownType: "trailing-balance",
    startingBalance: 50000,
    maxDrawdownPct: 6,
    maxDailyDrawdownPct: 3,
    profitSplit: 90,
    rating: 4.8,
    steps: "1-step",
    tag: "Futures Leader",
    discountCode: "ALBIREOFUT",
    affiliateLink: "https://topstep.com"
  },
  {
    id: "funding-pips",
    name: "Funding Pips",
    market: "forex-crypto",
    drawdownType: "trailing-equity",
    startingBalance: 100000,
    maxDrawdownPct: 10,
    maxDailyDrawdownPct: 5,
    profitSplit: 80,
    rating: 4.7,
    steps: "2-step",
    tag: "Fast Payout",
    discountCode: "PIPS5",
    affiliateLink: "https://fundingpips.com"
  },
  {
    id: "instant-funding",
    name: "Instant Funding",
    market: "forex",
    drawdownType: "static",
    startingBalance: 25000,
    maxDrawdownPct: 10,
    maxDailyDrawdownPct: 5,
    profitSplit: 70,
    rating: 4.6,
    steps: "instant",
    tag: "Instant Funded",
    discountCode: "INSTANTALB",
    affiliateLink: "https://instantfunding.io"
  }
];

export default function PropFirmMatrix() {
  const [mounted, setMounted] = useState(false);
  
  // Search & Filter state
  const [search, setSearch] = useState("");
  const [marketFilter, setMarketFilter] = useState<string>("all");
  const [drawdownTypeFilter, setDrawdownTypeFilter] = useState<string>("all");
  const [capitalFilter, setCapitalFilter] = useState<string>("all");
  const [stepFilter, setStepFilter] = useState<string>("all");

  // Simulator Inputs
  const [simName, setSimName] = useState("Custom Preset");
  const [simBalance, setSimBalance] = useState(100000);
  const [simMaxOverallPct, setSimMaxOverallPct] = useState(10);
  const [simMaxDailyPct, setSimMaxDailyPct] = useState(5);
  const [simDrawdownType, setSimDrawdownType] = useState<"static" | "trailing-balance" | "trailing-equity">("static");
  const [simWinRate, setSimWinRate] = useState(55);
  const [simRiskReward, setSimRiskReward] = useState(2.0);
  const [simRiskPerTrade, setSimRiskPerTrade] = useState(1.0);

  // Simulator Outputs
  const [simulationData, setSimulationData] = useState<any[]>([]);
  const [breachedAt, setBreachedAt] = useState<number | null>(null);
  const [peakBalance, setPeakBalance] = useState(100000);
  const [finalBalance, setFinalBalance] = useState(100000);

  // Review Modal state
  const [selectedReview, setSelectedReview] = useState<PropFirmPreset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem("albireo_firm_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {}
    }
  }, []);

  const toggleFavorite = (firmId: string) => {
    const updated = favorites.includes(firmId)
      ? favorites.filter((id) => id !== firmId)
      : [...favorites, firmId];
    setFavorites(updated);
    localStorage.setItem("albireo_firm_favorites", JSON.stringify(updated));
  };

  const runSimulationCurve = () => {
    const numTrades = 50;
    const initialBalance = simBalance;
    const maxOverallAmt = initialBalance * (simMaxOverallPct / 100);
    const riskAmt = initialBalance * (simRiskPerTrade / 100);
    
    let currentBalance = initialBalance;
    let runningPeakBalance = initialBalance;
    let runningPeakEquity = initialBalance;
    let firstBreachIndex: number | null = null;
    
    const chartData = [
      {
        tradeNum: 0,
        Balance: initialBalance,
        DrawdownLimit: initialBalance - maxOverallAmt,
        isBreached: false
      }
    ];

    for (let i = 1; i <= numTrades; i++) {
      const isWin = Math.random() * 100 < simWinRate;
      const pnl = isWin ? riskAmt * simRiskReward : -riskAmt;
      
      currentBalance += pnl;
      
      if (currentBalance > runningPeakBalance) {
        runningPeakBalance = currentBalance;
      }

      let limit = 0;
      if (simDrawdownType === "static") {
        limit = initialBalance - maxOverallAmt;
      } else if (simDrawdownType === "trailing-balance") {
        limit = runningPeakBalance - maxOverallAmt;
      } else {
        const floatingPeakMultiplier = isWin ? 1.25 : 1.0;
        const simulatedPeakEquity = currentBalance - pnl + (isWin ? pnl * floatingPeakMultiplier : 0);
        if (simulatedPeakEquity > runningPeakEquity) {
          runningPeakEquity = simulatedPeakEquity;
        }
        limit = runningPeakEquity - maxOverallAmt;
      }

      const isBreached = currentBalance <= limit;
      if (isBreached && firstBreachIndex === null) {
        firstBreachIndex = i;
      }

      chartData.push({
        tradeNum: i,
        Balance: Math.round(currentBalance),
        DrawdownLimit: Math.round(limit),
        isBreached: isBreached || (firstBreachIndex !== null)
      });
    }

    setSimulationData(chartData);
    setBreachedAt(firstBreachIndex);
    setPeakBalance(Math.round(runningPeakBalance));
    setFinalBalance(Math.round(currentBalance));
  };

  useEffect(() => {
    runSimulationCurve();
  }, [simBalance, simMaxOverallPct, simMaxDailyPct, simDrawdownType, simWinRate, simRiskReward, simRiskPerTrade]);

  const loadPreset = (preset: PropFirmPreset) => {
    setSimName(preset.name);
    setSimBalance(preset.startingBalance);
    setSimMaxOverallPct(preset.maxDrawdownPct);
    setSimMaxDailyPct(preset.maxDailyDrawdownPct);
    setSimDrawdownType(preset.drawdownType);
  };

  const handleExport = () => {
    window.print();
  };

  const filteredPresets = PRESETS.filter((firm) => {
    const matchesSearch = firm.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesMarket =
      marketFilter === "all" ||
      firm.market === marketFilter ||
      (marketFilter === "forex" && firm.market === "forex-crypto") ||
      (marketFilter === "crypto" && firm.market === "forex-crypto");
      
    const matchesDrawdown =
      drawdownTypeFilter === "all" || firm.drawdownType === drawdownTypeFilter;
      
    const matchesCapital =
      capitalFilter === "all" ||
      (capitalFilter === "10k" && firm.startingBalance <= 15000) ||
      (capitalFilter === "25k" && firm.startingBalance > 15000 && firm.startingBalance <= 30000) ||
      (capitalFilter === "50k" && firm.startingBalance > 30000 && firm.startingBalance <= 75000) ||
      (capitalFilter === "100k" && firm.startingBalance > 75000 && firm.startingBalance <= 150000) ||
      (capitalFilter === "200k" && firm.startingBalance > 150000);
      
    const matchesSteps = stepFilter === "all" || firm.steps === stepFilter;

    return matchesSearch && matchesMarket && matchesDrawdown && matchesCapital && matchesSteps;
  });

  return (
    <PageContainer className="print:bg-white print:text-black">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border pb-6 print:hidden">
        <span className="text-xs font-sora font-bold text-primary uppercase tracking-widest">
          Prop Firm Matrix & Drawdown Modeler
        </span>
        <h1 className="text-3xl md:text-5xl font-sora font-bold text-foreground tracking-tight">
          Prop Firm Directory & Simulator
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Quantify drawdown risk across trailing balance vs. equity peaks. Filter verified funded challenges, load rule presets instantly, and stress-test failure margins.
        </p>
      </div>

      {/* SEARCH & FILTER */}
      <GlassCard className="flex flex-col gap-5 print:hidden">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-primary" />
          <h2 className="font-sora font-bold text-xs uppercase tracking-wider text-foreground">
            Search & Filter Prop Challenges
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Firm Name</label>
            <input
              type="text"
              placeholder="e.g. FTMO, Topstep..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Target Market</label>
            <select
              value={marketFilter}
              onChange={(e) => setMarketFilter(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary font-sora"
            >
              <option value="all" className="bg-[#0b0c0e] text-[#f5f5f5]">All Markets</option>
              <option value="forex" className="bg-[#0b0c0e] text-[#f5f5f5]">Forex</option>
              <option value="futures" className="bg-[#0b0c0e] text-[#f5f5f5]">Futures</option>
              <option value="crypto" className="bg-[#0b0c0e] text-[#f5f5f5]">Crypto</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Drawdown Model</label>
            <select
              value={drawdownTypeFilter}
              onChange={(e) => setDrawdownTypeFilter(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary font-sora"
            >
              <option value="all" className="bg-[#0b0c0e] text-[#f5f5f5]">All Models</option>
              <option value="static" className="bg-[#0b0c0e] text-[#f5f5f5]">Static Drawdown</option>
              <option value="trailing-balance" className="bg-[#0b0c0e] text-[#f5f5f5]">Trailing Balance</option>
              <option value="trailing-equity" className="bg-[#0b0c0e] text-[#f5f5f5]">Trailing Equity</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Starting Capital</label>
            <select
              value={capitalFilter}
              onChange={(e) => setCapitalFilter(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary font-sora"
            >
              <option value="all" className="bg-[#0b0c0e] text-[#f5f5f5]">All Capital Sizes</option>
              <option value="10k" className="bg-[#0b0c0e] text-[#f5f5f5]">$10K - $15K</option>
              <option value="25k" className="bg-[#0b0c0e] text-[#f5f5f5]">$25K - $30K</option>
              <option value="50k" className="bg-[#0b0c0e] text-[#f5f5f5]">$50K</option>
              <option value="100k" className="bg-[#0b0c0e] text-[#f5f5f5]">$100K</option>
              <option value="200k" className="bg-[#0b0c0e] text-[#f5f5f5]">$200K+</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Evaluation Steps</label>
            <select
              value={stepFilter}
              onChange={(e) => setStepFilter(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary font-sora"
            >
              <option value="all" className="bg-[#0b0c0e] text-[#f5f5f5]">All Models</option>
              <option value="1-step" className="bg-[#0b0c0e] text-[#f5f5f5]">1-Step</option>
              <option value="2-step" className="bg-[#0b0c0e] text-[#f5f5f5]">2-Step</option>
              <option value="instant" className="bg-[#0b0c0e] text-[#f5f5f5]">Instant Funded</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* DRAWDOWN SIMULATOR */}
      <div id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24">
        {/* Settings */}
        <GlassCard className="lg:col-span-5 flex flex-col gap-5 print:hidden">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <h2 className="font-sora font-bold text-xs uppercase tracking-wider text-foreground">
                Simulator Parameters
              </h2>
            </div>
            <span className="text-[10px] text-primary font-sora font-bold bg-primary/15 border border-primary/25 px-2 py-0.5 rounded-xs">
              {simName}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-semibold">Starting Balance</span>
              <span className="text-foreground font-bold">${simBalance.toLocaleString()}</span>
            </div>
            <input
              type="number"
              value={simBalance}
              onChange={(e) => setSimBalance(Number(e.target.value))}
              className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-semibold">Overall Drawdown</span>
                <span className="text-foreground font-bold">{simMaxOverallPct}%</span>
              </div>
              <input
                type="number"
                min="2"
                max="25"
                value={simMaxOverallPct}
                onChange={(e) => setSimMaxOverallPct(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-semibold">Max Daily Limit</span>
                <span className="text-foreground font-bold">{simMaxDailyPct}%</span>
              </div>
              <input
                type="number"
                min="1"
                max="15"
                value={simMaxDailyPct}
                onChange={(e) => setSimMaxDailyPct(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground font-semibold">Drawdown Trailing Model</span>
            <div className="grid grid-cols-3 gap-2">
              {(["static", "trailing-balance", "trailing-equity"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSimDrawdownType(type)}
                  className={`text-[10px] md:text-xs py-2 px-1 rounded-xs border font-sora font-bold capitalize transition-all duration-200 cursor-pointer ${
                    simDrawdownType === type
                      ? "bg-primary border-primary text-primary-foreground shadow-[0_0_12px_rgba(34,230,0,0.4)]"
                      : "bg-hero-bg border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Win Rate</label>
              <input
                type="number"
                value={simWinRate}
                onChange={(e) => setSimWinRate(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-2 py-1.5 text-xs text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">R:R Ratio</label>
              <input
                type="number"
                step="0.5"
                value={simRiskReward}
                onChange={(e) => setSimRiskReward(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-2 py-1.5 text-xs text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Risk/Trade</label>
              <input
                type="number"
                step="0.5"
                value={simRiskPerTrade}
                onChange={(e) => setSimRiskPerTrade(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-2 py-1.5 text-xs text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={runSimulationCurve}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-Run 50-Trade Trial
          </Button>
        </GlassCard>

        {/* Visualizer */}
        <GlassCard className="lg:col-span-7 min-w-0 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-sora font-bold text-xs uppercase tracking-wider text-foreground">
                Simulated 50-Trade Equity Path
              </h3>
              <span className="text-xs text-muted-foreground mt-0.5">
                Visualizing account limits against simulated volatility
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-1.5 print:hidden"
            >
              <FileDown className="w-3.5 h-3.5 text-primary" /> Export PDF
            </Button>
          </div>

          <div className="relative w-full h-72 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={simulationData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="tradeNum" stroke="hsl(0 0% 40%)" fontSize={10} />
                  <YAxis
                    stroke="hsl(0 0% 40%)"
                    fontSize={10}
                    domain={["auto", "auto"]}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0d0e12", borderColor: "#333", color: "#fff" }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#57F287" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: 10 }} />
                  <Line
                    type="monotone"
                    dataKey="Balance"
                    stroke="#57F287"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="stepAfter"
                    dataKey="DrawdownLimit"
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-hero-bg/50 flex items-center justify-center text-muted-foreground text-xs">
                Loading charts...
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-hero-bg/60 border border-border flex flex-col justify-center">
              <span className="text-[10px] font-sora font-bold text-muted-foreground uppercase">Simulation Outcome</span>
              {breachedAt !== null ? (
                <span className="text-base font-sora font-bold text-loss flex items-center gap-1.5 mt-1">
                  <ShieldAlert className="w-4 h-4" /> Breached at Trade #{breachedAt}
                </span>
              ) : (
                <span className="text-base font-sora font-bold text-primary flex items-center gap-1.5 mt-1">
                  <Award className="w-4 h-4" /> Account Cleared (50 Trades)
                </span>
              )}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border text-xs font-sora">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Peak Balance</span>
                  <span className="text-foreground font-bold">${peakBalance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Final Balance</span>
                  <span className="text-foreground font-bold">${finalBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-sm bg-loss/10 border border-loss/25 flex gap-3 items-start">
              <ShieldAlert className="w-4 h-4 text-loss shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-sora font-bold text-loss uppercase tracking-wider">Trailing Risk Warning</span>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  {simDrawdownType === "trailing-equity"
                    ? "Under Trailing Equity rules, leaving floating profits unclosed contracts your allowed loss limit immediately."
                    : "Risking under 1% per position is essential to handle 5+ consecutive trade loss streaks."}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* PROP FIRM CARDS GRID */}
      <div className="flex flex-col gap-6 print:hidden">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-sora font-bold text-xl text-foreground tracking-tight uppercase">
            Indexed Program Presets
          </h2>
          <span className="text-xs text-muted-foreground">
            Showing {filteredPresets.length} Prop Firm options
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPresets.map((firm) => (
            <GlassCard key={firm.id} className="flex flex-col justify-between group">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge variant="gold">{firm.tag}</Badge>
                  <div className="flex items-center gap-2">
                    <FavoriteStar
                      active={favorites.includes(firm.id)}
                      onClick={() => toggleFavorite(firm.id)}
                    />
                    <div className="flex items-center gap-1 text-xs font-sora font-bold text-foreground">
                      <Star className="w-3.5 h-3.5 text-primary fill-current" />
                      {firm.rating}
                    </div>
                  </div>
                </div>

                <div className="mt-1 flex flex-col gap-2">
                  <h3 className="text-xl font-sora font-bold text-foreground group-hover:text-primary transition-colors">
                    {firm.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Badge>{firm.market.replace("-", " & ")}</Badge>
                    <Badge className="font-bold uppercase text-[9px]">{firm.steps}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-hero-bg/60 border border-border rounded-sm p-3.5 my-2 text-xs font-sans">
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Max Drawdown</span>
                    <span className="text-foreground font-bold mt-0.5 block">{firm.maxDrawdownPct}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Daily Limit</span>
                    <span className="text-foreground font-bold mt-0.5 block">{firm.maxDailyDrawdownPct}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Profit Split</span>
                    <span className="text-foreground font-bold mt-0.5 block">{firm.profitSplit}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Model</span>
                    <span className="text-primary font-semibold mt-0.5 block capitalize text-[10px]">
                      {firm.drawdownType.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-4">
                <Button
                  variant="cyber"
                  size="sm"
                  onClick={() => {
                    loadPreset(firm);
                    const element = document.getElementById("simulator");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" /> Simulate Rules
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedReview(firm)}
                    className="w-full text-xs"
                  >
                    Read Rules
                  </Button>
                  <a
                    href={firm.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 bg-hero-bg border border-primary/30 hover:border-primary text-primary font-sora font-semibold rounded-sm text-xs text-center flex items-center justify-center gap-1 uppercase transition-all"
                  >
                    Get Fund <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* RULE MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full border-primary/40">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-sora font-bold text-foreground">{selectedReview.name} Rule Guide</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReview(null)}
              >
                Close
              </Button>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <span className="font-sora font-bold text-xs text-primary uppercase block">Drawdown Rule Model</span>
                <p className="mt-1">
                  {selectedReview.drawdownType === "trailing-equity"
                    ? "Funding Pips employs trailing equity rules where loss limits trail peak floating profits."
                    : selectedReview.drawdownType === "trailing-balance"
                    ? "Topstep uses trailing balance rules evaluated at day close based on closed positions."
                    : "FTMO uses static daily rules fixed relative to starting balance."}
                </p>
              </div>

              <div className="bg-hero-bg p-4 border border-border rounded-sm text-xs flex flex-col gap-2 font-sora">
                <div className="flex justify-between">
                  <span>Discount Code:</span>
                  <span className="font-bold text-primary text-glow-green">{selectedReview.discountCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Evaluation Steps:</span>
                  <span className="font-semibold text-foreground capitalize">{selectedReview.steps}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Markets:</span>
                  <span className="font-semibold text-foreground capitalize">{selectedReview.market.replace("-", " & ")}</span>
                </div>
              </div>

              <a
                href={selectedReview.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-primary text-primary-foreground font-sora font-bold uppercase rounded-sm hover:shadow-[0_0_20px_rgba(34,230,0,0.5)] transition-all flex items-center justify-center gap-1.5"
              >
                Claim discount at {selectedReview.name} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </GlassCard>
        </div>
      )}
    </PageContainer>
  );
}
