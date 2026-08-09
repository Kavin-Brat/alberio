/**
 * Albireo Landing Page Text Content Registry
 */

export const LANDING_HERO_CONTENT = {
  title: "ALBIREO",
  subHeadline: "Institutional trading intelligence & prop firm analytics.",
  description:
    "Enterprise prop firm analytics built in days. Quantitative drawdown surveillance deployed with zero-trust risk architecture. Smart position sizing set up for your entire trading desk. All of it done right, not just fast.",
  exploreButtonText: "EXPLORE",
} as const;

export const SIMULATOR_PREVIEW_CONTENT = {
  pillCategory: "QUANTITATIVE RISK ENGINE",
  headline: "Test Your Account Survival Rate Instantly.",
  description:
    "Don't guess if you'll pass. Under Trailing Equity drawdowns, floating profits can shrink your buffer. Adjust risk params below to see your mathematical probability of breaching rules.",
  checkmarks: [
    "500 parallel Monte Carlo iterations",
    "Models FTMO, Funding Pips & Topstep math",
  ],
  actionText: "ACCESS FULL PROFESSIONAL SIMULATOR →",
} as const;

export const CORE_ARCHITECTURE_CONTENT = {
  pillCategory: "CORE ARCHITECTURE",
  headline: "Quantitative Systems for Scaling Traders",
  description:
    "Eliminate emotional guess-work. Quantify risk, track institutional flow, and journal trades with precision.",
  cards: [
    {
      title: "Prop Firm Drawdown Engine",
      description:
        "Trailing drawdown limits are math traps. Simulate trailing equity peaks and balance resets under realistic slippage and win-rate variance.",
      iconKey: "code",
      href: "/tools",
    },
    {
      title: "COT Institutional Sentiment",
      description:
        "Track smart money behavior. Visualize weekly CFTC Commitments of Traders data to align with commercial hedgers and institutional positioning.",
      iconKey: "chart",
      href: "/tools/cot-analyzer",
    },
    {
      title: "Quantitative Trade Journal",
      description:
        "Stop logging trades manually in basic spreadsheets. Automatically track Sharpe ratio, execution timing, session data, and behavioral tags.",
      iconKey: "target",
      href: "/journal",
    },
    {
      title: "Verified Firm Directory",
      description:
        "Compare verified prop firms by payout reliability, account rules, drawdown calculation models, and profit split thresholds.",
      iconKey: "grid",
      href: "/prop-firms",
    },
  ],
} as const;

export const OUR_STORY_CONTENT = {
  pillCategory: "OUR STORY",
  headline: "Bridging Quantitative Logic & Institutional Alpha",
  description:
    "Albireo was founded with a singular purpose: empowering traders with zero-dependency algorithmic risk guardians, Monte Carlo stress-testing, and real-time ECN terminal execution.",
  originBox: {
    pill: "THE ALBIREO ORIGIN STORY",
    title: "Democratizing Institutional Risk Systems for Scaling Traders",
    body: "Albireo was born when our core trading team realized that over 90% of prop-firm evaluation candidates fail not because of bad market direction bias, but due to opaque trailing drawdown traps, margin blindness, and unmanaged tail risks. Obsessed with market microstructure and statistical probability, we built Albireo—a zero-dependency quantitative suite and ECN trading terminal that equips traders with Monte Carlo stress-testing, live compliance auditing, and real-time margin risk gauges to master evaluation math and protect capital.",
  },
  phases: [
    {
      pill: "PHASE 01 // FOUNDATION",
      title: "Microstructure Analysis",
      description:
        "Spent years dissecting high-frequency tick streams, session ATR profiles, and order flow dynamics to identify structural edge.",
    },
    {
      pill: "PHASE 02 // RISK ENGINES",
      title: "Prop-Firm Math Auditing",
      description:
        "Developed 1,000-Iteration Monte Carlo bootstrap engines and compliance guardians to eliminate trailing drawdown failure.",
    },
    {
      pill: "PHASE 03 // ECN TERMINAL",
      title: "Albireo Global Platform",
      description:
        "Unified price streaming, candlestick indicator charting, risk management, and journaling in a single zero-latency cockpit.",
    },
  ],
} as const;
