import React from 'react';
import { Music, BookOpen, Sparkles, UtensilsCrossed, Clock, Info } from 'lucide-react';
import { TEMPLE_DATA, ScheduleItem } from '../data/templeInfo';

const getScheduleIcon = (iconName: ScheduleItem['iconName']) => {
  switch (iconName) {
    case 'music':
      return <Music className="w-6 h-6 text-amber-700" />;
    case 'book':
      return <BookOpen className="w-6 h-6 text-amber-700" />;
    case 'sparkles':
      return <Sparkles className="w-6 h-6 text-amber-700" />;
    case 'utensils':
      return <UtensilsCrossed className="w-6 h-6 text-amber-700" />;
    default:
      return <Clock className="w-6 h-6 text-amber-700" />;
  }
};

export const Schedule: React.FC = () => {
  return (
    <div id="programacao" className="scroll-mt-24 bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8" data-testid="schedule-section">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>Todos os Domingos</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Festival de Domingo
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Uma manhã especial e aberta com música meditativa, filosofia védica, celebração e banquete vegetariano gratuito.
        </p>
      </div>

      {/* 4 Cards Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TEMPLE_DATA.sundaySchedule.map((item, index) => (
          <div
            key={index}
            data-testid={`schedule-item-${index}`}
            className="flex flex-col justify-between p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-amber-100 hover:border-amber-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100/80 flex items-center justify-center shadow-inner">
                  {getScheduleIcon(item.iconName)}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900">
                  {item.time}
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-amber-100/80 text-[11px] text-amber-800 font-medium">
              Etapa {index + 1} de 4
            </div>
          </div>
        ))}
      </div>

      {/* Free Entry Alert Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm text-amber-950">
        <div className="p-2 rounded-xl bg-amber-200/80 text-amber-900 flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <strong className="text-amber-900 text-sm font-semibold">Entrada 100% Livre e Gratuita:</strong>
          <p className="text-stone-700 text-xs sm:text-sm mt-0.5">
            Você e sua família podem chegar no início às 10h ou a qualquer momento durante a manhã. Não é necessário nenhum tipo de inscrição ou reserva.
          </p>
        </div>
      </div>

    </div>
  );
};
