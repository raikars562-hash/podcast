import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Guests.css';

const guests = [
  {
    id: 'g1',
    name: 'Sam Altman',
    title: 'CEO, OpenAI',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Sam Altman is the CEO of OpenAI and a prominent technology entrepreneur and investor.',
    episodes: ['#412 — The Future of AI', '#360 — GPT-4 Deep Dive'],
    tags: ['AI', 'Technology', 'Entrepreneurship'],
    episodeCount: 2,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g2',
    name: 'Elon Musk',
    title: 'CEO, Tesla & SpaceX',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    bio: 'Elon Musk is the founder, CEO, and chief engineer of SpaceX, as well as CEO of Tesla.',
    episodes: ['#400 — Mars & Beyond', '#275 — Tesla, AI, and the Future'],
    tags: ['Space', 'Electric Vehicles', 'AI'],
    episodeCount: 3,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g3',
    name: 'Andrew Huberman',
    title: 'Neuroscientist, Stanford',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Andrew Huberman is a Professor of Neurobiology at Stanford School of Medicine.',
    episodes: ['#326 — Neuroscience of Peak Performance'],
    tags: ['Neuroscience', 'Health', 'Performance'],
    episodeCount: 1,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g4',
    name: 'Yann LeCun',
    title: 'Chief AI Scientist, Meta',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    bio: 'Yann LeCun is a pioneering computer scientist and the Chief AI Scientist at Meta.',
    episodes: ['#382 — Deep Learning & the Future'],
    tags: ['Machine Learning', 'AI', 'Science'],
    episodeCount: 1,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g5',
    name: 'Priya Patel',
    title: 'Venture Partner, a16z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b7?w=200&h=200&fit=crop&crop=face',
    bio: 'Priya Patel is a venture partner focusing on frontier tech investments at Andreessen Horowitz.',
    episodes: ['#370 — Investing in the AI Era', '#341 — Web3 Reality Check'],
    tags: ['Investing', 'Startups', 'Technology'],
    episodeCount: 2,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g6',
    name: 'Demis Hassabis',
    title: 'CEO, Google DeepMind',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Demis Hassabis co-founded DeepMind and leads it as CEO. He is also a world-class chess and games expert.',
    episodes: ['#395 — AlphaFold & the Protein Revolution'],
    tags: ['AI', 'Biology', 'Games'],
    episodeCount: 1,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g7',
    name: 'Naval Ravikant',
    title: 'Angel Investor & Philosopher',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
    bio: 'Naval Ravikant is an entrepreneur, angel investor, and author known for his wisdom on wealth and happiness.',
    episodes: ['#262 — How to Get Rich', '#300 — Philosophy of Life'],
    tags: ['Investing', 'Philosophy', 'Wealth'],
    episodeCount: 2,
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: 'g8',
    name: 'Liv Boeree',
    title: 'Poker Champion & Science Communicator',
    avatar: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=200&h=200&fit=crop&crop=face',
    bio: 'Liv Boeree is a professional poker player and science communicator focused on AI safety.',
    episodes: ['#388 — Game Theory & AI Risk'],
    tags: ['Poker', 'AI Safety', 'Science'],
    episodeCount: 1,
    social: { twitter: '#', linkedin: '#' },
  },
];

export default function Guests() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', 'AI', 'Technology', 'Science', 'Investing', 'Health', 'Philosophy'];

  const filtered = guests.filter(g => {
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = activeTag === 'All' || g.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <main className="page-enter guests-page">
      <div className="guests-hero">
        <div className="container">
          <p className="section-label">Guest Profiles</p>
          <h1 className="section-title">Our Featured Guests</h1>
          <p className="section-subtitle">World-class thinkers, builders, and visionaries who've joined us on the show.</p>

          <div className="guests-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="guests-search__input"
            />
          </div>

          <div className="filter-bar" style={{ marginTop: 20 }}>
            {allTags.map(t => (
              <button key={t} className={`tag${activeTag === t ? ' tag--active' : ''}`} onClick={() => setActiveTag(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="guests-grid">
          {filtered.map((guest, i) => (
            <div key={guest.id} className="guest-card animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="guest-card__header">
                <div className="guest-card__avatar-wrap">
                  <img src={guest.avatar} alt={guest.name} className="guest-card__avatar" />
                  <div className="guest-card__avatar-ring" />
                </div>
                <div className="guest-card__social">
                  <a href={guest.social.twitter} className="guest-card__social-btn" title="Twitter">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href={guest.social.linkedin} className="guest-card__social-btn" title="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="guest-card__info">
                <h3 className="guest-card__name">{guest.name}</h3>
                <p className="guest-card__title">{guest.title}</p>
                <p className="guest-card__bio">{guest.bio}</p>
              </div>

              <div className="guest-card__tags">
                {guest.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="guest-card__episodes">
                <p className="guest-card__episodes-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                  {guest.episodeCount} episode{guest.episodeCount !== 1 ? 's' : ''}
                </p>
                {guest.episodes.map((ep, i) => (
                  <Link key={i} to="/discover" className="guest-card__episode-link">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                    {ep}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="discover-empty">
            <span className="discover-empty__icon">👤</span>
            <h3>No guests found</h3>
            <p>Try different search terms or tags.</p>
          </div>
        )}
      </div>
    </main>
  );
}
