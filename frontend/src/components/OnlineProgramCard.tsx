import React from 'react';
import { Calendar, Clock, MessageCircle, Sparkles, ExternalLink, Users, BookOpen } from 'lucide-react';
import { WeeklyMeeting } from '../data/templeInfo';

interface OnlineProgramCardProps {
  meeting: WeeklyMeeting;
}

export const OnlineProgramCard: React.FC<OnlineProgramCardProps> = ({ meeting }) => {
  const isWomensGroup = meeting.id === 'segunda-sangha-feminina';
  const isPastimes = meeting.id === 'quinta-passatempos-krsna';

  const badgeColor = isWomensGroup
    ? 'bg-rose-50 text-rose-700 border-rose-200'
    : isPastimes
    ? 'bg-sky-50 text-sky-700 border-sky-200'
    : 'bg-amber-50 text-amber-800 border-amber-200';

  const iconBg = isWomensGroup
    ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/20'
    : isPastimes
    ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sky-500/20'
    : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-orange-500/20';

  const coordinatorLabel = isWomensGroup
    ? 'a representante'
    : isPastimes
    ? 'a coordenadora do Clube do Livro'
    : 'a facilitadora';

  return (
    <div
      data-testid={`online-program-card-${meeting.id}`}
      className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Top Badges (Day/Time & Audience) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeColor}`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{meeting.badge || meeting.day}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold">
            <Users className="w-3 h-3 text-stone-500" />
            <span>{meeting.tag}</span>
          </div>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${iconBg}`}>
            {isWomensGroup ? (
              <Users className="w-6 h-6" />
            ) : isPastimes ? (
              <Sparkles className="w-6 h-6" />
            ) : (
              <BookOpen className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
              {meeting.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 font-medium">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Users className="w-3.5 h-3.5" />
                {meeting.platform}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-600">
                <Clock className="w-3.5 h-3.5" />
                {meeting.time}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-stone-600 text-sm leading-relaxed mb-5">
          {meeting.description}
        </p>

        {/* Highlights List */}
        <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/70 mb-5 space-y-2">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Destaques do Encontro
          </span>
          {meeting.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Representative guidance & Bottom CTA Action Button */}
      <div className="pt-4 border-t border-stone-100 space-y-3">
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3.5 text-left">
          <p className="text-xs text-stone-700 leading-relaxed">
            Ao apertar no botão abaixo, você vai falar com {coordinatorLabel} (<strong>{meeting.contactName}</strong>), que vai te orientar e te dar acesso ao grupo exclusivo.
          </p>
        </div>

        <a
          href={meeting.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`btn-join-${meeting.id}`}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.01]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar com {meeting.contactName} no WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
};
