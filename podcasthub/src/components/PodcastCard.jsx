import { Link } from 'react-router-dom';
import { usePlayer } from '../hooks/usePlayer';
import './PodcastCard.css';

export default function PodcastCard({ podcast, size = 'default' }) {
  const { addToQueue } = usePlayer();

  const fakeEpisode = {
    id: `${podcast.id}-latest`,
    podcastId: podcast.id,
    podcastTitle: podcast.title,
    podcastImage: podcast.image,
    title: `Latest Episode — ${podcast.title}`,
    description: podcast.description,
    duration: '1h 00m',
    durationSeconds: 3600,
    date: '2 days ago',
  };

  return (
    <Link to={`/podcast/${podcast.id}`} className={`podcast-card podcast-card--${size}`}>
      <div className="podcast-card__artwork">
        <img src={podcast.image} alt={podcast.title} loading="lazy" />
        <div className="podcast-card__overlay">
          <button
            className="podcast-card__play"
            onClick={e => { e.preventDefault(); addToQueue(fakeEpisode); }}
            aria-label="Add to queue"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>
        </div>
        {podcast.badge && (
          <span className={`badge badge--${podcast.badge} podcast-card__badge`}>
            {podcast.badge === 'new' && '✦ New'}
            {podcast.badge === 'hot' && '🔥 Hot'}
            {podcast.badge === 'trending' && '↑ Trending'}
            {podcast.badge === 'live' && '● Live'}
          </span>
        )}
      </div>

      <div className="podcast-card__info">
        <div className="podcast-card__header">
          <h3 className="podcast-card__title">
            {podcast.title}
            {podcast.isVerified && (
              <span className="podcast-card__verified" title="Verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent-primary)">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </span>
            )}
          </h3>
          <p className="podcast-card__host">{podcast.host}</p>
        </div>

        {size === 'large' && (
          <p className="podcast-card__desc">{podcast.description}</p>
        )}

        <div className="podcast-card__stats">
          <span className="podcast-card__stat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            {podcast.rating}
          </span>
          <span className="podcast-card__stat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {podcast.subscribers}
          </span>
          <span className="podcast-card__stat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {podcast.episodeCount} ep
          </span>
        </div>

        <div className="podcast-card__tags">
          {podcast.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
