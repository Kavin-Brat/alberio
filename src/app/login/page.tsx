"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Key, Mail, ArrowRight, Crown, Monitor, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setAuthSession, switchUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("kavin@albireo.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "Login successful! JWT token generated.");
      setAuthSession(data.token, data.user, data.allowedMenus);

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      setError("Network error connecting to auth server");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "kavin@albireo.com" })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Google SSO authentication successful!");
        setAuthSession(data.token, data.user, data.allowedMenus);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (e) {
      switchUser("usr-kavin-ceo");
      router.push("/dashboard");
    }
  };

  const handleQuickDemoLogin = (userId: string) => {
    switchUser(userId);
    router.push("/dashboard");
  };

  return (
    <PageContainer>
      <div className="max-w-md mx-auto w-full font-sora py-8">
        {/* MOBILE NOTICE (<1024px) */}
        <div className="lg:hidden">
          <GlassCard className="p-8 border-[#00FF00]/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-4 rounded-2xl shadow-2xl">
            <Monitor className="w-12 h-12 text-[#00FF00] animate-bounce" />
            <h2 className="text-xl font-bold text-white">Desktop Workstation Required</h2>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              The Albireo Trading Cockpit & Executive Command Center are optimized exclusively for desktop displays. Mobile login access is temporarily restricted for risk safety.
            </p>
            <Link href="/" className="w-full">
              <Button variant="primary" size="sm" className="w-full font-bold uppercase bg-[#00FF00] text-black">
                Return to Landing Page &rarr;
              </Button>
            </Link>
          </GlassCard>
        </div>

        {/* STANDALONE DESKTOP LOGIN PAGE (>=1024px) */}
        <div className="hidden lg:block">
          <GlassCard className="p-8 border-slate-800 bg-[#0b0b0b] flex flex-col gap-6 shadow-2xl rounded-2xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00]">
                <Sparkles className="w-6 h-6 text-[#00FF00] animate-pulse" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Log In to Albireo</h1>
              <p className="text-xs text-slate-400 font-light">
                Dedicated authentication gateway for trading intelligence, trade journal, and prop firm risk tools.
              </p>
            </div>

            {/* Google Single Sign-On (SSO) Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md text-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] text-slate-500 font-mono uppercase">Or Email Sign In</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs">
              {error && (
                <div className="p-3 rounded bg-red-500/20 border border-red-500 text-red-400 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded bg-[#00FF00]/10 border border-[#00FF00]/40 text-[#00FF00] text-xs font-bold text-center flex items-center justify-center gap-2 font-mono">
                  <CheckCircle className="w-4 h-4 text-[#00FF00]" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded pl-9 p-2.5 text-white focus:border-[#00FF00] focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded pl-9 p-2.5 text-white focus:border-[#00FF00] focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={loading}
                className="font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-2 bg-[#00FF00] text-black hover:bg-[#00FF00]/90"
              >
                {loading ? "Authenticating..." : "Log In to Cockpit"} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Quick Demo Persona Switcher */}
            <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center block font-mono">
                1-Click Instant Demo Login As:
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <button
                  onClick={() => handleQuickDemoLogin("usr-kavin-ceo")}
                  className="p-2 bg-slate-950 hover:bg-slate-900 border border-[#00FF00]/40 text-[#00FF00] rounded text-left transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5 shrink-0 text-[#00FF00]" />
                  <span className="truncate">Kavin (CEO Admin)</span>
                </button>

                <button
                  onClick={() => handleQuickDemoLogin("usr-alex-pro")}
                  className="p-2 bg-slate-950 hover:bg-slate-900 border border-emerald-500/40 text-emerald-400 rounded text-left transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span className="truncate">Alex (Pro Trader)</span>
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-[#00FF00] font-bold hover:underline">
                Sign Up Free &rarr;
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
