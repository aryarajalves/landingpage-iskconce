import React from 'react';
import { ShieldCheck, FileText, Check } from 'lucide-react';
import { TEMPLE_DATA } from '../data/templeInfo';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, isOpen, onClose }) => {
  // Trava a rolagem da página de fundo (body) enquanto o modal estiver aberto
  React.useEffect(() => {
    if (!isOpen || !type) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, type]);

  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      data-testid="legal-modal-backdrop"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        data-testid="legal-modal-content"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-center gap-3 bg-stone-50/80">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
            {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h2 id="legal-modal-title" className="font-serif font-bold text-stone-900 text-lg leading-tight">
              {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {TEMPLE_DATA.name} • {TEMPLE_DATA.legalName}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-600 leading-relaxed">
          {isPrivacy ? (
            <>
              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">1. Compromisso com sua Privacidade</h3>
                <p>
                  A <strong>{TEMPLE_DATA.legalName}</strong> (CNPJ {TEMPLE_DATA.cnpj}) tem como princípio sagrado o
                  respeito, a transparência e a integridade em todas as interações com membros, visitantes e o público em geral,
                  em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">2. Coleta e Uso de Dados</h3>
                <p>
                  Esta página possui caráter estritamente informativo e cultural sobre as atividades devocionais do templo.
                  Não realizamos coleta oculta de dados pessoais, rastreamento invasivo ou venda de dados. Ao clicar nos links
                  de contato (WhatsApp, Instagram ou YouTube), você interage diretamente com voluntários autorizados do templo.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">3. Comunicação e Carona Solidária</h3>
                <p>
                  Quaisquer informações que você voluntariamente compartilhar conosco (como nome ou bairro de residência ao solicitar
                  informações de carona ou encontros online) serão empregadas unicamente para a finalidade solicitada, sem repasse comercial.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">4. Seus Direitos</h3>
                <p>
                  Você pode, a qualquer momento, solicitar a atualização ou remoção de seus dados cadastrais de nossos canais de aviso
                  entrando em contato pelo WhatsApp oficial do templo: <strong>{TEMPLE_DATA.contact.phoneFormatted}</strong>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">1. Finalidade do Portal</h3>
                <p>
                  Este canal digital é mantido pela <strong>{TEMPLE_DATA.legalName}</strong> (CNPJ {TEMPLE_DATA.cnpj}) para
                  divulgar os festivais, encontros de estudo do <em>Bhagavad-gītā</em> e atividades do Templo Hare Krishna em
                  Fortaleza e Aquiraz/CE.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">2. Acesso Livre e Comunitário</h3>
                <p>
                  Nossos programas regulares, presenciais aos domingos e online durante a semana, são abertos a todas as pessoas,
                  independente de crença, origem ou gênero. O acesso a este portal é gratuito.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">3. Conduta Respeitosa</h3>
                <p>
                  Valorizamos um ambiente de harmonia, reflexão transcendental e fraternidade. Espera-se de todos os participantes dos
                  grupos de estudos e canais de comunicação uma postura cortês, respeitosa e alinhada aos valores do respeito mútuo.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-800 mb-1 text-sm">4. Direitos Autorais e Tradição</h3>
                <p>
                  As obras filosóficas citadas, ensinamentos de <strong>Srila Prabhupada</strong> e materiais audiovisuais pertencem
                  aos seus respectivos detentores de direitos sob a égide da ISKCON mundial e The Bhaktivedanta Book Trust (BBT).
                </p>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400">
            Última atualização: Março de 2026 • Fortaleza / Aquiraz, Ceará.
          </div>
        </div>

        {/* Footer with exactly 1 close button */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            data-testid="legal-modal-close-button"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Entendido e Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
