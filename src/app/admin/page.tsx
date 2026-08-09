"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ROADMAP_MILESTONES, MOCK_GOAL_HIERARCHY, COMPETITIVE_MATRIX } from "@/data/mockUserData";
import { RoadmapMilestone, OperatingTask, UserProfile } from "@/types/auth";
import { Crown, ShieldCheck, Activity, Users, DollarSign, Layers, CheckCircle2, Clock, PlayCircle, Plus, Sparkles, Filter, ChevronRight, Lock, Target, TrendingUp, Compass, Award, FileText, CheckSquare, BarChart3 } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CeoAsciiTerminal from "@/components/admin/CeoAsciiTerminal";
import FunnelMachine from "@/components/admin/FunnelMachine";

export default function AdminCommandCenterPage() {
  const { user, allMockUsers, isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "BUSINESS_OS" | "ROADMAP" | "HIERARCHY" | "COMPETITION" | "USERS">("OVERVIEW");
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(ROADMAP_MILESTONES);
  const [tasks, setTasks] = useState<OperatingTask[]>(MOCK_GOAL_HIERARCHY.dailyTasks);
  const [selectedMilestoneCategory, setSelectedMilestoneCategory] = useState<string>("All");

  if (!isSuperAdmin) {
    return (
      <PageContainer>
        <GlassCard className="p-8 border-destructive/40 bg-secondary/50 font-sora text-center flex flex-col items-center gap-4">
          <Lock className="w-12 h-12 text-destructive" />
          <h1 className="text-2xl font-extrabold text-foreground">Access Restricted</h1>
          <p className="text-sm text-muted-foreground max-w-md font-light">
            The Albireo CEO Command Center is restricted to Executive Super Admins. Please use the top Role Switcher toolbar to log in as <strong>Kavin B Albireo (SUPER_ADMIN)</strong>.
          </p>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="font-bold">
              Return to User Cockpit
            </Button>
          </Link>
        </GlassCard>
      </PageContainer>
    );
  }

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t
      )
    );
  };

  const filteredMilestones = selectedMilestoneCategory === "All"
    ? milestones
    : milestones.filter((m) => m.category === selectedMilestoneCategory);

  return (
    <PageContainer>
      {/* 2-COLUMN ADMIN LAYOUT WITH SIDEBAR (POINT 14) */}
      <div className="flex flex-col lg:flex-row gap-8 font-sora">
        {/* LEFT SIDEBAR (POINT 14) */}
        <AdminSidebar
          activeSection={activeTab}
          onSelectSection={(sec) => setActiveTab(sec as any)}
        />

        {/* RIGHT MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-6">
          {/* CEO COMMAND CENTER EXACT ASCII TERMINAL BOX (POINT 25) */}
          <CeoAsciiTerminal />

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("OVERVIEW")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "OVERVIEW"
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              1. Admin Home (Item 11)
            </button>

            <button
              onClick={() => setActiveTab("BUSINESS_OS")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "BUSINESS_OS"
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              2. Business OS (Items 12 & 13)
            </button>

            <button
              onClick={() => setActiveTab("FUNNEL" as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === ("FUNNEL" as any)
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              3. Funnel & Moat (Points 19, 21, 22, 24)
            </button>

            <button
              onClick={() => setActiveTab("ROADMAP")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "ROADMAP"
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              4. 10-Year Roadmap
            </button>

            <button
              onClick={() => setActiveTab("HIERARCHY")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "HIERARCHY"
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              5. 7-Level Cascade Tree
            </button>

            <button
              onClick={() => setActiveTab("USERS")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "USERS"
                  ? "bg-profit text-background shadow-[0_0_15px_rgba(34,230,0,0.4)]"
                  : "bg-hero-bg text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              6. User Database
            </button>
          </div>

      {/* TAB 1: ADMIN HOME (ITEM 11) */}
      {activeTab === "OVERVIEW" && (
        <div className="flex flex-col gap-8 font-sora">
          {/* ITEM 11 ADMIN HOME METRICS BOX */}
          <GlassCard className="p-6 border-border font-mono text-xs flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-sora font-bold text-foreground uppercase tracking-wider">
                ADMIN HOME // ALBIREO COMMAND CENTER (ITEM 11)
              </span>
              <span className="text-profit font-bold">TODAY'S SNAPSHOT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Users Metrics */}
              <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-sora font-bold">USERS METRICS</span>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Total Users:</span><strong className="text-foreground">1,284</strong></div>
                  <div className="flex justify-between"><span>New Users Today:</span><strong className="text-profit">+31</strong></div>
                  <div className="flex justify-between"><span>Active Users:</span><strong className="text-primary">482</strong></div>
                  <div className="flex justify-between"><span>Pro Subscribers:</span><strong className="text-profit font-bold">67</strong></div>
                  <div className="flex justify-between"><span>Course Students:</span><strong className="text-foreground">193</strong></div>
                </div>
              </div>

              {/* Revenue Metrics */}
              <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-sora font-bold">REVENUE METRICS</span>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>MRR:</span><strong className="text-profit text-sm">₹19,800</strong></div>
                  <div className="flex justify-between"><span>This Month Revenue:</span><strong className="text-profit">₹42,300</strong></div>
                  <div className="flex justify-between"><span>ARR Run-Rate:</span><strong className="text-foreground">₹2,37,600</strong></div>
                  <div className="flex justify-between"><span>AUM Target:</span><strong className="text-profit">₹100 Crore</strong></div>
                </div>
              </div>

              {/* Products Count */}
              <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-sora font-bold">PRODUCT PORTFOLIO</span>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Masterclass Courses:</span><strong className="text-foreground">4</strong></div>
                  <div className="flex justify-between"><span>SEO Articles & Guides:</span><strong className="text-foreground">86</strong></div>
                  <div className="flex justify-between"><span>Quantitative Tools:</span><strong className="text-primary">11</strong></div>
                  <div className="flex justify-between"><span>Research Reports:</span><strong className="text-foreground">17</strong></div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 2: BUSINESS OPERATING SYSTEM (ITEMS 12 & 13) */}
      {activeTab === "BUSINESS_OS" && (
        <div className="flex flex-col gap-8 font-sora">
          {/* ITEM 13 CEO DASHBOARD UI */}
          <GlassCard className="p-8 border-profit/40 bg-secondary/80 font-mono text-xs flex flex-col gap-8 shadow-[0_0_30px_rgba(34,230,0,0.15)]">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h2 className="text-xl font-bold text-foreground font-sora uppercase tracking-wide">
                ALBIREO BUSINESS OPERATING SYSTEM (ITEMS 12 & 13)
              </h2>
              <span className="text-profit font-bold">FOUNDER CONTROL TOWER</span>
            </div>

            {/* TODAY'S OBJECTIVE CHECKLIST */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-sora font-bold text-primary uppercase tracking-widest">
                TODAY'S OPERATIONAL OBJECTIVES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskStatus(task.id)}
                    className="p-3 bg-hero-bg border border-border rounded-lg flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className={`w-4 h-4 ${task.status === "DONE" ? "text-profit fill-profit/20" : "text-muted-foreground/30"}`} />
                      <span className={task.status === "DONE" ? "line-through text-muted-foreground/60" : "text-foreground font-semibold"}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-primary uppercase px-2 py-0.5 rounded bg-primary/10 font-bold">
                      {task.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* THIS WEEK PROGRESS BARS (ITEM 13) */}
            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <span className="text-xs font-sora font-bold text-primary uppercase tracking-widest">
                THIS WEEK PROGRESS METERS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-1.5">
                  <div className="flex justify-between font-bold"><span>Growth & Acquisition</span><span className="text-profit">82%</span></div>
                  <div className="text-profit text-sm font-bold tracking-widest">██████████░░ <span className="text-xs text-foreground">82%</span></div>
                </div>

                <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-1.5">
                  <div className="flex justify-between font-bold"><span>Product Development</span><span className="text-primary">65%</span></div>
                  <div className="text-primary text-sm font-bold tracking-widest">███████░░░░ <span className="text-xs text-foreground">65%</span></div>
                </div>

                <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-1.5">
                  <div className="flex justify-between font-bold"><span>Content & Academy</span><span className="text-profit">75%</span></div>
                  <div className="text-profit text-sm font-bold tracking-widest">████████░░░ <span className="text-xs text-foreground">75%</span></div>
                </div>

                <div className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-1.5">
                  <div className="flex justify-between font-bold"><span>Revenue & Monetization</span><span className="text-foreground">40%</span></div>
                  <div className="text-foreground text-sm font-bold tracking-widest">████░░░░░░░ <span className="text-xs text-foreground">40%</span></div>
                </div>
              </div>
            </div>

            {/* CURRENT YEAR NORTH STAR (2026 FOUNDATION) */}
            <div className="p-4 bg-secondary/90 border border-profit/50 rounded-xl flex flex-col gap-2 border-t border-border">
              <span className="text-xs font-sora font-bold text-profit uppercase tracking-widest">
                CURRENT YEAR NORTH STAR (2026 — FOUNDATION)
              </span>
              <div className="flex flex-wrap gap-4 text-xs text-foreground font-semibold">
                <span>✓ 1,000 Registered Users</span>
                <span>✓ 100 Active Learners</span>
                <span>✓ 20 Paying Pro Customers</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 3: 10-YEAR ROADMAP (2026-2036) */}
      {activeTab === "ROADMAP" && (
        <div className="flex flex-col gap-6 font-sora">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">10-Year Company Growth Engine (2026–2036)</h2>
              <p className="text-xs text-muted-foreground font-light">From Free Risk Tools → SaaS Intelligence → Regulated Wealth Management</p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMilestones.map((milestone) => (
              <GlassCard
                key={milestone.id}
                className={`p-6 border-border transition-all ${
                  milestone.status === "IN_PROGRESS"
                    ? "border-profit/60 bg-secondary/80 shadow-[0_0_20px_rgba(34,230,0,0.15)]"
                    : "border-border"
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black font-mono text-profit">{milestone.year}</span>
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">{milestone.phase}</span>
                      <h3 className="text-lg font-bold text-foreground">{milestone.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      milestone.status === "IN_PROGRESS"
                        ? "bg-profit/20 text-profit border border-profit/40"
                        : milestone.status === "COMPLETED"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {milestone.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-light leading-relaxed my-3">
                  {milestone.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Target KPIs</span>
                    <div className="space-y-1">
                      {milestone.kpis.map((kpi, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 rounded bg-hero-bg text-foreground font-mono text-[11px] mr-2 mb-1">
                          ✓ {kpi}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Key Deliverables</span>
                    <div className="space-y-1">
                      {milestone.deliverables.map((del, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 rounded bg-hero-bg text-profit font-mono text-[11px] mr-2 mb-1">
                          ⚙ {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Dependencies</span>
                    <div className="space-y-1">
                      {milestone.dependencies.map((dep, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 rounded bg-hero-bg text-muted-foreground font-mono text-[11px] mr-2 mb-1">
                          ↳ {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GOAL HIERARCHY TREE */}
      {activeTab === "HIERARCHY" && (
        <div className="flex flex-col gap-6 font-sora">
          <div className="border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground">Operational Execution Cascade</h2>
            <p className="text-xs text-muted-foreground font-light">Deconstructing 10-Year Vision into Daily Achievable Tasks</p>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6 border-profit/40 bg-secondary/50">
              <span className="text-xs font-mono font-bold text-profit uppercase tracking-widest block mb-1">LEVEL 1 // 10-YEAR VISION</span>
              <h3 className="text-xl font-bold text-foreground">{MOCK_GOAL_HIERARCHY.vision10Year}</h3>
            </GlassCard>

            <GlassCard className="p-6 border-primary/40 bg-secondary/40">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-1">LEVEL 2 // 5-YEAR STRATEGY</span>
              <h3 className="text-lg font-bold text-foreground">{MOCK_GOAL_HIERARCHY.strategy5Year}</h3>
            </GlassCard>

            <GlassCard className="p-6 border-border">
              <span className="text-xs font-mono font-bold text-foreground uppercase tracking-widest block mb-2">LEVEL 3 // 2026 ANNUAL OBJECTIVES</span>
              <div className="space-y-2 text-xs text-foreground">
                {MOCK_GOAL_HIERARCHY.yearlyObjectives2026.map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-hero-bg rounded border border-border">
                    <Target className="w-4 h-4 text-primary shrink-0" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 5: COMPETITIVE STRATEGY MATRIX */}
      {activeTab === "COMPETITION" && (
        <div className="flex flex-col gap-6 font-sora">
          <div className="border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground">Competitive Positioning & Moat Engine</h2>
            <p className="text-xs text-muted-foreground font-light">How Albireo positions above BabyPips, Myfxbook, Forex Factory & TradingView</p>
          </div>

          <GlassCard className="p-0 overflow-x-auto border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary text-muted-foreground">
                  <th className="p-4 font-bold text-foreground">Market Competitor</th>
                  <th className="p-4 font-bold text-muted-foreground">Their Core Strength</th>
                  <th className="p-4 font-bold text-profit">Albireo Strategic Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPETITIVE_MATRIX.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-bold text-foreground text-sm">{comp.company}</td>
                    <td className="p-4 text-muted-foreground">{comp.strength}</td>
                    <td className="p-4 text-profit font-semibold">{comp.albireoResponse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}

      {/* TAB 6: USER DATABASE */}
      {activeTab === "USERS" && (
        <div className="flex flex-col gap-6 font-sora">
          <div className="border-b border-border pb-4">
            <h2 className="text-2xl font-extrabold text-foreground">User Entitlements & Funnel Level Database</h2>
            <p className="text-xs text-muted-foreground font-light">View active dummy users, funnel levels, subscription tiers, and entitlement keys</p>
          </div>

          <GlassCard className="p-0 overflow-x-auto border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary text-muted-foreground">
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Funnel Level</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Subscription</th>
                  <th className="p-3">Capital INR</th>
                  <th className="p-3">Entitlements Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allMockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-bold text-foreground">{u.name}</td>
                    <td className="p-3 font-mono text-muted-foreground">{u.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-profit/20 text-profit font-mono font-bold text-[10px]">
                        Level {u.progress.funnelLevel}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-profit">{u.subscriptionTier}</td>
                    <td className="p-3 font-mono font-bold text-foreground">
                      ₹{(u.progress.capitalAmountINR || 0).toLocaleString()}
                    </td>
                    <td className="p-3 font-mono font-bold">{u.entitlements.length} Keys</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}

      {/* TAB 7: FUNNEL MACHINE & MOAT EVOLUTION (POINTS 19, 21, 22, 24) */}
      {(activeTab as string) === "FUNNEL" && (
        <FunnelMachine />
      )}
        </div>
      </div>
    </PageContainer>
  );
}
