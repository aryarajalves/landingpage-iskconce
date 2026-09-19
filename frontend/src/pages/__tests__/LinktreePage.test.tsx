import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LinktreePage } from '../LinktreePage';
import { RouterProvider } from '../../context/RouterContext';

describe('LinktreePage Component', () => {
  it('renders header, title, subtitle and both main buttons correctly', () => {
    render(
      <RouterProvider>
        <LinktreePage />
      </RouterProvider>
    );

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
    expect(screen.getByText(/Segunda \(devotas\), Terça \(Manjari Tulasi\) e Quinta \(Passatempos de Krishna\)/i)).toBeInTheDocument();

    // Social & Info Links
    expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Google Maps/i)).toBeInTheDocument();
  });

  it('navigates to /programacoesonline when clicking on the second button', () => {
    render(
      <RouterProvider>
        <LinktreePage />
      </RouterProvider>
    );

    const onlineBtn = screen.getByTestId('linktree-btn-online');
    fireEvent.click(onlineBtn);

    expect(window.location.pathname).toBe('/programacoesonline');
  });

  it('navigates to /festivaldedomingo when clicking on the first button', () => {
    render(
      <RouterProvider>
        <LinktreePage />
      </RouterProvider>
    );

    const festivalBtn = screen.getByTestId('linktree-btn-festival');
    fireEvent.click(festivalBtn);

    expect(window.location.pathname).toBe('/festivaldedomingo');
  });

  it('renders official legal footer with CNPJ, terms and privacy policy buttons', () => {
    render(
      <RouterProvider>
        <LinktreePage />
      </RouterProvider>
    );

    expect(screen.getByTestId('legal-footer')).toBeInTheDocument();
    expect(screen.getByText(/47\.096\.698\/0011-26/)).toBeInTheDocument();
    expect(screen.getByText(/SOC INTERN PARA A CONSC DE KRISHNA DO BRASIL ISKCON/)).toBeInTheDocument();
    expect(screen.getByTestId('privacy-policy-button')).toBeInTheDocument();
    expect(screen.getByTestId('terms-of-use-button')).toBeInTheDocument();
  });
});
