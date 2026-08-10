"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import LandingHero from "@/components/landing/LandingHero";
import LearnPreview from "@/components/landing/LearnPreview";
import SimulatorPreview from "@/components/landing/SimulatorPreview";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingStory from "@/components/landing/LandingStory";

/**
 * Enterprise Main Landing Page Module Component
 * Structured Flow:
 * 1. LandingHero — Brand title, institutional sub-headline & Explore CTA
 * 2. LearnPreview — Free trading courses module preview (Beginner, Intermediate, Pro)
 * 3. SimulatorPreview — Quantitative risk engine with non-editable $5,000 balance survival simulator
 * 4. LandingFeatures — Core architecture features including free trading courses & tools
 * 5. LandingStory — The Albireo origin story & evolution phases
 */
export default function LandingPage() {
  return (
    <PageContainer>
      <div className="flex flex-col w-full overflow-hidden bg-hero-bg text-foreground font-sora space-y-12">
        {/* 1. Hero Section */}
        <LandingHero />

        {/* 2. Learn Pages Module Short Preview */}
        <LearnPreview />

        {/* 3. Quantitative Risk Engine ($5,000 Fixed Base Account Survival Simulator) */}
        <SimulatorPreview />

        {/* 4. Core Architecture Features */}
        <LandingFeatures />

        {/* 5. Our Story */}
        <LandingStory />
      </div>
    </PageContainer>
  );
}
