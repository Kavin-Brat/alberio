import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, List, Send } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import PositionSizerWidget from "@/components/dashboard/PositionSizerWidget";
import PageContainer from "@/components/layout/PageContainer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
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
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog Portal
      </Link>

      {/* Title & Metadata Banner */}
      <div className="flex flex-col gap-4 border-b border-border pb-8 mt-2 font-sora">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl md:text-5xl font-black text-foreground tracking-tight leading-tight max-w-4xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
          <span>•</span>
          <span>By Kavin B Albireo (Trader)</span>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 font-sora">
        {/* Left Sidebar: Table of Contents (3 Cols) */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-4 bg-hero-bg border border-border p-5 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <List className="w-4 h-4 text-primary" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-foreground">
                Table of Contents
              </span>
            </div>
            <nav className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              {post.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="hover:text-primary hover:translate-x-1 font-semibold transition-all"
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
            className="prose prose-invert max-w-none text-sm md:text-base text-muted-foreground leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Embedded Position Sizer Widget */}
          {post.showPositionSizer && (
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Risk Management Playground: Size Your Position
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Adjust values below to compute correct lots according to your current trading rule tolerances.
              </p>
              <PositionSizerWidget />
            </div>
          )}
        </div>

        {/* Right Sidebar: Author Bio (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-hero-bg border border-border p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            {/* Dev Avatar */}
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 p-0.5 shadow-lg shadow-primary/10 flex items-center justify-center">
              <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center font-bold text-primary text-xl">
                KB
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-foreground">Kavin B Albireo</h3>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                Trader
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Full-time mechanical futures & forex trader. Building Albireo to resolve trading math deficits.
            </p>

            <div className="flex flex-col gap-2 w-full mt-2">
              <a
                href="https://t.me/+e5tkgGVt5mIxZjI1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(34,230,0,0.15)] uppercase tracking-wider"
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
