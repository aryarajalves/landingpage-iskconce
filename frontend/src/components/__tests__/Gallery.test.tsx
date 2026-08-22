import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Gallery } from '../Gallery';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Gallery Component', () => {
  it('renders section title, subtitle and Instagram link', () => {
    render(<Gallery />);

    expect(screen.getByRole('heading', { level: 2, name: /Conheça o Templo e Nossos Momentos/i })).toBeInTheDocument();
    expect(screen.getByText(/Galeria Oficial do Templo/i)).toBeInTheDocument();
    
    const instagramLink = screen.getByTestId('link-gallery-instagram');
    expect(instagramLink).toHaveAttribute('href', TEMPLE_DATA.contact.instagramUrl);
  });

  it('renders all 5 real gallery photo cards with titles and descriptions', () => {
    render(<Gallery />);

    TEMPLE_DATA.gallery.forEach((photo) => {
      expect(screen.getByTestId(`gallery-item-${photo.id}`)).toBeInTheDocument();
      expect(screen.getByText(photo.title)).toBeInTheDocument();
      expect(screen.getByText(photo.description)).toBeInTheDocument();
    });
  });

  it('opens and closes the Lightbox modal ONLY when clicking the X button (not when clicking backdrop)', () => {
    render(<Gallery />);

    // Initially modal is not open
    expect(screen.queryByTestId('gallery-lightbox')).not.toBeInTheDocument();

    // Click on the first photo to open modal
    const firstPhoto = screen.getByTestId(`gallery-item-${TEMPLE_DATA.gallery[0].id}`);
    fireEvent.click(firstPhoto);

    // Modal is now open and body scroll is locked
    const lightbox = screen.getByTestId('gallery-lightbox');
    expect(lightbox).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    // Click outside on the black backdrop - should NOT close the modal
    fireEvent.click(lightbox);
    expect(screen.getByTestId('gallery-lightbox')).toBeInTheDocument();

    // Click explicit close button (X) - should close the modal
    const closeBtn = screen.getByTestId('btn-close-lightbox');
    fireEvent.click(closeBtn);

    // Modal is closed and body scroll is unlocked
    expect(screen.queryByTestId('gallery-lightbox')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('allows zooming in and out inside Lightbox', () => {
    render(<Gallery />);

    // Click on the first photo
    const firstPhoto = screen.getByTestId(`gallery-item-${TEMPLE_DATA.gallery[0].id}`);
    fireEvent.click(firstPhoto);

    expect(screen.getByTestId('zoom-controls')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Click Zoom In button
    const zoomInBtn = screen.getByTestId('btn-zoom-in');
    fireEvent.click(zoomInBtn);
    expect(screen.getByText('150%')).toBeInTheDocument();

    // Click Zoom Out button
    const zoomOutBtn = screen.getByTestId('btn-zoom-out');
    fireEvent.click(zoomOutBtn);
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Click on zoomable image container to toggle zoom
    const zoomContainer = screen.getByTestId('zoomable-image-container');
    fireEvent.click(zoomContainer);
    expect(screen.getByText('200%')).toBeInTheDocument();

    // Reset Zoom
    const resetBtn = screen.getByTestId('btn-zoom-reset');
    fireEvent.click(resetBtn);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('allows navigating between photos with arrow buttons and keyboard', () => {
    render(<Gallery />);

    // Click on the first photo
    const firstPhoto = screen.getByTestId(`gallery-item-${TEMPLE_DATA.gallery[0].id}`);
    fireEvent.click(firstPhoto);

    const lightbox = screen.getByTestId('gallery-lightbox');
    expect(lightbox).toBeInTheDocument();

    // Click next photo button
    const nextBtn = screen.getByTestId('btn-next-photo');
    fireEvent.click(nextBtn);

    // Lightbox should now show the second photo title
    expect(within(lightbox).getByText(TEMPLE_DATA.gallery[1].title)).toBeInTheDocument();

    // Navigate with Keyboard ArrowRight
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(within(lightbox).getByText(TEMPLE_DATA.gallery[2].title)).toBeInTheDocument();

    // Navigate with Keyboard ArrowLeft
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(within(lightbox).getByText(TEMPLE_DATA.gallery[1].title)).toBeInTheDocument();

    // Close with Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('gallery-lightbox')).not.toBeInTheDocument();
  });
});
