"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Key, ArrowRight, Monitor } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { switchUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [riskProfile, setRiskProfile] = useState("Moderate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, riskProfile })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      switchUser(data.user.id);
      router.push("/dashboard");
    } catch (err) {
      setError("Network error creating account");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      switchUser("usr-kavin-ceo");
      router.push("/dashboard");
    }, 600);
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
              Account registration and trading cockpit setup are optimized exclusively for desktop workstation displays.
            </p>
            <Link href="/" className="w-full">
              <Button variant="primary" size="sm" className="w-full font-bold uppercase bg-[#00FF00] text-black">
                Return to Landing Page &rarr;
              </Button>
            </Link>
          </GlassCard>
        </div>

        {/* STANDALONE DESKTOP SIGN UP PAGE (>=1024px) */}
        <div className="hidden lg:block">
          <GlassCard className="p-8 border-slate-800 bg-[#0b0b0b] flex flex-col gap-6 shadow-2xl rounded-2xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00]">
                <User className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Create Free Account</h1>
              <p className="text-xs text-slate-400 font-light">
                Save your course progress, quiz scores, trade journal logs, and market watchlists.
              </p>
            </div>

            {/* Google Single Sign-On (SSO) Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md text-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? "Signing up..." : "Sign Up with Google"}</span>
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] text-slate-500 font-mono uppercase">Or Register with Email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="flex flex-col gap-4 text-xs">
              {error && (
                <div className="p-3 rounded bg-red-500/20 border border-red-500 text-red-400 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kavin B"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded pl-9 p-2.5 text-white focus:border-[#00FF00] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="trader@example.com"
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
                    placeholder="••••••••"
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
                {loading ? "Creating Account..." : "Create Free Account"} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00FF00] font-bold hover:underline">
                Log In &rarr;
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
