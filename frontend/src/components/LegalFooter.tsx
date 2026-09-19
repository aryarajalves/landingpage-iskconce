import React, { useState, useEffect } from 'react';
import { TEMPLE_DATA } from '../data/templeInfo';
import { LegalModal, LegalModalType } from './LegalModal';

interface LegalFooterProps {
  className?: string;
  theme?: 'light' | 'dark' | 'glass';
}

export const LegalFooter: React.FC<LegalFooterProps> = ({ className = '', theme = 'light' }) => {
  const [modalType, setModalType] = useState<LegalModalType>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#termos' || hash === '#termos-de-uso') {
        setModalType('terms');
      } else if (hash === '#privacidade' || hash === '#politica-de-privacidade') {
        setModalType('privacy');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleClose = () => {
    setModalType(null);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const isDark = theme === 'dark';
  const linksColor = isDark
    ? 'text-stone-300 hover:text-amber-400'
    : 'text-stone-800 hover:text-amber-700';
  const legalColor = isDark ? 'text-stone-400' : 'text-stone-700';
  const copyrightColor = isDark ? 'text-stone-500' : 'text-stone-400';

  return (
    <>
      <footer
        className={`w-full text-center space-y-2 py-4 px-4 select-none ${className}`}
        data-testid="legal-footer"
      >
        {/* Row 1: Action links */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wide">
          <button
            type="button"
            onClick={() => setModalType('privacy')}
            className={`${linksColor} transition-colors cursor-pointer hover:underline`}
            data-testid="privacy-policy-button"
          >
            Política de Privacidade
          </button>
          <button
            type="button"
            onClick={() => setModalType('terms')}
            className={`${linksColor} transition-colors cursor-pointer hover:underline`}
            data-testid="terms-of-use-button"
          >
            Termos de Uso
          </button>
        </div>

        {/* Row 2: Legal Entity & CNPJ */}
        <p className={`text-[11px] sm:text-xs font-semibold ${legalColor} leading-relaxed`}>
          {TEMPLE_DATA.legalName} - CNPJ {TEMPLE_DATA.cnpj}
        </p>

        {/* Row 3: Copyright */}
        <p className={`text-[10px] sm:text-[11px] ${copyrightColor}`}>
          © 2026 {TEMPLE_DATA.name}. Todos os direitos reservados.
        </p>
      </footer>

      {/* Modal Dialog */}
      <LegalModal
        type={modalType}
        isOpen={modalType !== null}
        onClose={handleClose}
      />
    </>
  );
};
