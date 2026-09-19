import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventDetailModal } from '../EventDetailModal';
import { TempleEvent } from '../../data/eventsData';

const mockEvent: TempleEvent = {
  id: 'test-fest-1',
  title: 'Festival Especial de Teste',
  subtitle: 'Celebração comemorativa do templo',
  category: 'vaisnava',
  categoryLabel: 'Celebração Vaisnava',
  period: '19 de Setembro de 2026',
  date: '2026-09-19',
  time: '18h às 21h',
  location: 'Templo ISKCON Ceará (Jacundá, Aquiraz)',
  description: 'Programação festiva com kirtan ao vivo e banquete prasadam gratuito.',
  activities: ['Kirtan ao vivo', 'Palestra védica', 'Banquete prasadam'],
  badgeColor: 'amber'
};

describe('EventDetailModal Component', () => {
  it('does not render anything when isOpen is false', () => {
    const handleClose = vi.fn();
    render(
      <EventDetailModal
        isOpen={false}
        onClose={handleClose}
        dateStr="2026-09-19"
        events={[mockEvent]}
      />
    );

    expect(screen.queryByTestId('event-detail-modal')).not.toBeInTheDocument();
  });

  it('does not render anything when events array is empty', () => {
    const handleClose = vi.fn();
    render(
      <EventDetailModal
        isOpen={true}
        onClose={handleClose}
        dateStr="2026-09-19"
        events={[]}
      />
    );

    expect(screen.queryByTestId('event-detail-modal')).not.toBeInTheDocument();
  });

  it('renders event details, formatted date, schedule and WhatsApp button when open', () => {
    const handleClose = vi.fn();
    render(
      <EventDetailModal
        isOpen={true}
        onClose={handleClose}
        dateStr="2026-09-19"
        events={[mockEvent]}
      />
    );

    expect(screen.getByTestId('event-detail-modal')).toBeInTheDocument();
    expect(screen.getByText('Detalhes da Programação')).toBeInTheDocument();
    expect(screen.getAllByText(/19 de Setembro de 2026/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Festival Especial de Teste')).toBeInTheDocument();
    expect(screen.getByText('Celebração comemorativa do templo')).toBeInTheDocument();
    expect(screen.getByText(/18h às 21h/i)).toBeInTheDocument();
    expect(screen.getByText(/Templo ISKCON Ceará/i)).toBeInTheDocument();

    const whatsappBtn = screen.getByTestId('btn-modal-event-whatsapp-test-fest-1');
    expect(whatsappBtn).toBeInTheDocument();
    expect(whatsappBtn).toHaveAttribute('href', expect.stringContaining('Festival%20Especial%20de%20Teste'));
  });

  it('calls onClose when clicking close button or header X icon', () => {
    const handleClose = vi.fn();
    render(
      <EventDetailModal
        isOpen={true}
        onClose={handleClose}
        dateStr="2026-09-19"
        events={[mockEvent]}
      />
    );

    const closeBtn = screen.getByTestId('btn-modal-close');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    const closeIcon = screen.getByTestId('btn-modal-close-icon');
    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
