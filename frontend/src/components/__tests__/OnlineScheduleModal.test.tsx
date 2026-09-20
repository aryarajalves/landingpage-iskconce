import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnlineScheduleModal } from '../OnlineScheduleModal';

describe('OnlineScheduleModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<OnlineScheduleModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByTestId('online-modal-backdrop')).not.toBeInTheDocument();
  });

  it('renders modal details correctly when isOpen is true', () => {
    render(<OnlineScheduleModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByTestId('online-modal-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('online-modal-content')).toBeInTheDocument();
    expect(screen.getAllByText(/Estudo do Bhagavad-gītā/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Todas as segundas-feiras/i)).toBeInTheDocument();
    expect(screen.getByText(/20h00/i)).toBeInTheDocument();
    expect(screen.getAllByText(/grupo exclusivo/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Pedir Link da Reunião no WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<OnlineScheduleModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByTestId('modal-close-button');
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT close when clicking on backdrop (conforming to UX rule)', () => {
    const handleClose = vi.fn();
    render(<OnlineScheduleModal isOpen={true} onClose={handleClose} />);

    const backdrop = screen.getByTestId('online-modal-backdrop');
    fireEvent.click(backdrop);

    // Deve respeitar a regra: fechamento forçado apenas via botão
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('locks body scroll (overflow hidden) when open and restores it when unmounted', () => {
    document.body.style.overflow = 'auto';

    const { unmount } = render(<OnlineScheduleModal isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });
});
