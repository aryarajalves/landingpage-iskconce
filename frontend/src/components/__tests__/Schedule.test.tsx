import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Schedule } from '../Schedule';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Schedule Component', () => {
  it('renders schedule section title and Sunday badge', () => {
    render(<Schedule />);
    
    expect(screen.getByRole('heading', { level: 2, name: /Festival de Domingo/i })).toBeInTheDocument();
    expect(screen.getByText(/Todos os Domingos/i)).toBeInTheDocument();
  });

  it('renders all scheduled program items', () => {
    render(<Schedule />);

    TEMPLE_DATA.sundaySchedule.forEach((item, index) => {
      expect(screen.getByTestId(`schedule-item-${index}`)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.time)).toBeInTheDocument();
    });
  });

  it('displays the free entry note', () => {
    render(<Schedule />);
    
    expect(screen.getByText(/Entrada 100% Livre e Gratuita/i)).toBeInTheDocument();
  });
});
