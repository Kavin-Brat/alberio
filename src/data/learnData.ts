/**
 * Learn Platform — Master Data File
 *
 * Schema:  Category → Level → Topic → Subheading (lesson with HTML content)
 *
 * This is the single source of truth consumed by:
 *   - /api/categories
 *   - /api/courses/forex
 *   - /api/lessons/:lessonId
 *
 * To connect a real CMS/DB: replace these exports with fetch calls.
 */

// ─── Type Definitions ─────────────────────────────────────────────────────────

export type CategoryStatus = "active" | "coming_soon";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: CategoryStatus;
  slug: string;
}

export interface Subheading {
  id: string;
  title: string;
  readMinutes: number;
  tags: string[];
  content: string; // HTML string
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  subheadings: Subheading[];
}

export interface Level {
  id: string;
  name: string;
  description: string;
  color: "green" | "amber" | "violet";
  topics: Topic[];
}

export interface Course {
  category: string;
  title: string;
  tagline: string;
  levels: Level[];
}

// ─── Categories Data ──────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    id: "forex",
    title: "Learn Forex",
    description: "Master currency markets — from pip math to prop firm funded accounts.",
    icon: "🌐",
    status: "active",
    slug: "forex",
  },
  {
    id: "crypto",
    title: "Learn Crypto",
    description: "Bitcoin, Ethereum, DeFi, and crypto trading strategies.",
    icon: "₿",
    status: "coming_soon",
    slug: "crypto",
  },
  {
    id: "futures",
    title: "Learn Futures",
    description: "Commodities, indices, and futures contract trading.",
    icon: "📊",
    status: "coming_soon",
    slug: "futures",
  },
  {
    id: "stocks",
    title: "Learn Stocks",
    description: "Equity markets, earnings, and long-term investing.",
    icon: "📈",
    status: "coming_soon",
    slug: "stocks",
  },
];

// ─── Forex Course Data ────────────────────────────────────────────────────────

