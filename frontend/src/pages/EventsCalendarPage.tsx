import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CalendarDays, 
  Calendar, 
  Crown, 
  Heart, 
  Sun, 
  MessageCircle, 
  HelpCircle, 
  ExternalLink,
  List
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { TEMPLE_DATA } from '../data/templeInfo';
import { TEMPLE_EVENTS, EventCategory } from '../data/eventsData';
import { EventCard } from '../components/EventCard';
import { InteractiveCalendar } from '../components/InteractiveCalendar';
import { Footer } from '../components/Footer';
import { AudioPlayer } from '../components/AudioPlayer';

export const EventsCalendarPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('todos');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const filteredEvents = selectedCategory === 'todos'
    ? TEMPLE_EVENTS
    : TEMPLE_EVENTS.filter((evt) => evt.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-stone-100 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 font-sans">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            aria-label="Voltar para a página inicial"
          >
            <span className="text-2xl">🪷</span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base text-stone-900 leading-tight">
                {TEMPLE_DATA.name}
              </span>
              <span className="text-[10px] text-amber-800 font-medium">
                Calendário de Eventos
              </span>
            </div>
          </button>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              data-testid="calendar-btn-back-linktree"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Programações</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/festivaldedomingo')}
              data-testid="calendar-btn-sunday-festival"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Festival Presencial</span>
            </button>
          </div>

        </div>
      </header>

      {/* Return Sub-banner */}
      <nav aria-label="Retorno para programações" className="bg-amber-100/90 border-b border-amber-200/80 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-950 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todas as programações do templo</span>
          </button>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Festivais Semanais & Celebrações Sagradas Vaisnavas</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* 1. Hero Section */}
        <section data-testid="calendar-hero-section" className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-xs mb-4">
            <CalendarDays className="w-4 h-4 text-amber-700" />
            <span>Datas Sagradas & Encontros • Calendário do Templo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Calendário de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
              Eventos & Festivais
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal mb-6">
            Acompanhe os meses, dias e anos dos festivais de domingo, aparição de Srila Prabhupada, grandes celebrações Vaisnavas e visitas de mestres espirituais para se planejar com antecedência.
          </p>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-amber-100/80 border border-amber-200 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              data-testid="btn-view-calendar"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CalendarDays className="w-4 h-4 text-amber-600" />
              <span>Grade de Calendário</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('list')}
              data-testid="btn-view-list"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-4 h-4 text-amber-600" />
              <span>Lista de Festivais ({filteredEvents.length})</span>
            </button>
          </div>
        </section>

        {/* 2. Interactive Filter Tabs */}
        <section className="flex items-center justify-center flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory('todos')}
            data-testid="filter-tab-todos"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'todos'
                ? 'bg-stone-900 text-amber-300 shadow-md scale-105'
                : 'bg-white/80 text-stone-600 hover:bg-amber-100/60 border border-stone-200/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Todos os Eventos ({TEMPLE_EVENTS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('domingo')}
            data-testid="filter-tab-domingo"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'domingo'
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'bg-white/80 text-stone-600 hover:bg-amber-100/60 border border-stone-200/80'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Festivais de Domingo</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('gurus')}
            data-testid="filter-tab-gurus"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'gurus'
                ? 'bg-orange-600 text-white shadow-md scale-105'
                : 'bg-white/80 text-stone-600 hover:bg-amber-100/60 border border-stone-200/80'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Prabhupada & Gurus</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('vaisnava')}
            data-testid="filter-tab-vaisnava"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'vaisnava'
                ? 'bg-purple-700 text-white shadow-md scale-105'
                : 'bg-white/80 text-stone-600 hover:bg-amber-100/60 border border-stone-200/80'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Grandes Celebrações Vaisnavas</span>
          </button>
        </section>

        {/* 3. Main View: Interactive Calendar Grid OR List View */}
        {viewMode === 'calendar' ? (
          <div className="space-y-12">
            {/* Visual Month/Year Grid */}
            <InteractiveCalendar selectedCategory={selectedCategory} />

            {/* Upcoming Highlights of Selected Category */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">
                  Destaques e Próximos Festivais
                </h2>
                <p className="text-sm text-stone-600 font-normal">
                  Confira as informações completas de cada celebração sagrada
                </p>
              </div>

              <div data-testid="events-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
                {filteredEvents.map((evt) => (
                  <EventCard key={evt.id} event={evt} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <section data-testid="events-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-20">
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </section>
        )}

        {/* 4. Information Banner: How to Confirm Dates */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xl shadow-stone-200/50 mb-14 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-3">
            Como Funciona o Calendário Vaisnava?
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            As datas dos festivais védicos são determinadas pelo calendário lunar védico sagrado (<em>Panjika</em>), variando de ano para ano no calendário solar ocidental. Para saber a data exata da próxima celebração ou visita de mestres espirituais, consulte nossa equipe pelo WhatsApp oficial:
          </p>

          <a
            href={TEMPLE_DATA.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-calendar-whatsapp-official"
            className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Consultar Próxima Data no WhatsApp Oficial</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>
        </section>

      </main>

      {/* Full-width Footer with Legal Footer */}
      <Footer />

      {/* Floating Audio Player Widget */}
      <AudioPlayer />

    </div>
  );
};
