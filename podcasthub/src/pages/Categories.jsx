import { Link } from 'react-router-dom';
import { categories, allPodcasts } from '../data/podcasts';
import './Categories.css';

const categoryDetails = {
  technology: { color: '#00d9c4', bg: 'rgba(0,217,196,0.08)', desc: 'AI, software, gadgets, and the future of tech.' },
  business:   { color: '#e8ff47', bg: 'rgba(232,255,71,0.08)', desc: 'Startups, finance, leadership, and entrepreneurship.' },
  science:    { color: '#9b6dff', bg: 'rgba(155,109,255,0.08)', desc: 'Physics, biology, space, and the natural world.' },
  society:    { color: '#ff6b35', bg: 'rgba(255,107,53,0.08)', desc: 'Politics, culture, news, and social issues.' },
  arts:       { color: '#ff4d8d', bg: 'rgba(255,77,141,0.08)', desc: 'Music, film, literature, and creative expression.' },
  health:     { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', desc: 'Fitness, nutrition, mental health, and medicine.' },
  comedy:     { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', desc: 'Stand-up, improv, storytelling, and laughs.' },
  crime:      { color: '#f87171', bg: 'rgba(248,113,113,0.08)', desc: 'True crime, investigations, and mysteries.' },
  history:    { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', desc: 'Ancient civilizations to modern events.' },
  sports:     { color: '#34d399', bg: 'rgba(52,211,153,0.08)', desc: 'Football, basketball, Olympics, and more.' },
  education:  { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', desc: 'Learning, skills, self-improvement, and academia.' },
};

export default function Categories() {
  const cats = categories.filter(c => c.id !== 'all');

  return (
    <main className="page-enter categories-page">
      <div className="categories-hero">
        <div className="container">
          <p className="section-label">Browse</p>
          <h1 className="section-title">All Categories</h1>
          <p className="section-subtitle">Find your niche. Every genre, every topic — all in one place.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="categories-grid">
          {cats.map((cat, i) => {
            const detail = categoryDetails[cat.id] || { color: 'var(--accent-primary)', bg: 'rgba(232,255,71,0.08)', desc: '' };
            const count = allPodcasts.filter(p => p.category === cat.id).length;
            const podcasts = allPodcasts.filter(p => p.category === cat.id).slice(0, 3);

            return (
              <Link
                key={cat.id}
                to={`/discover?q=${cat.id}`}
                className="category-card animate-fade-up"
                style={{
                  '--cat-color': detail.color,
                  '--cat-bg': detail.bg,
                  animationDelay: `${i * 0.06}s`
                }}
              >
                <div className="category-card__header">
                  <span className="category-card__icon">{cat.icon}</span>
                  <div className="category-card__meta">
                    <h2 className="category-card__title">{cat.label}</h2>
                    <p className="category-card__count">{count} shows</p>
                  </div>
                  <svg className="category-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>

                <p className="category-card__desc">{detail.desc}</p>

                {podcasts.length > 0 && (
                  <div className="category-card__previews">
                    {podcasts.map(p => (
                      <div key={p.id} className="category-card__preview">
                        <img src={p.image} alt={p.title} />
                        <span>{p.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
