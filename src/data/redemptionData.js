/**
 * redemptionData.js
 * Data-driven catalog of platform rewards available for Game Coin redemption.
 */

export const REDEMPTION_REWARDS = [
  {
    id: 'reward-ve-10',
    title: '10 VE Points',
    type: 've',
    badge: 'Popular',
    icon: 'Flame',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    rewardAmount: 10,
    unit: 'VE',
    gameCoinCost: 25,
    description: 'Veloop Ecosystem Points used for tier ranking and seasonal milestone claims.'
  },
  {
    id: 'reward-sve-5',
    title: '5 SVE Points',
    type: 'sve',
    badge: 'Staking',
    icon: 'Shield',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    rewardAmount: 5,
    unit: 'SVE',
    gameCoinCost: 40,
    description: 'Staked Veloop Ecosystem Points yielding recurring weekly reward multipliers.'
  },
  {
    id: 'reward-gems-50',
    title: '50 Gems',
    type: 'gem',
    badge: 'Premium',
    icon: 'Gem',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.12)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    rewardAmount: 50,
    unit: 'Gems',
    gameCoinCost: 30,
    description: 'Premium currency for exclusive store cosmetics, boosters, and seasonal badges.'
  },
  {
    id: 'reward-tokens-20',
    title: '20 Game Tokens',
    type: 'token',
    badge: 'Convert',
    icon: 'Coins',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.16)',
    borderColor: '#f59e0b',
    rewardAmount: 20,
    unit: 'Tokens',
    gameCoinCost: 50,
    description: 'Instantly adds 20 Tokens back to your game balance to unlock more arcade runs.'
  },
  {
    id: 'reward-spins-3',
    title: '3 Lucky Spins',
    type: 'spin',
    badge: 'Bonus',
    icon: 'Sparkles',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    rewardAmount: 3,
    unit: 'Spins',
    gameCoinCost: 35,
    description: 'Claim 3 instant spins on the Lucky Wheel for jackpot multiplier chances.'
  }
];

export default REDEMPTION_REWARDS;
