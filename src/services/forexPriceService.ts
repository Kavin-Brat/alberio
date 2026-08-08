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
 * - Complete Defensive Cloning: Clones object references before handing them to subscribers or React state
 *   to permanently prevent React 19 / Turbopack Strict Mode read-only object mutation errors.
 */

import { CurrencyPairSymbol, ForexQuote, CandlestickBar } from '@/types/tradeflow';
import { CURRENCY_PAIR_SPECS } from '@/constants/tradeflow';

type QuoteCallback = (quotes: Map<CurrencyPairSymbol, ForexQuote>) => void;

class ForexPriceService {
  private static instance: ForexPriceService;

  private quotes: Map<CurrencyPairSymbol, ForexQuote> = new Map();
  private candleHistory: Map<CurrencyPairSymbol, CandlestickBar[]> = new Map();
  private quoteSubscribers: Set<QuoteCallback> = new Set();
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
   * Initializes institutional ECN base prices and tight spreads from centralized constants
   */
  private initializeDefaultQuotes(): void {
    const now = Date.now();
    CURRENCY_PAIR_SPECS.forEach((spec) => {
      const ask = parseFloat((spec.baseBid + spec.spreadPips * spec.pipStep).toFixed(spec.decimals));

      this.quotes.set(spec.symbol, {
        symbol: spec.symbol,
        bid: spec.baseBid,
        ask,
        spreadPips: spec.spreadPips,
        high24h: parseFloat((spec.baseBid * 1.0085).toFixed(spec.decimals)),
        low24h: parseFloat((spec.baseBid * 0.9915).toFixed(spec.decimals)),
        changePercent24h: +0.42,
        lastUpdated: now,
        priceDirection: 'SAME',
      });
    });
  }

  /**
   * Pre-populates historical candlestick bars for chart rendering
   */
  private initializeDefaultCandles(): void {
    const now = Date.now();

    CURRENCY_PAIR_SPECS.forEach((spec) => {
      const quote = this.quotes.get(spec.symbol)!;
      let currentPrice = quote.bid;
      const bars: CandlestickBar[] = [];

      for (let i = 30; i >= 0; i--) {
        const timestamp = now - i * 60 * 1000;
        const volatility = currentPrice * 0.0012;
        const open = currentPrice;
        const delta = (Math.random() - 0.49) * volatility;
        const close = parseFloat((open + delta).toFixed(spec.decimals));
        const high = parseFloat((Math.max(open, close) + Math.random() * volatility * 0.5).toFixed(spec.decimals));
        const low = parseFloat((Math.min(open, close) - Math.random() * volatility * 0.5).toFixed(spec.decimals));
        const volume = Math.floor(Math.random() * 800 + 200);

        bars.push({
          timestamp,
          timeLabel: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          open,
          high,
          low,
          close,
          volume,
          ema20: parseFloat((close * (1 + (Math.random() - 0.5) * 0.0005)).toFixed(spec.decimals)),
          ema50: parseFloat((close * (1 + (Math.random() - 0.5) * 0.001)).toFixed(spec.decimals)),
          rsi14: Math.floor(40 + Math.random() * 30),
        });

        currentPrice = close;
      }
      this.candleHistory.set(spec.symbol, bars);
    });
  }

  /**
   * High-frequency ECN price stream generator (1.2s tick interval)
   */
  private startPriceSimulationStream(): void {
    this.intervalId = setInterval(() => {
      const now = Date.now();

      CURRENCY_PAIR_SPECS.forEach((spec) => {
        const quote = this.quotes.get(spec.symbol);
        if (!quote) return;

        // Random micro-price movement using centralized pair specs
        const isCryptoGold = spec.symbol.includes('XAU') || spec.symbol.includes('BTC');
        const deltaPips = (Math.random() - 0.495) * (isCryptoGold ? 3 : 1.5);
        const newBidRaw = quote.bid + deltaPips * spec.pipStep;
        const newBid = parseFloat(newBidRaw.toFixed(spec.decimals));
        const newAsk = parseFloat((newBid + quote.spreadPips * spec.pipStep).toFixed(spec.decimals));

        const direction: 'UP' | 'DOWN' | 'SAME' =
          newBid > quote.bid ? 'UP' : newBid < quote.bid ? 'DOWN' : 'SAME';

        const updatedQuote: ForexQuote = {
          symbol: quote.symbol,
          bid: newBid,
          ask: newAsk,
          spreadPips: quote.spreadPips,
          high24h: Math.max(quote.high24h, newBid),
          low24h: Math.min(quote.low24h, newBid),
          changePercent24h: quote.changePercent24h,
          priceDirection: direction,
          lastUpdated: now,
        };

        this.quotes.set(spec.symbol, updatedQuote);
        this.updateLatestCandleBar(spec.symbol, newBid);
      });

      this.notifySubscribers();
    }, 1200);
  }

  /**
   * Appends or updates the active minute candlestick bar immutably
   */
  private updateLatestCandleBar(symbol: CurrencyPairSymbol, newPrice: number): void {
    const bars = this.candleHistory.get(symbol);
    if (!bars || bars.length === 0) return;

    const lastIndex = bars.length - 1;
    const lastBar = bars[lastIndex];

    const updatedBar: CandlestickBar = {
      timestamp: lastBar.timestamp,
      timeLabel: lastBar.timeLabel,
      open: lastBar.open,
      high: Math.max(lastBar.high, newPrice),
      low: Math.min(lastBar.low, newPrice),
      close: newPrice,
      volume: lastBar.volume + Math.floor(Math.random() * 5 + 1),
      ema20: lastBar.ema20,
      ema50: lastBar.ema50,
      rsi14: lastBar.rsi14,
    };

    const newBars = [...bars];
    newBars[lastIndex] = updatedBar;
    this.candleHistory.set(symbol, newBars);
  }

  /**
   * Observers notification dispatch with cloned quote objects
   */
  private notifySubscribers(): void {
    const subscriberMap = new Map<CurrencyPairSymbol, ForexQuote>();
    this.quotes.forEach((quote, sym) => {
      subscriberMap.set(sym, { ...quote });
    });
    this.quoteSubscribers.forEach((callback) => callback(subscriberMap));
  }

  // Public API Methods

  public subscribeQuotes(callback: QuoteCallback): () => void {
    this.quoteSubscribers.add(callback);
    const initialMap = new Map<CurrencyPairSymbol, ForexQuote>();
    this.quotes.forEach((quote, sym) => {
      initialMap.set(sym, { ...quote });
    });
    callback(initialMap);
    return () => this.quoteSubscribers.delete(callback);
  }

  public getQuote(symbol: CurrencyPairSymbol): ForexQuote | undefined {
    const q = this.quotes.get(symbol);
    return q ? { ...q } : undefined;
  }

  public getCandles(symbol: CurrencyPairSymbol): CandlestickBar[] {
    const bars = this.candleHistory.get(symbol) || [];
    return bars.map((bar) => ({ ...bar }));
  }
}

export const forexPriceService = ForexPriceService.getInstance();
