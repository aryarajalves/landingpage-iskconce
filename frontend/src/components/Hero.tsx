import React, { useRef, useState } from 'react';
import { Sparkles, MessageCircle, MapPin, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;

    if (isEnded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-10 shadow-md border border-amber-200/80 mb-8 text-stone-800 relative overflow-hidden" data-testid="hero-section">
      
      {/* Top Subtle Mandala Accent */}
      <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 opacity-5 pointer-events-none text-amber-900">
        <svg className="w-96 h-96" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
          <path d="M100 20 L100 180 M20 100 L180 100 M43 43 L157 157 M43 157 L157 43" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Text & Information (7 cols on desktop) */}
        <div className="lg:col-span-7 text-center lg:text-left">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-sm text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Festival de Domingo • Entrada 100% Gratuita</span>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
            <span className="text-2xl sm:text-3xl">🪷</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-stone-900">
              {TEMPLE_DATA.name}
            </h1>
          </div>
          
          <p className="text-amber-800 font-medium text-base sm:text-lg mb-5">
            {TEMPLE_DATA.subtitle}
          </p>

          {/* Maha Mantra Box */}
          <div className="mb-5 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-sm text-stone-800">
            <span className="font-bold text-amber-800 block text-xs tracking-wider uppercase mb-1">
              Maha-Mantra Hare Krishna
            </span>
            <p className="font-serif italic text-xs sm:text-base leading-relaxed text-stone-700">
              &ldquo;{TEMPLE_DATA.mahaMantra}&rdquo;
            </p>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            Um espaço sagrado e acolhedor aberto a todas as pessoas e famílias para vivenciar a paz, meditação, música devocional (kirtan), estudo dos clássicos védicos e banquete vegetariano gratuito sob a linhagem de <strong>Srila Prabhupada</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href={TEMPLE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
            <a
              href={TEMPLE_DATA.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50/80 text-stone-800 font-semibold text-sm shadow-sm hover:shadow-md border border-stone-200 hover:border-amber-300 transition-all active:scale-[0.98]"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Como Chegar ao Templo</span>
            </a>
          </div>

        </div>

        {/* Right Column: 100% Clean Smartphone Video (No YouTube/Shorts logos, only Phone + Play button) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center" data-testid="hero-short-video">
          
          <div className="w-full max-w-[280px] sm:max-w-[310px] bg-stone-900 rounded-[2.5rem] p-2.5 shadow-2xl ring-4 ring-amber-200/80 border-4 border-stone-800">
            {/* Top speaker notch */}
            <div className="w-20 h-3.5 bg-stone-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-1 bg-stone-700 rounded-full" />
            </div>

            {/* Video Container */}
            <div
              className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-stone-950 shadow-inner group cursor-pointer"
              onClick={handlePlayToggle}
              data-testid="video-player-container"
            >
              <video
                ref={videoRef}
                src={TEMPLE_DATA.contact.localVideoUrl}
                playsInline
                preload="metadata"
                onEnded={() => {
                  setIsPlaying(false);
                  setIsEnded(true);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Minimal Clean Play / Pause / Replay Overlay Button */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/40'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayToggle();
                  }}
                  data-testid="btn-video-play"
                  aria-label={isEnded ? 'Repetir vídeo' : isPlaying ? 'Pausar vídeo' : 'Assistir vídeo'}
                  className="p-5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-950 shadow-2xl backdrop-blur-md transition-transform transform active:scale-90 hover:scale-105"
                >
                  {isEnded ? (
                    <RotateCcw className="w-8 h-8 fill-none" />
                  ) : isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Discreet Mute/Unmute in corner (only shown on hover or when playing) */}
              <button
                type="button"
                onClick={handleMuteToggle}
                data-testid="btn-video-mute"
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur transition-opacity opacity-0 group-hover:opacity-100"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
