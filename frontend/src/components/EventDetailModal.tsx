import React from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ExternalLink, 
  Sun, 
  Crown, 
  Heart,
  CalendarDays
} from 'lucide-react';
import { TempleEvent } from '../data/eventsData';
import { TEMPLE_DATA } from '../data/templeInfo';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAY_NAMES = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado'
];

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateStr: string;
  events: TempleEvent[];
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  dateStr,
  events
}) => {
  // Trava a rolagem da página de fundo (body) enquanto o modal estiver aberto
  React.useEffect(() => {
    if (!isOpen || events.length === 0) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, events.length]);

  if (!isOpen || events.length === 0) return null;

  // Format date display
  const formattedDate = (() => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    const month = MONTH_NAMES[m - 1];
    return `${d} de ${month} de ${y} (${weekday})`;
  })();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overscroll-contain touch-none transition-opacity duration-200"
      data-testid="event-detail-modal-backdrop"
      // Backdrop does NOT close on click per RULE[experiencia-usuario.md]
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        data-testid="event-detail-modal"
        className="bg-white rounded-3xl shadow-2xl border-2 border-amber-300 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 touch-auto overscroll-contain"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="event-modal-title" className="text-base sm:text-lg font-black tracking-tight leading-tight">
                Detalhes da Programação
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                {formattedDate}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            data-testid="btn-modal-close-icon"
            aria-label="Fechar janela de detalhes"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable list of events for the day */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {events.map((evt) => (
            <article 
              key={evt.id}
              data-testid={`modal-event-card-${evt.id}`}
              className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-xs"
            >
              {/* Category Badge & Period */}
              <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-2xs ${
                  evt.isCancelled 
                    ? 'bg-stone-200 text-stone-800' 
                    : evt.isBirthDateOfGod
                    ? 'bg-purple-100 text-purple-950 border border-purple-200'
                    : 'bg-amber-200/80 text-amber-950'
                }`}>
                  {evt.isCancelled ? (
                    <CalendarDays className="w-3.5 h-3.5 text-stone-600" />
                  ) : evt.isBirthDateOfGod ? (
                    <Heart className="w-3.5 h-3.5 text-purple-700" />
                  ) : evt.isRecurringSunday ? (
                    <Sun className="w-3.5 h-3.5 text-amber-700" />
                  ) : (
                    <Crown className="w-3.5 h-3.5 text-orange-600" />
                  )}
                  {evt.categoryLabel}
                </span>

                <span className="text-xs text-stone-600 font-bold bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  {evt.period}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight mb-1">
                {evt.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 font-semibold mb-3">
                {evt.subtitle}
              </p>

              {/* Time & Location */}
              <div className="space-y-1.5 mb-3.5 text-xs sm:text-sm text-stone-700 bg-white/80 p-3 rounded-xl border border-stone-200/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Horário:</strong> {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Local:</strong> {evt.location}</span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-normal">
                {evt.description}
              </p>

              {/* WhatsApp Action Button */}
              {(() => {
                const isNoPublicProgram = evt.isCancelled || evt.noPublicEventOnDate || evt.isBirthDateOfGod;
                const whatsappMessage = isNoPublicProgram
                  ? `Olá! Vi no calendário do site a data de "${evt.title}" (${formattedDate}) e gostaria de tirar dúvidas com o templo.`
                  : `Olá! Gostaria de confirmar presença e saber mais sobre a programação "${evt.title}" (${formattedDate}) que vi no calendário do site.`;

                return (
                  <a
                    href={`${TEMPLE_DATA.contact.whatsappUrl}&text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`btn-modal-event-whatsapp-${evt.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isNoPublicProgram ? 'Tirar Dúvidas com o Templo no WhatsApp' : 'Confirmar Presença / Dúvidas no WhatsApp'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                );
              })()}
            </article>
          ))}
        </div>

        {/* Modal Footer: Single Close Button */}
        <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            data-testid="btn-modal-close"
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 active:bg-stone-950 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
