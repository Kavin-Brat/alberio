"use client";

import React, { useState } from "react";
import { X, UserPlus, Check, Sparkles, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const { switchUser, allMockUsers } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [riskProfile, setRiskProfile] = useState<"Conservative" | "Moderate" | "Aggressive">("Moderate");
  const [createdSuccess, setCreatedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedSuccess(true);
    setTimeout(() => {
      // Switch to Sarah (Registered Account User) as working proxy
      switchUser("usr-sarah-student");
      setCreatedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sora">
      <div className="relative w-full max-w-md bg-hero-bg border border-primary/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,230,0,0.2)] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Level 2 Free Account
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                Create Your Free Albireo Account
              </h2>
              <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                Save your course progress, quiz scores, trade journal logs, and market watchlists across devices.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavin B"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="trader@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Risk Preference Profile</label>
                <select
                  value={riskProfile}
                  onChange={(e) => setRiskProfile(e.target.value as any)}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:outline-hidden focus:border-primary"
                >
                  <option value="Conservative">Conservative (0.5% - 1% Risk)</option>
                  <option value="Moderate">Moderate (1% - 2% Risk)</option>
                  <option value="Aggressive">Aggressive (2%+ Risk)</option>
                </select>
              </div>
            </div>

            <Button variant="primary" size="md" type="submit" className="font-bold uppercase tracking-wider mt-2">
              Create Free Account & Save Progress
            </Button>
          </form>
        ) : (
          <div className="py-8 flex flex-col items-center text-center gap-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-profit/20 border border-profit/40 flex items-center justify-center text-profit">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Welcome to Albireo Level 2!</h3>
            <p className="text-xs text-muted-foreground">Account created. Loading your personalized workspace...</p>
          </div>
        )}
      </div>
    </div>
  );
}
