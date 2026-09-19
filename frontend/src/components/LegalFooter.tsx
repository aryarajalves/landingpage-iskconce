import React from 'react';
import { TEMPLE_DATA } from '../data/templeInfo';
import { useRouter } from '../context/RouterContext';

interface LegalFooterProps {
  className?: string;
  theme?: 'light' | 'dark' | 'glass';
}

export const LegalFooter: React.FC<LegalFooterProps> = ({ className = '', theme = 'light' }) => {
  const { navigate } = useRouter();

  const isDark = theme === 'dark';
  const linksColor = isDark
    ? 'text-stone-300 hover:text-amber-400'
    : 'text-stone-800 hover:text-amber-700';
  const legalColor = isDark ? 'text-stone-400' : 'text-stone-700';
  const copyrightColor = isDark ? 'text-stone-500' : 'text-stone-400';

  const handleGoToPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/politica-de-privacidade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/termos-de-uso');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`w-full text-center space-y-2 py-4 px-4 select-none ${className}`}
      data-testid="legal-footer"
    >
      {/* Row 1: Action links to dedicated pages */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wide">
        <a
          href="/politica-de-privacidade"
          onClick={handleGoToPrivacy}
          className={`${linksColor} transition-colors cursor-pointer hover:underline`}
          data-testid="privacy-policy-button"
        >
          Política de Privacidade
        </a>
        <a
          href="/termos-de-uso"
          onClick={handleGoToTerms}
          className={`${linksColor} transition-colors cursor-pointer hover:underline`}
          data-testid="terms-of-use-button"
        >
          Termos de Uso
        </a>
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
  );
};
