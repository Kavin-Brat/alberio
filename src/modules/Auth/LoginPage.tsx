"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicRoute from "@/components/auth/PublicRoute";
import LoginForm from "@/components/modules/Auth/LoginForm";
import DemoPersonaSwitcher from "@/components/modules/Auth/DemoPersonaSwitcher";
import MobileDesktopNotice from "@/components/modules/Auth/MobileDesktopNotice";

/**
 * Parent Page Component: Login Page
 * Composes Auth child components: LoginForm, DemoPersonaSwitcher, MobileDesktopNotice
 */
export default function LoginPage() {
  const { setAuthSession, switchUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (data: { token: string; user: any; allowedMenus: any }) => {
    setAuthSession(data.token, data.user, data.allowedMenus);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "kavin@albireo.com" }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthSession(data.token, data.user, data.allowedMenus);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (e) {
      switchUser("usr-kavin-ceo");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (userId: string) => {
    switchUser(userId);
    router.push("/dashboard");
  };

  return (
    <PublicRoute redirectIfAuthenticated>
      <PageContainer>
        <div className="max-w-md mx-auto w-full font-sora py-8">
          {/* Child Component 1: Mobile Viewport Notice */}
          <MobileDesktopNotice />

          {/* Child Component 2: Desktop Login Workstation */}
          <div className="hidden lg:block">
            <GlassCard className="p-8 border-slate-800 bg-[#0b0b0b] flex flex-col gap-6 shadow-2xl rounded-2xl">
              {/* Header */}
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">Log In to Albireo</h1>
                <p className="text-xs text-slate-400 font-light">
                  Dedicated authentication gateway for trading intelligence, trade journal, and prop firm risk tools.
                </p>
              </div>

              {/* Child Component 3: Login Form */}
              <LoginForm
                onSuccess={handleLoginSuccess}
                onGoogleSignIn={handleGoogleSignIn}
                loading={loading}
                setLoading={setLoading}
              />

              {/* Child Component 4: Demo Persona Switcher */}
              <DemoPersonaSwitcher onSelectUser={handleQuickDemoLogin} />

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
    </PublicRoute>
  );
}
