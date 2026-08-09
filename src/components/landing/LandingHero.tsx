"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { LANDING_HERO_CONTENT } from "@/constants/landingContent";

/**
 * Reusable Landing Hero Component
 */
export default function LandingHero() {
  const scrollToSimulator = () => {
    const element = document.getElementById("simulator-desk");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center font-sora py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col items-start gap-6 max-w-3xl">
        {/* Brand Logo Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase flex items-baseline gap-1">
          {LANDING_HERO_CONTENT.title}<span className="w-3.5 h-3.5 sm:w-5 sm:h-5 bg-[#00FF00] inline-block rounded-xs"></span>
        </h1>

        {/* Sub-Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-100 leading-tight">
          {LANDING_HERO_CONTENT.subHeadline}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl">
          {LANDING_HERO_CONTENT.description}
        </p>

        {/* Explore Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToSimulator}
            className="font-bold uppercase tracking-wider bg-[#00FF00] text-black hover:bg-[#00FF00]/90 px-8 py-3.5 rounded-xs text-xs cursor-pointer shadow-[0_0_20px_rgba(0,255,0,0.3)]"
          >
            {LANDING_HERO_CONTENT.exploreButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
