"use client";

import React, { useState } from "react";
import { LayoutDashboard, TrendingUp, Users, GraduationCap, FileText, Wrench, DollarSign, BarChart3, Settings, ShieldCheck, ChevronDown, ChevronRight, Layers, Award, Sparkles, Database } from "lucide-react";
import Link from "next/link";

interface SidebarGroup {
  title: string;
  icon: any;
  items: { label: string; href: string; badge?: string }[];
}

interface AdminSidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export default function AdminSidebar({ activeSection, onSelectSection }: AdminSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const SIDEBAR_GROUPS: SidebarGroup[] = [
    {
      title: "OVERVIEW",
      icon: LayoutDashboard,
      items: [
        { label: "CEO Control Tower", href: "OVERVIEW" },
        { label: "Business OS (v1)", href: "BUSINESS_OS", badge: "v1.0" }
      ]
    },
    {
      title: "BUSINESS",
      icon: TrendingUp,
      items: [
        { label: "10-Year Roadmap", href: "ROADMAP" },
        { label: "7-Level Cascade", href: "HIERARCHY" },
        { label: "Competitive Matrix", href: "COMPETITION" },
        { label: "Moat Evolution", href: "MOAT" }
      ]
    },
    {
      title: "USERS",
      icon: Users,
      items: [
        { label: "All Users Database", href: "USERS" },
        { label: "Free Level 1 Users", href: "USERS_FREE" },
        { label: "Academy Students", href: "USERS_STUDENTS" },
        { label: "Pro Subscribers", href: "USERS_PRO" }
      ]
    },
    {
      title: "ACADEMY",
      icon: GraduationCap,
      items: [
        { label: "Courses Catalog", href: "ACADEMY_COURSES" },
        { label: "Modules & Lessons", href: "ACADEMY_LESSONS" },
        { label: "Quizzes & Scores", href: "ACADEMY_QUIZZES" },
        { label: "Certificates", href: "ACADEMY_CERTS" }
      ]
    },
    {
      title: "PRODUCT",
      icon: Wrench,
      items: [
        { label: "Tools Suite", href: "PRODUCT_TOOLS" },
        { label: "Monte Carlo Engine", href: "PRODUCT_MC" },
        { label: "Prop Guardian", href: "PRODUCT_GUARDIAN" },
        { label: "AI Research", href: "PRODUCT_AI" }
      ]
    },
    {
      title: "MONETIZATION",
      icon: DollarSign,
      items: [
        { label: "Pricing Plans", href: "MONETIZATION_PLANS" },
        { label: "Subscriptions", href: "MONETIZATION_SUBS" },
        { label: "Affiliates Engine", href: "MONETIZATION_AFFILIATES" }
      ]
    },
    {
      title: "ANALYTICS",
      icon: BarChart3,
      items: [
        { label: "KPI Suite", href: "ANALYTICS_KPIS" },
        { label: "Funnel Machine", href: "ANALYTICS_FUNNEL" },
        { label: "AUM Telemetry", href: "ANALYTICS_AUM" }
      ]
    },
    {
      title: "SETTINGS",
      icon: Settings,
      items: [
        { label: "Roles & Permissions", href: "SETTINGS_ROLES" },
        { label: "Entitlements Engine", href: "SETTINGS_ENTITLEMENTS" }
      ]
    }
  ];

  return (
    <aside className="w-full lg:w-64 bg-secondary/80 border border-border rounded-xl p-4 font-sora flex flex-col gap-4 text-xs shrink-0">
      <div className="flex items-center gap-2 border-b border-border pb-3 px-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <span className="font-extrabold text-foreground tracking-wider uppercase text-xs">
          ALBIREO ADMIN OS
        </span>
      </div>

      <div className="space-y-3">
        {SIDEBAR_GROUPS.map((group) => {
          const IconComp = group.icon;
          const isCollapsed = collapsedGroups[group.title];

          return (
            <div key={group.title} className="flex flex-col gap-1">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between p-2 rounded hover:bg-hero-bg text-muted-foreground hover:text-foreground font-bold uppercase tracking-wider text-[10px] transition-colors w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <IconComp className="w-3.5 h-3.5 text-primary" />
                  <span>{group.title}</span>
                </div>
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {!isCollapsed && (
                <div className="pl-6 space-y-1">
                  {group.items.map((item) => {
                    const isSelected = activeSection === item.href;
                    let targetUrl = null;
                    if (item.href.startsWith("USERS")) targetUrl = "/admin/users";
                    if (item.href === "SETTINGS_ROLES") targetUrl = "/admin/roles";

                    const buttonContent = (
                      <div className={`w-full text-left p-1.5 rounded text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-primary/20 text-primary font-bold border border-primary/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-hero-bg/50"
                      }`}>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded bg-profit/20 text-profit text-[9px] font-mono font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );

                    if (targetUrl) {
                      return (
                        <Link key={item.href} href={targetUrl} className="block">
                          {buttonContent}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.href}
                        onClick={() => onSelectSection(item.href)}
                        className="w-full text-left"
                      >
                        {buttonContent}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
