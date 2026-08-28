import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, MapPin, Calendar, Image as ImageIcon, Sparkles, HelpCircle, Landmark, BookOpen } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Início',
    href: '#inicio',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
  },
  {
    label: 'Programação',
    href: '#programacao',
    icon: <Calendar className="w-4 h-4 text-amber-600" />,
  },
  {
    label: 'Encontros',
    href: '#encontros',
    icon: <BookOpen className="w-4 h-4 text-amber-600" />,
  },
  {
    label: 'Galeria',
    href: '#galeria',
    icon: <ImageIcon className="w-4 h-4 text-amber-600" />,
  },
  {
    label: 'O Templo',
    href: '#sobre',
    icon: <Landmark className="w-4 h-4 text-amber-600" />,
  },
  {
    label: 'Dúvidas',
    href: '#faq',
    icon: <HelpCircle className="w-4 h-4 text-amber-600" />,
  },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of [...NAV_ITEMS].reverse()) {
        const id = item.href.replace('#', '');
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand / Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center gap-2.5 group cursor-pointer"
            data-testid="navbar-brand"
            aria-label="ISKCON Ceará - Início"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">🪷</span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                {TEMPLE_DATA.name}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-800/80 font-medium leading-none">
                Fortaleza & Aquiraz
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" data-testid="desktop-nav">
            {NAV_ITEMS.map((item) => {
              const isCurrent = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  data-testid={`nav-link-${item.href.replace('#', '')}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                    isCurrent
                      ? 'bg-amber-100/90 text-amber-950 shadow-xs border border-amber-200'
                      : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={TEMPLE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-btn-whatsapp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="btn-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:text-amber-900 hover:bg-amber-100/80 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu-drawer"
          className="md:hidden border-t border-amber-200/80 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                data-testid={`mobile-nav-link-${item.href.replace('#', '')}`}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:text-amber-900 hover:bg-amber-100/80 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-amber-100 flex flex-col sm:hidden gap-2">
            <a
              href={TEMPLE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
            <a
              href={TEMPLE_DATA.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Como Chegar ao Templo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
