import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuickLinks } from '../QuickLinks';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('QuickLinks Component', () => {
  it('renders all essential link buttons with correct URLs and targets', () => {
    render(<QuickLinks />);

    // WhatsApp link
    const whatsappLink = screen.getByTestId('link-whatsapp');
    expect(whatsappLink).toHaveAttribute('href', TEMPLE_DATA.contact.whatsappUrl);
    expect(whatsappLink).toHaveAttribute('target', '_blank');

    // Maps link
    const mapsLink = screen.getByTestId('link-maps');
    expect(mapsLink).toHaveAttribute('href', TEMPLE_DATA.contact.mapsUrl);
    expect(mapsLink).toHaveAttribute('target', '_blank');

    // Carona solidária link
    const caronaLink = screen.getByTestId('link-carona');
    expect(caronaLink).toHaveAttribute('href', TEMPLE_DATA.contact.caronaWhatsappUrl);

    // Instagram link
    const instagramLink = screen.getByTestId('link-instagram');
    expect(instagramLink).toHaveAttribute('href', TEMPLE_DATA.contact.instagramUrl);

    // YouTube link
    const youtubeLink = screen.getByTestId('link-youtube');
    expect(youtubeLink).toHaveAttribute('href', TEMPLE_DATA.contact.youtubeUrl);

    // Google review link
    const reviewLink = screen.getByTestId('link-google-review');
    expect(reviewLink).toHaveAttribute('href', TEMPLE_DATA.contact.googleReviewUrl);
  });

  it('renders anchor navigation shortcuts for schedule and faq', () => {
    render(<QuickLinks />);

    const scheduleNav = screen.getByTestId('link-nav-schedule');
    expect(scheduleNav).toHaveAttribute('href', '#programacao');

    const faqNav = screen.getByTestId('link-nav-faq');
    expect(faqNav).toHaveAttribute('href', '#faq');
  });
});
