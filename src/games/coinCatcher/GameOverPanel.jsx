import { Link } from 'react-router-dom';
import { Trophy, RotateCcw, ArrowLeft, Coins, Sparkles, AlertOctagon, Clock } from 'lucide-react';

/**
 * GameOverPanel Component
 * Polished light-themed game completion modal displaying final score,
 * breakdown of collected items and hazards, and replay actions.
 */
export default function GameOverPanel({
  score = 0,
  reason = 'completed',
  stats = { coins: 0, gems: 0, bombs: 0, time: 60 },
  earnedCoins = 0,
  currentCoins = 0,
  onPlayAgain
}) {
  const isOutOfLives = reason === 'out_of_lives';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gameover-title"
      className="animate-fade-in"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(241, 245, 249, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        zIndex: 50
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.15)',
          padding: 'var(--space-8) var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-5)'
        }}
      >
        {/* Header Badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '9999px',
              backgroundColor: isOutOfLives ? '#fee2e2' : '#fef3c7',
              border: `2px solid ${isOutOfLives ? '#fca5a5' : '#fde68a'}`,
              color: isOutOfLives ? '#dc2626' : '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)'
            }}
            aria-hidden="true"
          >
            {isOutOfLives ? <AlertOctagon size={28} /> : <Trophy size={28} />}
          </div>

          <h2
            id="gameover-title"
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em'
            }}
          >
            {isOutOfLives ? 'GAME OVER' : 'ROUND COMPLETE!'}
          </h2>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
            {isOutOfLives ? 'Round concluded.' : 'You survived the full 60 seconds!'}
          </span>
        </div>

        {/* Final Score & Reward Banners */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}
        >
          {/* Final Score Feature Box */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Final Score
            </span>
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
              {score}
            </span>
          </div>

          {/* Reward Earned Box */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Reward Earned
            </span>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#d97706', lineHeight: 1.1 }}>
              +{earnedCoins}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#92400e' }}>
              Game Coins
            </span>
          </div>
        </div>

        {/* Centralized Balance Feedback */}
        <div
          style={{
            width: '100%',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#eef2ff',
            border: '1px solid #c7d2fe',
            color: '#4338ca',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>Total Game Coin Balance:</span>
          <strong style={{ fontSize: '15px', color: '#312e81' }}>{currentCoins} Coins</strong>
        </div>

        {/* Statistics Grid */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}
        >
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
              <Coins size={15} style={{ color: '#f59e0b' }} />
              <span>Coins</span>
            </div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>{stats.coins}</strong>
          </div>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
              <Sparkles size={15} style={{ color: '#38bdf8' }} />
              <span>Gems</span>
            </div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>{stats.gems}</strong>
          </div>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
              <AlertOctagon size={15} style={{ color: '#ef4444' }} />
              <span>Bombs</span>
            </div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>{stats.bombs}</strong>
          </div>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
              <Clock size={15} style={{ color: '#64748b' }} />
              <span>Survived</span>
            </div>
            <strong style={{ color: '#0f172a', fontSize: '15px' }}>{stats.time}s</strong>
          </div>
        </div>

        {/* Replay Actions */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={onPlayAgain}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
            }}
          >
            <RotateCcw size={17} />
            <span>Play Again</span>
          </button>

          <Link
            to="/games/coin-catcher"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={17} />
            <span>Back to Game Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
