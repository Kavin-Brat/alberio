/**
 * Tradeflow Global - Custom React Hook: useForexMarket
 * 
 * SOLID Principles Applied:
 * - Interface Segregation Principle (ISP): Exposes a clean, decoupled market state hook
 *   so UI components don't deal with raw WebSocket or interval subscriptions directly.
 */

import { useState, useEffect } from 'react';
import { CurrencyPairSymbol, ForexQuote, CandlestickBar } from '@/types/tradeflow';
import { forexPriceService } from '@/services/forexPriceService';

export function useForexMarket(selectedSymbol: CurrencyPairSymbol = 'EUR/USD') {
  const [quotes, setQuotes] = useState<Map<CurrencyPairSymbol, ForexQuote>>(new Map());
  const [candles, setCandles] = useState<CandlestickBar[]>([]);

  useEffect(() => {
    // Subscribe to global price tick emissions
    const unsubscribe = forexPriceService.subscribeQuotes((latestQuotes) => {
      setQuotes(new Map(latestQuotes));
      setCandles([...forexPriceService.getCandles(selectedSymbol)]);
    });

    return () => unsubscribe();
  }, [selectedSymbol]);

  const activeQuote = quotes.get(selectedSymbol);

  return {
    quotes,
    activeQuote,
    candles,
    allSymbols: Array.from(quotes.keys()) as CurrencyPairSymbol[],
  };
}
