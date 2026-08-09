import { UserProfile, RoadmapMilestone, GoalHierarchy, CompetitiveCompetitor } from "@/types/auth";

export const MOCK_USERS: UserProfile[] = [
  {
    id: "usr-kavin-ceo",
    name: "Kavin B Albireo",
    email: "kavin@albir.eo",
    role: "SUPER_ADMIN",
    joinedDate: "January 2026",
    subscriptionTier: "Staff Admin",
    entitlements: [
      "BASIC_TOOLS",
      "UNLIMITED_MONTE_CARLO",
      "TRAILING_EQUITY_SIMULATION",
      "HISTORICAL_COT_ALERTS",
      "UNLIMITED_JOURNAL",
      "SHARPE_SESSION_ANALYTICS",
      "PDF_RISK_REPORTS",
      "ACADEMY_PREMIUM_COURSES",
      "AI_RESEARCH_SUMMARIES",
      "PORTFOLIO_SIMULATOR",
      "ENTERPRISE_API",
      "WEALTH_ADVISORY",
      "VIP_TELEGRAM",
      "CEO_COMMAND_CENTER",
      "USER_MANAGEMENT"
    ],
    progress: {
      funnelLevel: 6, // Level 6 Capital/Wealth
      enrolledCourseSlug: "complete-trader-mastery-bundle",
      completedLessons: ["l1", "l2", "l3", "l4", "l5", "pl1", "pl2"],
      currentLessonId: "pl3",
      courseProgressPct: 100,
      quizScores: { "quiz-m1": 100, "quiz-m2": 95 },
      simulationsRun: 420,
      tradesLoggedCount: 148,
      capitalAmountINR: 10000000 // ₹1 Crore
    },
    riskProfile: "Aggressive",
    accountBalanceINR: 10000000
  },
  {
    id: "usr-alex-pro",
    name: "Alex Vance",
    email: "alex.trader@gmail.com",
    role: "PRO",
    joinedDate: "March 2026",
    subscriptionTier: "Pro Yearly",
    subscriptionExpiry: "2027-03-15",
    entitlements: [
      "BASIC_TOOLS",
      "UNLIMITED_MONTE_CARLO",
      "TRAILING_EQUITY_SIMULATION",
      "HISTORICAL_COT_ALERTS",
      "UNLIMITED_JOURNAL",
      "SHARPE_SESSION_ANALYTICS",
      "PDF_RISK_REPORTS",
      "ACADEMY_PREMIUM_COURSES",
      "AI_RESEARCH_SUMMARIES",
      "PORTFOLIO_SIMULATOR",
      "VIP_TELEGRAM"
    ],
    progress: {
      funnelLevel: 4, // Level 4 Pro Subscriber
      enrolledCourseSlug: "prop-firm-evaluation-mastery",
      completedLessons: ["pl1", "pl2"],
      currentLessonId: "pl3",
      courseProgressPct: 50,
      quizScores: { "quiz-pm1": 90 },
      simulationsRun: 85,
      tradesLoggedCount: 62,
      capitalAmountINR: 1000000 // ₹10 Lakhs
    },
    riskProfile: "Moderate",
    accountBalanceINR: 1000000
  },
  {
    id: "usr-sarah-student",
    name: "Sarah Jenkins",
    email: "sarah.learns@outlook.com",
    role: "COURSE_BASIC",
    joinedDate: "June 2026",
    subscriptionTier: "Free",
    entitlements: [
      "BASIC_TOOLS",
      "ACADEMY_PREMIUM_COURSES"
    ],
    progress: {
      funnelLevel: 2, // Level 2 Account / Free Course User
      enrolledCourseSlug: "forex-foundations-30-day",
      completedLessons: ["l1", "l2", "l3", "l4"],
      currentLessonId: "l5",
      courseProgressPct: 76,
      quizScores: { "quiz-m1": 85 },
      simulationsRun: 12,
      tradesLoggedCount: 18,
      capitalAmountINR: 200000 // ₹2 Lakhs
    },
    riskProfile: "Conservative",
    accountBalanceINR: 200000
  },
  {
    id: "usr-marcus-free",
    name: "Marcus Miller",
    email: "marcus.m@yahoo.com",
    role: "FREE",
    joinedDate: "August 2026",
    subscriptionTier: "Free",
    entitlements: [
      "BASIC_TOOLS"
    ],
    progress: {
      funnelLevel: 1, // Level 1 Free Visitor
      completedLessons: ["l1"],
      currentLessonId: "l2",
      courseProgressPct: 15,
      quizScores: {},
      simulationsRun: 3,
      tradesLoggedCount: 5,
      capitalAmountINR: 50000 // ₹50k
    },
    riskProfile: "Conservative",
    accountBalanceINR: 50000
  }
];

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: "m-2026",
    year: 2026,
    phase: "Phase 1: Foundation",
    title: "Albireo OS v1 & Core Platform Engine",
    description: "Launch Next.js App, Auth & Entitlements, Monte Carlo Risk Engine, Trade Journal, and CEO Command Center.",
    targetDate: "2026-12-31",
    status: "IN_PROGRESS",
    progressPct: 85,
    dependencies: ["Next.js App Router", "Tailwind v4", "Auth Context"],
    kpis: ["1,000 Registered Users", "100 Active Learners", "20 Paying Customers"],
    category: "Technology",
    deliverables: ["Platform Core Website", "Auth & Role Engine", "Monte Carlo Calculator", "CEO Command Center"]
  },
  {
    id: "m-2027",
    year: 2027,
    phase: "Phase 2: Education",
    title: "Albireo Academy & Learning Journey Engine",
    description: "Expand Academy with 100+ video modules, interactive quiz engine, certificates, and student learning dashboards.",
    targetDate: "2027-12-31",
    status: "PLANNED",
    progressPct: 20,
    dependencies: ["Phase 1 Foundation", "Video CDN", "Certificate Generator"],
    kpis: ["10,000 Registered Students", "500 Paid Course Enrollees", "₹5,00,000 Course Revenue"],
    category: "Education",
    deliverables: ["100+ Video Lessons", "Quiz & Certificate Engine", "Progress Tracking Dashboard", "Email Lead Magnet"]
  },
  {
    id: "m-2028",
    year: 2028,
    phase: "Phase 3: SaaS",
    title: "Albireo Pro Subscription Scale",
    description: "Deploy advanced trailing equity drawdown engine, historical COT alerts, AI research summaries, and unlimited journal analytics.",
    targetDate: "2028-12-31",
    status: "PLANNED",
    progressPct: 0,
    dependencies: ["Phase 2 Education", "Recurring Billing Gateway"],
    kpis: ["500 Paying Subscribers", "MRR ₹1,50,000", "Annual Recurring Revenue ₹18,00,000"],
    category: "SaaS",
    deliverables: ["Albireo Pro Tier", "Advanced Journal Analytics", "Historical COT Extreme Alerts", "PDF Risk Reports"]
  },
  {
    id: "m-2029",
    year: 2029,
    phase: "Phase 4: Intelligence",
    title: "Albireo Macro & Smart Money Intelligence",
    description: "Integrate institutional CFTC API feeds, macro economic sentiment models, and automated AI research summaries.",
    targetDate: "2029-12-31",
    status: "FUTURE",
    progressPct: 0,
    dependencies: ["CFTC Feed Integration", "LLM Market Summarizer"],
    kpis: ["2,000 Pro Subscribers", "Proprietary Macro Sentiment Index"],
    category: "Intelligence",
    deliverables: ["Market Data Feeds", "Macro & COT Sentiment Engine", "AI Research Generator", "Proprietary Risk Scores"]
  },
  {
    id: "m-2030",
    year: 2030,
    phase: "Phase 5: Quant Lab",
    title: "Quant Research & Strategy Backtesting Engine",
    description: "Launch systematic strategy backtesting engine, factor models, portfolio optimization, and risk attribution.",
    targetDate: "2030-12-31",
    status: "FUTURE",
    progressPct: 0,
    dependencies: ["Python Quant Bridge", "Tick Data Warehouse"],
    kpis: ["50 Institutional Desk Accounts", "Quant Backtesting Engine"],
    category: "Quant",
    deliverables: ["Strategy Backtester", "Portfolio Construction Engine", "Factor Models", "Risk Attribution Matrix"]
  },
  {
    id: "m-2031",
    year: 2031,
    phase: "Phase 6: Track Record",
    title: "Verified Strategy Track Record Auditing",
    description: "Build zero-trust cryptographic trade log verification for prop traders, hedge funds, and capital allocators.",
    targetDate: "2031-12-31",
    status: "FUTURE",
    progressPct: 0,
    dependencies: ["Cryptographic Proof Generator"],
    kpis: ["1,000 Verified Trader Profiles"],
    category: "Track Record",
    deliverables: ["Cryptographic Log Verifier", "Trader Track Record Profiles", "Audited Risk Scorecards"]
  },
  {
    id: "m-2032",
    year: 2032,
    phase: "Phase 7: Institutional",
    title: "Albireo Enterprise & Prop Firm Risk B2B",
    description: "Deploy enterprise trader risk monitoring dashboards and compliance APIs for prop firms and capital allocators.",
    targetDate: "2032-12-31",
    status: "FUTURE",
    progressPct: 0,
    dependencies: ["Enterprise API", "Multi-tenant Architecture"],
    kpis: ["20 Prop Firm Enterprise Clients", "MRR ₹15,00,000"],
    category: "Institutional",
    deliverables: ["Prop Firm Risk Cockpit", "Compliance Monitoring APIs", "Trader Exposure Dashboard"]
  },
  {
    id: "m-2034",
    year: 2034,
    phase: "Phase 8: Wealth",
    title: "Albireo Wealth & Regulated Capital Advisory",
    description: "Transition into a regulated wealth management & capital advisory desk for HNW investors with transparent AUM reporting.",
    targetDate: "2034-12-31",
    status: "FUTURE",
    progressPct: 0,
    dependencies: ["SEBI / Global Regulatory Licenses", "Legal Custody Architecture"],
    kpis: ["AUM ₹100 Crore", "100 HNW Clients"],
    category: "Wealth",
    deliverables: ["Regulated Advisory Desk", "HNW Portfolio Management", "AUM Reporting Engine", "Albireo Group Structure"]
  }
];

