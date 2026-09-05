import React, { useEffect, useRef } from 'react';
import { Coins, CheckCircle2, ArrowRight, X, Loader2 } from 'lucide-react';

/**
 * RedemptionModal Component
 * Accessible confirmation dialog calculating balance before and after deduction,
 * with synchronous double-click protection.
 */
export default function RedemptionModal({
  reward,
  currentCoins = 0,
  isProcessing = false,
  onConfirm,
  onCancel
}) {
  const modalRef = useRef(null);
  const cost = reward?.gameCoinCost || 0;
  const remainingCoins = Math.max(0, currentCoins - cost);
  const isTokenReward = reward?.type === 'token';

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isProcessing) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProcessing, onCancel]);

  if (!reward) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="redemption-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 12, 20, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 999,
        animation: 'fadeIn 200ms ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          onCancel();
        }
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#1a1d2e',
          borderRadius: '24px',
          padding: '28px 24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          aria-label="Close confirmation dialog"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header Badge */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)'
          }}
          aria-hidden="true"
        >
          <Coins size={30} />
        </div>

        {/* Title */}
        <div>
          <h2
            id="redemption-modal-title"
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}
          >
            Confirm Redemption
          </h2>
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: 1.4
            }}
          >
            You are about to redeem <strong style={{ color: '#ffffff' }}>{reward.title}</strong>.
          </p>
        </div>

        {/* Calculation Preview Deck */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#121422',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#94a3b8' }}>Current Game Coins:</span>
            <strong style={{ color: '#ffffff' }}>{currentCoins}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#f59e0b' }}>Redemption Cost:</span>
            <strong style={{ color: '#ef4444' }}>- {cost}</strong>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: 800
            }}
          >
            <span style={{ color: '#ffffff' }}>Remaining Game Coins:</span>
            <span style={{ color: '#10b981' }}>{remainingCoins} Coins</span>
          </div>
        </div>

        {/* Special Token Reward Callout */}
        {isTokenReward && (
          <div
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
          >
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>+20 Tokens will be credited to your game-entry balance instantly!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '15px',
              fontWeight: 800,
              cursor: isProcessing ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              opacity: isProcessing ? 0.75 : 1
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Redemption</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
