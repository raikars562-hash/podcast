import './LoadingSpinner.css';

export function LoadingSpinner({ size = 'md', label = 'Loading...' }) {
  return (
    <div className={`spinner-wrap spinner-wrap--${size}`} role="status" aria-label={label}>
      <div className="spinner">
        <div className="spinner__ring" />
        <div className="spinner__logo">
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="9" width="3" height="10" rx="1.5" fill="var(--accent-primary)"/>
            <rect x="11" y="5" width="3" height="18" rx="1.5" fill="var(--accent-primary)"/>
            <rect x="16" y="11" width="3" height="6" rx="1.5" fill="var(--accent-primary)"/>
          </svg>
        </div>
      </div>
      {label && <p className="spinner__label">{label}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="page-loader">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton--artwork" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--subtitle" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton-card__row">
          <div className="skeleton skeleton--tag" />
          <div className="skeleton skeleton--tag" />
          <div className="skeleton skeleton--tag" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonEpisode() {
  return (
    <div className="skeleton-episode">
      <div className="skeleton skeleton--thumb" />
      <div className="skeleton-episode__body">
        <div className="skeleton skeleton--label" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text short" />
      </div>
    </div>
  );
}
