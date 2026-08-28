import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { AudioProvider, useAudio } from '../AudioContext';

const TestAudioConsumer: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    isPausedByVideo,
    volume,
    playMusic,
    pauseMusic,
    toggleMusic,
    toggleMute,
    setVolume,
    onVideoPlay,
    onVideoPause,
  } = useAudio();

  return (
    <div>
      <span data-testid="is-playing">{isPlaying ? 'yes' : 'no'}</span>
      <span data-testid="is-muted">{isMuted ? 'yes' : 'no'}</span>
      <span data-testid="is-paused-by-video">{isPausedByVideo ? 'yes' : 'no'}</span>
      <span data-testid="audio-volume">{volume}</span>
      <button data-testid="btn-play" onClick={() => playMusic()}>Play</button>
      <button data-testid="btn-pause" onClick={() => pauseMusic()}>Pause</button>
      <button data-testid="btn-toggle" onClick={() => toggleMusic()}>Toggle</button>
      <button data-testid="btn-mute" onClick={() => toggleMute()}>Mute</button>
      <button data-testid="btn-set-volume" onClick={() => setVolume(0.5)}>Set Volume</button>
      <button data-testid="btn-video-play-sync" onClick={() => onVideoPlay()}>Video Play</button>
      <button data-testid="btn-video-pause-sync" onClick={() => onVideoPause()}>Video Pause</button>
    </div>
  );
};

describe('AudioContext', () => {
  let playSpy: ReturnType<typeof vi.spyOn>;
  let pauseSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
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

  it('auto-starts playback on mount and sets gentle default volume (~35%)', async () => {
    await act(async () => {
      render(
        <AudioProvider>
          <TestAudioConsumer />
        </AudioProvider>
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

  it('pauses background music when onVideoPlay is triggered', async () => {
    await act(async () => {
      render(
        <AudioProvider>
          <TestAudioConsumer />
        </AudioProvider>
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
        <AudioProvider>
          <TestAudioConsumer />
        </AudioProvider>
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

  it('throws error when useAudio is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestAudioConsumer />)).toThrow('useAudio must be used within an AudioProvider');
    consoleError.mockRestore();
  });
});
