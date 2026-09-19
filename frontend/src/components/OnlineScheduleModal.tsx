import React from 'react';
import { Video, Calendar, Clock, Sparkles, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

interface OnlineScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineScheduleModal: React.FC<OnlineScheduleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const meeting = TEMPLE_DATA.weeklyMeetings[0];

  return (
    <div
      data-testid="online-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      // Regra de UX: NÃO fecha ao clicar fora do painel central
    >
      <div
        data-testid="online-modal-content"
        className="bg-white rounded-3xl shadow-2xl border border-amber-200/80 max-w-lg w-full p-6 sm:p-8 text-stone-800 relative my-auto animate-scale-up"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Gratuito & Aberto a Todos
          </div>
        </div>

        {/* Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Video className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            {meeting?.title || 'Estudo do Bhagavad-gītā Como Ele É'}
          </h3>
          <p className="text-sm text-stone-600 mt-1 font-medium">
            Encontro Online Semanal • {meeting?.region || 'Lapidar Pacoti – CE'}
          </p>
        </div>

        {/* Meeting Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">Quando</span>
              <span className="text-sm font-bold text-stone-800">{meeting?.day || 'Todas as terças-feiras'}</span>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">Horário</span>
              <span className="text-sm font-bold text-stone-800">{meeting?.time || '20h00'} (Online)</span>
            </div>
          </div>
        </div>

        {/* Platform & Details */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 mb-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Plataforma & Formato
          </div>
          <p className="text-sm text-stone-700 leading-relaxed font-normal">
            Transmitido ao vivo pelo <strong className="text-stone-900">Google Meet</strong>. Estudo dinâmico com leitura comentada dos versos, espaço aberto para perguntas, reflexões e aplicação prática da sabedoria védica no dia a dia.
          </p>
          <ul className="space-y-1.5 pt-1">
            {meeting?.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp Access Button */}
        <div className="space-y-3">
          <a
            href={meeting?.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.01]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Pedir Link da Reunião no WhatsApp</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>

          {/* Regra UX: Exatamente 1 botão para fechar */}
          <button
            type="button"
            data-testid="modal-close-button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-semibold text-sm transition-colors duration-200"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
