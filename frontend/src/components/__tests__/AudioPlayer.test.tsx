import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';
import { AudioProvider } from '../../context/AudioContext';
import { RouterProvider } from '../../context/RouterContext';

describe('AudioPlayer Component', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/festivaldedomingo');
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

  it('renders audio player widget with Som Hare Krishna title and controls on allowed route', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <AudioPlayer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(screen.getByText(/Som Hare Krishna/i)).toBeInTheDocument();
    expect(screen.getByTestId('btn-audio-toggle')).toBeInTheDocument();
  });

  it('does NOT render audio player widget when on root Linktree route (/)', async () => {
    window.history.pushState({}, '', '/');
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <AudioPlayer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.queryByTestId('audio-player-widget')).not.toBeInTheDocument();
  });

  it('toggles playback when the play/pause button is clicked', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <AudioPlayer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    const toggleBtn = screen.getByTestId('btn-audio-toggle');
    // Initially auto-playing on allowed page
    expect(toggleBtn).toHaveAttribute('aria-label', 'Desativar som do Hare Krishna');

    // Click to pause / deactivate
    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(toggleBtn).toHaveAttribute('aria-label', 'Ativar som do Hare Krishna');

    // Click to play / activate again
    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(toggleBtn).toHaveAttribute('aria-label', 'Desativar som do Hare Krishna');
  });

  it('displays mute button and equalizer when playing', async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <AudioPlayer />
          </AudioProvider>
        </RouterProvider>
      );
    });

    expect(screen.getByTestId('audio-equalizer')).toBeInTheDocument();
    expect(screen.getByTestId('btn-audio-mute')).toBeInTheDocument();
  });
});
