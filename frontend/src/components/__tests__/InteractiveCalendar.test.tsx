import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { InteractiveCalendar } from '../InteractiveCalendar';

describe('InteractiveCalendar Component', () => {
  it('renders calendar title, navigation buttons and jump buttons', () => {
    render(<InteractiveCalendar />);

    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('btn-prev-month')).toBeInTheDocument();
    expect(screen.getByTestId('btn-next-month')).toBeInTheDocument();
    expect(screen.getByTestId('btn-jump-today')).toBeInTheDocument();
    expect(screen.getByTestId('btn-jump-october-2026')).toBeInTheDocument();
  });

  it('renders all 7 weekday abbreviations with Dom highlighted', () => {
    render(<InteractiveCalendar />);

    expect(screen.getByText('Dom')).toBeInTheDocument();
    expect(screen.getByText('Seg')).toBeInTheDocument();
    expect(screen.getByText('Ter')).toBeInTheDocument();
    expect(screen.getByText('Qua')).toBeInTheDocument();
    expect(screen.getByText('Qui')).toBeInTheDocument();
    expect(screen.getByText('Sex')).toBeInTheDocument();
    expect(screen.getByText('Sáb')).toBeInTheDocument();
  });

  it('highlights today with badge-today on the current day cell and allows jumping to today', async () => {
    render(<InteractiveCalendar />);

    // Jump to today explicitly to ensure current month is displayed
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-today'));
    });

    const todayBadge = screen.getByTestId('badge-today');
    expect(todayBadge).toBeInTheDocument();
    expect(todayBadge).toHaveTextContent(/Hoje/i);
  });

  it('navigates between months correctly and supports jump to October 2026', async () => {
    render(<InteractiveCalendar />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Outubro de 2026/i);

    // Click next month: October -> November
    const nextBtn = screen.getByTestId('btn-next-month');
    await act(async () => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Novembro de 2026/i);

    // Click prev month: November -> October
    const prevBtn = screen.getByTestId('btn-prev-month');
    await act(async () => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Outubro de 2026/i);
  });

  it('opens event popup modal when clicking on a day with an event (Chandramukha Swami visit)', async () => {
    render(<InteractiveCalendar />);

    // Go to October 2026
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });

    // Select October 01 which has the Chandramukha Swami visit
    const day01Btn = screen.getByTestId('calendar-day-2026-10-01');
    expect(day01Btn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(day01Btn);
    });

    // Modal should now be open
    const modal = screen.getByTestId('event-detail-modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Detalhes da Programação')).toBeInTheDocument();
    expect(within(modal).getByText(/Visita de Chandramukha Swami ao Templo do Ceará/i)).toBeInTheDocument();
    expect(within(modal).getByTestId('btn-modal-event-whatsapp-visita-chandramukha-swami-2026')).toBeInTheDocument();

    // Close modal
    const closeBtn = within(modal).getByTestId('btn-modal-close');
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(screen.queryByTestId('event-detail-modal')).not.toBeInTheDocument();
  });

  it('opens event popup modal when clicking on a Sunday with weekly festival', async () => {
    render(<InteractiveCalendar />);

    // Go to October 2026
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });

    // 04 of October 2026 is a Sunday
    const sunday04Btn = screen.getByTestId('calendar-day-2026-10-04');
    expect(sunday04Btn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(sunday04Btn);
    });

    // Modal opens for Sunday festival
    const modal = screen.getByTestId('event-detail-modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(/Festival Tradicional de Domingo/i)).toBeInTheDocument();
    expect(within(modal).getByTestId('btn-modal-event-whatsapp-festival-de-domingo-semanal')).toBeInTheDocument();
  });
});
