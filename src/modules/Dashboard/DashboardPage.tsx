"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ACADEMY_COURSES } from "@/data/academyData";
import { Sparkles } from "lucide-react";
import CertificateModal from "@/components/academy/CertificateModal";
import CreateAccountModal from "@/components/auth/CreateAccountModal";
import AIResearchModal from "@/components/research/AIResearchModal";
import CourseProgressWidget from "@/components/academy/CourseProgressWidget";
import SubscriptionStatusWidget from "@/components/dashboard/SubscriptionStatusWidget";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UserWelcomeBanner from "@/components/modules/Dashboard/UserWelcomeBanner";
import FunnelRankCard from "@/components/modules/Dashboard/FunnelRankCard";

/**
 * Parent Page Component: Dashboard Cockpit Page
 * Composes Dashboard child components: UserWelcomeBanner, SubscriptionStatusWidget, CourseProgressWidget, FunnelRankCard
 */
export default function DashboardPage() {
  const { user } = useAuth();
  
  // Modals state
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isAIResearchOpen, setIsAIResearchOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string>("EUR/USD");

  const activeCourse = ACADEMY_COURSES.find(
    (c) => c.slug === (user.progress.enrolledCourseSlug || "forex-basics-free")
  ) || ACADEMY_COURSES[0];

  return (
    <ProtectedRoute>
      <PageContainer>
        {/* LEVEL 2 CONVERSION BANNER (IF VISITOR) */}
        {user.progress.funnelLevel <= 1 && (
          <GlassCard className="p-6 border-[#00FF00]/50 bg-[#0b0b0b] font-sora flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_30px_rgba(34,230,0,0.15)]">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-[#00FF00]/20 text-[#00FF00] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit mb-1">
                <Sparkles className="w-3 h-3" /> Level 2 Conversion
              </span>
              <h3 className="text-base font-bold text-white">
                Want to save your course progress, quiz scores & trade journal?
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Create your free Level 2 Albireo Account to sync saved market watchlists and download certificates.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateAccountOpen(true)}
              className="shrink-0 font-bold uppercase tracking-wider"
            >
              Create Free Account
            </Button>
          </GlassCard>
        )}

        {/* Child Component 1: User Welcome Banner */}
        <UserWelcomeBanner user={user} />

        {/* Child Component 2: Subscription Status Widget */}
        <SubscriptionStatusWidget />

        {/* COURSE PROGRESS & FUNNEL LEVEL METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sora">
          {/* Child Component 3: Course Progress Widget */}
          <div className="lg:col-span-2">
            <CourseProgressWidget />
          </div>

          {/* Child Component 4: Funnel Rank Card */}
          <FunnelRankCard currentLevel={user.progress.funnelLevel} />
        </div>

        {/* MODALS */}
        <CertificateModal
          isOpen={isCertificateModalOpen}
          onClose={() => setIsCertificateModalOpen(false)}
          studentName={user.name}
          courseTitle={activeCourse.title}
          completionDate={new Date().toLocaleDateString()}
          certificateId={`CERT-${user.id.toUpperCase()}-2026`}
        />

        <CreateAccountModal
          isOpen={isCreateAccountOpen}
          onClose={() => setIsCreateAccountOpen(false)}
        />

        <AIResearchModal
          isOpen={isAIResearchOpen}
          onClose={() => setIsAIResearchOpen(false)}
          assetSymbol={selectedAsset}
        />
      </PageContainer>
    </ProtectedRoute>
  );
}
