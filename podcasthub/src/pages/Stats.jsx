import { useState } from 'react';
import './Stats.css';

// Mini bar chart data
const weeklyListeners = [12400, 15800, 14200, 18900, 22100, 19800, 24500];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const monthlyData = [
  { month: 'Jul', plays: 48000 },
  { month: 'Aug', plays: 52000 },
  { month: 'Sep', plays: 61000 },
  { month: 'Oct', plays: 58000 },
  { month: 'Nov', plays: 74000 },
  { month: 'Dec', plays: 68000 },
  { month: 'Jan', plays: 81000 },
  { month: 'Feb', plays: 93000 },
  { month: 'Mar', plays: 88000 },
  { month: 'Apr', plays: 102000 },
  { month: 'May', plays: 98000 },
  { month: 'Jun', plays: 115000 },
];

const topEpisodes = [
  { title: '#412 — Sam Altman: OpenAI, GPT-5 & the Future of AI', plays: 241800, duration: '3h 12m', growth: '+18%' },
  { title: '#400 — Elon Musk on Mars, Tesla & the Simulation', plays: 198400, duration: '2h 44m', growth: '+12%' },
  { title: '#388 — Game Theory & AI Risk with Liv Boeree', plays: 167200, duration: '1h 58m', growth: '+9%' },
  { title: '#382 — Yann LeCun: Deep Learning & the Future', plays: 154600, duration: '2h 20m', growth: '+7%' },
  { title: '#370 — Naval Ravikant: Wealth, Happiness & AI', plays: 143100, duration: '2h 05m', growth: '+5%' },
];

const audienceData = [
  { label: 'United States', pct: 42 },
  { label: 'United Kingdom', pct: 14 },
  { label: 'Canada', pct: 9 },
  { label: 'Australia', pct: 7 },
  { label: 'Germany', pct: 5 },
  { label: 'Other', pct: 23 },
];

const deviceData = [
  { label: 'iOS', pct: 48, color: 'var(--accent-primary)' },
  { label: 'Android', pct: 31, color: 'var(--accent-purple)' },
  { label: 'Web', pct: 15, color: 'var(--accent-cyan)' },
  { label: 'Desktop', pct: 6, color: 'var(--accent-secondary)' },
];

const platforms = [
  { name: 'Spotify', listeners: '12.4M', pct: 38 },
  { name: 'Apple Podcasts', listeners: '9.8M', pct: 30 },
  { name: 'PodcastHub', listeners: '6.2M', pct: 19 },
  { name: 'YouTube', listeners: '3.1M', pct: 10 },
  { name: 'Other', listeners: '1.0M', pct: 3 },
];

