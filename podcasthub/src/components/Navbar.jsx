import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/discover', label: 'Discover' },
    { to: '/episodes', label: 'Episodes' },
    { to: '/trending', label: 'Trending' },
    { to: '/categories', label: 'Categories' },
    { to: '/library', label: 'My Library' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="var(--accent-primary)"/>
                <rect x="8" y="10" width="3" height="8" rx="1.5" fill="#0a0a0f"/>
                <rect x="12.5" y="7" width="3" height="14" rx="1.5" fill="#0a0a0f"/>
                <rect x="17" y="11" width="3" height="6" rx="1.5" fill="#0a0a0f"/>
              </svg>
            </span>
            <span className="navbar__logo-text">PodcastHub</span>
          </Link>

          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <button
              className="navbar__search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button
              className="navbar__search-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <Link to="/signin" className="navbar__btn navbar__btn--ghost">Sign In</Link>
            <Link to="/signup" className="navbar__btn navbar__btn--primary">Start Free</Link>

            <button
              className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Menu"
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className="mobile-menu__link"
              onClick={() => setMenuOpen(false)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mobile-menu__divider" />
          <Link to="/signin" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/signup" className="navbar__btn navbar__btn--primary mobile-menu__cta" onClick={() => setMenuOpen(false)}>
            Start Free
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay${searchOpen ? ' search-overlay--open' : ''}`} onClick={() => setSearchOpen(false)}>
        <div className="search-overlay__box" onClick={e => e.stopPropagation()}>
          <form onSubmit={handleSearch} className="search-overlay__form">
            <svg className="search-overlay__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search podcasts, episodes, hosts..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="search-overlay__input"
              autoFocus
            />
            <button type="button" className="search-overlay__close" onClick={() => setSearchOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </form>
          <div className="search-overlay__hints">
            <span>Try:</span>
            {['Technology', 'True Crime', 'Business', 'Science', 'Comedy'].map(hint => (
              <button key={hint} className="tag" onClick={() => {
                navigate(`/search?q=${hint}`);
                setSearchOpen(false);
              }}>
                {hint}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
