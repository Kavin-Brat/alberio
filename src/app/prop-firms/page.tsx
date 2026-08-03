"use client";

import { useState, useEffect } from "react";
import { Search, Calculator, ShieldAlert, Award, FileDown, ExternalLink, RefreshCw, Info, Star } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Dot } from "recharts";
import Badge from "@/components/ui/Badge";
import FavoriteStar from "@/components/ui/FavoriteStar";

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

  // Run equity curve simulation
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

      // Compute drawdown threshold based on type
      let limit = 0;
      if (simDrawdownType === "static") {
        limit = initialBalance - maxOverallAmt;
      } else if (simDrawdownType === "trailing-balance") {
        limit = runningPeakBalance - maxOverallAmt;
      } else {
        // trailing-equity simulation
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

  // Run simulation on input changes
  useEffect(() => {
    runSimulationCurve();
  }, [simBalance, simMaxOverallPct, simMaxDailyPct, simDrawdownType, simWinRate, simRiskReward, simRiskPerTrade]);

  // Load preset parameters into simulator
  const loadPreset = (preset: PropFirmPreset) => {
    setSimName(preset.name);
    setSimBalance(preset.startingBalance);
    setSimMaxOverallPct(preset.maxDrawdownPct);
    setSimMaxDailyPct(preset.maxDailyDrawdownPct);
    setSimDrawdownType(preset.drawdownType);
  };

  // Export report / Print
  const handleExport = () => {
    window.print();
  };

  // Filtering Logic
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
    <div className="w-full flex-1 bg-albireo-blue px-4 lg:px-8 py-12 print:bg-white print:text-black">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
        
        {/* Header Title */}
        <div className="flex flex-col gap-2 border-b border-border-custom/50 pb-6 print:hidden">
          <span className="text-xs font-bold text-cygnus-gold uppercase tracking-widest">
            Prop Firms directory & drawdown modeler
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
            Prop Firm Matrix & Rule Simulator
          </h1>
          <p className="text-text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Quantify drawdown risk across trailing balance vs. equity peaks. Filter verified funded challenges, load their rule presets instantly, and stress-test failure margins.
          </p>
        </div>

        {/* SECTION 1: SEARCH & FILTER ENGINE */}
        <div className="bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-5 print:hidden">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-cygnus-gold" />
            <h2 className="font-bold text-sm uppercase tracking-wider text-text-primary">
              Search & Filter Prop Challenges
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Firm Name</label>
              <input
                type="text"
                placeholder="e.g. FTMO, Topstep..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cygnus-gold"
              />
            </div>

            {/* Market Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Target Market</label>
              <select
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
              >
                <option value="all">All Markets</option>
                <option value="forex">Forex</option>
                <option value="futures">Futures</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>

            {/* Drawdown Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Drawdown Model</label>
              <select
                value={drawdownTypeFilter}
                onChange={(e) => setDrawdownTypeFilter(e.target.value)}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
              >
                <option value="all">All Models</option>
                <option value="static">Static Drawdown</option>
                <option value="trailing-balance">Trailing Balance</option>
                <option value="trailing-equity">Trailing Equity</option>
              </select>
            </div>

            {/* Capital Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Starting Capital</label>
              <select
                value={capitalFilter}
                onChange={(e) => setCapitalFilter(e.target.value)}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
              >
                <option value="all">All Capital Sizes</option>
                <option value="10k">$10K - $15K</option>
                <option value="25k">$25K - $30K</option>
                <option value="50k">$50K</option>
                <option value="100k">$100K</option>
                <option value="200k">$200K+</option>
              </select>
            </div>

            {/* Model Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Evaluation Steps</label>
              <select
                value={stepFilter}
                onChange={(e) => setStepFilter(e.target.value)}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
              >
                <option value="all">All Models</option>
                <option value="1-step">1-Step</option>
                <option value="2-step">2-Step</option>
                <option value="instant">Instant Funded</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE DRAWDOWN RULE SIMULATOR */}
        <div id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24">
          
          {/* Simulator Inputs (Left - 5 Cols) */}
          <div className="lg:col-span-5 bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-5 print:hidden">
            <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cygnus-gold" />
                <h2 className="font-bold text-sm uppercase tracking-wider text-text-primary">
                  Rule Simulator Settings
                </h2>
              </div>
              <span className="text-[10px] text-electric-cyan font-bold bg-electric-cyan/15 border border-electric-cyan/20 px-2 py-0.5 rounded">
                {simName}
              </span>
            </div>

            {/* Starting Balance */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted font-semibold">Starting Balance</span>
                <span className="text-text-primary font-bold">${simBalance.toLocaleString()}</span>
              </div>
              <input
                type="number"
                value={simBalance}
                onChange={(e) => setSimBalance(Number(e.target.value))}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
              />
            </div>

            {/* Max Drawdown Types */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted font-semibold">Overall Drawdown</span>
                  <span className="text-text-primary font-bold">{simMaxOverallPct}%</span>
                </div>
                <input
                  type="number"
                  min="2"
                  max="25"
                  value={simMaxOverallPct}
                  onChange={(e) => setSimMaxOverallPct(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted font-semibold">Max Daily Drawdown</span>
                  <span className="text-text-primary font-bold">{simMaxDailyPct}%</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={simMaxDailyPct}
                  onChange={(e) => setSimMaxDailyPct(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>
            </div>

            {/* Drawdown Type Radio */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-text-muted font-semibold">Drawdown Trailing Decays</span>
              <div className="grid grid-cols-3 gap-2">
                {(["static", "trailing-balance", "trailing-equity"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSimDrawdownType(type)}
                    className={`text-[10px] md:text-xs py-2.5 px-1 rounded-lg border font-bold capitalize transition-all duration-200 ${
                      simDrawdownType === type
                        ? "bg-cygnus-gold border-cygnus-gold text-albireo-blue shadow-lg shadow-cygnus-gold/25"
                        : "bg-albireo-blue/50 border-border-custom text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Management Inputs */}
            <div className="grid grid-cols-3 gap-3 border-t border-border-custom/50 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Win Rate</label>
                <input
                  type="number"
                  value={simWinRate}
                  onChange={(e) => setSimWinRate(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">R:R Ratio</label>
                <input
                  type="number"
                  step="0.5"
                  value={simRiskReward}
                  onChange={(e) => setSimRiskReward(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Risk/Trade</label>
                <input
                  type="number"
                  step="0.5"
                  value={simRiskPerTrade}
                  onChange={(e) => setSimRiskPerTrade(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-2 py-1.5 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>
            </div>

            <button
              onClick={runSimulationCurve}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-albireo-blue hover:bg-albireo-blue/70 text-text-primary border border-border-custom rounded-xl text-xs font-bold transition-all duration-200"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-Run 50-Trade Trial
            </button>
          </div>

          {/* Simulator Visuals (Right - 7 Cols) */}
          <div className="lg:col-span-7 min-w-0 bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">
                  Simulated 50-Trade Equity Path
                </h3>
                <span className="text-xs text-text-muted mt-0.5">
                  Visualizing account limits against simulated volatility
                </span>
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 bg-albireo-blue hover:bg-albireo-blue/75 border border-border-custom text-text-primary hover:text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors print:hidden"
              >
                <FileDown className="w-3.5 h-3.5 text-cygnus-gold" /> Export PDF
              </button>
            </div>

            {/* Custom Recharts Container */}
            <div className="relative w-full h-72 min-w-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={simulationData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="tradeNum" stroke="#94A3B8" fontSize={10} />
                    <YAxis
                      stroke="#94A3B8"
                      fontSize={10}
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                      labelStyle={{ color: "#F8FAFC" }}
                      itemStyle={{ color: "#06B6D4" }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="Balance"
                      stroke="#06B6D4"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="stepAfter"
                      dataKey="DrawdownLimit"
                      stroke="#EF4444"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-albireo-blue/50 flex items-center justify-center text-text-muted text-xs">
                  Loading charts...
                </div>
              )}
            </div>

            {/* Simulation Status / Risk Warning Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-albireo-blue/40 border border-border-custom/50 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-text-muted uppercase">Simulation Outcome</span>
                {breachedAt !== null ? (
                  <span className="text-base font-black text-loss flex items-center gap-1.5 mt-1">
                    <ShieldAlert className="w-4 h-4" /> Breached at Trade #{breachedAt}
                  </span>
                ) : (
                  <span className="text-base font-black text-profit flex items-center gap-1.5 mt-1">
                    <Award className="w-4 h-4" /> Account Cleared (50 Trades)
                  </span>
                )}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-custom/30 text-xs">
                  <div>
                    <span className="text-text-muted block text-[10px]">Peak Balance</span>
                    <span className="text-text-primary font-bold">${peakBalance.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px]">Final Balance</span>
                    <span className="text-text-primary font-bold">${finalBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-loss/5 border border-loss/20 flex gap-3 items-start">
                <ShieldAlert className="w-4 h-4 text-loss shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-loss uppercase tracking-wider">Trailing Risk Warning</span>
                  <p className="text-[11px] text-text-muted leading-normal">
                    {simDrawdownType === "trailing-equity"
                      ? "Under Trailing Equity rules, leaving $2,000 in floating profits unclosed reduces your allowed drawdown buffer by $2,000 immediately."
                      : "Even under Static or Balance Trailing rules, normal statistical variance (losing streaks of 5+ trades) requires risking under 1% per position to maintain safety."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: PROP FIRM CARDS GRID */}
        <div className="flex flex-col gap-6 print:hidden">
          <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
            <h2 className="font-extrabold text-xl text-text-primary tracking-tight">
              Indexed Program Presets
            </h2>
            <span className="text-xs text-text-muted">
              Showing {filteredPresets.length} Prop Firm options
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPresets.map((firm) => (
              <div
                key={firm.id}
                className="bg-surface-card border border-border-custom hover:border-cygnus-gold/40 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cygnus-gold/5 rounded-full blur-xl pointer-events-none group-hover:bg-cygnus-gold/10 transition-colors" />

                {/* Top Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="gold">
                      {firm.tag}
                    </Badge>
                    
                    <div className="flex items-center gap-2">
                      <FavoriteStar
                        active={favorites.includes(firm.id)}
                        onClick={() => toggleFavorite(firm.id)}
                        title={favorites.includes(firm.id) ? "Remove from Favorites" : "Add to Favorites"}
                      />
                      <div className="flex items-center gap-1 text-xs font-semibold text-text-primary">
                        <Star className="w-3.5 h-3.5 text-cygnus-gold fill-current" />
                        {firm.rating}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 flex flex-col gap-2">
                    <h3 className="text-xl font-extrabold text-text-primary">{firm.name}</h3>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <Badge>
                        {firm.market.replace("-", " & ")}
                      </Badge>
                      <Badge className="font-bold uppercase text-[9px]">
                        {firm.steps}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Metrics */}
                  <div className="grid grid-cols-2 gap-3 bg-albireo-blue/40 border border-border-custom/50 rounded-xl p-3.5 my-3 text-xs">
                    <div>
                      <span className="text-text-muted text-[10px] uppercase">Max Drawdown</span>
                      <span className="text-text-primary font-bold block mt-0.5">{firm.maxDrawdownPct}%</span>
                    </div>
                    <div>
                      <span className="text-text-muted text-[10px] uppercase">Daily Limit</span>
                      <span className="text-text-primary font-bold block mt-0.5">{firm.maxDailyDrawdownPct}%</span>
                    </div>
                    <div>
                      <span className="text-text-muted text-[10px] uppercase">Profit Split</span>
                      <span className="text-text-primary font-bold block mt-0.5">{firm.profitSplit}%</span>
                    </div>
                    <div>
                      <span className="text-text-muted text-[10px] uppercase">Drawdown Type</span>
                      <span className="text-text-primary font-semibold block mt-0.5 capitalize text-[10px]">
                        {firm.drawdownType.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2.5 mt-4">
                  <button
                    onClick={() => {
                      loadPreset(firm);
                      const element = document.getElementById("simulator");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2 bg-cygnus-gold text-albireo-blue font-extrabold rounded-lg text-xs shadow-md shadow-cygnus-gold/10 hover:shadow-cygnus-gold/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5" /> Simulate Rules
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedReview(firm)}
                      className="py-1.5 bg-albireo-blue border border-border-custom hover:border-text-muted/40 text-text-muted hover:text-text-primary rounded-lg text-xs font-semibold transition-colors"
                    >
                      Read Rules
                    </button>
                    <a
                      href={firm.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 bg-surface-card border border-border-custom hover:bg-albireo-blue text-electric-cyan font-bold rounded-lg text-xs text-center flex items-center justify-center gap-1 hover:border-electric-cyan/20 transition-all"
                    >
                      Buy Fund <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: RULE MODAL (Read Rules) */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-card border border-border-custom rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
                <h3 className="text-lg font-bold text-text-primary">{selectedReview.name} Rule Guide</h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-text-muted hover:text-text-primary font-bold text-sm bg-albireo-blue border border-border-custom/50 px-2 py-0.5 rounded"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4 text-sm text-text-muted leading-relaxed">
                <div>
                  <span className="font-bold text-xs text-text-primary uppercase block">Drawdown Rule Model</span>
                  <p className="mt-1">
                    {selectedReview.drawdownType === "trailing-equity"
                      ? "Funding Pips employs trailing equity rules. This means the overall drawdown limit trails your peak floating equity. If you fail to lock in profits, the absolute loss limit remains at the high peak, reducing available buffer."
                      : selectedReview.drawdownType === "trailing-balance"
                      ? "Topstep uses trailing balance rules evaluated at the end of the trading day. Only closed trades adjust the peak balance, meaning intraday floating equity fluctuations do not contract your total loss limits."
                      : "FTMO uses static daily rules. The overall loss limit is fixed relative to your starting balance (e.g. $10,000 for a $100,000 account) and resets daily. Floating profits do not contract your allowance."}
                  </p>
                </div>

                <div className="bg-albireo-blue/50 p-4 border border-border-custom rounded-xl text-xs flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span>Discount Code:</span>
                    <span className="font-bold text-cygnus-gold">{selectedReview.discountCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Evaluation Steps:</span>
                    <span className="font-semibold text-text-primary capitalize">{selectedReview.steps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support Markets:</span>
                    <span className="font-semibold text-text-primary capitalize">{selectedReview.market.replace("-", " & ")}</span>
                  </div>
                </div>

                <a
                  href={selectedReview.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 bg-cygnus-gold hover:bg-cygnus-gold/90 text-albireo-blue font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  Claim discount at {selectedReview.name} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
