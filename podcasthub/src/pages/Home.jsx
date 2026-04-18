import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard';
import EpisodeCard from '../components/EpisodeCard';
import { usePlayer } from '../hooks/usePlayer';
import {
  trendingPodcasts, recentEpisodes, heroStats,
  testimonials, features, featuredPodcast
} from '../data/podcasts';
import './Home.css';

function HeroSection() {
  const { togglePlay, currentEpisode, isPlaying } = usePlayer();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % trendingPodcasts.slice(0,4).length), 4000);
    return () => clearInterval(t);
  }, []);

  const featured = trendingPodcasts.slice(0, 4);

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__grid-lines" />
      </div>

      <div className="container">
        <div className="hero__inner">
          <div className="hero__content animate-fade-up">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              <span>45M+ listeners worldwide</span>
            </div>

            <h1 className="hero__title">
              Your gateway to the<br />
              <span className="hero__title-accent">world's best</span><br />
              podcasts
            </h1>

            <p className="hero__subtitle">
              Discover, subscribe, and binge the shows that matter. AI-powered recommendations, studio-quality audio, seamless cross-device sync.
            </p>

            <div className="hero__cta">
              <Link to="/signup" className="btn btn--primary btn--lg">
                Start Listening Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <button className="btn btn--ghost btn--lg hero__demo-btn" onClick={() => togglePlay(recentEpisodes[0])}>
                <span className={`hero__play-icon${isPlaying && currentEpisode?.id === recentEpisodes[0].id ? ' playing' : ''}`}>
                  {isPlaying && currentEpisode?.id === recentEpisodes[0].id ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  )}
                </span>
                Listen to Sample
              </button>
            </div>

            <div className="hero__stats">
              {heroStats.map((stat, i) => (
                <div key={i} className="hero__stat">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual animate-fade-up animate-delay-2">
            <div className="hero__visual-stack">
              {featured.map((p, i) => (
                <div
                  key={p.id}
                  className={`hero__card ${i === activeIdx ? 'hero__card--active' : ''}`}
                  style={{ '--card-index': i }}
                >
                  <img src={p.image} alt={p.title} />
                  <div className="hero__card-info">
                    <p className="hero__card-title">{p.title}</p>
                    <p className="hero__card-host">{p.host}</p>
                  </div>
                </div>
              ))}
              <div className="hero__visual-glow" />
            </div>

            <div className="hero__visual-indicators">
              {featured.map((_, i) => (
                <button
                  key={i}
                  className={`hero__indicator${i === activeIdx ? ' active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="hero__ticker">
        <div className="hero__ticker-track">
          {[...trendingPodcasts, ...trendingPodcasts].map((p, i) => (
            <span key={`${p.id}-${i}`} className="hero__ticker-item">
              <img src={p.image} alt="" />
              {p.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="section featured-section">
      <div className="container">
        <div className="featured-section__header">
          <div>
            <p className="section-label">Featured</p>
            <h2 className="section-title">Editor's Spotlight</h2>
          </div>
          <Link to={`/podcast/${featuredPodcast.id}`} className="btn btn--ghost">
            View Show
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="featured-card">
          <div className="featured-card__bg" style={{ backgroundImage: `url(${featuredPodcast.image})` }} />
          <div className="featured-card__content">
            <div className="featured-card__left">
              <img src={featuredPodcast.image} alt={featuredPodcast.title} className="featured-card__artwork" />
            </div>
            <div className="featured-card__right">
              <div className="featured-card__badges">
                <span className="badge badge--new">✦ Editor's Pick</span>
                {featuredPodcast.isVerified && <span className="badge badge--trending">✓ Verified</span>}
              </div>
              <h2 className="featured-card__title">{featuredPodcast.title}</h2>
              <p className="featured-card__host">by {featuredPodcast.host}</p>
              <p className="featured-card__desc">{featuredPodcast.description}</p>

              <div className="featured-card__stats">
                <div className="featured-card__stat">
                  <span className="featured-card__stat-value">{featuredPodcast.subscribers}</span>
                  <span className="featured-card__stat-label">Subscribers</span>
                </div>
                <div className="featured-card__stat">
                  <span className="featured-card__stat-value">{featuredPodcast.rating}</span>
                  <span className="featured-card__stat-label">Rating</span>
                </div>
                <div className="featured-card__stat">
                  <span className="featured-card__stat-value">{featuredPodcast.episodeCount}</span>
                  <span className="featured-card__stat-label">Episodes</span>
                </div>
              </div>

              <div className="featured-card__tags">
                {featuredPodcast.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="featured-card__latest">
                <p className="featured-card__latest-label">Latest Episode</p>
                <p className="featured-card__latest-title">{featuredPodcast.latestEpisode}</p>
              </div>

              <div className="featured-card__actions">
                <Link to={`/podcast/${featuredPodcast.id}`} className="btn btn--primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  Listen Now
                </Link>
                <button className="btn btn--ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'technology', 'business', 'health', 'crime', 'science'];

  const filtered = activeFilter === 'all'
    ? trendingPodcasts
    : trendingPodcasts.filter(p => p.category === activeFilter);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Trending</p>
            <h2 className="section-title">What's Hot Right Now</h2>
            <p className="section-subtitle">The most-listened shows across every category this week.</p>
          </div>
          <Link to="/trending" className="btn btn--ghost">
            See All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="filter-bar">
          {filters.map(f => (
            <button
              key={f}
              className={`tag${activeFilter === f ? ' tag--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid-4">
          {filtered.slice(0, 8).map((podcast, i) => (
            <div key={podcast.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <PodcastCard podcast={podcast} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentEpisodesSection() {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(22,22,31,0.8) 20%, rgba(22,22,31,0.8) 80%, transparent)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Fresh Drops</p>
            <h2 className="section-title">Latest Episodes</h2>
            <p className="section-subtitle">New episodes from the shows everyone's talking about.</p>
          </div>
          <Link to="/discover" className="btn btn--ghost">
            Explore More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="episodes-grid">
          {recentEpisodes.map((episode, i) => (
            <div key={episode.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <EpisodeCard episode={episode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section features-section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '64px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Why PodcastHub</p>
          <h2 className="section-title">Everything you need<br />to love podcasts more</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 0', textAlign: 'center' }}>
            Built from the ground up for serious podcast listeners and passionate creators.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className={`feature-card animate-fade-up animate-delay-${Math.min(i + 1, 5)}`}>
              <span className="feature-card__icon">{feature.icon}</span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Testimonials</p>
          <h2 className="section-title">Loved by millions</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card animate-fade-up animate-delay-${i + 1}`}>
              <div className="testimonial-card__stars">
                {Array(t.rating).fill(0).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-primary)">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <img src={t.avatar} alt={t.name} className="testimonial-card__avatar" />
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-card__bg" />
          <div className="cta-card__content">
            <p className="section-label" style={{ justifyContent: 'center' }}>Get Started</p>
            <h2 className="cta-card__title">Ready to discover your<br />next favorite podcast?</h2>
            <p className="cta-card__subtitle">Join over 45 million listeners. Free forever, upgrade anytime.</p>
            <div className="cta-card__actions">
              <Link to="/signup" className="btn btn--primary btn--xl">
                Create Free Account
              </Link>
              <Link to="/pricing" className="btn btn--ghost btn--xl">
                View Plans
              </Link>
            </div>
            <p className="cta-card__note">No credit card required · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page-enter">
      <HeroSection />
      <FeaturedSection />
      <TrendingSection />
      <RecentEpisodesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
