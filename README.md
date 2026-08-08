# Tradeflow Global - Institutional Forex Trading Web Application

**Tradeflow Global** is a production-ready, highly modular, and fully responsive Forex Trading Web Application engineered for retail traders, quantitative funds, and prop firm scale.

---

## 1. Application Description & Features

Tradeflow Global delivers a high-speed, low-latency institutional trading terminal cockpit inside the web browser.

### Key Capabilities:
- **Real-Time ECN Price Streaming (`forexPriceService`)**: High-frequency price updates for major currency pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD, XAU/USD, BTC/USD) with dynamic bid/ask quotes, tight spreads, and price tick direction indicators.
- **Interactive Candlestick & Indicator Cockpit (`InteractiveChart`)**: Multi-timeframe visualizer (1M, 5M, 15M, 1H, 1D) with EMA 20, EMA 50, and Relative Strength Index (RSI 14) overlays.
- **Instant Order Execution Engine (`orderExecutionService`)**: Market and Pending Order processing with configurable lot sizes (0.01 to 10.0), financial leverage selection (1:30 up to 1:500), and automatic Stop Loss (SL) / Take Profit (TP) dollar risk calculators.
- **Real-Time Position & Margin Workspace (`PositionManager`)**: Active trade management table displaying floating PnL, margin utilization progress, one-click close execution, and trade history auditing.
- **Economic Calendar News Ticker (`EconomicCalendarWidget`)**: Real-time high-impact macroeconomic event feeds (NFP, CPI, FOMC decisions) with volatility impact ratings.

---

## 2. Problem Statement

Retail Forex traders and proprietary scaling firms face three critical industry bottlenecks:

1. **Opaque Margin & Leverage Trap**: Most trading web interfaces fail to provide real-time margin utilization feedback, causing traders to over-leverage accounts into liquidation during high volatility events.
2. **Disconnected Analytical Tooling**: Traders are forced to toggle between external charting platforms, risk spreadsheets, and order tickets, leading to delayed execution and costly slippage.
3. **High-Impact News Blindness**: Traded positions are often wiped out by unscheduled or unmonitored macroeconomic releases (NFP, Rate Decisions) due to lack of integrated event tracking inside the order execution ticket.

### How Tradeflow Global Solves These Bottlenecks:
- Integrates a real-time margin utilization progress bar directly into the **Order Entry Ticket**, preventing margin calls before orders are placed.
- Unifies real-time ECN price quotes, candlestick indicator charts, and trade execution into a single zero-latency cockpit.
- Embeds a live high-impact **Economic Calendar** alongside the execution ticket for immediate news risk awareness.

---

## 3. Business Model & Monetization Strategy

Tradeflow Global operates a multi-tiered B2C and B2B SaaS monetization model:

### Target User Segments:
- **Individual Retail Traders**: Active Forex, Commodities, and Crypto traders seeking institutional terminal execution.
- **Proprietary Trading Firms**: Account evaluation providers requiring custom risk-model white-labeling.
- **Quantitative Hedge Funds**: Algorithmic desks requiring real-time WebSocket market streams and execution logs.

### Monetization Channels:
1. **Tiered SaaS Subscriptions**:
   - *Starter*: Free tier with standard pairs and 1-minute delayed analytics.
   - *Pro Trader ($49/month)*: Zero-latency ECN feeds, unlimited custom indicators, and automated trade journaling.
   - *Institutional ($199/month)*: API access, raw liquidity order routing, and 500-iteration Monte Carlo risk simulations.
2. **Prop Firm White-Labeling**: Custom domain deployments and risk parameter customization for prop firms ($2,500/month setup + usage fees).
3. **Liquidity Provider Spread Revenue Share**: Micro-commissions ($1.50 per standard lot) generated on institutional ECN order routing.

---

## 4. Architectural & SOLID Principles Design

The codebase strictly adheres to **SOLID** software engineering principles:

- **Single Responsibility Principle (SRP)**:
  - `forexPriceService.ts`: Responsible exclusively for price tick streams and candle aggregation.
  - `orderExecutionService.ts`: Responsible exclusively for margin validation, trade execution, and account balance accounting.
  - `MarketWatch.tsx`, `InteractiveChart.tsx`, `OrderEntryTicket.tsx`: UI components each focus on a single user interaction domain.
- **Open/Closed Principle (OCP)**:
  - `forexPriceService` utilizes an Observer subscription pattern (`subscribeQuotes`), allowing new analytics widgets to register without modifying tick generator logic.
- **Liskov Substitution Principle (LSP)**:
  - All financial pairs (Forex, Metals, Crypto) implement identical `ForexQuote` and `Position` domain interfaces, enabling uniform position management.
- **Interface Segregation Principle (ISP)**:
  - React hooks (`useForexMarket`, `useTradePositions`) expose precise, decoupled state interfaces to components rather than bloated global state objects.
- **Dependency Inversion Principle (DIP)**:
  - UI components consume custom hooks and service abstractions rather than directly manipulating raw timer intervals or WebSocket instances.

---

## 5. Technology Stack & Installation

- **Framework**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4 (`@theme` design tokens), HSL color properties
- **Typography**: Google Fonts Sora (`font-sora`)
- **Charting Engine**: Recharts ComposedChart
- **Icons**: Lucide React

### Getting Started:
```bash
# Clone the repository
git clone https://github.com/tradeflow/tradeflow-global.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```
