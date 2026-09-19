/**
 * Utilitário para verificar rotas em que a reprodução de música de fundo devocional é permitida.
 * Festival de Domingo, Programações Online e Calendário de Eventos & Festivais.
 */
export const isAudioAllowedPath = (pathname: string): boolean => {
  if (!pathname) return false;
  const normalized = pathname.toLowerCase().replace(/\/$/, '');
  return (
    normalized === '/festivaldedomingo' ||
    normalized === '/festival-de-domingo' ||
    normalized === '/programacoesonline' ||
    normalized === '/programas-online' ||
    normalized === '/programacoes-online' ||
    normalized === '/calendariodeeventos' ||
    normalized === '/calendario-de-eventos' ||
    normalized === '/calendario' ||
    normalized === '/eventos'
  );
};
