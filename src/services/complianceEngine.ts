/**
 * Prop-Firm Rule Compliance & Risk Engine
 * 
 * Simple Explanation:
 * This file processes trade logs (CSV files) to calculate:
 * 1. Your account balance and peak balance (High Water Mark).
 * 2. Your biggest overall drawdown (loss from top peak).
 * 3. Your maximum loss in a single day.
 * 4. Your top trade profit share (30% consistency rule).
 */

// Simple TypeScript Interface (tells JavaScript what properties a ComplianceReport object has)
export interface ComplianceReport {
  complianceStatus: 'PASSED' | 'VIOLATED';
  initialBalance: number;
  highWaterMark: number;
  maxDailyLoss: { dollar: number; percent: number; date: string };
  maxTrailingDrawdown: { dollar: number; percent: number };
  consistencyScore: { passed: boolean; topTradeSharePercent: number; topTradeTicket: string };
  actionableRecommendations: string[];
  parsedTradesCount: number;
}

export class ComplianceEngine {
  /**
   * Reads raw trade CSV text and checks if the trader passed or violated prop-firm rules
   * 
   * @param csvText - The raw text content of the uploaded CSV file
   * @param initialBalance - The starting account balance (default: $100,000)
   */
  public static analyzeTradeCSV(csvText: string, initialBalance: number = 100000): ComplianceReport {
    // Split the CSV text into individual lines
    const lines = csvText.trim().split('\n');

    // If CSV is empty or only contains header line, return default safe report
    if (lines.length <= 1) {
      return this.generateDefaultReport(initialBalance);
    }

    // Initialize tracking variables (just like standard JavaScript)
    let currentBalance = initialBalance;
    let highWaterMark = initialBalance;
    let maxDrawdownDollar = 0;
    let maxDrawdownPercent = 0;
    let topTradeProfit = 0;
    let topTradeTicket = 'N/A';
    let totalGrossProfit = 0;

    // Track daily losses using date key (e.g. "2026-08-10")
    const dailyLossMap = new Map<string, number>();
    let parsedTradesCount = 0;

    // Loop through each trade row in the CSV file (starting from row 1 to skip header)
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map((cell) => cell.trim());
      if (row.length < 5) continue; // Skip invalid rows

      const ticket = row[0] || `TRD-${i}`;
      const closeTimeStr = row[8] || row[1] || new Date().toISOString();
      const profit = parseFloat(row[row.length - 1]) || 0;

      parsedTradesCount++;
      currentBalance += profit;

      // 1. Check if balance reached a new peak (High Water Mark)
      if (currentBalance > highWaterMark) {
        highWaterMark = currentBalance;
      }

      // 2. Calculate drawdown from the highest peak
      const currentDrawdown = highWaterMark - currentBalance;
      if (currentDrawdown > maxDrawdownDollar) {
        maxDrawdownDollar = currentDrawdown;
        maxDrawdownPercent = (maxDrawdownDollar / highWaterMark) * 100;
      }

      // 3. Track gross profit for consistency rule calculation
      if (profit > 0) {
        totalGrossProfit += profit;
        if (profit > topTradeProfit) {
          topTradeProfit = profit;
          topTradeTicket = ticket;
        }
      }

      // 4. Group losses by calendar date
      const dateKey = closeTimeStr.split('T')[0] || closeTimeStr.split(' ')[0] || 'Unknown';
      const existingDailyPnL = dailyLossMap.get(dateKey) || 0;
      dailyLossMap.set(dateKey, existingDailyPnL + profit);
    }

    // Find the worst single-day loss
    let maxDailyLossDollar = 0;
    let maxDailyLossDate = 'N/A';

    dailyLossMap.forEach((dailyPnL, date) => {
      if (dailyPnL < 0 && Math.abs(dailyPnL) > maxDailyLossDollar) {
        maxDailyLossDollar = Math.abs(dailyPnL);
        maxDailyLossDate = date;
      }
    });

    const maxDailyLossPercent = (maxDailyLossDollar / initialBalance) * 100;

    // Consistency Rule Check: A single trade should not account for more than 30% of total profit
    const topTradeSharePercent = totalGrossProfit > 0 ? (topTradeProfit / totalGrossProfit) * 100 : 0;
    const consistencyPassed = topTradeSharePercent <= 30;

    // Rule Breaches: 5% Max Daily Loss OR 10% Max Trailing Drawdown
    const dailyLossBreached = maxDailyLossPercent > 5;
    const trailingDrawdownBreached = maxDrawdownPercent > 10;
    const isViolated = dailyLossBreached || trailingDrawdownBreached || !consistencyPassed;

    // Generate beginner-friendly recommendations
    const actionableRecommendations: string[] = [];
    if (dailyLossBreached) {
      actionableRecommendations.push(
        `WARNING: Max daily loss threshold (5%) breached on ${maxDailyLossDate} ($${maxDailyLossDollar.toFixed(2)} loss). Use hard stop-loss limits.`
      );
    }
    if (trailingDrawdownBreached) {
      actionableRecommendations.push(
        `WARNING: Trailing drawdown limit (10%) breached ($${maxDrawdownDollar.toFixed(2)} total drawdown). Reduce lot size execution.`
      );
    }
    if (!consistencyPassed) {
      actionableRecommendations.push(
        `CONSISTENCY RISK: Top trade #${topTradeTicket} generated ${topTradeSharePercent.toFixed(1)}% of total profit (Max 30% allowed). Diversify trade setups.`
      );
    }
    if (actionableRecommendations.length === 0) {
      actionableRecommendations.push('EXCELLENT: Account is 100% compliant with prop-firm evaluation guidelines!');
    }

    return {
      complianceStatus: isViolated ? 'VIOLATED' : 'PASSED',
      initialBalance,
      highWaterMark,
      maxDailyLoss: {
        dollar: maxDailyLossDollar,
        percent: maxDailyLossPercent,
        date: maxDailyLossDate,
      },
      maxTrailingDrawdown: {
        dollar: maxDrawdownDollar,
        percent: maxDrawdownPercent,
      },
      consistencyScore: {
        passed: consistencyPassed,
        topTradeSharePercent,
        topTradeTicket,
      },
      actionableRecommendations,
      parsedTradesCount,
    };
  }

  /**
   * Generates a safe default report if no trade log CSV is uploaded
   */
  private static generateDefaultReport(initialBalance: number): ComplianceReport {
    return {
      complianceStatus: 'PASSED',
      initialBalance,
      highWaterMark: initialBalance,
      maxDailyLoss: { dollar: 0, percent: 0, date: 'N/A' },
      maxTrailingDrawdown: { dollar: 0, percent: 0 },
      consistencyScore: { passed: true, topTradeSharePercent: 0, topTradeTicket: 'N/A' },
      actionableRecommendations: ['Upload your MetaTrader or cTrader CSV trade log to run compliance audit.'],
      parsedTradesCount: 0,
    };
  }
}
