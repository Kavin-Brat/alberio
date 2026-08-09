export interface PlanFeature {
  text: string;
  free: boolean;
  pro: boolean;
}

export const PRO_FEATURES_COMPARISON: PlanFeature[] = [
  { text: "Quick Drawdown Simulator (Basic params)", free: true, pro: true },
  { text: "Monte Carlo Iterations", free: false, pro: true }, // Free = 500, Pro = 5,000+
  { text: "Trailing Equity vs Trailing Balance Simulation", free: false, pro: true },
  { text: "Custom Prop Firm Rules Engine (FTMO, Topstep, Funding Pips)", free: true, pro: true },
  { text: "Risk of Ruin & Losing-Streak Probability Analysis", free: false, pro: true },
  { text: "Downloadable PDF & CSV Risk Reports", free: false, pro: true },
  { text: "CFTC Weekly COT Sentiment Overview", free: true, pro: true },
  { text: "COT Historical Positioning & Extreme Alerts", free: false, pro: true },
  { text: "Trade Journal Max Monthly Logging", free: true, pro: true }, // Free = 50, Pro = Unlimited
  { text: "Sharpe Ratio, Expectancy & Session Volatility Analytics", free: false, pro: true },
  { text: "Psychology & Behavioral Strategy Tags", free: false, pro: true },
  { text: "Saved Trade Scenarios & Risk Profiles", free: false, pro: true },
  { text: "VIP Telegram Drawdown Alerts & Intelligence Channel", free: false, pro: true }
];

export const STARTER_PACK_ITEMS = [
  { title: "Forex Math & Pip Value Cheat Sheet", desc: "Quick reference card for standard, mini, micro lot values across 10 major pairs." },
  { title: "Position Sizing Excel & Google Sheet Model", desc: "Automated spreadsheet with dynamic account balance risk input & lot calculator." },
  { title: "Prop Firm Evaluation Risk Planner", desc: "Custom calculator to map step 1 & step 2 daily loss safety buffers." },
  { title: "Trading Journal Notion & Excel Template", desc: "Pre-formatted trade logger with R:R tracking, session tags, and PnL metrics." },
  { title: "Daily Risk Management & Pre-Market Checklist", desc: "10-point checklist to eliminate FOMO and revenge trading before opening terminal." },
  { title: "Trading Plan Blueprint Document", desc: "Fill-in-the-blank professional trading plan to define entry rules, exit rules, and risk caps." }
];
