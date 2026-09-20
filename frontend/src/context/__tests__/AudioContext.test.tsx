import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { AudioProvider, useAudio } from '../AudioContext';
import { isAudioAllowedPath } from '../../utils/audioRoutes';
import { RouterProvider, useRouter } from '../RouterContext';

const TestAudioConsumer: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    isPausedByVideo,
    isManuallyPaused,
    volume,
    playMusic,
    unlockAndPlayForRoute,
    pauseMusic,
    toggleMusic,
    toggleMute,
    setVolume,
    onVideoPlay,
    onVideoPause,
  } = useAudio();
  const { navigate } = useRouter();

  return (
    <div>
      <span data-testid="is-playing">{isPlaying ? 'yes' : 'no'}</span>
      <span data-testid="is-muted">{isMuted ? 'yes' : 'no'}</span>
      <span data-testid="is-paused-by-video">{isPausedByVideo ? 'yes' : 'no'}</span>
      <span data-testid="is-manually-paused">{isManuallyPaused ? 'yes' : 'no'}</span>
      <span data-testid="audio-volume">{volume}</span>
      <button data-testid="btn-play" onClick={() => playMusic()}>Play</button>
      <button data-testid="btn-pause" onClick={() => pauseMusic()}>Pause</button>
      <button data-testid="btn-toggle" onClick={() => toggleMusic()}>Toggle</button>
      <button data-testid="btn-mute" onClick={() => toggleMute()}>Mute</button>
      <button data-testid="btn-set-volume" onClick={() => setVolume(0.5)}>Set Volume</button>
      <button data-testid="btn-video-play-sync" onClick={() => onVideoPlay()}>Video Play</button>
      <button data-testid="btn-video-pause-sync" onClick={() => onVideoPause()}>Video Pause</button>
      <button data-testid="btn-unlock-route" onClick={() => unlockAndPlayForRoute('/programacoesonline')}>Unlock Route</button>
      <button data-testid="btn-nav-linktree" onClick={() => navigate('/')}>Go Root</button>
      <button data-testid="btn-nav-sunday" onClick={() => navigate('/festivaldedomingo')}>Go Sunday</button>
      <button data-testid="btn-nav-online" onClick={() => navigate('/programacoesonline')}>Go Online</button>
    </div>
  );
};

describe('AudioContext', () => {
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/festivaldedomingo');
    playSpy = vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(async function(this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { value: false, configurable: true, writable: true });
      this.dispatchEvent(new Event('play'));
      return Promise.resolve();
    });
    pauseSpy = vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(function(this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { value: true, configurable: true, writable: true });
      this.dispatchEvent(new Event('pause'));
    });
  });

  it('validates isAudioAllowedPath utility function correctly', () => {
    expect(isAudioAllowedPath('/festivaldedomingo')).toBe(true);
    expect(isAudioAllowedPath('/festival-de-domingo')).toBe(true);
    expect(isAudioAllowedPath('/programacoesonline')).toBe(true);
    expect(isAudioAllowedPath('/programas-online')).toBe(true);
    expect(isAudioAllowedPath('/programacoes-online')).toBe(true);
    expect(isAudioAllowedPath('/calendariodeeventos')).toBe(true);
    expect(isAudioAllowedPath('/calendario-de-eventos')).toBe(true);
    expect(isAudioAllowedPath('/calendario')).toBe(true);
    expect(isAudioAllowedPath('/eventos')).toBe(true);

    expect(isAudioAllowedPath('/')).toBe(false);
    expect(isAudioAllowedPath('/politica-de-privacidade')).toBe(false);
    expect(isAudioAllowedPath('/termos-de-uso')).toBe(false);
    expect(isAudioAllowedPath('')).toBe(false);
  });

  it('auto-starts playback on mount on allowed route (/festivaldedomingo)', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');
    expect(screen.getByTestId('audio-volume')).toHaveTextContent('0.2');

    // Pause music
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-pause'));
    });
    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');

    // Play music again
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-play'));
    });
    expect(playSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');
  });

  it('does NOT auto-start playback on root Linktree route (/)', async () => {
    window.history.pushState({}, '', '/');
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
  });

  it('pauses playback when navigating from allowed route to root Linktree', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');

    // Navigate to root (/)
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-nav-linktree'));
    });

    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
  });

  it('pauses background music when onVideoPlay is triggered', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');

    // Video starts playing -> music should be paused
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-video-play-sync'));
    });
    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-paused-by-video')).toHaveTextContent('yes');
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');

    // Video stops/pauses -> music resumes automatically
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-video-pause-sync'));
    });
    expect(playSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');
  });

  it('toggles mute on audio element', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-muted')).toHaveTextContent('no');
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-mute'));
    });
    expect(screen.getByTestId('is-muted')).toHaveTextContent('yes');
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-mute'));
    });
    expect(screen.getByTestId('is-muted')).toHaveTextContent('no');
  });

  it('does NOT auto-start sound on navigating to other allowed routes if paused manually', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');

    // Pausar manualmente
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-pause'));
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('yes');
    expect(localStorage.getItem('iskcon_audio_manually_paused')).toBe('true');

    // Navega para outra aba/rota permitida (/programacoesonline)
    playSpy.mockClear();
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-nav-online'));
    });

    // O som NÃO deve ligar sozinho!
    expect(playSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');

    // Navega para outra aba permitida (/festivaldedomingo)
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-nav-sunday'));
    });

    // O som continua sem ligar sozinho!
    expect(playSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
  });

  it('unlockAndPlayForRoute respects manual pause and does NOT force sound to play', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    // Pausar manualmente
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-pause'));
    });
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('yes');

    // Tentar destravar rota
    playSpy.mockClear();
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-unlock-route'));
    });

    // NÃO deve tocar
    expect(playSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
  });

  it('manually clicking play/toggle resets manual pause and plays sound', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    // Pausar manualmente
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-pause'));
    });
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('yes');

    // Usuário clica manualmente em Play
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-play'));
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('no');
    expect(localStorage.getItem('iskcon_audio_manually_paused')).toBeNull();
  });

  it('initializes as paused without auto-playing if localStorage indicates previous manual pause', async () => {
    localStorage.setItem('iskcon_audio_manually_paused', 'true');
    playSpy.mockClear();

    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(playSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('yes');
  });

  it('synchronizes manual pause across browser tabs via storage event', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <TestAudioConsumer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('is-playing')).toHaveTextContent('yes');

    // Simula evento de storage disparado por outra aba do navegador
    await act(async () => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'iskcon_audio_manually_paused',
        newValue: 'true'
      }));
    });

    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByTestId('is-playing')).toHaveTextContent('no');
    expect(screen.getByTestId('is-manually-paused')).toHaveTextContent('yes');
  });

  it('throws error when useAudio is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestAudioConsumer />)).toThrow('useAudio must be used within an AudioProvider');
    consoleError.mockRestore();
  });
});
