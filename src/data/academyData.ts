export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  type: "video" | "reading" | "exercise" | "quiz";
  summary: string;
  quizQuestions?: {
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  category: "Beginner" | "Intermediate" | "Prop Firm" | "Mastery";
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  priceINR: number;
  originalPriceINR: number;
  isFree: boolean;
  featured: boolean;
  badge?: string;
  rating: number;
  studentCount: number;
  durationHours: number;
  description: string;
  highlights: string[];
  modules: Module[];
  includes: string[];
}

export const ACADEMY_COURSES: Course[] = [
  {
    slug: "forex-basics-free",
    title: "Albireo Forex Basics: Free Introductory Course",
    tagline: "The 100% free foundation: What is Forex, pips, lots, leverage, margin, and stop loss math.",
    category: "Beginner",
    level: "Beginner",
    priceINR: 0,
    originalPriceINR: 999,
    isFree: true,
    featured: true,
    badge: "100% Free Level 1 Course",
    rating: 4.95,
    studentCount: 3420,
    durationHours: 6,
    description:
      "The official Level 1 entry point for Albireo traders. Learn currency pairs, bid/ask spread, pip calculations, margin required, and position sizing rules with interactive quizzes and a downloadable certificate upon completion.",
    highlights: [
      "Understand Base vs Quote Currency, Bid/Ask, and Pip values",
      "Calculate Lot Size and Stop Loss distance for any account size",
      "Interactive End-of-Module Quizzes with instant scoring",
      "Official Albireo Academy Certificate of Completion"
    ],
    includes: [
      "6 Hours of Free HD Video Lessons",
      "Interactive Knowledge Check Quizzes",
      "Downloadable Forex Math Reference Cheat Sheet",
      "Free Albireo Certificate of Completion"
    ],
    modules: [
      {
        id: "fb-m1",
        title: "Module 1: What is Forex & Market Basics",
        description: "Understanding currency pairs, bid/ask quotes, and spread mechanics.",
        lessons: [
          {
            id: "fb-l1",
            title: "1. What is Forex & How Currency Pairs Trade",
            duration: "15 min",
            isFreePreview: true,
            type: "video",
            summary: "Base currency, quote currency, EUR/USD, GBP/USD, and cross rates."
          },
          {
            id: "fb-l2",
            title: "2. Bid, Ask, Spread & ECN Quotes",
            duration: "18 min",
            isFreePreview: true,
            type: "reading",
            summary: "Why liquidity providers charge spread and how pips are calculated."
          },
          {
            id: "fb-l3",
            title: "3. Module 1 Knowledge Check Quiz",
            duration: "10 min",
            isFreePreview: true,
            type: "quiz",
            summary: "Test your understanding of currency pairs and bid/ask quotes.",
            quizQuestions: [
              {
                question: "In the pair EUR/USD = 1.0850, which is the base currency?",
                options: ["USD", "EUR", "Neither", "Both"],
                correctOptionIndex: 1,
                explanation: "EUR is the base currency (left). 1 EUR equals 1.0850 USD."
              },
              {
                question: "What is the 'Spread' in forex trading?",
                options: [
                  "The total account balance",
                  "The difference between Bid price and Ask price",
                  "The leverage multiplier",
                  "The stop loss distance"
                ],
                correctOptionIndex: 1,
                explanation: "Spread is the transaction cost difference between buying (Ask) and selling (Bid)."
              }
            ]
          }
        ]
      },
      {
        id: "fb-m2",
        title: "Module 2: Risk Management & Lot Sizing",
        description: "Mastering pips, lot sizes, margin required, and account survival.",
        lessons: [
          {
            id: "fb-l4",
            title: "4. What is a Pip & Lot Size Mathematics",
            duration: "22 min",
            isFreePreview: true,
            type: "video",
            summary: "Standard lot (100k), mini lot (10k), micro lot (1k) pip calculations."
          },
          {
            id: "fb-l5",
            title: "5. Position Sizing & Stop Loss Math",
            duration: "25 min",
            isFreePreview: true,
            type: "exercise",
            summary: "How to risk exactly 1% per trade regardless of stop loss distance."
          },
          {
            id: "fb-l6",
            title: "6. Module 2 Risk Management Quiz",
            duration: "10 min",
            isFreePreview: true,
            type: "quiz",
            summary: "Test your position sizing and pip math skills.",
            quizQuestions: [
              {
                question: "If your account is $10,000 and you risk 1%, what is your maximum dollar risk per trade?",
                options: ["$10", "$100", "$500", "$1,000"],
                correctOptionIndex: 1,
                explanation: "1% of $10,000 equals $100 maximum dollar risk."
              },
              {
                question: "Why should position size be adjusted when stop loss pips increase?",
                options: [
                  "To keep total dollar risk constant",
                  "To increase leverage",
                  "To make spread zero",
                  "It shouldn't be adjusted"
                ],
                correctOptionIndex: 0,
                explanation: "A wider stop loss requires a smaller lot size so total dollar risk remains capped."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "forex-foundations-30-day",
    title: "Albireo Forex Foundations: 30-Day Masterclass",
    tagline: "From absolute zero to calculating lot sizes, managing margin, and reading raw market structure.",
    category: "Beginner",
    level: "Beginner",
    priceINR: 999,
    originalPriceINR: 2499,
    isFree: false,
    featured: false,
    badge: "Transformation Course",
    rating: 4.9,
    studentCount: 1240,
    durationHours: 14,
    description:
      "A transformation-focused 30-day foundation built specifically for serious traders with practical assignments and position-sizing drills.",
    highlights: [
      "Master Pip, Lot Size, Spread & Margin math with zero confusion",
      "Understand Order Flow, Liquidity Pools & Market Structure",
      "Build a customized risk management strategy for long-term survival"
    ],
    includes: [
      "14 Hours of High-Definition Video Training",
      "30 Practical Trading Drills & Quizzes",
      "Certificate of Completion"
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Forex Market Microstructure",
        description: "Understand how currency markets trade, liquidity providers, and broker mechanics.",
        lessons: [
          { id: "l1", title: "1. What is Forex & Currency Pairs", duration: "15 min", isFreePreview: true, type: "video", summary: "Base currency vs quote currency, major/minor/exotic pairs." },
          { id: "l2", title: "2. Bid, Ask, Spread & ECN Pricing", duration: "18 min", isFreePreview: true, type: "video", summary: "How liquidity providers quote prices and calculate spread." },
          { id: "l3", title: "3. Pips, Points & Contract Sizes", duration: "22 min", isFreePreview: false, type: "reading", summary: "The mathematics of standard, mini, and micro lots." }
        ]
      }
    ]
  },
  {
    slug: "prop-firm-evaluation-mastery",
    title: "Prop Firm Evaluation Mastery",
    tagline: "Conquer static vs trailing drawdown rules, pass FTMO & Funding Pips, and maintain funded accounts.",
    category: "Prop Firm",
    level: "Intermediate",
    priceINR: 1999,
    originalPriceINR: 3999,
    isFree: false,
    featured: true,
    badge: "Highest Return on Investment",
    rating: 4.95,
    studentCount: 890,
    durationHours: 12,
    description:
      "Deconstruct trailing equity traps, daily drawdown math, and pass challenges systematically using Monte Carlo stress testing.",
    highlights: [
      "Deconstruct Trailing Equity, Trailing Balance & Static Drawdown math",
      "Model your probability of passing using 1,000-iteration Monte Carlo math"
    ],
    includes: [
      "Prop Firm Evaluation Planner Spreadsheet",
      "Monte Carlo Drawdown Simulator Access"
    ],
    modules: [
      {
        id: "pm1",
        title: "Module 1: Prop Firm Mathematics & Drawdown Traps",
        description: "Exposing the hidden math traps that liquidate 90% of challenge accounts.",
        lessons: [
          { id: "pl1", title: "1. Static vs Trailing Drawdown Models", duration: "30 min", isFreePreview: true, type: "video", summary: "Why trailing equity shrinks your safety buffer as you profit." }
        ]
      }
    ]
  }
];
