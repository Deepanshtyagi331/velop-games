import { useContext } from 'react';
import { EconomyContext } from '../context/economyContextInstance';

/**
 * useEconomy Hook
 * Access centralized Tokens and Game Coins balances, transactions, and guards.
 */
export function useEconomy() {
  const context = useContext(EconomyContext);

  if (!context) {
    throw new Error('useEconomy must be used within an EconomyProvider');
  }

  return context;
}

export default useEconomy;
