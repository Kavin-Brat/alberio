"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";
import KPICard from "@/components/dashboard/KPICard";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";

interface Trade {
  id: string;
  date: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  pnl: number;
  rr: number;
  strategy: string;
  psychology: string;
  session: "London" | "New York" | "Tokyo" | "Sydney";
  notes: string;
}

const DEFAULT_TRADES: Trade[] = [
  {
    id: "t1",
    date: "2026-07-28T09:15",
    symbol: "EUR/USD",
    direction: "LONG",
    entryPrice: 1.0850,
    exitPrice: 1.0910,
    stopLoss: 1.0820,
    takeProfit: 1.0910,
    size: 2.0,
    pnl: 1200,
    rr: 2.0,
    strategy: "Order Block",
    psychology: "Disciplined",
    session: "London",
    notes: "Clean mitigation of 15m order block. Exited at TP."
  },
  {
    id: "t2",
    date: "2026-07-29T14:30",
    symbol: "Gold (XAU)",
    direction: "SHORT",
    entryPrice: 2420,
    exitPrice: 2432,
    stopLoss: 2432,
    takeProfit: 2400,
    size: 1.5,
    pnl: -1800,
    rr: 1.6,
    strategy: "Breakout",
    psychology: "FOMO",
    session: "New York",
    notes: "Chased price after volatility index spiked. Stop loss hit."
  },
  {
    id: "t3",
    date: "2026-07-30T08:45",
    symbol: "GBP/USD",
    direction: "LONG",
    entryPrice: 1.2650,
    exitPrice: 1.2750,
    stopLoss: 1.2610,
    takeProfit: 1.2750,
    size: 2.5,
    pnl: 2500,
    rr: 2.5,
    strategy: "Fair Value Gap",
    psychology: "Disciplined",
    session: "London",
    notes: "Liquidity grab below Asian lows, entry at FVG fill."
  },
  {
    id: "t4",
    date: "2026-08-01T15:20",
    symbol: "EUR/USD",
    direction: "SHORT",
    entryPrice: 1.0920,
    exitPrice: 1.0880,
    stopLoss: 1.0940,
    takeProfit: 1.0860,
    size: 2.0,
    pnl: 800,
    rr: 2.0,
    strategy: "Trend",
    psychology: "Early Exit",
    session: "New York",
    notes: "Exited early ahead of economic release. Closed +40 pips."
  },
  {
    id: "t5",
    date: "2026-08-02T02:00",
    symbol: "Bitcoin",
    direction: "LONG",
    entryPrice: 65000,
    exitPrice: 66500,
    stopLoss: 64200,
    takeProfit: 66600,
    size: 0.5,
    pnl: 750,
    rr: 2.0,
    strategy: "Order Block",
    psychology: "Disciplined",
    session: "Tokyo",
    notes: "Asia session range deviation. Exited manually near high range."
  }
];

