/**
 * Utilitário para verificar rotas em que a reprodução de música de fundo devocional é permitida.
 * Apenas na página do Festival de Domingo e na página de Programações Online.
 */
export const isAudioAllowedPath = (pathname: string): boolean => {
  if (!pathname) return false;
  const normalized = pathname.toLowerCase().replace(/\/$/, '');
  return (
    normalized === '/festivaldedomingo' ||
    normalized === '/festival-de-domingo' ||
    normalized === '/programacoesonline' ||
    normalized === '/programas-online' ||
    normalized === '/programacoes-online'
  );
};
