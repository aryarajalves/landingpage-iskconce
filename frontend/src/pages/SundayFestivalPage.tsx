import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QuickLinks } from '../components/QuickLinks';
import { Schedule } from '../components/Schedule';
import { WeeklyMeetings } from '../components/WeeklyMeetings';
import { Gallery } from '../components/Gallery';
import { AboutTemple } from '../components/AboutTemple';
import { FaqAccordion } from '../components/FaqAccordion';
import { Footer } from '../components/Footer';
import { AudioPlayer } from '../components/AudioPlayer';
import { useRouter } from '../context/RouterContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const SundayFestivalPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-100/40 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      
      {/* Top Sticky Navigation Bar */}
      <Navbar />

      {/* Return to Linktree Sub-banner */}
      <nav aria-label="Navegação de retorno" className="bg-amber-100/80 border-b border-amber-200/80 py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            data-testid="banner-btn-linktree"
            className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-950 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todas as programações do templo</span>
          </button>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-amber-800/90 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Festival de Domingo • Entrada 100% Gratuita</span>
          </div>
        </div>
      </nav>

      {/* Top Main Container (Full width on PC, adaptative on Mobile) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* 1. Hero & Welcome Banner */}
        <Hero />

        {/* 2. Quick Links Grid */}
        <QuickLinks />

        {/* 3. Sunday Festival Schedule Grid */}
        <Schedule />

        {/* 4. Weekly Meetings & Study Groups */}
        <WeeklyMeetings />

        {/* 5. Gallery of Temple Photos */}
        <Gallery />

        {/* 6. About Temple & 3 Pillars */}
        <AboutTemple />

        {/* 7. Visitor Guide & FAQ */}
        <FaqAccordion />

      </main>

      {/* Full-width Footer */}
      <Footer />

      {/* Floating Devotional Music Player */}
      <AudioPlayer />

    </div>
  );
};
