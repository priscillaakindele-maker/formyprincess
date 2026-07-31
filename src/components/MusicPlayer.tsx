import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, Sparkles, ChevronDown } from 'lucide-react';

interface Song {
  id: string;
  name: string;
  bpm: number;
  notes: Array<{ bass?: number; chord?: number; melody: number }>;
}

const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
};

const SONGS: Song[] = [
  {
    id: 'canon',
    name: 'Canon in C (Romantic Canon)',
    bpm: 72,
    notes: [
      { bass: N.C3, chord: N.G4, melody: N.E5 },
      { bass: N.C3, chord: N.E4, melody: N.G5 },
      { bass: N.G3, chord: N.D4, melody: N.D5 },
      { bass: N.G3, chord: N.B4, melody: N.G5 },
      { bass: N.A3, chord: N.E4, melody: N.C5 },
      { bass: N.A3, chord: N.C5, melody: N.E5 },
      { bass: N.E3, chord: N.B3, melody: N.B4 },
      { bass: N.E3, chord: N.G4, melody: N.E5 },
      { bass: N.F3, chord: N.C4, melody: N.A4 },
      { bass: N.F3, chord: N.A4, melody: N.C5 },
      { bass: N.C3, chord: N.G3, melody: N.G4 },
      { bass: N.C3, chord: N.E4, melody: N.C5 },
      { bass: N.F3, chord: N.C4, melody: N.A4 },
      { bass: N.F3, chord: N.A4, melody: N.F5 },
      { bass: N.G3, chord: N.D4, melody: N.B4 },
      { bass: N.G3, chord: N.G4, melody: N.D5 },
    ]
  },
  {
    id: 'lullaby',
    name: "Princess Jima's Lullaby",
    bpm: 78,
    notes: [
      { bass: N.F3, chord: N.A4, melody: N.C5 },
      { bass: N.F3, chord: N.C5, melody: N.F5 },
      { bass: N.G3, chord: N.B4, melody: N.D5 },
      { bass: N.G3, chord: N.D5, melody: N.G5 },
      { bass: N.E3, chord: N.G4, melody: N.B4 },
      { bass: N.E3, chord: N.B4, melody: N.E5 },
      { bass: N.A3, chord: N.C5, melody: N.E5 },
      { bass: N.A3, chord: N.E5, melody: N.A5 },
      { bass: N.D3, chord: N.F4, melody: N.A4 },
      { bass: N.D3, chord: N.A4, melody: N.D5 },
      { bass: N.G3, chord: N.B4, melody: N.D5 },
      { bass: N.G3, chord: N.D5, melody: N.G5 },
    ]
  },
  {
    id: 'waltz',
    name: 'Sweet Heartbeats Waltz',
    bpm: 85,
    notes: [
      { bass: N.C3, chord: N.E4, melody: N.G5 },
      { bass: N.C3, chord: N.G4, melody: N.C6 },
      { bass: N.A3, chord: N.C4, melody: N.E5 },
      { bass: N.A3, chord: N.E4, melody: N.A5 },
      { bass: N.F3, chord: N.A4, melody: N.C5 },
      { bass: N.F3, chord: N.C5, melody: N.F5 },
      { bass: N.G3, chord: N.B4, melody: N.D5 },
      { bass: N.G3, chord: N.D5, melody: N.G5 },
    ]
  }
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const playNoteTriple = (ctx: AudioContext, bass?: number, chord?: number, melody?: number) => {
    const now = ctx.currentTime;

    // 1. Melody bell note (soft sine with gentle harmonic decay)
    if (melody) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.0);
    }

    // 2. Mid Chord note (soft triangle wave)
    if (chord) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(chord, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.6);
    }

    // 3. Deep Bass warmth (sine wave)
    if (bass) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(bass, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.2);
    }
  };

  const startMusic = async (songIdx = selectedSongIndex) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;

      // Unlock WebAudio on iOS Safari & Mobile Chrome
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Play 1-frame silent buffer to fully unblock WebAudio engine on mobile devices
      try {
        const silentBuf = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = silentBuf;
        source.connect(ctx.destination);
        source.start(0);
      } catch {
        // Ignore fallback errors
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      const song = SONGS[songIdx];
      stepRef.current = 0;

      const playNextStep = () => {
        if (!audioCtxRef.current) return;
        const noteObj = song.notes[stepRef.current % song.notes.length];
        stepRef.current++;

        playNoteTriple(ctx, noteObj.bass, noteObj.chord, noteObj.melody);
      };

      playNextStep();
      const intervalMs = Math.round((60 / song.bpm) * 1000);
      timerRef.current = window.setInterval(playNextStep, intervalMs);
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext not supported or blocked by browser:', e);
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const handleSelectSong = (index: number) => {
    setSelectedSongIndex(index);
    setIsDropdownOpen(false);
    if (isPlaying) {
      startMusic(index);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full p-1 border border-rose-200/80 shadow-md">
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-full text-xs font-sans-body font-semibold transition-all active:scale-95 ${
            isPlaying
              ? 'bg-rose-600 text-white shadow-rose-900/30'
              : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
          }`}
          title={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
          id="bg-music-toggle"
        >
          <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin' : 'text-rose-500'}`} />
          <span>{isPlaying ? 'Melody Playing' : 'Play Melody'}</span>
          {isPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-500" />
          )}
        </button>

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center text-rose-800 hover:bg-rose-100/70 rounded-full transition-colors"
          title="Choose a romantic melody"
          id="music-selector-btn"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 sm:right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-rose-100 p-2 z-50 animate-in fade-in zoom-in-95">
          <div className="text-[10px] uppercase font-bold text-rose-400 px-3 py-1.5 tracking-wider">
            Select Romantic Melody
          </div>
          {SONGS.map((song, idx) => (
            <button
              key={song.id}
              onClick={() => handleSelectSong(idx)}
              className={`w-full text-left px-3 py-2.5 min-h-[44px] rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                selectedSongIndex === idx
                  ? 'bg-rose-50 text-rose-800 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50 active:bg-rose-50'
              }`}
            >
              <span className="truncate pr-2">{song.name}</span>
              {selectedSongIndex === idx && <Sparkles className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
