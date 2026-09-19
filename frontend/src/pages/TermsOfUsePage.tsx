import React from 'react';
import { ArrowLeft, FileText, BookOpen, Users, ShieldAlert, Heart, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { TEMPLE_DATA } from '../data/templeInfo';
import { LegalFooter } from '../components/LegalFooter';

export const TermsOfUsePage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-stone-100 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 font-sans">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
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
                Termos Institucionais
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            data-testid="btn-back-from-terms"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Início</span>
          </button>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Page Title & Context Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 shadow-xs mb-3">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Diretrizes de Uso & Convivência Comunitária</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-2">
            Termos de Uso
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-amber-900/90 tracking-wide">
            {TEMPLE_DATA.legalName} • CNPJ {TEMPLE_DATA.cnpj}
          </p>
        </div>

        {/* Legal Document Card */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xl shadow-stone-200/50 space-y-8 text-stone-700 leading-relaxed text-sm">
          
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h2>1. Identificação e Finalidade do Portal</h2>
            </div>
            <p>
              Estes Termos de Uso regulam o acesso e a utilização dos serviços e canais informativos da <strong>{TEMPLE_DATA.legalName}</strong> (CNPJ <strong>{TEMPLE_DATA.cnpj}</strong>), templo Hare Krishna em Fortaleza e Aquiraz/CE.
            </p>
            <p>
              O objetivo fundamental deste portal é aproximar a sociedade da rica filosofia védica, da prática da Bhakti-yoga, da meditação no Santo Nome (Maha-Mantra) e das programações gratuitas comunitárias promovidas pelo templo.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <Users className="w-5 h-5 text-amber-600" />
              <h2>2. Acesso Gratuito e Universal</h2>
            </div>
            <p>
              Todas as programações regulares do templo — incluindo o Festival de Domingo presencial (com palestra, música e banquete vegetariano) e os grupos virtuais de estudo durante a semana — são de acesso 100% gratuito e irrestrito a todas as pessoas, sem distinção de religião, etnia, gênero ou classe social.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <Heart className="w-5 h-5 text-amber-600" />
              <h2>3. Conduta Respeitosa nos Encontros e Grupos Exclusivos</h2>
            </div>
            <p>
              Os grupos exclusivos de WhatsApp e as transmissões de estudo são espaços sagrados de paz, autoaperfeiçoamento e respeito mútuo. Espera-se de todos os integrantes:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tratamento fraterno, respeitoso e acolhedor para com facilitadores e demais participantes.</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Não veiculação de spam, propagandas comerciais estranhas às atividades devocionais ou mensagens de ódio/intolerância.</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Observância às diretrizes específicas de cada grupo (ex: o grupo de segunda-feira é exclusivo para o público feminino).</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h2>4. Propriedade Intelectual e Obras Sagradas</h2>
            </div>
            <p>
              Os textos sagrados, comentários de <strong>Srila Prabhupada</strong> (Fundador-Acharya da ISKCON), áudios do Maha-Mantra e imagens históricas divulgadas neste portal são protegidos por direitos autorais pertencentes à ISKCON e ao The Bhaktivedanta Book Trust (BBT), sendo seu uso destinado estritamente ao enriquecimento cultural e espiritual.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h2>5. Disposições Finais e Dúvidas</h2>
            </div>
            <p>
              O templo reserva-se o direito de atualizar eventuais horários e organizadores de grupos conforme a dinâmica do serviço devocional. Dúvidas sobre estes termos podem ser esclarecidas diretamente com a secretaria do templo pelo WhatsApp: <strong>{TEMPLE_DATA.contact.phoneFormatted}</strong>.
            </p>
            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
              Vigência: Atualizado em Março de 2026 • ISKCON Ceará (Sociedade Internacional para a Consciência de Krishna).
            </div>
          </section>

        </article>

        {/* Back Action at Bottom */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para as Programações</span>
          </button>
        </div>

      </main>

      {/* Global Legal Footer */}
      <LegalFooter className="mt-6 pb-12" />

    </div>
  );
};
