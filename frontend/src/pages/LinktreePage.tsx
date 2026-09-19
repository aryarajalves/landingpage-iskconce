import React from 'react';
import { 
  Sun, 
  Video, 
  ArrowRight, 
  MessageCircle, 
  MapPin, 
  Sparkles,
  Heart,
  Music,
  ExternalLink,
  CalendarDays
} from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { LegalFooter } from '../components/LegalFooter';
import { useRouter } from '../context/RouterContext';
import { useAudio } from '../context/AudioContext';
import { TEMPLE_DATA } from '../data/templeInfo';

export const LinktreePage: React.FC = () => {
  const { navigate } = useRouter();
  const { unlockAndPlayForRoute } = useAudio();

  const handleNavigateToRoute = (path: string) => {
    unlockAndPlayForRoute(path).catch(() => {});
    navigate(path);
  };

  const handleGoToSundayFestival = () => {
    handleNavigateToRoute('/festivaldedomingo');
  };

  const handleGoToOnlinePrograms = () => {
    handleNavigateToRoute('/programacoesonline');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-stone-100 flex flex-col items-center justify-center px-4 py-8 sm:py-12 selection:bg-amber-200 selection:text-amber-900 font-sans">
      
      {/* Central Linktree Card Container */}
      <main className="w-full max-w-md bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-stone-300/60 border border-amber-100/80 p-6 sm:p-8 relative flex flex-col items-center text-center">
        
        {/* Top Decorative Squircle Avatar / Brand Badge */}
        <div className="relative mb-5 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 shadow-xl shadow-emerald-600/30 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/25 flex items-center justify-center">
              <Sparkles className="w-9 h-9 sm:w-10 sm:h-10 text-white animate-pulse" />
            </div>
          </div>
          {/* Subtle Glow Ring */}
          <div className="absolute -inset-1 rounded-[28px] bg-emerald-400/20 blur-md -z-10"></div>
        </div>

        {/* Main Title & Stylized Header */}
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
          Programações do{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
            Templo
          </span>
        </h1>

        {/* Temple Name Subtitle */}
        <p className="text-xs sm:text-sm font-semibold text-amber-800/90 tracking-wide uppercase mt-1 mb-2">
          {TEMPLE_DATA.name} • Fortaleza & Aquiraz
        </p>

        {/* Welcoming Description */}
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-7 max-w-xs font-normal">
          Conheça as atividades e encontros espirituais do Templo Hare Krishna. Escolha uma das programações abaixo:
        </p>

        {/* Main Action Buttons Grid */}
        <div className="w-full space-y-3.5 sm:space-y-4 mb-6">

          {/* Button 1: Festival de Domingo */}
          <button
            type="button"
            data-testid="linktree-btn-festival"
            onClick={handleGoToSundayFestival}
            className="group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 active:bg-amber-100/50 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200 shadow-sm">
                <Sun className="w-6 h-6" />
              </div>
              {/* Text Info */}
              <div className="text-left">
                <h2 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Festival de Domingo
                </h2>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-0.5">
                  Música devocional, palestra e banquete vegetariano gratuito
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200 shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* Button 2: Programações Online Durante a Semana */}
          <button
            type="button"
            data-testid="linktree-btn-online"
            onClick={handleGoToOnlinePrograms}
            className="group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 active:bg-amber-100/50 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200 shadow-sm">
                <Video className="w-6 h-6" />
              </div>
              {/* Text Info */}
              <div className="text-left">
                <h2 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-orange-800 transition-colors">
                  Programações Online Durante a Semana
                </h2>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-0.5">
                  Segunda (devotas), Terça (Lapidar - Bhagavad-gītā) e Quinta (Passatempos de Krishna)
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-200 shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* Button 3: Kirtans & Bhajans do Templo (SoundCloud) */}
          <a
            href={TEMPLE_DATA.contact.soundCloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="linktree-btn-soundcloud"
            className="group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 active:bg-amber-100/50 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200 shadow-sm">
                <Music className="w-6 h-6" />
              </div>
              {/* Text Info */}
              <div className="text-left">
                <h2 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Kirtans & Bhajans do Templo
                </h2>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-0.5">
                  Ouça os kirtaniyas cantando os bhajans sagrados no SoundCloud
                </p>
              </div>
            </div>

            {/* Right External Link Arrow */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200 shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
          </a>

          {/* Button 4: Calendário de Eventos & Festivais */}
          <button
            type="button"
            onClick={() => handleNavigateToRoute('/calendariodeeventos')}
            data-testid="linktree-btn-calendar"
            className="group w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-500 bg-white hover:bg-amber-50/50 active:bg-amber-100/50 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 overflow-hidden">
              {/* Icon Container */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                <CalendarDays className="w-6 h-6" />
              </div>
              {/* Text Info */}
              <div className="text-left">
                <h2 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  Calendário de Eventos & Festivais
                </h2>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-0.5">
                  Festivais de domingo, aparição de Srila Prabhupada e celebrações sagradas
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all duration-200 shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

        </div>

        {/* Quick Contact & Social Links */}
        <div className="w-full pt-4 border-t border-stone-100 flex items-center justify-center gap-4 text-stone-500">
          <a
            href={TEMPLE_DATA.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram ISKCON Ceará"
            className="w-10 h-10 rounded-full bg-stone-50 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-center border border-stone-200/80 transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={TEMPLE_DATA.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp do Templo"
            className="w-10 h-10 rounded-full bg-stone-50 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center border border-stone-200/80 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <a
            href={TEMPLE_DATA.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Localização do Templo no Google Maps"
            className="w-10 h-10 rounded-full bg-stone-50 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-center border border-stone-200/80 transition-colors"
          >
            <MapPin className="w-4 h-4" />
          </a>
        </div>

        {/* Subtle Footer Note */}
        <div className="mt-5 text-[11px] text-stone-400 flex items-center gap-1 font-medium">
          <span>Hare Krishna</span>
          <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>Todas as Glórias a Srila Prabhupada</span>
        </div>

      </main>

      {/* Official Legal Footer */}
      <LegalFooter className="mt-8 max-w-xl" />

    </div>
  );
};
