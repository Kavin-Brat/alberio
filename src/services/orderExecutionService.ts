/**
 * Tradeflow Global - Order Execution & Risk Engine Service
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Responsible strictly for trade execution,
 *   margin validation, position management, and PnL accounting.
 * - Liskov Substitution Principle (LSP): Consistently calculates position outcomes regardless
 *   of order type or asset class.
 * - Immutability Guaranteed: Returns new position object copies on tick recalculations
 *   to prevent React read-only state mutation errors.
 */

import {
  CurrencyPairSymbol,
  TradeOrderRequest,
  Position,
  AccountSummary,
  ForexQuote,
} from '@/types/tradeflow';
import {
  DEFAULT_INITIAL_BALANCE,
  STANDARD_CONTRACT_SIZE,
  ECN_COMMISSION_PER_LOT,
} from '@/constants/tradeflow';
import { forexPriceService } from './forexPriceService';

type PositionsCallback = (positions: Position[]) => void;
type AccountSummaryCallback = (summary: AccountSummary) => void;

class OrderExecutionService {
  private static instance: OrderExecutionService;

  private positions: Position[] = [];
  private history: Position[] = [];
  private initialBalance: number = DEFAULT_INITIAL_BALANCE;
  private currentBalance: number = DEFAULT_INITIAL_BALANCE;

  private positionsSubscribers: Set<PositionsCallback> = new Set();
  private accountSubscribers: Set<AccountSummaryCallback> = new Set();

  private constructor() {
    // Listen to real-time price ticks to dynamically update unrealized PnL & margin
    forexPriceService.subscribeQuotes((quotes) => {
      this.recalculatePositions(quotes);
    });
  }

  public static getInstance(): OrderExecutionService {
    if (!OrderExecutionService.instance) {
      OrderExecutionService.instance = new OrderExecutionService();
    }
    return OrderExecutionService.instance;
  }

  /**
   * Executes a Buy/Sell Market Order Ticket
   */
  public executeOrder(request: TradeOrderRequest): { success: boolean; message: string; position?: Position } {
    const quote = forexPriceService.getQuote(request.symbol);
    if (!quote) {
      return { success: false, message: `Market quote unavailable for ${request.symbol}` };
    }

    const entryPrice = request.side === 'BUY' ? quote.ask : quote.bid;
    const notionalValue = request.volumeLots * STANDARD_CONTRACT_SIZE * entryPrice;
    const requiredMargin = notionalValue / request.leverage;

    const currentSummary = this.getAccountSummary();
    if (requiredMargin > currentSummary.freeMargin) {
      return { success: false, message: `Insufficient Free Margin! Required: $${requiredMargin.toFixed(2)}` };
    }

    const pipStep = request.symbol === 'USD/JPY' ? 0.01 : 0.0001;
    let stopLossPrice: number | undefined;
    let takeProfitPrice: number | undefined;

    if (request.stopLossPips) {
      stopLossPrice = request.side === 'BUY'
        ? entryPrice - request.stopLossPips * pipStep
        : entryPrice + request.stopLossPips * pipStep;
    }

    if (request.takeProfitPips) {
      takeProfitPrice = request.side === 'BUY'
        ? entryPrice + request.takeProfitPips * pipStep
        : entryPrice - request.takeProfitPips * pipStep;
    }

    const newPosition: Position = {
      id: `TRD-${Math.floor(100000 + Math.random() * 900000)}`,
      symbol: request.symbol,
      side: request.side,
      volumeLots: request.volumeLots,
      entryPrice,
      currentPrice: entryPrice,
      stopLossPrice: stopLossPrice ? parseFloat(stopLossPrice.toFixed(5)) : undefined,
      takeProfitPrice: takeProfitPrice ? parseFloat(takeProfitPrice.toFixed(5)) : undefined,
      unrealizedPnL: 0,
      realizedPnL: 0,
      marginUsed: parseFloat(requiredMargin.toFixed(2)),
      swapFee: 0,
      commission: parseFloat((request.volumeLots * ECN_COMMISSION_PER_LOT).toFixed(2)),
      openTime: Date.now(),
      status: 'OPEN',
    };

    this.positions = [...this.positions, newPosition];
    this.notifySubscribers();

    return {
      success: true,
      message: `Executed ${request.side} ${request.volumeLots} Lot(s) ${request.symbol} @ ${entryPrice}`,
      position: newPosition,
    };
  }

