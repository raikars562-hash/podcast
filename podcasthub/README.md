# 🎙️ PodcastHub

A full professional podcast website — **React 18 + Vite 5 + React Router v6**.  
**55 source files · 10,855+ lines of code · 16 pages/routes.**

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview production build
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Animated hero, featured show, trending grid, episode list, features, testimonials, CTA |
| `/episodes` | **Episodes** | Featured hero, full episode list, search, filter, sort |
| `/episode/:id` | **Episode Detail** | Visual waveform player, chapter markers, show notes, transcript, related |
| `/discover` | **Discover** | Full-text search, sidebar category filter, grid/list toggle, sort |
| `/trending` | **Trending** | Podium top-3, sortable ranked list, period & genre tabs |
| `/categories` | **Categories** | Color-coded genre cards with show previews |
| `/podcast/:id` | **Podcast Detail** | Episodes · About · Chapter Markers · Reviews tabs |
| `/guests` | **Guests** | Profile cards with episode links, search, tag filter |
| `/library` | **My Library** | Listening stats, continue listening, queue, downloads, history |
| `/about` | **About** | Host bio, team, mission, timeline milestones, press logos |
| `/subscribe` | **Subscribe** | Spotify, Apple, YouTube, Google, RSS + newsletter |
| `/contact` | **Contact** | Guest pitch · Sponsor inquiry · Listener feedback · Press forms |
| `/pricing` | **Pricing** | Monthly/annual toggle, feature comparison table, FAQ accordion |
| `/signin` | **Sign In** | Email + Google + Apple OAuth UI |
| `/signup` | **Sign Up** | Account creation form |
| `*` | **404** | Custom not-found page |

---

## ✨ Features

### 🎧 Audio Player
- **Mini bar** — fixed bottom bar with progress scrubber, play/pause, skip ±10/30s
- **Expanded modal** — full artwork, waveform visualiser, speed control (0.5×–3×), volume, queue management
- **Keyboard shortcuts** — `Space` play/pause · `←/→` skip · `M` mute · `F` full player · `?` shortcut help

### 🔍 Discovery
- Full-text search across 16+ podcasts and episodes
- Sidebar category filter + tag pills
- Sort by: most popular, highest rated, most episodes, latest, shortest, longest
- Grid and list view toggle

### 📊 Library / Dashboard
- Listening stats (hours, subscriptions, streak, downloads)
- Continue listening with per-episode progress bars
- Up-next queue with drag-ready list
- Downloaded episodes management
- Full listening history

### 🎙️ Episode Detail Player
- 80-bar animated waveform scrubber
- 8 chapter markers with live active-state tracking
- Jump-to-chapter buttons
- Show notes with structured headings/lists
- Auto-generated transcript with speaker labels
- Related episodes

### 💳 Pricing
- Monthly / annual billing toggle (20% saving)
- Full feature comparison table
- Expandable FAQ accordion
- 3-tier plans: Free · Pro · Creator

### 📬 Contact Forms
- 4 form types: Guest Pitch · Sponsor Inquiry · Listener Feedback · Press & Media
- Dynamic fields per form type
- Success state with confirmation

### 🌐 Platform
- Fully responsive — mobile hamburger menu, all grids adapt
- Sticky navbar with blur on scroll
- Persistent audio player (survives route changes)
- Toast notifications system
- Back-to-top button
- Keyboard shortcuts modal
- Skeleton loading components
- 404 page

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css        Sticky nav, mobile menu, search overlay
│   ├── Footer.jsx / .css        5-column footer with social & app links
│   ├── Player.jsx / .css        Mini bar + expanded modal player
│   ├── PodcastCard.jsx / .css   Grid card with hover play, badge, stats
│   ├── EpisodeCard.jsx / .css   Horizontal episode card with waveform indicator
│   ├── Toast.jsx / .css         Toast notification system (success/error/info/warning)
│   ├── LoadingSpinner.jsx / .css Spinner + skeleton card/episode components
│   ├── BackToTop.jsx / .css     Scroll-to-top floating button
│   └── KeyboardHelp.jsx / .css  Keyboard shortcuts overlay modal
│
├── pages/
│   ├── Home.jsx / .css          Full landing page
│   ├── Episodes.jsx / .css      Episode listing with featured hero
│   ├── EpisodeDetail.jsx / .css Waveform player + chapters + notes + transcript
│   ├── Discover.jsx / .css      Search + category browse
│   ├── Trending.jsx / .css      Charts & rankings
│   ├── Categories.jsx / .css    Genre cards
│   ├── PodcastDetail.jsx / .css Show page with tabs
│   ├── Guests.jsx / .css        Guest profile cards
│   ├── Library.jsx / .css       User dashboard + queue + history
│   ├── About.jsx / .css         About page with timeline
│   ├── Subscribe.jsx / .css     Platform links + newsletter
│   ├── Contact.jsx / .css       Multi-type contact forms
│   ├── Pricing.jsx / .css       Plans + comparison + FAQ
│   ├── Auth.jsx / .css          Sign In / Sign Up
│   └── NotFound.jsx             404
│
├── hooks/
│   ├── usePlayer.jsx            Global audio player context & state
│   ├── useLocalStorage.js       Persistent localStorage hook
│   ├── useDebounce.js           Debounce hook for search inputs
│   └── useKeyboardShortcuts.js  Keyboard event registration hook
│
├── data/
│   └── podcasts.js              All mock data (podcasts, episodes, testimonials, pricing…)
│
└── styles/
    └── globals.css              Design system, CSS variables, animations, utilities
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` |
| Card | `#16161f` |
| Accent Yellow | `#e8ff47` |
| Accent Purple | `#9b6dff` |
| Accent Orange | `#ff6b35` |
| Accent Cyan | `#00d9c4` |
| Display Font | Syne (Google Fonts) |
| Body Font | DM Sans (Google Fonts) |

---

## 🛠 Tech Stack

- **React 18** — functional components, hooks, context
- **Vite 5** — HMR dev server, optimised production build
- **React Router v6** — client-side routing with dynamic params
- **CSS** — component-scoped files, CSS custom properties, no framework

---

*Built with ❤️ by PodcastHub*
