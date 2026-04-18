import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '40px 24px', gap: '20px'
    }} className="page-enter">
      <div style={{ fontSize: 80 }}>🎙️</div>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1
      }}>404</h1>
      <p style={{ fontSize: 20, color: 'var(--text-secondary)', maxWidth: 400 }}>
        Looks like this episode got deleted. The page you're looking for doesn't exist.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/" className="btn btn--primary btn--lg">Back to Home</Link>
        <Link to="/discover" className="btn btn--ghost btn--lg">Browse Podcasts</Link>
      </div>
    </div>
  );
}
