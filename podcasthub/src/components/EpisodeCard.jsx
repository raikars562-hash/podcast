import { usePlayer } from '../hooks/usePlayer';
import { Link } from 'react-router-dom';
import './EpisodeCard.css';

export default function EpisodeCard({ episode, compact = false }) {
  const { togglePlay, currentEpisode, isPlaying, addToQueue } = usePlayer();

  const isActive = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isActive && isPlaying;

  return (
    <div className={`episode-card${compact ? ' episode-card--compact' : ''}${isActive ? ' episode-card--active' : ''}`}>
      <div className="episode-card__artwork">
        <img src={episode.podcastImage} alt={episode.podcastTitle} loading="lazy" />
        {isCurrentlyPlaying && (
          <div className="episode-card__playing">
            <span/><span/><span/><span/>
          </div>
        )}
      </div>

      <div className="episode-card__content">
        <div className="episode-card__meta">
          <span className="episode-card__show">{episode.podcastTitle}</span>
          <span className="episode-card__dot">·</span>
          <span className="episode-card__date">{episode.date}</span>
          {episode.isNew && <span className="badge badge--new">New</span>}
        </div>

        <h3 className="episode-card__title">
          <Link to={`/episode/${episode.id}`}>{episode.title}</Link>
        </h3>

        {!compact && (
          <p className="episode-card__desc">{episode.description}</p>
        )}

        <div className="episode-card__footer">
          <div className="episode-card__tags">
            {episode.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="episode-card__actions">
            <span className="episode-card__duration">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {episode.duration}
            </span>

            <button
              className="episode-card__queue-btn"
              onClick={() => addToQueue(episode)}
              title="Add to queue"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>

            <button
              className={`episode-card__play-btn${isCurrentlyPlaying ? ' playing' : ''}`}
              onClick={() => togglePlay(episode)}
              aria-label={isCurrentlyPlaying ? 'Pause' : 'Play'}
            >
              {isCurrentlyPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
