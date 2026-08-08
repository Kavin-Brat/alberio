import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, Send, MessageSquare, List } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import PositionSizerWidget from "@/components/dashboard/PositionSizerWidget";
import PageContainer from "@/components/layout/PageContainer";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-cygnus-gold transition-colors font-bold uppercase tracking-wider self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog Portal
        </Link>

        {/* Title & Metadata Banner */}
        <div className="flex flex-col gap-4 border-b border-border-custom/50 pb-8 mt-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-electric-cyan/15 border border-electric-cyan/20 text-[10px] font-bold text-electric-cyan uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-black text-text-primary tracking-tight leading-tight max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-text-muted mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span>•</span>
            <span>By Kavin B Albireo (Trader)</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          {/* Left Sidebar: Table of Contents (3 Cols) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-4 bg-surface-card border border-border-custom p-5 rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border-custom/40 pb-3">
                <List className="w-4 h-4 text-cygnus-gold" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-text-primary">
                  Table of Contents
                </span>
              </div>
              <nav className="flex flex-col gap-2.5 text-xs text-text-muted">
                {post.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="hover:text-cygnus-gold hover:translate-x-1 font-semibold transition-all"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Article Body (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <article 
              className="prose prose-invert max-w-none text-sm md:text-base text-text-muted leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Embedded Position Sizer Widget */}
            {post.showPositionSizer && (
              <div className="mt-8 border-t border-border-custom/40 pt-8">
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Risk Management Playground: Size Your Position
                </h3>
                <p className="text-xs text-text-muted mb-4">
                  Adjust values below to compute correct lots according to your current trading rule tolerances.
                </p>
                <PositionSizerWidget />
              </div>
            )}
          </div>

          {/* Right Sidebar: Author Bio (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-surface-card border border-border-custom p-6 rounded-2xl flex flex-col items-center text-center gap-4">
              {/* Dev Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cygnus-gold to-electric-cyan p-0.5 shadow-lg shadow-cygnus-gold/10">
                <div className="w-full h-full bg-albireo-blue rounded-full flex items-center justify-center font-bold text-text-primary text-xl">
                  KB
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-text-primary">Kavin B Albireo</h3>
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                  Trader
                </span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Former backend engineer who transitioned into full-time mechanical futures & forex trading. Building Albireo to resolve trading math deficits.
              </p>

              <div className="flex flex-col gap-2 w-full mt-2">
                <a
                  href="https://t.me/+e5tkgGVt5mIxZjI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(34,230,0,0.15)]"
                >
                  <Send className="w-3.5 h-3.5 text-primary" /> Join Official Telegram Channel
                </a>
              </div>
            </div>
          </div>

        </div>

    </PageContainer>
  );
}
