import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';
import { AudioProvider } from '../../context/AudioContext';

describe('AudioPlayer Component', () => {
  beforeEach(() => {
    vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(async function(this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { value: false, configurable: true, writable: true });
      this.dispatchEvent(new Event('play'));
      return Promise.resolve();
    });
    vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(function(this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { value: true, configurable: true, writable: true });
      this.dispatchEvent(new Event('pause'));
    });
  });

  it('renders compact audio player with title and controls', async () => {
    await act(async () => {
      render(
        <AudioProvider>
          <AudioPlayer />
        </AudioProvider>
      );
    });

    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(screen.getByText(/Maha-Mantra/i)).toBeInTheDocument();
    expect(screen.getByTestId('btn-audio-toggle')).toBeInTheDocument();
  });

  it('toggles playback when the play/pause button is clicked', async () => {
    await act(async () => {
      render(
        <AudioProvider>
          <AudioPlayer />
        </AudioProvider>
      );
    });

    const toggleBtn = screen.getByTestId('btn-audio-toggle');
    // Initially auto-playing on start
    expect(toggleBtn).toHaveAttribute('aria-label', 'Pausar música devocional');

    // Click to pause
    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(toggleBtn).toHaveAttribute('aria-label', 'Tocar música devocional');

    // Click to play again
    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(toggleBtn).toHaveAttribute('aria-label', 'Pausar música devocional');
  });

  it('displays mute button and equalizer when playing', async () => {
    await act(async () => {
      render(
        <AudioProvider>
          <AudioPlayer />
        </AudioProvider>
      );
    });

    expect(screen.getByTestId('audio-equalizer')).toBeInTheDocument();
    expect(screen.getByTestId('btn-audio-mute')).toBeInTheDocument();
  });
});
