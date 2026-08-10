"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { EntitlementKey } from "@/types/auth";
import { Lock, ShieldAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredEntitlement?: EntitlementKey;
  redirectTo?: string;
}

/**
 * Declarative Protected Route Guard Component
 * Matches react-router-dom <ProtectedRoute> paradigm.
 * 
 * Simple Explanation:
 * Wraps protected page components.
 * 1. Checks if the user is logged in.
 * 2. If not logged in, redirects to /login.
 * 3. Checks if the user has the required role or entitlement.
 */
export default function ProtectedRoute({
  children,
  requiredRole,
  requiredEntitlement,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isLoggedIn, user, hasEntitlement, isSuperAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname || "/")}`);
    }
  }, [isLoggedIn, redirectTo, pathname, router]);


  // If user is unauthenticated, render safe loading card while redirecting
  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 font-sora">
        <GlassCard className="max-w-md w-full p-8 border-[#00FF00]/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-4 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00]">
            <Lock className="w-6 h-6 text-[#00FF00] animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Authenticating Session...</h2>
          <p className="text-xs text-slate-400 font-light">
            Redirecting to dedicated login gateway...
          </p>
        </GlassCard>
      </div>
    );
  }

  // Check role authorization if specified
  if (requiredRole && user?.role !== requiredRole && !isSuperAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 font-sora">
        <GlassCard className="max-w-md w-full p-8 border-red-500/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-4 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-6 h-6 text-red-400 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Access Restricted</h2>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Your role (<span className="font-mono text-[#00FF00] font-bold">{user?.role}</span>) does not have permission to access this module. <span className="font-mono text-red-400 font-bold">{requiredRole}</span> role required.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="w-full font-bold uppercase bg-[#00FF00] text-black"
          >
            Return to Personal Cockpit
          </Button>
        </GlassCard>
      </div>
    );
  }

  // Check entitlement authorization if specified
  if (requiredEntitlement && !hasEntitlement(requiredEntitlement)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 font-sora">
        <GlassCard className="max-w-md w-full p-8 border-amber-500/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-4 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Pro Feature Upgrade Required</h2>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            The feature <span className="font-mono text-amber-400 font-bold">{requiredEntitlement}</span> is locked under your current plan tier.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/pricing")}
            className="w-full font-bold uppercase bg-[#00FF00] text-black"
          >
            Upgrade to Pro Tier &rarr;
          </Button>
        </GlassCard>
      </div>
    );
  }

  // Render protected page content
  return <>{children}</>;
}
