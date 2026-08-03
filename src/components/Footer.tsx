import Link from "next/link";
import { Send, MessageSquare, Star, ShieldAlert } from "lucide-react";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-albireo-blue border-t border-border-custom pt-16 pb-8 px-4 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand & Risk Disclosure */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <svg className="w-6 h-6 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                fill="#F59E0B"
              />
              <circle
                cx="15"
                cy="15"
                r="3.5"
                fill="#06B6D4"
              />
            </svg>
            <span className="font-extrabold text-lg tracking-wider text-text-primary">
              ALBIREO
            </span>
          </Link>
          <p className="text-sm text-text-muted leading-relaxed">
            Bridging Software Engineering Discipline and Market Trading Precision. Get the analytical edge required to master drawdown calculations, study CFTC institutional flow, and track performance.
          </p>
          <div className="flex items-start gap-2 bg-surface-card/40 border border-border-custom/50 rounded-lg p-3 mt-2">
            <ShieldAlert className="w-5 h-5 text-cygnus-gold shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-muted/80 leading-relaxed">
              <strong className="text-text-primary">Legal Risk Disclosure:</strong> Trading financial instruments, including prop firm challenges, involves a substantial risk of loss and is not suitable for every investor. Only risk capital you can afford to lose.
            </p>
          </div>
        </div>

        {/* Column 2: Products */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">Products</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
            <li>
              <Link href="/prop-firms" className="hover:text-cygnus-gold transition-colors">
                Drawdown Simulator
              </Link>
            </li>
            <li>
              <Link href="/tools/cot-analyzer" className="hover:text-cygnus-gold transition-colors">
                COT Institutional Sentiment
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-cygnus-gold transition-colors">
                Smart Trade Journal
              </Link>
            </li>
            <li>
              <Link href="/prop-firms" className="hover:text-cygnus-gold transition-colors">
                Prop Firm Directory
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Community */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">Community</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-text-muted">
            <li>
              <a
                href="https://t.me/albireo_trading"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cygnus-gold transition-colors"
              >
                <Send className="w-4 h-4 text-electric-cyan" />
                <div>
                  <span className="font-semibold block text-text-primary hover:text-cygnus-gold">Telegram Channel</span>
                  <span className="text-xs text-text-muted/70">Market signals & daily recaps</span>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/albireo_trading"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cygnus-gold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-cygnus-gold" />
                <div>
                  <span className="font-semibold block text-text-primary hover:text-cygnus-gold">Discord Server</span>
                  <span className="text-xs text-text-muted/70">Live strategy discussions</span>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/kavin-brat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cygnus-gold transition-colors"
              >
                <Linkedin className="w-4 h-4 text-electric-cyan" />
                <div>
                  <span className="font-semibold block text-text-primary hover:text-cygnus-gold">LinkedIn Profile</span>
                  <span className="text-xs text-text-muted/70">Founder insights & updates</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal & Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">Legal</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
            <li>
              <Link href="/terms" className="hover:text-cygnus-gold transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cygnus-gold transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure" className="hover:text-cygnus-gold transition-colors">
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border-custom/50">
            <span className="text-xs text-text-muted block">Direct Contact:</span>
            <span className="text-xs text-text-primary font-medium hover:underline cursor-pointer block mt-1">
              support@albireotrading.com
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-border-custom/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-text-muted">
          &copy; {currentYear} Albireo. All rights reserved. Built with precision for prop challenge success.
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <span>Star rating:</span>
          <div className="flex items-center text-cygnus-gold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-text-primary">4.9/5</span>
        </div>
      </div>
    </footer>
  );
}
