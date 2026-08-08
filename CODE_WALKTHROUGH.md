# Albireo - Developer Code & Architectural Walkthrough

This document provides a comprehensive technical walkthrough for developers, detailing the software architecture, business logic requirements, package choices, service layers, hooks, and modular UI components implemented in **Albireo**.

---

## 1. Architectural Strategy & SOLID Principles Rationale

Albireo is engineered with a strict separation of concerns to maximize modularity, reusability, and testability.

### SOLID Principles Implementation:

- **Single Responsibility Principle (SRP)**:
  - Each module handles a single domain: `forexPriceService.ts` strictly manages price tick generation; `orderExecutionService.ts` strictly handles position execution and margin accounting; `complianceEngine.ts` parses CSV logs for prop-firm constraints.
  - UI components are broken down into child sub-components (e.g., `MarketWatchItem`, `LeverageGauge`, `PositionTableRow`).
- **Open/Closed Principle (OCP)**:
  - `forexPriceService` implements an Observer pattern (`subscribeQuotes`), allowing any number of UI widgets or analytical engines to subscribe to price updates without modifying the tick generator source code.
- **Liskov Substitution Principle (LSP)**:
  - Domain interfaces (`ForexQuote`, `Position`, `CandlestickBar`) are asset-agnostic, enabling Forex pairs, Gold, and Crypto to seamlessly pass through the execution and charting engines.
- **Interface Segregation Principle (ISP)**:
  - Custom React hooks (`useForexMarket`, `useTradePositions`) expose focused slices of state rather than a monolithic global store object.
- **Dependency Inversion Principle (DIP)**:
  - UI components depend on custom hook abstractions and service interfaces rather than raw `setInterval` timers or WebSocket sockets.

---

## 2. Packages & Dependencies Breakdown

| Package | Version | Purpose & Rationale |
| :--- | :--- | :--- |
| `next` | `16.2.12` | Core App Router framework providing static site generation (SSG) and Turbopack fast compilation. |
| `react` / `react-dom` | `19.2.4` | Component framework supporting React 19 concurrent features and strict mode immutability. |
| `typescript` | `^5.0.0` | Provides compile-time type safety across domain models and service contracts. |
| `recharts` | `^3.10.1` | Financial chart visualizer used for candlestick charts, EMA lines, RSI sub-panels, and Monte Carlo curves. |
| `framer-motion` | `^13.0.0` | Micro-interaction physics engine powering mobile drawers and fade-up keyframe transitions. |
| `lucide-react` | `^1.28.0` | Pixel-perfect icon library for terminal controls, order tickets, and status badges. |
| `tailwindcss` | `^4.0.0` | CSS utility architecture utilizing Tailwind v4 `@theme` tokens and HSL design custom properties. |
| `clsx` / `tailwind-merge` | `^2.1.1` | Utility function `cn(...)` in `src/lib/utils.ts` for safe conditional class name merging. |

---

## 3. Domain Models & Centralized Constants

### 3.1 Domain Types ([src/types/tradeflow.ts](file:///k:/Git%20Projects/alberio/src/types/tradeflow.ts))
- `CurrencyPairSymbol`: `'EUR/USD' | 'GBP/USD' | 'USD/JPY' | 'AUD/USD' | 'USD/CAD' | 'XAU/USD' | 'BTC/USD'`
- `ForexQuote`: Bid, Ask, Spread (pips), 24h High/Low, 24h Change %, Price Direction (`UP` | `DOWN` | `SAME`).
- `Position`: ID, Symbol, Side (`BUY` | `SELL`), Volume (Lots), Entry Price, Mark Price, Stop Loss, Take Profit, Unrealized PnL, Margin Used, Commission, Open/Close timestamps.
- `AccountSummary`: Balance, Equity, Margin Used, Free Margin, Margin Level %, Win Rate %, Total Trades.

### 3.2 Centralized Constants ([src/constants/tradeflow.ts](file:///k:/Git%20Projects/alberio/src/constants/tradeflow.ts))
- `DEFAULT_INITIAL_BALANCE`: `$100,000` starting ECN capital.
- `STANDARD_CONTRACT_SIZE`: `100,000` units per 1.0 Standard Lot.
- `ECN_COMMISSION_PER_LOT`: `$3.50` per lot execution fee.
- `CURRENCY_PAIR_SPECS`: Centralized pair definitions containing base bid prices, spreads, decimal precision, and pip steps.
- `LEVERAGE_OPTIONS`: `1:30`, `1:50`, `1:100`, `1:500`.

---

## 4. Service Layer Implementation & Business Logic

### 4.1 Real-Time Price Stream Service ([forexPriceService.ts](file:///k:/Git%20Projects/alberio/src/services/forexPriceService.ts))
- **Business Logic**: Simulates institutional ECN price ticks every 1.2 seconds. Computes bid/ask movement, direction flags (`UP`/`DOWN`), and updates the active minute candlestick bar immutably.
- **Key Method**: `updateLatestCandleBar(symbol, newPrice)` creates shallow copy objects (`{ ...lastBar, high: ..., low: ..., close: ... }`) to avoid mutating frozen React state objects.

