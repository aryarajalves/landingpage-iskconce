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

  it('opens event popup modal when clicking on October 01 (Chandramukha Swami arrival - no public program)', async () => {
    render(<InteractiveCalendar />);

    // Go to October 2026
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });

    const day01Btn = screen.getByTestId('calendar-day-2026-10-01');
    expect(day01Btn).toBeInTheDocument();
    expect(within(day01Btn).getByText('Chegada do Swami')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(day01Btn);
    });

    // Modal should now be open with arrival details
    const modal = screen.getByTestId('event-detail-modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Detalhes da Programação')).toBeInTheDocument();
    expect(within(modal).getByText(/Chegada de Chandramukha Swami \(Sem Programação Pública\)/i)).toBeInTheDocument();
    expect(within(modal).getByTestId('btn-modal-event-whatsapp-chegada-chandramukha-swami-2026')).toBeInTheDocument();

    // Close modal
    const closeBtn = within(modal).getByTestId('btn-modal-close');
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(screen.queryByTestId('event-detail-modal')).not.toBeInTheDocument();
  });

  it('opens event popup modal when clicking on October 02 (Espaço Clara Luz 19h) and October 03 (Templo Aquiraz 17h)', async () => {
    render(<InteractiveCalendar />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });

    // Day 02: Espaço Clara Luz às 19h
    const day02Btn = screen.getByTestId('calendar-day-2026-10-02');
    expect(within(day02Btn).getByText('Clara Luz 19h')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(day02Btn);
    });

    const modal02 = screen.getByTestId('event-detail-modal');
    expect(within(modal02).getAllByText(/Chandramukha Swami no Espaço Clara Luz/i).length).toBeGreaterThanOrEqual(1);
    expect(within(modal02).getByText(/19h00/i)).toBeInTheDocument();
    expect(within(modal02).getByTestId('btn-modal-event-whatsapp-chandramukha-swami-espaco-clara-luz-2026')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(within(modal02).getByTestId('btn-modal-close'));
    });

    // Day 03: Templo de Aquiraz às 17h
    const day03Btn = screen.getByTestId('calendar-day-2026-10-03');
    expect(within(day03Btn).getByText('Templo Aquiraz 17h')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(day03Btn);
    });

    const modal03 = screen.getByTestId('event-detail-modal');
    expect(within(modal03).getAllByText(/Chandramukha Swami no Templo de Aquiraz/i).length).toBeGreaterThanOrEqual(1);
    expect(within(modal03).getByText(/17h00/i)).toBeInTheDocument();
    expect(within(modal03).getByTestId('btn-modal-event-whatsapp-chandramukha-swami-templo-aquiraz-2026')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(within(modal03).getByTestId('btn-modal-close'));
    });
  });

  it('displays temple closed notice on Sunday 04 of October 2026 without recurring Sunday festival', async () => {
    render(<InteractiveCalendar />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });

    // Day 04: Sunday without temple program
    const sunday04Btn = screen.getByTestId('calendar-day-2026-10-04');
    expect(sunday04Btn).toBeInTheDocument();
    expect(within(sunday04Btn).getByText('Templo Fechado')).toBeInTheDocument();
    expect(within(sunday04Btn).queryByText('Festival de Domingo')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(sunday04Btn);
    });

    // Modal opens showing closed notice
    const modal = screen.getByTestId('event-detail-modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(/Sem Programação no Templo \(Templo Fechado\)/i)).toBeInTheDocument();
    expect(within(modal).getAllByText(/Templo Fechado/i).length).toBeGreaterThanOrEqual(1);
    expect(within(modal).getByTestId('btn-modal-event-whatsapp-templo-fechado-2026-10-04')).toBeInTheDocument();
    expect(within(modal).queryByText(/Festival Tradicional de Domingo/i)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(within(modal).getByTestId('btn-modal-close'));
    });

    // Verify next Sunday (11/10/2026) has normal festival
    const sunday11Btn = screen.getByTestId('calendar-day-2026-10-11');
    expect(within(sunday11Btn).getByText('Festival de Domingo')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(sunday11Btn);
    });
    const modal11 = screen.getByTestId('event-detail-modal');
    expect(within(modal11).getByText(/Festival Tradicional de Domingo/i)).toBeInTheDocument();
  });
});
