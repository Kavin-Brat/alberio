"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Info, Compass } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ReferenceLine, Cell } from "recharts";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";

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
  netSpec: number;
}

export default function CotAnalyzer() {
  const [mounted, setMounted] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("EUR/USD");
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>("1 Year");
  const [chartData, setChartData] = useState<CotDataPoint[]>([]);
  const [sentimentScore, setSentimentScore] = useState<number>(68);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Generate synthetic CFTC COT data points for selected asset & timeframe
    const count = selectedTimeframe === "6 Months" ? 26 : selectedTimeframe === "1 Year" ? 52 : 156;
    const points: CotDataPoint[] = [];

    let baseCommLong = selectedAsset === "EUR/USD" ? 180000 : selectedAsset === "Gold (XAU)" ? 220000 : 95000;
    let baseCommShort = selectedAsset === "EUR/USD" ? 210000 : selectedAsset === "Gold (XAU)" ? 260000 : 110000;
    let baseNonCommLong = selectedAsset === "EUR/USD" ? 240000 : selectedAsset === "Gold (XAU)" ? 290000 : 140000;
    let baseNonCommShort = selectedAsset === "EUR/USD" ? 150000 : selectedAsset === "Gold (XAU)" ? 180000 : 85000;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - count * 7);

    for (let i = 0; i < count; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i * 7);
      const dateStr = d.toISOString().split("T")[0];

      const commLong = Math.round(baseCommLong + Math.sin(i * 0.2) * 15000 + (Math.random() - 0.5) * 4000);
      const commShort = Math.round(baseCommShort + Math.cos(i * 0.2) * 18000 + (Math.random() - 0.5) * 4000);
      const nonCommLong = Math.round(baseNonCommLong + Math.cos(i * 0.18) * 22000 + (Math.random() - 0.5) * 5000);
      const nonCommShort = Math.round(baseNonCommShort - Math.sin(i * 0.18) * 12000 + (Math.random() - 0.5) * 3000);
      
      const retailLong = Math.round(35000 + (Math.random() - 0.5) * 2000);
      const retailShort = Math.round(42000 + (Math.random() - 0.5) * 2000);

      const netSpec = nonCommLong - nonCommShort;

      points.push({
        date: dateStr,
        commLong,
        commShort,
        nonCommLong,
        nonCommShort,
        retailLong,
        retailShort,
        netSpec,
      });
    }

    setChartData(points);

    // Compute composite sentiment score
    const finalPt = points[points.length - 1];
    const prevPt = points[points.length - 2] || points[0];

    const specLongChange = finalPt.nonCommLong - prevPt.nonCommLong;
    const commShortChange = finalPt.commShort - prevPt.commShort;

    const score = Math.round(
      Math.min(95, Math.max(10, 50 + (finalPt.netSpec / 2500) + (specLongChange > 0 ? 8 : -8)))
    );
    setSentimentScore(score);

    const changeSymbol = specLongChange >= 0 ? "+" : "";
    const biasText = score > 60 ? "Strongly Bullish" : score > 52 ? "Bullish" : score > 48 ? "Neutral" : score > 40 ? "Bearish" : "Strongly Bearish";

    setSentimentAnalysis(
      `Non-Commercials (Hedge Funds) added ${changeSymbol}${specLongChange.toLocaleString()} long contracts on ${selectedAsset} this week, pushing net speculative positions to ${changeSymbol}${finalPt.netSpec.toLocaleString()} contracts. Meanwhile, Commercials (Institutions) adjusted short hedges by ${changeSymbol}${commShortChange.toLocaleString()} contracts. Historical sentiment bias is currently ${score}% ${biasText}.`
    );

  }, [selectedAsset, selectedTimeframe]);

  const getBiasColor = (score: number) => {
    if (score >= 60) return "text-profit bg-profit/10 border-profit/30";
    if (score >= 50) return "text-primary bg-primary/10 border-primary/30";
    return "text-loss bg-loss/10 border-loss/30";
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-border pb-6 font-sora">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          Institutional Positioning Intelligence
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          COT Sentiment Visualizer
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed font-light">
          Track CFTC institutional contract distribution. Contrast Commercial hedger patterns against Speculator long/short net ratios to spot structural reversals.
        </p>
      </div>

      {/* CONFIGURATION */}
      <GlassCard className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sora">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-xs uppercase tracking-wider text-foreground">
            Analysis Configuration
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Asset Pair</span>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value as AssetType)}
              className="bg-hero-bg border border-border rounded-sm px-3 py-1.5 text-xs font-bold text-foreground focus:outline-hidden focus:border-primary"
            >
              <option value="EUR/USD" className="bg-[#0b0c0e] text-[#f5f5f5]">EUR/USD (Euro)</option>
              <option value="GBP/USD" className="bg-[#0b0c0e] text-[#f5f5f5]">GBP/USD (Pound)</option>
              <option value="Gold (XAU)" className="bg-[#0b0c0e] text-[#f5f5f5]">Gold (XAU)</option>
              <option value="Crude Oil" className="bg-[#0b0c0e] text-[#f5f5f5]">Crude Oil (WTI)</option>
              <option value="S&P 500" className="bg-[#0b0c0e] text-[#f5f5f5]">S&P 500 (Index)</option>
              <option value="Bitcoin" className="bg-[#0b0c0e] text-[#f5f5f5]">Bitcoin (BTC)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Timeframe</span>
            <div className="flex bg-hero-bg border border-border rounded-sm p-0.5">
              {(["6 Months", "1 Year", "3 Years"] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`text-[10px] md:text-xs px-3 py-1 rounded-xs font-bold cursor-pointer transition-colors ${
                    selectedTimeframe === tf
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* DUAL CHARTS & ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
        <div className="lg:col-span-8 min-w-0 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
                  Raw Institutional Distribution
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Total open interest contracts by segment
                </span>
              </div>
              <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-[#57F287]" /> Commercials</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-[#F59E0B]" /> Speculators</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-[#94A3B8]" /> Retail</span>
              </div>
            </div>

            <div className="relative w-full h-64 min-w-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#57F287" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#57F287" stopOpacity={0.01}/>
                      </linearGradient>
                      <linearGradient id="colorNonComm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" stroke="hsl(0 0% 40%)" fontSize={9} />
                    <YAxis
                      stroke="hsl(0 0% 40%)"
                      fontSize={9}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0d0e12", borderColor: "#333", color: "#fff" }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value: any) => [`${value.toLocaleString()} contracts`, ""]}
                    />
                    <Area type="monotone" dataKey="commLong" stroke="#57F287" fillOpacity={1} fill="url(#colorComm)" strokeWidth={1.5} name="Commercial Longs" />
                    <Area type="monotone" dataKey="nonCommLong" stroke="#F59E0B" fillOpacity={1} fill="url(#colorNonComm)" strokeWidth={1.5} name="Speculator Longs" />
                    <Area type="monotone" dataKey="retailLong" stroke="#94A3B8" fillOpacity={0} strokeWidth={1} name="Retail Longs" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
                  Loading CFTC dataset...
                </div>
              )}
            </div>
          </GlassCard>

          {/* NET SPECULATIVE POSITIONS BAR CHART */}
          <GlassCard className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
                  Net Speculative Index (Longs - Shorts)
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Positive values indicate bullish hedge fund exposure
                </span>
              </div>
            </div>

            <div className="relative w-full h-48 min-w-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" stroke="hsl(0 0% 40%)" fontSize={9} />
                    <YAxis
                      stroke="hsl(0 0% 40%)"
                      fontSize={9}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0d0e12", borderColor: "#333", color: "#fff" }}
                      formatter={(value: any) => [`${value.toLocaleString()} Net Contracts`, "Net Speculative"]}
                    />
                    <Bar dataKey="netSpec" radius={[2, 2, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.netSpec >= 0 ? "#57F287" : "#EF4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
                  Loading Speculative Index...
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* SIDEBAR SENTIMENT BREAKDOWN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Composite Sentiment Gauge
              </span>
              
              <div className={`mt-4 w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center font-bold text-3xl font-mono ${getBiasColor(sentimentScore)}`}>
                {sentimentScore}%
                <span className="text-[9px] font-bold uppercase tracking-widest font-sora mt-0.5">
                  {sentimentScore >= 60 ? "Bullish" : sentimentScore >= 50 ? "Neutral" : "Bearish"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs border-t border-border pt-4">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" /> Key Takeaway
              </h4>
              <p className="text-muted-foreground leading-relaxed font-light">
                {sentimentAnalysis}
              </p>
            </div>

            <div className="p-3 bg-hero-bg rounded-md border border-border flex items-start gap-2.5 text-[11px] text-muted-foreground">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                CFTC reports update every Friday at 3:30 PM EST reflecting Tuesday cutoff data.
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
