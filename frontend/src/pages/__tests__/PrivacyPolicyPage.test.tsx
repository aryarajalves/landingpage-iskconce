import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrivacyPolicyPage } from '../PrivacyPolicyPage';
import { RouterProvider } from '../../context/RouterContext';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('PrivacyPolicyPage Component', () => {
  const renderComponent = () => {
    return render(
      <RouterProvider>
        <PrivacyPolicyPage />
      </RouterProvider>
    );
  };

  it('renders page header, title, LGPD badge and official entity details', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 1, name: /Política de Privacidade/i })).toBeInTheDocument();
    expect(screen.getByText(/Conformidade LGPD • Lei nº 13\.709\/2018/i)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(TEMPLE_DATA.legalName, 'i')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(new RegExp(TEMPLE_DATA.cnpj, 'i')).length).toBeGreaterThanOrEqual(1);
  });

  it('renders all essential privacy sections and contact information', () => {
    renderComponent();

    expect(screen.getByRole('heading', { level: 2, name: /1\. Compromisso com a Privacidade e Transparência/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /2\. Finalidade Informativa e Ausência de Rastreamento Oculto/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /3\. Comunicação Voluntária via WhatsApp e Grupos Exclusivos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /4\. Seus Direitos \(LGPD\)/i })).toBeInTheDocument();
    expect(screen.getByText(TEMPLE_DATA.contact.phoneFormatted)).toBeInTheDocument();
  });

  it('navigates back to home when clicking back button', () => {
    renderComponent();

    const backBtn = screen.getByTestId('btn-back-from-privacy');
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(window.location.pathname).toBe('/');
  });
});
