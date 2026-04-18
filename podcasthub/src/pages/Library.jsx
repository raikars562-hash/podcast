import { useState } from 'react';
import { Link } from 'react-router-dom';
import EpisodeCard from '../components/EpisodeCard';
import PodcastCard from '../components/PodcastCard';
import { SkeletonCard, SkeletonEpisode } from '../components/LoadingSpinner';
import { recentEpisodes, trendingPodcasts, allPodcasts } from '../data/podcasts';
import { usePlayer } from '../hooks/usePlayer';
import './Library.css';

const libraryTabs = ['All', 'Podcasts', 'Episodes', 'Downloads', 'History'];

const stats = [
  { label: 'Hours Listened', value: '142h', icon: '🎧', change: '+12h this week' },
  { label: 'Subscriptions', value: '24', icon: '📌', change: '+3 this month' },
  { label: 'Episodes Saved', value: '67', icon: '📥', change: '8 new' },
  { label: 'Listening Streak', value: '14 days', icon: '🔥', change: 'Personal best!' },
];

const listeningHistory = recentEpisodes.map((ep, i) => ({
  ...ep,
  progress: Math.floor(Math.random() * 90 + 10),
  listenedAt: ['Today, 8:32 AM', 'Yesterday, 6:00 PM', '2 days ago', '3 days ago', '5 days ago', 'Last week'][i] || 'Last week',
}));

const downloadedEpisodes = recentEpisodes.slice(0, 3).map(ep => ({
  ...ep,
  fileSize: `${(Math.random() * 60 + 20).toFixed(0)} MB`,
  downloadedAt: 'Today',
}));

export default function Library() {
  const [activeTab, setActiveTab] = useState('All');
  const [subscribedShows] = useState(trendingPodcasts.slice(0, 6));
  const { queue, removeFromQueue, togglePlay } = usePlayer();

  return (
    <main className="page-enter library-page">
      {/* Hero */}
      <div className="library-hero">
        <div className="container">
          <div className="library-hero__inner">
            <div>
              <p className="section-label">My Library</p>
              <h1 className="section-title">Your Listening Hub</h1>
              <p className="section-subtitle">Everything you follow, save, and listen to — in one place.</p>
            </div>
            <div className="library-hero__avatar">
              <div className="library-avatar">
                <span>JS</span>
              </div>
              <div>
                <p className="library-hero__username">Jamie Sullivan</p>
                <p className="library-hero__since">Member since Jan 2023</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="library-stats">
            {stats.map((s, i) => (
              <div key={i} className="library-stat animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="library-stat__icon">{s.icon}</span>
                <div>
                  <p className="library-stat__value">{s.value}</p>
                  <p className="library-stat__label">{s.label}</p>
                  <p className="library-stat__change">{s.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container library-body">
        {/* Tabs */}
        <div className="library-tabs">
          {libraryTabs.map(tab => (
            <button
              key={tab}
              className={`library-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Continue Listening */}
        {(activeTab === 'All' || activeTab === 'Episodes' || activeTab === 'History') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>Continue Listening</h2>
              <button className="btn btn--ghost btn--sm">View All</button>
            </div>
            <div className="continue-list">
              {listeningHistory.slice(0, 3).map((ep, i) => (
                <div key={ep.id} className="continue-item animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="continue-item__artwork">
                    <img src={ep.podcastImage} alt="" />
                  </div>
                  <div className="continue-item__info">
                    <p className="continue-item__show">{ep.podcastTitle}</p>
                    <p className="continue-item__title">{ep.title}</p>
                    <div className="continue-item__progress-wrap">
                      <div className="continue-item__progress-bar">
                        <div
                          className="continue-item__progress-fill"
                          style={{ width: `${ep.progress}%` }}
                        />
                      </div>
                      <span className="continue-item__pct">{ep.progress}%</span>
                    </div>
                    <p className="continue-item__meta">{ep.duration} · {ep.listenedAt}</p>
                  </div>
                  <button
                    className="continue-item__play"
                    onClick={() => togglePlay(ep)}
                    aria-label="Resume"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Subscribed Shows */}
        {(activeTab === 'All' || activeTab === 'Podcasts') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>My Subscriptions</h2>
              <Link to="/discover" className="btn btn--ghost btn--sm">Find More</Link>
            </div>
            <div className="grid-3">
              {subscribedShows.map((podcast, i) => (
                <div key={podcast.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <PodcastCard podcast={podcast} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Up Next Queue */}
        {(activeTab === 'All' || activeTab === 'Episodes') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>
                Up Next
                {queue.length > 0 && (
                  <span className="library-count-badge">{queue.length}</span>
                )}
              </h2>
            </div>
            {queue.length === 0 ? (
              <div className="library-empty">
                <span>🎵</span>
                <p>Your queue is empty</p>
                <small>Browse episodes and add them to your queue</small>
                <Link to="/episodes" className="btn btn--ghost btn--sm" style={{ marginTop: 8 }}>Browse Episodes</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {queue.map((ep, i) => (
                  <div key={ep.id} className="queue-row animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                    <span className="queue-row__num">{i + 1}</span>
                    <img src={ep.podcastImage} alt="" className="queue-row__img" />
                    <div className="queue-row__info">
                      <p className="queue-row__show">{ep.podcastTitle}</p>
                      <p className="queue-row__title">{ep.title}</p>
                    </div>
                    <span className="queue-row__dur">{ep.duration}</span>
                    <button className="queue-row__remove" onClick={() => removeFromQueue(ep.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Downloaded Episodes */}
        {(activeTab === 'All' || activeTab === 'Downloads') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>Downloads</h2>
              <span className="library-storage-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                3 files · 142 MB used
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {downloadedEpisodes.map((ep, i) => (
                <div key={ep.id} className="download-row animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                  <img src={ep.podcastImage} alt="" className="download-row__img" />
                  <div className="download-row__info">
                    <p className="download-row__show">{ep.podcastTitle}</p>
                    <p className="download-row__title">{ep.title}</p>
                    <p className="download-row__meta">{ep.duration} · {ep.fileSize} · Downloaded {ep.downloadedAt}</p>
                  </div>
                  <div className="download-row__actions">
                    <button className="btn btn--ghost btn--sm" onClick={() => togglePlay(ep)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                      Play
                    </button>
                    <button className="download-row__delete" title="Delete download">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Listening History */}
        {(activeTab === 'All' || activeTab === 'History') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>Listening History</h2>
              <button className="btn btn--ghost btn--sm">Clear History</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {listeningHistory.map((ep, i) => (
                <div key={`${ep.id}-hist`} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <EpisodeCard episode={ep} compact />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended for you */}
        {(activeTab === 'All') && (
          <section className="library-section">
            <div className="library-section__header">
              <h2>Recommended For You</h2>
              <span className="library-ai-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                AI Picks
              </span>
            </div>
            <div className="grid-4">
              {allPodcasts.slice(4, 8).map((podcast, i) => (
                <div key={podcast.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                  <PodcastCard podcast={podcast} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
