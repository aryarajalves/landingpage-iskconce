import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Hero } from '../Hero';
import { AudioProvider } from '../../context/AudioContext';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Hero Component', () => {
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

  const renderHero = async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <AudioProvider>
          <Hero />
        </AudioProvider>
      );
    });
    return rendered;
  };

  it('renders the temple name and subtitle', async () => {
    await renderHero();
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(TEMPLE_DATA.name);
    expect(screen.getByText(TEMPLE_DATA.subtitle)).toBeInTheDocument();
  });

  it('renders the Maha-Mantra and badge', async () => {
    await renderHero();
    
    expect(screen.getByText(/Festival de Domingo • Entrada 100% Gratuita/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(TEMPLE_DATA.mahaMantra, 'i'))).toBeInTheDocument();
  });

  it('mentions Srila Prabhupada', async () => {
    await renderHero();
    
    expect(screen.getByText(/Srila Prabhupada/i)).toBeInTheDocument();
  });

  it('renders clean native video player without any YouTube/Shorts branding', async () => {
    await renderHero();
    
    expect(screen.getByTestId('hero-short-video')).toBeInTheDocument();
    expect(screen.getByTestId('video-player-container')).toBeInTheDocument();
    expect(screen.getByTestId('btn-video-play')).toBeInTheDocument();
  });

  it('allows clicking the play and mute buttons on the video', async () => {
    await renderHero();
    
    const playBtn = screen.getByTestId('btn-video-play');
    expect(playBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(playBtn);
    });
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const muteBtn = screen.getByTestId('btn-video-mute');
    expect(muteBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(muteBtn);
    });
  });

  it('provides an audio toggle button inside the Maha-Mantra card', async () => {
    await renderHero();

    const mantraAudioBtn = screen.getByTestId('btn-hero-audio-toggle');
    expect(mantraAudioBtn).toBeInTheDocument();
    // Since it auto-starts, it starts with option to pause
    expect(mantraAudioBtn).toHaveTextContent('Pausar Música');

    await act(async () => {
      fireEvent.click(mantraAudioBtn);
    });
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(mantraAudioBtn).toHaveTextContent('Ouvir Mantra');
  });
});
