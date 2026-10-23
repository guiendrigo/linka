---
name: Linka
description: Smart-links de alta conversão e redundância de estoque para afiliados Shopee no Brasil.
colors:
  accent: "#ff5c39"
  on-accent: "#2a100b"
  accent-muted: "#ffe4dc"
  text-accent: "#c43a1f"
  icon-accent: "#c43a1f"
  background-body: "#f1f1f1"
  background-surface: "#ffffff"
  background-card: "#ffffff"
  border: "#00000014"
  border-emphasized: "#d4d4d4"
  text-primary: "#000000"
  text-secondary: "#474747"
  text-disabled: "#919191"
  stock-in-stock: "#059669"
  stock-in-stock-bg: "#ecfdf5"
  stock-out: "#ee4d2d"
  stock-out-bg: "#fff1f2"
  backup-active: "#d97706"
  backup-active-bg: "#fef3c7"
typography:
  display:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "2.625rem"
    fontWeight: 400
    lineHeight: 1.2381
  headline:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3333
  title:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4286
  label:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4286
  code:
    fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4286
rounded:
  inner: "6px"
  element: "10px"
  container: "12px"
  card: "16px"
  page: "28px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.element}"
    padding: "10px 16px"
  button-secondary:
    backgroundColor: "{colors.background-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.element}"
    padding: "10px 16px"
  card-product:
    backgroundColor: "{colors.background-surface}"
    rounded: "{rounded.card}"
    padding: "16px"
---

# Design System: Linka

## Overview

**Creative North Star: "O Balcão Digital do Afiliado"**

O Linka é uma ferramenta de trabalho diário feita para o afiliado brasileiro de e-commerce (Shopee, Mercado Livre, Nuvemshop) que atua na correria das redes sociais — especialmente Instagram Stories, grupos de WhatsApp/Telegram e link na bio. A linguagem visual não tenta se passar por um SaaS corporativo do Vale do Silício nem por um panfleto promocional estridente de supermercado. É a estética do varejo brasileiro moderno: calorosa, direta, de alto contraste, limpa e focada na transação segura.

A hierarquia visual resolve a dor central do afiliado: a ansiedade de perder comissão quando um anúncio esgota. Cada elemento na tela comunica prontamente o estado de estoque de uma oferta, qual loja receberá o clique do seguidor naquele instante e se a redundância de backup está armada. A interface é concebida a partir da palma da mão: todas as ações críticas (cadastrar achadinho, alternar disponibilidade, reordenar prioridade e copiar link) são executadas com rapidez em telas compactas de smartphone (390×844), sem esforço e com retorno tátil imediato.

Nas superfícies públicas visitadas pelos seguidores (`/r/<code>` e `/p/<code>`), o mecanismo interno desaparece. O comprador vê apenas o produto, o preço claro e o destino disponível ou, na pior das hipóteses, uma comunicação transparente e honesta de que o item esgotou em todas as opções. Sem números inventados, sem falsos cronômetros de escassez e sem jargões.

**Key Characteristics:**
- **Identidade Varejista Confiável:** Acento laranja caloroso e vibrante sobre superfícies neutras de papel digital claro, transmitindo velocidade, oportunidade e confiança.
- **Mobile-first de Verdade:** Desenvolvido e testado na largura padrão de 390px, com alvos de toque generosos e zero transbordo horizontal.
- **Transparência de Estoque:** Crachás semânticos e nítidos (verde para ativo, vermelho para esgotado, laranja para o backup em vigor).
- **Precisão Financeira:** Preços em Real (BRL) e comissões estimadas sempre alinhados com números tabulares (`tabular-nums`).
- **Comunicação Direta em Português:** Textos objetivos, declarativos e respeitosos, falando com o afiliado de igual para igual.

---

## Colors

A paleta de cores do Linka equilibra a energia transacional do laranja característico do e-commerce brasileiro com superfícies neutras limpas e funcionais, garantindo legibilidade extrema sob a luz do sol na tela do celular.

### Primary
- **Laranja Linka (`--color-accent`: `#ff5c39`)**: A cor principal da marca e das ações primárias. Usada no botão de conversão principal, no ícone da sacola e para destacar a oferta que está recebendo o clique no momento.
- **Laranja Suave (`--color-accent-muted`: `#ffe4dc`)**: Fundo sutil para crachás de comissão estimada, pílulas informativas e estados de realce de cards. No tema escuro, adapta-se para `#503424`.
- **Laranja Texto / Contraste (`--color-text-accent`: `#c43a1f`)**: Variação de alto contraste utilizada em tipografia sobre fundos claros, links interativos e ícones secundários de destaque.

