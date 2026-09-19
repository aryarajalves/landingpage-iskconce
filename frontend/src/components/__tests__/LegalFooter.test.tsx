import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LegalFooter } from '../LegalFooter';
import { RouterProvider } from '../../context/RouterContext';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('LegalFooter Component', () => {
  const renderComponent = () => {
    return render(
      <RouterProvider>
        <LegalFooter />
      </RouterProvider>
    );
  };

  it('renders official legal entity name, CNPJ and copyright correctly', () => {
    renderComponent();

    // Check legal text with CNPJ
    const legalText = `${TEMPLE_DATA.legalName} - CNPJ ${TEMPLE_DATA.cnpj}`;
    expect(screen.getByText(legalText)).toBeInTheDocument();

    // Check copyright
    expect(screen.getByText(`© 2026 ${TEMPLE_DATA.name}. Todos os direitos reservados.`)).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByTestId('privacy-policy-button')).toBeInTheDocument();
    expect(screen.getByTestId('terms-of-use-button')).toBeInTheDocument();
  });

  it('navigates to /politica-de-privacidade when clicking on Política de Privacidade', () => {
    renderComponent();

    const privacyBtn = screen.getByTestId('privacy-policy-button');
    fireEvent.click(privacyBtn);

    expect(window.location.pathname).toBe('/politica-de-privacidade');
  });

  it('navigates to /termos-de-uso when clicking on Termos de Uso', () => {
    renderComponent();

    const termsBtn = screen.getByTestId('terms-of-use-button');
    fireEvent.click(termsBtn);

    expect(window.location.pathname).toBe('/termos-de-uso');
  });
});