export default function TradeJournal() {
  const [mounted, setMounted] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  // Form Fields
  const [symbol, setSymbol] = useState("EUR/USD");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [date, setDate] = useState("2026-08-03T11:00");
  const [entryPrice, setEntryPrice] = useState(1.0850);
  const [exitPrice, setExitPrice] = useState(1.0900);
  const [stopLoss, setStopLoss] = useState(1.0820);
  const [takeProfit, setTakeProfit] = useState(1.0910);
  const [size, setSize] = useState(1.0);
  const [pnl, setPnl] = useState(500);
  const [strategy, setStrategy] = useState("Order Block");
  const [psychology, setPsychology] = useState("Disciplined");
  const [session, setSession] = useState<"London" | "New York" | "Tokyo" | "Sydney">("London");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setMounted(true);
    const localData = localStorage.getItem("albireo_trade_log");
    if (localData) {
      try {
        setTrades(JSON.parse(localData));
      } catch (e) {
        setTrades(DEFAULT_TRADES);
      }
    } else {
      setTrades(DEFAULT_TRADES);
      localStorage.setItem("albireo_trade_log", JSON.stringify(DEFAULT_TRADES));
    }
  }, []);

  const saveToLocalStorage = (updatedTrades: Trade[]) => {
    setTrades(updatedTrades);
    localStorage.setItem("albireo_trade_log", JSON.stringify(updatedTrades));
  };

  const resetForm = () => {
    setSymbol("EUR/USD");
    setDirection("LONG");
    setDate(new Date().toISOString().substring(0, 16));
    setEntryPrice(1.0);
    setExitPrice(1.0);
    setStopLoss(0.9);
    setTakeProfit(1.2);
    setSize(1.0);
    setPnl(0);
    setStrategy("Order Block");
    setPsychology("Disciplined");
    setSession("London");
    setNotes("");
    setEditingTrade(null);
  };

  const handleNewTrade = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditTrade = (trade: Trade) => {
    setEditingTrade(trade);
    setSymbol(trade.symbol);
    setDirection(trade.direction);
    setDate(trade.date);
    setEntryPrice(trade.entryPrice);
    setExitPrice(trade.exitPrice);
    setStopLoss(trade.stopLoss);
    setTakeProfit(trade.takeProfit);
    setSize(trade.size);
    setPnl(trade.pnl);
    setStrategy(trade.strategy);
    setPsychology(trade.psychology);
    setSession(trade.session);
    setNotes(trade.notes);
    setIsModalOpen(true);
  };

  const handleSaveTrade = (e: React.FormEvent) => {
    e.preventDefault();
    
    const diff = Math.abs(entryPrice - stopLoss);
    const reward = Math.abs(exitPrice - entryPrice);
    const calculatedRR = diff > 0 ? parseFloat((reward / diff).toFixed(1)) : 1.0;

    const newTradeRecord: Trade = {
      id: editingTrade ? editingTrade.id : "t-" + Date.now(),
      date,
      symbol,
      direction,
      entryPrice,
      exitPrice,
      stopLoss,
      takeProfit,
      size,
      pnl,
      rr: calculatedRR,
      strategy,
      psychology,
      session,
      notes
    };

    let updatedList: Trade[];
    if (editingTrade) {
      updatedList = trades.map((t) => (t.id === editingTrade.id ? newTradeRecord : t));
    } else {
      updatedList = [newTradeRecord, ...trades];
    }

    saveToLocalStorage(updatedList);
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteTrade = (id: string) => {
    if (confirm("Are you sure you want to delete this trade log?")) {
      const updatedList = trades.filter((t) => t.id !== id);
      saveToLocalStorage(updatedList);
    }
  };

  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const totalTrades = trades.length;
  const winTrades = trades.filter((t) => t.pnl > 0).length;
  const winRate = totalTrades > 0 ? parseFloat(((winTrades / totalTrades) * 100).toFixed(1)) : 0;
  
  const grossProfit = trades.filter((t) => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0);
  const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? parseFloat((grossProfit / grossLoss).toFixed(2)) : grossProfit > 0 ? 9.99 : 0;
  
  const avgRR = totalTrades > 0 ? parseFloat((trades.reduce((sum, t) => sum + t.rr, 0) / totalTrades).toFixed(1)) : 0;

  let peak = 0;
  let runningBal = 0;
  let maxDD = 0;
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  sortedTrades.forEach((t) => {
    runningBal += t.pnl;
    if (runningBal > peak) peak = runningBal;
    const currentDD = peak - runningBal;
    if (currentDD > maxDD) maxDD = currentDD;
  });

  let cumulativePnL = 0;
  const equityCurveData = sortedTrades.map((t, idx) => {
    cumulativePnL += t.pnl;
    return {
      index: idx + 1,
      date: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      "Cumulative P&L": cumulativePnL
    };
  });
  equityCurveData.unshift({ index: 0, date: "Start", "Cumulative P&L": 0 });

  const sessions = ["London", "New York", "Tokyo", "Sydney"] as const;
  const sessionData = sessions.map((sess) => {
    const sessionTrades = trades.filter((t) => t.session === sess);
    const totalSess = sessionTrades.length;
    const winsSess = sessionTrades.filter((t) => t.pnl > 0).length;
    const rate = totalSess > 0 ? Math.round((winsSess / totalSess) * 100) : 0;
    return { name: sess, "Win Rate %": rate, count: totalSess };
  });

  const pairPnLMap: Record<string, number> = {};
  trades.forEach((t) => {
    pairPnLMap[t.symbol] = (pairPnLMap[t.symbol] || 0) + t.pnl;
  });
  const assetData = Object.entries(pairPnLMap).map(([symbol, pnl]) => ({
    name: symbol,
    "Net P&L": pnl
  })).sort((a, b) => b["Net P&L"] - a["Net P&L"]);

  return (
    <PageContainer>
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-cyan/15 pb-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-heading font-bold text-cyber-cyan uppercase tracking-widest">
            Quantitative Performance Metrics
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Trading Journal & Analytics
          </h1>
          <p className="text-light-purple text-xs md:text-sm max-w-xl leading-relaxed">
            Track win ratios, profit factor curves, and psychology slips. Logs are persisted locally inside your browser storage for safety.
          </p>
        </div>
        <Button
          variant="cyber"
          onClick={handleNewTrade}
          className="flex items-center gap-2 self-start md:self-center"
        >
          <Plus className="w-4 h-4" /> Log Position Record
        </Button>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          label="Net P&L"
          value={`${totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}`}
          subtext={`${totalTrades} logged positions`}
          valueColor={totalPnL >= 0 ? "text-cyber-cyan text-glow-cyan" : "text-loss"}
          topAccent={true}
        />
        <KPICard
          label="Win Rate"
          value={`${winRate}%`}
          subtext={`${winTrades} winning trades`}
        />
        <KPICard
          label="Profit Factor"
          value={profitFactor}
          subtext="Ratio of wins to losses"
          valueColor="text-electric-cyan"
        />
        <KPICard
          label="Avg Risk-Reward"
          value={`1:${avgRR}`}
          subtext="Projected average target"
          valueColor="text-cyber-cyan"
        />
        <KPICard
          label="Max Drawdown"
          value={`-$${maxDD.toLocaleString()}`}
          subtext="Peak-to-valley variance"
          valueColor="text-loss"
          className="col-span-2 lg:col-span-1"
        />
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-8 min-w-0 flex flex-col gap-4">
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Cumulative Net P&L Curve</h3>
            <span className="text-[11px] text-light-purple">Account growth trajectory over trade log history</span>
          </div>

          <div className="relative w-full h-72 min-w-0 mt-2">
            {mounted && trades.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={equityCurveData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1d24" />
                  <XAxis dataKey="date" stroke="#c5c6c7" fontSize={9} />
                  <YAxis
                    stroke="#c5c6c7"
                    fontSize={9}
                    tickFormatter={(value) => `${value >= 0 ? "+" : ""}$${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111318", borderColor: "#66fcf1" }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#66fcf1" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, "PnL"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="Cumulative P&L"
                    stroke="#66fcf1"
                    strokeWidth={2.5}
                    dot={{ r: 4, strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-primary-dark/50 rounded-sm flex items-center justify-center text-light-purple text-xs font-heading">
                {trades.length === 0 ? "Log trades to build your growth curve" : "Loading charts..."}
              </div>
            )}
          </div>
        </GlassCard>

        <div className="lg:col-span-4 min-w-0 grid grid-cols-1 gap-6">
          <GlassCard className="flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Win Rate by Session</h3>
              <span className="text-[10px] text-light-purple block mt-0.5">Performance breakdown by timezone</span>
            </div>
            
            <div className="relative w-full h-40 min-w-0 mt-4">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sessionData}
                    margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1d24" />
                    <XAxis dataKey="name" stroke="#c5c6c7" fontSize={9} />
                    <YAxis stroke="#c5c6c7" fontSize={9} unit="%" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111318", borderColor: "#66fcf1" }}
                      formatter={(v: any) => [`${v}%`, "Win Rate"]}
                    />
                    <Bar dataKey="Win Rate %" fill="#66fcf1" radius={[2, 2, 0, 0]}>
                      {sessionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === "London" ? "#66fcf1" : entry.name === "New York" ? "#45a29e" : "#10b981"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-primary-dark/50 rounded-sm flex items-center justify-center text-light-purple text-xs font-heading">
                  Loading...
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">P&L by Currency Pair</h3>
              <span className="text-[10px] text-light-purple block mt-0.5">Asset profit distribution</span>
            </div>
            
            <div className="relative w-full h-40 min-w-0 mt-4">
              {mounted && assetData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={assetData}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1d24" />
                    <XAxis type="number" stroke="#c5c6c7" fontSize={9} />
                    <YAxis type="category" dataKey="name" stroke="#c5c6c7" fontSize={9} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111318", borderColor: "#66fcf1" }}
                      formatter={(v: any) => [`$${v}`, "P&L"]}
                    />
                    <Bar dataKey="Net P&L" radius={[0, 2, 2, 0]}>
                      {assetData.map((entry: any, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry["Net P&L"] >= 0 ? "#10b981" : "#ef4444"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-primary-dark/50 rounded-sm flex items-center justify-center text-light-purple text-xs font-heading">
                  {trades.length === 0 ? "Log trades to analyze pairs" : "Loading..."}
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* TRADE LOG TABLE */}
      <GlassCard className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
          <h3 className="font-heading font-bold text-base text-white uppercase tracking-wider">Logged Positions</h3>
          <span className="text-xs text-light-purple">{trades.length} Positions total</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-cyber-cyan/15 text-light-purple font-heading font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2 hidden sm:table-cell">Date</th>
                <th className="py-3 px-2">Symbol</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2 hidden md:table-cell">Size</th>
                <th className="py-3 px-2 hidden sm:table-cell">Entry & Exit</th>
                <th className="py-3 px-2">P&L ($)</th>
                <th className="py-3 px-2 hidden md:table-cell">R:R</th>
                <th className="py-3 px-2 hidden md:table-cell">Strategy</th>
                <th className="py-3 px-2 hidden md:table-cell">Psychology</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-cyan/10 text-white">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-light-purple font-heading">
                    No trades logged yet. Click "+ Log Position Record" to record one!
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-cyber-cyan/5 transition-colors">
                    <td className="py-3 px-2 text-[10px] text-light-purple font-medium hidden sm:table-cell">
                      {new Date(trade.date).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="py-3 px-2 font-heading font-bold text-white">{trade.symbol}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-heading font-bold ${
                        trade.direction === "LONG"
                          ? "bg-profit/15 text-profit border border-profit/30"
                          : "bg-loss/15 text-loss border border-loss/30"
                      }`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-medium hidden md:table-cell">{trade.size} Lots</td>
                    <td className="py-3 px-2 text-[11px] font-medium text-light-purple hidden sm:table-cell">
                      <span>{trade.entryPrice}</span> &rarr; <span>{trade.exitPrice}</span>
                    </td>
                    <td className={`py-3 px-2 font-heading font-bold ${trade.pnl >= 0 ? "text-cyber-cyan text-glow-cyan" : "text-loss"}`}>
                      {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 font-heading font-bold text-cyber-cyan hidden md:table-cell">1:{trade.rr}</td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="bg-primary-dark border border-cyber-cyan/20 px-2 py-0.5 rounded-xs text-[10px] font-heading font-semibold text-white">
                        {trade.strategy}
                      </span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-heading font-semibold ${
                        trade.psychology === "Disciplined"
                          ? "bg-profit/10 text-profit"
                          : trade.psychology === "Early Exit"
                          ? "bg-electric-cyan/10 text-electric-cyan"
                          : "bg-loss/10 text-loss"
                      }`}>
                        {trade.psychology}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditTrade(trade)}
                          className="p-1 hover:bg-primary-dark border border-transparent hover:border-cyber-cyan/30 rounded-xs text-light-purple hover:text-cyber-cyan transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrade(trade.id)}
                          className="p-1 hover:bg-primary-dark border border-transparent hover:border-loss/30 rounded-xs text-light-purple hover:text-loss transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* LOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-xl w-full border-cyber-cyan/40 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
              <h3 className="text-base font-heading font-bold uppercase text-white tracking-wider">
                {editingTrade ? "Edit Position Log" : "Log New Position"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSaveTrade} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-heading">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Symbol / Pair</label>
                <select
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                >
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="GBP/USD">GBP/USD</option>
                  <option value="Gold (XAU)">Gold (XAU)</option>
                  <option value="Crude Oil">Crude Oil</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="S&P 500">S&P 500</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Execution Date</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Direction</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDirection("LONG")}
                    className={`py-2 border text-xs font-bold rounded-sm cursor-pointer ${
                      direction === "LONG"
                        ? "bg-profit/15 border-profit text-profit"
                        : "bg-primary-dark border-cyber-cyan/20 text-light-purple hover:text-white"
                    }`}
                  >
                    LONG
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection("SHORT")}
                    className={`py-2 border text-xs font-bold rounded-sm cursor-pointer ${
                      direction === "SHORT"
                        ? "bg-loss/15 border-loss text-loss"
                        : "bg-primary-dark border-cyber-cyan/20 text-light-purple hover:text-white"
                    }`}
                  >
                    SHORT
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Lot / Contract Size</label>
                <input
                  type="number"
                  step="0.01"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Entry Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Exit Price</label>
                <input
                  type="number"
                  step="0.00001"
                  value={exitPrice}
                  onChange={(e) => setExitPrice(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Stop Loss (SL)</label>
                <input
                  type="number"
                  step="0.00001"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Take Profit (TP)</label>
                <input
                  type="number"
                  step="0.00001"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Realized PnL ($)</label>
                <input
                  type="number"
                  value={pnl}
                  onChange={(e) => setPnl(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Strategy setup</label>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                >
                  <option value="Order Block">Order Block</option>
                  <option value="Fair Value Gap">Fair Value Gap</option>
                  <option value="Breakout">Breakout</option>
                  <option value="Trend">Trend Following</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Psychological State</label>
                <select
                  value={psychology}
                  onChange={(e) => setPsychology(e.target.value)}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                >
                  <option value="Disciplined">Disciplined (System Exited)</option>
                  <option value="FOMO">FOMO (Fear of Missing Out)</option>
                  <option value="Revenge Trade">Revenge Trade</option>
                  <option value="Early Exit">Early Exit (Fear of loss)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Trading Session</label>
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value as any)}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white focus:outline-hidden focus:border-cyber-cyan"
                >
                  <option value="London">London (Open/Overlap)</option>
                  <option value="New York">New York (Open/News)</option>
                  <option value="Tokyo">Tokyo (Asian range)</option>
                  <option value="Sydney">Sydney</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-light-purple uppercase">Execution Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Confluence factors, news events..."
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs text-white placeholder:text-light-purple/40 focus:outline-hidden focus:border-cyber-cyan"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="cyber">
                  Save Position Log
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </PageContainer>
  );
}
