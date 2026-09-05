import React from 'react';
import { Flame, Shield, Gem, Coins, Sparkles, ArrowRight } from 'lucide-react';

const ICON_REGISTRY = {
  Flame,
  Shield,
  Gem,
  Coins,
  Sparkles
};

/**
 * RewardCard Component
 * Premium dark-themed card rendering platform reward, Game Coin cost,
 * and dynamic affordability state.
 */
export default function RewardCard({
  reward,
  userGameCoins = 0,
  onRedeem
}) {
  const IconComponent = ICON_REGISTRY[reward.icon] || Sparkles;
  const isAffordable = userGameCoins >= reward.gameCoinCost;
  const neededCoins = reward.gameCoinCost - userGameCoins;

  return (
    <div
      className="reward-card"
      style={{
        backgroundColor: '#1a1d2e',
        borderRadius: '20px',
        border: `1px solid ${isAffordable ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        boxShadow: isAffordable ? '0 8px 24px rgba(0, 0, 0, 0.25)' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Row: Icon & Category Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: reward.bgColor,
            border: `1px solid ${reward.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: reward.color,
            boxShadow: `0 4px 14px ${reward.bgColor}`
          }}
          aria-hidden="true"
        >
          <IconComponent size={24} />
        </div>

        {reward.badge && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: isAffordable ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              color: isAffordable ? '#f59e0b' : '#94a3b8',
              border: `1px solid ${isAffordable ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            {reward.badge}
          </span>
        )}
      </div>

      {/* Reward Details */}
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.01em'
          }}
        >
          {reward.title}
        </h3>
        <p
          style={{
            margin: '8px 0 0 0',
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.45,
            minHeight: '38px'
          }}
        >
          {reward.description}
        </p>
      </div>

      {/* Cost & Redeem Trigger */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Cost Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
            Price:
          </span>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '9999px',
              backgroundColor: isAffordable ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isAffordable ? 'rgba(245, 158, 11, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
              color: isAffordable ? '#fbbf24' : '#64748b',
              fontWeight: 800,
              fontSize: '14px'
            }}
          >
            <Coins size={15} style={{ color: isAffordable ? '#f59e0b' : '#64748b' }} aria-hidden="true" />
            <span>{reward.gameCoinCost} Coins</span>
          </div>
        </div>

        {/* Redeem Button */}
        <button
          type="button"
          onClick={() => isAffordable && onRedeem(reward)}
          disabled={!isAffordable}
          aria-disabled={!isAffordable}
          style={{
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            borderRadius: '12px',
            background: isAffordable
              ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
              : 'rgba(255, 255, 255, 0.06)',
            color: isAffordable ? '#ffffff' : '#64748b',
            border: isAffordable ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: isAffordable ? 'pointer' : 'not-allowed',
            boxShadow: isAffordable ? '0 4px 14px rgba(245, 158, 11, 0.3)' : 'none',
            transition: 'transform 150ms ease, box-shadow 150ms ease'
          }}
        >
          <span>{isAffordable ? 'Redeem Reward' : `Need ${neededCoins} More`}</span>
          {isAffordable && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}
