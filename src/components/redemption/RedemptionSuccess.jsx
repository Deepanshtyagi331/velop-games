import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Gamepad2, RotateCcw } from 'lucide-react';

/**
 * RedemptionSuccess Component
 * Displays confirmation details when a platform reward has been successfully claimed.
 */
export default function RedemptionSuccess({
  reward,
  remainingCoins = 0,
  onContinue
}) {
  const isTokenReward = reward?.type === 'token';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 12, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 999,
        animation: 'fadeIn 200ms ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#1a1d2e',
          borderRadius: '24px',
          padding: '32px 24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px'
        }}
      >
        {/* Success Check Badge */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
          }}
          aria-hidden="true"
        >
          <CheckCircle2 size={36} />
        </div>

        {/* Title */}
        <div>
          <h2
            id="success-modal-title"
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}
          >
            Reward Redeemed!
          </h2>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>
            Your redemption has been processed successfully.
          </span>
        </div>

        {/* Claimed Summary Box */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#121422',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
            Claimed Reward
          </div>
          <div style={{ fontSize: '26px', fontWeight: 900, color: '#10b981', lineHeight: 1.1 }}>
            +{reward?.rewardAmount} {reward?.unit}
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '4px',
              paddingTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px'
            }}
          >
            <span style={{ color: '#94a3b8' }}>Cost Deducted:</span>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>- {reward?.gameCoinCost} Coins</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px'
            }}
          >
            <span style={{ color: '#94a3b8' }}>Remaining Coins:</span>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>{remainingCoins} Coins</span>
          </div>

          {isTokenReward && (
            <div
              style={{
                marginTop: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                color: '#fbbf24',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              ★ Tokens have been added directly to your game balance!
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={onContinue}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
            }}
          >
            <RotateCcw size={17} />
            <span>Continue Redeeming</span>
          </button>

          <Link
            to="/games"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Gamepad2 size={16} />
            <span>Back to Games Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
