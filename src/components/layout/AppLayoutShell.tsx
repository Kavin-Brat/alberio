"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppSidebar from "@/components/layout/AppSidebar";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/constants/authConstants";

/**
 * Application Core Layout Shell
 * Single Responsibility: Manages layout container structure, protected route access guards,
 * and renders the Left Navigation Sidebar exclusively for authenticated workspace sessions.
 */
export default function AppLayoutShell({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const currentPath = pathname || "";

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      currentPath === route ||
      currentPath.startsWith("/blog/") ||
      currentPath.startsWith("/learn/")
  );



  // If user is unauthenticated and attempting to visit a protected route
  if (!isLoggedIn && !isPublicRoute) {
    return (
      <>
        <Header />
        <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 pt-24 pb-12 px-4 font-sora">

          {/* ─── MOBILE: Simple "log in to access" notice (<lg) ─── */}
          <div className="lg:hidden w-full max-w-md">
            <GlassCard className="p-8 border-[#00FF00]/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-5 shadow-2xl rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#00FF00] animate-pulse" />
              </div>

              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Please log in to access this feature.
              </p>
              <Link href="/login" className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold uppercase tracking-wider bg-[#00FF00] text-black hover:bg-[#00FF00]/90 flex items-center justify-center gap-2"
                >
                  Log In <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </GlassCard>
          </div>

          {/* ─── DESKTOP: Full authentication card (lg+) ─── */}
          <div className="hidden lg:block w-full max-w-md">
            <GlassCard className="p-8 border-[#00FF00]/40 bg-[#0b0b0b] text-center flex flex-col items-center gap-5 shadow-2xl rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center">
                <Lock className="w-7 h-7 text-[#00FF00] animate-pulse" />
              </div>

              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Please log in to access this feature.
              </p>
              <Link href="/login" className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold uppercase tracking-wider bg-[#00FF00] text-black hover:bg-[#00FF00]/90 flex items-center justify-center gap-2"
                >
                  Log In to Access Feature <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </GlassCard>
          </div>

        </main>
        <Footer />
      </>
    );
  }


  // Unauthenticated Visitor on Public Page (Landing /, Login /login, Register /register, Guides /blog)
  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <main className="flex-1 w-full flex flex-col relative z-10 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </>
    );
  }

  // Authenticated User Workspace with Left Navigation Sidebar
  return (
    <>
      <Header />
      <div className="flex flex-1 w-full min-h-screen pt-16 md:pt-20">
        {/* Left Navigation Sidebar under Logo */}
        <AppSidebar />

        {/* Authenticated Workspace Content Area */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
