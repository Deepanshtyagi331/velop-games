/**
 * redemptionHistory.js
 * Persistence helpers for recent redemption transactions.
 */

const STORAGE_KEY = 'velop-redemption-history';

export function getRedemptionHistory() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordRedemption(reward) {
  if (typeof window === 'undefined') return [];

  try {
    const history = getRedemptionHistory();
    const entry = {
      id: `${reward.id}-${Date.now()}`,
      title: reward.title,
      cost: reward.gameCoinCost,
      unit: reward.unit,
      amount: reward.rewardAmount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [entry, ...history].slice(0, 5); // Keep last 5 transactions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
