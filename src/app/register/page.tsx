"use client";

import React from "react";
import RouteRegistry from "@/routes/RouteRegistry";
import PATHS from "@/routes/paths";

export default function RegisterPage() {
  return <RouteRegistry path={PATHS.REGISTER} />;
}
