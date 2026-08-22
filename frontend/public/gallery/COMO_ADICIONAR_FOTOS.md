# Como Adicionar Fotos na Galeria do Templo

Você pode adicionar quantas fotos quiser na galeria seguindo estes 2 passos simples:

---

### Passo 1: Salve as Fotos nesta Pasta (`public/gallery/`)
- Coloque os arquivos de imagem aqui dentro (ex: `altar.jpg`, `kirtan.webp`, `domingo.jpg`, etc.).
- **Dica de Otimização:** Para carregar rápido no celular dos visitantes:
  - Formatos recomendados: `.webp` ou `.jpg`
  - Resolução ideal: `800x600` ou `1200x800` (peso recomendado: entre 80KB e 250KB por foto).
  - Você pode usar sites gratuitos como [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/) antes de salvar.

---

### Passo 2: Cadastre a Foto no `src/data/templeInfo.ts`
Abra o arquivo `src/data/templeInfo.ts` e adicione sua nova foto dentro da lista `gallery`:

```typescript
{
  id: "minha-foto-01",
  title: "Festa de Domingo no Salão",
  category: "Festival",
  imageUrl: "/gallery/minha-foto-01.jpg",
  alt: "Devotos e visitantes celebrando no festival de domingo"
}
```

---

### Recursos Automáticos da Galeria:
- **Lazy Loading & Decodificação Assíncrona:** A galeria só carrega as fotos que estão visíveis na tela enquanto a pessoa rola a página, economizando a internet do visitante.
- **Filtros por Categoria:** Ao adicionar novas categorias (ex: "Festival", "Almoço", "Altar", "Cursos"), os botões de filtro aparecem automaticamente no topo.
- **Visualização em Tela Cheia (Lightbox):** Ao clicar em qualquer foto, ela abre em tela cheia com navegação de seta para frente e para trás.
- **Botão 'Carregar Mais':** Se você cadastrar mais de 6 fotos, a página exibe o botão *"Carregar Mais Fotos"* para manter a página super rápida!
