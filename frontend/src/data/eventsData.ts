export type EventCategory = 'todos' | 'domingo' | 'gurus' | 'vaisnava';

export interface TempleEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'domingo' | 'gurus' | 'vaisnava';
  categoryLabel: string;
  period: string;
  time: string;
  location: string;
  description: string;
  activities: string[];
  badgeColor: string;
  isRecurring?: boolean;
}

export const TEMPLE_EVENTS: TempleEvent[] = [
  {
    id: 'festival-de-domingo-semanal',
    title: 'Festival Tradicional de Domingo',
    subtitle: 'O encontro espiritual mais aguardado de toda a semana',
    category: 'domingo',
    categoryLabel: 'Festival Semanal',
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
    id: 'vyasa-puja-srila-prabhupada',
    title: 'Aparecimento de Srila Prabhupada (Vyasa-puja)',
    subtitle: 'Celebração sagrada do fundador-acharya da ISKCON',
    category: 'gurus',
    categoryLabel: 'Aparição Sagrada',
    period: 'Agosto / Setembro (Dia seguinte a Janmastami)',
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
    period: 'Agosto / Setembro (Data móvel védica)',
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
    id: 'gaura-purnima',
    title: 'Gaura Purnima',
    subtitle: 'Aparecimento de Sri Chaitanya Mahaprabhu (O Pai do Sankirtan)',
    category: 'vaisnava',
    categoryLabel: 'Grande Festival',
    period: 'Fevereiro / Março (Noite de Lua Cheia de Phalguna)',
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
    id: 'visitas-gurus-mestres',
    title: 'Visitas Especiais de Mestres Espirituais e Gurus',
    subtitle: 'Retiros, palestras exclusivas e seminários filosóficos',
    category: 'gurus',
    categoryLabel: 'Eventos Especiais',
    period: 'Ao longo do ano (Datas anunciadas nos grupos exclusivos)',
    time: 'Manhã e Noite',
    location: 'Templo ISKCON Ceará e Centros de Estudo',
    description: 'O templo recebe periodicamente ilustres gurus da ISKCON, sannyasis e mestres espirituais de renome nacional e internacional para finais de semana imersivos, iniciações e aulas de aprofundamento das escrituras.',
    activities: [
      'Aulas matinais do Srimad-Bhagavatam com perguntas e respostas',
      'Seminários temáticos de japa, meditação e desenvolvimento pessoal',
      'Kirtans especiais conduzidos pelos gurus visitantes',
      'Associação pessoal e aconselhamento espiritual'
    ],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'rama-navami',
    title: 'Rama Navami',
    subtitle: 'Aparecimento do Senhor Ramacandra (O Rei Ideal e Nobre)',
    category: 'vaisnava',
    categoryLabel: 'Festival Vaisnava',
    period: 'Março / Abril (Data móvel védica)',
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
    period: 'Maio (Data móvel védica)',
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
  }
];
