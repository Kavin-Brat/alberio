import React from "react";
import Link from "next/link";
import { Heart, Send, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hero-bg border-t border-border pt-16 pb-8 relative z-10 font-sora">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-sora text-lg font-bold tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
              ALBIREO<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-light">
            Enterprise quantitative prop firm drawdown analytics built with zero-trust risk architecture.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 100% Rule Compliance</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4" /> Real-time Math Engine</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sora text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm font-light text-muted-foreground">
            <li>
              <Link href="/prop-firms" className="hover:text-primary transition-colors">
                Prop Firm Simulator
              </Link>
            </li>
            <li>
              <Link href="/tools/cot-analyzer" className="hover:text-primary transition-colors">
                COT Sentiment Analyzer
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-primary transition-colors">
                Trading Journal
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Guides & Articles
              </Link>
            </li>
          </ul>
        </div>

        {/* Community & Social */}
        <div>
          <h4 className="font-sora text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
            Join The Community
          </h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-light">
            Get live signal breakdowns, drawdown alerts, and quantitative prop firm market updates.
          </p>
          <a
            href="https://t.me/+e5tkgGVt5mIxZjI1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-sm text-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            Telegram Channel <Send className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-light">
        <p>© {currentYear} ALBIREO. All rights reserved. Hosur, TN.</p>
        <p className="flex items-center gap-1">
          Architected with precision <Heart className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
