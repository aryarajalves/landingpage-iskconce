import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Footer Component', () => {
  it('renders official legal information, CNPJ and address', () => {
    render(<Footer />);

    expect(screen.getByText(TEMPLE_DATA.name)).toBeInTheDocument();
    expect(screen.getByText(TEMPLE_DATA.legalName)).toBeInTheDocument();
    expect(screen.getByText(`CNPJ: ${TEMPLE_DATA.cnpj}`)).toBeInTheDocument();
    expect(screen.getByText(TEMPLE_DATA.address.full)).toBeInTheDocument();
    expect(screen.getByText(`WhatsApp: ${TEMPLE_DATA.contact.phoneFormatted}`)).toBeInTheDocument();
  });

  it('renders founder acknowledgement', () => {
    render(<Footer />);
    expect(screen.getByText(/Srila Prabhupada/i)).toBeInTheDocument();
  });
});
