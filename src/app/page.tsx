import React from "react";
import LandingPage from "@/modules/Landing/LandingPage";

export const metadata = {
  title: "Albireo — Institutional Trading Intelligence & Prop Firm Analytics",
  description:
    "Enterprise trading intelligence, free trading courses, quantitative drawdown surveillance, and real-time ECN terminal execution.",
};

/**
 * App Router Home / Landing Entry Point (/)
 * Delegates page rendering cleanly to LandingPage module.
 */
export default function Home() {
  return <LandingPage />;
}
