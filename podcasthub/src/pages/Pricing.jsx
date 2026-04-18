import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pricingPlans } from '../data/podcasts';
import './Pricing.css';

const faq = [
  { q: 'Can I cancel anytime?', a: 'Yes. There are no long-term commitments. Cancel your subscription at any time, no questions asked.' },
  { q: 'Is there a free trial?', a: 'Pro plan includes a 14-day free trial. No credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay / Google Pay.' },
  { q: 'Can I switch plans?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings.' },
  { q: 'Is my data secure?', a: 'Yes. All data is encrypted in transit and at rest. We never sell your data to third parties.' },
  { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off Pro plans. Verify your student status through our partner SheerID.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="page-enter pricing-page">
      <div className="pricing-hero">
        <div className="container">
          <p className="section-label" style={{ justifyContent: 'center' }}>Pricing</p>
          <h1 className="pricing-hero__title">Simple, transparent pricing</h1>
          <p className="pricing-hero__subtitle">Start free. Upgrade when you need more. No hidden fees, ever.</p>

          <div className="pricing-toggle">
            <span className={!annual ? 'active' : ''}>Monthly</span>
            <button
              className={`pricing-toggle__btn${annual ? ' on' : ''}`}
              onClick={() => setAnnual(a => !a)}
              aria-label="Toggle annual billing"
            >
              <span className="pricing-toggle__knob" />
            </button>
            <span className={annual ? 'active' : ''}>
              Annual
              <span className="pricing-toggle__save">Save 20%</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container pricing-body">
        <div className="pricing-cards">
          {pricingPlans.map((plan, i) => (
            <div
              key={plan.id}
              className={`pricing-card animate-fade-up${plan.popular ? ' pricing-card--popular' : ''}`}
              style={{ '--plan-color': plan.color, animationDelay: `${i * 0.1}s` }}
            >
              {plan.popular && <div className="pricing-card__popular-badge">Most Popular</div>}

              <div className="pricing-card__header">
                <h2 className="pricing-card__name">{plan.name}</h2>
                <p className="pricing-card__desc">{plan.description}</p>
                <div className="pricing-card__price">
                  {plan.price === 0 ? (
                    <span className="pricing-card__amount">Free</span>
                  ) : (
                    <>
                      <span className="pricing-card__currency">$</span>
                      <span className="pricing-card__amount">
                        {annual ? (plan.price * 0.8).toFixed(2) : plan.price}
                      </span>
                      <span className="pricing-card__period">/ {plan.period}</span>
                    </>
                  )}
                </div>
                {annual && plan.price > 0 && (
                  <p className="pricing-card__saving">
                    Save ${(plan.price * 12 * 0.2).toFixed(2)} / year
                  </p>
                )}
              </div>

              <ul className="pricing-card__features">
                {plan.features.map((feature, j) => (
                  <li key={j}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`pricing-card__cta${plan.popular ? ' btn btn--primary' : ' btn btn--ghost'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="pricing-compare">
          <h2 className="pricing-compare__title">Full Feature Comparison</h2>
          <div className="pricing-compare-table">
            <div className="pricing-compare-header">
              <div>Feature</div>
              <div>Free</div>
              <div className="highlight">Pro</div>
              <div>Creator</div>
            </div>
            {[
              ['Podcast Library Access', '✓', '✓', '✓'],
              ['Subscriptions', '5', 'Unlimited', 'Unlimited'],
              ['Audio Quality', 'Standard', 'HD + Lossless', 'HD + Lossless'],
              ['Ads', 'Yes', 'Ad-free', 'Ad-free'],
              ['Offline Downloads', '—', '✓', '✓'],
              ['Devices', '1', '3', 'Unlimited'],
              ['AI Recommendations', 'Basic', 'Advanced', 'Advanced'],
              ['Speed Control', '—', '✓', '✓'],
              ['Sleep Timer', '—', '✓', '✓'],
              ['Podcast Hosting', '—', '—', '5 shows'],
              ['Analytics', '—', 'Basic', 'Advanced'],
              ['Monetization', '—', '—', '✓'],
              ['Priority Support', '—', '—', '✓'],
            ].map(([feature, free, pro, creator], i) => (
              <div key={i} className={`pricing-compare-row${i % 2 === 0 ? ' alt' : ''}`}>
                <div className="pricing-compare-row__feature">{feature}</div>
                <div>{free}</div>
                <div className="highlight">{pro}</div>
                <div>{creator}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="pricing-faq">
          <h2 className="pricing-faq__title">Frequently Asked Questions</h2>
          <div className="pricing-faq__list">
            {faq.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-item__question">
                  <span>{item.q}</span>
                  <svg className="faq-item__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                {openFaq === i && (
                  <p className="faq-item__answer animate-fade-in">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pricing-bottom-cta">
          <h2>Still have questions?</h2>
          <p>Talk to our team — we're happy to help you find the right plan.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">Contact Sales</Link>
            <Link to="/signup" className="btn btn--ghost btn--lg">Start Free Trial</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
