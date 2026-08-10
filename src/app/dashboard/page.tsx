"use client";

import React from "react";
import RouteRegistry from "@/routes/RouteRegistry";
import PATHS from "@/routes/paths";

export default function UserDashboardPage() {
  return <RouteRegistry path={PATHS.DASHBOARD} />;
}
