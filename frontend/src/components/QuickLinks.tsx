import React from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Car, 
  Calendar, 
  HelpCircle, 
  Star,
  ExternalLink,
  Compass
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';
import { TEMPLE_DATA } from '../data/templeInfo';

export const QuickLinks: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8" aria-label="Ações Rápidas" data-testid="quick-links-section">
      
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Acesso Rápido & Redes
            </h2>
            <p className="text-xs text-stone-500">
              Canais oficiais, mapas, carona e avaliação
            </p>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex items-center gap-2">
          <a
            href="#programacao"
            data-testid="link-nav-schedule"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Programação</span>
          </a>
          <a
            href="#faq"
            data-testid="link-nav-faq"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Dúvidas</span>
          </a>
        </div>
      </div>

      {/* 6 Action Cards Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 1. WhatsApp Oficial */}
        <a
          href={TEMPLE_DATA.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-whatsapp"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-md shadow-emerald-700/15 border border-emerald-500 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base mb-1">WhatsApp Oficial</h3>
            <p className="text-xs text-emerald-100 leading-relaxed font-normal">
              Fale direto com a nossa equipe para tirar dúvidas sobre o templo.
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-emerald-200 group-hover:text-white">
            Iniciar conversa →
          </span>
        </a>

        {/* 2. Como Chegar ao Templo */}
        <a
          href={TEMPLE_DATA.contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-maps"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/80 text-stone-800 shadow-sm hover:shadow-md border border-stone-200 hover:border-amber-300 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <MapPin className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-1">Como Chegar</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {TEMPLE_DATA.address.full}
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-amber-700 group-hover:text-amber-800">
            Abrir no Google Maps →
          </span>
        </a>

        {/* 3. Carona Solidária */}
        <a
          href={TEMPLE_DATA.contact.caronaWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-carona"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/80 text-stone-800 shadow-sm hover:shadow-md border border-stone-200 hover:border-amber-300 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Car className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-1">Carona Solidária</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Informe seu bairro pelo WhatsApp e consulte carona com devotos.
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-amber-700 group-hover:text-amber-800">
            Solicitar carona →
          </span>
        </a>

        {/* 4. Instagram Oficial */}
        <a
          href={TEMPLE_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-instagram"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-purple-700 via-pink-600 to-amber-600 hover:opacity-95 text-white shadow-md shadow-pink-600/15 border border-pink-500/40 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/20">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-pink-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base mb-1">{TEMPLE_DATA.contact.instagramHandle}</h3>
            <p className="text-xs text-pink-100 leading-relaxed font-normal">
              Acompanhe fotos, avisos semanais e transmissão ao vivo.
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-pink-200 group-hover:text-white">
            Seguir no Instagram →
          </span>
        </a>

        {/* 5. Canal no YouTube */}
        <a
          href={TEMPLE_DATA.contact.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-youtube"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-md shadow-red-700/15 border border-red-500 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-white/20">
                <YoutubeIcon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-4 h-4 text-red-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base mb-1">Canal no YouTube</h3>
            <p className="text-xs text-red-100 leading-relaxed font-normal">
              Assista a palestras, bhajans gravados e transmissões especiais.
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-red-200 group-hover:text-white">
            Acessar canal →
          </span>
        </a>

        {/* 6. Avaliar no Google (Google Meu Negócio) */}
        <a
          href={TEMPLE_DATA.contact.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-google-review"
          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/80 text-stone-800 shadow-sm hover:shadow-md border border-stone-200 hover:border-amber-300 transition-all duration-200 hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <ExternalLink className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-1">Avaliar no Google</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Já visitou o templo? Deixe seu comentário e avaliação no Google Maps!
            </p>
          </div>
          <span className="mt-4 inline-block text-xs font-semibold text-amber-700 group-hover:text-amber-800">
            Deixar avaliação ⭐⭐⭐⭐⭐
          </span>
        </a>

      </div>

    </div>
  );
};
