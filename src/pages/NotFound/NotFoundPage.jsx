import { Link, useLocation } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';

export default function NotFoundPage() {
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
        <h1 style={{ margin: 0 }}>404</h1>
        <p style={{ maxWidth: '520px', margin: 0, fontSize: 'var(--font-size-lg)' }}>
          Page Not Found
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
          <span>Requested route:</span>
          <code style={{ color: 'var(--color-error)' }}>{location.pathname}</code>
        </div>

        <Link
          to="/"
          style={{
            marginTop: 'var(--space-md)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-accent)',
            color: '#ffffff',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)'
          }}
        >
          Return Home
        </Link>
      </section>
    </PageContainer>
  );
}
