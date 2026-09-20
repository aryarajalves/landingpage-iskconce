import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { TEMPLE_DATA } from '../data/templeInfo';
import { useRouter } from './RouterContext';
import { isAudioAllowedPath } from '../utils/audioRoutes';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isPausedByVideo: boolean;
  isManuallyPaused: boolean;
  hasStarted: boolean;
  volume: number;
  playMusic: (targetPath?: string, isManualAction?: boolean) => Promise<void>;
  unlockAndPlayForRoute: (targetPath: string) => Promise<void>;
  pauseMusic: (byVideo?: boolean) => void;
  toggleMusic: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  onVideoPlay: () => void;
  onVideoPause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Soft peaceful background ambient volume (0.20)
const DEFAULT_VOLUME = 0.20;

const STORAGE_KEY_MANUALLY_PAUSED = 'iskcon_audio_manually_paused';

const isStorageManuallyPaused = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_MANUALLY_PAUSED) === 'true';
  } catch {
    return false;
  }
};

const setStorageManuallyPaused = (paused: boolean) => {
  if (typeof window === 'undefined') return;
  try {
    if (paused) {
      localStorage.setItem(STORAGE_KEY_MANUALLY_PAUSED, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_MANUALLY_PAUSED);
    }
  } catch {
    // Fallback silencioso caso cookies/storage estejam desabilitados
  }
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPausedByVideo, setIsPausedByVideo] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(() => isStorageManuallyPaused());
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);

  const { currentPath } = useRouter();
  const currentPathRef = useRef<string>(currentPath);
  const userPausedRef = useRef<boolean>(isStorageManuallyPaused());

  useEffect(() => {
    currentPathRef.current = currentPath;
  }, [currentPath]);

  // Sincronização entre abas do navegador via StorageEvent
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_MANUALLY_PAUSED) {
        const isPaused = e.newValue === 'true';
        userPausedRef.current = isPaused;
        setIsManuallyPaused(isPaused);
        if (isPaused && audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle route transitions: audio only plays on Sunday Festival, Online Programs and Calendar pages
  useEffect(() => {
    const isAllowed = isAudioAllowedPath(currentPath);
    if (!isAllowed) {
      // If leaving an allowed route (e.g. going back to Linktree /), pause immediately
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Entering an allowed route: se o usuário pausou manualmente, NUNCA ligar sozinho!
      if (userPausedRef.current) {
        return;
      }
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(() => {
            // Browser autoplay restrictions may require interaction on initial direct load
          });
      }
    }
  }, [currentPath]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(TEMPLE_DATA.music.audioUrl);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = DEFAULT_VOLUME;
      audio.load();

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

      // Event listener group to trigger audio on initial user interaction (click, touch, scroll, key)
      const interactionEvents = ['pointerdown', 'click', 'touchstart', 'touchend', 'scroll', 'wheel', 'keydown'];

      const removeInteractionListeners = () => {
        interactionEvents.forEach((evt) => {
          document.removeEventListener(evt, startAudioOnInteraction, true);
          window.removeEventListener(evt, startAudioOnInteraction, true);
        });
      };

      const startAudioOnInteraction = () => {
        // Only start if we are currently on an audio-allowed page and user did not explicitly pause
        if (!isAudioAllowedPath(currentPathRef.current)) {
          return;
        }
        if (userPausedRef.current) {
          return;
        }

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

      // 1. Attempt immediate autoplay ONLY if initial route is an allowed path and user hasn't manually paused
      const initialPath = window.location.pathname || '/';
      if (isAudioAllowedPath(initialPath) && !userPausedRef.current) {
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
      } else {
        // When not on an allowed path or manually paused, attach interaction listeners
        interactionEvents.forEach((evt) => {
          document.addEventListener(evt, startAudioOnInteraction, { capture: true, passive: true });
          window.addEventListener(evt, startAudioOnInteraction, { capture: true, passive: true });
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

  const playMusic = useCallback(async (targetPath?: string, isManualAction: boolean = true) => {
    if (!audioRef.current) return;
    const pathToCheck = targetPath || currentPathRef.current;
    if (!isAudioAllowedPath(pathToCheck)) return;

    // Se for tentativa automática/indireta mas o usuário pausou manualmente, respeita a pausa manual
    if (!isManualAction && userPausedRef.current) {
      return;
    }

    try {
      if (isManualAction) {
        userPausedRef.current = false;
        setIsManuallyPaused(false);
        setStorageManuallyPaused(false);
      }
      setIsPausedByVideo(false);
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const unlockAndPlayForRoute = useCallback(async (targetPath: string) => {
    // Se o usuário pausou manualmente, respeita e não força o som a ligar sozinho
    if (userPausedRef.current) {
      return;
    }
    return playMusic(targetPath, false);
  }, [playMusic]);

  const pauseMusic = useCallback((byVideo: boolean = false) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    if (byVideo) {
      setIsPausedByVideo(true);
    } else {
      userPausedRef.current = true;
      setIsManuallyPaused(true);
      setStorageManuallyPaused(true);
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      pauseMusic(false);
    } else {
      await playMusic(undefined, true);
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
    if (isPausedByVideo && audioRef.current && isAudioAllowedPath(currentPathRef.current)) {
      if (!userPausedRef.current) {
        playMusic(undefined, false).catch(() => {});
      }
    }
  }, [isPausedByVideo, playMusic]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isPausedByVideo,
        isManuallyPaused,
        hasStarted,
        volume,
        playMusic,
        unlockAndPlayForRoute,
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
