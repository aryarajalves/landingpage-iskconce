import React from 'react';
import { Hero } from './components/Hero';
import { QuickLinks } from './components/QuickLinks';
import { Schedule } from './components/Schedule';
import { Gallery } from './components/Gallery';
import { AboutTemple } from './components/AboutTemple';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-100/40 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      
      {/* Top Main Container (Full width on PC, adaptative on Mobile) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* 1. Hero & Welcome Banner */}
        <Hero />

        {/* 2. Quick Links Grid */}
        <QuickLinks />

        {/* 3. Sunday Festival Schedule Grid */}
        <Schedule />

        {/* 4. Gallery of Temple Photos (Above Experience Section) */}
        <Gallery />

        {/* 5. About Temple & 3 Pillars */}
        <AboutTemple />

        {/* 6. Visitor Guide & FAQ */}
        <FaqAccordion />

      </main>

      {/* Full-width Footer */}
      <Footer />

    </div>
  );
};

export default App;
