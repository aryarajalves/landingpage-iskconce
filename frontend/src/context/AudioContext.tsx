import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { TEMPLE_DATA } from '../data/templeInfo';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isPausedByVideo: boolean;
  hasStarted: boolean;
  volume: number;
  playMusic: () => Promise<void>;
  pauseMusic: (byVideo?: boolean) => void;
  toggleMusic: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  onVideoPlay: () => void;
  onVideoPause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Soft peaceful background ambient volume (reduced by another 40% to 0.20)
const DEFAULT_VOLUME = 0.20;

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPausedByVideo, setIsPausedByVideo] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(TEMPLE_DATA.music.audioUrl);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = DEFAULT_VOLUME;

      const handleEnded = () => {
        setIsPlaying(false);
      };
      const handlePause = () => {
        setIsPlaying(false);
      };
      const handlePlay = () => {
        setIsPlaying(true);
        setHasStarted(true);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('play', handlePlay);

      audioRef.current = audio;

      // Event listener group to trigger audio on any initial interaction (click, touch, scroll, key)
      const interactionEvents = ['pointerdown', 'click', 'touchstart', 'touchend', 'scroll', 'wheel', 'keydown'];

      const removeInteractionListeners = () => {
        interactionEvents.forEach((evt) => {
          document.removeEventListener(evt, startAudioOnInteraction, true);
          window.removeEventListener(evt, startAudioOnInteraction, true);
        });
      };

      const startAudioOnInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasStarted(true);
              removeInteractionListeners();
            })
            .catch(() => {});
        } else {
          removeInteractionListeners();
        }
      };

      // 1. Attempt immediate autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(() => {
            // Autoplay restricted by browser: attach global interaction listeners with capture phase
            interactionEvents.forEach((evt) => {
              document.addEventListener(evt, startAudioOnInteraction, { capture: true, passive: true });
              window.addEventListener(evt, startAudioOnInteraction, { capture: true, passive: true });
            });
          });
      }

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('play', handlePlay);
        removeInteractionListeners();
        audio.pause();
        audioRef.current = null;
      };
    }
  }, []);

  const playMusic = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      setIsPausedByVideo(false);
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pauseMusic = useCallback((byVideo: boolean = false) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    if (byVideo) {
      setIsPausedByVideo(true);
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      pauseMusic(false);
    } else {
      await playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !audioRef.current.muted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const setVolume = useCallback((newVol: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, newVol));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
  }, []);

  const onVideoPlay = useCallback(() => {
    if (isPlaying || (audioRef.current && !audioRef.current.paused)) {
      pauseMusic(true);
    }
  }, [isPlaying, pauseMusic]);

  const onVideoPause = useCallback(() => {
    if (isPausedByVideo && audioRef.current) {
      playMusic().catch(() => {});
    }
  }, [isPausedByVideo, playMusic]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isPausedByVideo,
        hasStarted,
        volume,
        playMusic,
        pauseMusic,
        toggleMusic,
        toggleMute,
        setVolume,
        onVideoPlay,
        onVideoPause,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
