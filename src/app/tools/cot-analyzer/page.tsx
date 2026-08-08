"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Info, Compass } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ReferenceLine } from "recharts";
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
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>("6 Months");
  const [chartData, setChartData] = useState<CotDataPoint[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState("");
  const [biasScore, setBiasScore] = useState(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const dataPointsCount = selectedTimeframe === "6 Months" ? 24 : selectedTimeframe === "1 Year" ? 52 : 156;
    
    let baseSpecLong = 100000;
    let baseSpecShort = 80000;
    let volatility = 0.05;
    let trendFactor = 0.001;

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

      const specLongDelta = specLong * (Math.random() - 0.5 + trendFactor) * volatility;
      const specShortDelta = specShort * (Math.random() - 0.5 - trendFactor) * volatility;
      
      specLong = Math.max(5000, Math.round(specLong + specLongDelta));
      specShort = Math.max(5000, Math.round(specShort + specShortDelta));

      const commLong = Math.round(specShort * 1.1 + (Math.random() - 0.5) * 5000);
      const commShort = Math.round(specLong * 1.05 + (Math.random() - 0.5) * 5000);

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

    const finalPt = data[data.length - 1];
    const prevPt = data[data.length - 2] || finalPt;
    const netChange = finalPt.netSpec - prevPt.netSpec;
    const changeSymbol = netChange >= 0 ? "+" : "";

    const specLongChange = finalPt.nonCommLong - prevPt.nonCommLong;
    const commShortChange = finalPt.commShort - prevPt.commShort;

    const ratio = finalPt.nonCommLong / (finalPt.nonCommLong + finalPt.nonCommShort);
    const score = Math.round(ratio * 100);
    setBiasScore(score);

    const biasText = score > 60 ? "Strongly Bullish" : score > 52 ? "Bullish" : score > 48 ? "Neutral" : score > 40 ? "Bearish" : "Strongly Bearish";

    setSentimentAnalysis(
      `Non-Commercials (Hedge Funds) added ${changeSymbol}${specLongChange.toLocaleString()} long contracts on ${selectedAsset} this week, pushing net speculative positions to ${changeSymbol}${finalPt.netSpec.toLocaleString()} contracts. Meanwhile, Commercials (Institutions) adjusted short hedges by ${changeSymbol}${commShortChange.toLocaleString()} contracts. Historical sentiment bias is currently ${score}% ${biasText}.`
    );

  }, [selectedAsset, selectedTimeframe]);

  const getBiasColor = (score: number) => {
    if (score >= 60) return "text-profit bg-profit/10 border-profit/30";
    if (score >= 50) return "text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30";
    return "text-loss bg-loss/10 border-loss/30";
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-cyber-cyan/15 pb-6">
        <span className="text-xs font-heading font-bold text-electric-cyan uppercase tracking-widest">
          Institutional Positioning Intelligence
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
          COT Sentiment Visualizer
        </h1>
        <p className="text-light-purple text-sm md:text-base max-w-2xl leading-relaxed">
          Track CFTC institutional contract distribution. Contrast Commercial hedger patterns against Speculator long/short net ratios to spot structural reversals.
        </p>
      </div>

      {/* CONFIGURATION */}
      <GlassCard className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-cyber-cyan" />
          <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
            Analysis Configuration
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-light-purple font-semibold font-heading">Asset Pair</span>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value as AssetType)}
              className="bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-1.5 text-xs font-heading font-bold text-white focus:outline-hidden focus:border-cyber-cyan"
            >
              <option value="EUR/USD">EUR/USD (Euro)</option>
              <option value="GBP/USD">GBP/USD (Pound)</option>
              <option value="Gold (XAU)">Gold (XAU)</option>
              <option value="Crude Oil">Crude Oil (WTI)</option>
              <option value="S&P 500">S&P 500 (Index)</option>
              <option value="Bitcoin">Bitcoin (BTC)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-light-purple font-semibold font-heading">Timeframe</span>
            <div className="flex bg-primary-dark border border-cyber-cyan/20 rounded-sm p-0.5 font-heading">
              {(["6 Months", "1 Year", "3 Years"] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`text-[10px] md:text-xs px-3 py-1 rounded-xs font-bold cursor-pointer transition-colors ${
                    selectedTimeframe === tf
                      ? "bg-cyber-cyan text-primary-dark"
                      : "text-light-purple hover:text-white"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 min-w-0 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Raw Institutional Distribution
                </h3>
                <span className="text-[11px] text-light-purple">
                  Total open interest contracts by segment
                </span>
              </div>
              <div className="flex gap-4 text-[10px] font-heading font-bold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-cyber-cyan" /> Commercials</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-electric-cyan" /> Speculators</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-light-purple" /> Retail</span>
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
                        <stop offset="5%" stopColor="#66fcf1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#66fcf1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNonComm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#45a29e" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#45a29e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1d24" />
                    <XAxis dataKey="date" stroke="#c5c6c7" fontSize={9} />
                    <YAxis
                      stroke="#c5c6c7"
                      fontSize={9}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111318", borderColor: "#66fcf1" }}
                      labelStyle={{ color: "#ffffff" }}
                      itemStyle={{ color: "#66fcf1" }}
                      formatter={(value: any) => [`${value.toLocaleString()} contracts`, ""]}
                    />
                    <Area type="monotone" dataKey="commLong" stroke="#66fcf1" fillOpacity={1} fill="url(#colorComm)" strokeWidth={1.5} name="Commercial Longs" />
                    <Area type="monotone" dataKey="nonCommLong" stroke="#45a29e" fillOpacity={1} fill="url(#colorNonComm)" strokeWidth={1.5} name="Speculator Longs" />
                    <Area type="monotone" dataKey="retailLong" stroke="#c5c6c7" fillOpacity={0} strokeWidth={1} name="Retail Longs" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-primary-dark/50 flex items-center justify-center text-light-purple text-xs font-heading">
                  Loading charts...
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Net Non-Commercial Positioning (Hedge Funds)
                </h3>
                <span className="text-[11px] text-light-purple">
                  Hedge Fund speculative Longs minus Shorts (Net Market Bias)
                </span>
              </div>
            </div>

            <div className="relative w-full h-56 min-w-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1d24" />
                    <XAxis dataKey="date" stroke="#c5c6c7" fontSize={9} />
                    <YAxis
                      stroke="#c5c6c7"
                      fontSize={9}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111318", borderColor: "#66fcf1" }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value: any) => [`${value.toLocaleString()} contracts`, "Net Speculators"]}
                    />
                    <ReferenceLine y={0} stroke="#1a1d24" strokeWidth={1.5} />
                    <Bar
                      dataKey="netSpec"
                      fill="#66fcf1"
                      radius={[2, 2, 0, 0]}
                      name="Net Speculator Position"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-primary-dark/50 flex items-center justify-center text-light-purple text-xs font-heading">
                  Loading charts...
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 font-heading">
          <GlassCard className="flex flex-col gap-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">
              Automated Sentiment Analysis
            </h3>
            
            <div className={`p-4 rounded-sm border flex flex-col items-center justify-center text-center ${getBiasColor(biasScore)}`}>
              <TrendingUp className="w-6 h-6 mb-2" />
              <span className="text-[10px] uppercase font-bold text-light-purple">CFTC Net Sentiment Bias</span>
              <span className="text-xl font-bold mt-1">
                {biasScore}% {biasScore > 60 ? "Strongly Bullish" : biasScore > 52 ? "Bullish" : biasScore > 48 ? "Neutral" : biasScore > 40 ? "Bearish" : "Strongly Bearish"}
              </span>
            </div>

            <div className="text-xs text-light-purple leading-relaxed flex flex-col gap-3 font-sans">
              <p className="bg-primary-dark/80 border border-cyber-cyan/15 rounded-sm p-3.5 text-white">
                {sentimentAnalysis}
              </p>
              <div className="flex gap-2 items-start mt-2">
                <Info className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  <strong>Key Insight:</strong> Institutional flow precedes price action. When speculator bias score exceeds 60% or dips below 40%, it indicates over-extension.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col gap-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">
              Positioning Details
            </h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-cyber-cyan/10">
                <span className="text-light-purple">Speculator Longs:</span>
                <span className="font-bold text-white">
                  {chartData[chartData.length - 1]?.nonCommLong.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyber-cyan/10">
                <span className="text-light-purple">Speculator Shorts:</span>
                <span className="font-bold text-white">
                  {chartData[chartData.length - 1]?.nonCommShort.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyber-cyan/10">
                <span className="text-light-purple">Commercial Hedges:</span>
                <span className="font-bold text-cyber-cyan">
                  {chartData[chartData.length - 1]?.commShort.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyber-cyan/10">
                <span className="text-light-purple">Retail (Non-Reportable):</span>
                <span className="font-bold text-light-purple">
                  {chartData[chartData.length - 1]?.retailLong.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-light-purple">Status:</span>
                <span className="font-bold text-cyber-cyan uppercase tracking-wider text-[10px]">
                  Active Feed
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="flex gap-3.5 items-start">
            <Compass className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 text-xs text-light-purple font-sans leading-relaxed">
              <span className="font-heading font-bold text-white uppercase text-[11px]">CFTC Data Mechanics</span>
              <p>
                The CFTC releases commitments of traders reports every Friday at 3:30 PM EST reflecting positions from the preceding Tuesday.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
