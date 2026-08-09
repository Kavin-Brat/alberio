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
  ShieldCheck, 
  LogOut, 
  Crown, 
  ChevronRight, 
  Menu, 
  X,
  Layers,
  Compass
} from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, allowedMenus, logout } = useAuth();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const isActive = (path: string) => pathname === path;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard": return LayoutDashboard;
      case "GraduationCap": return GraduationCap;
      case "Wrench": return Wrench;
      case "FileText": return FileText;
      case "Sparkles": return Sparkles;
      case "Compass": return Compass;
      case "Cpu": return Cpu;
      case "Building2": return Building2;
      case "Layers": return Layers;
      case "Crown": return Crown;
      case "Users": return Users;
      case "ShieldCheck": return ShieldCheck;
      default: return LayoutDashboard;
    }
  };

  const defaultNavItems = [
    { label: "Personal Cockpit", href: "/dashboard", iconName: "LayoutDashboard" },
    { label: "Academy Catalog", href: "/academy", iconName: "GraduationCap" },
    { label: "Quantitative Tools", href: "/tools", iconName: "Wrench" },
    { label: "Trade Journal", href: "/journal", iconName: "FileText" },
    { label: "Albireo Pro SaaS", href: "/pricing", iconName: "Sparkles" },
    { label: "Group Ecosystem Hub", href: "/group", iconName: "Layers" },
  ];

  const menuList = allowedMenus && allowedMenus.length > 0 ? allowedMenus : defaultNavItems;

  const generalItems = menuList.filter((m: any) => !m.category || m.category === "GENERAL" || m.category === "PRO");
  const adminItems = menuList.filter((m: any) => m.category === "ADMIN");

  return (
    <>
      {/* Mobile Drawer Toggle Button */}
      <button
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full bg-[#00FF00] text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.5)] flex items-center justify-center cursor-pointer"
      >
        {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

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
        <div className="flex flex-col gap-6 overflow-y-auto">
          {/* Logo Header */}
          <Link href="/" className="flex items-center gap-2 px-2 pt-2">
            <div className="w-8 h-8 rounded-lg bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00]">
              <Sparkles className="w-5 h-5 text-[#00FF00] animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base block">ALBIREO</span>
              <span className="text-[9px] text-[#00FF00] font-mono font-bold tracking-widest block uppercase">
                {user?.role || "AUTHENTICATED"}
              </span>
            </div>
          </Link>

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
                  className={`p-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                    active
                      ? "bg-[#00FF00] text-black font-bold shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </div>

          {/* Admin Command Center (Only if returned in allowedMenus or Admin) */}
          {adminItems.length > 0 && (
            <div className="space-y-1 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold text-[#00FF00] uppercase tracking-widest px-2 block mb-2 font-mono">
                Executive Command Center
              </span>
              {adminItems.map((item) => {
                const IconComp = getIcon(item.iconName);
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpenMobile(false)}
                    className={`p-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                      active
                        ? "bg-[#00FF00] text-black font-bold shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                        : "text-[#00FF00]/80 hover:text-[#00FF00] hover:bg-[#00FF00]/10 border border-[#00FF00]/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className="w-4 h-4 text-[#00FF00]" />
                      <span>{item.label}</span>
                    </div>
                    {active && <ChevronRight className="w-3.5 h-3.5 text-black" />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* User Footer Profile Pill & Sign Out */}
        <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">{user.name}</span>
              <span className="text-[10px] text-slate-400 font-mono truncate">{user.email}</span>
            </div>
            <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30 shrink-0">
              {user.role}
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full p-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
