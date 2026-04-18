import { useState, useEffect } from 'react';
import './KeyboardHelp.css';

const shortcuts = [
  { keys: ['Space'],        action: 'Play / Pause' },
  { keys: ['←'],            action: 'Skip back 10 seconds' },
  { keys: ['→'],            action: 'Skip forward 30 seconds' },
  { keys: ['M'],            action: 'Toggle mute' },
  { keys: ['F'],            action: 'Open / close full player' },
  { keys: ['?'],            action: 'Show keyboard shortcuts' },
];

export default function KeyboardHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '?') setOpen(o => !o);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <button
        className="keyboard-help-trigger"
        onClick={() => setOpen(o => !o)}
        title="Keyboard shortcuts (?)"
        aria-label="Keyboard shortcuts"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>
        </svg>
        <span>?</span>
      </button>

      {open && (
        <div className="keyboard-help-overlay" onClick={() => setOpen(false)}>
          <div className="keyboard-help-modal" onClick={e => e.stopPropagation()}>
            <div className="keyboard-help-modal__header">
              <h3>Keyboard Shortcuts</h3>
              <button onClick={() => setOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <ul className="keyboard-help-list">
              {shortcuts.map((s, i) => (
                <li key={i}>
                  <span className="keyboard-help-action">{s.action}</span>
                  <div className="keyboard-help-keys">
                    {s.keys.map((k, j) => (
                      <kbd key={j}>{k}</kbd>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <p className="keyboard-help-footer">Press <kbd>?</kbd> or <kbd>Esc</kbd> to close</p>
          </div>
        </div>
      )}
    </>
  );
}
