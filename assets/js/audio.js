/**
 * audio.js — Synthesized Web Audio Engine
 * Pure Web Audio API: Zero external sound files.
 * Includes mechanical keyboard "thock" acoustics, lo-fi synth chords, and feedback chimes.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_audio_muted';
  let ctx = null;
  let muted = false;
  let loFiPlaying = false;
  let loFiTimer = null;

  try {
    muted = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {
    muted = false;
  }

  function getCtx() {
    if (!ctx) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) ctx = new AudioCtx();
      } catch (e) {
        console.warn('[AudioEngine] Web Audio API not supported:', e);
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTone(freq, type = 'sine', dur = 0.1, gain = 0.15, decay = true) {
    if (muted) return;
    const ac = getCtx();
    if (!ac) return;

    try {
      const osc = ac.createOscillator();
      const g = ac.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);

      g.gain.setValueAtTime(gain, ac.currentTime);
      if (decay) {
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      }

      osc.connect(g);
      g.connect(ac.destination);

      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + dur);
    } catch (e) {
      // Audio node failure fallback
    }
  }

  function playSequence(notes) {
    if (muted) return;
    const ac = getCtx();
    if (!ac) return;

    notes.forEach(({ freq, delay = 0, dur = 0.1, type = 'sine', gain = 0.12 }) => {
      setTimeout(() => {
        playTone(freq, type, dur, gain);
      }, delay * 1000);
    });
  }

  /* ─── Mechanical Keyboard "Thock" Sound ─── */
  function playThock(freq = 120) {
    if (muted) return;
    const ac = getCtx();
    if (!ac) return;

    try {
      const now = ac.currentTime;

      // Click snap (high transient)
      const oscHigh = ac.createOscillator();
      const gainHigh = ac.createGain();
      oscHigh.type = 'triangle';
      oscHigh.frequency.setValueAtTime(850, now);
      oscHigh.frequency.exponentialRampToValueAtTime(180, now + 0.025);
      gainHigh.gain.setValueAtTime(0.08, now);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      oscHigh.connect(gainHigh);
      gainHigh.connect(ac.destination);
      oscHigh.start(now);
      oscHigh.stop(now + 0.025);

      // Deep bottom-out resonant body ("thock")
      const oscLow = ac.createOscillator();
      const gainLow = ac.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(freq, now);
      oscLow.frequency.exponentialRampToValueAtTime(55, now + 0.06);
      gainLow.gain.setValueAtTime(0.12, now);
      gainLow.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      oscLow.connect(gainLow);
      gainLow.connect(ac.destination);
      oscLow.start(now);
      oscLow.stop(now + 0.06);
    } catch (e) {}
  }

  /* ─── Ambient Lo-Fi Synthesizer Loop ─── */
  // Progression: Dm9 -> G13 -> Cmaj9 -> Am9
  const LOFI_CHORDS = [
    [146.83, 220.00, 261.63, 329.63], // Dm9
    [196.00, 246.94, 329.63, 392.00], // G13
    [130.81, 196.00, 246.94, 329.63], // Cmaj9
    [110.00, 164.81, 220.00, 261.63]  // Am9
  ];
  let chordIndex = 0;

  function playLoFiChord() {
    if (!loFiPlaying || muted) return;
    const ac = getCtx();
    if (!ac) return;

    try {
      const chord = LOFI_CHORDS[chordIndex];
      chordIndex = (chordIndex + 1) % LOFI_CHORDS.length;

      const now = ac.currentTime;
      const dur = 3.6;

      // Filter for warm lo-fi tape saturation
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, now);

      const masterGain = ac.createGain();
      masterGain.gain.setValueAtTime(0.035, now);
      masterGain.gain.linearRampToValueAtTime(0.04, now + 0.5);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      filter.connect(masterGain);
      masterGain.connect(ac.destination);

      chord.forEach((freq, idx) => {
        const osc = ac.createOscillator();
        osc.type = 'triangle';
        // Subtle detune for analog warmth
        osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 0.3 : -0.3), now);
        osc.connect(filter);
        osc.start(now + idx * 0.08); // Slight strum
        osc.stop(now + dur);
      });
    } catch (e) {}
  }

  function startLoFi() {
    loFiPlaying = true;
    chordIndex = 0;
    playLoFiChord();
    if (loFiTimer) clearInterval(loFiTimer);
    loFiTimer = setInterval(playLoFiChord, 3800);
  }

  function stopLoFi() {
    loFiPlaying = false;
    if (loFiTimer) {
      clearInterval(loFiTimer);
      loFiTimer = null;
    }
  }

  function toggleLoFi() {
    if (loFiPlaying) {
      stopLoFi();
    } else {
      startLoFi();
    }
    return loFiPlaying;
  }

  function isLoFiPlaying() {
    return loFiPlaying;
  }

  /* ─── Coffee Sip / Refill Sound ─── */
  function playRefill() {
    if (muted) return;
    const ac = getCtx();
    if (!ac) return;
    try {
      const now = ac.currentTime;
      [300, 360, 420, 500, 600, 720].forEach((freq, idx) => {
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        g.gain.setValueAtTime(0.06, now + idx * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.08);
        osc.connect(g);
        g.connect(ac.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.08);
      });
    } catch (e) {}
  }

  /* ─── Standard UI Sounds ─── */
  function playClick() {
    playTone(720, 'sine', 0.05, 0.12);
  }

  function playChime() {
    playSequence([
      { freq: 523.25, delay: 0.00, dur: 0.12, type: 'triangle', gain: 0.10 },
      { freq: 659.25, delay: 0.07, dur: 0.12, type: 'triangle', gain: 0.10 },
      { freq: 783.99, delay: 0.14, dur: 0.20, type: 'triangle', gain: 0.12 }
    ]);
  }

  function playSuccess() {
    playSequence([
      { freq: 523.25, delay: 0.00, dur: 0.09, type: 'sine', gain: 0.10 },
      { freq: 659.25, delay: 0.08, dur: 0.09, type: 'sine', gain: 0.12 },
      { freq: 1046.50, delay: 0.16, dur: 0.35, type: 'sine', gain: 0.14 }
    ]);
  }

  function playError() {
    playSequence([
      { freq: 300, delay: 0.00, dur: 0.08, type: 'sawtooth', gain: 0.08 },
      { freq: 220, delay: 0.09, dur: 0.14, type: 'sawtooth', gain: 0.10 }
    ]);
  }

  function playType() {
    const freq = 340 + Math.random() * 80;
    playTone(freq, 'triangle', 0.03, 0.04);
  }

  function playPing() {
    playSequence([
      { freq: 880, delay: 0.00, dur: 0.06, type: 'sine', gain: 0.08 },
      { freq: 1760, delay: 0.05, dur: 0.18, type: 'sine', gain: 0.10 }
    ]);
  }

  function toggleMute() {
    muted = !muted;
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch (e) {}
    if (muted && loFiPlaying) stopLoFi();
    if (!muted) playPing();
    updateMuteUI();
    return muted;
  }

  function isMuted() {
    return muted;
  }

  function updateMuteUI() {
    const btns = document.querySelectorAll('.sound-toggle, #sound-toggle, [data-action="toggle-sound"]');
    btns.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(!muted));
      btn.setAttribute('title', muted ? 'Unmute sounds' : 'Mute sounds');
      btn.innerHTML = muted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    });
  }

  window.AudioEngine = {
    playClick,
    playChime,
    playSuccess,
    playError,
    playType,
    playPing,
    playThock,
    playRefill,
    toggleLoFi,
    startLoFi,
    stopLoFi,
    isLoFiPlaying,
    toggleMute,
    isMuted
  };

  // Backwards compatibility with previous code
  window.soundEngine = window.AudioEngine;

  document.addEventListener('DOMContentLoaded', () => {
    updateMuteUI();
    document.querySelectorAll('.sound-toggle, #sound-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMute();
      });
    });
  });
})();
