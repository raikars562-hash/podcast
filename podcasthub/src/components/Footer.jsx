import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="var(--accent-primary)"/>
                <rect x="8" y="10" width="3" height="8" rx="1.5" fill="#0a0a0f"/>
                <rect x="12.5" y="7" width="3" height="14" rx="1.5" fill="#0a0a0f"/>
                <rect x="17" y="11" width="3" height="6" rx="1.5" fill="#0a0a0f"/>
              </svg>
              <span>PodcastHub</span>
            </Link>
            <p className="footer__tagline">Discover, subscribe, and listen to the world's best podcasts.</p>
            <div className="footer__social">
              {['Twitter', 'Instagram', 'YouTube', 'Discord'].map(platform => (
                <a key={platform} href="#" className="footer__social-link" aria-label={platform}>
                  {platform === 'Twitter' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {platform === 'Instagram' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )}
                  {platform === 'YouTube' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0f"/>
                    </svg>
                  )}
                  {platform === 'Discord' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.13 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__nav-group">
            <h4>Discover</h4>
            <ul>
              <li><Link to="/trending">Trending Shows</Link></li>
              <li><Link to="/categories">All Categories</Link></li>
              <li><Link to="/episodes">All Episodes</Link></li>
              <li><Link to="/discover">Browse All</Link></li>
              <li><Link to="/guests">Guest Profiles</Link></li>
            </ul>
          </div>

          <div className="footer__nav-group">
            <h4>For Creators</h4>
            <ul>
              <li><a href="#">Start a Podcast</a></li>
              <li><Link to="/stats">Analytics Dashboard</Link></li>
              <li><a href="#">Monetization</a></li>
              <li><Link to="/search">Search</Link></li>
              <li><a href="#">Creator Academy</a></li>
            </ul>
          </div>

          <div className="footer__nav-group">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/subscribe">Subscribe</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer__nav-group">
            <h4>Support</h4>
            <ul>
              <li><Link to="/library">My Library</Link></li>
              <li><a href="#">Help Center</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 PodcastHub Inc. All rights reserved.</p>
          <div className="footer__apps">
            <a href="#" className="footer__app-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="#" className="footer__app-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.27.15.57.24.89.24.32 0 .65-.09.93-.26l14.38-8.3-3.36-3.36-12.84 11.68zM.41 1.24C.16 1.55 0 1.99 0 2.56v18.88c0 .57.16 1.01.41 1.32l.07.07 10.57-10.57v-.25L.48 1.17l-.07.07zM21.39 9.59l-2.9-1.67-3.72 3.72 3.72 3.72 2.92-1.68c.83-.48.83-1.27-.02-1.75l-.0-.34zM3.18.24L17.56 8.54l-3.36 3.36L1.36.22A1.67 1.67 0 0 1 3.18.24z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
