import { useLocation } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';

export default function RedemptionPage() {
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
        <h1 style={{ margin: 0 }}>Redemption</h1>
        <p style={{ maxWidth: '520px', margin: 0, fontSize: 'var(--font-size-lg)' }}>
          Game Coin Redemption Center
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