export const MOCK_GOAL_HIERARCHY: GoalHierarchy = {
  vision10Year: "Build the premier global trading intelligence, SaaS software, and wealth management ecosystem.",
  strategy5Year: "Dominate prop-firm analytics, scale Albireo Pro SaaS to 2,000+ subscribers, and launch Albireo Academy.",
  yearlyObjectives2026: [
    "Launch Albireo Platform v1 with Auth, User Cockpit, and CEO Command Center",
    "Acquire first 1,000 registered users and 20 Albireo Pro subscribers",
    "Release 30-Day Forex Foundations & Prop Firm Mastery courses"
  ],
  quarterlyOKRsQ1: [
    "Complete Albireo OS v1 Entitlements & Role Switcher",
    "Deploy Monte Carlo 1,000-iteration risk engine & PDF reporting",
    "Integrate Telegram community lead magnet funnel"
  ],
  monthlyProjectsAug: [
    "Build User Personal Dashboard (/dashboard)",
    "Build CEO Command Center & Admin OS (/admin)",
    "Finalize Verified Prop Firm affiliate comparison tables"
  ],
  weeklySprints: [
    "Implement AuthContext & MOCK_USERS state persistence",
    "Create RoleSwitcherBar dev component for instant role testing",
    "Verify clean Next.js 16 production build"
  ],
  dailyTasks: [
    { id: "task-1", title: "Complete AuthContext & Entitlements Engine", category: "Product", status: "DONE", priority: "HIGH", dueDate: "Today", assignee: "Kavin B" },
    { id: "task-2", title: "Build User Personal Cockpit (/dashboard)", category: "Product", status: "DONE", priority: "HIGH", dueDate: "Today", assignee: "Kavin B" },
    { id: "task-3", title: "Build CEO Command Center (/admin)", category: "Product", status: "DONE", priority: "HIGH", dueDate: "Today", assignee: "Kavin B" },
    { id: "task-4", title: "Review Telegram lead conversion funnel metrics", category: "Growth", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: "Tomorrow", assignee: "Kavin B" },
    { id: "task-5", title: "Outline Module 4 lessons for Forex Foundations", category: "Content", status: "TODO", priority: "MEDIUM", dueDate: "Aug 12", assignee: "Kavin B" }
  ]
};

export const COMPETITIVE_MATRIX: CompetitiveCompetitor[] = [
  {
    company: "BabyPips",
    strength: "Beginner Forex Education & School of Pipsology Funnel",
    albireoResponse: "Interactive Transformation Journey + Real-Time Monte Carlo Risk Engine & Tools"
  },
  {
    company: "Myfxbook",
    strength: "Trading Analytics, Account Verification & Broker Ecosystem",
    albireoResponse: "Integrated Working Environment + Capital Portfolio Risk & Wealth Builder"
  },
  {
    company: "Forex Factory",
    strength: "Market Calendar, News Ticker & Large Forum Community Traffic",
    albireoResponse: "Curated Zero-Noise Community + CFTC COT Smart Money Intelligence Layer"
  },
  {
    company: "TradingView",
    strength: "Browser Charting & PineScript Ecosystem",
    albireoResponse: "Infrastructure-Neutral Risk & Position Sizing Guardian (Integrates with any broker)"
  },
  {
    company: "Prop Firms (FTMO, Topstep)",
    strength: "Capital Funding & Evaluation Accounts",
    albireoResponse: "The Drawdown Math & Compliance Intelligence Guardian helping traders pass and survive"
  }
];
