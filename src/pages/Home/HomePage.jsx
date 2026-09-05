import { useLocation } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';

export default function HomePage() {
  const location = useLocation();

  return (
    <PageContainer>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-2xl) var(--space-md)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          gap: 'var(--space-md)'
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-accent-light)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)'
          }}
        >
          Phase 1 — Project Foundation
        </span>

        <h1 style={{ margin: 0 }}>VELOOP Rewards</h1>
        <p style={{ maxWidth: '520px', margin: 0 }}>
          Welcome to the VELOOP Rewards &amp; Games platform. Browse games, enter challenges with tokens, and redeem your rewards.
        </p>

        <div
          style={{
            marginTop: 'var(--space-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: '6px 12px',
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-family-mono)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)'
          }}
        >
          <span>Current route:</span>
          <code style={{ color: 'var(--color-gold)' }}>{location.pathname}</code>
        </div>
      </section>
    </PageContainer>
  );
}
