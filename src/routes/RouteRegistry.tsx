"use client";

import React from "react";
import { ROUTES_CONFIG, RouteConfig } from "./routesConfig";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";

export interface RouteRegistryProps {
  path?: string;
  fallbackComponent?: React.ComponentType<any>;
}

/**
 * Enterprise Route Registry Renderer Component
 * Inspired by devportal_frontend_2.0 & topsweb routes architecture
 * 
 * Simple Explanation:
 * Matches current route path against ROUTES_CONFIG array.
 * Wraps page component with <ProtectedRoute> or <PublicRoute> automatically.
 */
export function RouteRegistry({ path, fallbackComponent: Fallback }: RouteRegistryProps) {
  if (!path) {
    return null;
  }

  const route: RouteConfig | undefined = ROUTES_CONFIG.find((r) => r.path === path);

  if (!route) {
    return Fallback ? <Fallback /> : null;
  }

  const Component = route.component;

  if (route.isProtected) {
    return (
      <ProtectedRoute
        requiredRole={route.requiredRole}
        requiredEntitlement={route.requiredEntitlement}
      >
        <Component />
      </ProtectedRoute>
    );
  }

  return (
    <PublicRoute redirectIfAuthenticated={route.redirectIfAuthenticated}>
      <Component />
    </PublicRoute>
  );
}

export default RouteRegistry;
