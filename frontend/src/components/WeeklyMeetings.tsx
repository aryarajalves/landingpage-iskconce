import React from 'react';
import { BookOpen, Video, Calendar, Clock, MessageCircle, CheckCircle2, Users, ExternalLink } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

export const WeeklyMeetings: React.FC = () => {
  return (
    <section
      id="encontros"
      className="scroll-mt-24 bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 mb-8"
      aria-label="Encontros Semanais e Grupos de Estudo"
      data-testid="weekly-meetings-section"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Durante a Semana • Estudo Online</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Encontros Semanais & Grupos de Estudo
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Além do tradicional Festival de Domingo em Aquiraz, você pode se conectar semanalmente através de encontros de estudo do <em>Bhagavad-gītā</em> pelo Google Meet com participação 100% gratuita.
        </p>
      </div>

      {/* Featured Single Meeting Card */}
      <div className="max-w-3xl mx-auto mb-4">
        {TEMPLE_DATA.weeklyMeetings.map((meeting) => (
          <div
            key={meeting.id}
            data-testid={`meeting-card-${meeting.id}`}
            className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-stone-50 to-orange-50/30 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
          >
            <div>
              {/* Top Region & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-3 py-1 rounded-lg">
                  {meeting.region}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 bg-white/80 border border-stone-200/70 px-2.5 py-1 rounded-full shadow-2xs">
                  {meeting.isOnline ? (
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                  )}
                  <span>{meeting.tag}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                {meeting.title}
              </h3>

              {/* Description */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                {meeting.description}
              </p>

              {/* Schedule Details Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 bg-white/80 p-3.5 rounded-xl border border-amber-100 text-xs text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{meeting.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{meeting.platform}</span>
                </div>
              </div>

              {/* Highlights Bullet points */}
              <div className="space-y-2 mb-6">
                {meeting.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Contact & WhatsApp CTA */}
            <div className="pt-4 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-stone-500 block uppercase tracking-wider font-semibold">
                  Mais Informações
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  {meeting.contactName} — <span className="text-emerald-700 font-mono">{meeting.contactPhone}</span>
                </span>
              </div>

              <a
                href={meeting.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`btn-contact-${meeting.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Entrar no Grupo (WhatsApp)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
