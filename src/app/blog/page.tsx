import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Compass, Tag, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import PositionSizerWidget from "@/components/dashboard/PositionSizerWidget";

export default function BlogArchive() {
  const featuredPost = BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((post) => post.slug !== featuredPost.slug);

  return (
    <div className="w-full flex-1 bg-albireo-blue px-4 lg:px-8 py-12">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
        
        {/* Blog Header */}
        <div className="flex flex-col gap-2 border-b border-border-custom/50 pb-6">
          <span className="text-xs font-bold text-cygnus-gold uppercase tracking-widest">
            Educational portal & analysis guides
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
            Prop Trading Insights & Mathematical Guides
          </h1>
          <p className="text-text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            Written by a software engineer obsessed with order books. We detail trailing liquidation models, contract multipliers, and risk systems.
          </p>
        </div>

        {/* SECTION 1: FEATURED HEADER POST */}
        <div className="bg-surface-card border border-border-custom rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-cygnus-gold/25 transition-all duration-300 group">
          <div className="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cygnus-gold/15 border border-cygnus-gold/20 text-xs font-bold text-cygnus-gold">
                  Featured Pillar Article
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary group-hover:text-cygnus-gold transition-colors tracking-tight leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed mt-2">
                {featuredPost.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-custom/40 pt-6 mt-4">
              <div className="flex items-center gap-2.5 text-xs text-text-muted font-semibold">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-electric-cyan" /> {featuredPost.category}</span>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="bg-cygnus-gold hover:bg-cygnus-gold/90 text-albireo-blue px-5 py-2.5 rounded-lg text-xs font-black shadow-md shadow-cygnus-gold/10 hover:shadow-cygnus-gold/25 transition-all flex items-center justify-center gap-1.5"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Visual card element on right instead of image */}
          <div className="lg:col-span-5 bg-albireo-blue/35 border-l lg:border-l border-t lg:border-t-0 border-border-custom p-8 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-electric-cyan/5 via-transparent to-transparent pointer-events-none" />
            <div className="w-full max-w-sm rounded-xl bg-surface-card border border-border-custom p-6 shadow-xl relative">
              <div className="flex justify-between items-start text-xs border-b border-border-custom/50 pb-3 mb-4">
                <span className="font-bold text-text-primary uppercase tracking-wider">Trailing equity formula</span>
                <span className="text-loss font-semibold">Breach threat</span>
              </div>
              <div className="font-mono text-[11px] leading-relaxed flex flex-col gap-2">
                <div>
                  <span className="text-text-muted">peak_equity = </span>
                  <span className="text-electric-cyan">$103,000</span>
                </div>
                <div>
                  <span className="text-text-muted">overall_limit = </span>
                  <span className="text-loss">peak_equity - $6,000 = $97,000</span>
                </div>
                <div className="border-t border-border-custom/30 pt-2 mt-1">
                  <span className="text-text-muted">current_balance = </span>
                  <span className="text-text-primary">$99,000</span>
                </div>
                <div>
                  <span className="text-text-muted">remaining_buffer = </span>
                  <span className="text-cygnus-gold">$2,000 (shrunk!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: OTHER ARTICLES LIST & WIDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Post Lists (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="font-bold text-lg text-text-primary border-b border-border-custom/50 pb-3 tracking-tight">
              Latest Guides
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-surface-card border border-border-custom hover:border-cygnus-gold/25 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-text-muted">
                      <span className="text-electric-cyan uppercase tracking-wider">{post.category}</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-text-primary group-hover:text-cygnus-gold transition-colors mt-1 leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-border-custom/30 pt-4 mt-5 text-[10px] text-text-muted font-semibold">
                    <span>{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-cygnus-gold hover:text-cygnus-gold/80 transition-colors uppercase tracking-widest font-black flex items-center gap-0.5"
                    >
                      Read Guide &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Standalone Position Sizer on Blog Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex gap-2 items-start">
                <Compass className="w-5 h-5 text-cygnus-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">
                    Position Sizer Tool
                  </h3>
                  <span className="text-[10px] text-text-muted block mt-0.5">
                    Calculate your exact lot sizes inside blog articles
                  </span>
                </div>
              </div>
              <PositionSizerWidget />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
