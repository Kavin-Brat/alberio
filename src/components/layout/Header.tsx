"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Star, BarChart3, Calculator, PenTool, Send } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="sticky top-0 w-full z-50 flex flex-col bg-albireo-blue/90 backdrop-blur-md">
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-cygnus-gold/20 via-albireo-blue to-electric-cyan/20 border-b border-border-custom py-2 px-4 text-center text-xs md:text-sm font-medium text-text-primary">
        Joined 1,000+ traders scaling prop firm challenges.{" "}
        <a
          href="https://t.me/albireo_trading"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cygnus-gold hover:text-cygnus-gold/80 underline decoration-dotted transition-colors inline-flex items-center gap-1"
        >
          Join Telegram Community <Send className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-albireo-blue/80 backdrop-blur-md border-b border-border-custom px-4 lg:px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              {/* Double Star SVG Logo */}
              <svg className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="none">
                {/* Primary Gold Star (Albireo A) */}
                <path
                  d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                  fill="#F59E0B"
                  className="group-hover:scale-105 transition-transform duration-300 origin-center"
                />
                {/* Secondary Cyan Star (Albireo B) offset */}
                <circle
                  cx="15"
                  cy="15"
                  r="3.5"
                  fill="#06B6D4"
                  className="animate-pulse filter drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]"
                />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-text-primary via-text-primary to-cygnus-gold bg-clip-text text-transparent group-hover:to-electric-cyan transition-all duration-300">
              ALBIREO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-text-muted">
            <Link
              href={pathname === "/" ? "#journey" : "/#journey"}
              className="hover:text-text-primary transition-colors hover:scale-105"
            >
              Story
            </Link>

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-text-primary transition-colors focus:outline-none"
              >
                Tools <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-64 bg-surface-card border border-border-custom rounded-xl shadow-2xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    href="/prop-firms"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue transition-colors text-text-muted hover:text-text-primary group"
                  >
                    <Calculator className="w-5 h-5 text-cygnus-gold" />
                    <div>
                      <div className="font-semibold text-sm text-text-primary group-hover:text-cygnus-gold transition-colors">
                        Drawdown Simulator
                      </div>
                      <div className="text-xs text-text-muted/80 mt-0.5">Test account survival rules</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/cot-analyzer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue transition-colors text-text-muted hover:text-text-primary group"
                  >
                    <BarChart3 className="w-5 h-5 text-electric-cyan" />
                    <div>
                      <div className="font-semibold text-sm text-text-primary group-hover:text-electric-cyan transition-colors">
                        COT Analyzer
                      </div>
                      <div className="text-xs text-text-muted/80 mt-0.5">Track institutional sentiment</div>
                    </div>
                  </Link>

                  <Link
                    href="/blog#position-sizer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue transition-colors text-text-muted hover:text-text-primary group"
                  >
                    <PenTool className="w-5 h-5 text-profit" />
                    <div>
                      <div className="font-semibold text-sm text-text-primary group-hover:text-profit transition-colors">
                        Position Sizer
                      </div>
                      <div className="text-xs text-text-muted/80 mt-0.5">Calculate risk per trade</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/prop-firms"
              className={`hover:text-text-primary transition-colors ${pathname === "/prop-firms" ? "text-cygnus-gold" : ""}`}
            >
              Prop Firms
            </Link>

            <Link
              href="/journal"
              className={`hover:text-text-primary transition-colors ${pathname === "/journal" ? "text-cygnus-gold" : ""}`}
            >
              Journal
            </Link>

            <Link
              href="/blog"
              className={`hover:text-text-primary transition-colors ${pathname.startsWith("/blog") ? "text-cygnus-gold" : ""}`}
            >
              Blog & Guides
            </Link>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/journal"
              className="text-text-primary hover:text-cygnus-gold transition-colors text-sm font-medium px-4 py-2 border border-transparent hover:border-border-custom rounded-lg bg-transparent"
            >
              Log In
            </Link>
            <Link
              href="/journal"
              className="bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-cygnus-gold/20 hover:shadow-cygnus-gold/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Launch Platform
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-text-primary focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border-custom flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
            <Link
              href={pathname === "/" ? "#journey" : "/#journey"}
              className="text-text-muted hover:text-text-primary py-2 text-base font-semibold"
            >
              Story
            </Link>

            <div className="flex flex-col gap-2 pl-2 border-l border-border-custom">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted/60">Tools</span>
              <Link href="/prop-firms" className="text-text-muted hover:text-text-primary py-1 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cygnus-gold" /> Drawdown Simulator
              </Link>
              <Link href="/tools/cot-analyzer" className="text-text-muted hover:text-text-primary py-1 text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-electric-cyan" /> COT Analyzer
              </Link>
              <Link href="/blog#position-sizer" className="text-text-muted hover:text-text-primary py-1 text-sm flex items-center gap-2">
                <PenTool className="w-4 h-4 text-profit" /> Position Sizer
              </Link>
            </div>

            <Link
              href="/prop-firms"
              className="text-text-muted hover:text-text-primary py-2 text-base font-semibold"
            >
              Prop Firms
            </Link>

            <Link
              href="/journal"
              className="text-text-muted hover:text-text-primary py-2 text-base font-semibold"
            >
              Journal
            </Link>

            <Link
              href="/blog"
              className="text-text-muted hover:text-text-primary py-2 text-base font-semibold"
            >
              Blog & Guides
            </Link>

            <div className="flex flex-col gap-3 pt-4 border-t border-border-custom">
              <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-xs font-bold text-text-muted">Appearance</span>
                <ThemeToggle />
              </div>
              <Link
                href="/journal"
                className="w-full text-center py-2.5 rounded-lg border border-border-custom text-text-primary hover:bg-surface-card transition-colors font-medium text-sm"
              >
                Log In
              </Link>
              <Link
                href="/journal"
                className="w-full text-center py-2.5 rounded-lg bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 transition-colors font-bold text-sm"
              >
                Launch Platform
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
