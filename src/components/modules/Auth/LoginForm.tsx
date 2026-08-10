"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Key, Mail, ArrowRight, CheckCircle } from "lucide-react";

export interface LoginFormProps {
  onSuccess: (data: { token: string; user: any; allowedMenus: any }) => void;
  onGoogleSignIn: () => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
}

/**
 * Login Form Child Component
 * Encapsulates login form state and submit handling.
 */
export default function LoginForm({
  onSuccess,
  onGoogleSignIn,
  loading,
  setLoading,
}: LoginFormProps) {
  const [email, setEmail] = useState("kavin@albireo.com");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "Login successful! JWT token generated.");
      onSuccess(data);
    } catch (err) {
      setError("Network error connecting to auth server");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-xs">
      {/* Google SSO Button */}
      <button
        type="button"
        onClick={onGoogleSignIn}
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
        {error && (
          <div className="p-3 rounded bg-red-500/20 border border-red-500 text-red-400 text-xs font-bold text-center font-mono">
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
    </div>
  );
}