function BarChart({ data, maxVal, color = 'var(--accent-primary)' }) {
  return (
    <div className="bar-chart">
      {data.map((item, i) => {
        const height = ((item.plays || item) / maxVal) * 100;
        return (
          <div key={i} className="bar-chart__col">
            <div className="bar-chart__bar-wrap">
              <div
                className="bar-chart__bar"
                style={{ height: `${height}%`, background: color }}
                title={`${(item.plays || item).toLocaleString()}`}
              />
            </div>
            <span className="bar-chart__label">{item.month || weekDays[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Stats() {
  const [period, setPeriod] = useState('30d');
  const maxMonthly = Math.max(...monthlyData.map(d => d.plays));
  const maxWeekly = Math.max(...weeklyListeners);

  return (
    <main className="page-enter stats-page">
      <div className="stats-hero">
        <div className="container">
          <div className="stats-hero__inner">
            <div>
              <p className="section-label">Creator Dashboard</p>
              <h1 className="section-title">Analytics & Insights</h1>
              <p className="section-subtitle">Track growth, understand your audience, and optimise your content.</p>
            </div>
            <div className="stats-period-tabs">
              {['7d', '30d', '90d', '1y', 'All'].map(p => (
                <button
                  key={p}
                  className={`stats-period-btn${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container stats-body">

        {/* KPI Row */}
        <div className="kpi-row">
          {[
            { label: 'Total Plays',      value: '2.4M',  change: '+18%', up: true,  icon: '▶' },
            { label: 'Unique Listeners', value: '892K',  change: '+12%', up: true,  icon: '👥' },
            { label: 'Avg. Listen Time', value: '52 min',change: '+6%',  up: true,  icon: '⏱' },
            { label: 'Completion Rate',  value: '68%',   change: '-2%',  up: false, icon: '✓' },
            { label: 'New Subscribers',  value: '14,220',change: '+22%', up: true,  icon: '📌' },
            { label: 'Revenue',          value: '$8,410',change: '+31%', up: true,  icon: '💰' },
          ].map((kpi, i) => (
            <div key={i} className="kpi-card animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="kpi-card__top">
                <span className="kpi-card__icon">{kpi.icon}</span>
                <span className={`kpi-card__change ${kpi.up ? 'up' : 'down'}`}>
                  {kpi.up ? '↑' : '↓'} {kpi.change}
                </span>
              </div>
              <p className="kpi-card__value">{kpi.value}</p>
              <p className="kpi-card__label">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="charts-row">
          {/* Monthly plays */}
          <div className="chart-card chart-card--wide">
            <div className="chart-card__header">
              <div>
                <h3>Monthly Plays</h3>
                <p>Total episode plays over the past 12 months</p>
              </div>
              <span className="chart-card__total">1.24M <span>total plays</span></span>
            </div>
            <BarChart
              data={monthlyData}
              maxVal={maxMonthly}
              color="var(--accent-primary)"
            />
          </div>

          {/* Weekly listeners */}
          <div className="chart-card">
            <div className="chart-card__header">
              <div>
                <h3>This Week</h3>
                <p>Daily unique listeners</p>
              </div>
            </div>
            <BarChart
              data={weeklyListeners}
              maxVal={maxWeekly}
              color="var(--accent-purple)"
            />
          </div>
        </div>

        {/* Top Episodes */}
        <div className="stats-section">
          <h2 className="stats-section__title">Top Performing Episodes</h2>
          <div className="top-episodes-table">
            <div className="top-episodes-header">
              <span>#</span>
              <span>Episode</span>
              <span>Plays</span>
              <span>Duration</span>
              <span>Growth</span>
            </div>
            {topEpisodes.map((ep, i) => (
              <div key={i} className="top-episode-row animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="top-episode-row__rank">{i + 1}</span>
                <p className="top-episode-row__title">{ep.title}</p>
                <span className="top-episode-row__plays">{ep.plays.toLocaleString()}</span>
                <span className="top-episode-row__dur">{ep.duration}</span>
                <span className="top-episode-row__growth">{ep.growth}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience breakdown */}
        <div className="audience-row">
          {/* Geography */}
          <div className="audience-card">
            <h3 className="audience-card__title">Top Locations</h3>
            <div className="audience-bars">
              {audienceData.map((item, i) => (
                <div key={i} className="audience-bar-row">
                  <span className="audience-bar-label">{item.label}</span>
                  <div className="audience-bar-track">
                    <div
                      className="audience-bar-fill"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="audience-bar-pct">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div className="audience-card">
            <h3 className="audience-card__title">Devices</h3>
            <div className="donut-wrap">
              <svg className="donut" viewBox="0 0 120 120">
                {(() => {
                  let offset = 0;
                  const r = 46;
                  const circ = 2 * Math.PI * r;
                  return deviceData.map((d, i) => {
                    const dash = (d.pct / 100) * circ;
                    const gap = circ - dash;
                    const el = (
                      <circle
                        key={i}
                        cx="60" cy="60" r={r}
                        fill="none"
                        stroke={d.color}
                        strokeWidth="12"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
                <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="800" fontFamily="Syne, sans-serif">48%</text>
                <text x="60" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">iOS</text>
              </svg>
            </div>
            <div className="donut-legend">
              {deviceData.map((d, i) => (
                <div key={i} className="donut-legend-item">
                  <span className="donut-legend-dot" style={{ background: d.color }} />
                  <span>{d.label}</span>
                  <span className="donut-legend-pct">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="audience-card">
            <h3 className="audience-card__title">By Platform</h3>
            <div className="audience-bars">
              {platforms.map((p, i) => (
                <div key={i} className="audience-bar-row">
                  <span className="audience-bar-label">{p.name}</span>
                  <div className="audience-bar-track">
                    <div
                      className="audience-bar-fill"
                      style={{ width: `${p.pct}%`, background: 'var(--accent-cyan)' }}
                    />
                  </div>
                  <span className="audience-bar-pct">{p.listeners}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="stats-section">
          <h2 className="stats-section__title">Revenue Breakdown</h2>
          <div className="revenue-cards">
            {[
              { source: 'Sponsorships',    amount: '$5,200', pct: 62, color: 'var(--accent-primary)' },
              { source: 'Premium Subs',    amount: '$1,840', pct: 22, color: 'var(--accent-purple)' },
              { source: 'Listener Support',amount: '$890',   pct: 11, color: 'var(--accent-cyan)' },
              { source: 'Merchandise',     amount: '$480',   pct: 5,  color: 'var(--accent-secondary)' },
            ].map((r, i) => (
              <div key={i} className="revenue-card animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="revenue-card__header">
                  <span className="revenue-card__source">{r.source}</span>
                  <span className="revenue-card__amount">{r.amount}</span>
                </div>
                <div className="revenue-card__bar">
                  <div className="revenue-card__fill" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
                <span className="revenue-card__pct">{r.pct}% of total</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
