"use client";

import React from "react";
import RouteRegistry from "@/routes/RouteRegistry";
import PATHS from "@/routes/paths";

export default function LoginPage() {
  return <RouteRegistry path={PATHS.LOGIN} />;
}
