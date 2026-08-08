"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, Calculator, BarChart3, PenTool, Send } from "lucide-react";
import Button from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  } as const;

  return (
    <>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-primary-dark/95 backdrop-blur-xl border-l border-cyber-cyan/20 px-8 py-10 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
      >
        <div>
          {/* Header & Close Button */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <span className="font-sora text-sm font-bold tracking-widest text-primary uppercase">
              ALBIREO
            </span>
            <button
              onClick={onClose}
              className="p-2 text-light-purple hover:text-cyber-cyan transition-colors focus:outline-hidden"
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
                className={`font-heading text-lg tracking-wider transition-colors uppercase block ${
                  pathname === "/" ? "text-cyber-cyan text-glow-cyan" : "text-light-purple hover:text-cyber-cyan"
                }`}
              >
                Story
              </Link>
            </motion.div>

            {/* Tools Submenu */}
            <motion.div variants={linkVariants} className="flex flex-col gap-2 pt-2 border-t border-cyber-cyan/10">
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
                className="flex items-center gap-3 py-2 text-sm text-light-purple hover:text-cyber-cyan transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-electric-cyan" />
                COT Analyzer
              </Link>
              <Link
                href="/blog#position-sizer"
                onClick={onClose}
                className="flex items-center gap-3 py-2 text-sm text-light-purple hover:text-cyber-cyan transition-colors"
              >
                <PenTool className="w-4 h-4 text-profit" />
                Position Sizer
              </Link>
            </motion.div>

            <motion.div variants={linkVariants}>
              <Link
                href="/prop-firms"
                onClick={onClose}
                className={`font-heading text-lg tracking-wider transition-colors uppercase block ${
                  pathname.startsWith("/prop-firms") ? "text-cyber-cyan text-glow-cyan" : "text-light-purple hover:text-cyber-cyan"
                }`}
              >
                Prop Firms
              </Link>
            </motion.div>

            <motion.div variants={linkVariants}>
              <Link
                href="/journal"
                onClick={onClose}
                className={`font-heading text-lg tracking-wider transition-colors uppercase block ${
                  pathname.startsWith("/journal") ? "text-cyber-cyan text-glow-cyan" : "text-light-purple hover:text-cyber-cyan"
                }`}
              >
                Journal
              </Link>
            </motion.div>

            <motion.div variants={linkVariants}>
              <Link
                href="/blog"
                onClick={onClose}
                className={`font-heading text-lg tracking-wider transition-colors uppercase block ${
                  pathname.startsWith("/blog") ? "text-cyber-cyan text-glow-cyan" : "text-light-purple hover:text-cyber-cyan"
                }`}
              >
                Blog & Guides
              </Link>
            </motion.div>
          </nav>
        </div>

        {/* Bottom CTA */}
        <motion.div variants={linkVariants} className="pt-8 border-t border-cyber-cyan/15 flex flex-col gap-3">
          <a
            href="https://t.me/+e5tkgGVt5mIxZjI1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-heading font-semibold uppercase tracking-wider text-cyber-cyan border border-cyber-cyan/30 rounded-sm hover:bg-cyber-cyan/10 transition-colors"
          >
            Telegram Group <Send className="w-3.5 h-3.5" />
          </a>
          <Button
            variant="cyber"
            size="md"
            className="w-full"
            onClick={() => {
              onClose();
              window.location.href = "/journal";
            }}
          >
            Launch Platform
          </Button>
        </motion.div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
