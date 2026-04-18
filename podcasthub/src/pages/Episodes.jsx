import { useState } from 'react';
import EpisodeCard from '../components/EpisodeCard';
import { usePlayer } from '../hooks/usePlayer';
import { recentEpisodes, allPodcasts } from '../data/podcasts';
import './Episodes.css';

// Build a large episode list by duplicating with variations
const buildEpisodeList = () => {
  const base = [...recentEpisodes];
  const extras = allPodcasts.slice(0, 10).map((p, i) => ({
    id: `gen-${p.id}`,
    podcastId: p.id,
    podcastTitle: p.title,
    podcastImage: p.image,
    title: `${p.title} — Episode ${Math.floor(Math.random() * 300 + 100)}`,
    description: p.description,
    duration: `${Math.floor(Math.random() * 90 + 20)}m`,
    durationSeconds: Math.floor(Math.random() * 5400 + 1200),
    date: `${Math.floor(Math.random() * 14 + 1)} days ago`,
    plays: `${(Math.random() * 900 + 100).toFixed(0)}K`,
    isNew: Math.random() > 0.6,
    tags: p.tags?.slice(0, 2) || [],
  }));
  return [...base, ...extras];
};

const allEpisodes = buildEpisodeList();
const sortOptions = ['Latest', 'Most Played', 'Shortest', 'Longest'];
const filterOptions = ['All', 'New', 'Technology', 'Business', 'Health', 'Science', 'Society', 'Comedy'];

export default function Episodes() {
  const { togglePlay, currentEpisode, isPlaying } = usePlayer();
  const [sort, setSort] = useState('Latest');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allEpisodes.filter(ep => {
    const matchSearch = !search || ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.podcastTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ||
      (filter === 'New' && ep.isNew) ||
      ep.tags?.some(t => t.toLowerCase() === filter.toLowerCase()) ||
      ep.podcastTitle.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  }).sort((a, b) => {
    if (sort === 'Most Played') return parseFloat(b.plays) - parseFloat(a.plays);
    if (sort === 'Shortest') return a.durationSeconds - b.durationSeconds;
    if (sort === 'Longest') return b.durationSeconds - a.durationSeconds;
    return 0;
  });

  // Featured episode (latest new)
  const featured = allEpisodes.find(e => e.isNew) || allEpisodes[0];
  const isFeaturedPlaying = currentEpisode?.id === featured.id && isPlaying;

  return (
    <main className="page-enter episodes-page">
      {/* Featured episode hero */}
      <div className="ep-featured">
        <div className="ep-featured__bg" style={{ backgroundImage: `url(${featured.podcastImage})` }} />
        <div className="container">
          <div className="ep-featured__content">
            <div className="ep-featured__left">
              <div className="ep-featured__artwork">
                <img src={featured.podcastImage} alt="" />
                <div className={`ep-featured__artwork-ring${isFeaturedPlaying ? ' spinning' : ''}`} />
              </div>
            </div>
            <div className="ep-featured__right">
              <div className="ep-featured__labels">
                <span className="badge badge--new">✦ Latest Episode</span>
                {featured.isNew && <span className="badge badge--hot">🔥 Hot</span>}
              </div>
              <h1 className="ep-featured__title">{featured.title}</h1>
              <p className="ep-featured__show">{featured.podcastTitle}</p>
              <p className="ep-featured__desc">{featured.description}</p>
              <div className="ep-featured__meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {featured.duration}
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {featured.plays} plays
                </span>
                <span>{featured.date}</span>
              </div>
              <div className="ep-featured__actions">
                <button
                  className={`btn btn--primary btn--lg${isFeaturedPlaying ? ' playing' : ''}`}
                  onClick={() => togglePlay(featured)}
                >
                  {isFeaturedPlaying ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                      Pause Episode
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                      Play Episode
                    </>
                  )}
                </button>
                <button className="btn btn--ghost btn--lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                  Add to Queue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode list */}
      <div className="container episodes-list-section">
        <div className="episodes-toolbar">
          <div className="episodes-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search episodes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="episodes-search__input"
            />
          </div>
          <div className="episodes-sort">
            <span>Sort by:</span>
            {sortOptions.map(s => (
              <button key={s} className={`tag${sort === s ? ' tag--active' : ''}`} onClick={() => setSort(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="filter-bar" style={{ marginBottom: 32 }}>
          {filterOptions.map(f => (
            <button key={f} className={`tag${filter === f ? ' tag--active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <p className="episodes-count">{filtered.length} episodes</p>

        <div className="episodes-main-grid">
          {filtered.map((ep, i) => (
            <div key={ep.id} className="animate-fade-up" style={{ animationDelay: `${(i % 10) * 0.04}s` }}>
              <EpisodeCard episode={ep} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="discover-empty">
              <span className="discover-empty__icon">🎧</span>
              <h3>No episodes found</h3>
              <p>Try a different search term or filter.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
