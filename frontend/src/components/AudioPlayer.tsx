import React from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useRouter } from '../context/RouterContext';
import { isAudioAllowedPath } from '../utils/audioRoutes';

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isMuted, toggleMusic, toggleMute } = useAudio();
  const { currentPath } = useRouter();

  // O dispositivo de som só aparece nas páginas autorizadas (Domingo e Programações Online)
  if (!isAudioAllowedPath(currentPath)) {
    return null;
  }

  return (
    <aside
      aria-label="Dispositivo de som do Hare Krishna"
      data-testid="audio-player-widget"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 transition-all duration-300 transform"
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-stone-900/90 hover:bg-stone-900 text-stone-100 backdrop-blur-md border border-amber-500/40 shadow-xl shadow-stone-950/30">
        
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
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-amber-200 tracking-tight whitespace-nowrap leading-tight">
              Som Hare Krishna
            </span>
            <span className="text-[9px] text-stone-400 whitespace-nowrap leading-tight hidden sm:inline">
              Maha-Mantra
            </span>
          </div>

          {/* Mini Equalizer Waves */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-2.5 ml-1" data-testid="audio-equalizer">
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms] h-full" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:75ms] h-1/2" />
            </div>
          )}
        </div>

        {/* Action Controls: Desativar / Ativar e Mutar */}
        <div className="flex items-center gap-1.5 pl-1.5 border-l border-stone-700/60">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={toggleMusic}
            data-testid="btn-audio-toggle"
            title={isPlaying ? 'Desativar som do Hare Krishna' : 'Ativar som do Hare Krishna'}
            aria-label={isPlaying ? 'Desativar som do Hare Krishna' : 'Ativar som do Hare Krishna'}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-medium text-xs flex items-center gap-1 transition-all transform active:scale-95 shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold hidden sm:inline">Desativar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current translate-x-0.5" />
                <span className="text-[10px] font-bold hidden sm:inline">Ativar</span>
              </>
            )}
          </button>

          {/* Mute/Unmute Button (Visible when playing) */}
          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              data-testid="btn-audio-mute"
              title={isMuted ? 'Desmutar áudio' : 'Mutar áudio'}
              aria-label={isMuted ? 'Desmutar áudio' : 'Mutar áudio'}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all transform active:scale-90 cursor-pointer"
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
