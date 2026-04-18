import { useState } from 'react';
import './Contact.css';

const formTypes = [
  { id: 'guest', label: '🎙️ Guest Pitch', icon: '🎙️' },
  { id: 'sponsor', label: '💼 Sponsor Inquiry', icon: '💼' },
  { id: 'listener', label: '💬 Listener Feedback', icon: '💬' },
  { id: 'press', label: '📰 Press & Media', icon: '📰' },
];

export default function Contact() {
  const [activeForm, setActiveForm] = useState('guest');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '',
    company: '', website: '', reach: '', topic: '',
    availability: '', bio: '', budget: '',
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="page-enter contact-page">
      <div className="contact-hero">
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">Want to be on the show? Partner with us? Or just say hello? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container contact-body">
        {/* Form type selector */}
        <div className="contact-types">
          {formTypes.map(t => (
            <button
              key={t.id}
              className={`contact-type-btn${activeForm === t.id ? ' active' : ''}`}
              onClick={() => { setActiveForm(t.id); setSubmitted(false); }}
            >
              <span className="contact-type-btn__icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success__icon">✅</span>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We typically respond within 2–3 business days.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">
                  {activeForm === 'guest' && 'Pitch Yourself as a Guest'}
                  {activeForm === 'sponsor' && 'Sponsor Inquiry'}
                  {activeForm === 'listener' && 'Send Feedback'}
                  {activeForm === 'press' && 'Press & Media Request'}
                </h2>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                </div>

                {(activeForm === 'guest' || activeForm === 'sponsor') && (
                  <div className="contact-form__row">
                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input type="text" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Where you work" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website / LinkedIn</label>
                      <input type="url" id="website" name="website" value={form.website} onChange={handleChange} placeholder="https://" />
                    </div>
                  </div>
                )}

                {activeForm === 'guest' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="topic">Proposed Topic *</label>
                      <input type="text" id="topic" name="topic" value={form.topic} onChange={handleChange} placeholder="What would you talk about?" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bio">Short Bio *</label>
                      <textarea id="bio" name="bio" rows={3} value={form.bio} onChange={handleChange} placeholder="Tell us about yourself and your expertise..." required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reach">Your Audience Reach</label>
                      <select id="reach" name="reach" value={form.reach} onChange={handleChange}>
                        <option value="">Select range</option>
                        <option>Under 10K</option>
                        <option>10K – 100K</option>
                        <option>100K – 1M</option>
                        <option>1M+</option>
                        <option>No audience (first-time guest)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="availability">Availability</label>
                      <input type="text" id="availability" name="availability" value={form.availability} onChange={handleChange} placeholder="e.g., Weekday mornings, flexible" />
                    </div>
                  </>
                )}

                {activeForm === 'sponsor' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="budget">Estimated Monthly Budget</label>
                      <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                        <option value="">Select range</option>
                        <option>$500 – $2,000</option>
                        <option>$2,000 – $10,000</option>
                        <option>$10,000 – $50,000</option>
                        <option>$50,000+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">What are you promoting? *</label>
                      <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Product, service, or brand" required />
                    </div>
                  </>
                )}

                {(activeForm === 'listener' || activeForm === 'press') && (
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="message">
                    {activeForm === 'guest' ? 'Anything else we should know?' : 'Message *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={
                      activeForm === 'guest' ? 'Previous podcast appearances, speaking experience, links to work...'
                      : activeForm === 'sponsor' ? 'Tell us about your product and target audience...'
                      : 'Your message...'
                    }
                    required={activeForm !== 'guest'}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                  {activeForm === 'guest' && 'Submit Guest Pitch'}
                  {activeForm === 'sponsor' && 'Send Sponsor Inquiry'}
                  {activeForm === 'listener' && 'Send Feedback'}
                  {activeForm === 'press' && 'Send Press Request'}
                </button>

                <p className="contact-form__note">
                  We respond to all serious inquiries within 2–3 business days.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="contact-sidebar">
            <div className="contact-info-card">
              <h3>Quick Info</h3>
              <ul className="contact-info-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  hello@podcasthub.com
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Response within 2–3 business days
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  San Francisco, CA
                </li>
              </ul>
            </div>

            {activeForm === 'guest' && (
              <div className="contact-info-card">
                <h3>Guest Requirements</h3>
                <ul className="contact-checklist">
                  <li>✅ Unique expertise or story</li>
                  <li>✅ Comfortable with 2+ hour conversations</li>
                  <li>✅ Access to quality microphone</li>
                  <li>✅ Passionate about deep discussion</li>
                  <li>❌ No sales pitches</li>
                  <li>❌ No political campaigning</li>
                </ul>
              </div>
            )}

            {activeForm === 'sponsor' && (
              <div className="contact-info-card">
                <h3>Sponsorship Options</h3>
                <ul className="contact-checklist">
                  <li>🎯 Pre-roll (60s at episode start)</li>
                  <li>🎯 Mid-roll (90s mid-episode)</li>
                  <li>🎯 End-roll (60s at close)</li>
                  <li>📧 Newsletter sponsorship</li>
                  <li>🌐 Website banner placement</li>
                  <li>📱 Social media mentions</li>
                </ul>
              </div>
            )}

            <div className="contact-info-card">
              <h3>Social Media</h3>
              <div className="contact-socials">
                {['Twitter / X', 'Instagram', 'YouTube', 'LinkedIn'].map(s => (
                  <a key={s} href="#" className="contact-social-link">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
