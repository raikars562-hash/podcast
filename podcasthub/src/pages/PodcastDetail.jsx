import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EpisodeCard from '../components/EpisodeCard';
import { allPodcasts, recentEpisodes } from '../data/podcasts';
import './PodcastDetail.css';

const chapterMarkers = [
  { time: '0:00',  label: 'Introduction' },
  { time: '4:30',  label: 'Guest Background' },
  { time: '18:45', label: 'Main Discussion' },
  { time: '45:00', label: 'Key Insights' },
  { time: '1:10:20', label: 'Lightning Round' },
  { time: '1:22:00', label: 'Wrap-up & Resources' },
];

const showNotes = `
In this episode we explore the intersection of artificial intelligence and human creativity with our special guest. 

**Key topics covered:**
- How large language models actually work under the hood
- The ethics of AI-generated content in creative industries
- Practical tools and workflows for creators using AI today
- Predictions for where things are heading in the next 5 years

**Resources mentioned:**
- OpenAI research blog
- Anthropic's Constitutional AI paper
- "The Coming Wave" by Mustafa Suleyman
- Midjourney and DALL-E documentation
`;

export default function PodcastDetail() {
  const { id } = useParams();
  const podcast = allPodcasts.find(p => p.id === id) || allPodcasts[0];
  const [activeTab, setActiveTab] = useState('episodes');
  const [subscribed, setSubscribed] = useState(false);

  const episodes = recentEpisodes.filter(e => e.podcastId === id).length > 0
    ? recentEpisodes
    : recentEpisodes;

  return (
    <main className="page-enter podcast-detail">
      {/* Hero */}
      <div className="pd-hero">
        <div className="pd-hero__bg" style={{ backgroundImage: `url(${podcast.image})` }} />
        <div className="container">
          <div className="pd-hero__content">
            <div className="pd-hero__artwork">
              <img src={podcast.image} alt={podcast.title} />
            </div>
            <div className="pd-hero__info">
              <div className="pd-hero__badges">
                {podcast.badge && <span className={`badge badge--${podcast.badge}`}>{podcast.badge}</span>}
                {podcast.isVerified && (
                  <span className="badge badge--trending">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <h1 className="pd-hero__title">{podcast.title}</h1>
              <p className="pd-hero__host">by <strong>{podcast.host}</strong></p>
              <p className="pd-hero__desc">{podcast.description}</p>

              <div className="pd-hero__stats">
                <div className="pd-stat">
                  <span className="pd-stat__value">{podcast.subscribers}</span>
                  <span className="pd-stat__label">Subscribers</span>
                </div>
                <div className="pd-stat">
                  <span className="pd-stat__value">⭐ {podcast.rating}</span>
                  <span className="pd-stat__label">Rating</span>
                </div>
                <div className="pd-stat">
                  <span className="pd-stat__value">{podcast.episodeCount}</span>
                  <span className="pd-stat__label">Episodes</span>
                </div>
              </div>

              <div className="pd-hero__tags">
                {podcast.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="pd-hero__actions">
                <button
                  className={`btn ${subscribed ? 'btn--secondary' : 'btn--primary'}`}
                  onClick={() => setSubscribed(s => !s)}
                >
                  {subscribed ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      Subscribed
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      Subscribe
                    </>
                  )}
                </button>
                <button className="btn btn--ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share
                </button>
              </div>

              {/* Platform links */}
              <div className="pd-platforms">
                <p className="pd-platforms__label">Available on:</p>
                <div className="pd-platforms__icons">
                  {['Spotify', 'Apple', 'YouTube', 'Google'].map(platform => (
                    <a key={platform} href="#" className="pd-platform-btn" title={platform}>
                      {platform === 'Spotify' && <span style={{color:'#1DB954'}}>♪</span>}
                      {platform === 'Apple' && <span>🍎</span>}
                      {platform === 'YouTube' && <span style={{color:'#FF0000'}}>▶</span>}
                      {platform === 'Google' && <span>🎧</span>}
                      <span>{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pd-tabs-bar">
        <div className="container">
          <div className="pd-tabs">
            {['episodes', 'about', 'chapters', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`pd-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container pd-body">
        {activeTab === 'episodes' && (
          <div>
            <div className="pd-episodes-header">
              <h2>All Episodes <span>({episodes.length})</span></h2>
              <div className="filter-bar">
                {['All', 'New', 'Popular'].map(f => (
                  <button key={f} className="tag">{f}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {episodes.map((ep, i) => (
                <div key={ep.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <EpisodeCard episode={ep} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pd-about">
            <div className="pd-about__section">
              <h2>About the Show</h2>
              <p>{podcast.description} We deep-dive into topics that matter with world-class guests, covering everything from breakthrough research to real-world applications. Each episode is designed to leave you with actionable insights and a deeper understanding of the world.</p>
            </div>
            <div className="pd-about__section">
              <h2>About the Host</h2>
              <div className="pd-host-card">
                <img src={podcast.image} alt={podcast.host} className="pd-host-card__img" />
                <div>
                  <h3>{podcast.host}</h3>
                  <p>Researcher, author, and podcast host with a passion for exploring the boundaries of human knowledge. Featured in Forbes, TED, and major media outlets worldwide.</p>
                </div>
              </div>
            </div>
            <div className="pd-about__section">
              <h2>Show Notes</h2>
              <div className="pd-show-notes">
                {showNotes.trim().split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chapters' && (
          <div className="pd-chapters">
            <h2>Chapter Markers</h2>
            <p className="pd-chapters__subtitle">Navigate directly to any section of the episode.</p>
            <div className="pd-chapters__list">
              {chapterMarkers.map((chapter, i) => (
                <div key={i} className="pd-chapter-item">
                  <span className="pd-chapter-time">{chapter.time}</span>
                  <div className="pd-chapter-bar">
                    <div className="pd-chapter-bar__fill" style={{ width: `${(i / chapterMarkers.length) * 100 + 10}%` }} />
                  </div>
                  <span className="pd-chapter-label">{chapter.label}</span>
                  <button className="btn btn--ghost" style={{ padding: '6px 12px', fontSize: 12 }}>Jump</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pd-reviews">
            <div className="pd-reviews__summary">
              <div className="pd-reviews__score">
                <span className="pd-reviews__big-score">{podcast.rating}</span>
                <div className="pd-reviews__stars">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < Math.floor(podcast.rating) ? 'var(--accent-primary)' : 'var(--bg-hover)'}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                <p>Based on {Math.floor(Math.random() * 8000 + 2000).toLocaleString()} ratings</p>
              </div>
              <div className="pd-reviews__bars">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="pd-review-bar-row">
                    <span>{star} ★</span>
                    <div className="pd-review-bar">
                      <div className="pd-review-bar__fill" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 6 : 3}%` }} />
                    </div>
                    <span>{star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '6%' : star === 2 ? '2%' : '2%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
