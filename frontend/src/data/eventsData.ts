export type EventCategory = 'todos' | 'domingo' | 'gurus' | 'vaisnava';

export interface TempleEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'domingo' | 'gurus' | 'vaisnava';
  categoryLabel: string;
  date?: string; // YYYY-MM-DD
  dates?: string[]; // Array of YYYY-MM-DD for multi-day events
  isRecurringSunday?: boolean;
  period: string;
  time: string;
  location: string;
  description: string;
  activities: string[];
  badgeColor: string;
  isRecurring?: boolean;
  shortBadge?: string;
  isCancelled?: boolean;
  isBirthDateOfGod?: boolean;
  noPublicEventOnDate?: boolean;
}

export const TEMPLE_EVENTS: TempleEvent[] = [
  {
    id: 'festival-de-domingo-semanal',
    title: 'Festival Tradicional de Domingo',
    subtitle: 'O encontro espiritual mais aguardado de toda a semana',
    category: 'domingo',
    categoryLabel: 'Festival Semanal',
    isRecurringSunday: true,
    period: 'Todos os Domingos',
    time: '10h00 às 13h00',
    location: 'Templo ISKCON Ceará (Aquiraz - Grande Fortaleza)',
    description: 'Nosso tradicional encontro aberto ao público e famílias com música devocional ao vivo (kirtan meditativo e festivo), palestra sobre filosofia védica e o consagrado banquete puramente vegetariano gratuito.',
    activities: [
      'Canto meditativo (Bhajana) com harmônio e mridanga',
      'Palestra temática do Bhagavad-gītā com aplicação prática',
      'Kirtan festivo com dança e celebração coletiva',
      'Banquete vegetariano sagrado (Prasadam) gratuito'
    ],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    isRecurring: true
  },
  {
    id: 'chegada-chandramukha-swami-2026',
    title: 'Chegada de Chandramukha Swami (Sem Programação Pública)',
    subtitle: 'Chegada do Maharaj ao Ceará • Sem atividades públicas com ele neste dia',
    category: 'gurus',
    categoryLabel: 'Visita de Guru',
    date: '2026-10-01',
    period: '01 de Outubro de 2026 (Quinta-feira)',
    time: 'Chegada ao Ceará (Sem programação aberta)',
    location: 'Fortaleza / Aquiraz - CE',
    description: 'Sua Santidade Chandramukha Swami desembarca no Ceará nesta quinta-feira. Informamos a todos os devotos e amigos que neste primeiro dia não haverá programação aberta ao público com o Maharaj, sendo um dia reservado exclusivamente para acolhimento e descanso da viagem. As programações oficiais abertas ao público ocorrerão nos dias 02 e 03 de Outubro.',
    activities: [
      'Chegada e acolhimento fraterno de Chandramukha Swami no Ceará',
      'Dia reservado: sem palestras ou programações públicas com o Maharaj',
      'Programações oficiais abertas ao público nos dias 02/10 (Clara Luz) e 03/10 (Templo Aquiraz)'
    ],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    shortBadge: 'Chegada do Swami'
  },
  {
    id: 'chandramukha-swami-espaco-clara-luz-2026',
    title: 'Chandramukha Swami no Espaço Clara Luz',
    subtitle: 'Palestra especial de Bhakti-yoga e kirtan meditativo com o Maharaj',
    category: 'gurus',
    categoryLabel: 'Espaço Clara Luz',
    date: '2026-10-02',
    period: '02 de Outubro de 2026 (Sexta-feira)',
    time: '19h00',
    location: 'Espaço Clara Luz (Fortaleza - CE)',
    description: 'Encontro espiritual imperdível com Sua Santidade Chandramukha Swami no Espaço Clara Luz em Fortaleza. Uma noite acolhedora com canto meditativo de mantras (kirtan), reflexões profundas sobre filosofia védica e diálogo fraterno com perguntas e respostas.',
    activities: [
      '19h00: Abertura e canto meditativo de mantras (Bhajanas e Kirtan)',
      'Palestra especial de sabedoria védica com Chandramukha Swami',
      'Momento de perguntas, respostas e convívio espiritual'
    ],
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    shortBadge: 'Clara Luz 19h'
  },
  {
    id: 'chandramukha-swami-templo-aquiraz-2026',
    title: 'Chandramukha Swami no Templo de Aquiraz',
    subtitle: 'Grande celebração presencial com aula magna, kirtan festivo e banquete sagrado',
    category: 'gurus',
    categoryLabel: 'Templo de Aquiraz',
    date: '2026-10-03',
    period: '03 de Outubro de 2026 (Sábado)',
    time: '17h00',
    location: 'Templo ISKCON Ceará (Jacundá, Aquiraz / Grande Fortaleza)',
    description: 'Grande celebração com a presença ilustre de Sua Santidade Chandramukha Swami no Templo ISKCON Ceará em Aquiraz! Tarde inesquecível de sábado repleta de música sagrada ao vivo, palestra inspiradora sobre os ensinamentos védicos, associação devocional e a consagração do banquete puramente vegetariano Prasadam.',
    activities: [
      '17h00: Início com kirtan festivo e acolhimento dos devotos e visitantes',
      'Aula magna e discurso filosófico com Chandramukha Swami',
      'Cerimônia de arati com música devocional ao vivo',
      'Consagração do tradicional banquete vegetariano sagrado (Prasadam)'
    ],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    shortBadge: 'Templo Aquiraz 17h'
  },
  {
    id: 'templo-fechado-2026-10-04',
    title: 'Sem Programação no Templo (Templo Fechado)',
    subtitle: 'Aviso Importante: Neste domingo não haverá o tradicional Festival de Domingo',
    category: 'domingo',
    categoryLabel: 'Aviso do Templo',
    date: '2026-10-04',
    period: '04 de Outubro de 2026 (Domingo)',
    time: 'Templo Fechado',
    location: 'Templo ISKCON Ceará (Aquiraz - Grande Fortaleza)',
    description: 'Informamos a toda a congregação, amigos e visitantes que no domingo, 04 de outubro de 2026, não haverá programação presencial no templo (templo fechado). O tradicional Festival de Domingo presencial retornará normalmente no domingo seguinte (11/10/2026). Agradecemos a compreensão e o carinho de todos!',
    activities: [
      'Templo fechado para atividades públicas e visitas neste dia',
      'Não haverá o tradicional Festival de Domingo presencial',
      'Retorno das atividades normais no domingo seguinte (11 de Outubro)'
    ],
    badgeColor: 'bg-stone-200 text-stone-800 border-stone-400',
    shortBadge: 'Templo Fechado',
    isCancelled: true
  },
  {
    id: 'vyasa-puja-srila-prabhupada',
    title: 'Aparecimento de Srila Prabhupada (Vyasa-puja)',
    subtitle: 'Aparição sagrada do fundador-acharya da ISKCON',
    category: 'gurus',
    categoryLabel: 'Aparição Sagrada',
    date: '2026-09-05',
    period: '05 de Setembro de 2026 (Dia seguinte a Janmastami)',
    time: 'Data sagrada no calendário (Sem festival aberto neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Data sagrada que recorda o advento de Sua Divina Graça A.C. Bhaktivedanta Swami Prabhupada, mestre espiritual e fundador da ISKCON. Informamos que o templo não realiza festival aberto neste mesmo dia exato. Nossas homenagens e comemorações comunitárias acontecem nos Festivais de Domingo.',
    activities: [
      'Data de homenagem ao mestre espiritual fundador da ISKCON',
      'Dia dedicado à leitura, oração pessoal e gratidão aos ensinamentos',
      'Atenção: Não há festival aberto no templo nesta data exata',
      'Homenagens comunitárias ocorrem nos Festivais de Domingo'
    ],
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    shortBadge: 'Srila Prabhupada',
    noPublicEventOnDate: true
  },
  {
    id: 'sri-krishna-janmastami',
    title: 'Sri Krishna Janmastami',
    subtitle: 'Data do nascimento de uma das formas de Deus: Sri Krishna',
    category: 'vaisnava',
    categoryLabel: 'Nascimento de Forma de Deus',
    date: '2026-09-04',
    period: '04 de Setembro de 2026',
    time: 'Data no calendário (Sem festival neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Esta data marca o nascimento de uma das formas de Deus: Sri Krishna, a Suprema Personalidade de Deus. Informamos que o templo não realiza festival nem comemoração aberta neste mesmo dia específico no templo — trata-se do registro da data sagrada no calendário devocional para oração e meditação pessoal. As comemorações comunitárias acontecem nos nossos Festivais de Domingo.',
    activities: [
      'Data do nascimento de uma das formas de Deus (Sri Krishna)',
      'Dia dedicado à meditação pessoal, leitura védica e orações',
      'Atenção: Não há festival presencial no templo nesta data exata',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    shortBadge: 'Nasc. Sri Krishna',
    isBirthDateOfGod: true,
    noPublicEventOnDate: true
  },
  {
    id: 'radhastami',
    title: 'Radhastami',
    subtitle: 'Data do nascimento de Srimati Radharani',
    category: 'vaisnava',
    categoryLabel: 'Data Sagrada Vaisnava',
    date: '2026-09-18',
    period: '18 de Setembro de 2026',
    time: 'Data no calendário (Sem festival neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Esta data sagrada marca o nascimento de Srimati Radharani, a contraparte e eterna associada de Sri Krishna, personificando a devoção e o amor puro a Deus. Informamos que o templo não realiza comemoração nem festival aberto neste mesmo dia específico. As celebrações com a congregação acontecem nos nossos Festivais de Domingo.',
    activities: [
      'Data do nascimento sagrado de Srimati Radharani',
      'Dia propício para recolhimento, orações e canto dos Santos Nomes',
      'Atenção: Não há festival presencial no templo nesta data exata',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    shortBadge: 'Nasc. Radharani',
    isBirthDateOfGod: true,
    noPublicEventOnDate: true
  },
  {
    id: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Data do nascimento de uma das formas de Deus: Sri Chaitanya Mahaprabhu',
    category: 'vaisnava',
    categoryLabel: 'Nascimento de Forma de Deus',
    date: '2026-03-03',
    period: '03 de Março de 2026 (Lua Cheia de Phalguna)',
    time: 'Data no calendário (Sem festival neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Esta data marca o nascimento de uma das formas de Deus: Sri Chaitanya Mahaprabhu, o avatar dourado que introduziu o canto congregacional do Maha-Mantra Hare Krishna por todo o mundo. O templo não realiza festival nem comemoração aberta neste mesmo dia exato. As festividades comunitárias com banquete acontecem nos Festivais de Domingo.',
    activities: [
      'Data do nascimento de uma das formas de Deus (Sri Chaitanya Mahaprabhu)',
      'Dia sagrado no calendário védico para oração, reflexão e estudo espiritual',
      'Atenção: Não há festival presencial no templo nesta data exata',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    shortBadge: 'Nasc. Chaitanya',
    isBirthDateOfGod: true,
    noPublicEventOnDate: true
  },
  {
    id: 'rama-navami',
    title: 'Rama Navami',
    subtitle: 'Data do nascimento de uma das formas de Deus: Senhor Ramacandra',
    category: 'vaisnava',
    categoryLabel: 'Nascimento de Forma de Deus',
    date: '2026-03-27',
    period: '27 de Março de 2026',
    time: 'Data no calendário (Sem festival neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Esta data marca o nascimento de uma das formas de Deus: o Senhor Ramacandra, o nobre avatar que personifica a honra, retidão e verdade. O templo não realiza comemoração nem festival aberto neste mesmo dia no templo. As comemorações e festejos comunitários ocorrem durante os Festivais de Domingo.',
    activities: [
      'Data do nascimento de uma das formas de Deus (Senhor Ramacandra)',
      'Dia sagrado para contemplação dos nobres ensinamentos do Ramayana',
      'Atenção: Não há festival presencial no templo nesta data exata',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    shortBadge: 'Nasc. Senhor Rama',
    isBirthDateOfGod: true,
    noPublicEventOnDate: true
  },
  {
    id: 'nrisimha-caturdasi',
    title: 'Nrisimha Caturdasi',
    subtitle: 'Data do nascimento de uma das formas de Deus: Senhor Nrisimhadeva',
    category: 'vaisnava',
    categoryLabel: 'Nascimento de Forma de Deus',
    date: '2026-05-01',
    period: '01 de Maio de 2026',
    time: 'Data no calendário (Sem festival neste dia)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Esta data marca o nascimento de uma das formas de Deus: o Senhor Nrisimhadeva, a encarnação divina que protege os devotos de todos os obstáculos espirituais. O templo não realiza festival nem comemoração aberta neste mesmo dia específico. As celebrações com a congregação acontecem nos Festivais de Domingo.',
    activities: [
      'Data do nascimento de uma das formas de Deus (Senhor Nrisimhadeva)',
      'Dia sagrado para orações pessoais de proteção espiritual e paz interior',
      'Atenção: Não há festival presencial no templo nesta data exata',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    shortBadge: 'Nasc. Nrisimhadeva',
    isBirthDateOfGod: true,
    noPublicEventOnDate: true
  },
  {
    id: 'govardhana-puja-diwali',
    title: 'Govardhana Puja & Festival de Diwali',
    subtitle: 'Datas sagradas de Diwali e reverência à Colina de Govardhana',
    category: 'vaisnava',
    categoryLabel: 'Data Sagrada Vaisnava',
    dates: ['2026-11-08', '2026-11-09', '2026-11-10'],
    period: '08 a 10 de Novembro de 2026',
    time: 'Data no calendário (Celebrações no Festival de Domingo)',
    location: 'Calendário devocional (Celebrações nos Festivais de Domingo)',
    description: 'Datas sagradas do calendário védico tradicional. O templo realiza celebrações comunitárias durante os tradicionais Festivais de Domingo do período.',
    activities: [
      'Datas sagradas no calendário védico tradicional',
      'Dias dedicados a orações devocionais e meditação em família',
      'Celebrações comunitárias são realizadas nos Festivais de Domingo'
    ],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    shortBadge: 'Govardhana & Diwali',
    noPublicEventOnDate: true
  },
  {
    id: 'gita-jayanti',
    title: 'Gita Jayanti',
    subtitle: 'Data sagrada em que Krishna falou o Bhagavad-gītā',
    category: 'vaisnava',
    categoryLabel: 'Data Sagrada Védica',
    date: '2026-12-20',
    period: '20 de Dezembro de 2026',
    time: '10h00 às 13h00 (Durante o Festival de Domingo)',
    location: 'Templo ISKCON Ceará (Durante o Festival de Domingo)',
    description: 'Data sagrada que recorda o diálogo transcendental do Bhagavad-gītā revelado por Krishna a Arjuna. Como coincide com um domingo (20/12), as homenagens e leituras ocorrem durante o tradicional Festival de Domingo.',
    activities: [
      'Celebração do diálogo milenar do Bhagavad-gītā Como Ele É',
      'Leituras e palestras especiais durante o Festival de Domingo de 20/12',
      'Banquete sagrado vegetariano gratuito no domingo'
    ],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    shortBadge: 'Gita Jayanti'
  }
];

/**
 * Lista de domingos específicos (formato YYYY-MM-DD) em que não haverá o festival tradicional de domingo
 * (ex: templo fechado para descanso ou reformas).
 */
export const SUNDAYS_WITHOUT_FESTIVAL: string[] = ['2026-10-04'];

/**
 * Retorna os eventos associados a uma data específica no formato YYYY-MM-DD.
 * Inclui festivais com data exata e o Festival de Domingo caso a data caia num domingo
 * (exceto se a data constar na lista de domingos cancelados/sem templo).
 */
export const getEventsForDate = (dateStr: string): TempleEvent[] => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const isSunday = targetDate.getDay() === 0;

  const matched: TempleEvent[] = [];

  TEMPLE_EVENTS.forEach((evt) => {
    if (evt.date === dateStr || (evt.dates && evt.dates.includes(dateStr))) {
      matched.push(evt);
    } else if (isSunday && evt.isRecurringSunday && !SUNDAYS_WITHOUT_FESTIVAL.includes(dateStr)) {
      matched.push(evt);
    }
  });

  return matched;
};

/**
 * Retorna todos os eventos cronológicos de um determinado mês e ano.
 * month: 1 a 12.
 */
export const getMonthEvents = (year: number, month: number): { dateStr: string; day: number; event: TempleEvent }[] => {
  const results: { dateStr: string; day: number; event: TempleEvent }[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const padDay = String(d).padStart(2, '0');
    const padMonth = String(month).padStart(2, '0');
    const dateStr = `${year}-${padMonth}-${padDay}`;
    const dayEvents = getEventsForDate(dateStr);

    dayEvents.forEach((evt) => {
      // Evita duplicar o mesmo evento no mesmo dia
      if (!results.some(r => r.dateStr === dateStr && r.event.id === evt.id)) {
        results.push({ dateStr, day: d, event: evt });
      }
    });
  }

  return results;
};
