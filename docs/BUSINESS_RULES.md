# Regras de Negócio - Templo ISKCON Ceará

Este documento consolida as decisões e regras de domínio do sistema para o Templo ISKCON Ceará (Fortaleza / Aquiraz).

---

## 1. Som de Fundo e Experiência Sonora (Maha-Mantra)

- **Música:** *Maha-Mantra Hare Krishna* cantado por Mahatma Das (Kirtan meditativo e festivo).
- **Páginas onde o som toca:**
  - `/festivaldedomingo` (Festival Tradicional de Domingo)
  - `/programacoesonline` (Programações Online Durante a Semana)
  - `/calendariodeeventos` (Calendário de Eventos & Festivais)
- **Página Linktree (`/`):**
  - O som inicia pausado na página inicial para respeitar a decisão do usuário, mas ao clicar nos botões de programa/eventos, o som é destravado e reproduzido imediatamente.
  - Ao retornar para a Linktree (`/`), a música é automaticamente pausada.
- **Dispositivo de Controle de Som (`AudioPlayer`):**
  - Widget flutuante fixado no canto inferior direito das páginas autorizadas.
  - Permite pausar/desativar com 1 toque a qualquer momento.
  - Permite mutar/desmutar e reativar caso o visitante deseje.
  - Pausa automática ao dar play em qualquer vídeo local do templo, e retomada após pausa do vídeo.
  - **Pausa Manual com Persistência Estrita:** Caso o visitante pause o som manualmente (clique em "Desativar"), essa preferência é salva no `localStorage` (`iskcon_audio_manually_paused`) e sincronizada entre abas (`StorageEvent`). Enquanto pausado manualmente, o som **JAMAIS** voltará a tocar automaticamente ao mudar de abas, transitar entre rotas autorizadas ou clicar nos botões do Linktree. O áudio só volta a tocar se o visitante for manualmente no botão e clicar em `▶ Ativar`.

---

## 2. Programações Presenciais e Festivais

- **Festival Tradicional de Domingo:**
  - **Horário:** Todos os domingos das 10h00 às 13h00.
  - **Local:** Rua João Ferreira de Araújo, 113 – Jacundá, Aquiraz/CE.
  - **Atividades:** Bhajana meditativo, palestra do Bhagavad-gītā, kirtan festivo com dança e banquete vegetariano gratuito (Prasadam).
  - **Carona Solidária:** Grupo e contato direto via WhatsApp oficial do templo: `(85) 98681-7643`.

---

## 3. Calendário de Eventos e Visitas de Gurus

- **Programação Especial de Chandramukha Swami (Outubro de 2026):**
  - **01/10/2026 (Quinta-feira):** Chegada de Chandramukha Swami ao Ceará. **Sem programação pública** com o Maharaj neste dia (reservado para acolhimento e descanso).
  - **02/10/2026 (Sexta-feira, 19h00):** Programação especial com o Maharaj no **Espaço Clara Luz** em Fortaleza (palestra de sabedoria védica e kirtan meditativo).
  - **03/10/2026 (Sábado, 17h00):** Grande celebração no **Templo ISKCON Ceará em Aquiraz** (aula magna, kirtan festivo e banquete sagrado Prasadam).
  - **Contato/Inscrições:** Templo ISKCON Ceará via WhatsApp.
- **Domingo 04 de Outubro de 2026 (Templo Fechado):**
  - **Regra:** Não haverá Festival de Domingo nem programação presencial no templo no dia 04/10/2026.
  - As atividades normais de domingo retornam no dia 11/10/2026.
- **Aparecimento de Srila Prabhupada (Vyasa-puja):**
  - Data seguinte ao Janmastami (Agosto/Setembro).
- **Grandes Festivais Vaisnavas:**
  - *Sri Krishna Janmastami* (Agosto/Setembro)
  - *Gaura Purnima* (Fevereiro/Março)
  - *Rama Navami* (Março/Abril)
  - *Nrisimha Caturdasi* (Maio)

---

## 4. Programações Online Durante a Semana

- **Segunda-feira (19h00):**
  - *Encontro de Devotas (Estudo do Srimad-Bhagavatam)*
  - **Responsável:** Krsna Nandini (`556492022787`).
  - **Mensagem:** Menciona que veio pelo site dos devotos hare krsna do Ceará e solicita acesso ao grupo exclusivo.
- **Terça-feira (19h30):**
  - *Projeto Lapidar (Estudo do Bhagavad-gītā)*
  - **Responsável:** Manjari Tulasi (`5585997930976`).
  - **Mensagem:** Menciona que veio pelo site dos devotos do Ceará para participar do encontro do Lapidar.
- **Quinta-feira (19h00):**
  - *Passatempos de Krishna (Clube do Livro)*
  - **Responsável:** Arhadana (`5511961854858`).
  - **Mensagem:** Menciona que veio pelo site do templo do Ceará para participar do Clube do Livro.

---

## 5. Identificação Institucional e Legal

- **Razão Social:** SOC INTERN PARA A CONSC DE KRISHNA DO BRASIL ISKCON
- **CNPJ:** 47.096.698/0011-26
- **Sede:** Fortaleza / Aquiraz - CE
- **Links Legais:** Páginas completas e dedicadas para `/termos-de-uso` e `/politica-de-privacidade`.
