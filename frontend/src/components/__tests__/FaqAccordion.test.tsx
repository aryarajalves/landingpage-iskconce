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

  it('allows expanding and collapsing FAQ items', () => {
    render(<FaqAccordion />);

    const secondFaq = TEMPLE_DATA.faqs[1];
    const trigger = screen.getByTestId(`faq-trigger-${secondFaq.id}`);

    // Click to open
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId(`faq-answer-${secondFaq.id}`)).toHaveTextContent(secondFaq.answer);

    // Click again to close
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId(`faq-answer-${secondFaq.id}`)).not.toBeInTheDocument();
  });
});
