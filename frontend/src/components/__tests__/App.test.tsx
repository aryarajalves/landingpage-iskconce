import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../../App';

describe('App Integration', () => {
  it('renders navbar, all divided section cards, audio player and footer correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    // Assert navbar is present
    expect(screen.getByTestId('navbar-brand')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();

    // Assert all distinct section cards are present
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('quick-links-section')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-section')).toBeInTheDocument();
    expect(screen.getByTestId('weekly-meetings-section')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-temple-section')).toBeInTheDocument();
    expect(screen.getByTestId('faq-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer-section')).toBeInTheDocument();

    // Assert floating audio player is present
    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
  });
});
