import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard';
import EpisodeCard from '../components/EpisodeCard';
import { SkeletonCard, SkeletonEpisode } from '../components/LoadingSpinner';
import { useDebounce } from '../hooks/useDebounce';
import { allPodcasts, recentEpisodes } from '../data/podcasts';
import './SearchResults.css';

const resultTabs = ['All', 'Podcasts', 'Episodes', 'Hosts'];

function highlightMatch(text, query) {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="search-highlight">{part}</mark>
      : part
  );
}

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const debouncedQuery = useDebounce(query, 250);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);

  // Simulate async search
  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(t);
    }
    setLoading(false);
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    }
  }, [debouncedQuery, setSearchParams]);

  const q = debouncedQuery.toLowerCase();

  const matchedPodcasts = allPodcasts.filter(p =>
    !q ||
    p.title.toLowerCase().includes(q) ||
    p.host.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags?.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  );

  const matchedEpisodes = recentEpisodes.filter(e =>
    !q ||
    e.title.toLowerCase().includes(q) ||
    e.podcastTitle.toLowerCase().includes(q) ||
    e.description.toLowerCase().includes(q) ||
    e.tags?.some(t => t.toLowerCase().includes(q))
  );

  const matchedHosts = [...new Map(
    allPodcasts
      .filter(p => !q || p.host.toLowerCase().includes(q))
      .map(p => [p.host, p])
  ).values()];

  const totalResults = matchedPodcasts.length + matchedEpisodes.length + matchedHosts.length;

  return (
    <main className="page-enter search-page">
      {/* Search hero */}
      <div className="search-hero">
        <div className="container">
          <div className="search-hero__bar">
            <svg className="search-hero__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search podcasts, episodes, hosts..."
              className="search-hero__input"
            />
            {loading && (
              <div className="search-hero__spinner">
                <div className="search-spinner" />
              </div>
            )}
            {query && !loading && (
              <button className="search-hero__clear" onClick={() => setQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {debouncedQuery && !loading && (
            <p className="search-hero__count">
              {totalResults === 0
                ? 'No results found'
                : `${totalResults} result${totalResults !== 1 ? 's' : ''} for `}
              {totalResults > 0 && <strong>"{debouncedQuery}"</strong>}
            </p>
          )}

          {!debouncedQuery && (
            <div className="search-hero__suggestions">
              <p className="search-hero__suggestions-label">Popular searches</p>
              <div className="search-hero__chips">
                {['AI & Technology', 'True Crime', 'Business', 'Health & Science', 'Comedy', 'History', 'Entrepreneurship', 'Psychology'].map(s => (
                  <button
                    key={s}
                    className="tag"
                    onClick={() => setQuery(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {debouncedQuery && (
        <div className="container search-body">
          {/* Tabs */}
          <div className="search-tabs">
            {resultTabs.map(tab => {
              const count =
                tab === 'All'      ? totalResults :
                tab === 'Podcasts' ? matchedPodcasts.length :
                tab === 'Episodes' ? matchedEpisodes.length :
                matchedHosts.length;
              return (
                <button
                  key={tab}
                  className={`search-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span className="search-tab__count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="search-results">
              <div className="grid-3">
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:24 }}>
                {[1,2,3].map(i => <SkeletonEpisode key={i} />)}
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && totalResults === 0 && (
            <div className="search-empty">
              <span>🔍</span>
              <h3>No results for "{debouncedQuery}"</h3>
              <p>Try different keywords, check spelling, or browse by category.</p>
              <div className="search-empty__actions">
                <Link to="/discover" className="btn btn--primary">Browse All Podcasts</Link>
                <Link to="/categories" className="btn btn--ghost">View Categories</Link>
              </div>
            </div>
          )}

          {!loading && totalResults > 0 && (
            <div className="search-results">

              {/* Podcasts */}
              {(activeTab === 'All' || activeTab === 'Podcasts') && matchedPodcasts.length > 0 && (
                <section className="search-section">
                  <div className="search-section__header">
                    <h2>Podcasts <span>{matchedPodcasts.length}</span></h2>
                    {activeTab === 'All' && matchedPodcasts.length > 3 && (
                      <button className="btn btn--ghost btn--sm" onClick={() => setActiveTab('Podcasts')}>
                        See all {matchedPodcasts.length}
                      </button>
                    )}
                  </div>
                  <div className="grid-3">
                    {(activeTab === 'All' ? matchedPodcasts.slice(0, 3) : matchedPodcasts).map((p, i) => (
                      <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                        <PodcastCard podcast={p} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Episodes */}
              {(activeTab === 'All' || activeTab === 'Episodes') && matchedEpisodes.length > 0 && (
                <section className="search-section">
                  <div className="search-section__header">
                    <h2>Episodes <span>{matchedEpisodes.length}</span></h2>
                    {activeTab === 'All' && matchedEpisodes.length > 4 && (
                      <button className="btn btn--ghost btn--sm" onClick={() => setActiveTab('Episodes')}>
                        See all {matchedEpisodes.length}
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(activeTab === 'All' ? matchedEpisodes.slice(0, 4) : matchedEpisodes).map((ep, i) => (
                      <div key={ep.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                        <EpisodeCard episode={ep} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Hosts */}
              {(activeTab === 'All' || activeTab === 'Hosts') && matchedHosts.length > 0 && (
                <section className="search-section">
                  <div className="search-section__header">
                    <h2>Hosts <span>{matchedHosts.length}</span></h2>
                  </div>
                  <div className="hosts-grid">
                    {matchedHosts.map((p, i) => (
                      <Link
                        key={p.id}
                        to={`/podcast/${p.id}`}
                        className="host-result-card animate-fade-up"
                        style={{ animationDelay: `${i * 0.07}s` }}
                      >
                        <div className="host-result-card__img-wrap">
                          <img src={p.image} alt={p.host} />
                        </div>
                        <div className="host-result-card__info">
                          <p className="host-result-card__name">
                            {highlightMatch(p.host, debouncedQuery)}
                          </p>
                          <p className="host-result-card__show">
                            {highlightMatch(p.title, debouncedQuery)}
                          </p>
                          <p className="host-result-card__meta">{p.subscribers} subscribers · {p.episodeCount} episodes</p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="host-result-card__arrow">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty state — no query */}
      {!debouncedQuery && (
        <div className="container" style={{ paddingBottom: 80 }}>
          <div className="search-trending-section">
            <h2 className="search-trending-title">Trending This Week</h2>
            <div className="grid-3">
              {allPodcasts.slice(0, 6).map((p, i) => (
                <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <PodcastCard podcast={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