export const FOREX_COURSE: Course = {
  category: "forex",
  title: "Learn Forex Trading",
  tagline: "From zero to funded — structured like BabyPips, built for prop firm traders.",
  levels: [
    // ══════════════════════════════════════════════════════════════════════════
    // BEGINNER
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "beginner",
      name: "Beginner",
      description: "Foundational concepts — what Forex is, how currencies move, and the math every trader must know.",
      color: "green",
      topics: [
        {
          id: "intro-forex",
          title: "Introduction to Forex",
          icon: "🌐",
          description: "Understand the world's largest financial market from the ground up.",
          subheadings: [
            {
              id: "what-is-forex",
              title: "What is Forex Trading?",
              readMinutes: 5,
              tags: ["forex basics", "currency market"],
              content: `
<h1>What is Forex Trading?</h1>
<p>Forex (Foreign Exchange) is the global marketplace for buying and selling national currencies. Unlike a stock exchange, Forex has no central exchange — it operates as an over-the-counter (OTC) market, running 24 hours a day, 5 days a week across major financial hubs: <strong>London, New York, Tokyo, and Sydney</strong>.</p>

<div class="callout callout-key">
  <strong>Key Fact:</strong> The Forex market trades over <strong>$7.5 trillion per day</strong> — making it the largest financial market on Earth, dwarfing all stock exchanges combined.
</div>

<h2>Who Trades Forex?</h2>
<ul>
  <li><strong>Central Banks</strong> — Set monetary policy, intervene to stabilise currencies (e.g., Federal Reserve, ECB)</li>
  <li><strong>Commercial Banks</strong> — Facilitate enormous client transaction volumes</li>
  <li><strong>Hedge Funds &amp; Institutions</strong> — Speculative and hedging positions</li>
  <li><strong>Retail Traders</strong> — You, trading through a broker platform</li>
  <li><strong>Corporations</strong> — Hedging currency exposure on international revenue</li>
</ul>

<h2>Why Do Currency Prices Move?</h2>
<p>Currencies move because of supply and demand forces driven by:</p>
<ul>
  <li>Economic data — GDP, inflation (CPI), employment numbers (NFP)</li>
  <li>Central bank interest rate decisions</li>
  <li>Geopolitical events and risk sentiment</li>
  <li>Institutional order flow and speculative positioning</li>
</ul>

<div class="callout callout-tip">
  <strong>Tip:</strong> When a country raises interest rates, its currency typically strengthens — foreign investors buy it to earn higher yields on deposits.
</div>
              `.trim(),
            },
            {
              id: "currency-pairs",
              title: "Understanding Currency Pairs",
              readMinutes: 6,
              tags: ["currency pairs", "base quote", "majors minors"],
              content: `
<h1>Understanding Currency Pairs</h1>
<p>In Forex, currencies are always traded in <strong>pairs</strong> — for example, <strong>EUR/USD</strong>. The first currency (EUR) is the <em>base currency</em>. The second (USD) is the <em>quote currency</em>. The price tells you how many units of the quote currency you need to buy one unit of the base.</p>

<div class="callout callout-key">
  <strong>EUR/USD = 1.0850</strong> means: 1 Euro buys 1.0850 US Dollars.
</div>

<h2>Types of Currency Pairs</h2>
<ul>
  <li><strong>Majors</strong> — All involve USD: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD</li>
  <li><strong>Minors (Crosses)</strong> — No USD: EUR/GBP, EUR/JPY, GBP/JPY, EUR/AUD</li>
  <li><strong>Exotics</strong> — Emerging market currencies: USD/TRY, USD/ZAR, EUR/PLN</li>
</ul>

<div class="callout callout-tip">
  <strong>Beginner Tip:</strong> Stick to Major pairs. They have the highest liquidity, tightest spreads, and most consistent price behaviour.
</div>

<h2>Reading a Forex Quote</h2>
<p>A Forex quote always shows two prices — the <strong>Bid</strong> (what the broker buys at / you sell at) and the <strong>Ask</strong> (what the broker sells at / you buy at). The difference is the <strong>spread</strong> — the broker's transaction fee.</p>
              `.trim(),
            },
            {
              id: "what-is-a-pip",
              title: "What is a Pip?",
              readMinutes: 7,
              tags: ["pip", "pipette", "price movement"],
              content: `
<h1>What is a Pip?</h1>
<p>A <strong>pip</strong> (Percentage in Point) is the smallest standardised price movement in a Forex pair. For most pairs (e.g., EUR/USD), 1 pip = <strong>0.0001</strong> — the 4th decimal place. For JPY pairs (e.g., USD/JPY), 1 pip = <strong>0.01</strong> — the 2nd decimal place.</p>

<div class="formula">Pip Value = (0.0001 ÷ Exchange Rate) × Lot Size</div>

<div class="callout callout-key">
  <strong>Standard Lot (100,000 units) on EUR/USD:</strong> 1 pip = $10 profit or loss.
  <br/><strong>Mini Lot (10,000 units):</strong> 1 pip = $1.
  <br/><strong>Micro Lot (1,000 units):</strong> 1 pip = $0.10.
</div>

<h2>Pip Examples</h2>
<ul>
  <li>EUR/USD moves from 1.0850 → 1.0860 = <strong>10 pips gained</strong></li>
  <li>GBP/USD moves from 1.2650 → 1.2630 = <strong>20 pips lost</strong></li>
  <li>USD/JPY moves from 154.00 → 154.50 = <strong>50 pips gained</strong></li>
</ul>

<div class="callout callout-tip">
  <strong>Tip:</strong> Always calculate your pip value BEFORE entering a trade to know your exact dollar risk per pip.
</div>
              `.trim(),
            },
          ],
        },
        {
          id: "lots-leverage",
          title: "Lots, Leverage & Margin",
          icon: "⚖️",
          description: "Trade sizes, amplification of P&L, and what margin means for your account.",
          subheadings: [
            {
              id: "lot-sizes",
              title: "Understanding Lot Sizes",
              readMinutes: 5,
              tags: ["lot size", "standard lot", "micro lot"],
              content: `
<h1>Understanding Lot Sizes</h1>
<p>A <strong>lot</strong> is a standardised unit of currency volume. Your lot size directly determines your pip value — and therefore your dollar risk per pip.</p>

<div class="formula">Standard Lot = 100,000 units | Mini = 10,000 | Micro = 1,000 | Nano = 100</div>

<h2>Lot Size → Pip Value on EUR/USD</h2>
<ul>
  <li>Standard Lot (1.00): <strong>$10 per pip</strong></li>
  <li>Mini Lot (0.10): <strong>$1 per pip</strong></li>
  <li>Micro Lot (0.01): <strong>$0.10 per pip</strong></li>
</ul>

<div class="callout callout-warning">
  <strong>Warning:</strong> Never trade a lot size that risks more than 1–2% of your account on a single trade.
</div>
              `.trim(),
            },
            {
              id: "what-is-leverage",
              title: "What is Leverage?",
              readMinutes: 8,
              tags: ["leverage", "margin", "amplified risk"],
              content: `
<h1>What is Leverage?</h1>
<p>Leverage allows you to control a larger position with a smaller deposit. A broker offering <strong>1:100 leverage</strong> means every $1 of your capital controls $100 in the market.</p>

<div class="formula">Required Margin = Position Size ÷ Leverage Ratio</div>

<div class="callout callout-warning">
  <strong>Critical Warning:</strong> Leverage amplifies both profits AND losses equally. A 1% adverse move against a 1:100 leveraged position wipes 100% of the deposited margin.
</div>

<h2>Leverage Examples</h2>
<ul>
  <li>No leverage: $10,000 controls $10,000 → 100 pip move = $100 gain</li>
  <li>1:100 leverage: $10,000 controls $1,000,000 → 100 pip move = $10,000 gain <em>or loss</em></li>
</ul>

<div class="callout callout-tip">
  <strong>Prop Firm Note:</strong> Most prop firms restrict leverage to 1:10 – 1:30 to control maximum drawdown exposure. Treat leverage as a risk multiplier, not a profit multiplier.
</div>
              `.trim(),
            },
          ],
        },
        {
          id: "risk-basics",
          title: "Risk Management Basics",
          icon: "🛡️",
          description: "Stop Loss, Take Profit, R:R ratio, and how to size positions correctly.",
          subheadings: [
            {
              id: "stop-loss-take-profit",
              title: "Stop Loss & Take Profit",
              readMinutes: 6,
              tags: ["stop loss", "take profit", "risk management"],
              content: `
<h1>Stop Loss &amp; Take Profit</h1>
<p>A <strong>Stop Loss (SL)</strong> is a predefined price level where your trade closes automatically to limit your maximum loss. A <strong>Take Profit (TP)</strong> is where your trade closes automatically to lock in your target gain.</p>

<div class="callout callout-key">
  <strong>Rule #1:</strong> Never enter a trade without knowing your Stop Loss level first.
</div>

<h2>How to Set a Stop Loss</h2>
<ul>
  <li>Place SL beyond a key structural level (support or resistance)</li>
  <li>Place SL beyond the recent swing high (for shorts) or swing low (for longs)</li>
  <li>Never set SL to an arbitrary round number without structural price logic</li>
</ul>

<div class="callout callout-tip">
  <strong>Pro Tip:</strong> Your Stop Loss distance should be determined by the chart structure — not by how many dollars you're willing to lose. Let the chart tell you where you're wrong.
</div>
              `.trim(),
            },
            {
              id: "risk-reward",
              title: "Risk:Reward Ratio",
              readMinutes: 7,
              tags: ["risk reward", "RR ratio", "trade expectancy"],
              content: `
<h1>Risk:Reward Ratio</h1>
<p>The <strong>Risk:Reward (R:R) ratio</strong> compares the potential loss of a trade to its potential profit. A <strong>1:2 R:R</strong> means you risk $100 to potentially make $200.</p>

<div class="formula">R:R = Take Profit Distance ÷ Stop Loss Distance</div>

<div class="callout callout-key">
  <strong>At 1:2 R:R</strong>, you only need to win <strong>34%</strong> of your trades to be profitable long-term.
</div>

<h2>Win Rate vs R:R Expectancy</h2>
<ul>
  <li>1:1 R:R → need &gt;50% win rate to profit</li>
  <li>1:2 R:R → need &gt;34% win rate to profit</li>
  <li>1:3 R:R → need &gt;25% win rate to profit</li>
</ul>

<div class="callout callout-tip">
  <strong>Tip:</strong> Most professional traders target a minimum 1:2 R:R. This allows a strategy to remain profitable even with a 40–45% win rate — which is typical of professional systematic traders.
</div>
              `.trim(),
            },
            {
              id: "position-sizing",
              title: "How Much Should I Risk Per Trade?",
              readMinutes: 6,
              tags: ["position sizing", "1% rule", "capital protection"],
              content: `
<h1>How Much Should I Risk Per Trade?</h1>
<p>Position sizing determines how large a trade you take based on your account balance and Stop Loss distance. The <strong>1–2% Rule</strong> means you never risk more than 1–2% of total capital on any single trade.</p>

<div class="formula">Position Size = (Account Balance × Risk %) ÷ (Stop Loss Pips × Pip Value)</div>

<div class="callout callout-key">
  <strong>Example:</strong> $10,000 account, 1% risk = $100 max loss per trade.
  With a 20-pip SL on EUR/USD → trade <strong>0.5 lots</strong> (20 pips × $1/pip at 0.1 lot = $2/pip → 0.5 lots = $10/pip → $200? No: 20 × $5 = $100 ✓ at 0.5 lots).
</div>

<div class="callout callout-warning">
  <strong>Warning:</strong> Risking more than 2% per trade dramatically increases probability of account ruin. Prop firms mandate strict position sizing rules — breaching daily loss limits ends your evaluation.
</div>
              `.trim(),
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // INTERMEDIATE
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "intermediate",
      name: "Intermediate",
      description: "Market structure, institutional order flow, COT data, and trading session volatility.",
      color: "amber",
      topics: [
        {
          id: "market-structure",
          title: "Market Structure",
          icon: "📈",
          description: "How price moves in trends, ranges, and reversals — the language of the market.",
          subheadings: [
            {
              id: "higher-highs-lower-lows",
              title: "Higher Highs & Lower Lows",
              readMinutes: 8,
              tags: ["market structure", "trend", "HH HL"],
              content: `
<h1>Higher Highs &amp; Lower Lows</h1>
<p>Market structure describes how price forms a series of <strong>Higher Highs (HH)</strong> and <strong>Higher Lows (HL)</strong> in an uptrend — or <strong>Lower Highs (LH)</strong> and <strong>Lower Lows (LL)</strong> in a downtrend. A break of this structure signals a potential reversal.</p>

<div class="callout callout-key">
  <strong>Break of Structure (BOS):</strong> Occurs when price closes decisively beyond the last confirmed swing high (bullish BOS) or swing low (bearish BOS) — signalling trend continuation or reversal.
</div>

<h2>How to Identify Market Structure</h2>
<ul>
  <li>Mark the most recent swing highs and swing lows on your chart</li>
  <li>Connect them to visualise the trend direction</li>
  <li>A BOS followed by a CHoCH (Change of Character) = high probability reversal zone</li>
</ul>
              `.trim(),
            },
            {
              id: "support-resistance",
              title: "Support & Resistance Levels",
              readMinutes: 9,
              tags: ["support resistance", "key levels", "role reversal"],
              content: `
<h1>Support &amp; Resistance Levels</h1>
<p><strong>Support</strong> is a price zone where buying demand historically exceeds selling pressure — causing price to bounce upward. <strong>Resistance</strong> is the opposite: a zone where selling exceeds buying and price reverses downward.</p>

<div class="callout callout-tip">
  <strong>Role Reversal:</strong> Once a resistance level is decisively broken, it often becomes new support — and vice versa. This is one of the most reliable patterns in all of technical analysis.
</div>

<h2>Identifying Strong Levels</h2>
<ul>
  <li>Three or more touches = stronger level</li>
  <li>Longer consolidation at a level = stronger psychological significance</li>
  <li>Round numbers (e.g., 1.1000, 1.0500) attract institutional order clusters</li>
</ul>
              `.trim(),
            },
          ],
        },
        {
          id: "institutional-flow",
          title: "Institutional Order Flow",
          icon: "🏦",
          description: "Smart money concepts — liquidity grabs, stop hunts, order blocks, and COT data.",
          subheadings: [
            {
              id: "what-is-liquidity",
              title: "What is Liquidity in Forex?",
              readMinutes: 9,
              tags: ["liquidity", "stop hunt", "smart money"],
              content: `
<h1>What is Liquidity in Forex?</h1>
<p>Liquidity refers to the concentration of pending orders — stop losses, limit orders — clustered at certain price levels. Institutions require enormous volume to fill their positions. They do this by <em>engineering</em> price to sweep retail stop losses, absorbing that liquidity before reversing.</p>

<div class="callout callout-key">
  <strong>Liquidity Pools</strong> form above swing highs (buy stops) and below swing lows (sell stops). Institutions hunt these levels to fill large orders at favourable prices.
</div>

<div class="callout callout-warning">
  <strong>Warning:</strong> If your stop loss is placed at an obvious level (right at a swing low or a round number), you are providing liquidity to institutional players.
</div>
              `.trim(),
            },
            {
              id: "cot-data",
              title: "COT Data — Institutional Positioning",
              readMinutes: 12,
              tags: ["COT", "commitment of traders", "CFTC", "smart money"],
              content: `
<h1>COT Data — Reading Institutional Positioning</h1>
<p>The <strong>Commitment of Traders (COT)</strong> report is published weekly by the CFTC (US Commodity Futures Trading Commission). It reveals how three groups are positioned across futures markets:</p>

<ul>
  <li><strong>Commercial Hedgers</strong> — Real businesses hedging actual currency exposure (often contrarian)</li>
  <li><strong>Non-Commercial / Large Speculators</strong> — Hedge funds, often trend-following</li>
  <li><strong>Small Non-Commercial</strong> — Retail traders (often wrong at sentiment extremes)</li>
</ul>

<div class="callout callout-key">
  <strong>COT Signal:</strong> When Commercials are at extreme net-long while Non-Commercials are at extreme net-short — a major reversal often follows. Extremes in COT positioning historically precede significant trend changes.
</div>

<div class="callout callout-tip">
  <strong>Albireo COT Tool:</strong> Use Albireo's built-in COT positioning charts to visualise net positioning across all major currency futures — updated every Friday.
</div>
              `.trim(),
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PROFESSIONAL
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "professional",
      name: "Professional",
      description: "Institutional-grade — trailing drawdown math, Monte Carlo risk, prop firm compliance, and funded account rules.",
      color: "violet",
      topics: [
        {
          id: "prop-firm-rules",
          title: "Prop Firm Rules & Compliance",
          icon: "🏆",
          description: "Trailing drawdown, daily loss limits, consistency rules — everything to pass and keep a funded account.",
          subheadings: [
            {
              id: "trailing-drawdown",
              title: "Trailing Drawdown — The Rule That Kills Most Traders",
              readMinutes: 12,
              tags: ["trailing drawdown", "prop firm", "high water mark"],
              content: `
<h1>Trailing Drawdown — The Rule That Kills Most Traders</h1>
<p>Most prop firms use a <strong>Trailing Drawdown</strong> (also called Trailing Max Drawdown). Unlike a static drawdown calculated from your initial balance, a trailing drawdown <em>follows your equity peak upward</em> — creating a rising floor that never comes back down.</p>

<div class="formula">Liquidation Floor = Equity Peak − Maximum Drawdown Limit</div>

<div class="callout callout-key">
  <strong>Example:</strong> $100,000 account with 10% trailing DD. You reach $110,000 equity — your liquidation floor rises to $100,000. You cannot lose back to your original $90,000 floor anymore.
</div>

<h2>Why Traders Fail Trailing DD Accounts</h2>
<ul>
  <li>Winning early, then over-trading and giving back profits</li>
  <li>Not tracking High Water Mark (HWM) daily in real time</li>
  <li>Taking large positions after equity peak has already risen</li>
  <li>Not understanding the floor rises but <em>never falls</em></li>
</ul>

<div class="callout callout-warning">
  <strong>FTMO Rules:</strong> 5% Daily Loss Limit + 10% Maximum Drawdown. Breach either and the evaluation ends immediately — with no refund.
</div>

<div class="callout callout-tip">
  <strong>Albireo Compliance Guardian:</strong> Upload your MT4/MT5 trade CSV to automatically check your trailing drawdown exposure, daily loss, and consistency score before requesting a payout.
</div>
              `.trim(),
            },
            {
              id: "consistency-rule",
              title: "The 30% Consistency Rule",
              readMinutes: 8,
              tags: ["consistency rule", "prop firm", "payout compliance"],
              content: `
<h1>The 30% Consistency Rule</h1>
<p>Many prop firms enforce a <strong>Consistency Rule</strong>: your single best trading day must not exceed 30% of your total profit. This prevents traders from passing on one lucky trade and ensures consistent performance.</p>

<div class="formula">Consistency Score = Best Single Day Profit ÷ Total Profit × 100</div>

<div class="callout callout-key">
  <strong>Example:</strong> Total profit = $2,000. Best day = $800. That's 40% → you <em>fail</em> the consistency rule and the payout is rejected.
</div>

<div class="callout callout-tip">
  <strong>Albireo Tip:</strong> Use the Compliance Guardian tool to check your consistency score before submitting a payout request. It flags violations before the prop firm does.
</div>
              `.trim(),
            },
          ],
        },
        {
          id: "risk-of-ruin",
          title: "Risk of Ruin & Monte Carlo",
          icon: "🎲",
          description: "Statistical probability of account ruin — and how Monte Carlo simulation stress-tests your strategy.",
          subheadings: [
            {
              id: "what-is-ror",
              title: "What is Risk of Ruin?",
              readMinutes: 10,
              tags: ["risk of ruin", "probability", "account blowup"],
              content: `
<h1>What is Risk of Ruin?</h1>
<p><strong>Risk of Ruin (RoR)</strong> is the statistical probability that a trading strategy will lose a defined percentage of the account — given its win rate, average R:R ratio, and risk per trade — over a large sample of trades.</p>

<div class="formula">RoR ≈ ((1 − Edge) ÷ (1 + Edge)) ^ (Account ÷ Risk Per Trade)</div>

<div class="callout callout-key">
  <strong>Insight:</strong> A trader with 50% win rate, 1:1 R:R, and 2% risk per trade has ~50% Risk of Ruin. Extend to 1:2 R:R — RoR drops below 5%. The R:R ratio is the most powerful lever.
</div>

<div class="callout callout-tip">
  <strong>Albireo Tool:</strong> Use the Monte Carlo Bootstrap Engine to simulate 1,000 trade sequences and calculate your maximum drawdown distribution at the 95th percentile.
</div>
              `.trim(),
            },
            {
              id: "monte-carlo",
              title: "Monte Carlo Simulation Explained",
              readMinutes: 11,
              tags: ["monte carlo", "bootstrap", "drawdown distribution"],
              content: `
<h1>Monte Carlo Simulation Explained</h1>
<p>Monte Carlo simulation takes your historical trade sequence and <em>resamples</em> it thousands of times in random order — generating a distribution of possible equity curves. This reveals your <strong>maximum drawdown at the 95th percentile</strong>: the worst realistic outcome your strategy would face.</p>

<div class="formula">P95 Max Drawdown = Drawdown threshold exceeded by only 5% of simulated paths</div>

<div class="callout callout-key">
  <strong>Interpretation:</strong> If your P95 max drawdown is 8% — there is only a 5% probability your strategy experiences a drawdown worse than 8% over the sampled period.
</div>

<h2>Why Monte Carlo Matters for Prop Firms</h2>
<ul>
  <li>Your 10-trade sample might look great — but Monte Carlo stress-tests 1,000+ trade sequences</li>
  <li>It reveals hidden drawdown risk invisible in a short backtest</li>
  <li>Use it to confirm your strategy survives prop firm drawdown limits at P95</li>
</ul>

<div class="callout callout-tip">
  <strong>Albireo Monte Carlo:</strong> Built into the Capital Management module — upload a trade CSV, set sim iterations (500–5,000), and get instant P95 max drawdown and risk of ruin output.
</div>
              `.trim(),
            },
          ],
        },
      ],
    },
  ],
};

// ─── Flat Lesson Lookup Map (for /api/lessons/:lessonId) ──────────────────────

export const LESSON_MAP: Record<string, Subheading & { levelId: string; topicId: string; levelName: string; topicTitle: string }> = {};

for (const level of FOREX_COURSE.levels) {
  for (const topic of level.topics) {
    for (const sub of topic.subheadings) {
      LESSON_MAP[sub.id] = { ...sub, levelId: level.id, topicId: topic.id, levelName: level.name, topicTitle: topic.title };
    }
  }
}