  /**
   * Closes an active open trade position immutably
   */
  public closePosition(positionId: string): { success: boolean; message: string } {
    const index = this.positions.findIndex((p) => p.id === positionId);
    if (index === -1) {
      return { success: false, message: 'Position not found' };
    }

    const targetPos = this.positions[index];
    const closedPos: Position = {
      ...targetPos,
      closeTime: Date.now(),
      status: 'CLOSED',
      realizedPnL: targetPos.unrealizedPnL - targetPos.commission,
    };

    this.currentBalance += closedPos.realizedPnL;
    this.history = [closedPos, ...this.history];
    this.positions = this.positions.filter((p) => p.id !== positionId);

    this.notifySubscribers();
    return {
      success: true,
      message: `Closed Position #${closedPos.id} (${closedPos.symbol}) with PnL: $${closedPos.realizedPnL.toFixed(2)}`,
    };
  }

  /**
   * Recalculates position PnL based on live tick updates immutably
   */
  private recalculatePositions(quotes: Map<CurrencyPairSymbol, ForexQuote>): void {
    if (this.positions.length === 0) return;

    this.positions = this.positions.map((pos) => {
      const quote = quotes.get(pos.symbol);
      if (!quote) return pos;

      const currentMark = pos.side === 'BUY' ? quote.bid : quote.ask;
      const priceDelta = pos.side === 'BUY'
        ? currentMark - pos.entryPrice
        : pos.entryPrice - currentMark;

      const unrealizedPnL = parseFloat((priceDelta * pos.volumeLots * STANDARD_CONTRACT_SIZE).toFixed(2));

      return {
        ...pos,
        currentPrice: currentMark,
        unrealizedPnL,
      };
    });

    this.notifySubscribers();
  }

  /**
   * Generates live Account Financial Summary
   */
  public getAccountSummary(): AccountSummary {
    const totalUnrealizedPnL = this.positions.reduce((acc, p) => acc + p.unrealizedPnL, 0);
    const totalMarginUsed = this.positions.reduce((acc, p) => acc + p.marginUsed, 0);
    const equity = this.currentBalance + totalUnrealizedPnL;
    const freeMargin = Math.max(0, equity - totalMarginUsed);
    const marginLevelPercent = totalMarginUsed > 0 ? (equity / totalMarginUsed) * 100 : 0;

    const winningTrades = this.history.filter((h) => h.realizedPnL > 0).length;
    const totalTrades = this.history.length;
    const winRatePercent = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
    const totalRealizedPnL = this.currentBalance - this.initialBalance;

    return {
      balance: parseFloat(this.currentBalance.toFixed(2)),
      equity: parseFloat(equity.toFixed(2)),
      marginUsed: parseFloat(totalMarginUsed.toFixed(2)),
      freeMargin: parseFloat(freeMargin.toFixed(2)),
      marginLevelPercent: parseFloat(marginLevelPercent.toFixed(1)),
      totalUnrealizedPnL: parseFloat(totalUnrealizedPnL.toFixed(2)),
      totalRealizedPnL: parseFloat(totalRealizedPnL.toFixed(2)),
      winRatePercent: parseFloat(winRatePercent.toFixed(1)),
      totalTradesExecuted: totalTrades,
    };
  }

  private notifySubscribers(): void {
    this.positionsSubscribers.forEach((cb) => cb([...this.positions]));
    this.accountSubscribers.forEach((cb) => cb(this.getAccountSummary()));
  }

  // Observer Subscriptions

  public subscribePositions(callback: PositionsCallback): () => void {
    this.positionsSubscribers.add(callback);
    callback([...this.positions]);
    return () => this.positionsSubscribers.delete(callback);
  }

  public subscribeAccountSummary(callback: AccountSummaryCallback): () => void {
    this.accountSubscribers.add(callback);
    callback(this.getAccountSummary());
    return () => this.accountSubscribers.delete(callback);
  }

  public getHistory(): Position[] {
    return [...this.history];
  }
}

export const orderExecutionService = OrderExecutionService.getInstance();
