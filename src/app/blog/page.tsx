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
      <div className="flex flex-col gap-2 border-b border-cyber-cyan/15 pb-6">
        <span className="text-xs font-heading font-bold text-cyber-cyan uppercase tracking-widest">
          Knowledge Base & Research
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
          Prop Trading Insights & Math Guides
        </h1>
        <p className="text-light-purple text-sm md:text-base max-w-2xl leading-relaxed">
          Written by a trader obsessed with order books. Detailed breakdowns on trailing liquidation models, contract multipliers, and risk systems.
        </p>
      </div>

      {/* FEATURED POST */}
      <GlassCard className="grid grid-cols-1 lg:grid-cols-12 gap-0 p-0 overflow-hidden border-cyber-cyan/25 group">
        <div className="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyber-cyan/15 border border-cyber-cyan/30 text-xs font-heading font-bold text-cyber-cyan">
                Featured Article
              </span>
              <span className="text-xs text-light-purple flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white group-hover:text-cyber-cyan transition-colors tracking-tight leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-light-purple text-sm leading-relaxed mt-1 font-sans">
              {featuredPost.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-cyber-cyan/15 pt-6 mt-2">
            <div className="flex items-center gap-3 text-xs text-light-purple font-heading font-semibold">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyber-cyan"><Tag className="w-3.5 h-3.5" /> {featuredPost.category}</span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Button variant="cyber" size="sm" className="flex items-center gap-1.5">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-primary-dark/80 border-t lg:border-t-0 lg:border-l border-cyber-cyan/15 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full max-w-sm rounded-sm bg-secondary-dark border border-cyber-cyan/25 p-6 shadow-2xl font-mono text-[11px] leading-relaxed flex flex-col gap-2">
            <div className="flex justify-between items-start text-xs border-b border-cyber-cyan/15 pb-3 mb-2 font-heading font-bold">
              <span className="text-white uppercase tracking-wider">Trailing Equity Math</span>
              <span className="text-loss">Breach risk</span>
            </div>
            <div>
              <span className="text-light-purple">peak_equity = </span>
              <span className="text-cyber-cyan">$103,000</span>
            </div>
            <div>
              <span className="text-light-purple">overall_limit = </span>
              <span className="text-loss">peak_equity - $6,000 = $97,000</span>
            </div>
            <div className="border-t border-cyber-cyan/10 pt-2 mt-1">
              <span className="text-light-purple">current_balance = </span>
              <span className="text-white">$99,000</span>
            </div>
            <div>
              <span className="text-light-purple">remaining_buffer = </span>
              <span className="text-cyber-cyan text-glow-cyan">$2,000 (shrunk!)</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ARTICLES GRID & SIDEBAR WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h3 className="font-heading font-bold text-lg text-white border-b border-cyber-cyan/15 pb-3 uppercase tracking-wider">
            Latest Guides
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <GlassCard
                key={post.slug}
                className="flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] font-heading font-bold text-light-purple">
                    <span className="text-cyber-cyan uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h4 className="text-lg font-heading font-bold text-white group-hover:text-cyber-cyan transition-colors mt-1 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-light-purple leading-relaxed font-sans line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-cyber-cyan/15 pt-4 mt-5 text-[10px] font-heading font-semibold text-light-purple">
                  <span>{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-cyber-cyan hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center gap-1"
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
              <Compass className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Position Sizer Tool
                </h3>
                <span className="text-[10px] text-light-purple block mt-0.5 font-sans">
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
