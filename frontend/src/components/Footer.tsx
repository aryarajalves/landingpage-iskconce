import React from 'react';
import { TEMPLE_DATA } from '../data/templeInfo';
import { MapPin, Phone, ExternalLink, Star } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsappIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-12 pb-12 border-t border-amber-200/80 bg-amber-100/50 text-stone-600 text-xs" data-testid="footer-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Identity & Founder */}
          <div className="text-center md:text-left space-y-2">
            <div className="text-3xl mb-2">🪷</div>
            <h3 className="font-serif font-bold text-stone-900 text-lg">{TEMPLE_DATA.name}</h3>
            <p className="text-xs text-stone-600 font-medium">{TEMPLE_DATA.subtitle}</p>
            <p className="text-[11px] text-stone-500 pt-1">
              Fundador-Acharya: <strong>Srila Prabhupada</strong> (A.C. Bhaktivedanta Swami Prabhupada)
            </p>
          </div>

          {/* Column 2: Location & Contact */}
          <div className="text-center md:text-left space-y-2.5 bg-white/70 backdrop-blur rounded-2xl p-5 border border-amber-200/70 shadow-sm">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider text-amber-900">
              Endereço & Contato
            </h4>
            <p className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-700">
              <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>{TEMPLE_DATA.address.full}</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-700">
              <Phone className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>{`WhatsApp: ${TEMPLE_DATA.contact.phoneFormatted}`}</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-xs text-stone-700">
              <InstagramIcon className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>{`Instagram: ${TEMPLE_DATA.contact.instagramHandle}`}</span>
            </p>
          </div>

          {/* Column 3: Quick Direct Links */}
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider text-amber-900 mb-3">
              Canais & Avaliação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={TEMPLE_DATA.contact.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-red-700 transition-colors"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                  <span>Canal do YouTube</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href={TEMPLE_DATA.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-pink-700 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram @iskcon_ce</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href={TEMPLE_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 transition-colors font-medium"
                >
                  <WhatsappIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Oficial</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href={TEMPLE_DATA.contact.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-amber-800 transition-colors font-medium"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Avaliar no Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal data & Bottom Bar */}
        <div className="pt-6 border-t border-amber-200/60 text-center text-[11px] text-stone-500 space-y-1">
          <p>{TEMPLE_DATA.legalName}</p>
          <p>{`CNPJ: ${TEMPLE_DATA.cnpj}`}</p>
          <p className="pt-2 text-stone-700 font-semibold text-xs">
            Hare Krishna! Todos são muito bem-vindos 🙏
          </p>
        </div>

      </div>
    </footer>
  );
};
