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
    subtitle: 'Celebração sagrada do fundador-acharya da ISKCON',
    category: 'gurus',
    categoryLabel: 'Aparição Sagrada',
    date: '2026-09-05',
    period: '05 de Setembro de 2026 (Dia seguinte a Janmastami)',
    time: 'Programação Especial durante o dia',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Um dos dias mais auspiciosos do ano! Celebramos o advento de Sua Divina Graça A.C. Bhaktivedanta Swami Prabhupada com leitura de oferendas de gratidão, glorificações, abhishek (banho sagrado de Suas Murti), kirtan e banquete suntuoso.',
    activities: [
      'Leitura de homenagens e oferendas de gratidão dos devotos',
      'Abhisheka cerimonial com flores, água sagrada e óleos',
      'Apresentação sobre a vida e feitos transcendentais de Prabhupada',
      'Maha-kirtan e banquete real de oferendas (Feast)'
    ],
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  {
    id: 'sri-krishna-janmastami',
    title: 'Sri Krishna Janmastami',
    subtitle: 'O maior festival do calendário Vaisnava: Advento de Sri Krishna',
    category: 'vaisnava',
    categoryLabel: 'Grande Festival',
    date: '2026-09-04',
    period: '04 de Setembro de 2026',
    time: 'Manhã, Tarde e Grande Vigília Noturna',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração transcendental do aparecimento do Senhor Krishna na Terra há 5.000 anos. O templo é ricamente decorado com centenas de flores, incenso, música ininterrupta, peças teatrais e banho cerimonial das Deidades.',
    activities: [
      'Maha-Abhisheka das Deidades com leite, mel e pétalas',
      'Kirtan ininterrupto de 12 horas com devotos e convidados',
      'Discurso sobre os doces passatempos de Krishna em Vrindavana',
      'Meia-noite sagrada: Maha-arati e banquete vegetariano'
    ],
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
  },
  {
    id: 'radhastami',
    title: 'Radhastami',
    subtitle: 'Aparecimento de Srimati Radharani (A personificação da devoção)',
    category: 'vaisnava',
    categoryLabel: 'Festival Vaisnava',
    date: '2026-09-19',
    period: '19 de Setembro de 2026',
    time: 'A partir das 11h00 até as 14h00',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração do auspicioso aparecimento de Srimati Radharani, a suprema potência de prazer e a mais amada devota de Krishna. Dia de imensa doçura, kirtans sagrados, abhishek e banquete especial.',
    activities: [
      'Canto meditativo dos Santos Nomes e glorificações a Sri Radha',
      'Abhisheka festivo das Deidades',
      'Palestra sobre o amor puro devocional (Prema-bhakti)',
      'Banquete sagrado suntuoso oferecido ao meio-dia'
    ],
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
  },
  {
    id: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Aparecimento de Sri Chaitanya Mahaprabhu (O Pai do Sankirtan)',
    category: 'vaisnava',
    categoryLabel: 'Grande Festival',
    date: '2026-03-03',
    period: '03 de Março de 2026 (Lua Cheia de Phalguna)',
    time: 'A partir das 16h00 até o anoitecer',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração do aparecimento dourado de Sri Chaitanya Mahaprabhu em Navadvipa, quem introduziu o canto congregacional do Maha-Mantra Hare Krishna por todo o mundo. Festival com cores, alegria contagiante e banquete.',
    activities: [
      'Abhisheka de Gaura-Nitai com cantos dos Santos Nomes',
      'Palestra sobre a misericórdia incomparável do avatar dourado',
      'Kirtan extático com instrumentos tradicionais',
      'Banquete festivo servido após o nascimento da lua cheia'
    ],
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
  },
  {
    id: 'rama-navami',
    title: 'Rama Navami',
    subtitle: 'Aparecimento do Senhor Ramacandra (O Rei Ideal e Nobre)',
    category: 'vaisnava',
    categoryLabel: 'Festival Vaisnava',
    date: '2026-03-27',
    period: '27 de Março de 2026',
    time: 'A partir das 17h00',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração do advento do Senhor Ramacandra, o exemplo supremo de honra, lealdade, verdade e liderança compassiva narrado no épico transcendental Ramayana.',
    activities: [
      'Leitura de passagens heróicas do Ramayana',
      'Cantos especiais de orações a Sri Rama e Lakshmana',
      'Banquete sagrado preparado em honra ao Senhor Rama'
    ],
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
  },
  {
    id: 'nrisimha-caturdasi',
    title: 'Nrisimha Caturdasi',
    subtitle: 'Aparecimento do Senhor Nrisimhadeva (O Protetor dos Devotos)',
    category: 'vaisnava',
    categoryLabel: 'Festival Vaisnava',
    date: '2026-05-01',
    period: '01 de Maio de 2026',
    time: 'Ao entardecer (Crepúsculo sagrado)',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração do aparecimento de Nrisimhadeva no entardecer para salvar Seu grande devoto Prahlada Maharaja. Celebração emocionante com kirtan fervoroso e preces sagradas de proteção.',
    activities: [
      'Canto das orações do Sri Nrisimha Pranama e orações védicas',
      'Abhisheka cerimonial no entardecer',
      'Palestra sobre a firmeza na fé de Prahlada Maharaja',
      'Banquete especial de quebra do jejum'
    ],
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'govardhana-puja-diwali',
    title: 'Govardhana Puja & Festival de Diwali',
    subtitle: 'Festa das Luzes e adoração da Colina Sagrada de Govardhana',
    category: 'vaisnava',
    categoryLabel: 'Grande Celebração',
    dates: ['2026-11-08', '2026-11-09', '2026-11-10'],
    period: '08 a 10 de Novembro de 2026',
    time: 'A partir das 17h00',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração mágica com o templo iluminado por centenas de lâmpadas de ghee (Diwali) e a construção da réplica doce da sagrada Colina de Govardhana (Annakuta) decorada com oferendas vegetarianas.',
    activities: [
      'Iluminação do templo com lamparinas de ghee tradicionais',
      'Circumbulação e oferenda de incenso e doces à Colina de Govardhana',
      'Kirtan com orações do Damodarashtaka no mês sagrado de Kartika',
      'Distribuição suntuosa do banquete da Colina de Doces'
    ],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'gita-jayanti',
    title: 'Gita Jayanti',
    subtitle: 'O dia em que Krishna falou o sagrado Bhagavad-gītā',
    category: 'vaisnava',
    categoryLabel: 'Celebração Védica',
    date: '2026-12-20',
    period: '20 de Dezembro de 2026',
    time: 'Manhã e Tarde (10h00 às 14h00)',
    location: 'Templo ISKCON Ceará (Presencial)',
    description: 'Celebração do dia sagrado no campo de batalha de Kurukshetra em que o Senhor Krishna revelou os 700 versos do Bhagavad-gītā para Arjuna, trazendo luz e guia atemporal para a humanidade.',
    activities: [
      'Recitação coletiva dos versos do Bhagavad-gītā em sânscrito',
      'Cerimônia de fogo sagrado védico (Yajna)',
      'Distribuição e incentivo à leitura do Bhagavad-gītā Como Ele É',
      'Prasadam sagrado para todos os participantes'
    ],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
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
