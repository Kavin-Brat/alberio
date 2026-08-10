"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UserHeader from "@/components/modules/UserManagement/UserHeader";
import UserTable from "@/components/modules/UserManagement/UserTable";

/**
 * Parent Page Component: Admin Users Directory Page
 * Composes UserManagement child components: UserHeader, UserTable
 */
export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (roleFilter) queryParams.append("role", roleFilter);

      const res = await fetch(`/api/users?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && data.data?.users) {
        setUsers(data.data.users);
      }
    } catch (e) {
      console.error("Failed to fetch users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`User account status updated.`);
        fetchUsers();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (e) {
      console.error("Failed to update user status:", e);
    }
  };

  return (
    <ProtectedRoute requiredRole="SUPER_ADMIN">
      <PageContainer>
        <div className="space-y-6 font-sora">
          {/* Child Component 1: User Header */}
          <UserHeader onRefresh={fetchUsers} />

          {/* Child Component 2: User Table */}
          <UserTable users={users} onToggleStatus={handleToggleUserStatus} />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
