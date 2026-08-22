import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../Hero';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Hero Component', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it('renders the temple name and subtitle', () => {
    render(<Hero />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(TEMPLE_DATA.name);
    expect(screen.getByText(TEMPLE_DATA.subtitle)).toBeInTheDocument();
  });

  it('renders the Maha-Mantra and badge', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Festival de Domingo • Entrada 100% Gratuita/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(TEMPLE_DATA.mahaMantra, 'i'))).toBeInTheDocument();
  });

  it('mentions Srila Prabhupada', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Srila Prabhupada/i)).toBeInTheDocument();
  });

  it('renders clean native video player without any YouTube/Shorts branding', () => {
    render(<Hero />);
    
    expect(screen.getByTestId('hero-short-video')).toBeInTheDocument();
    expect(screen.getByTestId('video-player-container')).toBeInTheDocument();
    expect(screen.getByTestId('btn-video-play')).toBeInTheDocument();
  });

  it('allows clicking the play and mute buttons', () => {
    render(<Hero />);
    
    const playBtn = screen.getByTestId('btn-video-play');
    expect(playBtn).toBeInTheDocument();
    fireEvent.click(playBtn);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

    const muteBtn = screen.getByTestId('btn-video-mute');
    expect(muteBtn).toBeInTheDocument();
    fireEvent.click(muteBtn);
  });
});
