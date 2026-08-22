import React from 'react';
import { Utensils, BookOpen, Music, Users } from 'lucide-react';

export const AboutTemple: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8" data-testid="about-temple-section">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Como Funciona a Experiência no Templo
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Um ambiente acolhedor, familiar e aberto para você vivenciar a cultura védica e o Bhakti-yoga no Ceará.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1: Prasadam */}
        <div className="rounded-2xl border border-amber-100 bg-stone-50 p-6 flex flex-col justify-between hover:border-amber-300 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg mb-2">Almoço Prasadam Gratuito</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Todos os domingos servimos um almoço puramente vegetariano, preparado com profunda devoção e oferecido com amor a Deus. É aberto e gratuito para todos os visitantes.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-100 text-xs font-semibold text-amber-800">
            Alimentação Espiritualizada
          </div>
        </div>

        {/* Card 2: Kirtan & Meditação */}
        <div className="rounded-2xl border border-amber-100 bg-stone-50 p-6 flex flex-col justify-between hover:border-amber-300 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg mb-2">Música e Meditação (Kirtan)</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              O canto conjunto do Maha-Mantra Hare Krishna com instrumentos indianos clássicos (harmônio, mridanga e karatala) purifica a mente e desperta a alegria interior.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-100 text-xs font-semibold text-amber-800">
            Maha-Mantra & Dança
          </div>
        </div>

        {/* Card 3: Filosofia Védica */}
        <div className="rounded-2xl border border-amber-100 bg-stone-50 p-6 flex flex-col justify-between hover:border-amber-300 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg mb-2">Filosofia Prática</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Apresentação clara dos ensinamentos do <em>Bhagavad-gita Como Ele É</em> com base nos comentários autênticos de <strong>Srila Prabhupada</strong> aplicados à vida diária.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-100 text-xs font-semibold text-amber-800">
            Conhecimento Transcendental
          </div>
        </div>

      </div>

      {/* Lineage & Welcome note */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 rounded-2xl bg-amber-200/80 text-amber-900 flex-shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          <strong className="block text-stone-900 font-semibold mb-0.5 text-sm sm:text-base">
            Espaço Universal e Linhagem Autêntica
          </strong>
          A ISKCON (Sociedade Internacional para a Consciência de Krishna) foi fundada por <strong>Sua Divina Graça A.C. Bhaktivedanta Swami Prabhupada</strong>. Nosso templo acolhe pessoas de todas as crenças, idades e origens com o mesmo respeito e carinho.
        </div>
      </div>

    </div>
  );
};
