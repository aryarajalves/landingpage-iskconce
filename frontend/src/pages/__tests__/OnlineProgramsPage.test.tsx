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

    // Program 1: Segunda-feira - Devotas
    expect(screen.getByText(/Estudo do Bhagavad-gītā \(Devotas\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Segunda-feira • 20h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Exclusivo para Mulheres/i).length).toBeGreaterThanOrEqual(1);

    // Program 2: Terça-feira - Lapidar (Bhagavad-gītā com Manjari Tulasi)
    expect(screen.getByText(/Estudo do Bhagavad-gītā \(Lapidar\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Terça-feira • 20h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Lapidar/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Manjari Tulasi/i).length).toBeGreaterThanOrEqual(1);

    // Program 3: Quinta-feira - Passatempos de Krishna (Clube do Livro com Arhadana às 19h00)
    expect(screen.getByText(/Estudo dos Passatempos de Krishna \(Krishna Katha\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Quinta-feira • 19h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Clube do Livro/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Arhadana/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders step-by-step participation guide and FAQ section', async () => {
    await renderComponent();

    expect(screen.getByTestId('online-how-it-works')).toBeInTheDocument();
    expect(screen.getByText(/Como Funciona para Participar\?/i)).toBeInTheDocument();
    expect(screen.getByTestId('online-faq-section')).toBeInTheDocument();
    expect(screen.getByText(/É preciso pagar alguma taxa ou mensalidade\?/i)).toBeInTheDocument();
  });

  it('renders WhatsApp CTA buttons with representatives, including Krsna Nandini on Monday and Arhadana on Thursday', async () => {
    await renderComponent();

    // Monday representative Krsna Nandini with updated message
    expect(screen.getAllByText(/Krsna Nandini/i).length).toBeGreaterThanOrEqual(1);
    const mondayBtn = screen.getByTestId('btn-join-segunda-sangha-feminina');
    expect(mondayBtn).toHaveAttribute('href', expect.stringContaining('556492022787'));
    expect(mondayBtn).toHaveAttribute('href', expect.stringContaining('Vim%20pelo%20site%20dos%20devotos%20Hare%20Krishna%20do%20Cear%C3%A1'));
    expect(mondayBtn).not.toHaveAttribute('href', expect.stringContaining('Sangha%20Feminina'));

    // Representative guidance message on card
    expect(screen.getAllByText(/vai te orientar e te dar acesso ao grupo exclusivo/i).length).toBeGreaterThanOrEqual(1);

    // Verify all 3 CTA links
    const tuesdayBtn = screen.getByTestId('btn-join-lapidar-pacoti');
    expect(tuesdayBtn).toHaveAttribute('href', expect.stringContaining('5585997930976'));
    expect(tuesdayBtn).toHaveAttribute('href', expect.stringContaining('Vim%20pelo%20site%20dos%20devotos%20do%20Cear%C3%A1'));

    // Thursday representative Arhadana (Clube do Livro, 5511961854858, mentions temple website)
    const thursdayBtn = screen.getByTestId('btn-join-quinta-passatempos-krsna');
    expect(thursdayBtn).toHaveAttribute('href', expect.stringContaining('5511961854858'));
    expect(thursdayBtn).toHaveAttribute('href', expect.stringContaining('Templo%20da%20ISKCON%20Cear'));

    // Ensure no mentions of Google Meet
    expect(screen.queryByText(/Google Meet/i)).not.toBeInTheDocument();
  });

  it('renders navigation return button to linktree', async () => {
    await renderComponent();

    const backBtn = screen.getByTestId('online-btn-back-linktree');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });
});
