import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LegalFooter } from '../LegalFooter';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('LegalFooter Component', () => {
  it('renders official legal entity name, CNPJ and copyright correctly', () => {
    render(<LegalFooter />);

    // Check legal text with CNPJ
    const legalText = `${TEMPLE_DATA.legalName} - CNPJ ${TEMPLE_DATA.cnpj}`;
    expect(screen.getByText(legalText)).toBeInTheDocument();

    // Check copyright
    expect(screen.getByText(`© 2026 ${TEMPLE_DATA.name}. Todos os direitos reservados.`)).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByTestId('privacy-policy-button')).toBeInTheDocument();
    expect(screen.getByTestId('terms-of-use-button')).toBeInTheDocument();
  });

  it('opens and closes the Privacy Policy modal with single close button', () => {
    render(<LegalFooter />);

    // Initially modal is not open
    expect(screen.queryByTestId('legal-modal-content')).not.toBeInTheDocument();

    // Click Privacy Policy button
    fireEvent.click(screen.getByTestId('privacy-policy-button'));

    // Modal is open
    expect(screen.getByTestId('legal-modal-content')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Política de Privacidade' })).toBeInTheDocument();
    expect(screen.getByText(/Compromisso com sua Privacidade/i)).toBeInTheDocument();
    expect(screen.getByText(/LGPD/i)).toBeInTheDocument();

    // Clicking on backdrop must NOT close the modal per UX rules
    const backdrop = screen.getByTestId('legal-modal-backdrop');
    fireEvent.click(backdrop);
    expect(screen.getByTestId('legal-modal-content')).toBeInTheDocument();

    // Close via the single dedicated close button
    const closeBtn = screen.getByTestId('legal-modal-close-button');
    fireEvent.click(closeBtn);

    // Modal closed
    expect(screen.queryByTestId('legal-modal-content')).not.toBeInTheDocument();
  });

  it('opens and closes the Terms of Use modal', () => {
    render(<LegalFooter />);

    // Click Terms of Use button
    fireEvent.click(screen.getByTestId('terms-of-use-button'));

    // Modal is open
    expect(screen.getByTestId('legal-modal-content')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Termos de Uso' })).toBeInTheDocument();
    expect(screen.getByText(/Finalidade do Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Srila Prabhupada/i)).toBeInTheDocument();

    // Close via close button
    const closeBtn = screen.getByTestId('legal-modal-close-button');
    fireEvent.click(closeBtn);

    // Modal closed
    expect(screen.queryByTestId('legal-modal-content')).not.toBeInTheDocument();
  });
});
