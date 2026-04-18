import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayer } from '../hooks/usePlayer';
import { recentEpisodes, allPodcasts } from '../data/podcasts';
import './EpisodeDetail.css';

const chapterMarkers = [
  { time: '0:00',   label: 'Cold Open',                  seconds: 0 },
  { time: '3:12',   label: 'Introduction & Background',  seconds: 192 },
  { time: '11:40',  label: 'The Core Argument',          seconds: 700 },
  { time: '28:55',  label: 'Deep Dive Discussion',       seconds: 1735 },
  { time: '52:20',  label: 'Audience Q&A',               seconds: 3140 },
  { time: '1:08:00','label': 'Key Takeaways',            seconds: 4080 },
  { time: '1:15:30','label': 'Resources & Links',        seconds: 4530 },
  { time: '1:20:44','label': 'Closing Thoughts',         seconds: 4844 },
];

const showNotes = [
  { type: 'heading', text: 'Episode Summary' },
  { type: 'para', text: 'In this landmark episode, we go deep on one of the most consequential topics of our time. Our guest brings a unique perspective shaped by decades of hands-on experience at the frontier of the field.' },
  { type: 'heading', text: 'Topics Covered' },
  { type: 'list', items: [
    'The history and trajectory of the field',
    'Why conventional wisdom keeps getting it wrong',
    'Practical frameworks you can apply today',
    'Predictions for the next 10 years',
    'The biggest risks nobody is talking about',
    'How to position yourself for what\'s coming',
  ]},
  { type: 'heading', text: 'Guest Bio' },
  { type: 'para', text: 'Our guest has spent over 20 years at the intersection of technology and society. They\'ve advised governments, founded three companies, published two books, and spoken at 50+ conferences worldwide. Their work has been cited in Nature, The Economist, and MIT Technology Review.' },
  { type: 'heading', text: 'Resources Mentioned' },
  { type: 'list', items: [
    '"The Coming Wave" — Mustafa Suleyman',
    '"Power and Progress" — Daron Acemoglu',
    'Anthropic\'s Constitutional AI paper (arxiv)',
    'Our World in Data — AI progress metrics',
    'Stanford HAI Annual Report 2024',
  ]},
  { type: 'heading', text: 'Sponsor' },
  { type: 'para', text: 'This episode is brought to you by Brilliant.org — the best way to build real math, science, and CS skills. Get 30 days free at brilliant.org/podcasthub' },
];

const relatedEpisodes = recentEpisodes.slice(0, 3);

