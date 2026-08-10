"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ROADMAP_MILESTONES, MOCK_GOAL_HIERARCHY, COMPETITIVE_MATRIX } from "@/data/mockUserData";
import { RoadmapMilestone, OperatingTask, UserProfile } from "@/types/auth";
import { Users, DollarSign, Activity, Crown, TrendingUp } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

import CeoAsciiTerminal from "@/components/admin/CeoAsciiTerminal";
import FunnelMachine from "@/components/admin/FunnelMachine";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

/**
 * Dedicated Admin Module - CEO Command Center Page Component
 * Inspired by devportal_frontend_2.0 & topsweb page architecture
 */
export default function AdminDashboardPage() {
  const { user, allMockUsers, isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "BUSINESS_OS" | "ROADMAP" | "HIERARCHY" | "COMPETITION" | "USERS">("OVERVIEW");
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(ROADMAP_MILESTONES);
  const [tasks, setTasks] = useState<OperatingTask[]>(MOCK_GOAL_HIERARCHY.dailyTasks);
  const [selectedMilestoneCategory, setSelectedMilestoneCategory] = useState<string>("All");

  const toggleMilestoneStatus = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus: "PLANNED" | "IN_PROGRESS" | "COMPLETED" =
            m.status === "PLANNED" ? "IN_PROGRESS" : m.status === "IN_PROGRESS" ? "COMPLETED" : "PLANNED";
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t))
    );
  };

  const filteredMilestones = selectedMilestoneCategory === "All"
    ? milestones
    : milestones.filter((m) => m.category === selectedMilestoneCategory);

  return (
    <ProtectedRoute requiredRole="SUPER_ADMIN">
      <PageContainer>
        {/* 2-COLUMN ADMIN LAYOUT WITH SIDEBAR (POINT 14) */}
        <div className="flex flex-col lg:flex-row gap-8 font-sora">
          {/* LEFT SIDEBAR (POINT 14) */}
          <AdminSidebar activeSection={activeTab} onSelectSection={(section: any) => setActiveTab(section)} />

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-8 min-w-0">
            {/* CEO TERMINAL & HEADER (POINT 15) */}
            <CeoAsciiTerminal />

            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === "OVERVIEW" && (
              <div className="space-y-6 animate-fade-in">
                {/* 4 CORE KPI STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <GlassCard className="p-5 border-[#22e600]/30 bg-black/60 flex flex-col gap-2 shadow-[0_0_20px_rgba(34,230,0,0.1)]">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Total Active Users</span>
                      <Users className="w-4 h-4 text-[#22e600]" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">{allMockUsers.length} Users</div>
                    <div className="text-[10px] text-[#22e600] font-mono flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +14.2% month-over-month
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 border-emerald-500/30 bg-black/60 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Monthly Recurring Rev</span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">$42,850</div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Annual Run Rate: $514.2K
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 border-purple-500/30 bg-black/60 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Evaluation Candidates</span>
                      <Activity className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">3,420</div>
                    <div className="text-[10px] text-purple-400 font-mono">Level 5 Prop Candidates</div>
                  </GlassCard>

                  <GlassCard className="p-5 border-amber-500/30 bg-black/60 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Capital Managed</span>
                      <Crown className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">$12.4M</div>
                    <div className="text-[10px] text-amber-400 font-mono">Level 6 Institutional Funds</div>
                  </GlassCard>
                </div>
              </div>
            )}

            {/* TAB 7: FUNNEL MACHINE */}
            {(activeTab as string) === "FUNNEL" && (
              <FunnelMachine />
            )}
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
