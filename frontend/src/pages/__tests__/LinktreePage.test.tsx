import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LinktreePage } from '../LinktreePage';
import { RouterProvider } from '../../context/RouterContext';
import { AudioProvider } from '../../context/AudioContext';

describe('LinktreePage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderComponent = async () => {
    return act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <LinktreePage />
          </AudioProvider>
        </RouterProvider>
      );
    });
  };

  it('renders header, title, subtitle and both main buttons correctly', async () => {
    await renderComponent();

    // Title & Brand
    expect(screen.getByRole('heading', { level: 1, name: /Programações do Templo/i })).toBeInTheDocument();
    expect(screen.getByText(/Fortaleza & Aquiraz/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ISKCON Ceará/i).length).toBeGreaterThanOrEqual(1);

    // Button 1: Festival de Domingo
    expect(screen.getByTestId('linktree-btn-festival')).toBeInTheDocument();
    expect(screen.getByText('Festival de Domingo')).toBeInTheDocument();
    expect(screen.getByText(/Música devocional, palestra e banquete/i)).toBeInTheDocument();

    // Button 2: Programações Online Durante a Semana
    expect(screen.getByTestId('linktree-btn-online')).toBeInTheDocument();
    expect(screen.getByText('Programações Online Durante a Semana')).toBeInTheDocument();
    expect(screen.getByText(/Segunda \(devotas\), Terça \(Lapidar - Bhagavad-gītā\) e Quinta \(Passatempos de Krishna\)/i)).toBeInTheDocument();

    // Button 3: Kirtans & Bhajans do Templo (SoundCloud)
    expect(screen.getByTestId('linktree-btn-soundcloud')).toBeInTheDocument();
    expect(screen.getByText('Kirtans & Bhajans do Templo')).toBeInTheDocument();
    expect(screen.getByText(/Ouça os kirtaniyas cantando os bhajans sagrados no SoundCloud/i)).toBeInTheDocument();
    expect(screen.getByTestId('linktree-btn-soundcloud')).toHaveAttribute('href', 'https://on.soundcloud.com/eontezEBe8rgYiIVkf');
    expect(screen.getByTestId('linktree-btn-soundcloud')).toHaveAttribute('target', '_blank');

    // Button 4: Calendário de Eventos & Festivais
    expect(screen.getByTestId('linktree-btn-calendar')).toBeInTheDocument();
    expect(screen.getByText('Calendário de Eventos & Festivais')).toBeInTheDocument();
    expect(screen.getByText(/Festivais de domingo, aparição de Srila Prabhupada e celebrações sagradas/i)).toBeInTheDocument();

    // Social & Info Links
    expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Google Maps/i)).toBeInTheDocument();
  });

  it('navigates to /calendariodeeventos when clicking on the calendar button', async () => {
    await renderComponent();

    const calendarBtn = screen.getByTestId('linktree-btn-calendar');
    fireEvent.click(calendarBtn);

    expect(window.location.pathname).toBe('/calendariodeeventos');
  });

  it('navigates to /programacoesonline when clicking on the second button', async () => {
    await renderComponent();

    const onlineBtn = screen.getByTestId('linktree-btn-online');
    fireEvent.click(onlineBtn);

    expect(window.location.pathname).toBe('/programacoesonline');
  });

  it('navigates to /festivaldedomingo when clicking on the first button', async () => {
    await renderComponent();

    const festivalBtn = screen.getByTestId('linktree-btn-festival');
    fireEvent.click(festivalBtn);

    expect(window.location.pathname).toBe('/festivaldedomingo');
  });

  it('renders official legal footer with CNPJ, terms and privacy policy buttons', async () => {
    await renderComponent();

    expect(screen.getByTestId('legal-footer')).toBeInTheDocument();
    expect(screen.getByText(/47\.096\.698\/0011-26/)).toBeInTheDocument();
    expect(screen.getByText(/SOC INTERN PARA A CONSC DE KRISHNA DO BRASIL ISKCON/)).toBeInTheDocument();
    expect(screen.getByTestId('privacy-policy-button')).toBeInTheDocument();
    expect(screen.getByTestId('terms-of-use-button')).toBeInTheDocument();
  });
});
