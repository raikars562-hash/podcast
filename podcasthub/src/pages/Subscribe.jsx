import './Subscribe.css';

const platforms = [
  {
    name: 'Spotify',
    desc: 'The world\'s most popular audio streaming platform',
    color: '#1DB954',
    bg: 'rgba(29,185,84,0.08)',
    listeners: '12M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#1DB954">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: 'Apple Podcasts',
    desc: 'The original podcast app built into every Apple device',
    color: '#fc3c44',
    bg: 'rgba(252,60,68,0.08)',
    listeners: '9M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fc3c44">
        <path d="M12.5 1a9.5 9.5 0 0 0-9.5 9.5 9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12.5 1zm0 3a6.5 6.5 0 0 1 6.5 6.5 6.5 6.5 0 0 1-6.5 6.5A6.5 6.5 0 0 1 6 10.5 6.5 6.5 0 0 1 12.5 4zm0 2.5a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 1.5a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 10 10.5 2.5 2.5 0 0 1 12.5 8z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    desc: 'Watch full video episodes with chapters and timestamps',
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.08)',
    listeners: '8M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Google Podcasts',
    desc: 'Listen across Android and Google Assistant devices',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    listeners: '5M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="3" r="2" fill="#4285F4"/>
        <circle cx="12" cy="21" r="2" fill="#4285F4"/>
        <circle cx="3" cy="12" r="2" fill="#EA4335"/>
        <circle cx="21" cy="12" r="2" fill="#EA4335"/>
        <rect x="11" y="5" width="2" height="14" rx="1" fill="#34A853"/>
        <rect x="5" y="11" width="14" height="2" rx="1" fill="#FBBC05"/>
      </svg>
    ),
  },
  {
    name: 'Amazon Music',
    desc: 'Available for Prime members and Unlimited subscribers',
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.08)',
    listeners: '4M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.612.39-1.275.73-1.988 1.025C17.15 22.234 14.06 23 10.845 23c-4.553 0-8.63-1.338-12.22-4.015-.18-.13-.21-.3-.06-.48.045-.06.09-.12.135-.16l.345-.325zm22.928-7.33c-.09-.126-.175-.247-.27-.366-.24-.303-.494-.605-.78-.906-.27-.3-.556-.605-.855-.906-.294-.296-.6-.593-.914-.886-.304-.29-.616-.58-.934-.866-.316-.286-.636-.572-.963-.856-.323-.28-.65-.56-.98-.836-.327-.276-.655-.55-.983-.82-.325-.27-.652-.538-.98-.804-.324-.265-.65-.526-.977-.786-.325-.26-.65-.517-.977-.773-.322-.255-.644-.507-.965-.757-.318-.25-.635-.497-.948-.741-.31-.24-.62-.478-.924-.71-.3-.228-.598-.453-.89-.673-.288-.217-.573-.43-.852-.637-.276-.204-.548-.404-.812-.598-.262-.19-.518-.377-.769-.558-.248-.18-.49-.355-.727-.526-.233-.169-.462-.334-.682-.493-.218-.158-.43-.31-.633-.458-.2-.145-.393-.285-.577-.418-.18-.13-.354-.256-.52-.376-.162-.117-.317-.229-.463-.334-.143-.103-.279-.2-.405-.29-.122-.088-.237-.17-.343-.247-.104-.075-.197-.143-.282-.205-.182-.13-.32-.23-.408-.296-.09-.065-.13-.1-.113-.1l.066.054.165.123.27.198.385.28.505.364.626.446.745.527.857.603.963.673 1.062.739 1.15.796 1.232.848 1.302.896 1.362.934 1.41.965 1.447.99 1.47 1.006 1.485 1.016 1.488 1.02 1.478 1.013 1.455.997 1.424.978 1.38.95 1.328.91 1.263.866 1.19.816 1.11.762 1.022.7.924.633.822.563.714.49.603.413.49.336.375.258.26.18.148.102.04.027s.008 0 .008 0z"/>
      </svg>
    ),
  },
  {
    name: 'RSS Feed',
    desc: 'Use any podcast app with our direct RSS feed',
    color: '#f26522',
    bg: 'rgba(242,101,34,0.08)',
    listeners: '3M',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#f26522">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
      </svg>
    ),
  },
];

export default function Subscribe() {
  return (
    <main className="page-enter subscribe-page">
      <div className="subscribe-hero">
        <div className="container">
          <p className="section-label">Never Miss an Episode</p>
          <h1 className="section-title">Subscribe & Follow</h1>
          <p className="section-subtitle">
            Listen anywhere, anytime. PodcastHub is available on all major platforms. Pick your favorite and hit subscribe.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Platform cards */}
        <div className="platforms-grid">
          {platforms.map((platform, i) => (
            <a
              key={platform.name}
              href="#"
              className="platform-card animate-fade-up"
              style={{ '--p-color': platform.color, '--p-bg': platform.bg, animationDelay: `${i * 0.08}s` }}
            >
              <div className="platform-card__icon-wrap">
                {platform.icon}
              </div>
              <div className="platform-card__info">
                <h3 className="platform-card__name">{platform.name}</h3>
                <p className="platform-card__desc">{platform.desc}</p>
                <p className="platform-card__listeners">{platform.listeners} listeners</p>
              </div>
              <div className="platform-card__cta">
                <span>Follow</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="subscribe-newsletter">
          <div className="subscribe-newsletter__content">
            <h2>Get the Weekly Digest</h2>
            <p>New episode alerts, guest announcements, and listener-exclusive content — every Thursday.</p>
          </div>
          <form className="subscribe-newsletter__form" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="subscribe-newsletter__input"
            />
            <button type="submit" className="btn btn--primary">
              Subscribe Free
            </button>
          </form>
          <p className="subscribe-newsletter__note">No spam. Unsubscribe anytime. 47,000+ subscribers.</p>
        </div>

        {/* Stats */}
        <div className="subscribe-stats">
          {[
            { value: '45M+', label: 'Total Listeners' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '412+', label: 'Episodes Published' },
            { value: '#1', label: 'Tech Podcast Chart' },
          ].map((s, i) => (
            <div key={i} className="subscribe-stat animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="subscribe-stat__value">{s.value}</span>
              <span className="subscribe-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
