/**
 * Tradeflow Global - Real-Time Forex Price Stream Service
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Responsible strictly for market price generation,
 *   tick emissions, and technical candle calculations.
 * - Open/Closed Principle (OCP): Designed with subscriber observer handlers so new market data
 *   consumers can register without modifying tick generator logic.
 * - Dependency Inversion Principle (DIP): Components depend on abstract quote state callbacks
 *   rather than raw internal interval timers.
 */

import { CurrencyPairSymbol, ForexQuote, CandlestickBar } from '@/types/tradeflow';

type QuoteCallback = (quotes: Map<CurrencyPairSymbol, ForexQuote>) => void;
type CandleCallback = (symbol: CurrencyPairSymbol, candles: CandlestickBar[]) => void;

class ForexPriceService {
  private static instance: ForexPriceService;

  private quotes: Map<CurrencyPairSymbol, ForexQuote> = new Map();
  private candleHistory: Map<CurrencyPairSymbol, CandlestickBar[]> = new Map();
  private quoteSubscribers: Set<QuoteCallback> = new Set();
  private candleSubscribers: Set<CandleCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeDefaultQuotes();
    this.initializeDefaultCandles();
    this.startPriceSimulationStream();
  }

  public static getInstance(): ForexPriceService {
    if (!ForexPriceService.instance) {
      ForexPriceService.instance = new ForexPriceService();
    }
    return ForexPriceService.instance;
  }

  /**
   * Initializes institutional ECN base prices and tight spreads
   */
  private initializeDefaultQuotes(): void {
    const basePairs: Array<{ symbol: CurrencyPairSymbol; baseBid: number; spread: number }> = [
      { symbol: 'EUR/USD', baseBid: 1.08542, spread: 0.4 },
      { symbol: 'GBP/USD', baseBid: 1.26895, spread: 0.6 },
      { symbol: 'USD/JPY', baseBid: 154.625, spread: 0.5 },
      { symbol: 'AUD/USD', baseBid: 0.65820, spread: 0.7 },
      { symbol: 'USD/CAD', baseBid: 1.36450, spread: 0.8 },
      { symbol: 'XAU/USD', baseBid: 2432.80, spread: 1.2 },
      { symbol: 'BTC/USD', baseBid: 64250.0, spread: 5.0 },
    ];

    const now = Date.now();
    basePairs.forEach(({ symbol, baseBid, spread }) => {
      const pipMultiplier = symbol === 'USD/JPY' ? 0.01 : symbol === 'XAU/USD' || symbol === 'BTC/USD' ? 0.1 : 0.0001;
      const ask = parseFloat((baseBid + spread * pipMultiplier).toFixed(symbol === 'USD/JPY' ? 3 : 5));

      this.quotes.set(symbol, {
        symbol,
        bid: baseBid,
        ask,
        spreadPips: spread,
        high24h: parseFloat((baseBid * 1.0085).toFixed(5)),
        low24h: parseFloat((baseBid * 0.9915).toFixed(5)),
        changePercent24h: +0.42,
        lastUpdated: now,
        priceDirection: 'SAME',
      });
    });
  }

  /**
   * Pre-populates 30 historical candlestick bars for chart rendering
   */
  private initializeDefaultCandles(): void {
    const symbols: CurrencyPairSymbol[] = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'XAU/USD', 'BTC/USD'];
    const now = Date.now();

    symbols.forEach((symbol) => {
      const quote = this.quotes.get(symbol)!;
      let currentPrice = quote.bid;
      const bars: CandlestickBar[] = [];

      for (let i = 30; i >= 0; i--) {
        const timestamp = now - i * 60 * 1000;
        const volatility = currentPrice * 0.0012;
        const open = currentPrice;
        const delta = (Math.random() - 0.49) * volatility;
        const close = parseFloat((open + delta).toFixed(5));
        const high = parseFloat((Math.max(open, close) + Math.random() * volatility * 0.5).toFixed(5));
        const low = parseFloat((Math.min(open, close) - Math.random() * volatility * 0.5).toFixed(5));
        const volume = Math.floor(Math.random() * 800 + 200);

        bars.push({
          timestamp,
          timeLabel: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          open,
          high,
          low,
          close,
          volume,
          ema20: parseFloat((close * (1 + (Math.random() - 0.5) * 0.0005)).toFixed(5)),
          ema50: parseFloat((close * (1 + (Math.random() - 0.5) * 0.001)).toFixed(5)),
          rsi14: Math.floor(40 + Math.random() * 30),
        });

        currentPrice = close;
      }
      this.candleHistory.set(symbol, bars);
    });
  }

  /**
   * High-frequency ECN price stream generator (1.2s tick interval)
   */
  private startPriceSimulationStream(): void {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const updatedPairs: CurrencyPairSymbol[] = [];

      this.quotes.forEach((quote, symbol) => {
        const isJpy = symbol === 'USD/JPY';
        const isCryptoGold = symbol === 'XAU/USD' || symbol === 'BTC/USD';
        const pipStep = isJpy ? 0.01 : isCryptoGold ? 0.2 : 0.0001;

        // Random micro-price movement
        const deltaPips = (Math.random() - 0.495) * (isCryptoGold ? 3 : 1.5);
        const newBidRaw = quote.bid + deltaPips * pipStep;
        const decimals = isJpy ? 3 : isCryptoGold ? 2 : 5;
        const newBid = parseFloat(newBidRaw.toFixed(decimals));
        const newAsk = parseFloat((newBid + quote.spreadPips * pipStep).toFixed(decimals));

        const direction: 'UP' | 'DOWN' | 'SAME' =
          newBid > quote.bid ? 'UP' : newBid < quote.bid ? 'DOWN' : 'SAME';

        const updatedQuote: ForexQuote = {
          ...quote,
          bid: newBid,
          ask: newAsk,
          high24h: Math.max(quote.high24h, newBid),
          low24h: Math.min(quote.low24h, newBid),
          priceDirection: direction,
          lastUpdated: now,
        };

        this.quotes.set(symbol, updatedQuote);
        this.updateLatestCandleBar(symbol, newBid);
        updatedPairs.push(symbol);
      });

      this.notifySubscribers();
    }, 1200);
  }

  /**
   * Appends or updates the active minute candlestick bar
   */
  private updateLatestCandleBar(symbol: CurrencyPairSymbol, newPrice: number): void {
    const bars = this.candleHistory.get(symbol);
    if (!bars || bars.length === 0) return;

    const lastBar = bars[bars.length - 1];
    lastBar.high = Math.max(lastBar.high, newPrice);
    lastBar.low = Math.min(lastBar.low, newPrice);
    lastBar.close = newPrice;
    lastBar.volume += Math.floor(Math.random() * 5 + 1);
  }

  /**
   * Observers notification dispatch
   */
  private notifySubscribers(): void {
    this.quoteSubscribers.forEach((callback) => callback(this.quotes));
  }

  // Public API Methods

  public subscribeQuotes(callback: QuoteCallback): () => void {
    this.quoteSubscribers.add(callback);
    callback(this.quotes);
    return () => this.quoteSubscribers.delete(callback);
  }

  public getQuote(symbol: CurrencyPairSymbol): ForexQuote | undefined {
    return this.quotes.get(symbol);
  }

  public getCandles(symbol: CurrencyPairSymbol): CandlestickBar[] {
    return this.candleHistory.get(symbol) || [];
  }
}

export const forexPriceService = ForexPriceService.getInstance();
