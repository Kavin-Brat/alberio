"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";
import UserNavCorner from "@/components/layout/UserNavCorner";
import { useAuth } from "@/context/AuthContext";
import { APP_CONFIG } from "@/constants/appConstants";

/**
 * Platform Main Top Navigation Header
 * Single Responsibility: Renders top navbar brand logo, desktop feature menus,
 * and user profile pill or authentication CTA buttons. Restricts Log In & Get Started actions to desktop (>=1024px).
 */
export default function Header() {
  const { isLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
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
    setIsDropdownOpen(false);
  }, [pathname]);

  const currentPath = pathname || "";
  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col font-sora">
        {/* Top Floating Navbar */}
        <div
          className={cn(
            "w-full transition-all duration-300 px-6 lg:px-12 py-4 flex items-center justify-between",
            isScrolled
              ? "bg-black/95 backdrop-blur-md border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3.5"
              : "bg-transparent border-b border-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-sora text-xl font-bold tracking-tight text-white uppercase">
              {APP_CONFIG.name}<span className="text-[#22e600]">{APP_CONFIG.suffix}</span>
            </span>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/learn"
              className={cn(
                "text-xs tracking-widest uppercase transition-colors hover:text-white",
                isActive("/learn") ? "text-[#22e600] font-semibold" : "text-muted-foreground"
              )}
            >
              Learn
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  href="/blog"
                  className={cn(
                    "text-xs tracking-widest uppercase transition-colors hover:text-white",
                    isActive("/blog") ? "text-[#22e600] font-semibold" : "text-muted-foreground"
                  )}
                >
                  Blogs & Guides
                </Link>

                {/* Tools Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                      "text-xs tracking-widest uppercase transition-colors hover:text-white flex items-center gap-1 focus:outline-hidden cursor-pointer",
                      isActive("/tools") ? "text-[#22e600] font-semibold" : "text-muted-foreground"
                    )}
                  >
                    Tools <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-3 w-64 bg-[#0b0b0b] border border-border rounded-lg shadow-2xl p-2 flex flex-col gap-1 backdrop-blur-xl animate-fade-in z-50">
                      <Link
                        href="/tools"
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted transition-colors group"
                      >
                        <BarChart3 className="w-4 h-4 text-[#22e600]" />
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#22e600] transition-colors">
                            Quantitative Tools Suite
                          </div>
                          <div className="text-[10px] text-muted-foreground">Compliance & Monte Carlo</div>
                        </div>
                      </Link>

                      <Link
                        href="/tools/cot-analyzer"
                        className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted transition-colors group"
                      >
                        <BarChart3 className="w-4 h-4 text-[#22e600]" />
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#22e600] transition-colors">
                            COT Sentiment Analyzer
                          </div>
                          <div className="text-[10px] text-muted-foreground">CFTC institutional flow</div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/prop-firms"
                  className={cn(
                    "text-xs tracking-widest uppercase transition-colors hover:text-white",
                    isActive("/prop-firms") ? "text-[#22e600] font-semibold" : "text-muted-foreground"
                  )}
                >
                  Prop Firms
                </Link>
              </>
            ) : null}
          </nav>

          {/* Right Action: Log In / Sign Up OR UserNavCorner Profile Pill (Strictly Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3 font-sora">
            {isLoggedIn ? (
              <UserNavCorner />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors px-2 py-1"
                >
                  Log In
                </Link>

                <Link href="/register">
                  <Button variant="primary" size="sm" className="font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,230,0,0.3)] bg-[#22e600] text-black hover:bg-[#22e600]/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Pro Modal */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </>
  );
}
