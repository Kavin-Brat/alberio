import Link from "next/link";
import { ArrowRight, Clock, Compass, Tag, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import PositionSizerWidget from "@/components/dashboard/PositionSizerWidget";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BlogArchive() {
  const featuredPost = BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((post) => post.slug !== featuredPost.slug);

  return (
    <PageContainer>
      {/* Blog Header */}
      <div className="flex flex-col gap-2 border-b border-border pb-6 font-sora">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          Knowledge Base & Research
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Prop Trading Insights & Math Guides
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed font-light">
          Written by a trader obsessed with order books. Detailed breakdowns on trailing liquidation models, contract multipliers, and risk systems.
        </p>
      </div>

      {/* FEATURED POST */}
      <GlassCard className="grid grid-cols-1 lg:grid-cols-12 gap-0 p-0 overflow-hidden border-border group font-sora">
        <div className="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary uppercase tracking-wider">
                Featured Article
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mt-1 font-light">
              {featuredPost.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-6 mt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary"><Tag className="w-3.5 h-3.5" /> {featuredPost.category}</span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Button variant="primary" size="sm" className="flex items-center gap-1.5">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-hero-bg/80 border-t lg:border-t-0 lg:border-l border-border p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full max-w-sm rounded-sm bg-secondary border border-border p-6 shadow-2xl font-mono text-[11px] leading-relaxed flex flex-col gap-2">
            <div className="flex justify-between items-start text-xs border-b border-border pb-3 mb-2 font-sora font-bold">
              <span className="text-foreground uppercase tracking-wider">Trailing Equity Math</span>
              <span className="text-loss">Breach risk</span>
            </div>
            <div>
              <span className="text-muted-foreground">peak_equity = </span>
              <span className="text-primary">$103,000</span>
            </div>
            <div>
              <span className="text-muted-foreground">overall_limit = </span>
              <span className="text-loss">peak_equity - $6,000 = $97,000</span>
            </div>
            <div className="border-t border-border pt-2 mt-1">
              <span className="text-muted-foreground">current_balance = </span>
              <span className="text-foreground">$99,000</span>
            </div>
            <div>
              <span className="text-muted-foreground">remaining_buffer = </span>
              <span className="text-primary font-bold">$2,000 (shrunk!)</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ARTICLES GRID & SIDEBAR WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h3 className="font-bold text-lg text-foreground border-b border-border pb-3 uppercase tracking-wider">
            Latest Guides
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <GlassCard
                key={post.slug}
                className="flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                    <span className="text-primary uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-1 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-border pt-4 mt-5 text-[10px] font-semibold text-muted-foreground">
                  <span>{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-foreground transition-colors uppercase tracking-widest font-bold flex items-center gap-1"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-4">
            <div className="flex gap-2 items-start">
              <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
                  Position Sizer Tool
                </h3>
                <span className="text-[10px] text-muted-foreground block mt-0.5 font-light">
                  Calculate lot sizes instantly while reading
                </span>
              </div>
            </div>
            <PositionSizerWidget />
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
