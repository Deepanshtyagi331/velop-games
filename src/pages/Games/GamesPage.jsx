import PageContainer from '../../components/common/PageContainer';
import GamesCarousel from '../../components/games/GamesCarousel';
import BalanceDisplay from '../../components/economy/BalanceDisplay';
import { Sparkles, Coins } from 'lucide-react';

export default function GamesPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {/* Games Hub Header Section */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--space-6)',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              maxWidth: '680px'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-accent-light)',
                  border: '1px solid var(--color-accent-border)',
                  color: 'var(--color-accent-hover)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase'
                }}
              >
                <Sparkles size={13} />
                Arcade &bull; 13 Games Available
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-gold-light)',
                  border: '1px solid var(--color-gold-border)',
                  color: 'var(--color-gold)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-bold)'
                }}
              >
                <Coins size={13} />
                20 Tokens / Play
              </span>
            </div>

            <h1 className="text-display" style={{ margin: 0 }}>
              Games
            </h1>
            <p className="text-body" style={{ margin: 0 }}>
              Play, earn Game Coins, and redeem your rewards. Explore featured playable games and discover the arcade lineup.
            </p>
          </div>

          {/* Live Synchronized Balances */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 'var(--space-2)'
            }}
          >
            <span
              className="text-caption"
              style={{
                color: 'var(--color-text-secondary)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase'
              }}
            >
              Live Balance
            </span>
            <BalanceDisplay variant="full" />
          </div>
        </header>

        {/* Continuous Horizontal Carousel Section */}
        <section aria-label="Featured Games Carousel">
          <GamesCarousel />
        </section>
      </div>
    </PageContainer>
  );
}
