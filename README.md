# Albireo - Business Requirements Document (BRD) & Platform Overview

**Albireo** (`A L B I R E O`) is an institutional-grade, zero-dependency Trading Intelligence, Prop-Firm Analytics, and ECN Forex Terminal Platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

---

## 1. Executive Summary & Application Vision

Albireo bridges the gap between complex quantitative financial modeling and retail trader execution. It provides serious traders, prop-firm evaluation candidates, and quantitative funds with a single unified workspace containing:

- **ECN Trading Terminal**: Real-time price streaming, candlestick charts, and instant market order execution.
- **Prop-Firm Compliance Guardian**: Automated CSV audit parser for High Water Marks, 5% daily loss limits, and 30% consistency rules.
- **Monte Carlo Strategy Stress-Tester**: 1,000-iteration bootstrap resampling engine computing tail-risk drawdowns and probability of ruin.
- **Session Volatility Matrix**: Microstructure volatility profiles across Tokyo, London, New York, and Overlap trading windows.
- **Cross-Asset Correlation Engine**: 5x5 Pearson correlation matrices and macro decoupling alerts.

---

### Our Organization Story
Albireo was born when our core engineering team realized that over 90% of prop-firm evaluation candidates fail not because of bad market direction bias, but due to opaque trailing drawdown traps, margin blindness, and unmanaged tail risks. Obsessed with market microstructure and statistical probability, we built Albireo—a zero-dependency quantitative suite and ECN trading terminal that equips traders with Monte Carlo stress-testing, live compliance auditing, and real-time margin risk gauges to master evaluation math and protect capital.

## 2. Problem Statement: Market Inefficiencies Solved

Retail Forex traders and prop-firm evaluation candidates face four major systemic hurdles:

1. **Opaque Trailing Drawdown Traps**: Over 90% of prop-firm candidates breach evaluation rules because trailing drawdown limits adjust upwards with floating profit peaks.
2. **Margin & Leverage Blindness**: Web trading interfaces fail to provide real-time margin utilization feedback, causing traders to over-leverage accounts into margin calls during high volatility.
3. **High-Impact News Blindness**: Positions are frequently wiped out during unscheduled economic releases (NFP, CPI, Rate Decisions) due to lack of integrated event tickers in the execution workflow.
4. **Fragmented Tooling**: Traders are forced to toggle between external charting platforms, risk spreadsheets, news feeds, and order tickets, introducing delayed execution and costly slippage.

### How Albireo Solves These Problems:
- **Pre-Evaluation Monte Carlo Modeling**: Simulates 500 to 1,000 account equity paths under trailing drawdown rules before traders spend money on firm evaluations.
- **Real-Time Margin Utilization Bar**: Integrated directly into the **Order Entry Ticket**, showing exact account margin consumption prior to trade placement.
- **Embedded Economic Calendar**: Live high-impact event tickers placed right next to the execution ticket.
- **Unified ECN Terminal Cockpit**: Unifies watchlist, candlestick indicator charts, order entry, and position management in a single zero-latency workspace.

---

## 3. Core Business Requirements (BRD) & Functional Features

| BRD Requirement ID | Feature Name | Description | User Benefit |
| :--- | :--- | :--- | :--- |
| **BRD-REQ-001** | Real-Time ECN Price Stream | High-frequency quote emission for EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD, XAU/USD, BTC/USD. | Zero-latency market awareness with tight institutional spreads. |
| **BRD-REQ-002** | Interactive Technical Chart | Multi-timeframe candlestick & line visualizer (1M–1D) with EMA 20, EMA 50, and RSI 14 indicators. | Real-time technical trend & momentum identification. |
| **BRD-REQ-003** | Order Execution & Margin Engine | Instant Buy/Sell order ticket with lot sizing (0.01–10.0), leverage (1:30–1:500), and SL/TP risk-reward calculator. | Prevents over-leverage margin calls and calculates exact dollar risk before entry. |
| **BRD-REQ-004** | Position & Equity Manager | Live open trade table displaying floating PnL, margin level %, and instant one-click trade closure. | Complete transparent control over account equity and risk. |
| **BRD-REQ-005** | Prop-Firm Risk Guardian | Raw CSV trade log parser calculating HWM, 5% daily loss limits, and 30% consistency rules. | Guarantees 100% compliance with prop firm rules before submitting accounts. |
| **BRD-REQ-006** | Monte Carlo Stress-Tester | 1,000-iteration resample engine estimating worst-case 5th percentile drawdown and probability of ruin. | Quantifies real strategy risk under black-swan market conditions. |
| **BRD-REQ-007** | Session Volatility Matrix | Partitioning candles by Tokyo, London, NY, and Overlap sessions to compute ATR and volume profiles. | Identifies optimal execution windows for breakout vs. mean-reversion strategies. |
| **BRD-REQ-008** | Cross-Asset Correlation Engine | Pearson matrix calculator flagging macro decoupling signals between EUR/USD, DXY, Gold, S&P 500, and BTC. | Detects macro regime shifts and hedge decoupling. |

---

## 4. User Benefits & Value Proposition

- **For Individual Retail Traders**: Eliminates guesswork by calculating exact dollar risk, position sizing, and margin consumption prior to trade entry.
- **For Prop-Firm Evaluation Candidates**: Guarantees account survival by stress-testing strategies against trailing drawdown traps and consistency rules.
- **For Quantitative Traders & Funds**: Access to clean, modular, zero-dependency statistical engines for session volatility, Monte Carlo resampling, and Pearson correlation matrices.

---

## 5. Non-Functional & Technical Requirements

- **Performance**: Sub-100ms render times for price tick updates; static page prerendering in under 4 seconds.
- **Responsiveness**: Mobile-first responsive fluid layout scaling from 360px mobile screens to ultra-wide 4K desktop monitors.
- **Code Quality & Architecture**: 100% SOLID principle compliance, centralized constants, child component isolation, and full TypeScript typing.
- **Immutability**: Zero direct object mutations to ensure compatibility with React 19 Strict Mode.

---

## 6. Business Model & Monetization Strategy

Albireo operates a multi-tiered B2C and B2B SaaS monetization framework:

1. **Retail SaaS Tiers**:
   - *Free Tier*: Access to basic charts, standard pairs, and drawdown simulator.
   - *Pro Trader ($49/month)*: Real-time ECN terminal, unlimited Monte Carlo simulations, and automated trade journaling.
   - *Institutional ($199/month)*: API data access, raw liquidity order routing, and custom risk parameters.
2. **B2B Prop-Firm White-Labeling**: Custom domain deployments and evaluation rule customization for prop-firm providers ($2,500/month setup + usage fees).
