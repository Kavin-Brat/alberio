"use client";

import React from "react";
import RouteRegistry from "@/routes/RouteRegistry";
import PATHS from "@/routes/paths";

export default function AdminUsersPage() {
  return <RouteRegistry path={PATHS.ADMIN.USERS} />;
}
