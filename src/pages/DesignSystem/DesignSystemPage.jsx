import { useState } from 'react';
import { Sparkles, Trophy, Flame, ShieldAlert, CheckCircle2, AlertCircle, ArrowRight, Image as ImageIcon } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/common/Button';
import GAMES_DATA from '../../data/gamesData';

export default function DesignSystemPage() {
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        {/* Header Introduction */}
        <header
          style={{
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-6)'
          }}
        >
          <span className="text-caption" style={{ color: 'var(--color-accent)' }}>
            Design System Benchmark &bull; Phase 2
          </span>
          <h1 className="text-display" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            VELOOP Visual System
          </h1>
          <p className="text-body" style={{ maxWidth: '640px' }}>
            Comprehensive showcase of the brand tokens, typography scale, surfaces, buttons, accessible focus states, and motion primitives.
          </p>
        </header>

        {/* Section 1: Color Palette & Semantic Tokens */}
        <section aria-labelledby="colors-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="colors-heading" className="text-section-title">
            1. Semantic Colors &amp; Palette
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            {[
              { label: 'Background', hex: '#161827', varName: '--color-bg', bg: 'var(--color-bg)', text: 'var(--color-text-primary)' },
              { label: 'Primary Surface', hex: '#1E2238', varName: '--color-surface', bg: 'var(--color-surface)', text: 'var(--color-text-primary)' },
              { label: 'Elevated Surface', hex: '#282E4D', varName: '--color-surface-elevated', bg: 'var(--color-surface-elevated)', text: 'var(--color-text-primary)' },
              { label: 'Brand Accent', hex: '#6366F1', varName: '--color-accent', bg: 'var(--color-accent)', text: '#ffffff' },
              { label: 'Accent Hover', hex: '#818CF8', varName: '--color-accent-hover', bg: 'var(--color-accent-hover)', text: '#ffffff' },
              { label: 'Reward Gold', hex: '#F59E0B', varName: '--color-gold', bg: 'var(--color-gold)', text: '#0f172a' },
              { label: 'Gold Highlight', hex: '#FBBF24', varName: '--color-gold-highlight', bg: 'var(--color-gold-highlight)', text: '#0f172a' },
              { label: 'Success', hex: '#22C55E', varName: '--color-success', bg: 'var(--color-success)', text: '#ffffff' },
              { label: 'Warning', hex: '#F59E0B', varName: '--color-warning', bg: 'var(--color-warning)', text: '#0f172a' },
              { label: 'Error', hex: '#EF4444', varName: '--color-error', bg: 'var(--color-error)', text: '#ffffff' },
              { label: 'Primary Text', hex: '#F8FAFC', varName: '--color-text-primary', bg: 'var(--color-surface)', text: 'var(--color-text-primary)' },
              { label: 'Secondary Text', hex: '#CBD5E1', varName: '--color-text-secondary', bg: 'var(--color-surface)', text: 'var(--color-text-secondary)' },
              { label: 'Muted Text', hex: '#94A3B8', varName: '--color-text-muted', bg: 'var(--color-surface)', text: 'var(--color-text-muted)' },
              { label: 'Subtle Text', hex: '#64748B', varName: '--color-text-subtle', bg: 'var(--color-surface)', text: 'var(--color-text-subtle)' }
            ].map((color) => (
              <div
                key={color.label}
                className="surface-bordered"
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}
              >
                <div
                  style={{
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: color.bg,
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <div>
                  <div className="text-small" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                    {color.label}
                  </div>
                  <div className="text-caption" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)' }}>
                    {color.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography Scale */}
        <section aria-labelledby="typography-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="typography-heading" className="text-section-title">
            2. Typography Scale
          </h2>
          <div
            className="surface-base"
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)'
            }}
          >
            <div>
              <span className="text-caption">Display Heading</span>
              <div className="text-display">Level Up Your Rewards</div>
            </div>
            <div>
              <span className="text-caption">Page Title</span>
              <div className="text-page-title">Featured Arcade Games</div>
            </div>
            <div>
              <span className="text-caption">Section Title</span>
              <div className="text-section-title">Weekly Leaderboards &amp; Challenges</div>
            </div>
            <div>
              <span className="text-caption">Card Title</span>
              <div className="text-card-title">Retro Orbit Racer &bull; 20 Tokens</div>
            </div>
            <div>
              <span className="text-caption">Body Text</span>
              <p className="text-body" style={{ margin: 0 }}>
                Compete across challenging arcade environments to earn Game Coins. Tokens are consumed on match entry and redeemable for physical and digital rewards.
              </p>
            </div>
            <div>
              <span className="text-caption">Small Text</span>
              <div className="text-small">Entry requirement: 20 tokens per session. Verified fair play economics.</div>
            </div>
            <div>
              <span className="text-caption">Caption Text</span>
              <div className="text-caption">Official VELOOP Platform Guidelines &bull; 2026</div>
            </div>
          </div>
        </section>

        {/* Section 3: Surface System */}
        <section aria-labelledby="surfaces-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="surfaces-heading" className="text-section-title">
            3. Surface Elevation System
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-5)'
            }}
          >
            <div className="surface-base" style={{ padding: 'var(--space-6)' }}>
              <div className="text-card-title" style={{ marginBottom: 'var(--space-1)' }}>Base Surface</div>
              <p className="text-small"><code>.surface-base</code>: Primary dark container with subtle border.</p>
            </div>

            <div className="surface-elevated" style={{ padding: 'var(--space-6)' }}>
              <div className="text-card-title" style={{ marginBottom: 'var(--space-1)' }}>Elevated Surface</div>
              <p className="text-small"><code>.surface-elevated</code>: Highlighted layered card with elevated depth.</p>
            </div>

            <div className="surface-interactive" style={{ padding: 'var(--space-6)' }}>
              <div className="text-card-title" style={{ marginBottom: 'var(--space-1)' }}>Interactive Surface</div>
              <p className="text-small"><code>.surface-interactive</code>: Hover elevation with smooth micro-transition.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Button Foundation */}
        <section aria-labelledby="buttons-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="buttons-heading" className="text-section-title">
            4. Reusable Button Foundation
          </h2>
          <div
            className="surface-base"
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)'
            }}
          >
            {/* Variants */}
            <div>
              <span className="text-caption" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Variants</span>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Button variant="primary" icon={Sparkles}>Primary Button</Button>
                <Button variant="secondary" icon={Trophy}>Secondary Button</Button>
                <Button variant="reward" icon={Flame}>Reward / Gold</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger" icon={ShieldAlert}>Danger Button</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <span className="text-caption" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Sizes</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Button size="sm" variant="secondary">Small Button</Button>
                <Button size="md" variant="secondary">Medium Button</Button>
                <Button size="lg" variant="secondary" icon={ArrowRight} iconPosition="right">Large Action</Button>
              </div>
            </div>

            {/* States: Loading & Disabled */}
            <div>
              <span className="text-caption" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Interactive &amp; Async States</span>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="primary"
                  loading={btnLoading}
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 2000);
                  }}
                >
                  {btnLoading ? 'Processing Entry...' : 'Click to Test Loading State'}
                </Button>
                <Button variant="primary" disabled>Disabled Primary</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Badges & Tags */}
        <section aria-labelledby="badges-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="badges-heading" className="text-section-title">
            5. Badges &amp; Status Indicators
          </h2>
          <div
            className="surface-base"
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-gold-light)',
                border: '1px solid var(--color-gold-border)',
                color: 'var(--color-gold)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              <Flame size={14} aria-hidden="true" />
              20 Tokens
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-border)',
                color: 'var(--color-accent-hover)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Arcade Series
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-success-light)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <CheckCircle2 size={14} aria-hidden="true" />
              Verified Safe
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-error-light)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: 'var(--color-error)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <AlertCircle size={14} aria-hidden="true" />
              Tokens Required
            </span>
          </div>
        </section>

        {/* Section 6: Motion & Prepared Shimmer Animation */}
        <section aria-labelledby="motion-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 id="motion-heading" className="text-section-title">
            6. Motion Framework &amp; Prepared Shimmer
          </h2>
          <div
            className="surface-base"
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)'
            }}
          >
            <div>
              <span className="text-caption" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Prepared Infinite Shimmer (Subtle &amp; Premium for future Play Now button)
              </span>
              <div
                className="shimmer-container"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  color: '#ffffff',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-button)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <Sparkles size={18} aria-hidden="true" />
                <span>Prepared Shimmer Prototype</span>
                <div className="shimmer-sweep" aria-hidden="true" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div
                className="animate-pulse-subtle surface-elevated"
                style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}
              >
                <span className="text-small" style={{ color: 'var(--color-gold)' }}>Subtle Pulse Active</span>
              </div>
              <div
                className="animate-fade-up surface-elevated"
                style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}
              >
                <span className="text-small" style={{ color: 'var(--color-accent-hover)' }}>Fade-Up Transition</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Original Game Artwork Gallery (13 Artworks) */}
        <section aria-labelledby="artwork-heading" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <div>
              <h2 id="artwork-heading" className="text-section-title" style={{ margin: 0 }}>
                7. Original Game Artwork Gallery (13 Artworks)
              </h2>
              <p className="text-small" style={{ margin: 'var(--space-1) 0 0 0' }}>
                All 13 discrete 16:9 banner artworks encoded in native AVIF. Artwork is strictly decoupled from UI controls.
              </p>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-border)',
                color: 'var(--color-accent-hover)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              <ImageIcon size={16} aria-hidden="true" />
              13 AVIF Assets Ready
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-5)'
            }}
          >
            {GAMES_DATA.map((game, index) => (
              <div
                key={game.id}
                className="surface-elevated"
                style={{
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: 'var(--color-bg-alt)' }}>
                  <img
                    src={game.image}
                    alt={game.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-2)',
                      right: 'var(--space-2)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(22, 24, 39, 0.85)',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--font-size-caption)',
                      fontFamily: 'var(--font-family-mono)',
                      color: 'var(--color-gold)'
                    }}
                  >
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="text-card-title" style={{ fontSize: 'var(--font-size-button)' }}>{game.title}</div>
                    <span
                      style={{
                        fontSize: 'var(--font-size-caption)',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: game.gameType === 'playable' ? 'var(--color-gold-light)' : 'var(--color-surface)',
                        color: game.gameType === 'playable' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {game.category}
                    </span>
                  </div>
                  <div className="text-caption" style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-subtle)' }}>
                    {game.image}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
