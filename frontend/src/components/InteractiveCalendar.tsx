import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  Crown
} from 'lucide-react';
import { TempleEvent, getEventsForDate, EventCategory } from '../data/eventsData';
import { TEMPLE_DATA } from '../data/templeInfo';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface InteractiveCalendarProps {
  selectedCategory?: EventCategory;
  onSelectEvent?: (event: TempleEvent) => void;
}

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  selectedCategory = 'todos'
}) => {
  // Default to October 2026 where Chandramukha Swami visits, or September 2026
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(10); // 1-12 (10 = Outubro)
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-01');

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  // Calendar days grid computation
  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sun
    const totalDays = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthTotalDays = new Date(currentYear, currentMonth - 1, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNumber: prevMonthTotalDays - i,
        isCurrentMonth: false,
        dateStr: ''
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const padM = String(currentMonth).padStart(2, '0');
      const padD = String(d).padStart(2, '0');
      const dateStr = `${currentYear}-${padM}-${padD}`;
      const allDayEvents = getEventsForDate(dateStr);

      const filteredEvents = selectedCategory === 'todos'
        ? allDayEvents
        : allDayEvents.filter(e => e.category === selectedCategory);

      days.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateStr,
        isSunday: new Date(currentYear, currentMonth - 1, d).getDay() === 0,
        events: filteredEvents,
        hasSpecialFestival: filteredEvents.some(e => !e.isRecurringSunday),
        hasSundayFestival: filteredEvents.some(e => e.isRecurringSunday)
      });
    }

    // Next month padding to fill row
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let j = 1; j <= remainingCells; j++) {
      days.push({
        dayNumber: j,
        isCurrentMonth: false,
        dateStr: ''
      });
    }

    return days;
  }, [currentYear, currentMonth, selectedCategory]);

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
          <div className="flex items-center gap-2">
            
            {/* Year Selector */}
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              data-testid="calendar-select-year"
              aria-label="Selecionar Ano"
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-xl border border-white/30 backdrop-blur-md focus:outline-none cursor-pointer"
            >
              <option value={2026} className="text-stone-900">2026</option>
              <option value={2027} className="text-stone-900">2027</option>
            </select>

            {/* Quick jump to October (Chandramukha Swami visit) */}
            <button
              type="button"
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(10);
                setSelectedDate('2026-10-01');
              }}
              data-testid="btn-jump-october-2026"
              className="bg-white text-amber-900 hover:bg-amber-50 active:bg-amber-100 font-bold text-xs px-3 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
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
                  <div 
                    key={`empty-${idx}`} 
                    className="min-h-[64px] sm:min-h-[85px] p-1 sm:p-2 bg-stone-50/50 rounded-xl opacity-30 cursor-not-allowed select-none"
                  >
                    <span className="text-xs text-stone-400 font-medium">{item.dayNumber}</span>
                  </div>
                );
              }

              const isSelected = selectedDate === item.dateStr;
              const hasEvents = item.events && item.events.length > 0;

              return (
                <button
                  type="button"
                  key={item.dateStr}
                  onClick={() => setSelectedDate(item.dateStr)}
                  data-testid={`calendar-day-${item.dateStr}`}
                  aria-label={`Dia ${item.dayNumber} de ${MONTH_NAMES[currentMonth - 1]}`}
                  className={`min-h-[64px] sm:min-h-[85px] p-1 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-400/50'
                      : item.hasSpecialFestival
                      ? 'border-orange-300 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-400'
                      : item.isSunday
                      ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50'
                      : 'border-stone-100 hover:border-amber-200 hover:bg-stone-50/80 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs sm:text-sm font-extrabold ${
                      isSelected
                        ? 'text-amber-950 font-black'
                        : item.hasSpecialFestival
                        ? 'text-orange-950 font-black'
                        : item.isSunday
                        ? 'text-amber-800'
                        : 'text-stone-700'
                    }`}>
                      {item.dayNumber}
                    </span>

                    {/* Indicator Icon / Dot */}
                    {item.hasSpecialFestival && (
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shrink-0" title="Festival Especial" />
                    )}
                    {!item.hasSpecialFestival && item.isSunday && (
                      <Sun className="w-3 h-3 text-amber-500 shrink-0" />
                    )}
                  </div>

                  {/* Festival Mini Badges */}
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
                      return (
                        <span 
                          key={evt.id}
                          className="block text-[9px] sm:text-[10px] leading-tight font-black text-orange-900 bg-orange-200/90 px-1 py-0.5 rounded truncate shadow-2xs"
                        >
                          {evt.title.length > 18 ? evt.title.substring(0, 18) + '...' : evt.title}
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
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                Programação para {selectedDate ? (() => {
                  const [y, m, d] = selectedDate.split('-');
                  return `${d} de ${MONTH_NAMES[Number(m) - 1]} de ${y}`;
                })() : 'Data selecionada'}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-semibold">
              {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'evento' : 'eventos'}
            </span>
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
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                        {evt.isRecurringSunday ? <Sun className="w-3 h-3 text-amber-600" /> : <Crown className="w-3 h-3 text-orange-600" />}
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

                  <a
                    href={`${TEMPLE_DATA.contact.whatsappUrl}&text=${encodeURIComponent(
                      `Olá! Gostaria de confirmar informações e tirar dúvidas sobre o evento: ${evt.title} (${evt.period}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`btn-calendar-day-whatsapp-${evt.id}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer w-full mt-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Tirar Dúvidas sobre este Dia no WhatsApp</span>
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
