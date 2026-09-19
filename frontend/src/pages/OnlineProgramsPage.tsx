import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Video, 
  ShieldCheck, 
  HelpCircle, 
  HeartHandshake, 
  Sun,
  Laptop
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { TEMPLE_DATA } from '../data/templeInfo';
import { OnlineProgramCard } from '../components/OnlineProgramCard';
import { Footer } from '../components/Footer';
import { AudioPlayer } from '../components/AudioPlayer';

export const OnlineProgramsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-stone-100 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 font-sans">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            aria-label="Voltar para a página inicial"
          >
            <span className="text-2xl">🪷</span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base text-stone-900 leading-tight">
                {TEMPLE_DATA.name}
              </span>
              <span className="text-[10px] text-amber-800 font-medium">
                Programações Online
              </span>
            </div>
          </button>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              data-testid="online-btn-back-linktree"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Programações</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/festivaldedomingo')}
              data-testid="online-btn-sunday-festival"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Festival Presencial</span>
            </button>
          </div>

        </div>
      </header>

      {/* Return Sub-banner */}
      <nav aria-label="Retorno para programações" className="bg-amber-100/90 border-b border-amber-200/80 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-950 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todas as programações do templo</span>
          </button>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Estudos Semanais 100% Gratuitos pelo Google Meet</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* 1. Hero Section */}
        <section data-testid="online-hero-section" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 shadow-xs mb-4">
            <Video className="w-4 h-4 text-orange-600 animate-pulse" />
            <span>Encontros Virtuais ao Vivo • Pelo Google Meet</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Programações Online{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
              Durante a Semana
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            A distância física não é obstáculo para a associação espiritual. Conecte-se com devotos, estude as escrituras sagradas e transforme a sua rotina com sabedoria e paz interior.
          </p>
        </section>

        {/* 2. Three Online Programs Grid */}
        <section data-testid="online-programs-grid" className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Nossos Encontros Semanais
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Escolha o programa que mais combina com seu momento e peça o link de acesso:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TEMPLE_DATA.weeklyMeetings.map((meeting) => (
              <OnlineProgramCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </section>

        {/* 3. How to Participate Guide */}
        <section data-testid="online-how-it-works" className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xl shadow-stone-200/50 mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Passo a Passo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Como Funciona para Participar?
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Participar dos encontros é simples, acolhedor e acessível de qualquer lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg mb-3 shadow-md shadow-amber-500/20">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1.5">Escolha o Encontro</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Veja o dia e horário do estudo que você deseja participar (Segunda, Terça ou Quinta).
              </p>
            </div>

            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg mb-3 shadow-md shadow-orange-500/20">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1.5">Peça o Link no WhatsApp</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Clique no botão de WhatsApp do programa correspondente para receber o link da sala do Google Meet.
              </p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg mb-3 shadow-md shadow-emerald-600/20">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1.5">Acesse às 20h00</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                No horário marcado, clique no link do Google Meet pelo celular ou computador e aproveite o encontro!
              </p>
            </div>
          </div>
        </section>

        {/* 4. Common Questions / FAQ for Online Meetings */}
        <section data-testid="online-faq-section" className="mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Dúvidas Frequentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Dúvidas sobre os Encontros Online
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    É preciso pagar alguma taxa ou mensalidade?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Não! Todos os nossos encontros e grupos de estudo são 100% gratuitos e voluntários. Todos são bem-vindos sem qualquer custo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <Laptop className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    Preciso ligar a câmera e o microfone?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Não é obrigatório. Você pode participar apenas ouvindo com a câmera desligada ou, se desejar, abrir para fazer perguntas e interagir.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    Nunca li o Bhagavad-gītā, posso participar?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Com certeza! Os encontros são feitos especialmente para iniciantes, com explicações práticas e linguagem acessível verso a verso.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-sm">
              <div className="flex items-start gap-3">
                <Sun className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    E se eu quiser visitar o Templo presencialmente?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Você é nosso convidado especial! Todos os domingos temos o Festival de Domingo presencial com canto, palestra e banquete gratuito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sunday Festival Invitation Banner */}
        <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl shadow-orange-600/20 text-center flex flex-col items-center">
          <span className="text-xs uppercase font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full mb-3">
            Encontro Presencial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Conheça Também o Nosso Festival de Domingo
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed mb-6 font-normal">
            Todo domingo a partir das 10h00 no templo em Aquiraz (Grande Fortaleza). Música ao vivo (Kirtan), palestra filosófica e banquete vegetariano gratuito servido a todos.
          </p>
          <button
            type="button"
            onClick={() => navigate('/festivaldedomingo')}
            className="py-3.5 px-7 rounded-xl bg-white text-stone-900 font-bold text-sm sm:text-base shadow-lg hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
          >
            Ver Detalhes do Festival de Domingo →
          </button>
        </section>

      </main>

      {/* Full-width Footer */}
      <Footer />

      {/* Floating Devotional Music Player */}
      <AudioPlayer />

    </div>
  );
};
