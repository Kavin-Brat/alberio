"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import SimulatorPreview from "@/components/landing/SimulatorPreview";
import LandingStory from "@/components/landing/LandingStory";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col w-full overflow-hidden bg-hero-bg text-foreground font-sora space-y-8">
        <LandingHero />
        <SimulatorPreview />
        <LandingFeatures />
        <LandingStory />
      </div>
    </PageContainer>
  );
}
