"use client";

import { useState, useEffect } from "react";
import { Search, Calculator, ShieldAlert, Award, FileDown, ExternalLink, RefreshCw, Star, ShieldCheck, Tag, Info, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import FavoriteStar from "@/components/ui/FavoriteStar";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";

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
  const [search, setSearch] = useState("");
  const [marketFilter, setMarketFilter] = useState<string>("all");
  const [drawdownTypeFilter, setDrawdownTypeFilter] = useState<string>("all");
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const filteredPresets = PRESETS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesMarket = marketFilter === "all" || p.market === marketFilter || (marketFilter === "forex" && p.market === "forex-crypto");
    const matchesDrawdown = drawdownTypeFilter === "all" || p.drawdownType === drawdownTypeFilter;
    return matchesSearch && matchesMarket && matchesDrawdown;
  });

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <div className="flex flex-col gap-4 font-sora">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Award className="w-4 h-4 text-profit" /> Verified Prop Firm Directory & Analytics
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Compare Verified Firms & Drawdown Rules
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
              Objective evaluation math, payout reliability scores, and exclusive discount codes.
            </p>
          </div>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => setIsProModalOpen(true)}
            className="shrink-0 font-bold"
          >
            Run Custom Risk Simulation
          </Button>
        </div>

        {/* AFFILIATE TRANSPARENCY NOTICE */}
        <div className="p-3 bg-secondary/50 border border-border rounded text-xs text-muted-foreground font-light flex items-center gap-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span>
            <strong>Transparent Affiliate Disclosure:</strong> We maintain strict objective ratings based on evaluation rules, payout speed, and drawdown mechanics. Using our discount codes supports the maintenance of our free tools.
          </span>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-wrap gap-4 items-center bg-secondary/70 p-4 rounded-xl border border-border mt-2">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search prop firms (e.g. FTMO, Topstep)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-hero-bg border border-border rounded-lg pl-9 pr-4 py-2 text-xs text-foreground focus:outline-hidden focus:border-primary"
            />
          </div>

          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            className="px-3 py-2 text-xs text-foreground bg-hero-bg border border-border rounded-lg"
          >
            <option value="all">All Markets</option>
            <option value="forex">Forex</option>
            <option value="futures">Futures</option>
            <option value="crypto">Crypto</option>
          </select>

          <select
            value={drawdownTypeFilter}
            onChange={(e) => setDrawdownTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs text-foreground bg-hero-bg border border-border rounded-lg"
          >
            <option value="all">All Drawdown Types</option>
            <option value="static">Static Drawdown</option>
            <option value="trailing-balance">Trailing Balance</option>
            <option value="trailing-equity">Trailing Equity</option>
          </select>
        </div>
      </div>

      {/* FIRMS DIRECTORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sora mt-4">
        {filteredPresets.map((firm) => (
          <GlassCard key={firm.id} className="flex flex-col justify-between border-border hover:border-primary/40 group p-6">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {firm.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">
                    {firm.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-profit text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-profit" /> {firm.rating}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-hero-bg rounded border border-border text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Drawdown Model</span>
                  <span className="font-bold text-foreground capitalize">{firm.drawdownType.replace("-", " ")}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Max Loss</span>
                  <span className="font-bold text-primary">{firm.maxDrawdownPct}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Daily Loss</span>
                  <span className="font-bold text-foreground">{firm.maxDailyDrawdownPct}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Profit Split</span>
                  <span className="font-bold text-profit">{firm.profitSplit}%</span>
                </div>
              </div>

              {/* Discount Code & Promo */}
              <div className="flex items-center justify-between p-2.5 bg-secondary/80 rounded border border-border/80 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-light">
                  <Tag className="w-3.5 h-3.5 text-primary" /> Promo Discount Code:
                </span>
                <span className="font-mono font-bold text-primary bg-hero-bg px-2 py-0.5 rounded border border-primary/30 select-all">
                  {firm.discountCode}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-6 flex items-center justify-between">
              <button
                onClick={() => setIsProModalOpen(true)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                Simulate Survival Odds &rarr;
              </button>
              <a
                href={firm.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5">
                  Visit Provider <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* PRO MODAL */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </PageContainer>
  );
}
