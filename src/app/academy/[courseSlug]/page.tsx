import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Check, PlayCircle, Lock, BookOpen, ShieldCheck, Download, Award } from "lucide-react";
import { ACADEMY_COURSES } from "@/data/academyData";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface CoursePageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateStaticParams() {
  return ACADEMY_COURSES.map((course) => ({
    courseSlug: course.slug,
  }));
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = ACADEMY_COURSES.find((c) => c.slug === courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <PageContainer>
      {/* Back Link */}
      <Link
        href="/academy"
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Academy Catalog
      </Link>

      {/* Course Hero Banner */}
      <GlassCard className="border-primary/40 bg-secondary/50 p-8 font-sora">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/40 text-xs font-bold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-profit fill-profit" /> {course.rating} Rating ({course.studentCount} enrolled)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-foreground font-medium border-t border-border pt-4 mt-2">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {course.durationHours} Hours Total Video</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-primary" /> {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Practical Lessons</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-profit" /> Certificate of Completion</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-hero-bg border border-border rounded-xl p-6 flex flex-col gap-5 items-center text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Enrollment Fee</div>
            <div>
              <span className="text-4xl font-black text-foreground">₹{course.priceINR.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground/60 line-through ml-2">₹{course.originalPriceINR.toLocaleString()}</span>
            </div>

            <Link href="/pricing" className="w-full">
              <Button variant="primary" className="w-full font-bold shadow-[0_0_20px_rgba(34,230,0,0.3)]">
                Enroll Now & Unlock Course
              </Button>
            </Link>

            <span className="text-[11px] text-muted-foreground font-light">30-day risk-free money-back guarantee</span>
          </div>
        </div>
      </GlassCard>

      {/* Curriculum & Syllabus Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora mt-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-foreground border-b border-border pb-3 uppercase tracking-wider">
            Course Curriculum & Syllabus
          </h2>

          <div className="flex flex-col gap-4">
            {course.modules.map((mod, idx) => (
              <GlassCard key={mod.id} className="p-6 border-border flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground font-light mt-1">{mod.description}</p>
                  </div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded">
                    Module 0{idx + 1}
                  </span>
                </div>

                <div className="divide-y divide-border border-t border-border pt-3">
                  {mod.lessons.map((lesson) => (
                    <div key={lesson.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {lesson.isFreePreview ? (
                          <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <div>
                          <span className="font-semibold text-foreground">{lesson.title}</span>
                          <span className="text-[11px] text-muted-foreground block font-light">{lesson.summary}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {lesson.isFreePreview && (
                          <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold uppercase">
                            Free Preview
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Course Features & Deliverables */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-4 border-border">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
              What's Included
            </h3>
            <div className="space-y-3 text-xs text-muted-foreground font-light">
              {course.includes.map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col gap-4 border-border">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
              Course Highlights
            </h3>
            <div className="space-y-3 text-xs text-muted-foreground font-light">
              {course.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-foreground">
                  <ShieldCheck className="w-4 h-4 text-profit shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
