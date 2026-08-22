import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(TEMPLE_DATA.faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faq" className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8" data-testid="faq-section">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Guia do Visitante</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Dúvidas Frequentes
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Informações práticas e acolhedoras para você se sentir em casa na sua visita.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3 max-w-4xl mx-auto">
        {TEMPLE_DATA.faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              data-testid={`faq-item-${faq.id}`}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'border-amber-300 bg-amber-50/50 shadow-sm' : 'border-stone-200 bg-stone-50/70 hover:bg-amber-50/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                data-testid={`faq-trigger-${faq.id}`}
                className="w-full p-4 sm:p-5 text-left font-medium text-stone-900 flex items-center justify-between gap-4 transition-colors"
              >
                <span className="text-sm sm:text-base leading-snug font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-700 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-900' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  data-testid={`faq-answer-${faq.id}`}
                  className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 border-t border-amber-200/60 leading-relaxed animate-fadeIn"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </div>
  );
};
