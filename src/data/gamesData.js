/**
 * VELOOP Rewards — 13-Game Catalog & Asset Architecture
 * Phase 3A Configuration
 * 
 * Catalog specification:
 * - Exactly 13 games
 * - 2 fully playable games (Coin Catcher, Memory Match)
 * - 11 banner-only games
 * - Strictly 20 tokens entry cost across all games
 * - Standardized asset path strategy (/assets/games/game-XX.avif)
 */

export const GAMES_DATA = [
  {
    id: 'game-01',
    title: 'Coin Catcher',
    slug: 'coin-catcher',
    image: '/assets/games/game-01.avif',
    tokenCost: 20,
    description: 'Catch falling Game Coins while evading dynamic obstacles in high-stakes arcade action.',
    route: '/games/coin-catcher',
    gameType: 'playable',
    category: 'Arcade',
    playableMetadata: {
      gameType: 'playable',
      controls: 'keyboard + pointer/touch',
      objective: 'catch falling coins while avoiding obstacles',
      gameplay: 'score-based gameplay'
    },
    visualIdentity: {
      theme: 'Treasure / rewards',
      primaryVisual: 'Game Coins',
      secondaryVisual: 'Gold accents, soft motion trails, reward chest/collection elements',
      mood: 'Energetic and rewarding',
      accentColor: '#f59e0b',
      accentGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 100%)',
      glowColor: 'rgba(245, 158, 11, 0.35)'
    },
    guide: {
      headline: 'Catch Gleaming Coins & Evade Hazards',
      objective: 'Collect falling Game Coins and bonus stars as they cascade from above while avoiding hazard bombs.',
      controlsList: [
        { key: '← / → or A / D', action: 'Move catcher basket left and right' },
        { key: 'Mouse / Touch', action: 'Drag or tap anywhere to slide smoothly' }
      ],
      catchItems: [
        { name: 'Gold Coin', points: '+10 Pts', note: 'Standard reward coin', type: 'positive' },
        { name: 'Star Gem', points: '+25 Pts', note: 'Rare speed multiplier', type: 'bonus' }
      ],
      avoidItems: [
        { name: 'Hazard Bomb', penalty: '-1 Life', note: '3 strikes ends the round', type: 'danger' }
      ],
      scoringInfo: 'Every 100 in-game points automatically converts into bonus Game Coins upon completion.',
      rewardPotential: 'Earn up to 15 Game Coins per session'
    }
  },
  {
    id: 'game-02',
    title: 'Memory Match',
    slug: 'memory-match',
    image: '/assets/games/game-02.avif',
    tokenCost: 20,
    description: 'Test your cognitive recall by matching pairs of illustrated reward cards before time expires.',
    route: '/games/memory-match',
    gameType: 'playable',
    category: 'Puzzle',
    playableMetadata: {
      gameType: 'playable',
      controls: 'pointer/touch',
      objective: 'match identical cards',
      gameplay: 'score/time-based gameplay'
    },
    visualIdentity: {
      theme: 'Elegant puzzle',
      primaryVisual: 'Premium illustrated memory cards',
      secondaryVisual: 'Subtle geometric/pattern elements',
      mood: 'Calm, intelligent, polished',
      accentColor: '#818cf8',
      accentGradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.22) 0%, rgba(99, 102, 241, 0.08) 100%)',
      glowColor: 'rgba(129, 140, 248, 0.35)'
    },
    guide: {
      headline: 'Match Illustrated Card Pairs Against The Clock',
      objective: 'Reveal face-down cards to discover and match all 8 matching pairs within 60 seconds.',
      controlsList: [
        { key: 'Click / Tap', action: 'Flip any card to reveal its illustrated face' }
      ],
      rulesList: [
        { rule: 'Flip Two Cards', detail: 'If they match, they stay locked face up.' },
        { rule: 'Mismatch Reset', detail: 'If they differ, both flip back over after 800ms.' },
        { rule: 'Combo Streaks', detail: 'Consecutive matches trigger score multipliers.' }
      ],
      scoringInfo: 'Scores are calculated based on remaining time, minimal moves, and combo accuracy.',
      rewardPotential: 'Earn up to 20 Game Coins per completed board'
    }
  },
  {
    id: 'game-03',
    title: 'Color Rush',
    slug: 'color-rush',
    image: '/assets/games/game-03.avif',
    tokenCost: 20,
    description: 'Match shifting spectrum lines at lightning speed to trigger rewarding score multipliers.',
    route: '/games/color-rush',
    gameType: 'banner',
    category: 'Reflex',
    visualIdentity: {
      theme: 'Color/reflex',
      primaryVisual: 'Prismatic color trails and light beams',
      secondaryVisual: 'Geometric reflex rings and speed streaks',
      mood: 'Fast and energetic'
    }
  },
  {
    id: 'game-04',
    title: 'Tile Tap',
    slug: 'tile-tap',
    image: '/assets/games/game-04.avif',
    tokenCost: 20,
    description: 'Rhythmic precision tapping on reactive glowing tiles without missing a single beat.',
    route: '/games/tile-tap',
    gameType: 'banner',
    category: 'Reflex',
    visualIdentity: {
      theme: 'Precision',
      primaryVisual: 'Minimalist rhythmic pulse tiles',
      secondaryVisual: 'Tap feedback ripples and tempo guides',
      mood: 'Clean and responsive'
    }
  },
  {
    id: 'game-05',
    title: 'Fruit Slice',
    slug: 'fruit-slice',
    image: '/assets/games/game-05.avif',
    tokenCost: 20,
    description: 'Slice through airborne cascades of fresh reward fruits with swift, stylish blade swipes.',
    route: '/games/fruit-slice',
    gameType: 'banner',
    category: 'Arcade',
    visualIdentity: {
      theme: 'Fruit arcade',
      primaryVisual: 'Stylized organic fruits in mid-air',
      secondaryVisual: 'Juice splash vectors and dynamic slice arcs',
      mood: 'Playful but premium'
    }
  },
  {
    id: 'game-06',
    title: 'Number Dash',
    slug: 'number-dash',
    image: '/assets/games/game-06.avif',
    tokenCost: 20,
    description: 'Rapid-fire math and numerical sequence challenges built for quick analytical thinkers.',
    route: '/games/number-dash',
    gameType: 'banner',
    category: 'Challenge',
    visualIdentity: {
      theme: 'Numbers/challenge',
      primaryVisual: 'High-speed numerical sequences and glowing digits',
      secondaryVisual: 'Speed lines and score multipliers',
      mood: 'Competitive and focused'
    }
  },
  {
    id: 'game-07',
    title: 'Bubble Pop',
    slug: 'bubble-pop',
    image: '/assets/games/game-07.avif',
    tokenCost: 20,
    description: 'Aim and pop floating clusters of luminous orbs to trigger satisfying chain reactions.',
    route: '/games/bubble-pop',
    gameType: 'banner',
    category: 'Arcade',
    visualIdentity: {
      theme: 'Bubbles',
      primaryVisual: 'Translucent iridescent spheres and floating orbs',
      secondaryVisual: 'Soft particle bursts and aquatic depths',
      mood: 'Light and satisfying'
    }
  },
  {
    id: 'game-08',
    title: 'Lucky Spin',
    slug: 'lucky-spin',
    image: '/assets/games/game-08.avif',
    tokenCost: 20,
    description: 'Spin the gleaming fortune wheel for opportunities to unlock bonus Game Coins and prizes.',
    route: '/games/lucky-spin',
    gameType: 'banner',
    category: 'Chance',
    visualIdentity: {
      theme: 'Fortune wheel',
      primaryVisual: 'Segmented gold-rimmed prize wheel',
      secondaryVisual: 'Sparkles, pointer flipper, glowing wedges',
      mood: 'Reward-focused and exciting'
    }
  },
  {
    id: 'game-09',
    title: 'Word Sprint',
    slug: 'word-sprint',
    image: '/assets/games/game-09.avif',
    tokenCost: 20,
    description: 'Race against the clock to connect anagram letters and assemble high-scoring vocabulary words.',
    route: '/games/word-sprint',
    gameType: 'banner',
    category: 'Word',
    visualIdentity: {
      theme: 'Typography/letters',
      primaryVisual: 'Dynamic typographic letter cubes and word grids',
      secondaryVisual: 'Connecting lexicon paths and timer gauge',
      mood: 'Smart and energetic'
    }
  },
  {
    id: 'game-10',
    title: 'Stack Master',
    slug: 'stack-master',
    image: '/assets/games/game-10.avif',
    tokenCost: 20,
    description: 'Stack floating architectural blocks with laser-sharp timing to construct sky-high towers.',
    route: '/games/stack-master',
    gameType: 'banner',
    category: 'Skill',
    visualIdentity: {
      theme: 'Stacking/building',
      primaryVisual: 'Precision architectural blocks and isometric tower',
      secondaryVisual: 'Alignment laser guidelines and physics dust',
      mood: 'Skillful and satisfying'
    }
  },
  {
    id: 'game-11',
    title: 'Target Hit',
    slug: 'target-hit',
    image: '/assets/games/game-11.avif',
    tokenCost: 20,
    description: 'Hone your precision aiming and hit moving bullseyes under intense countdown pressure.',
    route: '/games/target-hit',
    gameType: 'banner',
    category: 'Reflex',
    visualIdentity: {
      theme: 'Targets/accuracy',
      primaryVisual: 'Concentric precision bullseyes and reticle crosshairs',
      secondaryVisual: 'Target impact sparks and trajectory rings',
      mood: 'Focused and competitive'
    }
  },
  {
    id: 'game-12',
    title: 'Gem Collector',
    slug: 'gem-collector',
    image: '/assets/games/game-12.avif',
    tokenCost: 20,
    description: 'Harvest sparkling crystals and rare gemstones to amass wealth across cavernous mines.',
    route: '/games/gem-collector',
    gameType: 'banner',
    category: 'Collection',
    visualIdentity: {
      theme: 'Gems/treasure',
      primaryVisual: 'Faceted radiant gemstones and prismatic crystals',
      secondaryVisual: 'Cavern ambient glows and treasure vault chests',
      mood: 'Premium and rewarding'
    }
  },
  {
    id: 'game-13',
    title: 'Spin & Win',
    slug: 'spin-and-win',
    image: '/assets/games/game-13.avif',
    tokenCost: 20,
    description: 'A prestigious celebration wheel awarding premium token bonuses and exclusive multipliers.',
    route: '/games/spin-and-win',
    gameType: 'banner',
    category: 'Reward',
    visualIdentity: {
      theme: 'Rewards/wheel',
      primaryVisual: 'Grand VELOOP rewards radial dial and token medallions',
      secondaryVisual: 'Confetti bursts and multiplier badges',
      mood: 'Celebratory but sophisticated'
    }
  }
];

export default GAMES_DATA;
