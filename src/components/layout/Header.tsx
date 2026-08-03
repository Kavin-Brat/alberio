"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Star, BarChart3, Calculator, PenTool, Send } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

/**
 * Header Component
 *
 * Glassmorphic sticky top navigation bar.
 * - backdrop-blur-md translucent background (light & dark)
 * - Pill container for desktop nav links with sliding active indicator
 * - Logo: binary star SVG + ALBIREO text + amber trailing dot
 * - Mobile: right-side slide-in drawer (translate-x animation)
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Tracks the active nav pill position for the sliding indicator
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
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

  // Update sliding pill indicator to the active nav link
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setPillStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [pathname]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Helper: check if a path is active
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Nav link base classes
  const navLinkClass = (href: string) =>
    `relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
      isActive(href)
        ? "text-white dark:text-white"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 w-full z-50 flex flex-col">
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

      {/* Main Navigation — glassmorphic bar */}
      <nav className="w-full bg-slate-100/40 dark:bg-slate-950/20 backdrop-blur-md border-b border-b-[0.5px] border-slate-200/10 dark:border-white/5 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo: Binary Star SVG + ALBIREO + amber trailing dot */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              {/* Futuristic Binary Star Constellation Logo */}
              <svg className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(220,253,53,0.35)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Orbital path arc */}
                <path
                  d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                  className="text-text-muted/30 group-hover:rotate-45 transition-transform duration-700 ease-in-out origin-center"
                />
                <path
                  d="M5 9C6.5 6 9.5 4 13 4C17.4183 4 21 7.58172 21 12C21 15.5 19 18.5 16 20"
                  stroke="var(--accent-gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="group-hover:stroke-cygnus-gold-hover transition-colors"
                />
                {/* Primary Star (Albireo A) — Volt/Amber Glow */}
                <circle
                  cx="13"
                  cy="4"
                  r="3.5"
                  fill="var(--accent-gold)"
                  className="animate-pulse"
                />
                {/* Secondary Star (Albireo B) — Cyan */}
                <circle
                  cx="18"
                  cy="15"
                  r="2.2"
                  fill="var(--color-electric-cyan)"
                  className="filter drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]"
                />
              </svg>
            </div>
            {/* Brand text + amber trailing dot (portfolio-2k26 Section 7) */}
            <span className="font-black text-lg tracking-[0.25em] bg-gradient-to-r from-text-primary via-text-primary to-cygnus-gold bg-clip-text text-transparent group-hover:to-electric-cyan transition-all duration-300">
              ALBIREO
            </span>
            <span className="text-2xl font-extrabold text-cygnus-gold leading-none -ml-1">
              .
            </span>
          </Link>

          {/* Desktop Navigation — pill container with sliding indicator */}
          <div className="hidden lg:flex items-center">
            <div
              ref={navRef}
              className="relative flex items-center gap-1 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full p-1"
            >
              {/* Sliding active pill background */}
              <div
                className="absolute top-1 bottom-1 bg-slate-900 dark:bg-white/15 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{ left: `${pillStyle.left + 4}px`, width: `${pillStyle.width}px` }}
              />

              <Link
                href={pathname === "/" ? "#journey" : "/#journey"}
                data-active={pathname === "/"}
                className={navLinkClass("/")}
              >
                Story
              </Link>

              {/* Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`relative z-10 flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive("/tools") || isActive("/prop-firms")
                      ? "text-white dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  } focus:outline-none`}
                >
                  Tools <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-64 glass border border-glass-border rounded-xl shadow-2xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/prop-firms"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue/40 transition-colors text-text-muted hover:text-text-primary group"
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
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue/40 transition-colors text-text-muted hover:text-text-primary group"
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
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-albireo-blue/40 transition-colors text-text-muted hover:text-text-primary group"
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
                data-active={isActive("/prop-firms")}
                className={navLinkClass("/prop-firms")}
              >
                Prop Firms
              </Link>

              <Link
                href="/journal"
                data-active={isActive("/journal")}
                className={navLinkClass("/journal")}
              >
                Journal
              </Link>

              <Link
                href="/blog"
                data-active={isActive("/blog")}
                className={navLinkClass("/blog")}
              >
                Blog & Guides
              </Link>
            </div>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/journal"
              className="text-text-primary hover:text-cygnus-gold transition-colors text-xs font-semibold uppercase tracking-wider px-4 py-2 border border-transparent hover:border-border-custom rounded-full bg-transparent"
            >
              Log In
            </Link>
            <Link
              href="/journal"
              className="bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-cygnus-gold/20 hover:shadow-cygnus-gold/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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

        {/* Mobile Slide-in Drawer (right-side, translate-x animation) */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-slate-100/90 dark:bg-slate-950/95 backdrop-blur-xl z-[200] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-custom/50">
            <span className="font-black text-sm tracking-[0.25em] text-text-primary uppercase">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-surface-card text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            <Link
              href={pathname === "/" ? "#journey" : "/#journey"}
              className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              Story
            </Link>

            <div className="flex flex-col gap-1 pl-2 border-l border-border-custom mt-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 px-2 py-1">Tools</span>
              <Link href="/prop-firms" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cygnus-gold" /> Drawdown Simulator
              </Link>
              <Link href="/tools/cot-analyzer" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-electric-cyan" /> COT Analyzer
              </Link>
              <Link href="/blog#position-sizer" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors flex items-center gap-2">
                <PenTool className="w-4 h-4 text-profit" /> Position Sizer
              </Link>
            </div>

            <Link href="/prop-firms" className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors">
              Prop Firms
            </Link>
            <Link href="/journal" className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors">
              Journal
            </Link>
            <Link href="/blog" className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors">
              Blog & Guides
            </Link>
          </div>

          {/* Drawer Footer CTAs */}
          <div className="flex flex-col gap-3 p-4 border-t border-border-custom/50">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Appearance</span>
              <ThemeToggle />
            </div>
            <Link
              href="/journal"
              className="w-full text-center py-2.5 rounded-full border border-border-custom text-text-primary hover:bg-surface-card transition-colors font-semibold text-sm uppercase tracking-wider"
            >
              Log In
            </Link>
            <Link
              href="/journal"
              className="w-full text-center py-2.5 rounded-full bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 transition-colors font-bold text-sm uppercase tracking-wider"
            >
              Launch Platform
            </Link>
          </div>
        </div>

        {/* Backdrop overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-slate-950/60 dark:bg-black/60 backdrop-blur-sm z-[150]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}
