import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentEpisode) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => {
          const next = t + playbackRate;
          const dur = currentEpisode.durationSeconds || 3600;
          if (next >= dur) {
            setIsPlaying(false);
            return dur;
          }
          setProgress((next / dur) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentEpisode, playbackRate]);

  const play = useCallback((episode) => {
    if (currentEpisode?.id !== episode.id) {
      setCurrentEpisode(episode);
      setCurrentTime(0);
      setProgress(0);
      setDuration(episode.durationSeconds || 3600);
    }
    setIsPlaying(true);
  }, [currentEpisode]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const togglePlay = useCallback((episode) => {
    if (episode && currentEpisode?.id !== episode.id) {
      play(episode);
    } else {
      setIsPlaying(p => !p);
    }
  }, [currentEpisode, play]);

  const seek = useCallback((pct) => {
    const dur = currentEpisode?.durationSeconds || 3600;
    const t = (pct / 100) * dur;
    setCurrentTime(t);
    setProgress(pct);
  }, [currentEpisode]);

  const skipForward = useCallback(() => {
    setCurrentTime(t => {
      const dur = currentEpisode?.durationSeconds || 3600;
      const next = Math.min(t + 30, dur);
      setProgress((next / dur) * 100);
      return next;
    });
  }, [currentEpisode]);

  const skipBackward = useCallback(() => {
    setCurrentTime(t => {
      const dur = currentEpisode?.durationSeconds || 3600;
      const next = Math.max(t - 10, 0);
      setProgress((next / dur) * 100);
      return next;
    });
  }, [currentEpisode]);

  const addToQueue = useCallback((episode) => {
    setQueue(q => q.find(e => e.id === episode.id) ? q : [...q, episode]);
  }, []);

  const removeFromQueue = useCallback((id) => {
    setQueue(q => q.filter(e => e.id !== id));
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${m}:${String(s).padStart(2,'0')}`;
  };

  return (
    <PlayerContext.Provider value={{
      currentEpisode, isPlaying, progress, volume, isMuted,
      playbackRate, duration, currentTime, queue, isExpanded,
      play, pause, togglePlay, seek, skipForward, skipBackward,
      setVolume, setIsMuted, setPlaybackRate,
      addToQueue, removeFromQueue, setIsExpanded, formatTime,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
