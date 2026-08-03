"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Info, HelpCircle, AlertCircle, Compass } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ReferenceLine } from "recharts";

type AssetType = "EUR/USD" | "GBP/USD" | "Gold (XAU)" | "Crude Oil" | "S&P 500" | "Bitcoin";
type TimeframeType = "6 Months" | "1 Year" | "3 Years";

interface CotDataPoint {
  date: string;
  commLong: number;
  commShort: number;
  nonCommLong: number;
  nonCommShort: number;
  retailLong: number;
  retailShort: number;
  netSpec: number; // Speculator Longs - Shorts
}

export default function CotAnalyzer() {
  const [mounted, setMounted] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("EUR/USD");
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>("6 Months");
  const [chartData, setChartData] = useState<CotDataPoint[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState("");
  const [biasScore, setBiasScore] = useState(50); // 0-100 (Bearish to Bullish)

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate mock data based on asset and timeframe
  useEffect(() => {
    const dataPointsCount = selectedTimeframe === "6 Months" ? 24 : selectedTimeframe === "1 Year" ? 52 : 156;
    
    // Seed parameters depending on the asset
    let baseSpecLong = 100000;
    let baseSpecShort = 80000;
    let volatility = 0.05;
    let trendFactor = 0.001; // general drift

    switch (selectedAsset) {
      case "EUR/USD":
        baseSpecLong = 120000;
        baseSpecShort = 95000;
        volatility = 0.03;
        trendFactor = 0.002;
        break;
      case "GBP/USD":
        baseSpecLong = 80000;
        baseSpecShort = 70000;
        volatility = 0.04;
        trendFactor = -0.001;
        break;
      case "Gold (XAU)":
        baseSpecLong = 240000;
        baseSpecShort = 140000;
        volatility = 0.06;
        trendFactor = 0.004;
        break;
      case "Crude Oil":
        baseSpecLong = 350000;
        baseSpecShort = 280000;
        volatility = 0.08;
        trendFactor = -0.003;
        break;
      case "S&P 500":
        baseSpecLong = 450000;
        baseSpecShort = 380000;
        volatility = 0.02;
        trendFactor = 0.003;
        break;
      case "Bitcoin":
        baseSpecLong = 45000;
        baseSpecShort = 30000;
        volatility = 0.15;
        trendFactor = 0.008;
        break;
    }

    const data: CotDataPoint[] = [];
    const now = new Date();
    
    let specLong = baseSpecLong;
    let specShort = baseSpecShort;

    for (let i = dataPointsCount; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });

      // Random walk for Speculator position
      const specLongDelta = specLong * (Math.random() - 0.5 + trendFactor) * volatility;
      const specShortDelta = specShort * (Math.random() - 0.5 - trendFactor) * volatility;
      
      specLong = Math.max(5000, Math.round(specLong + specLongDelta));
      specShort = Math.max(5000, Math.round(specShort + specShortDelta));

      // Commercial positions are usually opposite to Speculators (hedging)
      const commLong = Math.round(specShort * 1.1 + (Math.random() - 0.5) * 5000);
      const commShort = Math.round(specLong * 1.05 + (Math.random() - 0.5) * 5000);

      // Retail is small and random
      const retailLong = Math.round((specLong + commLong) * 0.08 + (Math.random() - 0.5) * 2000);
      const retailShort = Math.round((specShort + commShort) * 0.085 + (Math.random() - 0.5) * 2000);

      data.push({
        date: dateStr,
        commLong,
        commShort,
        nonCommLong: specLong,
        nonCommShort: specShort,
        retailLong,
        retailShort,
        netSpec: specLong - specShort
      });
    }

    setChartData(data);

    // Compute sentiment analysis summaries
    const finalPt = data[data.length - 1];
    const prevPt = data[data.length - 2] || finalPt;
    const netChange = finalPt.netSpec - prevPt.netSpec;
    const changeSymbol = netChange >= 0 ? "+" : "";

    const specLongChange = finalPt.nonCommLong - prevPt.nonCommLong;
    const commShortChange = finalPt.commShort - prevPt.commShort;

    // Sentiment Bias Score (0 to 100)
    const ratio = finalPt.nonCommLong / (finalPt.nonCommLong + finalPt.nonCommShort);
    const score = Math.round(ratio * 100);
    setBiasScore(score);

    const biasText = score > 60 ? "Strongly Bullish" : score > 52 ? "Bullish" : score > 48 ? "Neutral" : score > 40 ? "Bearish" : "Strongly Bearish";

    setSentimentAnalysis(
      `Non-Commercials (Hedge Funds) added ${changeSymbol}${specLongChange.toLocaleString()} long contracts on ${selectedAsset} this week, pushing net speculative positions to ${changeSymbol}${finalPt.netSpec.toLocaleString()} contracts. Meanwhile, Commercials (Institutions) adjusted short hedges by ${changeSymbol}${commShortChange.toLocaleString()} contracts. Historical sentiment bias is currently ${score}% ${biasText}.`
    );

  }, [selectedAsset, selectedTimeframe]);

  const getBiasColor = (score: number) => {
    if (score >= 60) return "text-profit bg-profit/5 border-profit/20";
    if (score >= 50) return "text-cygnus-gold bg-cygnus-gold/5 border-cygnus-gold/20";
    return "text-loss bg-loss/5 border-loss/20";
  };

  return (
    <div className="w-full flex-1 bg-albireo-blue px-4 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2 border-b border-border-custom/50 pb-6">
          <span className="text-xs font-bold text-electric-cyan uppercase tracking-widest">
            Institutional positioning insights
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
            Commitments of Traders (COT) Sentiment Visualizer
          </h1>
          <p className="text-text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Track CFTC institutional contract distribution. Contrast Commercial hedger patterns against Speculator (Hedge Fund) long/short net ratios to spot structural market reversals.
          </p>
        </div>

        {/* SECTION 1: ASSET & TIME SELECTORS */}
        <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-cygnus-gold" />
            <h2 className="font-bold text-sm uppercase tracking-wider text-text-primary">
              Analysis Configuration
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Asset Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted font-semibold">Asset Pair</span>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value as AssetType)}
                className="bg-albireo-blue border border-border-custom rounded-lg px-3 py-1.5 text-xs font-bold text-text-primary focus:outline-none focus:border-cygnus-gold"
              >
                <option value="EUR/USD">EUR/USD (Euro)</option>
                <option value="GBP/USD">GBP/USD (Pound)</option>
                <option value="Gold (XAU)">Gold (XAU)</option>
                <option value="Crude Oil">Crude Oil (WTI)</option>
                <option value="S&P 500">S&P 500 (Index)</option>
                <option value="Bitcoin">Bitcoin (BTC)</option>
              </select>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted font-semibold">Timeframe</span>
              <div className="flex bg-albireo-blue border border-border-custom rounded-lg p-0.5">
                {(["6 Months", "1 Year", "3 Years"] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`text-[10px] md:text-xs px-3 py-1 rounded-md font-bold transition-colors ${
                      selectedTimeframe === tf
                        ? "bg-cygnus-gold text-albireo-blue shadow-sm"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: DUAL CHARTING PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Charts (Left - 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Chart: Raw Contract Amounts */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">
                    Raw Institutional Contract Distribution
                  </h3>
                  <span className="text-[11px] text-text-muted">
                    Total open interest contracts by segment (Long Positions)
                  </span>
                </div>
                <div className="flex gap-4 text-[10px] font-bold">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cygnus-gold" /> Commercials</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-electric-cyan" /> Speculators</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-text-muted" /> Retail</span>
                </div>
              </div>

              <div className="w-full h-64">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNonComm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} />
                      <YAxis
                        stroke="#94A3B8"
                        fontSize={9}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                        labelStyle={{ color: "#F8FAFC" }}
                        itemStyle={{ color: "#06B6D4" }}
                        formatter={(value: any) => [`${value.toLocaleString()} contracts`, ""]}
                      />
                      <Area type="monotone" dataKey="commLong" stroke="#F59E0B" fillOpacity={1} fill="url(#colorComm)" strokeWidth={1.5} name="Commercial Longs" />
                      <Area type="monotone" dataKey="nonCommLong" stroke="#06B6D4" fillOpacity={1} fill="url(#colorNonComm)" strokeWidth={1.5} name="Speculator Longs" />
                      <Area type="monotone" dataKey="retailLong" stroke="#94A3B8" fillOpacity={0} strokeWidth={1} name="Retail Longs" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-albireo-blue/50 flex items-center justify-center text-text-muted text-xs">
                    Loading charts...
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Chart: Net Speculator Positions */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">
                    Net Non-Commercial Positioning (Hedge Funds)
                  </h3>
                  <span className="text-[11px] text-text-muted">
                    Hedge Fund speculative Longs minus Shorts (Net Market Bias)
                  </span>
                </div>
              </div>

              <div className="w-full h-56">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} />
                      <YAxis
                        stroke="#94A3B8"
                        fontSize={9}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                        labelStyle={{ color: "#F8FAFC" }}
                        formatter={(value: any) => [`${value.toLocaleString()} contracts`, "Net Speculators"]}
                      />
                      <ReferenceLine y={0} stroke="#334155" strokeWidth={1.5} />
                      <Bar
                        dataKey="netSpec"
                        fill="#06B6D4"
                        radius={[3, 3, 0, 0]}
                        name="Net Speculator Position"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-albireo-blue/50 flex items-center justify-center text-text-muted text-xs">
                    Loading charts...
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Analysis & Insight Cards (Right - 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Automated Sentiment Box */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">
                Automated Sentiment Analysis
              </h3>
              
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getBiasColor(biasScore)}`}>
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-[10px] uppercase font-bold text-text-muted">CFTC Net Sentiment Bias</span>
                <span className="text-xl font-black mt-1">
                  {biasScore}% {biasScore > 60 ? "Strongly Bullish" : biasScore > 52 ? "Bullish" : biasScore > 48 ? "Neutral" : biasScore > 40 ? "Bearish" : "Strongly Bearish"}
                </span>
              </div>

              <div className="text-xs text-text-muted leading-relaxed flex flex-col gap-3">
                <p className="bg-albireo-blue/40 border border-border-custom/50 rounded-xl p-3.5 text-text-primary/90">
                  {sentimentAnalysis}
                </p>
                <div className="flex gap-2 items-start mt-2">
                  <Info className="w-4 h-4 text-cygnus-gold shrink-0 mt-0.5" />
                  <p className="text-[11px]">
                    <strong>Interpretation Key:</strong> Institutional flow leads retail price action. When speculator bias score exceeds 60% or dips below 40%, it indicates potential over-extension or trend exhaustion.
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Statistics Table */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">
                Positioning Details
              </h3>
              
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-border-custom/40">
                  <span className="text-text-muted">Speculator Longs:</span>
                  <span className="font-bold text-text-primary">
                    {chartData[chartData.length - 1]?.nonCommLong.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-custom/40">
                  <span className="text-text-muted">Speculator Shorts:</span>
                  <span className="font-bold text-text-primary">
                    {chartData[chartData.length - 1]?.nonCommShort.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-custom/40">
                  <span className="text-text-muted">Commercial Hedges:</span>
                  <span className="font-bold text-cygnus-gold">
                    {chartData[chartData.length - 1]?.commShort.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-custom/40">
                  <span className="text-text-muted">Retail (Non-Reportable):</span>
                  <span className="font-bold text-text-muted">
                    {chartData[chartData.length - 1]?.retailLong.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-muted">Asset Class Status:</span>
                  <span className="font-bold text-electric-cyan uppercase tracking-wider text-[10px]">
                    Active Reporting
                  </span>
                </div>
              </div>
            </div>

            {/* Educational Note card */}
            <div className="bg-gradient-to-br from-surface-card to-albireo-blue border border-border-custom rounded-2xl p-5 flex gap-3.5 items-start">
              <Compass className="w-5 h-5 text-cygnus-gold shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5 text-xs text-text-muted">
                <span className="font-bold text-text-primary">What is COT data?</span>
                <p className="leading-relaxed">
                  The CFTC releases commitments of traders reports every Friday at 3:30 PM EST reflecting data from the preceding Tuesday. It exposes structural positioning layers of commercial entities (producers/banks) vs non-commercial spec funds.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