### Neutral
- **Fundo Corporal (`--color-background-body`: `#f1f1f1` / `#1b1b1b`)**: Base neutra que dá sustentação aos cartões brancos e separa o conteúdo da moldura do navegador.
- **Superfície dos Cartões (`--color-background-surface`: `#ffffff` / `#262626`)**: Fundo dos cards de produto, painéis laterais e modais.
- **Bordas Sutis (`--color-border`: `#00000014` / `#ffffff1A`)**: Delimitação geométrica de 1px que organiza a densidade de informações sem poluição visual.
- **Texto Principal (`--color-text-primary`: `#000000` / `#ffffff`)**: Preto profundo para títulos, preços e rótulos essenciais.
- **Texto Secundário (`--color-text-secondary`: `#474747` / `#9e9e9e`)**: Cinza médio para notas de apoio, descrições e URLs públicas.

### Semântica de Estoque (Stock Cues)
- **Em Estoque (`--color-stock-in-stock`: `#059669` / bg: `#ecfdf5`)**: Verde esmeralda acompanhado de ícone de confirmação. Indica que a loja tem unidades disponíveis e o tráfego está liberado.
- **Esgotado (`--color-stock-out`: `#ee4d2d` / `#b91c1c` / bg: `#fff1f2`)**: Vermelho rubi com ícone de alerta. Indica ruptura de estoque, acionando o redirecionamento para o próximo backup.
- **Backup Ativo (`--color-backup-active`: `#ff5c39` / bg: `#ffe4dc`)**: Laranja com crachá "O clique cai aqui", evidenciando qual reserva assumiu a liderança das vendas.

### Named Rules
**The Scarcity of Orange Rule.** O laranja vibrante (`#ff5c39`) é reservado para chamadas à ação (CTAs), para a oferta atualmente ativa e para a marca. Ele nunca cobre grandes planos de fundo nem concorre com o indicador verde de estoque.

**The Transparent Stock Rule.** Todo estado de estoque deve ser duplo: uma cor semântica identificável e um rótulo textual explícito ("Em estoque" ou "Esgotado"). Nunca dependa exclusivamente de cor para comunicar disponibilidade.

---

## Typography

A tipografia do Linka combina a legibilidade humana da família **Figtree** (com fallback nos sans-serif nativos dos sistemas Apple, Android e Windows) com a precisão mecânica do alinhamento numérico tabular.

**Display & Heading Font:** Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif  
**Body Font:** Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif  
**Monospace / Financial Font:** ui-monospace, "SF Mono", Monaco, Consolas, "Liberation Mono", monospace  

**Character:** A tipografia é acessível, estável e direta. Não há serifa nem excentricidades estilísticas que atrasem a leitura do afiliado em trânsito.

### Hierarchy
- **Display 1** (Regular / Semibold, `2.625rem` / `42px`, line-height `1.2381`): Chamadas de topo da página pública (`/`) com equilíbrio tipográfico (`text-wrap: balance`).
- **Display 2** (Regular / Semibold, `2.1875rem` / `35px`, line-height `1.2571`): Títulos de páginas públicas de destino e bio (`/p/$code`, `/r/$code`).
- **Heading 1** (Semibold, `1.5rem` / `24px` no desktop, `1.625rem` / `26px` no mobile, line-height `1.33`): Títulos de seções do console ("Links", "Plano").
- **Heading 2** (Semibold, `1.25rem` / `20px`, line-height `1.4`): Títulos de produtos e cartões de achadinho.
- **Heading 3** (Bold, `1.0625rem` / `17px`, line-height `1.41`): Subseções de configuração e listas de lojas.
- **Body** (Regular, `0.875rem` / `14px`, line-height `1.43`): Textos corridos explicativos e formulários (`text-wrap: pretty`).
- **Supporting / Small** (Regular, `0.75rem` / `12px`, line-height `1.66`): Metadados, endereços `/r/codigo` e contadores de ofertas.
- **Micro Label** (Bold, `0.625rem`–`0.6875rem` / `10px`–`11px`, tracking `0.05em` uppercase): Crachás de hierarquia de oferta ("OFERTA PRINCIPAL", "BACKUP 1").

### Named Rules
**The Tabular Money Rule.** Todo valor em Reais (`R$ xx,xx`) e porcentagem de comissão estimada (`xx%`) deve obrigatoriamente renderizar com a classe `tabular-nums` (`font-variant-numeric: tabular-nums`). Isso impede que os números dancem ou desalinhem quando os valores mudam ou quando dispostos em listas verticais.

