"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Users, Search, Filter, ShieldCheck, Crown, Sparkles, Check, X, Lock, Key, RefreshCw, Trash2, UserCheck, UserX, ExternalLink } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  subscriptionTier: string;
  funnelLevel: number;
  isActive: boolean;
  riskProfile: string;
  createdAt: string;
  lastLoginAt: string;
  entitlementsCount: number;
  entitlements: string[];
  capitalAmountINR: number;
}

export default function AdminUserManagementPage() {
  const { isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const url = `/api/users?search=${encodeURIComponent(search)}&role=${roleFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const handleToggleUserActive = async (userId: string, currentActive: boolean) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive })
      });
      fetchUsers();
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    let newTier = "Free Visitor";
    if (newRole === "PRO") newTier = "Albireo Pro Annual";
    if (newRole === "COURSE_BASIC") newTier = "Basic Student Tier";
    if (newRole === "SUPER_ADMIN") newTier = "Super Admin Enterprise";

    try {
      await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole, subscriptionTier: newTier })
      });
      fetchUsers();
    } catch (e) {
      console.error("Failed to update role", e);
    }
  };

  const handleDeleteAccount = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user account?")) return;
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      setSelectedUser(null);
      fetchUsers();
    } catch (e) {
      console.error("Failed to delete account", e);
    }
  };

  if (!isSuperAdmin) {
    return (
      <PageContainer>
        <GlassCard className="p-8 border-destructive/40 bg-secondary/50 font-sora text-center flex flex-col items-center gap-4">
          <Lock className="w-12 h-12 text-destructive" />
          <h1 className="text-2xl font-extrabold text-foreground">Access Restricted</h1>
          <p className="text-sm text-muted-foreground max-w-md font-light">
            User Management is restricted to Admin Super Admins. Log in as CEO Kavin to manage user accounts.
          </p>
          <Link href="/login">
            <Button variant="primary" size="sm" className="font-bold">
              Log In as Admin
            </Button>
          </Link>
        </GlassCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row gap-8 font-sora">
        {/* LEFT SIDEBAR (POINT 14) */}
        <AdminSidebar activeSection="USERS" onSelectSection={() => {}} />

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 flex flex-col gap-6">
          {/* HEADER BANNER */}
          <GlassCard className="p-6 border-profit/40 bg-secondary/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-profit/20 text-profit text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit mb-1">
                <Users className="w-3.5 h-3.5 text-profit" /> Admin User Management Desk
              </span>
              <h1 className="text-2xl font-extrabold text-foreground">
                All Signed-Up Users & Role Management
              </h1>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                List, search, audit entitlement keys, edit user roles, or suspend account access.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              className="font-bold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-primary" : ""}`} /> Refresh Users
            </Button>
          </GlassCard>

          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-xs font-sora">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-hero-bg border border-border rounded pl-9 p-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-hero-bg border border-border rounded p-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              >
                <option value="ALL">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="PRO">Pro Trader</option>
                <option value="COURSE_BASIC">Course Student</option>
                <option value="FREE">Free Visitor</option>
              </select>
            </div>
          </div>

          {/* USERS TABLE */}
          <GlassCard className="p-0 overflow-x-auto border-border">
            <table className="w-full text-left text-xs border-collapse font-sora">
              <thead>
                <tr className="border-b border-border bg-secondary text-muted-foreground font-bold">
                  <th className="p-3">User Name & Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Funnel Level</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Capital INR</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-foreground block">{u.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{u.email}</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                        className="bg-hero-bg border border-border rounded p-1 text-[11px] font-mono font-bold text-primary"
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="PRO">PRO</option>
                        <option value="COURSE_BASIC">COURSE_BASIC</option>
                        <option value="FREE">FREE</option>
                      </select>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="px-2 py-0.5 rounded bg-profit/20 text-profit font-bold text-[10px]">
                        Level {u.funnelLevel} / 6
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleUserActive(u.id, u.isActive)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                          u.isActive
                            ? "bg-profit/20 text-profit border border-profit/30"
                            : "bg-destructive/20 text-destructive border border-destructive/30"
                        }`}
                      >
                        {u.isActive ? "ACTIVE ●" : "SUSPENDED ✕"}
                      </button>
                    </td>
                    <td className="p-3 font-mono font-bold text-foreground">
                      ₹{(u.capitalAmountINR || 0).toLocaleString()}
                    </td>
                    <td className="p-3 text-[11px] text-muted-foreground font-mono">
                      {new Date(u.lastLoginAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedUser(u)}
                        className="font-bold text-[10px]"
                      >
                        Inspect User
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </div>

      {/* USER DETAIL INSPECTOR MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sora">
          <div className="relative w-full max-w-lg bg-hero-bg border border-primary/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,230,0,0.2)]">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground">{selectedUser.name}</h2>
            <span className="text-xs font-mono text-primary block mb-4">{selectedUser.email}</span>

            <div className="space-y-3 text-xs bg-secondary/50 p-4 rounded-xl border border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-foreground font-bold">{selectedUser.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned Role:</span>
                <span className="font-mono text-profit font-bold">{selectedUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subscription Tier:</span>
                <span className="font-bold text-foreground">{selectedUser.subscriptionTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portfolio Capital:</span>
                <span className="font-mono text-profit font-bold">₹{(selectedUser.capitalAmountINR || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* Entitlements Checklist */}
            <div className="mt-4 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">
                Granted Entitlement Keys ({selectedUser.entitlements.length})
              </span>
              <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-2 bg-hero-bg rounded border border-border text-[10px] font-mono">
                {selectedUser.entitlements.map((key, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    ✓ {key}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 mt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteAccount(selectedUser.id)}
                className="text-destructive border-destructive/40 font-bold text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete User
              </Button>

              <Button variant="secondary" size="sm" onClick={() => setSelectedUser(null)}>
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
