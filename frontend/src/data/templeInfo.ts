export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: 'music' | 'book' | 'sparkles' | 'utensils';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  alt: string;
  objectPosition?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface WeeklyMeeting {
  id: string;
  title: string;
  region: string;
  tag: string;
  description: string;
  bookTitle?: string;
  day: string;
  time: string;
  platform: string;
  isOnline: boolean;
  contactName: string;
  contactPhone: string;
  whatsappUrl: string;
  highlights: string[];
}

export interface TempleInfo {
  name: string;
  subtitle: string;
  legalName: string;
  cnpj: string;
  address: {
    street: string;
    neighborhood: string;
    cityState: string;
    full: string;
  };
  contact: {
    phoneFormatted: string;
    whatsappUrl: string;
    caronaWhatsappUrl: string;
    instagramHandle: string;
    instagramUrl: string;
    youtubeUrl: string;
    mapsUrl: string;
    googleReviewUrl: string;
    featuredShortVideoId: string;
    localVideoUrl: string;
  };
  music: {
    title: string;
    artist: string;
    audioUrl: string;
  };
  sundaySchedule: ScheduleItem[];
  weeklyMeetings: WeeklyMeeting[];
  gallery: GalleryPhoto[];
  faqs: FaqItem[];
  mahaMantra: string;
}

