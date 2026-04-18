import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard';
import { allPodcasts, categories } from '../data/podcasts';
import './Discover.css';

export default function Discover() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    let list = [...allPodcasts];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.host.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }
    switch (sortBy) {
      case 'popular':
        return list.sort((a, b) => parseFloat(b.subscribers) - parseFloat(a.subscribers));
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'episodes':
        return list.sort((a, b) => b.episodeCount - a.episodeCount);
      default:
        return list;
    }
  }, [query, activeCategory, sortBy]);

  return (
    <main className="page-enter discover-page">
      <div className="discover-hero">
        <div className="container">
          <p className="section-label">Discover</p>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Browse All Podcasts</h1>
          <p className="section-subtitle" style={{ marginBottom: 32 }}>
            Search over 2 million shows across every genre, topic, and language.
          </p>

          <div className="discover-search">
            <svg className="discover-search__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search podcasts, hosts, topics..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="discover-search__input"
              autoFocus
            />
            {query && (
              <button className="discover-search__clear" onClick={() => setQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container discover-body">
        {/* Sidebar */}
        <aside className="discover-sidebar">
          <div className="discover-sidebar__section">
            <h3 className="discover-sidebar__title">Categories</h3>
            <ul className="discover-sidebar__list">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`discover-sidebar__item${activeCategory === cat.id ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className="discover-sidebar__count">
                      {cat.id === 'all' ? allPodcasts.length : allPodcasts.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <div className="discover-main">
          <div className="discover-toolbar">
            <p className="discover-count">
              {filtered.length} show{filtered.length !== 1 ? 's' : ''}
              {query && <span> for "<strong>{query}</strong>"</span>}
            </p>

            <div className="discover-toolbar__right">
              <div className="discover-sort">
                <label htmlFor="sort">Sort:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="discover-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="episodes">Most Episodes</option>
                </select>
              </div>

              <div className="discover-view-btns">
                <button
                  className={`discover-view-btn${viewMode === 'grid' ? ' active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>
                <button
                  className={`discover-view-btn${viewMode === 'list' ? ' active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="discover-empty">
              <span className="discover-empty__icon">🎙️</span>
              <h3>No results found</h3>
              <p>Try a different search term or browse by category.</p>
              <button className="btn btn--ghost" onClick={() => { setQuery(''); setActiveCategory('all'); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid-3' : 'discover-list'}>
              {filtered.map((podcast, i) => (
                <div key={podcast.id} className="animate-fade-up" style={{ animationDelay: `${(i % 12) * 0.04}s` }}>
                  <PodcastCard podcast={podcast} size={viewMode === 'list' ? 'compact' : 'default'} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
