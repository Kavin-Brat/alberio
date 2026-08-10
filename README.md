# Albireo - Trading Intelligence & Prop-Firm ECN Terminal Platform

**Albireo** (`A L B I R E O`) is an institutional-grade, zero-dependency Trading Intelligence, Prop-Firm Analytics, and ECN Forex Terminal Platform built with **Next.js 16**, **React 19**, **TypeScript**, **PostgreSQL**, and **Tailwind CSS**.

---

## 1. Executive Summary & Application Vision

Albireo bridges the gap between complex quantitative financial modeling and retail trader execution. It provides serious traders, prop-firm evaluation candidates, and quantitative funds with a single unified workspace containing:

- **ECN Trading Terminal**: Real-time quote streaming, candlestick charts, and instant order execution.
- **Prop-Firm Compliance Guardian**: Automated CSV audit parser for High Water Marks, 5% daily loss limits, and 30% consistency rules.
- **Monte Carlo Strategy Stress-Tester**: 1,000-iteration bootstrap resampling engine computing tail-risk drawdowns and probability of ruin.
- **Session Volatility Matrix**: Microstructure volatility profiles across Tokyo, London, New York, and Overlap trading windows.
- **Cross-Asset Correlation Engine**: Pearson correlation matrices and macro decoupling alerts.

---

## 2. Server Execution & Terminal Live Log Guide

When running `npm run dev`, **both Frontend UI metrics and Backend Winston logs stream live together into the same terminal window**.

### Viewing Live Logs in the Terminal

Run `npm run dev` in your terminal:

```bash
npm run dev
```

In the single terminal output, you will see both streams:

```text
▲ Next.js 16.2.12 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.0.101:3000
✓ Ready in 1125ms

# 1. FRONTEND / NEXT.JS ROUTE & COMPILATION METRICS:
 GET /login 200 in 1512ms
 GET / 200 in 156ms
✓ Compiled in 151ms

# 2. BACKEND WINSTON STRUCTURED CONTROLLER & SERVICE LOGS:
[2026-08-10 19:55:47] INFO [AppRouter]: POST /api/auth/logout - IP: ::1
[2026-08-10 19:55:47] INFO [AuthService]: User logout requested for ID: usr-alex-pro
[2026-08-10 19:55:47] ERROR [AuthService]: Invalid email or account does not exist
 POST /api/auth/logout 200 in 91ms
```

### Log Stream Identification

| Log Prefix / Format | Source | Description |
| :--- | :--- | :--- |
| `GET /path 200 in ...` | **Next.js Dev Server** | Page rendering and HTTP request latency metrics. |
| `✓ Compiled in ...` | **Turbopack Compiler** | Hot-module replacement and compilation status. |
| `[YYYY-MM-DD HH:mm:ss] INFO [Component]` | **Backend Winston Logger** | Server router, IP tracking, controller execution, and service logic. |
| `[YYYY-MM-DD HH:mm:ss] ERROR [Component]` | **Backend Winston Error Boundary** | Joi payload validation, operational error trace, and DB failures. |

---

## 3. Server Execution Guide (Unified & Separate Modes)

### Option A: Unified Single-Script Execution (Recommended)
Next.js 16 hosts both the React 19 Frontend User Interface and the Express/Winston PostgreSQL Backend API Router on a single server instance:

```bash
# Runs both Frontend UI and Backend API Router together on http://localhost:3000
npm run dev
```

### Option B: Separate Frontend & Backend Execution
To test the Frontend UI and Backend API router as separate isolated dev servers:

```bash
# 1. Run Dedicated Frontend UI Dev Server (Port 3000)
npm run dev:frontend

# 2. Run Dedicated Backend API Router Dev Server (Port 3001)
npm run dev:backend
```

---

## 4. Architecture & Design Principles (SOLID)

The codebase strictly adheres to **SOLID Principles** and high engineering standards:

1. **Single Responsibility Principle (SRP)**:
   - Each component, service, and controller has a single focused responsibility.
   - Controllers handle HTTP validation and response wrapping (`authController`, `userController`, `roleController`).
   - Services execute domain logic (`authService`, `userService`, `roleService`, `menuService`).
   - Stores execute database persistence (`userStore`, `roleStore`, `postgres.ts`).

2. **Open/Closed Principle (OCP)**:
   - UI components (`Badge`, `Button`, `Card`, `GlassCard`) accept variant props and child extensions without mutating underlying implementation.

3. **Interface Segregation Principle (ISP)**:
   - All models and request payloads define explicit TypeScript interfaces (`UserProfile`, `ValidationSchema`, `AuthLoginResponse`, `RoleModel`).

4. **Dependency Inversion Principle (DIP)**:
   - Next.js API route handlers dispatch requests through `app.handleRequest`, abstracting security middleware, Winston logging, and centralized error conversion.

---

## 5. Security & Error Handling Infrastructure

- **Winston Structured JSON Logging**: All HTTP requests, IP context, and operational errors are logged with structured metadata to console stdout.
- **Joi Payload Validation**: Incoming `POST`, `PUT`, `PATCH`, and `GET` parameters pass through Joi validation schemas with `{ allowUnknown: true }` flexibility.
- **Helmet HTTP Security Headers**: `app.handleRequest` automatically injects `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, and `Strict-Transport-Security`.
- **Global Error Boundary**: `errorConverter` converts exceptions into standardized `ApiError` instances formatted in a clean `{ success: false, error: "..." }` JSON envelope.

---

## 6. License & Rights

© 2026 Albireo Financial Technologies Inc. All rights reserved.
