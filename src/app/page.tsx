"use client";

import Link from "next/link";
import { ArrowRight, Code2, LineChart, Compass, GitMerge, Send, MessageSquare, ShieldCheck, Award, Terminal } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import QuickDrawdownWidget from "@/components/dashboard/QuickDrawdownWidget";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-hero-bg text-foreground font-sora">

      {/* HERO SECTION - FULL SCREEN WITH BOTTOM-LEFT CONTENT ANCHOR & FLUID TYPOGRAPHY */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-end bg-hero-bg overflow-hidden">
        {/* Visual Atmospheric Background Grid Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

        {/* Content Container anchored at bottom-left */}
        <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-12 md:pb-16 pt-12">

          {/* Heading */}
          <h1
            className="opacity-0 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase"
            style={{ animationDelay: "0.2s" }}
          >
            ALBIREO<span className="text-primary">.</span>
          </h1>

          {/* Subheading */}
          <p
            className="opacity-0 animate-fade-up text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6"
            style={{ animationDelay: "0.4s" }}
          >
            Institutional trading intelligence & prop firm analytics.
          </p>

          {/* Description */}
          <p
            className="opacity-0 animate-fade-up text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8 leading-relaxed"
            style={{ animationDelay: "0.55s" }}
          >
            Enterprise prop firm analytics built in days. Quantitative drawdown surveillance deployed with zero-trust risk architecture. Smart position sizing set up for your entire trading desk. All of it done right, not just fast.
          </p>

          {/* CTA Buttons */}
          <div
            className="opacity-0 animate-fade-up flex flex-wrap gap-3 font-bold"
            style={{ animationDelay: "0.7s" }}
          >
            <button
              onClick={() => document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" })}
              className="pointer-events-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97] font-sora font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(34,230,0,0.3)]"
            >
              Explore
            </button>
          </div>

          {/* Trust Line */}
          <p
            className="opacity-0 animate-fade-up text-muted-foreground/60 text-xs font-light mt-4 md:mt-6 tracking-wide"
            style={{ animationDelay: "0.85s" }}
          >
            Trusted trading platform & risk partner. Hosur, TN. 50+ systems deployed.
          </p>
        </div>
      </section>

      {/* QUICK DRAWDOWN WIDGET PREVIEW */}
      <section id="preview" className="w-full py-20 px-6 border-t border-b border-border relative bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <span className="text-xs font-sora font-bold uppercase tracking-widest text-primary">
              Quantitative Risk Engine
            </span>
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-foreground tracking-tight leading-tight">
              Test Your Account Survival Rate Instantly.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Don't guess if you'll pass. Under Trailing Equity drawdowns, floating profits can shrink your buffer. Adjust risk params below to see your mathematical probability of breaching rules.
            </p>
            <div className="flex flex-col gap-3 mt-2 w-full max-w-md">
              <div className="flex items-center gap-3 text-sm text-foreground justify-center lg:justify-start">
                <div className="p-1.5 rounded-sm bg-primary/15 text-primary border border-primary/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>500 parallel Monte Carlo iterations</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground justify-center lg:justify-start">
                <div className="p-1.5 rounded-sm bg-primary/15 text-primary border border-primary/30">
                  <Award className="w-4 h-4" />
                </div>
                <span>Models FTMO, Funding Pips & Topstep math</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/prop-firms"
                className="text-xs font-sora font-bold text-primary hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1.5"
              >
                Access Full Professional Simulator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 w-full">
            <GlassCard hoverEffect={false} className="border-primary/20">
              <QuickDrawdownWidget />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* PLATFORM PILLARS */}
      <section className="w-full py-24 px-6 border-b border-border relative bg-hero-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-sora font-bold uppercase tracking-widest text-primary">
              Core Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-foreground mt-3 tracking-tight">
              Quantitative Systems for Scaling Traders
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mt-4 shadow-[0_0_10px_rgba(34,230,0,0.5)]" />
            <p className="max-w-xl text-sm md:text-base text-muted-foreground mt-4 leading-relaxed font-light">
              Eliminate emotional guess-work. Quantify risk, track institutional flow, and journal trades with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="group">
              <div className="p-3 bg-primary/10 text-primary rounded-md w-fit mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sora font-bold text-foreground group-hover:text-primary transition-colors">
                Prop Firm Drawdown Engine
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                Trailing drawdown limits are math traps. Simulate trailing equity peaks and balance resets under realistic slippage and win-rate variance.
              </p>
            </GlassCard>

            <GlassCard className="group">
              <div className="p-3 bg-primary/10 text-primary rounded-md w-fit mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sora font-bold text-foreground group-hover:text-primary transition-colors">
                COT Institutional Sentiment
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                Track smart money behavior. Visualize weekly CFTC Commitments of Traders data to align with commercial hedgers and institutional positioning.
              </p>
            </GlassCard>

            <GlassCard className="group">
              <div className="p-3 bg-primary/10 text-primary rounded-md w-fit mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sora font-bold text-foreground group-hover:text-primary transition-colors">
                Quantitative Trade Journal
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                Stop logging trades manually in basic spreadsheets. Automatically track Sharpe ratio, execution timing, session data, and behavioral tags.
              </p>
            </GlassCard>

            <GlassCard className="group">
              <div className="p-3 bg-primary/10 text-primary rounded-md w-fit mb-6 border border-primary/20 group-hover:scale-110 transition-transform">
                <GitMerge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sora font-bold text-foreground group-hover:text-primary transition-colors">
                Verified Firm Directory
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                Compare verified prop firms by payout reliability, account rules, drawdown calculation models, and profit split thresholds.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* FOUNDER & STORY TIMELINE */}
      <section id="journey" className="w-full py-24 px-6 relative scroll-mt-24 bg-background">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-sora font-bold uppercase tracking-widest text-primary">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-foreground mt-3 tracking-tight">
              Bridging Quantitative Logic & Institutional Alpha
            </h2>
            <p className="max-w-2xl text-sm md:text-base text-muted-foreground mt-4 leading-relaxed font-light">
              Albireo was founded with a singular purpose: empowering traders with zero-dependency algorithmic risk guardians, Monte Carlo stress-testing, and real-time ECN terminal execution.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Short Org Story Card */}
            <GlassCard className="p-8 border-primary/30 bg-secondary/50">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-3xl">
                  <span className="text-xs font-sora font-bold text-primary uppercase tracking-widest">
                    THE ALBIREO ORIGIN STORY
                  </span>
                  <h3 className="text-2xl font-sora font-extrabold text-foreground">
                    Democratizing Institutional Risk Systems for Scaling Traders
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mt-2">
                    Albireo was born when our core trading team realized that over 90% of prop-firm evaluation candidates fail not because of bad market direction bias, but due to opaque trailing drawdown traps, margin blindness, and unmanaged tail risks. Obsessed with market microstructure and statistical probability, we built Albireo—a zero-dependency quantitative suite and ECN trading terminal that equips traders with Monte Carlo stress-testing, live compliance auditing, and real-time margin risk gauges to master evaluation math and protect capital.
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="flex flex-col gap-2">
                <span className="text-xs font-sora font-bold text-primary uppercase tracking-wider">PHASE 01 // FOUNDATION</span>
                <h4 className="text-lg font-bold text-foreground">Microstructure Analysis</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Spent years dissecting high-frequency tick streams, session ATR profiles, and order flow dynamics to identify structural edge.
                </p>
              </GlassCard>

              <GlassCard className="flex flex-col gap-2 border-primary/20">
                <span className="text-xs font-sora font-bold text-primary uppercase tracking-wider">PHASE 02 // RISK ENGINES</span>
                <h4 className="text-lg font-bold text-foreground">Prop-Firm Math Auditing</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Developed 1,000-iteration Monte Carlo bootstrap engines and compliance guardians to eliminate trailing drawdown failure.
                </p>
              </GlassCard>

              <GlassCard className="flex flex-col gap-2 border-primary/20">
                <span className="text-xs font-sora font-bold text-primary uppercase tracking-wider">PHASE 03 // ECN TERMINAL</span>
                <h4 className="text-lg font-bold text-foreground">Albireo Global Platform</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Unified price streaming, candlestick indicator charting, risk management, and journaling in a single zero-latency cockpit.
                </p>
              </GlassCard>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center border-t border-border pt-12 text-center">
            <span className="font-sora font-bold text-xl text-foreground tracking-widest uppercase">Kavin B Albireo</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-sora mt-1 font-light">
              Trader
            </span>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href="https://t.me/+e5tkgGVt5mIxZjI1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 border border-primary/40 rounded-sm bg-primary/10 hover:bg-primary/20 text-primary text-xs font-sora font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(34,230,0,0.2)]"
              >
                <Send className="w-4 h-4 text-primary" />
                Join Official Telegram Channel
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
