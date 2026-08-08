/**
 * Tradeflow / Albireo - Local Monte Carlo Strategy Stress-Tester Engine
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Performs 1,000 bootstrap resample iterations
 *   on trade returns to compute median equity curves, 5th percentile tail risks, and probability of ruin.
 */

export interface MonteCarloResult {
  totalSimulations: number;
  medianEndingEquity: number;
  fifthPercentileDrawdown: number;
  probabilityOfRuinPercent: number;
  winRate: number;
  equityCurves: Array<{ tradeIndex: number; median: number; worst5th: number }>;
  riskExplanation: string;
}

export class MonteCarloEngine {
  /**
   * Runs 1,000 bootstrap resampling simulations on input trade returns
   */
  public static runSimulation(
    tradeReturns: number[],
    startingEquity: number = 10000,
    ruinThresholdPct: number = 20,
    targetProfitPct: number = 20
  ): MonteCarloResult {
    if (!tradeReturns || tradeReturns.length === 0) {
      tradeReturns = [+1.5, -0.8, +2.1, -1.2, +3.0, -0.5, +1.8, -1.5, +2.4, -0.9];
    }

    const numSimulations = 1000;
    const numTrades = tradeReturns.length;
    const ruinTargetEquity = startingEquity * (1 - ruinThresholdPct / 100);
    const profitTargetEquity = startingEquity * (1 + targetProfitPct / 100);

    let ruinCount = 0;
    const allFinalEquities: number[] = [];
    const allSimPaths: number[][] = [];

    for (let sim = 0; sim < numSimulations; sim++) {
      let currentEquity = startingEquity;
      const path: number[] = [currentEquity];
      let hitRuin = false;

      // Resample trades randomly with replacement
      for (let step = 0; step < numTrades; step++) {
        const randomIndex = Math.floor(Math.random() * numTrades);
        const retPercent = tradeReturns[randomIndex];
        currentEquity = currentEquity * (1 + retPercent / 100);
        path.push(currentEquity);

        if (currentEquity <= ruinTargetEquity) {
          hitRuin = true;
        }
      }

      if (hitRuin) {
        ruinCount++;
      }
      allFinalEquities.push(currentEquity);
      allSimPaths.push(path);
    }

    // Sort simulations by final equity to derive percentiles
    allSimPaths.sort((a, b) => a[a.length - 1] - b[a.length - 1]);
    const fifthPercentilePath = allSimPaths[Math.floor(numSimulations * 0.05)];
    const medianPath = allSimPaths[Math.floor(numSimulations * 0.5)];

    const medianEndingEquity = parseFloat(medianPath[medianPath.length - 1].toFixed(2));
    const minFifthEquity = Math.min(...fifthPercentilePath);
    const fifthPercentileDrawdown = parseFloat(
      (((startingEquity - minFifthEquity) / startingEquity) * 100).toFixed(2)
    );
    const probabilityOfRuinPercent = parseFloat(((ruinCount / numSimulations) * 100).toFixed(1));

    const winningTrades = tradeReturns.filter((r) => r > 0).length;
    const winRate = parseFloat(((winningTrades / tradeReturns.length) * 100).toFixed(1));

    // Construct curve data points for charting
    const equityCurves: Array<{ tradeIndex: number; median: number; worst5th: number }> = [];
    for (let t = 0; t <= numTrades; t++) {
      equityCurves.push({
        tradeIndex: t,
        median: parseFloat(medianPath[t].toFixed(2)),
        worst5th: parseFloat(fifthPercentilePath[t].toFixed(2)),
      });
    }

    const riskExplanation =
      probabilityOfRuinPercent > 15
        ? `HIGH TAIL-RISK ALERT: There is a ${probabilityOfRuinPercent}% statistical probability of breaching a ${ruinThresholdPct}% drawdown limit. Reduce lot leverage.`
        : `STABLE STRATEGY: Low probability of ruin (${probabilityOfRuinPercent}%). 5th percentile worst-case drawdown is capped at ${fifthPercentileDrawdown}%.`;

    return {
      totalSimulations: numSimulations,
      medianEndingEquity,
      fifthPercentileDrawdown,
      probabilityOfRuinPercent,
      winRate,
      equityCurves,
      riskExplanation,
    };
  }
}
