"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Send, BarChart3, Calculator, PenTool, GraduationCap, Sparkles, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const currentPath = pathname || "";


  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-hero-bg/95 backdrop-blur-xl border-l border-border px-8 py-10 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto font-sora"
          >
            <div>
              {/* Header & Close Button */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <span className="font-sora text-sm font-bold tracking-widest text-primary uppercase">
                  ALBIREO PLATFORM
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-hidden cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-5">
                <motion.div variants={linkVariants}>
                  <Link
                    href="/"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase block ${
                      pathname === "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Home
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/learn"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase flex items-center gap-2 ${
                      currentPath.startsWith("/learn") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-primary" /> Learn
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/academy"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase flex items-center gap-2 ${
                      currentPath.startsWith("/academy") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-primary" /> Academy
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/pricing"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase flex items-center gap-2 ${
                      currentPath.startsWith("/pricing") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <DollarSign className="w-4 h-4 text-primary" /> Pro & Pricing
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/prop-firms"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase block ${
                      currentPath.startsWith("/prop-firms") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Prop Firm Directory
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/journal"
                    onClick={onClose}
                    className={`text-base tracking-wider transition-colors uppercase block ${
                      currentPath.startsWith("/journal") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Trading Journal
                  </Link>

                </motion.div>

                {/* Tools Submenu */}
                <motion.div variants={linkVariants} className="flex flex-col gap-2 pt-2 border-t border-border">
                  <span className="text-[10px] font-sora font-bold uppercase tracking-widest text-primary/70">
                    Tools & Suite
                  </span>
                  <Link
                    href="/tools"
                    onClick={onClose}
                    className="flex items-center gap-3 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Quantitative Software Suite
                  </Link>
                  <Link
                    href="/terminal"
                    onClick={onClose}
                    className="flex items-center gap-3 py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    ECN Trading Terminal
                  </Link>
                  <Link
                    href="/tools/cot-analyzer"
                    onClick={onClose}
                    className="flex items-center gap-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    COT Analyzer
                  </Link>
                </motion.div>
              </nav>
            </div>

            {/* Bottom CTA */}
            <motion.div variants={linkVariants} className="pt-6 border-t border-border flex flex-col gap-3">
              <a
                href="https://t.me/+e5tkgGVt5mIxZjI1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-sora font-semibold uppercase tracking-wider text-primary border border-primary/30 rounded-sm hover:bg-primary/10 transition-colors"
              >
                Telegram Channel <Send className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
