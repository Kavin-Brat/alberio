"use client";

import React from "react";
import RouteRegistry from "@/routes/RouteRegistry";
import PATHS from "@/routes/paths";

export default function AdminRolesPage() {
  return <RouteRegistry path={PATHS.ADMIN.ROLES} />;
}