export const TEMPLE_DATA: TempleInfo = {
  name: "ISKCON Ceará",
  subtitle: "Templo Hare Krishna de Fortaleza e Aquiraz",
  legalName: "SOC INTERN PARA A CONSC DE KRISHNA DO BRASIL ISKCON",
  cnpj: "47.096.698/0011-26",
  mahaMantra: "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare / Hare Rama, Hare Rama, Rama Rama, Hare Hare",
  address: {
    street: "Rua João Ferreira de Araújo, 113",
    neighborhood: "Jacundá",
    cityState: "Aquiraz - CE",
    full: "Rua João Ferreira de Araújo, 113 – Jacundá, Aquiraz/CE"
  },
  contact: {
    phoneFormatted: "(85) 98681-7643",
    whatsappUrl: "https://wa.me/5585986817643?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20funciona%20o%20templo%20Hare%20Krsna%20em%20Fortaleza%3F",
    caronaWhatsappUrl: "https://wa.me/5585986817643?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20carona%20solid%C3%A1ria%20para%20o%20templo%20no%20domingo.%20Moro%20no%20bairro%3A%20",
    instagramHandle: "@iskcon_ce",
    instagramUrl: "https://www.instagram.com/iskcon_ce/",
    youtubeUrl: "https://www.youtube.com/channel/UCrllUPB0IpM7Q90apBUL8aw",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hare+Krishna+Fortaleza+ISKCON+Ceara+Aquiraz",
    googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Hare+Krishna+Fortaleza+ISKCON+Ceara+Aquiraz",
    featuredShortVideoId: "T_mjJVzha24",
    localVideoUrl: "/video/templo-short.mp4"
  },
  music: {
    title: "Maha-Mantra Hare Krishna",
    artist: "Mahatma Das (Kirtan)",
    audioUrl: "/audio/maha-mantra.mp3"
  },
  sundaySchedule: [
    {
      time: "10h00 às 10h30",
      title: "Bhajana",
      description: "Canto meditativo dos Santos Nomes cantando o Maha-Mantra Hare Krishna com instrumentos tradicionais indianos (harmônio, mridanga e karatala).",
      iconName: "music"
    },
    {
      time: "10h30 às 11h30",
      title: "Aula do Bhagavad-gita Como Ele É",
      description: "Estudo da filosofia prática e transcendental com base nos ensinamentos autênticos de Sua Divina Graça A.C. Bhaktivedanta Swami Prabhupada.",
      iconName: "book"
    },
    {
      time: "11h30 às 12h00",
      title: "Kirtan Festivo",
      description: "Canto celebrativo do Maha-Mantra com música, palmas e dança alegre para a elevação espiritual.",
      iconName: "sparkles"
    },
    {
      time: "12h00 em diante",
      title: "Prasadam (Almoço Sagrado)",
      description: "Almoço puramente vegetariano, preparado com amor e oferecido a Deus, servido gratuitamente para todos os presentes.",
      iconName: "utensils"
    }
  ],
  weeklyMeetings: [
    {
      id: "lapidar-pacoti",
      title: "Estudo do Bhagavad-gītā Como Ele É",
      region: "Lapidar Pacoti – CE",
      tag: "Online • Google Meet",
      description: "Encontro semanal acolhedor para aprofundar-se nos ensinamentos universais e práticos do Bhagavad-gītā Como Ele É sob a orientação da sabedoria védica.",
      bookTitle: "Bhagavad-gītā Como Ele É",
      day: "Todas as terças-feiras",
      time: "20h00",
      platform: "Pelo Google Meet (Online)",
      isOnline: true,
      contactName: "Manjari Tulasi",
      contactPhone: "(85) 9793-0976",
      whatsappUrl: "https://wa.me/5585997930976?text=Ol%C3%A1%20Manjari%20Tulasi%2C%20gostaria%20de%20participar%20do%20encontro%20semanal%20de%20estudo%20do%20Bhagavad-g%C4%ABt%C4%81%20(Lapidar%20Pacoti)!",
      highlights: [
        "Estudo verso a verso com comentários de Srila Prabhupada",
        "Ambiente acolhedor para perguntas, reflexões e aplicação prática",
        "Acesso livre e 100% gratuito pelo Google Meet"
      ]
    }
  ],
  gallery: [
    {
      id: "altar-deidades",
      title: "Altar Sagrado & Deidades",
      category: "Espaço Sagrado",
      description: "O belo altar principal do templo em Aquiraz, decorado com guirlandas florais tradicionais e oferendas devocionais.",
      imageUrl: "/gallery/altar-deidades.jpg",
      alt: "Altar das Deidades do Templo Hare Krishna em Aquiraz",
      objectPosition: "center 12%"
    },
    {
      id: "encontro-comunitario",
      title: "Comunidade & Famílias no Domingo",
      category: "Comunidade",
      description: "Encontro festivo e acolhedor de domingo reunindo devotos, famílias, crianças e novos visitantes no salão principal.",
      imageUrl: "/gallery/encontro-comunitario.jpg",
      alt: "Reunião de famílias e visitantes no templo Hare Krishna no domingo",
      objectPosition: "center center"
    },
    {
      id: "kirtan-meditacao",
      title: "Canto Meditativo e Kirtan",
      category: "Meditação & Música",
      description: "Momento de oração em grupo e canto meditativo do Maha-Mantra com instrumentos clássicos como a mridanga e japa mala.",
      imageUrl: "/gallery/kirtan-meditacao.jpg",
      alt: "Devotos e visitantes sentados praticando canto meditativo com mridanga",
      objectPosition: "center center"
    },
    {
      id: "aula-filosofia",
      title: "Aula de Filosofia Védica",
      category: "Sabedoria Védica",
      description: "Salão com assentos confortáveis para todos acompanharem o estudo do Bhagavad-gita Como Ele É e a sabedoria védica.",
      imageUrl: "/gallery/aula-filosofia.jpg",
      alt: "Visitantes e devotos assistindo à aula de filosofia no salão",
      objectPosition: "center center"
    },
    {
      id: "srila-prabhupada",
      title: "Altar Reverencial a Srila Prabhupada",
      category: "Fundador-Acharya",
      description: "Espaço reverencial dedicado a Sua Divina Graça A.C. Bhaktivedanta Swami Prabhupada, fundador da ISKCON.",
      imageUrl: "/gallery/srila-prabhupada.jpg",
      alt: "Quadro e altar com guirlanda dedicado a Srila Prabhupada",
      objectPosition: "center 12%"
    }
  ],
  faqs: [
    {
      id: "entrada",
      question: "A entrada é gratuita? Preciso reservar?",
      answer: "Sim, a entrada é 100% gratuita e aberta a todos! Não é necessário fazer nenhuma reserva antecipada. Basta chegar e participar com a gente."
    },
    {
      id: "experiencia-filosofia",
      question: "O que vou vivenciar no templo e quais temas são abordados?",
      answer: "O templo é um espaço sagrado e acolhedor aberto a todas as pessoas e famílias para vivenciar a paz, meditação, música devocional (kirtan), cânticos de mantras, palestras filosóficas que tratam do controle da mente, desapego, simplicidade, estudo dos clássicos védicos e banquete vegetariano gratuito sob a linhagem de Srila Prabhupada."
    },
    {
      id: "vestimenta",
      question: "Qual roupa devo vestir para ir ao templo?",
      answer: "Recomendamos roupas confortáveis e discretas (evitar decotes acentuados, roupas muito curtas ou transparentes por ser um espaço de meditação e respeito). Não é necessário usar roupas indianas ou tradicionais."
    },
    {
      id: "religiao",
      question: "Preciso ser hindu ou vegetariano para frequentar?",
      answer: "De forma alguma! O templo é um espaço acolhedor e universal, aberto para pessoas de todas as idades, caminhos de fé e religiões."
    },
    {
      id: "carona",
      question: "Como funciona a carona solidária?",
      answer: "Se você não tem condução própria até Aquiraz, entre em contato pelo nosso WhatsApp informando seu bairro em Fortaleza. Tentamos articular caronas com devotos e amigos que moram perto de você."
    },
    {
      id: "prasadam",
      question: "O que é Prasadam?",
      answer: "Prasadam significa literalmente a 'misericórdia de Deus'. É um banquete vegetariano espiritualizado, preparado com devoção e carinho, servido gratuitamente após o programa de domingo."
    },
    {
      id: "fotos",
      question: "Posso tirar fotos e gravar vídeos?",
      answer: "Sim! Fotos e vídeos são bem-vindos, pedindo apenas discrição e respeito aos momentos de meditação. Também transmitimos o festival de domingo ao vivo pelo nosso Instagram @iskcon_ce."
    },
    {
      id: "loja-livros",
      question: "Tem lojinha ou livros disponíveis?",
      answer: "Sim! Durante o festival de domingo temos disponíveis para aquisição os livros autênticos traduzidos e comentados por Srila Prabhupada (incluindo o Bhagavad-gita Como Ele É), incensos e japa malas (contas de meditação)."
    }
  ]
};
