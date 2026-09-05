/**
 * Coin Catcher — Centralized Gameplay Configuration
 * Pure deterministic constants and scaling parameters for Phase 8.
 */

export const COIN_CATCHER_CONFIG = {
  // Gameplay bounds
  GAME_DURATION: 60,       // 60 seconds session
  INITIAL_LIVES: 3,         // 3 lives (♥ ♥ ♥)

  // Scores
  COIN_SCORE: 10,           // Gold Coin points
  GEM_SCORE: 25,            // Star Gem points
  BOMB_DAMAGE: 1,           // Lives lost per hazard bomb hit

  // Virtual Canvas Dimensions (for uniform coordinate math across all screen sizes)
  VIRTUAL_WIDTH: 600,
  VIRTUAL_HEIGHT: 700,

  // Player Catcher dimensions and speed
  CATCHER: {
    WIDTH: 92,
    HEIGHT: 38,
    SPEED: 580,             // Virtual pixels per second
    BOTTOM_OFFSET: 32,      // Distance from canvas bottom
    COLOR: '#f59e0b',       // Primary gold
    BORDER_COLOR: '#d97706',
    ACCENT_COLOR: '#fbbf24'
  },

  // Falling object types and geometry
  OBJECT_TYPES: {
    COIN: {
      type: 'coin',
      radius: 16,
      score: 10,
      color: '#f59e0b',
      innerColor: '#fef3c7',
      glow: 'rgba(245, 158, 11, 0.4)'
    },
    GEM: {
      type: 'gem',
      radius: 18,
      score: 25,
      color: '#38bdf8',
      innerColor: '#e0f2fe',
      glow: 'rgba(56, 189, 248, 0.45)'
    },
    BOMB: {
      type: 'bomb',
      radius: 17,
      score: 0,
      damage: 1,
      color: '#334155',
      fuseColor: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.45)'
    }
  },

  // Difficulty scaling (interpolated from t=0s to t=60s)
  DIFFICULTY: {
    INITIAL_SPAWN_INTERVAL: 880,   // ms between spawns at start
    FINAL_SPAWN_INTERVAL: 420,     // ms between spawns at end
    INITIAL_FALL_SPEED: 220,       // px/sec at start
    FINAL_FALL_SPEED: 460,         // px/sec at end
    // Probabilities
    INITIAL_BOMB_CHANCE: 0.14,
    FINAL_BOMB_CHANCE: 0.32,
    GEM_CHANCE: 0.20               // 20% of collectible items are gems
  }
};

export default COIN_CATCHER_CONFIG;
