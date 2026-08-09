"use client";

import React from "react";
import { X, Award, Printer, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  completionDate,
  certificateId
}: CertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sora">
      <div className="relative w-full max-w-3xl bg-hero-bg border-2 border-primary/50 rounded-2xl p-8 sm:p-12 shadow-[0_0_60px_rgba(34,230,0,0.25)] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame Inner Border */}
        <div className="border border-border/80 p-8 sm:p-10 rounded-xl relative bg-secondary/30 flex flex-col items-center text-center gap-6">
          {/* Top Emblem */}
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(34,230,0,0.3)]">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block">
              ALBIREO ACADEMY OFFICIAL CERTIFICATE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight uppercase">
              Certificate of Completion
            </h2>
          </div>

          <p className="text-xs text-muted-foreground font-light max-w-md">
            This certifies that the candidate has successfully completed all coursework, position-sizing drills, and knowledge-check examinations for:
          </p>

          {/* Student Name & Course */}
          <div className="space-y-2 py-2">
            <div className="text-2xl sm:text-3xl font-black text-primary border-b border-primary/40 pb-2 px-8 inline-block">
              {studentName}
            </div>
            <div className="text-sm font-bold text-foreground mt-2">
              {courseTitle}
            </div>
          </div>

          {/* Verification & Date Bar */}
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-6 mt-4 w-full max-w-lg text-xs font-mono">
            <div>
              <span className="text-[10px] text-muted-foreground block uppercase font-sora">Date Issued</span>
              <span className="font-bold text-foreground">{completionDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block uppercase font-sora">Certificate ID</span>
              <span className="font-bold text-primary">{certificateId}</span>
            </div>
          </div>

          {/* Seal Footer */}
          <div className="flex items-center gap-2 text-[11px] text-primary uppercase tracking-wider font-semibold pt-2">
            <ShieldCheck className="w-4 h-4" /> Cryptographically Verified by Albireo Systems
          </div>
        </div>

        {/* Print Action Bar */}
        <div className="flex justify-end gap-3 pt-6 print:hidden">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint} className="flex items-center gap-1.5 font-bold">
            <Printer className="w-4 h-4" /> Print / Save Certificate PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
