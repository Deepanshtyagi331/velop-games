import { useState, useEffect, useRef, useCallback } from 'react';
import { EconomyContext } from './economyContextInstance';

const STORAGE_KEY = 'velop-economy';
const DEFAULT_ECONOMY = {
  tokens: 100,
  gameCoins: 20
};

/**
 * Validates and safely extracts numeric economy balances.
 * Falls back to defaults if data is missing, malformed, or corrupt.
 */
function loadPersistedEconomy() {
  if (typeof window === 'undefined') return DEFAULT_ECONOMY;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ECONOMY;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_ECONOMY;

    const tokens = typeof parsed.tokens === 'number' && !isNaN(parsed.tokens) && parsed.tokens >= 0
      ? Math.floor(parsed.tokens)
      : DEFAULT_ECONOMY.tokens;

    const gameCoins = typeof parsed.gameCoins === 'number' && !isNaN(parsed.gameCoins) && parsed.gameCoins >= 0
      ? Math.floor(parsed.gameCoins)
      : DEFAULT_ECONOMY.gameCoins;

    return { tokens, gameCoins };
  } catch {
    // Malformed JSON or blocked storage
    return DEFAULT_ECONOMY;
  }
}

export function EconomyProvider({ children }) {
  const [economy, setEconomy] = useState(loadPersistedEconomy);
  const isTransactionLockedRef = useRef(false);

  // Sync balances to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(economy));
    } catch {
      // Storage quota or private mode restrictions
    }
  }, [economy]);

  /**
   * Evaluates if user can afford a specific game based on its tokenCost.
   * Dynamically inspects game.tokenCost without hardcoding 20.
   */
  const canAffordGame = useCallback((game) => {
    if (!game || typeof game.tokenCost !== 'number') return false;
    return economy.tokens >= game.tokenCost;
  }, [economy.tokens]);

  /**
   * Spends tokens with validation.
   * Prevents negative balances and rejects invalid amounts.
   */
  const spendTokens = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return { success: false, remaining: economy.tokens, error: 'Invalid token amount' };
    }

    const intAmount = Math.floor(amount);
    if (economy.tokens < intAmount) {
      return { success: false, remaining: economy.tokens, error: 'Insufficient tokens' };
    }

    const nextBalance = economy.tokens - intAmount;
    setEconomy((prev) => ({ ...prev, tokens: nextBalance }));
    return { success: true, remaining: nextBalance };
  }, [economy.tokens]);

  /**
   * Adds game coins earned from gameplay or rewards.
   */
  const addGameCoins = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return { success: false, total: economy.gameCoins, error: 'Invalid coin amount' };
    }

    const intAmount = Math.floor(amount);
    const nextCoins = economy.gameCoins + intAmount;
    setEconomy((prev) => ({ ...prev, gameCoins: nextCoins }));
    return { success: true, total: nextCoins };
  }, [economy.gameCoins]);

  /**
   * Spends game coins (e.g. for redemption or revives).
   */
  const spendGameCoins = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return { success: false, remaining: economy.gameCoins, error: 'Invalid coin amount' };
    }

    const intAmount = Math.floor(amount);
    if (economy.gameCoins < intAmount) {
      return { success: false, remaining: economy.gameCoins, error: 'Insufficient game coins' };
    }

    const nextCoins = economy.gameCoins - intAmount;
    setEconomy((prev) => ({ ...prev, gameCoins: nextCoins }));
    return { success: true, remaining: nextCoins };
  }, [economy.gameCoins]);

  /**
   * Handles game launch transaction with double-spend lock protection.
   * Deducts tokens only once even if clicked repeatedly in rapid succession.
   */
  const startGame = useCallback((game) => {
    if (isTransactionLockedRef.current) {
      return { success: false, error: 'Transaction in progress' };
    }

    if (!game || typeof game.tokenCost !== 'number') {
      return { success: false, error: 'Invalid game configuration' };
    }

    if (economy.tokens < game.tokenCost) {
      return { success: false, error: `Requires ${game.tokenCost} tokens. You have ${economy.tokens}.` };
    }

    // Acquire lock
    isTransactionLockedRef.current = true;

    // Deduct tokens
    setEconomy((prev) => ({
      ...prev,
      tokens: prev.tokens - game.tokenCost
    }));

    // Release lock after transaction window
    setTimeout(() => {
      isTransactionLockedRef.current = false;
    }, 600);

    return { success: true, route: game.route };
  }, [economy.tokens]);

  /**
   * Resets local economy to default prototype values (100 tokens, 20 coins).
   */
  const resetEconomy = useCallback(() => {
    setEconomy(DEFAULT_ECONOMY);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ECONOMY));
    } catch {
      // Ignored
    }
  }, []);

  const contextValue = {
    tokens: economy.tokens,
    gameCoins: economy.gameCoins,
    canAffordGame,
    spendTokens,
    addGameCoins,
    spendGameCoins,
    startGame,
    resetEconomy
  };

  return (
    <EconomyContext.Provider value={contextValue}>
      {children}
    </EconomyContext.Provider>
  );
}
