import { Link, useLocation } from 'react-router-dom';
import GAMES_DATA from '../../data/gamesData';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import GameBottomNav from '../../components/games/GameBottomNav';
import { ArrowLeft, Sparkles, Gamepad2, Sun, AlertCircle } from 'lucide-react';

/**
 * GameplayPlaceholderPage Component
 * Dedicated placeholder route for playable games (/games/coin-catcher/play & /games/memory-match/play).
 * Implements the required LIGHT THEME environment distinct from the dark VELOOP dashboard.
 */
export default function GameplayPlaceholderPage() {
  const location = useLocation();

  // Determine game from path
  const isCoinCatcher = location.pathname.includes('coin-catcher');
  const game = isCoinCatcher
    ? GAMES_DATA.find((g) => g.slug === 'coin-catcher')
    : GAMES_DATA.find((g) => g.slug === 'memory-match');

  const gameSlug = game?.slug || 'coin-catcher';
  const gameTitle = game?.title || 'Game Arena';

  return (
    <div
      className="gameplay-light-environment animate-fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f1f5f9', // Slate-100 Light Theme Environment
        color: '#0f172a',           // Slate-900 High Contrast Text
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-6) var(--space-4)'
      }}
    >
      <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Top Header Bar in Light Environment */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            padding: '12px 18px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* Back to Game Home */}
          <Link
            to={`/games/${gameSlug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#334155',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              transition: 'background 150ms ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to {gameTitle} Home</span>
          </Link>

          {/* Light Theme Indicator Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#b45309',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Sun size={14} />
            <span>Light Theme Gameplay Arena</span>
          </div>

          {/* Live Synchronized Balances */}
          <div>
            <BalanceDisplay variant="compact" />
          </div>
        </header>

        {/* Central Light Theme Gameplay Stage Card */}
        <main
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
            padding: 'var(--space-10) var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-6)'
          }}
        >
          {/* Game Badge & Title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: isCoinCatcher ? '#fef3c7' : '#ede9fe',
                border: `1px solid ${isCoinCatcher ? '#fcd34d' : '#ddd6fe'}`,
                color: isCoinCatcher ? '#b45309' : '#6d28d9',
                fontSize: '13px',
                fontWeight: 700
              }}
            >
              <Gamepad2 size={16} />
              {game?.category || 'Arcade'} &bull; {gameTitle}
            </span>

            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {gameTitle} Stage
            </h1>
          </div>

          {/* Core Notice Callout */}
          <div
            style={{
              maxWidth: '580px',
              width: '100%',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e40af',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              textAlign: 'left'
            }}
          >
            <AlertCircle size={22} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '15px', color: '#1e3a8a', display: 'block' }}>
                Gameplay will be implemented in the next phase.
              </strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#3b82f6', lineHeight: 1.5 }}>
                The pre-game entry flow, Token deduction validation, and first-time tutorial guide have been successfully verified. The interactive game canvas and scoring mechanics are reserved for subsequent phases.
              </p>
            </div>
          </div>

          {/* Gameplay Engine Feature Preview Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              width: '100%',
              maxWidth: '720px',
              marginTop: '8px'
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, fontSize: '14px' }}>
                <Sparkles size={16} style={{ color: '#f59e0b' }} />
                <span>Light Theme Canvas</span>
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                High-contrast, responsive light background for optimal clarity and reaction speed.
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, fontSize: '14px' }}>
                <Sparkles size={16} style={{ color: '#6366f1' }} />
                <span>Score & Revive Engine</span>
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                Precision hitboxes, real-time score tracking, combo multiplier, and revive prompts.
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, fontSize: '14px' }}>
                <Sparkles size={16} style={{ color: '#10b981' }} />
                <span>Coin Reward Conversion</span>
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                End-of-run performance automatically crediting Game Coins to your centralized account.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <Link
              to={`/games/${gameSlug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '8px',
                backgroundColor: isCoinCatcher ? '#d97706' : '#4f46e5',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
              }}
            >
              <span>Back to Game Home</span>
            </Link>

            <Link
              to="/games"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              <span>Exit to Games Hub</span>
            </Link>
          </div>
        </main>
      </div>

      {/* Game Bottom Navigation */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <GameBottomNav gameSlug={gameSlug} />
      </div>
    </div>
  );
}
