import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { InteractiveCalendar } from '../InteractiveCalendar';

describe('InteractiveCalendar Component', () => {
  it('renders calendar title with initial month and year (Outubro de 2026)', () => {
    render(<InteractiveCalendar />);

    expect(screen.getByTestId('interactive-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Outubro de 2026/i);
    expect(screen.getByTestId('btn-prev-month')).toBeInTheDocument();
    expect(screen.getByTestId('btn-next-month')).toBeInTheDocument();
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

  it('navigates to next month (Novembro de 2026) and previous month (Setembro de 2026)', async () => {
    render(<InteractiveCalendar />);

    // Click next month: October -> November
    const nextBtn = screen.getByTestId('btn-next-month');
    await act(async () => {
      fireEvent.click(nextBtn);
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Novembro de 2026/i);

    // Click previous month twice: November -> October -> September
    const prevBtn = screen.getByTestId('btn-prev-month');
    await act(async () => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Outubro de 2026/i);

    await act(async () => {
      fireEvent.click(prevBtn);
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Setembro de 2026/i);
  });

  it('shows Chandramukha Swami visit on October 01, 02 and 03 of 2026 and displays details on click', async () => {
    render(<InteractiveCalendar />);

    // Select October 01
    const day01Btn = screen.getByTestId('calendar-day-2026-10-01');
    expect(day01Btn).toBeInTheDocument();
    expect(day01Btn).toHaveTextContent(/1/);

    await act(async () => {
      fireEvent.click(day01Btn);
    });

    // Check details drawer
    expect(screen.getByTestId('selected-date-details')).toBeInTheDocument();
    expect(screen.getByText(/Programação para 01 de Outubro de 2026/i)).toBeInTheDocument();
    expect(screen.getByTestId('selected-event-card-visita-chandramukha-swami-2026')).toBeInTheDocument();
    expect(screen.getByText(/Visita de Chandramukha Swami ao Templo do Ceará/i)).toBeInTheDocument();
  });

  it('shows Sunday Festival for Sundays in October 2026 (e.g. 04 de Outubro)', async () => {
    render(<InteractiveCalendar />);

    // 04 of October 2026 is a Sunday
    const sunday04Btn = screen.getByTestId('calendar-day-2026-10-04');
    expect(sunday04Btn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(sunday04Btn);
    });

    expect(screen.getByText(/Programação para 04 de Outubro de 2026/i)).toBeInTheDocument();
    expect(screen.getByTestId('selected-event-card-festival-de-domingo-semanal')).toBeInTheDocument();
  });

  it('supports jumping to October 2026 via quick button', async () => {
    render(<InteractiveCalendar />);

    // First go to another month
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-next-month'));
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Novembro de 2026/i);

    // Click jump to October 2026
    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-jump-october-2026'));
    });
    expect(screen.getByTestId('calendar-current-title')).toHaveTextContent(/Outubro de 2026/i);
  });
});
