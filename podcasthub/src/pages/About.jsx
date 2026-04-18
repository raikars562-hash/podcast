import { Link } from 'react-router-dom';
import './About.css';

const team = [
  { name: 'Maya Rodriguez', role: 'Founder & Host', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b7?w=200&h=200&fit=crop&crop=face', bio: 'Former tech journalist turned podcaster. 10+ years covering Silicon Valley.' },
  { name: 'James Park', role: 'Co-Host & Producer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', bio: 'Audio engineer with a passion for storytelling and deep-dive journalism.' },
  { name: 'Aisha Nwosu', role: 'Research Lead', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face', bio: 'PhD researcher turned content strategist. Makes complex topics accessible.' },
  { name: 'Leo Chen', role: 'Head of Audio', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', bio: 'Grammy-nominated audio producer. Makes every episode sound like a studio session.' },
];

const milestones = [
  { year: '2019', event: 'First episode released', icon: '🎙️' },
  { year: '2020', event: 'Reached 10,000 subscribers', icon: '📈' },
  { year: '2021', event: 'Won "Best Tech Podcast" Award', icon: '🏆' },
  { year: '2022', event: '1 million total downloads', icon: '🎯' },
  { year: '2023', event: 'Launched PodcastHub platform', icon: '🚀' },
  { year: '2024', event: '45 million active listeners', icon: '🌍' },
];

export default function About() {
  return (
    <main className="page-enter about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <div className="about-hero__blob" />
        </div>
        <div className="container">
          <div className="about-hero__content">
            <p className="section-label">About the Show</p>
            <h1 className="about-hero__title">We believe great<br />conversations change<br /><span>everything.</span></h1>
            <p className="about-hero__subtitle">
              PodcastHub started as a single mic in a basement apartment. Today it's a platform connecting 45 million listeners with the world's most fascinating minds.
            </p>
            <div className="about-hero__actions">
              <Link to="/subscribe" className="btn btn--primary btn--lg">Subscribe Now</Link>
              <Link to="/contact" className="btn btn--ghost btn--lg">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container--narrow">
          <div className="about-mission">
            <div className="about-mission__quote">
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
                <path d="M0 36V22.5C0 15.6 2.1 10.2 6.3 6.3 10.5 2.1 16.5 0 24.3 0V6C19.5 6 15.9 7.2 13.5 9.6 11.1 12 10.2 15 10.5 18.6H18V36H0ZM27 36V22.5C27 15.6 29.1 10.2 33.3 6.3 37.5 2.1 43.5 0 51.3 0V6C46.5 6 42.9 7.2 40.5 9.6 38.1 12 37.2 15 37.5 18.6H45V36H27Z" fill="rgba(232,255,71,0.2)"/>
              </svg>
              <p>Our mission is to democratize access to world-class ideas. We bring the most interesting people in tech, science, business, and culture into conversation — so every listener can think deeper, learn faster, and live more intentionally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Our Values</p>
            <h2 className="section-title">What drives us</h2>
          </div>
          <div className="values-grid">
            {[
              { icon: '🔍', title: 'Radical Curiosity', desc: 'We ask the questions others are afraid to ask. No topic is off-limits when pursued with intellectual honesty.' },
              { icon: '🎯', title: 'Depth Over Breadth', desc: 'We go long. Our conversations average 2+ hours because we believe real understanding takes time.' },
              { icon: '🌐', title: 'Global Perspective', desc: 'We bring voices from every continent, culture, and discipline. The best ideas know no borders.' },
              { icon: '🔓', title: 'Open Access', desc: 'Knowledge should be free. Our core content will always be available without a paywall.' },
            ].map((v, i) => (
              <div key={i} className="value-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="value-card__icon">{v.icon}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">The Team</p>
              <h2 className="section-title">Meet the people behind the mic</h2>
            </div>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <img src={member.avatar} alt={member.name} className="team-card__avatar" />
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline">
        <div className="container--narrow">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Our Journey</p>
            <h2 className="section-title">How we got here</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-item animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="timeline-item__year">{m.year}</div>
                <div className="timeline-item__connector">
                  <div className="timeline-item__dot" />
                  {i < milestones.length - 1 && <div className="timeline-item__line" />}
                </div>
                <div className="timeline-item__content">
                  <span className="timeline-item__icon">{m.icon}</span>
                  <p className="timeline-item__event">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section--sm about-press">
        <div className="container">
          <p className="about-press__label">As featured in</p>
          <div className="about-press__logos">
            {['Forbes', 'TechCrunch', 'Wired', 'The Verge', 'TIME', 'Bloomberg'].map(name => (
              <div key={name} className="about-press__logo">{name}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
