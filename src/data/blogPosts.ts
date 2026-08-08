export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  featured: boolean;
  coverImage?: string;
  category: "Drawdown Math" | "Risk Management" | "Order Flow";
  showPositionSizer?: boolean;
  contentHtml: string;
  sections: { id: string; title: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "trailing-drawdown-liquidation-math-2026",
    title: "How Trailing Drawdowns Liquidation Math Works in 2026",
    date: "August 1, 2026",
    readTime: "6 min read",
    summary: "A deep mathematical dive into trailing drawdown limits. Learn why 90%+ of prop firm traders fail due to peak equity tracking traps and how to structure your risk.",
    featured: true,
    category: "Drawdown Math",
    showPositionSizer: true,
    sections: [
      { id: "introduction", title: "Introduction" },
      { id: "what-is-trailing", title: "What is a Trailing Drawdown?" },
      { id: "floating-equity-trap", title: "The Floating Equity Peak Trap" },
      { id: "mathematical-example", title: "Mathematical Case Study" },
      { id: "position-sizing", title: "Survival via Position Sizing" },
      { id: "conclusion", title: "Conclusion" }
    ],
    contentHtml: `
      <p>Prop firms have modernized the industry by funding talented traders, but they have also introduced mathematical parameters designed to make retail accounts fail. Chief among these parameters is the <strong>Trailing Drawdown Limit</strong>.</p>
      
      <p>Unlike a static drawdown which remains anchored to your starting account balance, a trailing drawdown crawls upward as your account value increases. In this deep dive, we will break down the exact liquidation algorithms prop firms run and show you how to defend your account.</p>

      <h2 id="what-is-trailing" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">What is a Trailing Drawdown?</h2>
      <p>A trailing drawdown tracks either your <strong>Account Balance</strong> or your <strong>Account Equity</strong>. When your account sets a new high watermark, your allowed overall drawdown floor adjusts upward by the same amount.</p>
      <p>For example, if you start a $100,000 challenge with a 6% trailing drawdown ($6,000 maximum allowed loss):</p>
      <ul class="list-disc pl-5 my-4 space-y-2">
        <li>Your starting liquidation threshold is <strong>$94,000</strong>.</li>
        <li>If your balance increases to $102,000, your drawdown threshold is recalculated to <strong>$96,000</strong>.</li>
        <li>If your balance subsequently drops back to $98,000, your threshold <strong>remains at $96,000</strong>. You now have only $2,000 of buffer left.</li>
      </ul>

      <h2 id="floating-equity-trap" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">The Floating Equity Peak Trap</h2>
      <p class="text-loss font-semibold">This is the single biggest cause of prop challenge failure.</p>
      <p>Under <strong>Trailing Equity</strong> rules (as utilized by firms like Funding Pips), the drawdown limit trails your <em>unrealized floating profits</em>, not just closed balance peaks. If you open a trade and it floats up to +$3,000 in profit but you fail to close it, and it eventually drops back to hit your stop loss at -$1,000, your account limits have shifted:</p>
      <ul class="list-decimal pl-5 my-4 space-y-2">
        <li>Starting: $100k balance. Limit: $94k. Buffer: $6,000.</li>
        <li>Intraday peak: Floating equity hits $103k. <strong>Limit trails up to $97k immediately.</strong></li>
        <li>Close: Stop loss hits at $99k balance.</li>
        <li>Outcome: Your balance is $99k, but your limit is $97k. <strong>Your buffer has shrunk from $6,000 to $2,000.</strong></li>
      </ul>

      <h2 id="mathematical-example" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">Mathematical Case Study</h2>
      <p>Let's represent this programmatically. A trader takes 3 sequential trades risking 1% with 1:2 Risk-Reward:</p>
      <div class="bg-hero-bg border border-border p-4 rounded-xl my-4 font-mono text-xs text-foreground">
        Trade 1: WIN. Balance $102k. Floating peak $103k. Limit = $97k.<br/>
        Trade 2: LOSS. Balance $101k. Limit remains $97k.<br/>
        Trade 3: LOSS. Balance $100k. Limit remains $97k. Buffer is now just 3%!
      </div>
      <p>Under static rules, this series of trades leaves the trader with a $100k balance and a $94k limit (6% buffer). Under trailing equity rules, the trader has only a 3% buffer remaining. The mathematical handicap is clear.</p>

      <h2 id="position-sizing" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">Survival via Position Sizing</h2>
      <p>To defend against trailing decay, you must align your position sizes with your actual safety buffer, not the nominal account size. If your buffer shrinks to $2,000, you are no longer trading a $100k account; you are trading a $2,000 risk account.</p>
      <p>Use the interactive tool below to compute your maximum lot size based on your current account parameters.</p>
    `
  },
  {
    slug: "mastering-risk-factor-prop-firms",
    title: "Mastering the Risk Factor: Position Sizing and Capital Allocation",
    date: "July 24, 2026",
    readTime: "4 min read",
    summary: "How to mathematically define your risk per trade to survive long-term variance and passing evaluations systematically.",
    featured: false,
    category: "Risk Management",
    sections: [
      { id: "intro", title: "Introduction" },
      { id: "ruin-math", title: "The Math behind Ruin" },
      { id: "sizing-rules", title: "Golden Rules of Sizing" }
    ],
    contentHtml: `
      <p>Proper risk management is the divider between gambling and professional trading. In this article, we outline the risk allocation principles necessary to protect account funding.</p>
      <h2 id="ruin-math" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">The Math behind Ruin</h2>
      <p>Drawdown is non-linear. A 10% loss requires an 11.1% gain to recover. A 50% loss requires a 100% gain to recover. In prop firms, if you reach your drawdown limit, you lose the account completely. Thus, your probability of ruin must be kept at absolute zero.</p>
      <p>By risking 1% per trade, a trader has to experience 10 consecutive losses to breach a 10% limit (assuming static rules). If the win rate is 50%, the probability of 10 consecutive losses is 0.09%. By increasing risk per trade to 2%, the probability of losing 5 consecutive trades to fail the evaluation jumps to 3.1%. Keep your risk under 1.5% at all times.</p>
    `
  },
  {
    slug: "institutional-liquidity-order-flow",
    title: "Unlocking CFTC Data: Mapping Smart Money Liquidity Ranges",
    date: "July 18, 2026",
    readTime: "5 min read",
    summary: "Analyzing COT reports to identify long-term structural reversals. How commercial institutions hedge risk using retail stop liquidity.",
    featured: false,
    category: "Order Flow",
    sections: [
      { id: "cftc-basics", title: "CFTC COT Basics" },
      { id: "spotting-reversals", title: "Spotting Reversals" }
    ],
    contentHtml: `
      <p>Institutions control currency fluctuations. Understanding where they allocate hedge balances is the key to identifying trend directions.</p>
      <h2 id="cftc-basics" class="text-xl font-bold text-text-primary mt-8 mb-4 border-b border-border-custom pb-2">CFTC COT Basics</h2>
      <p>The CFTC Commitments of Traders (COT) report shows open interest in futures markets. Commercial traders (multinationals, banking institutions) trade to hedge physical inventory. Non-Commercial traders (hedge funds) trade purely for speculative profit. Look for points of divergence where hedge funds are extremely long and commercials are heavily shorting. These ranges represent historical resistance zones.</p>
    `
  }
];
