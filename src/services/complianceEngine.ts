/**
 * Tradeflow / Albireo - Prop-Firm Rule Compliance & Risk Guardian Engine
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Parses raw trade CSV logs, calculates
 *   High Water Marks (HWM), trailing drawdowns, daily loss thresholds, and consistency scores.
 */

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
   * Parses raw CSV text and evaluates prop-firm compliance constraints
   */
  public static analyzeTradeCSV(csvText: string, initialBalance: number = 100000): ComplianceReport {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) {
      return this.generateDefaultReport(initialBalance);
    }

    let currentBalance = initialBalance;
    let highWaterMark = initialBalance;
    let maxDrawdownDollar = 0;
    let maxDrawdownPercent = 0;
    let topTradeProfit = 0;
    let topTradeTicket = 'N/A';
    let totalGrossProfit = 0;

    const dailyLossMap: Map<string, number> = new Map();
    let parsedTradesCount = 0;

    // Process row by row
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map((cell) => cell.trim());
      if (row.length < 5) continue;

      const ticket = row[0] || `TRD-${i}`;
      const closeTimeStr = row[8] || row[1] || new Date().toISOString();
      const profit = parseFloat(row[row.length - 1]) || 0;

      parsedTradesCount++;
      currentBalance += profit;

      // Track High Water Mark & Trailing Drawdown
      if (currentBalance > highWaterMark) {
        highWaterMark = currentBalance;
      }
      const currentDrawdown = highWaterMark - currentBalance;
      if (currentDrawdown > maxDrawdownDollar) {
        maxDrawdownDollar = currentDrawdown;
        maxDrawdownPercent = (maxDrawdownDollar / highWaterMark) * 100;
      }

      // Track Gross Profit for Consistency Rule
      if (profit > 0) {
        totalGrossProfit += profit;
        if (profit > topTradeProfit) {
          topTradeProfit = profit;
          topTradeTicket = ticket;
        }
      }

      // Track Daily Loss Limits (UTC Date string YYYY-MM-DD)
      const dateKey = closeTimeStr.split('T')[0] || closeTimeStr.split(' ')[0] || 'Unknown Date';
      const existingDailyLoss = dailyLossMap.get(dateKey) || 0;
      dailyLossMap.set(dateKey, existingDailyLoss + profit);
    }

    // Evaluate Daily Loss Violations (5% threshold)
    let worstDailyLossDollar = 0;
    let worstDailyLossPercent = 0;
    let worstDailyDate = 'N/A';

    dailyLossMap.forEach((netDailyPnL, dateKey) => {
      if (netDailyPnL < 0 && Math.abs(netDailyPnL) > worstDailyLossDollar) {
        worstDailyLossDollar = Math.abs(netDailyPnL);
        worstDailyLossPercent = (worstDailyLossDollar / initialBalance) * 100;
        worstDailyDate = dateKey;
      }
    });

    const isDailyViolated = worstDailyLossPercent > 5.0;
    const isTrailingViolated = maxDrawdownPercent > 10.0;
    const topTradeShare = totalGrossProfit > 0 ? (topTradeProfit / totalGrossProfit) * 100 : 0;
    const isConsistencyViolated = topTradeShare > 30.0;

    const complianceStatus: 'PASSED' | 'VIOLATED' =
      isDailyViolated || isTrailingViolated ? 'VIOLATED' : 'PASSED';

    const recommendations: string[] = [];
    if (isDailyViolated) {
      recommendations.push(`Reduce maximum daily trade allocation; your worst daily loss reached ${worstDailyLossPercent.toFixed(2)}% on ${worstDailyDate}.`);
    }
    if (isTrailingViolated) {
      recommendations.push(`Tighten trailing stop losses; your maximum drawdown reached ${maxDrawdownPercent.toFixed(2)}% from peak high-water mark.`);
    }
    if (isConsistencyViolated) {
      recommendations.push(`Top trade #${topTradeTicket} generated ${topTradeShare.toFixed(1)}% of total profits. Diversify trade execution to pass consistency checks.`);
    }
    if (complianceStatus === 'PASSED') {
      recommendations.push('Account risk profile is fully compliant with institutional evaluation guidelines.');
    }

    return {
      complianceStatus,
      initialBalance,
      highWaterMark: parseFloat(highWaterMark.toFixed(2)),
      maxDailyLoss: {
        dollar: parseFloat(worstDailyLossDollar.toFixed(2)),
        percent: parseFloat(worstDailyLossPercent.toFixed(2)),
        date: worstDailyDate,
      },
      maxTrailingDrawdown: {
        dollar: parseFloat(maxDrawdownDollar.toFixed(2)),
        percent: parseFloat(maxDrawdownPercent.toFixed(2)),
      },
      consistencyScore: {
        passed: !isConsistencyViolated,
        topTradeSharePercent: parseFloat(topTradeShare.toFixed(1)),
        topTradeTicket,
      },
      actionableRecommendations: recommendations,
      parsedTradesCount,
    };
  }

  private static generateDefaultReport(initialBalance: number): ComplianceReport {
    return {
      complianceStatus: 'PASSED',
      initialBalance,
      highWaterMark: initialBalance,
      maxDailyLoss: { dollar: 0, percent: 0, date: 'N/A' },
      maxTrailingDrawdown: { dollar: 0, percent: 0 },
      consistencyScore: { passed: true, topTradeSharePercent: 0, topTradeTicket: 'N/A' },
      actionableRecommendations: ['Upload or paste a trade history CSV log to run live compliance audits.'],
      parsedTradesCount: 0,
    };
  }
}
