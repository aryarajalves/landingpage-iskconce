import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('renders navbar brand and temple name', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-brand')).toBeInTheDocument();
    expect(screen.getByText(TEMPLE_DATA.name)).toBeInTheDocument();
    expect(screen.getByText('Fortaleza & Aquiraz')).toBeInTheDocument();
  });

  it('renders all key navigation links on desktop', () => {
    render(<Navbar />);

    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-inicio')).toHaveTextContent('Início');
    expect(screen.getByTestId('nav-link-programacao')).toHaveTextContent('Programação');
    expect(screen.getByTestId('nav-link-encontros')).toHaveTextContent('Encontros');
    expect(screen.getByTestId('nav-link-galeria')).toHaveTextContent('Galeria');
    expect(screen.getByTestId('nav-link-sobre')).toHaveTextContent('O Templo');
    expect(screen.getByTestId('nav-link-faq')).toHaveTextContent('Dúvidas');
  });

  it('scrolls smoothly when a desktop navigation link is clicked', () => {
    render(<Navbar />);

    // Create target section element in document
    const section = document.createElement('div');
    section.id = 'programacao';
    document.body.appendChild(section);

    const progLink = screen.getByTestId('nav-link-programacao');
    fireEvent.click(progLink);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(section);
  });

  it('opens and closes mobile menu drawer when toggle button is clicked', () => {
    render(<Navbar />);

    const menuToggleBtn = screen.getByTestId('btn-mobile-menu');
    expect(menuToggleBtn).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(menuToggleBtn);
    expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-link-galeria')).toHaveTextContent('Galeria');

    // Close mobile menu
    fireEvent.click(menuToggleBtn);
    expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
  });

  it('navigates and closes mobile menu drawer when mobile link is clicked', () => {
    render(<Navbar />);

    const menuToggleBtn = screen.getByTestId('btn-mobile-menu');
    fireEvent.click(menuToggleBtn);

    const mobileFaqLink = screen.getByTestId('mobile-nav-link-faq');
    fireEvent.click(mobileFaqLink);

    expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
  });

  it('renders WhatsApp CTA in navbar with correct target link', () => {
    render(<Navbar />);

    const whatsappBtn = screen.getByTestId('navbar-btn-whatsapp');
    expect(whatsappBtn).toBeInTheDocument();
    expect(whatsappBtn).toHaveAttribute('href', TEMPLE_DATA.contact.whatsappUrl);
  });
});
