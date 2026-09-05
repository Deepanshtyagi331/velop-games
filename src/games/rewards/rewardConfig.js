/**
 * rewardConfig.js
 * Centralized deterministic Game Coin reward rules and round helpers for both playable games.
 */

export const REWARD_CONFIG = {
  // Coin Catcher Reward Tiers based on final score
  COIN_CATCHER: {
    TIER_1: { maxScore: 99, reward: 5 },
    TIER_2: { minScore: 100, maxScore: 249, reward: 10 },
    TIER_3: { minScore: 250, maxScore: 399, reward: 15 },
    TIER_4: { minScore: 400, reward: 20 }
  },

  // Memory Match Reward Tiers based on matched pairs & completion
  MEMORY_MATCH: {
    COMPLETED: 20, // All 8 pairs matched
    TIME_UP: {
      TIER_1: { minPairs: 6, maxPairs: 7, reward: 10 },
      TIER_2: { minPairs: 4, maxPairs: 5, reward: 7 },
      TIER_3: { minPairs: 2, maxPairs: 3, reward: 5 },
      TIER_4: { minPairs: 0, maxPairs: 1, reward: 2 }
    }
  },

  // Revive limits
  MAX_REVIVES_PER_ROUND: 1
};

/**
 * Calculates deterministic Game Coins earned for a Coin Catcher round.
 * @param {number} score
 * @returns {number} Game coins reward (5, 10, 15, or 20)
 */
export function calculateCoinCatcherReward(score) {
  const s = Math.max(0, Math.floor(score || 0));
  if (s >= 400) return REWARD_CONFIG.COIN_CATCHER.TIER_4.reward;
  if (s >= 250) return REWARD_CONFIG.COIN_CATCHER.TIER_3.reward;
  if (s >= 100) return REWARD_CONFIG.COIN_CATCHER.TIER_2.reward;
  return REWARD_CONFIG.COIN_CATCHER.TIER_1.reward;
}

/**
 * Calculates deterministic Game Coins earned for a Memory Match round.
 * @param {number} matchedPairs (0 to 8)
 * @param {boolean} isCompleted
 * @returns {number} Game coins reward
 */
export function calculateMemoryMatchReward(matchedPairs, isCompleted) {
  if (isCompleted || matchedPairs >= 8) {
    return REWARD_CONFIG.MEMORY_MATCH.COMPLETED;
  }

  const p = Math.max(0, Math.floor(matchedPairs || 0));
  if (p >= 6) return REWARD_CONFIG.MEMORY_MATCH.TIME_UP.TIER_1.reward;
  if (p >= 4) return REWARD_CONFIG.MEMORY_MATCH.TIME_UP.TIER_2.reward;
  if (p >= 2) return REWARD_CONFIG.MEMORY_MATCH.TIME_UP.TIER_3.reward;
  return REWARD_CONFIG.MEMORY_MATCH.TIME_UP.TIER_4.reward;
}

/**
 * Generates a unique round identifier for settlement idempotency.
 * @param {string} gameSlug
 * @returns {string} Unique round ID
 */
export function generateRoundId(gameSlug = 'game') {
  return `${gameSlug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default REWARD_CONFIG;
