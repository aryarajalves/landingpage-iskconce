import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('App Routing Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('renders LinktreePage on root route (/)', async () => {
    await act(async () => {
      render(<App />);
    });

    // Check Linktree elements
    expect(screen.getByRole('heading', { level: 1, name: /Programações do Templo/i })).toBeInTheDocument();
    expect(screen.getByTestId('linktree-btn-festival')).toBeInTheDocument();
    expect(screen.getByTestId('linktree-btn-online')).toBeInTheDocument();
    expect(screen.getByTestId('linktree-btn-calendar')).toBeInTheDocument();

    // Landing sections and audio widget should not be on root
    expect(screen.queryByTestId('hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('online-hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('calendar-hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-player-widget')).not.toBeInTheDocument();
  });

  it('navigates from Linktree to Sunday Festival page and back', async () => {
    await act(async () => {
      render(<App />);
    });

    // 1. Click on Festival de Domingo button
    const festivalBtn = screen.getByTestId('linktree-btn-festival');
    fireEvent.click(festivalBtn);

    // 2. Now Sunday Festival Landing page should be rendered with audio player widget
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-section')).toBeInTheDocument();
    expect(screen.getByTestId('banner-btn-linktree')).toBeInTheDocument();
    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/festivaldedomingo');

    // 3. Click return banner button to go back to Linktree
    const returnBannerBtn = screen.getByTestId('banner-btn-linktree');
    fireEvent.click(returnBannerBtn);

    // 4. Linktree should be visible again and audio player widget removed
    expect(screen.getByRole('heading', { level: 1, name: /Programações do Templo/i })).toBeInTheDocument();
    expect(screen.queryByTestId('hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-player-widget')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('navigates from Linktree to Online Programs page and back', async () => {
    await act(async () => {
      render(<App />);
    });

    // 1. Click on Programações Online button
    const onlineBtn = screen.getByTestId('linktree-btn-online');
    fireEvent.click(onlineBtn);

    // 2. Now Online Programs Landing page should be rendered with audio player widget
    expect(screen.getByTestId('online-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('online-programs-grid')).toBeInTheDocument();
    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/programacoesonline');

    // 3. Click back button to go back to Linktree
    const backBtn = screen.getByTestId('online-btn-back-linktree');
    fireEvent.click(backBtn);

    // 4. Linktree should be visible again and audio player widget removed
    expect(screen.getByRole('heading', { level: 1, name: /Programações do Templo/i })).toBeInTheDocument();
    expect(screen.queryByTestId('online-hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-player-widget')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('renders SundayFestivalPage directly when URL is /festivaldedomingo', async () => {
    window.history.pushState({}, '', '/festivaldedomingo');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-brand')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Programações do Templo/i })).not.toBeInTheDocument();
  });

  it('renders OnlineProgramsPage directly when URL is /programacoesonline', async () => {
    window.history.pushState({}, '', '/programacoesonline');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('online-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('online-programs-grid')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Programações do Templo/i })).not.toBeInTheDocument();
  });

  it('renders PrivacyPolicyPage directly when URL is /politica-de-privacidade', async () => {
    window.history.pushState({}, '', '/politica-de-privacidade');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole('heading', { level: 1, name: /Política de Privacidade/i })).toBeInTheDocument();
    expect(screen.getByTestId('btn-back-from-privacy')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Programações do Templo/i })).not.toBeInTheDocument();
  });

  it('renders TermsOfUsePage directly when URL is /termos-de-uso', async () => {
    window.history.pushState({}, '', '/termos-de-uso');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole('heading', { level: 1, name: /Termos de Uso/i })).toBeInTheDocument();
    expect(screen.getByTestId('btn-back-from-terms')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Programações do Templo/i })).not.toBeInTheDocument();
  });

  it('navigates from Linktree to EventsCalendarPage and back', async () => {
    await act(async () => {
      render(<App />);
    });

    // 1. Click on Calendário de Eventos button
    const calendarBtn = screen.getByTestId('linktree-btn-calendar');
    fireEvent.click(calendarBtn);

    // 2. Now Events Calendar page should be rendered
    expect(screen.getByTestId('calendar-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/calendariodeeventos');

    // 3. Click back button to go back to Linktree
    const backBtn = screen.getByTestId('calendar-btn-back-linktree');
    fireEvent.click(backBtn);

    // 4. Linktree should be visible again
    expect(screen.getByRole('heading', { level: 1, name: /Programações do Templo/i })).toBeInTheDocument();
    expect(screen.queryByTestId('calendar-hero-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('audio-player-widget')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('renders EventsCalendarPage directly when URL is /calendariodeeventos', async () => {
    window.history.pushState({}, '', '/calendariodeeventos');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('calendar-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /Programações do Templo/i })).not.toBeInTheDocument();
  });
});
