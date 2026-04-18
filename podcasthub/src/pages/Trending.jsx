import { useState } from 'react';
import PodcastCard from '../components/PodcastCard';
import { allPodcasts } from '../data/podcasts';
import './Trending.css';

const periods = ['Today', 'This Week', 'This Month', 'All Time'];
const genres = ['All', 'Technology', 'Business', 'Health', 'Crime', 'Science', 'Comedy', 'Society', 'History', 'Education'];

export default function Trending() {
  const [period, setPeriod] = useState('This Week');
  const [genre, setGenre] = useState('All');

  const sorted = [...allPodcasts]
    .filter(p => genre === 'All' || p.category === genre.toLowerCase())
    .sort((a, b) => parseFloat(b.subscribers) - parseFloat(a.subscribers));

  return (
    <main className="page-enter trending-page">
      <div className="trending-hero">
        <div className="container">
          <p className="section-label">Charts</p>
          <h1 className="section-title">Trending Podcasts</h1>
          <p className="section-subtitle">Real-time rankings based on streams, subscriber growth, and listener activity.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Period tabs */}
        <div className="trending-tabs">
          {periods.map(p => (
            <button key={p} className={`trending-tab${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>
              {p}
            </button>
          ))}
        </div>

        {/* Genre filter */}
        <div className="filter-bar" style={{ marginBottom: 40 }}>
          {genres.map(g => (
            <button key={g} className={`tag${genre === g ? ' tag--active' : ''}`} onClick={() => setGenre(g)}>
              {g}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="trending-podium">
          {sorted.slice(0, 3).map((podcast, i) => (
            <div key={podcast.id} className={`podium-card podium-card--${i + 1}`}>
              <div className="podium-card__rank">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
              </div>
              <div className="podium-card__artwork">
                <img src={podcast.image} alt={podcast.title} />
              </div>
              <h3 className="podium-card__title">{podcast.title}</h3>
              <p className="podium-card__host">{podcast.host}</p>
              <div className="podium-card__stats">
                <span>⭐ {podcast.rating}</span>
                <span>👥 {podcast.subscribers}</span>
              </div>
              {podcast.badge && <span className={`badge badge--${podcast.badge}`}>{podcast.badge}</span>}
            </div>
          ))}
        </div>

        {/* Full ranked list */}
        <div className="trending-list">
          <div className="trending-list__header">
            <span>#</span>
            <span>Podcast</span>
            <span>Category</span>
            <span>Subscribers</span>
            <span>Rating</span>
            <span>Episodes</span>
          </div>
          {sorted.map((podcast, i) => (
            <div key={podcast.id} className={`trending-row animate-fade-up`} style={{ animationDelay: `${i * 0.03}s` }}>
              <span className="trending-row__rank">{i + 1}</span>
              <div className="trending-row__info">
                <img src={podcast.image} alt="" className="trending-row__img" />
                <div>
                  <p className="trending-row__title">{podcast.title}</p>
                  <p className="trending-row__host">{podcast.host}</p>
                </div>
              </div>
              <span className="trending-row__cat">
                <span className="tag">{podcast.category}</span>
              </span>
              <span className="trending-row__subs">{podcast.subscribers}</span>
              <span className="trending-row__rating">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent-primary)">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                {podcast.rating}
              </span>
              <span className="trending-row__eps">{podcast.episodeCount}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
