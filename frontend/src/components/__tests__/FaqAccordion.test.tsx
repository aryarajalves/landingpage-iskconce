import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqAccordion } from '../FaqAccordion';
import { TEMPLE_DATA } from '../../data/templeInfo';

describe('FaqAccordion Component', () => {
  it('renders all FAQ questions from temple data', () => {
    render(<FaqAccordion />);

    TEMPLE_DATA.faqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('renders and expands the question regarding philosophy, mind control and simplicity', () => {
    render(<FaqAccordion />);

    const expFaq = TEMPLE_DATA.faqs.find((f) => f.id === 'experiencia-filosofia');
    expect(expFaq).toBeDefined();

    if (expFaq) {
      const trigger = screen.getByTestId(`faq-trigger-${expFaq.id}`);
      expect(trigger).toBeInTheDocument();

      fireEvent.click(trigger);
      expect(screen.getByTestId(`faq-answer-${expFaq.id}`)).toHaveTextContent(/controle da mente, desapego, simplicidade/i);
    }
  });

  it('allows expanding and collapsing FAQ items', () => {
    render(<FaqAccordion />);

    // By default first item is open
    const firstFaq = TEMPLE_DATA.faqs[0];
    const firstTrigger = screen.getByTestId(`faq-trigger-${firstFaq.id}`);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    // Clicking open item collapses it
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId(`faq-answer-${firstFaq.id}`)).not.toBeInTheDocument();

    // Clicking it again expands it
    fireEvent.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId(`faq-answer-${firstFaq.id}`)).toHaveTextContent(firstFaq.answer);
  });
});
