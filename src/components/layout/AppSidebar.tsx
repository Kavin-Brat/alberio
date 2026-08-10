"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Wrench, 
  Building2, 
  Cpu, 
  Sparkles, 
  Users, 
  FileText, 
  Bookmark, 
  Crown,
  ChevronRight,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { MenuItem } from "@/backend/services/menuService";

/**
 * Authenticated Left Navigation Sidebar Component
 * Single Responsibility: Renders platform tools navigation categories and user workspace links
 * exclusively when the user is logged into an active session.
 */
export default function AppSidebar() {
  const { user, isLoggedIn, allowedMenus, isSuperAdmin, logout } = useAuth();
  const pathname = usePathname();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // If user is unauthenticated, do not render sidebar
  if (!isLoggedIn) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard": return LayoutDashboard;
      case "GraduationCap": return GraduationCap;
      case "Wrench": return Wrench;
      case "Building2": return Building2;
      case "Cpu": return Cpu;
      case "Sparkles": return Sparkles;
      case "Users": return Users;
      case "FileText": return FileText;
      case "Bookmark": return Bookmark;
      case "Crown": return Crown;
      case "ShieldCheck": return ShieldCheck;
      default: return LayoutDashboard;
    }
  };

  const currentPath = pathname || "";
  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);


  // Default menu list fallback if backend menu list is loading
  const defaultGeneralItems = [
    { label: "Cockpit Dashboard", href: "/dashboard", iconName: "LayoutDashboard" },
    { label: "Learn Platform", href: "/learn", iconName: "GraduationCap" },
    { label: "ECN Terminal", href: "/terminal", iconName: "Cpu" },
    { label: "Quantitative Suite", href: "/tools", iconName: "Wrench" },
    { label: "Prop-Firm Directory", href: "/prop-firms", iconName: "Building2" },
    { label: "Trade Journal", href: "/journal", iconName: "FileText" },
    { label: "Trader Academy", href: "/academy", iconName: "Bookmark" },
    { label: "Albireo Pro SaaS", href: "/pricing", iconName: "Sparkles" },
  ];

  const generalItems = allowedMenus && allowedMenus.length > 0 ? allowedMenus : defaultGeneralItems;

  return (
    <>
      {/* Sidebar Overlay on Mobile */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0b0b0b] border-r border-slate-800 p-4 font-sora flex flex-col justify-between shrink-0 transition-transform duration-300 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto pt-2">
          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block mb-2 font-mono">
              Platform Navigation
            </span>
            {generalItems.map((item) => {
              const IconComp = getIcon(item.iconName);
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpenMobile(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group",
                    active
                      ? "bg-[#22e600]/10 text-[#22e600] border border-[#22e600]/30 font-bold shadow-[0_0_15px_rgba(34,230,0,0.1)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                  )}
                >
                  <IconComp className={cn("w-4 h-4 shrink-0 transition-colors", active ? "text-[#22e600]" : "text-slate-400 group-hover:text-white")} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-[#22e600]" />}
                </Link>
              );
            })}
          </div>

          {/* Super Admin Section */}
          {isSuperAdmin && (
            <div className="space-y-1 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold text-[#22e600] uppercase tracking-widest px-2 block mb-2 font-mono flex items-center gap-1.5">
                <Crown className="w-3 h-3 text-[#22e600]" /> Executive Admin
              </span>

              <Link
                href="/admin"
                onClick={() => setIsOpenMobile(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group",
                  isActive("/admin") && !currentPath.includes("/admin/")

                    ? "bg-[#22e600]/15 text-[#22e600] border border-[#22e600]/40 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <Crown className="w-4 h-4 text-[#22e600]" />
                <span className="flex-1">CEO Command Center</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => setIsOpenMobile(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group",
                  isActive("/admin/users")
                    ? "bg-[#22e600]/15 text-[#22e600] border border-[#22e600]/40 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <ShieldCheck className="w-4 h-4 text-[#22e600]" />
                <span className="flex-1">User & Role Management</span>
              </Link>
            </div>
          )}
        </div>

        {/* User Footer Profile Summary */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#22e600]/20 border border-[#22e600]/40 flex items-center justify-center text-[#22e600] font-bold text-xs font-mono shrink-0">
              {(user?.name || "U").charAt(0)}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">{user?.name || "User"}</span>
              <span className="text-[10px] text-slate-400 font-mono truncate">{user?.email || ""}</span>
            </div>
          </div>

          <Badge variant="primary" size="sm">
            {user?.role || "FREE"}
          </Badge>
        </div>
      </aside>
    </>
  );
}
