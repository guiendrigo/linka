# Linka — progresso

App para afiliados da Shopee. A pessoa entra, guarda um produto com oferta principal e backups, e copia um único endereço. Quem clica cai na oferta que ainda tem estoque.

Produção e dev usam SQLite (`SQLITE_PATH`). Stack Magalu-first (sem Neon/PGLite/Vercel/Astryx). A regra do link é a mesma. Sem a chave Affiliate da plataforma, o beta fecha no estoque marcado na mão.

## O que já funciona

### Base

- Home pública em português, mobile primeiro, com o simulador do sérum (`/r/serum-c`).
- Quem entra vê a conta em casca de console: Links na barra, gaveta no celular. Plano só aparece com `VITE_BILLING_ENABLED=true`. A home pública, o link `/r/...` e a bio `/p/...` ficam sem essa barra.
- Conta por Google (nativo) ou e-mail e senha. Não há magic link.
- Cada pessoa só vê os próprios produtos. O link público não pede conta.
- Quem entra ganha uma página de bio em `/p/codigo` (código opaco, não muda). Enquanto não há achadinho, a bio não compete com o primeiro `/r`. Depois do cadastro, título, descrição e foto ficam no topo de Links; cada produto pode ficar visível ou oculto. O visitante vê título, preço e **Ver oferta**, sem comissão. Produto esgotado some da bio.
- Conta vazia: uma ação (montar o link), o simulador do sérum continua na tela, e dá para abrir o rascunho do exemplo. Progresso começa em 20% até copiar o `/r`.

### Estoque (beta: na mão)

- Hoje o caminho do beta é o interruptor de cada oferta. Quem clica cai na primeira marcada em estoque, depois nos backups.
- A conferência automática usa a Open API de afiliado da Shopee (`productOfferV2`) com App ID e segredo **da plataforma** (`SHOPEE_AFFILIATE_APP_ID` / `SHOPEE_AFFILIATE_SECRET`). O afiliado não cola chave.
- Sem as duas env, o estoque marcado na mão continua e o Links avisa isso. Com elas, a visita e o botão **Conferir estoque** consultam o catálogo.
- Se a URL tem o código do produto (`…-i.loja.item` ou `/product/loja/item`), a leitura vale 15 minutos e é compartilhada entre contas que apontam para o mesmo item.
- Oferta ainda no catálogo: em estoque. Catálogo vazio: sem estoque, e o link cai no backup.
- Limite da Shopee (`10030`) é aviso de indisponível agora, não de chave errada. Falha de acesso também não pede App ID ao usuário.
- URL sem código, ou a Shopee fora do ar: o estoque marcado na mão continua. O interruptor manual vale até a próxima conferência bem-sucedida.
- O destino do clique é sempre a URL que a pessoa colou. O Linka não usa `offerLink` nem gera short link da conta da plataforma.

### Produtos e backups

- Criar, editar e apagar.
- Preço, comissão e de 1 a 4 ofertas.
- Subir, descer ou tirar um backup. A primeira oferta é a principal.
- O código `/r/...` não muda quando o produto é editado.

### Link inteligente

- `/r/codigo` responde com redirecionamento para a primeira oferta https em estoque.
- Se a principal acabou, o clique vai para o primeiro backup disponível.
- Se nenhuma tem estoque, a pessoa vê que a oferta esgotou, em vez de cair numa página morta. Essa página mostra título e preço, sem a comissão.
- Destino que não é https não recebe o clique.
- `?on=` só mexe no simulador (`serum-c`). Produto gravado ignora o parâmetro.
- `/api/r/codigo` usa a mesma conferência que `/r/codigo` e devolve a decisão em JSON, sem comissão nem segredo.
- A resposta não fica gravada no celular: a próxima visita escolhe de novo.
- Cada produto gravado mostra o último destino de uma visita real (loja, backup ou esgotado). Não há contagem de cliques.

### Operação Magalu

- `GET /api/health` só responde ok se o SQLite responde `select 1`.
- Backup: script no container (`scripts/backup-sqlite.mjs`) e cron no host copiando para fora do volume e da VM.

### Plano

- Código da cobrança existe (RevenueCat Web SDK, Anual/Mensal, entitlement `linka_pro`).
- Flag `VITE_BILLING_ENABLED`: só `"true"` liga a tela **Plano**, o SDK, o checkout e o teto da conta grátis. Sem a flag, `/plano` volta para a home e a conta não tem limite (beta fechado).
- Hoje a flag está desligada: discovery não cobra.
- Com a flag ligada, o eixo é quantidade de achadinhos: grátis 1, Pro 10, ilimitado só como âncora (sem SKU). Anual e Mensal são cadência do mesmo Pro. O upgrade aparece no 2º produto.
- Conversas no ICP: `bash scripts/icp-pix.sh`. Notas em `.local/icp-pix.md` (fora do git). Sem PIX ou recusa explícita, não entra feature nova no core.

## O que ainda não existe

### Etapa 6 — busca em linguagem natural

- Escrever o que se quer achar e receber ofertas da `productOfferV2`.
- Escolher uma ou mais e gravar o produto já com link de afiliado, preço e loja.
- Hoje o cadastro é manual. A API só é usada para saber se a oferta ainda está no catálogo.

### Etapa 7 — limite da conta gratuita

- Feito no código, atrás de `VITE_BILLING_ENABLED=true`: 1 achadinho no grátis, 10 no Pro. Sem a flag, o beta continua sem teto.
- Preço de verdade ainda depende das conversas PIX (`scripts/icp-pix.sh`), não de A/B.

### Etapa 8 — painel

- Visão de quantos links estão no ar, quantos caíram para backup e quais estão esgotados.
- Histórico de conferência além do “pela Shopee” em cada oferta.
- Não há contagem de cliques.

### Etapa 9 — PWA

- Ícone e manifest para instalar no celular e abrir como app.
- A home já é pensada para o telefone, mas ainda não é um app instalável.

### Etapa 10 — polimento

- Link encurtado (`shope.ee`) ainda não entra na conferência: falta o código da loja e do item. O formulário avisa; o estoque marcado vale.
- A chave Affiliate da plataforma ainda não está no `.env` da Magalu: conferência automática espera essa aprovação.
- Não há fila nem cron fora do processo do servidor. Quem não abre a conta depende da visita, no máximo a cada 15 minutos.
- Textos de sair da conta continuam em inglês, porque esse controle é da plataforma.
- A bio não tem handle escolhido, links extras (WhatsApp, Instagram, Pix) nem contagem de cliques.
- Não há OAuth da Open Platform para a loja do próprio afiliado. Dados de vendedor além do catálogo de afiliado ficam para depois.

## Ordem sugerida

1. Dez conversas no ICP (`bash scripts/icp-pix.sh`) até PIX ou recusa explícita.
2. Primeiro `/r` colado no Story — caminho já enxuto nesta rodada.
3. Ligar cobrança com o teto do grátis, quando houver quem pague.
4. Fora até o core cobrar: busca NLP, PWA, painel rico, handle de bio.
