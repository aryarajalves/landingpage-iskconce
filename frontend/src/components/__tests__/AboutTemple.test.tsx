import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutTemple } from '../AboutTemple';

describe('AboutTemple Component', () => {
  it('renders section title and 3 core pillar cards', () => {
    render(<AboutTemple />);

    expect(screen.getByRole('heading', { level: 2, name: /Como Funciona a Experiência no Templo/i })).toBeInTheDocument();
    expect(screen.getByText(/Almoço Prasadam Gratuito/i)).toBeInTheDocument();
    expect(screen.getByText(/Música e Meditação \(Kirtan\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Filosofia Prática/i)).toBeInTheDocument();
  });

  it('mentions Bhagavad-gita Como Ele É and Srila Prabhupada', () => {
    render(<AboutTemple />);

    expect(screen.getByText(/Bhagavad-gita Como Ele É/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Srila Prabhupada/i).length).toBeGreaterThan(0);
  });
});
