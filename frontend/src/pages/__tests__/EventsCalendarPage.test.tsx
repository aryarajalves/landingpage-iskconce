import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { EventsCalendarPage } from '../EventsCalendarPage';
import { RouterProvider } from '../../context/RouterContext';

describe('EventsCalendarPage Component', () => {
  const renderComponent = async () => {
    window.history.pushState({}, '', '/calendariodeeventos');
    return act(async () => {
      render(
        <RouterProvider>
          <EventsCalendarPage />
        </RouterProvider>
      );
    });
  };

  it('renders hero title, subtitle and all event filter tabs', async () => {
    await renderComponent();

    // Hero
    expect(screen.getByRole('heading', { level: 1, name: /Calendário de Eventos & Festivais/i })).toBeInTheDocument();
    expect(screen.getByTestId('calendar-hero-section')).toBeInTheDocument();

    // Filter tabs
    expect(screen.getByTestId('filter-tab-todos')).toBeInTheDocument();
    expect(screen.getByTestId('filter-tab-domingo')).toBeInTheDocument();
    expect(screen.getByTestId('filter-tab-gurus')).toBeInTheDocument();
    expect(screen.getByTestId('filter-tab-vaisnava')).toBeInTheDocument();
  });

  it('renders all events by default and filters by category when tabs are clicked', async () => {
    await renderComponent();

    // By default, renders all events
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-sri-krishna-janmastami')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-visitas-gurus-mestres')).toBeInTheDocument();

    // Filter to Gurus
    fireEvent.click(screen.getByTestId('filter-tab-gurus'));
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-visitas-gurus-mestres')).toBeInTheDocument();
    expect(screen.queryByTestId('event-card-festival-de-domingo-semanal')).not.toBeInTheDocument();

    // Filter to Domingos
    fireEvent.click(screen.getByTestId('filter-tab-domingo'));
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.queryByTestId('event-card-vyasa-puja-srila-prabhupada')).not.toBeInTheDocument();

    // Filter back to Todos
    fireEvent.click(screen.getByTestId('filter-tab-todos'));
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
  });

  it('renders WhatsApp inquiry buttons for each event and general consultation', async () => {
    await renderComponent();

    const prabhupadaBtn = screen.getByTestId('btn-event-whatsapp-vyasa-puja-srila-prabhupada');
    expect(prabhupadaBtn).toBeInTheDocument();
    expect(prabhupadaBtn).toHaveAttribute('href', expect.stringContaining('Vyasa-puja'));

    const generalConsultationBtn = screen.getByTestId('btn-calendar-whatsapp-official');
    expect(generalConsultationBtn).toBeInTheDocument();
    expect(generalConsultationBtn).toHaveAttribute('href', expect.stringContaining('5585986817643'));
  });

  it('renders navigation button to return to Linktree', async () => {
    await renderComponent();

    const backBtn = screen.getByTestId('calendar-btn-back-linktree');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });
});
