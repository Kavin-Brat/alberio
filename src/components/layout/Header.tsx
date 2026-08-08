"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, BarChart3, Calculator, PenTool, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col">
      {/* Top Floating Navbar */}
      <div
        className={cn(
          "w-full transition-all duration-300 px-8 lg:px-16 py-5 flex items-center justify-between",
          isScrolled
            ? "bg-hero-bg/90 backdrop-blur-md border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-4"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-sora text-xl font-semibold tracking-tight text-foreground uppercase">
            TRADEFLOW<span className="text-primary"> GLOBAL</span>
          </span>
        </Link>

        {/* Center Nav Links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "font-sora text-xs tracking-widest uppercase transition-colors hover:text-foreground",
              isActive("/") ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Story
          </Link>

          {/* Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "font-sora text-xs tracking-widest uppercase transition-colors hover:text-foreground flex items-center gap-1 focus:outline-hidden cursor-pointer",
                isActive("/tools") || isActive("/prop-firms") ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              Tools <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-3 w-64 bg-secondary border border-border rounded-lg shadow-2xl p-2 flex flex-col gap-1 backdrop-blur-xl animate-fade-in">
                <Link
                  href="/prop-firms"
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted transition-colors group"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-sora text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      Drawdown Simulator
                    </div>
                    <div className="text-[10px] text-muted-foreground">Test rule survival</div>
                  </div>
                </Link>

                <Link
                  href="/tools/cot-analyzer"
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted transition-colors group"
                >
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-sora text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      COT Analyzer
                    </div>
                    <div className="text-[10px] text-muted-foreground">Track sentiment data</div>
                  </div>
                </Link>

                <Link
                  href="/blog#position-sizer"
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted transition-colors group"
                >
                  <PenTool className="w-4 h-4 text-profit" />
                  <div>
                    <div className="font-sora text-xs font-semibold text-foreground group-hover:text-profit transition-colors">
                      Position Sizer
                    </div>
                    <div className="text-[10px] text-muted-foreground">Calculate exact risk</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/prop-firms"
            className={cn(
              "font-sora text-xs tracking-widest uppercase transition-colors hover:text-foreground",
              isActive("/prop-firms") ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Prop Firms
          </Link>

          <Link
            href="/journal"
            className={cn(
              "font-sora text-xs tracking-widest uppercase transition-colors hover:text-foreground",
              isActive("/journal") ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Journal
          </Link>

          <Link
            href="/blog"
            className={cn(
              "font-sora text-xs tracking-widest uppercase transition-colors hover:text-foreground",
              isActive("/blog") ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            Blog & Guides
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="navCta"
            size="lg"
            className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6"
            onClick={() => window.location.href = "/journal"}
          >
            Get Quote
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground focus:outline-hidden p-2"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
