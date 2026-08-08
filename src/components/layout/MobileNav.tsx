"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Send, BarChart3, Calculator, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

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
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-hero-bg/95 backdrop-blur-xl border-l border-border px-8 py-10 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
          >
            <div>
              {/* Header & Close Button */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <span className="font-sora text-sm font-bold tracking-widest text-primary uppercase">
                  ALBIREO
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
              <nav className="flex flex-col gap-6">
                <motion.div variants={linkVariants}>
                  <Link
                    href="/"
                    onClick={onClose}
                    className={`font-sora text-lg tracking-wider transition-colors uppercase block ${
                      pathname === "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Story
                  </Link>
                </motion.div>

                {/* Tools Submenu */}
                <motion.div variants={linkVariants} className="flex flex-col gap-2 pt-2 border-t border-border">
                  <span className="text-[10px] font-sora font-bold uppercase tracking-widest text-primary/70">
                    Tools & Terminal
                  </span>
                  <Link
                    href="/terminal"
                    onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    ECN Trading Terminal
                  </Link>
                  <Link
                    href="/prop-firms"
                    onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-primary" />
                    Drawdown Simulator
                  </Link>
                  <Link
                    href="/tools/cot-analyzer"
                    onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-primary" />
                    COT Analyzer
                  </Link>
                  <Link
                    href="/blog#position-sizer"
                    onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <PenTool className="w-4 h-4 text-profit" />
                    Position Sizer
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/prop-firms"
                    onClick={onClose}
                    className={`font-sora text-lg tracking-wider transition-colors uppercase block ${
                      pathname.startsWith("/prop-firms") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Prop Firms
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/journal"
                    onClick={onClose}
                    className={`font-sora text-lg tracking-wider transition-colors uppercase block ${
                      pathname.startsWith("/journal") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Journal
                  </Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                  <Link
                    href="/blog"
                    onClick={onClose}
                    className={`font-sora text-lg tracking-wider transition-colors uppercase block ${
                      pathname.startsWith("/blog") ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Blog & Guides
                  </Link>
                </motion.div>
              </nav>
            </div>

            {/* Bottom CTA */}
            <motion.div variants={linkVariants} className="pt-8 border-t border-border flex flex-col gap-3">
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
