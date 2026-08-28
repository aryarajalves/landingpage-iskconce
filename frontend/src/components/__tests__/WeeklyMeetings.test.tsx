import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeeklyMeetings } from '../WeeklyMeetings';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('WeeklyMeetings Component', () => {
  it('renders section title and introductory subtitle', () => {
    render(<WeeklyMeetings />);

    expect(screen.getByTestId('weekly-meetings-section')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Encontros Semanais & Grupos de Estudo/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Google Meet/i).length).toBeGreaterThan(0);
  });

  it('renders the featured Lapidar Pacoti Bhagavad-gītā study card with exact schedule and contact', () => {
    render(<WeeklyMeetings />);

    const pacotiCard = screen.getByTestId('meeting-card-lapidar-pacoti');
    expect(pacotiCard).toBeInTheDocument();

    // Verify location, title and schedule
    expect(screen.getByText(/Lapidar Pacoti – CE/i)).toBeInTheDocument();
    expect(screen.getByText(/Todas as terças-feiras/i)).toBeInTheDocument();
    expect(screen.getByText(/20h00/i)).toBeInTheDocument();
    expect(screen.getByText(/Manjari Tulasi/i)).toBeInTheDocument();
    expect(screen.getByText(/\(85\) 9793-0976/i)).toBeInTheDocument();

    // Verify WhatsApp action button
    const pacotiBtn = screen.getByTestId('btn-contact-lapidar-pacoti');
    expect(pacotiBtn).toBeInTheDocument();
    expect(pacotiBtn).toHaveAttribute('href', TEMPLE_DATA.weeklyMeetings[0].whatsappUrl);
  });
});