### 4.2 Order Execution & Risk Engine ([orderExecutionService.ts](file:///k:/Git%20Projects/alberio/src/services/orderExecutionService.ts))
- **Business Logic**: Validates free margin before opening trades. Calculates required margin:
  $$\text{Margin Required} = \frac{\text{Volume (Lots)} \times 100,000 \times \text{Entry Price}}{\text{Leverage}}$$
- **Live Tick Recalculation**: Subscribes to `forexPriceService` quotes and immutably updates floating unrealized PnL on every tick:
  $$\text{Floating PnL (Buy)} = (\text{Mark Price} - \text{Entry Price}) \times \text{Volume (Lots)} \times 100,000$$

### 4.3 Prop-Firm Compliance Guardian ([complianceEngine.ts](file:///k:/Git%20Projects/alberio/src/services/complianceEngine.ts))
- **Business Logic**: Parses raw MT4/MT5 CSV trade logs. Reconstructs chronological equity curves, tracks High Water Mark (HWM), evaluates 5% UTC daily loss limits, and checks 30% consistency rules.

### 4.4 Monte Carlo Stress-Tester ([monteCarloEngine.ts](file:///k:/Git%20Projects/alberio/src/services/monteCarloEngine.ts))
- **Business Logic**: Runs 1,000 bootstrap resample iterations on trade return sequences. Derives median equity paths, worst 5th percentile tail-risk curves, and calculates Probability of Ruin (20% drawdown breach).

### 4.5 Session Volatility Matrix Engine ([sessionVolatilityEngine.ts](file:///k:/Git%20Projects/alberio/src/services/sessionVolatilityEngine.ts))
- **Business Logic**: Partitions market candles into UTC sessions (Tokyo: 00-08, London: 08-16, NY: 13-21, Overlap: 13-16), calculating ATR and breakout continuation rates.

### 4.6 Cross-Asset Correlation Engine ([correlationEngine.ts](file:///k:/Git%20Projects/alberio/src/services/correlationEngine.ts))
- **Business Logic**: Computes Pearson correlation coefficient $R_{X,Y}$ across asset return series:
  $$R_{X,Y} = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum (X_i - \bar{X})^2 \sum (Y_i - \bar{Y})^2}}$$

---

## 5. Custom Hooks Layer

- **`useForexMarket`** ([src/hooks/useForexMarket.ts](file:///k:/Git%20Projects/alberio/src/hooks/useForexMarket.ts)): Subscribes React components to `forexPriceService`, returning active quotes and candlestick bar histories.
- **`useTradePositions`** ([src/hooks/useTradePositions.ts](file:///k:/Git%20Projects/alberio/src/hooks/useTradePositions.ts)): Subscribes React components to `orderExecutionService`, returning open positions, trade history, and account summary metrics.

---

## 6. UI Component Layer & Modular Child Components

```
src/components/tradeflow/
├── TradingTerminal.tsx      # Main terminal cockpit container
├── MarketWatch.tsx          # Pair watchlist panel
├── MarketWatchItem.tsx      # Sub-component: Individual watchlist row item
├── InteractiveChart.tsx     # Recharts candlestick & indicator visualizer
├── OrderEntryTicket.tsx     # Execution ticket form
├── LeverageGauge.tsx        # Sub-component: Leverage dropdown & margin progress bar
├── PositionManager.tsx      # Open positions & history tabbed table
├── PositionTableRow.tsx     # Sub-component: Open trade table row with close trigger
└── EconomicCalendarWidget.tsx # Macroeconomic news event ticker
```

---

## 7. Application Pages & Route Architecture

1. **Homepage (`/`)** ([src/app/page.tsx](file:///k:/Git%20Projects/alberio/src/app/page.tsx)): Full-screen dark hero landing page, live Quick Drawdown Simulator preview, core architecture pillars, and founder's story.
2. **ECN Trading Terminal (`/terminal`)** ([src/app/terminal/page.tsx](file:///k:/Git%20Projects/alberio/src/app/terminal/page.tsx)): Full-page real-time trading cockpit.
3. **Quantitative Software Suite (`/tools`)** ([src/app/tools/page.tsx](file:///k:/Git%20Projects/alberio/src/app/tools/page.tsx)): Interactive suite featuring the Prop-Firm Compliance Guardian, Monte Carlo Stress-Tester, Session Volatility Matrix, and Pearson Correlation Matrix.
4. **Prop Firms Directory (`/prop-firms`)** ([src/app/prop-firms/page.tsx](file:///k:/Git%20Projects/alberio/src/app/prop-firms/page.tsx)): 50-trade Monte Carlo simulator and verified firm rules directory.
5. **Trade Journal (`/journal`)** ([src/app/journal/page.tsx](file:///k:/Git%20Projects/alberio/src/app/journal/page.tsx)): Quantitative trade logger and equity curve visualizer.
6. **COT Analyzer (`/tools/cot-analyzer`)** ([src/app/tools/cot-analyzer/page.tsx](file:///k:/Git%20Projects/alberio/src/app/tools/cot-analyzer/page.tsx)): Institutional CFTC sentiment tracking.
7. **Blog & Guides (`/blog`)** ([src/app/blog/page.tsx](file:///k:/Git%20Projects/alberio/src/app/blog/page.tsx)): Guides archive and position sizing risk calculator.
