import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TermsOfUsePage } from '../TermsOfUsePage';
import { RouterProvider } from '../../context/RouterContext';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('TermsOfUsePage Component', () => {
  const renderComponent = () => {
    return render(
      <RouterProvider>
        <TermsOfUsePage />
      </RouterProvider>
    );
  };

  it('renders page header, title, badge and official entity details', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 1, name: /Termos de Uso/i })).toBeInTheDocument();
    expect(screen.getByText(/Diretrizes de Uso & Convivência Comunitária/i)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(TEMPLE_DATA.legalName, 'i')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(new RegExp(TEMPLE_DATA.cnpj, 'i')).length).toBeGreaterThanOrEqual(1);
  });

  it('renders all essential terms sections and references to Srila Prabhupada and BBT', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 2, name: /1\. Identificação e Finalidade do Portal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /2\. Acesso Gratuito e Universal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /3\. Conduta Respeitosa nos Encontros e Grupos Exclusivos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /4\. Propriedade Intelectual e Obras Sagradas/i })).toBeInTheDocument();
    expect(screen.getByText(/Srila Prabhupada/i)).toBeInTheDocument();
    expect(screen.getByText(/The Bhaktivedanta Book Trust/i)).toBeInTheDocument();
  });

  it('navigates back to home when clicking back button', () => {
    renderComponent();

    const backBtn = screen.getByTestId('btn-back-from-terms');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });
});
