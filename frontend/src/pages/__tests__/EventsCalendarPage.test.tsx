import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { EventsCalendarPage } from '../EventsCalendarPage';
import { RouterProvider } from '../../context/RouterContext';
import { AudioProvider } from '../../context/AudioContext';

describe('EventsCalendarPage Component', () => {
  const renderComponent = async () => {
    window.history.pushState({}, '', '/calendariodeeventos');
    return act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <EventsCalendarPage />
          </AudioProvider>
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

  it('renders all events when switching to list view and filters by category when tabs are clicked', async () => {
    await renderComponent();

    // Na visualização padrão de calendário, a seção antiga "Destaques e Próximos Festivais" NÃO deve existir
    expect(screen.queryByText('Destaques e Próximos Festivais')).not.toBeInTheDocument();

    // Ao alternar para modo lista, renderiza todos os cards
    fireEvent.click(screen.getByTestId('btn-view-list'));
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-sri-krishna-janmastami')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chegada-chandramukha-swami-2026')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chandramukha-swami-espaco-clara-luz-2026')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chandramukha-swami-templo-aquiraz-2026')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-templo-fechado-2026-10-04')).toBeInTheDocument();

    // Filter to Gurus
    fireEvent.click(screen.getByTestId('filter-tab-gurus'));
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chegada-chandramukha-swami-2026')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chandramukha-swami-espaco-clara-luz-2026')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-chandramukha-swami-templo-aquiraz-2026')).toBeInTheDocument();
    expect(screen.queryByTestId('event-card-festival-de-domingo-semanal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-card-templo-fechado-2026-10-04')).not.toBeInTheDocument();

    // Filter to Domingos
    fireEvent.click(screen.getByTestId('filter-tab-domingo'));
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-templo-fechado-2026-10-04')).toBeInTheDocument();
    expect(screen.queryByTestId('event-card-vyasa-puja-srila-prabhupada')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-card-chegada-chandramukha-swami-2026')).not.toBeInTheDocument();

    // Filter back to Todos
    fireEvent.click(screen.getByTestId('filter-tab-todos'));
    expect(screen.getByTestId('event-card-festival-de-domingo-semanal')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-vyasa-puja-srila-prabhupada')).toBeInTheDocument();
    expect(screen.getByTestId('event-card-templo-fechado-2026-10-04')).toBeInTheDocument();
  });

  it('renders InteractiveCalendar and allows toggling between calendar and list view', async () => {
    await renderComponent();

    // Calendar grid is present by default
    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-view-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-view-list')).toBeInTheDocument();

    // Switch to List view
    fireEvent.click(screen.getByTestId('btn-view-list'));
    expect(screen.queryByTestId('interactive-calendar')).not.toBeInTheDocument();
    expect(screen.getByTestId('events-grid')).toBeInTheDocument();

    // Switch back to Calendar view
    fireEvent.click(screen.getByTestId('btn-view-calendar'));
    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
  });

  it('validates absence of Como Funciona o Calendario Vaisnava banner and renders WhatsApp buttons in list view', async () => {
    await renderComponent();

    // O banner informativo "Como Funciona o Calendário Vaisnava?" NÃO deve estar na página
    expect(screen.queryByText(/Como Funciona o Calendário Vaisnava/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('btn-calendar-whatsapp-official')).not.toBeInTheDocument();

    // Ao alternar para modo lista, botões de WhatsApp de cada evento estão presentes
    fireEvent.click(screen.getByTestId('btn-view-list'));
    const prabhupadaBtn = screen.getByTestId('btn-event-whatsapp-vyasa-puja-srila-prabhupada');
    expect(prabhupadaBtn).toBeInTheDocument();
    expect(prabhupadaBtn).toHaveAttribute('href', expect.stringContaining('Vyasa-puja'));
  });

  it('renders navigation button to return to Linktree', async () => {
    await renderComponent();

    const backBtn = screen.getByTestId('calendar-btn-back-linktree');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });

  it('renders Chandramukha Swami visit schedule and temple closed notice in list view', async () => {
    await renderComponent();

    // No calendário, o componente interativo está presente
    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();

    // Ao alternar para modo lista, todos os cards específicos estão presentes com botões WhatsApp
    fireEvent.click(screen.getByTestId('btn-view-list'));

    // 01/10: Chegada
    const cardChegada = screen.getByTestId('event-card-chegada-chandramukha-swami-2026');
    expect(cardChegada).toBeInTheDocument();
    expect(screen.getAllByText(/Chegada de Chandramukha Swami \(Sem Programação Pública\)/i).length).toBeGreaterThanOrEqual(1);

    // 02/10: Espaço Clara Luz
    const cardClaraLuz = screen.getByTestId('event-card-chandramukha-swami-espaco-clara-luz-2026');
    expect(cardClaraLuz).toBeInTheDocument();
    expect(screen.getAllByText(/Chandramukha Swami no Espaço Clara Luz/i).length).toBeGreaterThanOrEqual(1);
    const btnClaraLuz = screen.getByTestId('btn-event-whatsapp-chandramukha-swami-espaco-clara-luz-2026');
    expect(btnClaraLuz).toBeInTheDocument();
    expect(btnClaraLuz).toHaveAttribute('href', expect.stringContaining('Clara%20Luz'));

    // 03/10: Templo de Aquiraz
    const cardAquiraz = screen.getByTestId('event-card-chandramukha-swami-templo-aquiraz-2026');
    expect(cardAquiraz).toBeInTheDocument();
    expect(screen.getAllByText(/Chandramukha Swami no Templo de Aquiraz/i).length).toBeGreaterThanOrEqual(1);
    const btnAquiraz = screen.getByTestId('btn-event-whatsapp-chandramukha-swami-templo-aquiraz-2026');
    expect(btnAquiraz).toBeInTheDocument();
    expect(btnAquiraz).toHaveAttribute('href', expect.stringContaining('Aquiraz'));

    // 04/10: Templo Fechado
    const cardFechado = screen.getByTestId('event-card-templo-fechado-2026-10-04');
    expect(cardFechado).toBeInTheDocument();
    expect(screen.getAllByText(/Sem Programação no Templo \(Templo Fechado\)/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders floating audio player widget on EventsCalendarPage', async () => {
    await renderComponent();

    expect(screen.getByTestId('audio-player-widget')).toBeInTheDocument();
    expect(screen.getByTestId('btn-audio-toggle')).toBeInTheDocument();
  });
});
