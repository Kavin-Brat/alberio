/**
 * Tradeflow Global - Centralized Application Constants
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Houses all immutable domain constants,
 *   financial leverage parameters, default ECN pair rates, and session definitions.
 * - Centralized Configuration: Eliminates hardcoded magic numbers across services and UI components.
 */

import { CurrencyPairSymbol } from '@/types/tradeflow';

/**
 * Default ECN Currency Pair Base Specifications
 */
export interface CurrencyPairSpec {
  symbol: CurrencyPairSymbol;
  baseBid: number;
  spreadPips: number;
  decimals: number;
  pipStep: number;
}

export const CURRENCY_PAIR_SPECS: CurrencyPairSpec[] = [
  { symbol: 'EUR/USD', baseBid: 1.08542, spreadPips: 0.4, decimals: 5, pipStep: 0.0001 },
  { symbol: 'GBP/USD', baseBid: 1.26895, spreadPips: 0.6, decimals: 5, pipStep: 0.0001 },
  { symbol: 'USD/JPY', baseBid: 154.625, spreadPips: 0.5, decimals: 3, pipStep: 0.01 },
  { symbol: 'AUD/USD', baseBid: 0.65820, spreadPips: 0.7, decimals: 5, pipStep: 0.0001 },
  { symbol: 'USD/CAD', baseBid: 1.36450, spreadPips: 0.8, decimals: 5, pipStep: 0.0001 },
  { symbol: 'XAU/USD', baseBid: 2432.80, spreadPips: 1.2, decimals: 2, pipStep: 0.1 },
  { symbol: 'BTC/USD', baseBid: 64250.0, spreadPips: 5.0, decimals: 2, pipStep: 0.1 },
];

/**
 * Financial Account & Risk Constants
 */
export const DEFAULT_INITIAL_BALANCE = 100000; // $100,000 Starting ECN Capital
export const STANDARD_CONTRACT_SIZE = 100000;  // 1 Standard Lot = 100,000 Units
export const ECN_COMMISSION_PER_LOT = 3.50;    // $3.50 per lot commission

/**
 * Leverage Options
 */
export interface LeverageOption {
  value: number;
  label: string;
}

export const LEVERAGE_OPTIONS: LeverageOption[] = [
  { value: 30, label: '1:30 (Retail)' },
  { value: 50, label: '1:50 (Standard)' },
  { value: 100, label: '1:100 (Pro)' },
  { value: 500, label: '1:500 (Max ECN)' },
];

/**
 * Technical Charting Timeframes
 */
export type TimeframeOption = '1M' | '5M' | '15M' | '1H' | '1D';
export const AVAILABLE_TIMEFRAMES: TimeframeOption[] = ['1M', '5M', '15M', '1H', '1D'];

/**
 * Global Forex Session Definitions (UTC)
 */
export const GLOBAL_FOREX_SESSIONS = [
  {
    sessionName: 'Tokyo (Asian)',
    utcHours: '00:00 - 08:00 UTC',
    averageAtrPips: 18.4,
    averageVolume: 4200,
    breakoutContinuationRatePercent: 32.5,
    optimalStrategy: 'Range Mean-Reversion / Grid Trading',
  },
  {
    sessionName: 'London (European)',
    utcHours: '08:00 - 16:00 UTC',
    averageAtrPips: 46.2,
    averageVolume: 12800,
    breakoutContinuationRatePercent: 68.4,
    optimalStrategy: 'Key Level Breakout Continuation',
  },
  {
    sessionName: 'Overlap (London/NY)',
    utcHours: '13:00 - 16:00 UTC',
    averageAtrPips: 62.8,
    averageVolume: 18500,
    breakoutContinuationRatePercent: 74.2,
    optimalStrategy: 'High-Volume Liquidity Momentum Engine',
  },
  {
    sessionName: 'New York (North American)',
    utcHours: '13:00 - 21:00 UTC',
    averageAtrPips: 52.1,
    averageVolume: 14200,
    breakoutContinuationRatePercent: 64.0,
    optimalStrategy: 'Trend Continuation & Reversal Fades',
  },
] as const;
