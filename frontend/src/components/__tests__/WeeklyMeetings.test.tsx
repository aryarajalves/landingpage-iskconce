import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { WeeklyMeetings } from '../WeeklyMeetings';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('WeeklyMeetings Component', () => {
  it('renders section title and introductory subtitle', () => {
    render(<WeeklyMeetings />);

    expect(screen.getByTestId('weekly-meetings-section')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Encontros Semanais & Grupos de Estudo/i })).toBeInTheDocument();
    expect(screen.getAllByText(/grupos exclusivos/i).length).toBeGreaterThan(0);
  });

  it('renders the featured Lapidar Pacoti Bhagavad-gītā study card with exact schedule and contact', () => {
    render(<WeeklyMeetings />);

    const pacotiCard = screen.getByTestId('meeting-card-lapidar-pacoti');
    expect(pacotiCard).toBeInTheDocument();

    const cardQueries = within(pacotiCard);

    // Verify location, title and schedule inside Pacoti card
    expect(cardQueries.getByText(/Lapidar Pacoti – CE/i)).toBeInTheDocument();
    expect(cardQueries.getByText(/Todas as terças-feiras/i)).toBeInTheDocument();
    expect(cardQueries.getByText(/20h00/i)).toBeInTheDocument();
    expect(cardQueries.getAllByText(/Manjari Tulasi/i).length).toBeGreaterThanOrEqual(1);
    expect(cardQueries.getByText(/\(85\) 9793-0976/i)).toBeInTheDocument();

    // Verify WhatsApp action button
    const pacotiBtn = cardQueries.getByTestId('btn-contact-lapidar-pacoti');
    expect(pacotiBtn).toBeInTheDocument();
    const lapidarMeeting = TEMPLE_DATA.weeklyMeetings.find((m) => m.id === 'lapidar-pacoti');
    expect(pacotiBtn).toHaveAttribute('href', lapidarMeeting?.whatsappUrl);
  });
});
