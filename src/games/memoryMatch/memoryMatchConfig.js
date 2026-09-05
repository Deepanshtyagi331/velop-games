/**
 * memoryMatchConfig.js
 * Centralized configuration, scoring parameters, and card symbols for Memory Match.
 */

export const MEMORY_MATCH_CONFIG = {
  // Grid parameters (4x4 = 16 cards, 8 matching pairs)
  GRID_COLS: 4,
  GRID_ROWS: 4,
  TOTAL_CARDS: 16,
  TOTAL_PAIRS: 8,

  // Timing
  GAME_DURATION: 60, // 60 seconds countdown
  MISMATCH_DELAY: 850, // Time in ms before mismatched cards flip back
  COUNTDOWN_SECONDS: 3, // 3-2-1-GO pre-game countdown

  // Scoring
  MATCH_SCORE: 20, // Base points awarded per matching pair
  COMBO_BONUS: 5, // Additional points per consecutive match level (e.g. combo 2 = +5, combo 3 = +10)

  // Local storage
  BEST_SCORE_STORAGE_KEY: 'velop-memory-match-best-score',

  // 8 Unique, Original Symbols
  SYMBOLS: [
    {
      id: 'star',
      name: 'Star',
      iconName: 'Star',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
    {
      id: 'gem',
      name: 'Gem',
      iconName: 'Gem',
      color: '#06b6d4',
      bgColor: '#ecfeff',
      borderColor: '#a5f3fc'
    },
    {
      id: 'crown',
      name: 'Crown',
      iconName: 'Crown',
      color: '#eab308',
      bgColor: '#fefce8',
      borderColor: '#fef08a'
    },
    {
      id: 'zap',
      name: 'Lightning',
      iconName: 'Zap',
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      borderColor: '#ddd6fe'
    },
    {
      id: 'flame',
      name: 'Flame',
      iconName: 'Flame',
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fecaca'
    },
    {
      id: 'moon',
      name: 'Moon',
      iconName: 'Moon',
      color: '#6366f1',
      bgColor: '#eef2ff',
      borderColor: '#c7d2fe'
    },
    {
      id: 'trophy',
      name: 'Trophy',
      iconName: 'Trophy',
      color: '#10b981',
      bgColor: '#ecfdf5',
      borderColor: '#a7f3d0'
    },
    {
      id: 'heart',
      name: 'Heart',
      iconName: 'Heart',
      color: '#ec4899',
      bgColor: '#fdf2f8',
      borderColor: '#fbcfe8'
    }
  ]
};

/**
 * Generate a fresh, shuffled 16-card deck (8 pairs)
 * Uses Fisher-Yates algorithm for fair, uniform randomization.
 */
export function generateShuffledDeck() {
  const cards = [];

  MEMORY_MATCH_CONFIG.SYMBOLS.forEach((symbol) => {
    // Each symbol has exactly 2 cards in the deck
    cards.push({
      id: `${symbol.id}-1`,
      symbolId: symbol.id,
      name: symbol.name,
      iconName: symbol.iconName,
      color: symbol.color,
      bgColor: symbol.bgColor,
      borderColor: symbol.borderColor,
      isFlipped: false,
      isMatched: false
    });
    cards.push({
      id: `${symbol.id}-2`,
      symbolId: symbol.id,
      name: symbol.name,
      iconName: symbol.iconName,
      color: symbol.color,
      bgColor: symbol.bgColor,
      borderColor: symbol.borderColor,
      isFlipped: false,
      isMatched: false
    });
  });

  // Fisher-Yates Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

/**
 * Safely retrieve the persisted best score from localStorage
 */
export function getStoredBestScore() {
  try {
    const raw = localStorage.getItem(MEMORY_MATCH_CONFIG.BEST_SCORE_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

/**
 * Persist a new high score to localStorage
 */
export function saveBestScore(newScore) {
  try {
    if (typeof newScore !== 'number' || !Number.isFinite(newScore) || newScore < 0) return;
    const currentBest = getStoredBestScore();
    if (newScore > currentBest) {
      localStorage.setItem(MEMORY_MATCH_CONFIG.BEST_SCORE_STORAGE_KEY, newScore.toString());
    }
  } catch {
    // Gracefully handle storage quota or private browsing exceptions
  }
}

export default MEMORY_MATCH_CONFIG;
