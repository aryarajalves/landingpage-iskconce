import React from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isMuted, toggleMusic, toggleMute } = useAudio();

  return (
    <aside
      aria-label="Tocador de música devocional"
      data-testid="audio-player-widget"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 transition-all duration-300 transform"
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-stone-100 backdrop-blur-md border border-amber-500/30 shadow-xl shadow-stone-950/30">
        
        {/* Compact Mini Music Disc Icon */}
        <div className="relative flex items-center justify-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 shadow-xs ${
              isPlaying ? 'animate-pulse' : ''
            }`}
          >
            <Music className="w-3 h-3 text-stone-950" />
          </div>
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
          )}
        </div>

        {/* Compact Title & Mini Equalizer */}
        <div className="flex items-center gap-1.5 pr-0.5">
          <span className="text-[11px] font-semibold text-amber-200 tracking-tight whitespace-nowrap">
            Maha-Mantra
          </span>

          {/* Mini Equalizer Waves */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-2.5" data-testid="audio-equalizer">
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms] h-full" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:75ms] h-1/2" />
            </div>
          )}
        </div>

        {/* Compact Action Buttons */}
        <div className="flex items-center gap-1 pl-1 border-l border-stone-700/60">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={toggleMusic}
            data-testid="btn-audio-toggle"
            aria-label={isPlaying ? 'Pausar música devocional' : 'Tocar música devocional'}
            className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all transform active:scale-90 shadow-xs"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Mute/Unmute Button (Visible when playing) */}
          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              data-testid="btn-audio-mute"
              aria-label={isMuted ? 'Desmutar música' : 'Mutar música'}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all transform active:scale-90"
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-rose-400" />
              ) : (
                <Volume2 className="w-3 h-3 text-stone-300" />
              )}
            </button>
          )}
        </div>

      </div>
    </aside>
  );
};
