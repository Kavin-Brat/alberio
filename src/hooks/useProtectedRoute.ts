"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { EntitlementKey } from "@/types/auth";

export interface UseProtectedRouteOptions {
  requiredRole?: string;
  requiredEntitlement?: EntitlementKey;
  redirectTo?: string;
}

/**
 * Custom Hook for Programmatic Route Protection
 * Inspired by react-router-dom auth hooks.
 */
export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { isLoggedIn, user, hasEntitlement, isSuperAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const {
    requiredRole,
    requiredEntitlement,
    redirectTo = "/login",
  } = options;

  const isRoleAuthorized = !requiredRole || user?.role === requiredRole || isSuperAdmin;
  const isEntitlementAuthorized = !requiredEntitlement || hasEntitlement(requiredEntitlement);
  const isAuthorized = isLoggedIn && isRoleAuthorized && isEntitlementAuthorized;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname || "/")}`);
    } else if (!isRoleAuthorized) {

      router.push("/dashboard");
    } else if (!isEntitlementAuthorized) {
      router.push("/pricing");
    }
  }, [
    isLoggedIn,
    isRoleAuthorized,
    isEntitlementAuthorized,
    redirectTo,
    pathname,
    router,
  ]);

  return {
    isLoggedIn,
    isAuthorized,
    user,
  };
}