function ShowNotes({ notes }) {
  return (
    <div className="show-notes">
      {notes.map((block, i) => {
        if (block.type === 'heading') return <h3 key={i} className="show-notes__heading">{block.text}</h3>;
        if (block.type === 'para') return <p key={i} className="show-notes__para">{block.text}</p>;
        if (block.type === 'list') return (
          <ul key={i} className="show-notes__list">
            {block.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        );
        return null;
      })}
    </div>
  );
}

function Transcript() {
  const lines = [
    { speaker: 'Host', time: '0:00', text: 'Welcome back to PodcastHub. I\'m incredibly excited about today\'s guest. This is someone whose work I\'ve been following for years, and I\'m so glad we finally made this happen.' },
    { speaker: 'Guest', time: '0:18', text: 'Thanks for having me. I\'ve been a listener since your early days, so this is a bit surreal honestly.' },
    { speaker: 'Host', time: '0:27', text: 'Let\'s start at the very beginning. You\'ve talked about how your interest in this field wasn\'t a straight line. Can you walk us through that journey?' },
    { speaker: 'Guest', time: '0:38', text: 'Yeah, it\'s funny because I actually started in a completely unrelated field — I was studying classical literature in college. And then I had this moment where I picked up a book on information theory almost by accident, and it completely rewired how I thought about everything. Communication, meaning, intelligence — all of it.' },
    { speaker: 'Host', time: '1:02', text: 'That\'s a wild pivot. What was it about information theory specifically?' },
    { speaker: 'Guest', time: '1:08', text: 'Shannon\'s core insight is that information is fundamentally about surprise — about reducing uncertainty. And once you see the world through that lens, it\'s hard to unsee it. Every conversation, every decision, every signal we send is about updating models of the world. That concept just grabbed me and never let go.' },
    { speaker: 'Host', time: '1:35', text: 'And from there you ended up doing your PhD at MIT...' },
    { speaker: 'Guest', time: '1:39', text: 'Right. I applied somewhat on a whim and got in, which was a complete shock. My advisor there was one of the greats — someone who had been working on these problems since the 1970s. Being in that environment, surrounded by people who treated hard problems as invitations rather than obstacles, that shaped everything.' },
    { speaker: 'Host', time: '2:10', text: 'Let\'s talk about the work that put you on the map. The paper from 2019 that everyone in the field references — what was the core claim you were making?' },
    { speaker: 'Guest', time: '2:22', text: 'So the paper was making a fairly technical argument about scaling laws, but the intuition behind it is simple: there\'s a predictable relationship between the size of a model, the amount of data you train it on, and the performance you get out. And if that relationship holds — and we showed strong evidence it does — then you can essentially predict how good a future system will be before you build it.' },
  ];

  return (
    <div className="transcript">
      <div className="transcript__header">
        <h3>Auto-Generated Transcript</h3>
        <span className="badge badge--new">Beta</span>
      </div>
      <p className="transcript__note">This transcript was auto-generated. Some errors may occur.</p>
      <div className="transcript__lines">
        {lines.map((line, i) => (
          <div key={i} className="transcript__line">
            <div className="transcript__line-meta">
              <span className={`transcript__speaker transcript__speaker--${line.speaker.toLowerCase()}`}>{line.speaker}</span>
              <span className="transcript__time">{line.time}</span>
            </div>
            <p className="transcript__text">{line.text}</p>
          </div>
        ))}
        <div className="transcript__fade">
          <button className="btn btn--ghost">Load Full Transcript</button>
        </div>
      </div>
    </div>
  );
}

export default function EpisodeDetail() {
  const { id } = useParams();
  const episode = recentEpisodes.find(e => e.id === id) || recentEpisodes[0];
  const podcast = allPodcasts.find(p => p.id === episode.podcastId) || allPodcasts[0];
  const { togglePlay, currentEpisode, isPlaying, progress, currentTime, seek, skipForward, skipBackward, playbackRate, setPlaybackRate, formatTime } = usePlayer();

  const [activeTab, setActiveTab] = useState('notes');
  const isActive = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isActive && isPlaying;
  const progressBarRef = useRef(null);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  const totalSeconds = episode.durationSeconds || 3600;
  const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];

  return (
    <main className="page-enter ep-detail">
      {/* Blurred bg hero */}
      <div className="ep-detail-hero">
        <div className="ep-detail-hero__bg" style={{ backgroundImage: `url(${episode.podcastImage})` }} />
        <div className="container">
          {/* Breadcrumb */}
          <nav className="ep-detail-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/episodes">Episodes</Link>
            <span>›</span>
            <span>{episode.podcastTitle}</span>
          </nav>

          <div className="ep-detail-hero__inner">
            {/* Artwork */}
            <div className="ep-detail-hero__artwork">
              <img src={episode.podcastImage} alt={episode.podcastTitle} />
              {isCurrentlyPlaying && (
                <div className="ep-detail-hero__playing-overlay">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="ep-detail-hero__meta">
              <div className="ep-detail-hero__badges">
                {episode.isNew && <span className="badge badge--new">✦ New</span>}
                <span className="badge badge--trending">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  {episode.plays} plays
                </span>
              </div>

              <Link to={`/podcast/${episode.podcastId}`} className="ep-detail-hero__show">
                {episode.podcastTitle}
              </Link>

              <h1 className="ep-detail-hero__title">{episode.title}</h1>
              <p className="ep-detail-hero__desc">{episode.description}</p>

              <div className="ep-detail-hero__info">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {episode.duration}
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {episode.date}
                </span>
              </div>

              <div className="ep-detail-hero__tags">
                {episode.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== AUDIO PLAYER UI ===== */}
      <div className="ep-player-section">
        <div className="container--narrow">
          <div className="ep-player">
            {/* Waveform progress bar */}
            <div className="ep-player__waveform" onClick={handleProgressClick} ref={progressBarRef}>
              <div className="ep-player__waveform-bg">
                {[...Array(80)].map((_, i) => {
                  const height = 20 + Math.abs(Math.sin(i * 0.4) * 60 + Math.cos(i * 0.7) * 20);
                  const filled = (i / 80) * 100 <= progress;
                  return (
                    <div
                      key={i}
                      className={`ep-player__bar${filled ? ' filled' : ''}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              <div className="ep-player__progress-indicator" style={{ left: `${progress}%` }} />
            </div>

            {/* Time labels */}
            <div className="ep-player__times">
              <span>{isActive ? formatTime(currentTime) : '0:00'}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>

            {/* Controls */}
            <div className="ep-player__controls">
              {/* Speed */}
              <button className="ep-player__rate" onClick={() => setPlaybackRate(nextRate)}>
                {playbackRate}×
              </button>

              {/* Skip back 10s */}
              <button className="ep-player__skip-btn" onClick={skipBackward} title="Back 10 seconds">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                <span className="ep-player__skip-label">10</span>
              </button>

              {/* Play/Pause */}
              <button
                className={`ep-player__play${isCurrentlyPlaying ? ' playing' : ''}`}
                onClick={() => togglePlay(episode)}
              >
                <div className="ep-player__play-ripple" />
                {isCurrentlyPlaying ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1.5"/>
                    <rect x="14" y="4" width="4" height="16" rx="1.5"/>
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
              </button>

              {/* Skip forward 30s */}
              <button className="ep-player__skip-btn" onClick={skipForward} title="Forward 30 seconds">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                </svg>
                <span className="ep-player__skip-label">30</span>
              </button>

              {/* Share */}
              <button className="ep-player__action-btn" title="Share episode">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>

            {/* Chapter quick-jump */}
            <div className="ep-player__chapters">
              <p className="ep-player__chapters-label">Jump to chapter</p>
              <div className="ep-player__chapters-list">
                {chapterMarkers.map((ch, i) => {
                  const active = isActive && currentTime >= ch.seconds &&
                    (i === chapterMarkers.length - 1 || currentTime < chapterMarkers[i + 1].seconds);
                  return (
                    <button
                      key={i}
                      className={`ep-player__chapter-btn${active ? ' active' : ''}`}
                      onClick={() => seek((ch.seconds / totalSeconds) * 100)}
                      title={ch.label}
                    >
                      <span className="ep-player__chapter-time">{ch.time}</span>
                      <span className="ep-player__chapter-name">{ch.label}</span>
                      {active && <span className="ep-player__chapter-dot" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Show Notes / Transcript / Related */}
      <div className="ep-detail-tabs-bar">
        <div className="container--narrow">
          <div className="ep-detail-tabs">
            {['notes', 'transcript', 'related'].map(tab => (
              <button
                key={tab}
                className={`ep-detail-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'notes' && 'Show Notes'}
                {tab === 'transcript' && 'Transcript'}
                {tab === 'related' && 'Related Episodes'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container--narrow ep-detail-body">
        {activeTab === 'notes' && <ShowNotes notes={showNotes} />}
        {activeTab === 'transcript' && <Transcript />}
        {activeTab === 'related' && (
          <div className="ep-related">
            <h3>More Episodes You'll Love</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {relatedEpisodes.map((ep, i) => (
                <div key={ep.id} className="ep-related-item animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <Link to={`/episode/${ep.id}`} className="ep-related-item__link">
                    <img src={ep.podcastImage} alt="" />
                    <div className="ep-related-item__info">
                      <p className="ep-related-item__show">{ep.podcastTitle}</p>
                      <p className="ep-related-item__title">{ep.title}</p>
                      <p className="ep-related-item__meta">{ep.duration} · {ep.date}</p>
                    </div>
                    <button
                      className="ep-related-item__play"
                      onClick={e => { e.preventDefault(); togglePlay(ep); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
