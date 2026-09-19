import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { TEMPLE_DATA } from '../data/templeInfo';
import { LegalFooter } from '../components/LegalFooter';

export const PrivacyPolicyPage: React.FC = () => {
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
                Privacidade & Dados
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            data-testid="btn-back-from-privacy"
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Conformidade LGPD • Lei nº 13.709/2018</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-2">
            Política de Privacidade
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-amber-900/90 tracking-wide">
            {TEMPLE_DATA.legalName} • CNPJ {TEMPLE_DATA.cnpj}
          </p>
        </div>

        {/* Legal Document Card */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xl shadow-stone-200/50 space-y-8 text-stone-700 leading-relaxed text-sm">
          
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <Lock className="w-5 h-5 text-amber-600" />
              <h2>1. Compromisso com a Privacidade e Transparência</h2>
            </div>
            <p>
              A <strong>{TEMPLE_DATA.legalName}</strong> (CNPJ <strong>{TEMPLE_DATA.cnpj}</strong>), com sede em Fortaleza e Aquiraz/CE, mantém como preceito essencial a retidão, a verdade e o zelo na relação com frequentadores, voluntários e simpatizantes. Esta Política de Privacidade descreve de forma clara como tratamos as informações no âmbito deste portal e de nossos canais oficiais de comunicação.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h2>2. Finalidade Informativa e Ausência de Rastreamento Oculto</h2>
            </div>
            <p>
              Este portal tem finalidade puramente cultural, espiritual e informativa, divulgando a programação presencial do Festival de Domingo e os grupos virtuais de estudo do <em>Bhagavad-gītā</em> e dos Passatempos de Krishna.
            </p>
            <p>
              Não realizamos comercialização de dados pessoais, não criamos perfis comportamentais para fins publicitários de terceiros e não utilizamos softwares invasivos de rastreamento.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              <h2>3. Comunicação Voluntária via WhatsApp e Grupos Exclusivos</h2>
            </div>
            <p>
              Ao acionar os botões de contato disponíveis no portal, você opta de forma livre e voluntária por iniciar uma conversa com os responsáveis autorizados do templo:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Segunda-feira (Sangha Feminina):</strong> Contato direto com a devota Krsna Nandini para orientações e inclusão no grupo exclusivo de estudos para mulheres.</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Terça-feira (Lapidar Pacoti):</strong> Contato direto com a devota Manjari Tulasi para acompanhamento dos encontros semanais.</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Quinta-feira (Passatempos de Krishna):</strong> Atendimento pela coordenação oficial do templo.</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Carona Solidária:</strong> Informações de bairro compartilhadas por você servem exclusivamente para organizar a logística voluntária de carona para o Festival de Domingo.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h2>4. Seus Direitos (LGPD)</h2>
            </div>
            <p>
              Conforme previsto no art. 18 da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui o direito de solicitar a qualquer tempo:
            </p>
            <p>
              A confirmação da existência de tratamento, a correção de dados incompletos ou a exclusão do seu número de telefone de nossos grupos de avisos e listas devocionais. Para exercer esses direitos, basta enviar uma mensagem direta para o WhatsApp oficial do templo: <strong>{TEMPLE_DATA.contact.phoneFormatted}</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-stone-900 font-bold text-base sm:text-lg border-b border-stone-100 pb-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <h2>5. Atualizações e Jurisdição</h2>
            </div>
            <p>
              Esta política poderá ser revisada periodicamente para refletir o aprimoramento contínuo de nossos processos comunitários. Fica eleita a Comarca de Fortaleza/Aquiraz, Estado do Ceará, para dirimir eventuais controvérsias decorrentes deste documento.
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
