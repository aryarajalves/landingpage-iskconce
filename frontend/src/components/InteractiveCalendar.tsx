import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Sun, Sparkles, Calendar as CalendarIcon, 
  Clock, MapPin, MessageCircle, ExternalLink, Crown, Heart 
} from 'lucide-react';
import { TempleEvent, getEventsForDate, EventCategory } from '../data/eventsData';
import { TEMPLE_DATA } from '../data/templeInfo';
import { EventDetailModal } from './EventDetailModal';

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface InteractiveCalendarProps {
  selectedCategory?: EventCategory;
  onSelectEvent?: (event: TempleEvent) => void;
}

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  selectedCategory = 'todos'
}) => {
  // Cálculo dinâmico do dia de hoje
  const today = useMemo(() => new Date(), []);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1; // 1-12
  const todayDay = today.getDate();
  const todayDateStr = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;

  // Inicializa com o mês e ano atuais
  const [currentYear, setCurrentYear] = useState<number>(todayYear);
  const [currentMonth, setCurrentMonth] = useState<number>(todayMonth);
  const [selectedDate, setSelectedDate] = useState<string>(todayDateStr);

  // Estados do Popup Modal de Eventos
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalEvents, setModalEvents] = useState<TempleEvent[]>([]);
  const [modalDateStr, setModalDateStr] = useState<string>('');

  const availableYears = useMemo(() => {
    const set = new Set([2026, 2027, todayYear]);
    return Array.from(set).sort();
  }, [todayYear]);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(y => y - 1); }
    else { setCurrentMonth(m => m - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(y => y + 1); }
    else { setCurrentMonth(m => m + 1); }
  };

  // Calendar days grid computation
  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sun
    const totalDays = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthTotalDays = new Date(currentYear, currentMonth - 1, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({ dayNumber: prevMonthTotalDays - i, isCurrentMonth: false, isToday: false, dateStr: '' });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const padM = String(currentMonth).padStart(2, '0');
      const padD = String(d).padStart(2, '0');
      const dateStr = `${currentYear}-${padM}-${padD}`;
      const allDayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === todayDateStr;

      const filteredEvents = selectedCategory === 'todos'
        ? allDayEvents
        : allDayEvents.filter(e => e.category === selectedCategory);

      const isSunday = new Date(currentYear, currentMonth - 1, d).getDay() === 0;
      const hasSundayFestival = filteredEvents.some(e => e.isRecurringSunday);
      const hasSpecialFestival = filteredEvents.some(e => !e.isRecurringSunday && !e.isCancelled);
      const isCancelledDay = filteredEvents.some(e => e.isCancelled);

      days.push({
        dayNumber: d, isCurrentMonth: true, dateStr, isToday, isSunday,
        events: filteredEvents, hasSpecialFestival, hasSundayFestival, isCancelledDay
      });
    }

    // Next month padding to fill row
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let j = 1; j <= remainingCells; j++) {
      days.push({ dayNumber: j, isCurrentMonth: false, isToday: false, dateStr: '' });
    }

    return days;
  }, [currentYear, currentMonth, selectedCategory, todayDateStr]);

  const handleDayClick = (item: { dateStr: string; events?: TempleEvent[] }) => {
    setSelectedDate(item.dateStr);
    if (item.events && item.events.length > 0) {
      setModalEvents(item.events);
      setModalDateStr(item.dateStr);
      setIsModalOpen(true);
    }
  };

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    const events = getEventsForDate(selectedDate);
    if (selectedCategory === 'todos') return events;
    return events.filter(e => e.category === selectedCategory);
  }, [selectedDate, selectedCategory]);

  return (
    <section className="w-full max-w-5xl mx-auto my-8 px-4" data-testid="interactive-calendar">
      
      {/* Calendar Card Container */}
      <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/70 border border-amber-200/80 overflow-hidden">
        
        {/* Header: Controls & Title */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight" data-testid="calendar-current-title">
                {MONTH_NAMES[currentMonth - 1]} de {currentYear}
              </h2>
              <p className="text-xs text-amber-100/90 font-medium">
                Selecione um dia para ver os festivais e programações
              </p>
            </div>
          </div>

          {/* Navigation & Year Selector */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
            
            {/* Year Selector */}
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              data-testid="calendar-select-year"
              aria-label="Selecionar Ano"
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-2 rounded-xl border border-white/30 backdrop-blur-md focus:outline-none cursor-pointer"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="text-stone-900">{yr}</option>
              ))}
            </select>

            {/* Quick jump to Today */}
            <button
              type="button"
              onClick={() => { setCurrentYear(todayYear); setCurrentMonth(todayMonth); setSelectedDate(todayDateStr); }}
              data-testid="btn-jump-today"
              title="Ir para a data de hoje"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs px-2.5 sm:px-3 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Hoje
            </button>

            {/* Quick jump to October (Chandramukha Swami visit) */}
            <button
              type="button"
              onClick={() => { setCurrentYear(2026); setCurrentMonth(10); setSelectedDate('2026-10-01'); }}
              data-testid="btn-jump-october-2026"
              className="bg-white text-amber-900 hover:bg-amber-50 active:bg-amber-100 font-bold text-xs px-2.5 sm:px-3 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Outubro 2026
            </button>

            {/* Prev Month */}
            <button
              type="button"
              onClick={handlePrevMonth}
              data-testid="btn-prev-month"
              aria-label="Mês Anterior"
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Month */}
            <button
              type="button"
              onClick={handleNextMonth}
              data-testid="btn-next-month"
              aria-label="Próximo Mês"
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="p-3 sm:p-6">
          
          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
            {WEEKDAYS.map((wd, index) => (
              <div 
                key={wd}
                className={`py-2 text-xs sm:text-sm font-bold tracking-wider uppercase ${
                  index === 0 ? 'text-amber-700 bg-amber-50 rounded-lg' : 'text-stone-500'
                }`}
              >
                {wd}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2" data-testid="calendar-days-grid">
            {calendarGrid.map((item, idx) => {
              if (!item.isCurrentMonth) {
                return (
                  <div key={`empty-${idx}`} className="min-h-[64px] sm:min-h-[85px] p-1 sm:p-2 bg-stone-50/50 rounded-xl opacity-30 cursor-not-allowed select-none">
                    <span className="text-xs text-stone-400 font-medium">{item.dayNumber}</span>
                  </div>
                );
              }

              const isSelected = selectedDate === item.dateStr;
              const hasEvents = item.events && item.events.length > 0;
              const isToday = item.isToday;

              return (
                <button
                  type="button"
                  key={item.dateStr}
                  onClick={() => handleDayClick(item)}
                  data-testid={`calendar-day-${item.dateStr}`}
                  aria-label={`Dia ${item.dayNumber} de ${MONTH_NAMES[currentMonth - 1]}`}
                  className={`min-h-[64px] sm:min-h-[85px] p-1 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                    isToday
                      ? isSelected ? 'border-emerald-600 bg-emerald-100/80 shadow-md ring-2 ring-emerald-500' : 'border-emerald-500 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-400/60 hover:bg-emerald-100/60'
                      : isSelected ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-400/50'
                      : item.isCancelledDay ? 'border-stone-200 bg-stone-100/80 hover:bg-stone-200/80'
                      : item.hasSpecialFestival ? 'border-orange-300 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-400'
                      : item.isSunday && item.hasSundayFestival ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50'
                      : 'border-stone-100 hover:border-amber-200 hover:bg-stone-50/80 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                      <span className={`text-xs sm:text-sm font-extrabold ${
                        isToday
                          ? 'text-emerald-950 font-black'
                          : isSelected
                          ? 'text-amber-950 font-black'
                          : item.isCancelledDay
                          ? 'text-stone-500 font-bold'
                          : item.hasSpecialFestival
                          ? 'text-orange-950 font-black'
                          : item.isSunday && item.hasSundayFestival
                          ? 'text-amber-800'
                          : 'text-stone-700'
                      }`}>
                        {item.dayNumber}
                      </span>
                      {isToday && (
                        <span 
                          data-testid="badge-today"
                          className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs leading-tight"
                        >
                          Hoje
                        </span>
                      )}
                    </div>

                    {/* Indicator Icon / Dot */}
                    {item.hasSpecialFestival && (
                      <span 
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          item.events?.some(e => e.isBirthDateOfGod)
                            ? 'bg-purple-500'
                            : 'bg-orange-500 animate-pulse'
                        }`}
                        title={item.events?.some(e => e.isBirthDateOfGod) ? "Data Sagrada (Nascimento de Forma de Deus)" : "Evento Especial"} 
                      />
                    )}
                    {!item.hasSpecialFestival && item.isSunday && item.hasSundayFestival && (
                      <Sun className="w-3 h-3 text-amber-500 shrink-0" />
                    )}
                  </div>

                  {/* Festival / Sacred Date Mini Badges */}
                  <div className="w-full mt-1 space-y-0.5 overflow-hidden">
                    {hasEvents && item.events.map((evt) => {
                      if (evt.isRecurringSunday) {
                        return (
                          <span 
                            key={evt.id}
                            className="block text-[9px] sm:text-[10px] leading-tight font-bold text-amber-900 bg-amber-100/90 px-1 py-0.5 rounded truncate"
                          >
                            Festival de Domingo
                          </span>
                        );
                      }
                      if (evt.isCancelled) {
                        return (
                          <span 
                            key={evt.id}
                            className="block text-[9px] sm:text-[10px] leading-tight font-bold text-stone-700 bg-stone-200/90 px-1 py-0.5 rounded truncate border border-stone-300"
                          >
                            {evt.shortBadge || 'Templo Fechado'}
                          </span>
                        );
                      }
                      if (evt.isBirthDateOfGod) {
                        return (
                          <span 
                            key={evt.id}
                            className="block text-[9px] sm:text-[10px] leading-tight font-bold text-purple-900 bg-purple-100/95 px-1 py-0.5 rounded truncate border border-purple-200"
                          >
                            {evt.shortBadge || (evt.title.length > 18 ? evt.title.substring(0, 18) + '...' : evt.title)}
                          </span>
                        );
                      }
                      return (
                        <span 
                          key={evt.id}
                          className="block text-[9px] sm:text-[10px] leading-tight font-black text-orange-900 bg-orange-200/90 px-1 py-0.5 rounded truncate shadow-2xs"
                        >
                          {evt.shortBadge || (evt.title.length > 18 ? evt.title.substring(0, 18) + '...' : evt.title)}
                        </span>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Date Details Drawer */}
        <div className="bg-amber-50/50 border-t border-amber-200/70 p-4 sm:p-6" data-testid="selected-date-details">
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                Programação para {selectedDate ? (() => {
                  const [y, m, d] = selectedDate.split('-');
                  return `${d} de ${MONTH_NAMES[Number(m) - 1]} de ${y}`;
                })() : 'Data selecionada'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {selectedDayEvents.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setModalEvents(selectedDayEvents);
                    setModalDateStr(selectedDate);
                    setIsModalOpen(true);
                  }}
                  data-testid="btn-open-day-modal"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 active:bg-amber-400 text-amber-950 text-xs font-black transition-colors cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ver em Popup</span>
                </button>
              )}
              <span className="text-xs text-stone-500 font-semibold">
                {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'evento' : 'eventos'}
              </span>
            </div>
          </div>

          {selectedDayEvents.length === 0 ? (
            <div className="p-4 rounded-2xl bg-white border border-dashed border-stone-200 text-center text-stone-500 text-xs sm:text-sm">
              Nenhum festival específico agendado para esta data. O templo está aberto para visitas e meditação. Consulte nossa equipe pelo WhatsApp!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDayEvents.map((evt) => (
                <div 
                  key={evt.id}
                  data-testid={`selected-event-card-${evt.id}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        evt.isCancelled
                          ? 'bg-stone-200 text-stone-800'
                          : evt.isBirthDateOfGod
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {evt.isCancelled ? <CalendarIcon className="w-3 h-3 text-stone-600" /> : evt.isBirthDateOfGod ? <Heart className="w-3 h-3 text-purple-700" /> : evt.isRecurringSunday ? <Sun className="w-3 h-3 text-amber-600" /> : <Crown className="w-3 h-3 text-orange-600" />}
                        {evt.categoryLabel}
                      </span>
                      <span className="text-xs text-stone-500 font-bold">{evt.period}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-stone-900 leading-tight mb-1">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-amber-800 font-medium mb-3">
                      {evt.subtitle}
                    </p>

                    <div className="space-y-1 mb-3 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span><strong>Horário:</strong> {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span><strong>Local:</strong> {evt.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setModalEvents([evt]);
                        setModalDateStr(selectedDate);
                        setIsModalOpen(true);
                      }}
                      data-testid={`btn-card-popup-${evt.id}`}
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <span>Detalhes</span>
                    </button>

                    <a
                      href={`${TEMPLE_DATA.contact.whatsappUrl}&text=${encodeURIComponent(
                        evt.isBirthDateOfGod || evt.noPublicEventOnDate || evt.isCancelled
                          ? `Olá! Vi no calendário a data de "${evt.title}" (${evt.period}) e gostaria de tirar dúvidas com o templo.`
                          : `Olá! Gostaria de confirmar informações e tirar dúvidas sobre a programação: ${evt.title} (${evt.period}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`btn-calendar-day-whatsapp-${evt.id}`}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3 h-3 opacity-75" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Event Detail Modal Popup */}
      <EventDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateStr={modalDateStr}
        events={modalEvents}
      />

    </section>
  );
};
