import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { OnlineProgramsPage } from '../OnlineProgramsPage';
import { AudioProvider } from '../../context/AudioContext';
import { RouterProvider } from '../../context/RouterContext';

describe('OnlineProgramsPage Component', () => {
  const renderComponent = async () => {
    await act(async () => {
      render(
        <RouterProvider>
          <AudioProvider>
            <OnlineProgramsPage />
          </AudioProvider>
        </RouterProvider>
      );
    });
  };

  it('renders hero title, subtitle and all 3 online weekly programs correctly', async () => {
    await renderComponent();

    // Hero elements
    expect(screen.getByRole('heading', { level: 1, name: /Programações Online Durante a Semana/i })).toBeInTheDocument();
    expect(screen.getByTestId('online-hero-section')).toBeInTheDocument();

    // Program 1: Segunda-feira - Sangha Feminina
    expect(screen.getByText(/Estudo do Bhagavad-gītā \(Sangha Feminina\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Segunda-feira • 20h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Exclusivo para Mulheres/i).length).toBeGreaterThanOrEqual(1);

    // Program 2: Terça-feira - Manjari Tulasi
    expect(screen.getByText(/Estudo do Bhagavad-gītā Como Ele É/i)).toBeInTheDocument();
    expect(screen.getByText(/Terça-feira • 20h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Manjari Tulasi/i).length).toBeGreaterThanOrEqual(1);

    // Program 3: Quinta-feira - Passatempos de Krishna
    expect(screen.getByText(/Estudo dos Passatempos de Krishna \(Krishna Katha\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Quinta-feira • 20h00/i)).toBeInTheDocument();
  });

  it('renders step-by-step participation guide and FAQ section', async () => {
    await renderComponent();

    expect(screen.getByTestId('online-how-it-works')).toBeInTheDocument();
    expect(screen.getByText(/Como Funciona para Participar\?/i)).toBeInTheDocument();
    expect(screen.getByTestId('online-faq-section')).toBeInTheDocument();
    expect(screen.getByText(/É preciso pagar alguma taxa ou mensalidade\?/i)).toBeInTheDocument();
  });

  it('renders WhatsApp CTA buttons for all 3 programs', async () => {
    await renderComponent();

    expect(screen.getByTestId('btn-join-segunda-sangha-feminina')).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(screen.getByTestId('btn-join-lapidar-pacoti')).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(screen.getByTestId('btn-join-quinta-passatempos-krsna')).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });

  it('renders navigation return button to linktree', async () => {
    await renderComponent();

    const backBtn = screen.getByTestId('online-btn-back-linktree');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });
});
