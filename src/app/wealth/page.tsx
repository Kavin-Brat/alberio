"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ShieldCheck, Building2, TrendingUp, DollarSign, Award, CheckCircle2, Lock, ArrowRight, Send, Check } from "lucide-react";
import Link from "next/link";

export default function WealthManagementPage() {
  const [capitalInput, setCapitalInput] = useState<number>(10000000); // Default ₹1 Crore
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <GlassCard className="p-8 sm:p-12 border-profit/50 bg-secondary/70 font-sora relative overflow-hidden shadow-[0_0_50px_rgba(34,230,0,0.15)]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-profit/20 text-profit border border-profit/40 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
                <Building2 className="w-4 h-4 text-profit" /> Level 6 — Albireo Wealth
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              Regulated Wealth & Capital Advisory
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
              Designed for high-net-worth individuals, family offices, and sophisticated investors seeking systematic quantitative risk management and transparent portfolio custody.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-foreground font-medium border-t border-border pt-4 mt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> Regulated Advisory Structure</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-profit" /> Defined Risk Philosophy</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> Zero-Trust Transparency</span>
            </div>
          </div>

          {/* Live AUM Metric Box */}
          <div className="bg-hero-bg border border-profit/40 p-6 rounded-2xl flex flex-col gap-3 font-mono text-center shrink-0 w-full lg:w-72 shadow-[0_0_20px_rgba(34,230,0,0.1)]">
            <span className="text-[10px] text-muted-foreground uppercase font-sora font-bold">Target Assets Under Management</span>
            <div className="text-3xl font-black text-profit">₹100 Crore</div>
            <span className="text-[11px] text-muted-foreground font-light">Target AUM Threshold</span>
          </div>
        </div>
      </GlassCard>

      {/* CORE PHILOSOPHY & CUSTODY ARCHITECTURE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sora mt-4">
        <GlassCard className="p-6 border-border flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit border border-primary/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Defined Risk Controls</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              We never trade unhedged tail risks. Every capital allocation operates under automated Monte Carlo stop loss limits and strict VaR controls.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-border flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-profit/10 text-profit rounded-lg w-fit border border-profit/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Transparent Fee Structure</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              High water mark performance fees with zero hidden markups. You maintain complete visibility into equity curves and drawdown metrics.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-border flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit border border-primary/20">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Independent Custody</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Your assets remain held in regulated tier-1 institutional custodians in your own account name. Albireo acts strictly as advisor/manager.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* CAPITAL ALLOCATION INQUIRY FORM (₹1 CRORE+) */}
      <GlassCard id="inquire" className="p-8 sm:p-12 border-border bg-secondary/40 font-sora mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider w-fit flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> HNW Portfolio Allocation
            </span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Inquire Wealth Advisory Services
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              If you have ₹1 Crore or more in liquid investment capital and seek systematic quantitative management, submit your profile below for a confidential consultation.
            </p>

            <div className="space-y-2 text-xs text-foreground font-medium border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-profit shrink-0" />
                <span>Minimum Portfolio Allocation: ₹1,00,000,00 (₹1 Crore)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-profit shrink-0" />
                <span>Custom Risk Profiles (Conservative / Balanced / Dynamic)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-hero-bg border border-border p-6 rounded-xl">
            {!submitted ? (
              <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kavin B"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="kavin@familyoffice.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">
                    Target Investment Capital: <span className="text-profit font-mono font-bold">₹{capitalInput.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="10000000"
                    max="100000000"
                    step="5000000"
                    value={capitalInput}
                    onChange={(e) => setCapitalInput(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
                    <span>₹1 Crore</span>
                    <span>₹5 Crore</span>
                    <span>₹10 Crore+</span>
                  </div>
                </div>

                <Button variant="primary" size="md" type="submit" className="font-bold uppercase tracking-wider mt-2">
                  Submit Confidential Consultation Inquiry
                </Button>
              </form>
            ) : (
              <div className="py-8 flex flex-col items-center text-center gap-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-profit/20 border border-profit/40 flex items-center justify-center text-profit">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Inquiry Received</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Thank you, {fullName}. Our wealth advisory team will reach out via email within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
