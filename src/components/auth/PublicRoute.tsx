"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

/**
 * Declarative Public Route Guard Component
 * Matches react-router-dom <PublicRoute> paradigm.
 * 
 * Simple Explanation:
 * Wraps public authentication pages (/login, /register).
 * If redirectIfAuthenticated is true and the user is already logged in,
 * automatically redirects them to /dashboard.
 */
export default function PublicRoute({
  children,
  redirectIfAuthenticated = false,
  redirectTo = "/dashboard",
}: PublicRouteProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && redirectIfAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoggedIn, redirectIfAuthenticated, redirectTo, router]);

  // If user is already authenticated and redirect is enabled, render empty while redirecting
  if (isLoggedIn && redirectIfAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
