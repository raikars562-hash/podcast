import { usePlayer } from '../hooks/usePlayer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import './Player.css';

function WaveformBars() {
  return (
    <div className="waveform">
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} className="waveform__bar" style={{ animationDelay: `${i * 0.07}s` }} />
      ))}
    </div>
  );
}

export default function Player() {
  const {
    currentEpisode, isPlaying, progress, volume, isMuted,
    playbackRate, currentTime, queue, isExpanded,
    togglePlay, seek, skipForward, skipBackward,
    setVolume, setIsMuted, setPlaybackRate, setIsExpanded,
    removeFromQueue, formatTime,
  } = usePlayer();

  if (!currentEpisode) return null;

  const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: ' ',         handler: () => currentEpisode && togglePlay() },
    { key: 'ArrowLeft', handler: () => currentEpisode && skipBackward() },
    { key: 'ArrowRight',handler: () => currentEpisode && skipForward() },
    { key: 'm',         handler: () => setIsMuted(m => !m) },
    { key: 'f',         handler: () => currentEpisode && setIsExpanded(e => !e) },
  ]);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  const totalSeconds = currentEpisode.durationSeconds || 3600;

  return (
    <>
      {/* Expanded Player */}
      {isExpanded && (
        <div className="player-expanded" onClick={() => setIsExpanded(false)}>
          <div className="player-expanded__inner" onClick={e => e.stopPropagation()}>
            <button className="player-expanded__close" onClick={() => setIsExpanded(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="player-expanded__artwork">
              <img src={currentEpisode.podcastImage} alt={currentEpisode.podcastTitle} />
              <div className={`player-expanded__artwork-glow${isPlaying ? ' active' : ''}`} />
              {isPlaying && <WaveformBars />}
            </div>

            <div className="player-expanded__meta">
              <p className="player-expanded__show">{currentEpisode.podcastTitle}</p>
              <h2 className="player-expanded__title">{currentEpisode.title}</h2>
              <p className="player-expanded__desc">{currentEpisode.description}</p>
            </div>

            <div className="player-expanded__progress">
              <div className="player__track" onClick={handleProgressClick}>
                <div className="player__fill" style={{ width: `${progress}%` }} />
                <div className="player__thumb" style={{ left: `${progress}%` }} />
              </div>
              <div className="player-expanded__times">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalSeconds)}</span>
              </div>
            </div>

            <div className="player-expanded__controls">
              <button className="player__rate-btn" onClick={() => setPlaybackRate(nextRate)}>
                {playbackRate}×
              </button>

              <button className="player__skip-btn" onClick={skipBackward} title="Back 10s">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                  <path d="M12 7v5l4 2"/>
                </svg>
                <span>10</span>
              </button>

              <button
                className={`player__play-btn player__play-btn--lg${isPlaying ? ' playing' : ''}`}
                onClick={() => togglePlay()}
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
              </button>

              <button className="player__skip-btn" onClick={skipForward} title="Forward 30s">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M12 7v5l4 2"/>
                </svg>
                <span>30</span>
              </button>

              <div className="player-expanded__volume">
                <button onClick={() => setIsMuted(m => !m)}>
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  )}
                </button>
                <input
                  type="range" min="0" max="1" step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={e => { setVolume(+e.target.value); setIsMuted(false); }}
                  className="player__volume-slider"
                />
              </div>
            </div>

            {queue.length > 0 && (
              <div className="player-expanded__queue">
                <h3>Up Next</h3>
                {queue.map(ep => (
                  <div key={ep.id} className="queue-item">
                    <img src={ep.podcastImage} alt="" className="queue-item__img" />
                    <div className="queue-item__info">
                      <p className="queue-item__title">{ep.title}</p>
                      <p className="queue-item__show">{ep.podcastTitle}</p>
                    </div>
                    <button className="queue-item__remove" onClick={() => removeFromQueue(ep.id)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mini Player */}
      <div className="player">
        <div className="player__progress-bar" onClick={handleProgressClick}>
          <div className="player__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="player__inner">
          <div className="player__info" onClick={() => setIsExpanded(true)}>
            <div className="player__artwork">
              <img src={currentEpisode.podcastImage} alt="" />
              {isPlaying && <div className="player__artwork-playing"><WaveformBars /></div>}
            </div>
            <div className="player__meta">
              <p className="player__show">{currentEpisode.podcastTitle}</p>
              <p className="player__episode">{currentEpisode.title}</p>
            </div>
          </div>

          <div className="player__controls">
            <button className="player__skip-btn" onClick={skipBackward}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
              </svg>
            </button>

            <button className={`player__play-btn${isPlaying ? ' playing' : ''}`} onClick={() => togglePlay()}>
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>

            <button className="player__skip-btn" onClick={skipForward}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>
              </svg>
            </button>
          </div>

          <div className="player__right">
            <span className="player__time">{formatTime(currentTime)} / {formatTime(totalSeconds)}</span>
            <button className="player__expand-btn" onClick={() => setIsExpanded(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
