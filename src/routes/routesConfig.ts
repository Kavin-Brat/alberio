import React from "react";
import PATHS from "./paths";
import { EntitlementKey } from "@/types/auth";

// Module Page Imports (from src/modules/)
import LoginPage from "@/modules/Auth/LoginPage";
import RegisterPage from "@/modules/Auth/RegisterPage";
import DashboardPage from "@/modules/Dashboard/DashboardPage";
import AdminDashboardPage from "@/modules/Admin/AdminDashboardPage";
import AdminUsersPage from "@/modules/Admin/AdminUsersPage";
import AdminRolesPage from "@/modules/Admin/AdminRolesPage";
import TerminalPage from "@/modules/Terminal/TerminalPage";
import ToolsSuitePage from "@/modules/Tools/ToolsSuitePage";
import JournalPage from "@/modules/Journal/JournalPage";

export interface RouteConfig {
  id: string;
  name: string;
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  requiredRole?: string;
  requiredEntitlement?: EntitlementKey;
  redirectIfAuthenticated?: boolean;
  category?: "Auth" | "Dashboard" | "Admin" | "Terminal" | "Tools" | "Journal";
}

/**
 * Master Enterprise Route Array Configuration
 * Inspired by devportal_frontend_2.0 & topsweb routes architecture
 */
export const ROUTES_CONFIG: RouteConfig[] = [
  {
    id: "login",
    name: "Log In",
    path: PATHS.LOGIN,
    component: LoginPage,
    isProtected: false,
    redirectIfAuthenticated: true,
    category: "Auth",
  },
  {
    id: "register",
    name: "Create Account",
    path: PATHS.REGISTER,
    component: RegisterPage,
    isProtected: false,
    redirectIfAuthenticated: true,
    category: "Auth",
  },
  {
    id: "dashboard",
    name: "Personal Cockpit",
    path: PATHS.DASHBOARD,
    component: DashboardPage,
    isProtected: true,
    category: "Dashboard",
  },
  {
    id: "admin-root",
    name: "CEO Command Center",
    path: PATHS.ADMIN.ROOT,
    component: AdminDashboardPage,
    isProtected: true,
    requiredRole: "SUPER_ADMIN",
    category: "Admin",
  },
  {
    id: "admin-users",
    name: "User Management",
    path: PATHS.ADMIN.USERS,
    component: AdminUsersPage,
    isProtected: true,
    requiredRole: "SUPER_ADMIN",
    category: "Admin",
  },
  {
    id: "admin-roles",
    name: "Role & Permission Matrix",
    path: PATHS.ADMIN.ROLES,
    component: AdminRolesPage,
    isProtected: true,
    requiredRole: "SUPER_ADMIN",
    category: "Admin",
  },
  {
    id: "terminal",
    name: "ECN Trading Terminal",
    path: PATHS.TERMINAL,
    component: TerminalPage,
    isProtected: true,
    category: "Terminal",
  },
  {
    id: "tools",
    name: "Quantitative Tools Suite",
    path: PATHS.TOOLS.ROOT,
    component: ToolsSuitePage,
    isProtected: true,
    category: "Tools",
  },
  {
    id: "journal",
    name: "Trade Journal & Compliance",
    path: PATHS.JOURNAL,
    component: JournalPage,
    isProtected: true,
    category: "Journal",
  },
];

export default ROUTES_CONFIG;
