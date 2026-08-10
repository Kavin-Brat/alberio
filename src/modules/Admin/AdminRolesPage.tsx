"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleHeader from "@/components/modules/RoleManagement/RoleHeader";
import RoleCard from "@/components/modules/RoleManagement/RoleCard";

/**
 * Parent Page Component: Admin Roles & Entitlement Matrix Page
 * Composes RoleManagement child components: RoleHeader, RoleCard
 */
export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roles");
      const data = await res.json();
      if (data.success && data.data?.roles) {
        setRoles(data.data.roles);
      }
    } catch (e) {
      console.error("Failed to fetch roles:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRoleClick = () => {
    alert("Role creation modal trigger.");
  };

  return (
    <ProtectedRoute requiredRole="SUPER_ADMIN">
      <PageContainer>
        <div className="space-y-6 font-sora">
          {/* Child Component 1: Role Header */}
          <RoleHeader onRefresh={fetchRoles} onCreateRole={handleCreateRoleClick} />

          {/* Child Component 2: Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((r) => (
              <RoleCard key={r.id} role={r} />
            ))}
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
