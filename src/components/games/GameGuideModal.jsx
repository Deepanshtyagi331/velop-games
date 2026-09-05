import { useEffect, useRef } from 'react';
import { X, Play, Award, Sparkles, Gamepad2, Info } from 'lucide-react';

/**
 * GameGuideModal Component
 * Accessible dialog explaining game objectives, controls, scoring, and Game Coin rewards.
 * Supports keyboard escape dismissal, backdrop closure, and clean focus management.
 */
export default function GameGuideModal({
  game,
  isOpen,
  onClose,
  onStartGame
}) {
  const dialogRef = useRef(null);
  const startButtonRef = useRef(null);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto-focus primary start button when modal opens
    const focusTimeout = setTimeout(() => {
      startButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimeout);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !game) return null;

  const guide = game.guide || {};
  const isCoinCatcher = game.slug === 'coin-catcher';

  return (
    <div
      className="guide-modal-overlay animate-fade-in"
      onClick={onClose}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 12, 20, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        overflowY: 'auto'
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
        aria-describedby="guide-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className="surface-elevated"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-strong)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-4) var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-alt)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isCoinCatcher ? 'var(--color-gold-light)' : 'var(--color-accent-light)',
                border: `1px solid ${isCoinCatcher ? 'var(--color-gold-border)' : 'var(--color-accent-border)'}`,
                color: isCoinCatcher ? 'var(--color-gold)' : 'var(--color-accent-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-hidden="true"
            >
              <Gamepad2 size={18} />
            </span>
            <div>
              <h2
                id="guide-modal-title"
                className="text-card-title"
                style={{ margin: 0, color: 'var(--color-text-primary)' }}
              >
                {game.title} &bull; Guide
              </h2>
              <span className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
                {game.category} Playable Tutorial
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable Content Body */}
        <div
          id="guide-modal-desc"
          style={{
            padding: 'var(--space-6)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)'
          }}
        >
          {/* Objective Callout */}
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)'
            }}
          >
            <Info size={18} style={{ color: 'var(--color-accent-hover)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-primary)' }}>
                Mission Objective:
              </strong>
              <p className="text-small" style={{ margin: '2px 0 0 0', color: 'var(--color-text-secondary)' }}>
                {guide.objective}
              </p>
            </div>
          </div>

          {/* Controls Section */}
          <section aria-labelledby="guide-controls-heading">
            <h3
              id="guide-controls-heading"
              className="text-caption"
              style={{
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wide)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Controls & Interaction
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {guide.controlsList?.map((ctrl, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border-subtle)',
                    fontSize: 'var(--font-size-small)'
                  }}
                >
                  <span style={{ color: 'var(--color-text-secondary)' }}>{ctrl.action}</span>
                  <kbd
                    style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-gold)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    {ctrl.key}
                  </kbd>
                </div>
              ))}
            </div>
          </section>

          {/* Game-Specific Mechanics */}
          {isCoinCatcher && (
            <section aria-labelledby="guide-mechanics-heading">
              <h3
                id="guide-mechanics-heading"
                className="text-caption"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Targets & Hazards
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
                {guide.catchItems?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid var(--color-gold-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-small)', color: 'var(--color-gold)' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-gold-highlight)' }}>
                        {item.points}
                      </span>
                    </div>
                    <span className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.note}
                    </span>
                  </div>
                ))}

                {guide.avoidItems?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-small)', color: 'var(--color-error)' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-error)' }}>
                        {item.penalty}
                      </span>
                    </div>
                    <span className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!isCoinCatcher && guide.rulesList && (
            <section aria-labelledby="guide-rules-heading">
              <h3
                id="guide-rules-heading"
                className="text-caption"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Matching Rules
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {guide.rulesList.map((r, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)'
                    }}
                  >
                    <span style={{ color: 'var(--color-accent-hover)', display: 'inline-flex' }}>
                      <Sparkles size={14} />
                    </span>
                    <div style={{ fontSize: 'var(--font-size-small)' }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{r.rule}: </strong>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{r.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Rewards & Economy Note */}
          <section
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-gold-light)',
              border: '1px solid var(--color-gold-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}
          >
            <Award size={20} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-gold-highlight)' }}>
                Rewards Potential: {guide.rewardPotential}
              </strong>
              <p className="text-caption" style={{ margin: '2px 0 0 0', color: 'var(--color-text-secondary)' }}>
                {guide.scoringInfo}
              </p>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--space-3)',
            padding: 'var(--space-4) var(--space-6)',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-alt)'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-small)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer'
            }}
          >
            Close Guide
          </button>

          <button
            ref={startButtonRef}
            type="button"
            onClick={onStartGame}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: isCoinCatcher
                ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              border: 'none',
              boxShadow: 'var(--shadow-md)',
              fontSize: 'var(--font-size-small)',
              fontWeight: 'var(--font-weight-bold)',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <span>Start Game</span>
            <Play size={15} fill="currentColor" />
          </button>
        </footer>
      </div>
    </div>
  );
}
