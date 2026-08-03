import Link from "next/link";
import { ArrowRight, Code2, LineChart, Compass, GitMerge, Send, MessageSquare, Terminal, Award, ShieldCheck, Users } from "lucide-react";
import QuickDrawdownWidget from "@/components/QuickDrawdownWidget";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full pt-20 pb-16 md:pt-32 md:pb-24 px-4 lg:px-8 bg-radial from-surface-card via-albireo-blue to-albireo-blue border-b border-border-custom/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-border-custom text-xs font-semibold text-cygnus-gold mb-6 animate-fade-in">
            <Terminal className="w-3.5 h-3.5" />
            <span>Software Engineering Precision</span>
            <span className="text-text-muted/40">|</span>
            <span className="text-electric-cyan">Market Alpha</span>
          </div>

          {/* H1 */}
          <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-tight md:leading-[1.15]">
            Master Prop Firm Rules, <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-cygnus-gold via-text-primary to-electric-cyan bg-clip-text text-transparent">
              Analyze Institutional Flow,
            </span>{" "}
            and Scale.
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mt-6 text-base md:text-lg text-text-muted leading-relaxed">
            Built by a software engineer obsessed with market mechanics. Albireo gives retail & prop traders institutional tools, verified drawdown simulation, and trade journaling.
          </p>

          {/* CTA Group */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link
              href="/prop-firms"
              className="w-full sm:w-auto bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 px-8 py-4 rounded-xl text-base font-extrabold shadow-lg shadow-cygnus-gold/25 hover:shadow-cygnus-gold/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Drawdown Simulator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#journey"
              className="w-full sm:w-auto bg-surface-card hover:bg-surface-card/85 text-text-primary hover:text-white px-8 py-4 rounded-xl text-base font-bold border border-border-custom hover:border-text-muted/40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Explore Founder's Journey
            </Link>
          </div>

          {/* Real-time Stats Ticker */}
          <div className="mt-16 w-full max-w-5xl border-t border-b border-border-custom/50 py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-card/20 backdrop-blur-sm rounded-xl">
            <div className="flex flex-col items-center md:border-r border-border-custom/40">
              <span className="text-2xl md:text-3xl font-extrabold text-cygnus-gold">$10M+</span>
              <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">
                Challenge Volume Simulated
              </span>
            </div>
            <div className="flex flex-col items-center md:border-r border-border-custom/40">
              <span className="text-2xl md:text-3xl font-extrabold text-text-primary flex items-center gap-1.5">
                4.9/5
              </span>
              <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">
                Community Trust Rating
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold text-electric-cyan">50+</span>
              <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">
                Prop Firm Rules Indexed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TOOL CALCULATOR EMBED */}
      <section className="w-full py-16 px-4 lg:px-8 bg-albireo-blue relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-widest text-electric-cyan">
              Live Widget Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight leading-tight">
              Test Your Account Survival Rate Instantly.
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              Don't guess if you'll pass. Under Trailing Equity drawdowns, floating profits can ruin your buffer. Adjust starting size, win rate, and R:R below to see how likely you are to breach rules before hitting your profit target.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3 text-sm text-text-primary">
                <div className="p-1 rounded-md bg-electric-cyan/15 text-electric-cyan">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Simulates 500 parallel Monte Carlo iterations</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-primary">
                <div className="p-1 rounded-md bg-cygnus-gold/15 text-cygnus-gold">
                  <Award className="w-4 h-4" />
                </div>
                <span>Models FTMO, Funding Pips & Topstep drawdown math</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/prop-firms"
                className="text-xs font-extrabold text-cygnus-gold hover:text-cygnus-gold/80 transition-colors uppercase tracking-widest flex items-center gap-1"
              >
                Access Full Professional Simulator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 w-full">
            <QuickDrawdownWidget />
          </div>
        </div>
      </section>

      {/* FEATURE MATRIX (4 PILLARS) */}
      <section className="w-full py-20 px-4 lg:px-8 bg-surface-card/10 border-t border-b border-border-custom/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cygnus-gold">
              Core Platform Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3 tracking-tight">
              Engineered Tools for Disciplined Trading
            </h2>
            <p className="max-w-xl text-sm md:text-base text-text-muted mt-4">
              Eliminate emotional guess-work. Quantify risk, track institutional commitment, and journal performance using automated software analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="bg-surface-card border border-border-custom/75 p-8 rounded-2xl hover:border-cygnus-gold/30 hover:shadow-xl hover:shadow-cygnus-gold/5 group transition-all duration-300">
              <div className="p-3 bg-cygnus-gold/10 text-cygnus-gold rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-cygnus-gold transition-colors">
                Prop Firm Rule Simulator
              </h3>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                Trailing drawdown limits are a math puzzle designed to make you fail. Simulate trailing equity peaks and daily balance resets against high volatility to ensure survival.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-card border border-border-custom/75 p-8 rounded-2xl hover:border-electric-cyan/30 hover:shadow-xl hover:shadow-electric-cyan/5 group transition-all duration-300">
              <div className="p-3 bg-electric-cyan/10 text-electric-cyan rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-electric-cyan transition-colors">
                COT Institutional Sentiment
              </h3>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                Track smart money behavior. Visualize the weekly CFTC Commitments of Traders data to understand exactly how commercial hedgers and speculative hedge funds are positioning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-card border border-border-custom/75 p-8 rounded-2xl hover:border-profit/30 hover:shadow-xl hover:shadow-profit/5 group transition-all duration-300">
              <div className="p-3 bg-profit/10 text-profit rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-profit transition-colors">
                Smart Trade Journal
              </h3>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                Stop logging trades manually in spreadsheets. Automatically index your sessions, Sharpe ratio, strategy triggers, and psychology tags to uncover profit leaks.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-card border border-border-custom/75 p-8 rounded-2xl hover:border-cygnus-gold/30 hover:shadow-xl hover:shadow-cygnus-gold/5 group transition-all duration-300">
              <div className="p-3 bg-cygnus-gold/10 text-cygnus-gold rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <GitMerge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-cygnus-gold transition-colors">
                Verified Prop Directory
              </h3>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                Avoid scams. Filter, search, and compare verified prop firm scaling programs by payout frequencies, account models, simulated rules, and hidden profit split terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S JOURNEY */}
      <section id="journey" className="w-full py-20 px-4 lg:px-8 bg-albireo-blue relative scroll-mt-24">
        {/* Visual background lines */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-40 bottom-24 w-0.5 bg-gradient-to-b from-cygnus-gold/60 via-border-custom to-electric-cyan/60 hidden md:block" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-cygnus-gold">
              The Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3 tracking-tight">
              From Algorithmic Logic to Market Mastery
            </h2>
            <p className="max-w-xl text-sm md:text-base text-text-muted mt-4">
              How a software engineer obsessed with microstructures developed tools to beat prop firms.
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {/* Phase 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
              <div className="md:text-right flex flex-col md:items-end gap-3">
                <span className="text-xs font-bold text-cygnus-gold">PHASE 01 // 2020</span>
                <h3 className="text-xl md:text-2xl font-black text-text-primary">
                  The Engineer's Curiosity
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-md md:text-right">
                  Sitting behind a developer terminal writing microservice APIs by day, I discovered price action, order flow, and backtesting algorithms by night. Fascinated by the raw mathematics of liquidity, I was hooked.
                </p>
              </div>
              <div className="relative pl-6 md:pl-12 border-l border-border-custom md:border-l-0">
                {/* Timeline node */}
                <div className="absolute -left-1.5 md:-left-4 top-1 w-3 h-3 md:w-8 md:h-8 rounded-full bg-surface-card border-2 border-cygnus-gold flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-cygnus-gold" />
                </div>
                <div className="bg-surface-card border border-border-custom p-5 rounded-xl max-w-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Key Metric</span>
                  <p className="text-sm font-bold text-text-primary mt-1 leading-normal">
                    10,000+ hours spent studying market microstructures, COT report data feeds, and drawdown mathematical logic.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
              <div className="order-1 md:order-2 md:text-left flex flex-col md:items-start gap-3">
                <span className="text-xs font-bold text-electric-cyan">PHASE 02 // 2022</span>
                <h3 className="text-xl md:text-2xl font-black text-text-primary">
                  Breaking the Prop Firm Code
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-md">
                  Experienced the hidden trap of trailing equity drawdowns firsthand. I realized that over 90% of traders fail prop evaluations not due to bad setups, but due to a structural misunderstanding of drawdown decay.
                </p>
              </div>
              <div className="order-2 md:order-1 relative md:text-right pr-6 md:pr-12 md:border-r border-border-custom border-l md:border-l-0 pl-6 md:pl-0">
                {/* Timeline node */}
                <div className="absolute -left-1.5 md:left-auto md:-right-4 top-1 w-3 h-3 md:w-8 md:h-8 rounded-full bg-surface-card border-2 border-electric-cyan flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-electric-cyan" />
                </div>
                <div className="bg-surface-card border border-border-custom p-5 rounded-xl max-w-sm inline-block md:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Key Metric</span>
                  <p className="text-sm font-bold text-text-primary mt-1 leading-normal">
                    Successfully passed multiple 6-figure evaluations and developed automated trade tracking rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
              <div className="md:text-right flex flex-col md:items-end gap-3">
                <span className="text-xs font-bold text-profit">PHASE 03 // PRESENT</span>
                <h3 className="text-xl md:text-2xl font-black text-text-primary">
                  The Birth of Albireo
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-md md:text-right">
                  Building the analytics platform I wished I had. Albireo brings transparent, software-grade drawdown calculation, clean rule comparison, CFTC institutional data visualizer, and a community-first approach.
                </p>
              </div>
              <div className="relative pl-6 md:pl-12 border-l border-border-custom md:border-l-0">
                {/* Timeline node */}
                <div className="absolute -left-1.5 md:-left-4 top-1 w-3 h-3 md:w-8 md:h-8 rounded-full bg-surface-card border-2 border-profit flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-profit" />
                </div>
                <div className="bg-surface-card border border-border-custom p-5 rounded-xl max-w-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Active Community</span>
                  <p className="text-sm font-bold text-text-primary mt-1 leading-normal">
                    Over 1,000 active traders sharing insights, running drawdown simulators, and perfecting rulesets daily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Signature & Socials */}
          <div className="mt-20 flex flex-col items-center border-t border-border-custom/40 pt-12 text-center">
            <span className="font-serif italic text-xl text-text-primary">Kavin Brat</span>
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mt-1">
              Founder & Software Engineer
            </span>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/in/kavin-brat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border-custom rounded-lg bg-surface-card hover:bg-surface-card/80 text-text-muted hover:text-text-primary text-xs font-semibold transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-electric-cyan" />
                LinkedIn
              </a>
              <a
                href="https://t.me/albireo_trading"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border-custom rounded-lg bg-surface-card hover:bg-surface-card/80 text-text-muted hover:text-text-primary text-xs font-semibold transition-all duration-200"
              >
                <Send className="w-4 h-4 text-cygnus-gold" />
                Telegram
              </a>
              <a
                href="https://discord.gg/albireo_trading"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border-custom rounded-lg bg-surface-card hover:bg-surface-card/80 text-text-muted hover:text-text-primary text-xs font-semibold transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-profit" />
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
