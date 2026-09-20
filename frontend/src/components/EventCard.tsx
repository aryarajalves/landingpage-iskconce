import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, ExternalLink, Sun, Crown, Heart } from 'lucide-react';
import { TempleEvent } from '../data/eventsData';

interface EventCardProps {
  event: TempleEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isSunday = event.category === 'domingo';
  const isGuru = event.category === 'gurus';

  const categoryIcon = isSunday ? (
    <Sun className="w-6 h-6" />
  ) : isGuru ? (
    <Crown className="w-6 h-6" />
  ) : (
    <Heart className="w-6 h-6" />
  );

  const iconGradient = isSunday
    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/20'
    : isGuru
    ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/20'
    : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/20';

  const whatsappInquiryUrl = `https://wa.me/5585997930976?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Templo%20da%20ISKCON%20Cear%C3%A1%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20evento%3A%20${encodeURIComponent(
    event.title
  )}`;

  return (
    <div
      data-testid={`event-card-${event.id}`}
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Top Badges (Category & Recurrence/Type) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${event.badgeColor}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.period}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{event.categoryLabel}</span>
          </span>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${iconGradient}`}>
            {categoryIcon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
              {event.title}
            </h3>
            <p className="text-xs text-amber-800/90 font-medium mt-0.5">
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Schedule and Location info */}
        <div className="space-y-1.5 mb-4 text-xs text-stone-600 bg-stone-50/70 rounded-2xl p-3.5 border border-stone-200/60">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span><strong>Horário:</strong> {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span><strong>Local:</strong> {event.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-stone-600 text-sm leading-relaxed mb-5">
          {event.description}
        </p>

        {/* Program Activities */}
        <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-200/60 mb-5 space-y-2">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Programação e Atividades
          </span>
          {event.activities.map((act, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="pt-4 border-t border-stone-100">
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`btn-event-whatsapp-${event.id}`}
          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.01]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{event.isCancelled ? 'Tirar Dúvidas com o Templo no WhatsApp' : 'Tirar Dúvidas sobre este Evento no WhatsApp'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
};
