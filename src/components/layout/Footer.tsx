import React from "react";
import Link from "next/link";
import { Heart, Send, ShieldCheck, Cpu, AlertCircle, FileText } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hero-bg border-t border-border pt-16 pb-8 relative z-10 font-sora">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-sora text-lg font-bold tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
              ALBIREO<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed font-light">
            Trading Intelligence Platform & Risk Engine for serious retail & prop-firm traders. Learn, simulate, analyze, and trade with defined quantitative risk.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-primary uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Zero-Trust Risk Math</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> Monte Carlo Engine</span>
          </div>
        </div>

        {/* Learning & Academy */}
        <div>
          <h4 className="font-sora text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
            Academy & Guides
          </h4>
          <ul className="space-y-2.5 text-xs font-light text-muted-foreground">
            <li>
              <Link href="/academy" className="hover:text-primary transition-colors">
                Albireo Academy
              </Link>
            </li>
            <li>
              <Link href="/academy/forex-foundations-30-day" className="hover:text-primary transition-colors">
                Forex Foundations (₹999)
              </Link>
            </li>
            <li>
              <Link href="/academy/prop-firm-evaluation-mastery" className="hover:text-primary transition-colors">
                Prop Firm Mastery (₹1,999)
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Free Trading Guides
              </Link>
            </li>
          </ul>
        </div>

        {/* SaaS & Products */}
        <div>
          <h4 className="font-sora text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
            Tools & Pricing
          </h4>
          <ul className="space-y-2.5 text-xs font-light text-muted-foreground">
            <li>
              <Link href="/pricing" className="hover:text-primary transition-colors">
                Albireo Pro (₹299/mo)
              </Link>
            </li>
            <li>
              <Link href="/pricing#starter-pack" className="hover:text-primary transition-colors">
                Digital Starter Pack (₹299)
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Drawdown & Risk Suite
              </Link>
            </li>
            <li>
              <Link href="/prop-firms" className="hover:text-primary transition-colors">
                Prop Firm Directory
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-primary transition-colors">
                Trade Journal
              </Link>
            </li>
          </ul>
        </div>

        {/* Community & Lead Magnet */}
        <div>
          <h4 className="font-sora text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
            Join Telegram
          </h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-light">
            Receive weekly CFTC COT sentiment breakdowns, drawdown alerts, and trading psychology content.
          </p>
          <a
            href="https://t.me/+e5tkgGVt5mIxZjI1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-sm text-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            Join Telegram <Send className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Disclaimers & Affiliate Disclosures */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-border flex flex-col gap-3 text-[11px] text-muted-foreground/80 font-light leading-relaxed">
        <div className="flex items-start gap-2 bg-secondary/40 p-3 rounded border border-border/50">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>
            <strong>Risk Warning & Regulatory Disclaimer:</strong> Trading foreign exchange, futures, and contracts for difference (CFDs) carries a high level of risk and may not be suitable for all investors. Educational materials, calculators, and software provided on Albireo are strictly for educational and analytical purposes and do not constitute personalized financial or investment advice. Albireo is an independent analytical software & education provider.
          </p>
        </div>
        <div className="flex items-start gap-2 bg-secondary/40 p-3 rounded border border-border/50">
          <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>
            <strong>Affiliate Disclosure:</strong> Certain links on our site, including prop firm listings and platform tools, are referral/affiliate links. Albireo may earn a commission if you sign up or purchase products through these links at no additional cost to you. We only list verified providers based on objective rule transparency.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-6 mt-4 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-light">
        <p>© {currentYear} ALBIREO SYSTEMS. All rights reserved. Hosur, TN.</p>
        <p className="flex items-center gap-1">
          Architected for Traders <Heart className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