**The Natural Case Rule.** Títulos e subtítulos nunca são grafados em CAIXA ALTA completa. O uso de maiúsculas é restrito a crachás de metadados compactos de até duas palavras.

---

## Layout

O layout do Linka é construído sob a premissa de que 90% das decisões operacionais do afiliado acontecem em pé, com uma única mão segurando o celular enquanto alterna entre o WhatsApp e o Instagram.

### Mobile-first (390×844 Base Viewport)
- **Área de Toque Confortável:** Todos os botões, interruptores (`Switch`) e gatilhos de cópia possuem altura mínima efetiva de 40px a 44px.
- **Zero Transbordo Horizontal:** O container principal possui `max-width` inteligente e margens laterais seguras (`padding: 16px`), sem tabelas largas não responsivas no mobile.
- **Apresentação Dual:**
  - **Mobile (< 1024px):** Apresentação vertical rica em cartões desacoplados (`Card`). Cada produto é um card autocontido com título, preço, pílula de estoque, destino atual e botões de ação empilhados ou lado a lado.
  - **Desktop (≥ 1024px):** Tabela administrativa limpa, densa e com linhas divisórias sutis (`table min-w-[46rem]`), otimizada para quem cadastra dezenas de itens com teclado físico e mouse.

### Estrutura de Navegação
- **TopNav:** Barra horizontal limpa contendo o `LinkaBrand` à esquerda e o slot de autenticação/perfil do usuário (`AccountSlot`) à direita.
- **ConsoleShell:** Estrutura mestre do workspace logado, fornecendo navegação lateral (`SideNav`) retraída em gaveta responsiva no mobile e fixa à esquerda no desktop.

---

## Elevation & Depth

O sistema visual do Linka adota uma abordagem de **superfície tonal plana com contenção por bordas sutis** (*flat-by-default with tonal layering*).

- **Camada 0 (Chão/Body):** `#f1f1f1` (cinza neutro suave).
- **Camada 1 (Superfície/Cards):** `#ffffff` puro com borda de 1px em `#00000014`.
- **Camada 2 (Paineis e Diálogos Flutuantes):** `#ffffff` com elevação sutil `shadow-med` ou `shadow-high` para menus suspensos e gavetas laterais de edição (`SidePanel`).

### Shadow Vocabulary
- **`shadow-xs` / `shadow-sm`** (`0 1px 2px rgba(0, 0, 0, 0.05)`): Utilizada no ícone de sacola do logotipo e em botões principais em repouso.
- **`shadow-med`** (`0 4px 12px rgba(0, 0, 0, 0.08)`): Utilizada na gaveta de formulário lateral e na imagem de avatar da página de bio.

### Named Rules
**The Flat-By-Default Rule.** Superfícies não flutuam sem motivo. A separação entre elementos é feita prioritariamente pela alternância entre o cinza do corpo (`#f1f1f1`) e o branco dos cartões (`#ffffff`), demarcados por uma borda tênue de 1px.

---

## Shapes

O sistema de formas privilegia cantos amigáveis e curvilíneos, refletindo a estética acessível e moderna do ecossistema de compras mobile.

- **`--radius-inner` (`6px` / `0.375rem`):** Tags compactas de código e crachás de papel secundário.
- **`--radius-element` (`10px` / `0.625rem`):** Botões de ação, campos de entrada de texto (`TextInput`), caixas de texto (`TextArea`) e botões de ícone.
- **`--radius-container` (`12px` / `0.75rem`):** Caixas internas de destino do clique e agrupamentos de ofertas secundárias.
- **`--radius-card` (`16px` / `1rem`):** Cartões de produto no mobile e contêineres principais de seção.
- **`--radius-full` (`9999px`):** Pílulas de status de estoque, crachás de comissão e avatares circulares de perfil.

---

## Components

Os componentes foram desenhados com props e tokens do `@astryxdesign/core`, complementados por estilos utilitários consistentes.

### 1. Marca & Identidade (LinkaBrand)
- **Composição:** Ícone de sacola de compras (`ShoppingBag`) em tamanho 15px com traço 2.5, contido em um quadrado de 28×28px (`size-7`) com cantos arredondados de 8px e fundo laranja (`#ff5c39`), seguido pelo logotipo "Linka" em peso bold e um subtítulo "AFILIADOS" em caixa alta com cor de texto acentuada.
- **Interação:** Leve escala do ícone no hover (`group-hover:scale-105`).

