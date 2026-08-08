/**
 * Tradeflow Global - Custom React Hook: useTradePositions
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Encapsulates trade position state management
 *   and order execution actions for UI consumption.
 */

import { useState, useEffect } from 'react';
import { Position, AccountSummary, TradeOrderRequest } from '@/types/tradeflow';
import { orderExecutionService } from '@/services/orderExecutionService';

export function useTradePositions() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [accountSummary, setAccountSummary] = useState<AccountSummary>(
    orderExecutionService.getAccountSummary()
  );
  const [history, setHistory] = useState<Position[]>([]);

  useEffect(() => {
    // Subscribe to position updates & PnL accounting
    const unsubscribePositions = orderExecutionService.subscribePositions((latestPositions) => {
      setPositions(latestPositions);
      setHistory(orderExecutionService.getHistory());
    });

    const unsubscribeAccount = orderExecutionService.subscribeAccountSummary((latestSummary) => {
      setAccountSummary(latestSummary);
    });

    return () => {
      unsubscribePositions();
      unsubscribeAccount();
    };
  }, []);

  const executeOrder = (request: TradeOrderRequest) => {
    return orderExecutionService.executeOrder(request);
  };

  const closePosition = (positionId: string) => {
    return orderExecutionService.closePosition(positionId);
  };

  return {
    positions,
    history,
    accountSummary,
    executeOrder,
    closePosition,
  };
}
