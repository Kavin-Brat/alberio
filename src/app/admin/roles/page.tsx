"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Plus, Edit2, Trash2, Check, X, Lock, Key, Users, RefreshCw, Layers } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface PermissionKey {
  key: string;
  name: string;
  category: string;
  description: string;
}

interface RoleDefinition {
  id: string;
  roleKey: string;
  displayName: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  userCount: number;
}

export default function RoleManagementPage() {
  const { isSuperAdmin } = useAuth();
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [availablePermissions, setAvailablePermissions] = useState<PermissionKey[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);

  // New Role Form state
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newRoleKey, setNewRoleKey] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data.roles || []);
      setAvailablePermissions(data.availablePermissions || []);
    } catch (e) {
      console.error("Failed to fetch roles", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleTogglePermission = (key: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: newDisplayName,
          roleKey: newRoleKey,
          description: newDescription,
          permissions: selectedPermissions
        })
      });

      if (res.ok) {
        setIsCreateModalOpen(false);
        setNewDisplayName("");
        setNewRoleKey("");
        setNewDescription("");
        setSelectedPermissions([]);
        fetchRoles();
      }
    } catch (e) {
      console.error("Failed to create role", e);
    }
  };

  const handleSaveRoleEdit = async () => {
    if (!editingRole) return;

    try {
      await fetch(`/api/roles/${editingRole.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: editingRole.displayName,
          description: editingRole.description,
          permissions: editingRole.permissions
        })
      });

      setEditingRole(null);
      fetchRoles();
    } catch (e) {
      console.error("Failed to update role", e);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm("Are you sure you want to delete this custom role?")) return;

    try {
      const res = await fetch(`/api/roles/${roleId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Cannot delete system role");
        return;
      }
      fetchRoles();
    } catch (e) {
      console.error("Failed to delete role", e);
    }
  };

  if (!isSuperAdmin) {
    return (
      <PageContainer>
        <GlassCard className="p-8 border-destructive/40 bg-secondary/50 font-sora text-center flex flex-col items-center gap-4">
          <Lock className="w-12 h-12 text-destructive" />
          <h1 className="text-2xl font-extrabold text-foreground">Access Restricted</h1>
          <p className="text-sm text-muted-foreground max-w-md font-light">
            Role Management is restricted to Admin Super Admins. Log in as CEO Kavin to manage roles.
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
        {/* LEFT SIDEBAR */}
        <AdminSidebar activeSection="SETTINGS_ROLES" onSelectSection={() => {}} />

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 flex flex-col gap-6">
          {/* HEADER BANNER */}
          <GlassCard className="p-6 border-primary/40 bg-secondary/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Role & Permission CRUD Manager
              </span>
              <h1 className="text-2xl font-extrabold text-foreground">
                Platform Roles & Entitlement Permissions
              </h1>
              <p className="text-xs text-muted-foreground font-light mt-0.5">
                Create new roles, edit permission matrices, or assign role entitlements to users.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.3)]"
            >
              <Plus className="w-4 h-4" /> Create New Role
            </Button>
          </GlassCard>

          {/* ROLES LIST TABLE */}
          <GlassCard className="p-0 overflow-x-auto border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary text-muted-foreground font-bold">
                  <th className="p-4">Role Key & Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Permissions Granted</th>
                  <th className="p-4">Assigned Users</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                {roles.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-sora">
                      <span className="font-bold text-foreground block text-sm">{r.displayName}</span>
                      <span className="text-[10px] font-mono text-primary font-bold">{r.roleKey}</span>
                    </td>
                    <td className="p-4 text-muted-foreground font-sora font-light max-w-xs">{r.description}</td>
                    <td className="p-4">
                      {r.isSystem ? (
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">
                          System Role
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-profit/20 text-profit text-[10px] font-bold uppercase">
                          Custom Role
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-foreground">{r.permissions.length} Permissions</td>
                    <td className="p-4 font-bold text-profit">{r.userCount} Users</td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingRole(r)}
                        className="font-bold text-[10px]"
                      >
                        Edit Permissions
                      </Button>

                      {!r.isSystem && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteRole(r.id)}
                          className="text-destructive border-destructive/40 font-bold text-[10px]"
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </div>

      {/* CREATE NEW ROLE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sora">
          <div className="relative w-full max-w-2xl bg-hero-bg border border-primary/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,230,0,0.2)]">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-1">Create Custom Platform Role</h2>
            <p className="text-xs text-muted-foreground mb-6 font-light">
              Configure display name, role key, and toggle exact permission entitlements.
            </p>

            <form onSubmit={handleCreateRole} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">Role Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Hedge Fund Analyst"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground block mb-1 font-semibold">Role Key Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FUND_ANALYST"
                    value={newRoleKey}
                    onChange={(e) => setNewRoleKey(e.target.value)}
                    className="w-full bg-secondary border border-border rounded p-2.5 font-mono text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Description</label>
                <input
                  type="text"
                  placeholder="Operational role scope description..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              {/* Permission Checkbox Grid */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Select Permission Entitlements ({selectedPermissions.length} selected)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-3 bg-secondary/50 border border-border rounded-xl">
                  {availablePermissions.map((p) => {
                    const isChecked = selectedPermissions.includes(p.key);
                    return (
                      <div
                        key={p.key}
                        onClick={() => handleTogglePermission(p.key)}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                          isChecked
                            ? "bg-primary/20 border-primary text-foreground font-bold"
                            : "bg-hero-bg border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 accent-primary"
                        />
                        <div>
                          <span className="block font-bold text-foreground text-[11px]">{p.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{p.key}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="font-bold uppercase tracking-wider">
                  Create Role Definition
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ROLE PERMISSIONS MODAL */}
      {editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sora">
          <div className="relative w-full max-w-2xl bg-hero-bg border border-primary/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,230,0,0.2)]">
            <button
              onClick={() => setEditingRole(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground">Edit Role Permissions — {editingRole.displayName}</h2>
            <span className="text-xs font-mono text-primary font-bold block mb-4">{editingRole.roleKey}</span>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Display Name</label>
                <input
                  type="text"
                  value={editingRole.displayName}
                  onChange={(e) => setEditingRole({ ...editingRole, displayName: e.target.value })}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary"
                />
              </div>

              <div>
                <label className="text-muted-foreground block mb-1 font-semibold">Description</label>
                <input
                  type="text"
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                  className="w-full bg-secondary border border-border rounded p-2.5 text-foreground focus:border-primary"
                />
              </div>
            </div>

            {/* Permission Checkbox Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                Role Permissions ({editingRole.permissions.length} active)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-3 bg-secondary/50 border border-border rounded-xl">
                {availablePermissions.map((p) => {
                  const isChecked = editingRole.permissions.includes(p.key);
                  return (
                    <div
                      key={p.key}
                      onClick={() => {
                        const newPerms = isChecked
                          ? editingRole.permissions.filter((k) => k !== p.key)
                          : [...editingRole.permissions, p.key];
                        setEditingRole({ ...editingRole, permissions: newPerms });
                      }}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                        isChecked
                          ? "bg-primary/20 border-primary text-foreground font-bold"
                          : "bg-hero-bg border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="block font-bold text-foreground text-[11px]">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{p.key}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveRoleEdit} className="font-bold uppercase tracking-wider">
                Save Permission Matrix
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
