# 🪷 ISKCON Ceará — Landing Page Oficial

Landing page moderna, responsiva e ultra-rápida criada para o **Templo Hare Krishna de Fortaleza e Aquiraz (ISKCON Ceará)**. O objetivo é apresentar o templo, a programação do Festival de Domingo, a galeria de fotos reais, o tour em vídeo e canais de contato direto.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS 3](https://tailwindcss.com/) (Design limpo, temas devocionais âmbar/laranja e efeitos Glassmorphism)
- **Empacotador:** [Vite 6](https://vitejs.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/) + SVGs otimizados dedicados (WhatsApp, Instagram, YouTube)
- **Servidor Web:** [Nginx Alpine](https://nginx.org/) (com compressão Gzip, Rate Limiting contra abusos e cache estático)
- **Containerização & Docker Hub:** [Docker](https://www.docker.com/) (`aryalvesfernandes/landingpage-iskcon-ce`)
- **Qualidade & Linters:** [ESLint 9](https://eslint.org/) + TypeScript-ESLint + React Hooks rules
- **Testes Automatizados:** [Vitest 3](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

---

## 📁 Estrutura de Pastas Organizada

```text
Landingpage - IskconCE/
│
├── 📂 docker/                         # Arquivos de infraestrutura e containerização
│   ├── Dockerfile                     # Multi-stage build (Node 20 Alpine -> Nginx Alpine)
│   ├── nginx.conf                     # Servidor Nginx com Gzip, Rate Limit e Headers de Segurança
│   ├── docker-compose.yml             # Configuração para produção (Docker Swarm + Traefik)
│   ├── docker-compose-local.yml       # Configuração para testes e desenvolvimento local
│   └── .dockerignore                  # Arquivos ignorados no build
│
├── 📂 frontend/                       # Código-fonte completo da aplicação React
│   ├── 📂 public/                     # Arquivos estáticos servidos diretamente
│   │   ├── 📂 gallery/                # Fotos reais do templo exibidas na galeria
│   │   └── 📂 video/                  # Vídeos locais limpos
│   ├── 📂 src/                        # Componentes, páginas e testes
│   ├── eslint.config.js               # Configuração do ESLint e TypeScript Linter
│   ├── package.json                   # Dependências e scripts do frontend
│   ├── vite.config.ts                 # Configurações do Vite e Vitest
│   └── tsconfig.json                  # Configurações do TypeScript
│
├── 📂 .github/workflows/              # Pipelines CI/CD automatizados no GitHub
│   ├── security.yml                   # Auditoria de segurança, Linter e Testes a cada Push
│   └── docker-publish.yml             # Build & Push automático no Docker Hub
│
├── 📂 .githooks/                      # Hooks locais de proteção
│   └── pre-push                       # Bloqueia push se houver erro de linter, segurança ou teste
│
├── .gitignore                         # Ignora node_modules, envs e temporários
├── package.json                       # Scripts rápidos de execução da raiz
├── VERSION                            # Versão atual da imagem Docker (ex: 1.0.0)
└── README.md                          # Documentação do projeto
```

---

## 🛠️ Comandos de Desenvolvimento e Qualidade

| Comando | Descrição |
|---|---|
| `npm run lint` | Executa o **ESLint** para encontrar erros de código e variáveis mortas |
| `npm run lint:fix` | Corrige automaticamente erros de formatação e sintaxe |
| `npm run typecheck` | Valida se todos os tipos **TypeScript** estão 100% corretos |
| `npm run security:check` | Audita todas as bibliotecas para encontrar **vulnerabilidades de segurança** |
| `npm test` | Executa a suíte completa de **22 testes unitários** com Vitest |
| `npm run docker:up` | Sobe o container local no Docker em segundo plano |
| `npm run docker:down` | Para e remove o container local |

---

## 🐳 Publicação Automática no Docker Hub

O repositório oficial da imagem no Docker Hub é:
👉 **`aryalvesfernandes/landingpage-iskcon-ce`**

### Como funciona:
1. Ao solicitar a atualização para o GitHub, o assistente confirmará a versão desejada (ex: `1.0.0`, `1.1.0`).
2. O arquivo `VERSION` e os `package.json` são atualizados com o número da versão.
3. O GitHub Actions faz o build e publica a imagem com a tag da versão no Docker Hub.

> **Segredos no GitHub Secrets:**
> - `DOCKERHUB_USERNAME`: Seu usuário do Docker Hub (`aryalvesfernandes`)
> - `DOCKERHUB_TOKEN`: Seu token de acesso (Personal Access Token) do Docker Hub

---

## 🔒 Segurança e Publicação em Produção

- **100% Estático:** Sem banco de dados ou endpoints vulneráveis.
- **Nginx Hardened:** Proteção com Rate Limiting contra acessos excessivos, ocultação de versão e cabeçalhos de segurança HTTP.
- **Proteção DDoS Recomendada:** Ao publicar seu domínio em produção, aponte os DNS para a **[Cloudflare](https://www.cloudflare.com/)** (plano gratuito) com o proxy ativo (nuvem laranja).

---

## 📜 Licença & Dados Legais
- **Instituição:** ISKCON Ceará — Sociedade Internacional para a Consciência de Krishna do Brasil
- **CNPJ:** `47.096.698/0011-26`
- **Endereço:** Rua João Ferreira de Araújo, 113 – Jacundá, Aquiraz/CE