### 2. Cartão de Produto Mobile (Product Card)
- **Estrutura:** 
  - *Cabeçalho:* Título do produto com link de edição rápido e pílula de status semântica alinhada à direita.
  - *Faixa de Preço:* Preço em BRL grande (`text-base font-bold tabular-nums`) ladeado pelo crachá arredondado de comissão estimada (`bg-accent-muted text-accent`).
  - *Caixa de Destino Atual:* Bloco cinza com borda arredondada (`bg-background-body p-2.5`) indicando para qual loja o clique vai hoje (`copy.title`) e o atalho público `/r/code`.
  - *Barra de Rodapé:* Interruptor de visibilidade na bio ("Na bio" / "Oculto") e grupo de botões: Copiar link (secundário com ícone de prancheta/check), Editar (ghost) e Apagar (ghost/destructive com confirmação).

### 3. Tabela de Produtos Desktop (Product Table)
- **Estrutura:** Tabela densa com cabeçalho em cinza suave e caixa alta (`uppercase tracking-wider text-xs`). Colunas dedicadas para Produto, Link, Preço tabular, Crachá de Estoque, Destino Atual, Chave de Visibilidade na Bio e Ações rápidas.

### 4. Pílula de Status de Estoque (Stock Badge)
- **Em estoque:** `bg-emerald-50 text-emerald-700` com ícone `CheckCircle2` de 12px.
- **Esgotado:** `bg-rose-50 text-rose-700` com ícone `AlertCircle` de 12px.
- **Formato:** `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold`.

### 5. Interruptor de Estoque (Switch de Oferta)
- **Comportamento:** Controle deslizante com rótulo descritivo explícito ("Em estoque" quando ativado, "Esgotado" quando desativado). Alterna imediatamente a oferta ativa e recalcula a resolução do link.

### 6. Botões (Buttons)
- **Primário:** Fundo laranja Linka (`#ff5c39`), texto branco, cantos de 10px (`rounded-element`). Usado em chamadas principais como "Entrar", "Salvar", "Adicionar achadinho" e "Ver oferta".
- **Secundário:** Fundo branco com borda tênue (`var(--color-border)`), texto preto e hover tonal. Usado em "Copiar link" e "Testar clique".
- **Ghost:** Sem fundo nem borda em repouso; sutil realce no hover. Usado em "Editar" e "Abrir bio".
- **Destrutivo:** Fundo vermelho suave (`var(--color-error-muted)`), texto vermelho escuro. Usado em confirmações de exclusão de produtos.

### 7. Simulador ao Vivo de Achadinho (Bench)
- **Finalidade:** Demonstrar interativamente na home page (`/`) como a inteligência de queda para backups funciona. Possui switches manuais para simular que a loja principal zerou o estoque, mostrando em tempo real o clique migrando para a Loja Reserva.

---

## Do's and Don'ts

### Do:
- **Do** manter todos os textos do produto em Português do Brasil (pt-BR), claros, concisos e sem rebuscamento.
- **Do** formatar valores monetários sempre no padrão brasileiro: `R$ 39,90` (vírgula decimal, espaço após o símbolo) e com números tabulares (`tabular-nums`).
- **Do** garantir que qualquer tela ou modal funcione perfeitamente na largura de 390px sem barra de rolagem horizontal.
- **Do** usar verde esmeralda para sinalizar estoque ativo e vermelho/rosa para estoque zerado.
- **Do** explicar com transparência as limitações da fase de testes (closed beta), informando quando o estoque é marcado manualmente ou conferido automaticamente.
- **Do** manter as ações críticas (copiar link, ligar/desligar estoque) ao alcance do polegar no celular.

### Don't:
- **Don't** adicionar kickers ou sobrancelhas (*eyebrows*) decorativas acima do título H1.
- **Don't** aplicar gradientes multicoloridos em textos (`bg-clip-text text-transparent`). Títulos são sólidos e de alto contraste.
- **Don't** inventar números, estatísticas fictícias ("+10.000 afiliados"), selos falsos ou depoimentos inventados. O Linka está em closed beta.
- **Don't** usar termos em inglês no vocabulário de vendas (use *achadinho*, *link*, *estoque*, *backup*, *oferta principal*; preserve o inglês apenas nos botões nativos da plataforma como "Sign out").
- **Don't** expor dados internos ou comissões do afiliado nas páginas públicas (`/r/<code>` ou `/p/<code>`).
- **Don't** alterar a URL final do afiliado substituindo parâmetros ou inserindo links de terceiros; o destino é rigorosamente o link HTTPS que o usuário cadastrou.
