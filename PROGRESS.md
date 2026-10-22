# Linka — progresso

App para afiliados da Shopee. A pessoa entra, guarda um produto com oferta principal e backups, e copia um único endereço. Quem clica cai na oferta que ainda tem estoque.

O plano original pedia Next.js, Hono, Cloudflare Workers, Turso, Clerk, Stripe e Docker. Neste ambiente o app que roda de verdade é outro: TanStack Start, Better Auth e Postgres (Neon em produção, banco embutido no preview). A regra do link é a mesma. O que não dá para operar aqui não foi fingido.

## O que já funciona

### Base

- Home pública em português, mobile primeiro, com o simulador do sérum (`/r/serum-c`).
- Quem entra vê a conta em casca de console: Links na barra, gaveta no celular. Plano só aparece com `VITE_BILLING_ENABLED=true`. A home pública, o link `/r/...` e a bio `/p/...` ficam sem essa barra.
- Conta por Google, X ou e-mail e senha. Não há magic link.
- Cada pessoa só vê os próprios produtos. O link público não pede conta.
- Quem entra ganha uma página de bio em `/p/codigo` (código opaco, não muda). Título, descrição e foto ficam no topo de Links; cada produto pode ficar visível ou oculto. O visitante vê título, preço e **Ver oferta**, sem comissão. Produto esgotado some da bio.

### Estoque automático

- A conferência usa a Open API de afiliado da Shopee (`productOfferV2`) com App ID e segredo **da plataforma** (`SHOPEE_AFFILIATE_APP_ID` / `SHOPEE_AFFILIATE_SECRET`). O afiliado não cola chave.
- Sem as duas env, o estoque marcado na mão continua. Com elas, a visita e o botão **Conferir estoque** consultam o catálogo.
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
- Se nenhuma tem estoque, a pessoa vê que a oferta esgotou, em vez de cair numa página morta.
- Destino que não é https não recebe o clique.
- A resposta não fica gravada no celular: a próxima visita escolhe de novo.
- `/api/r/codigo` devolve a mesma decisão em JSON, sem o segredo.

### Plano

- Código da cobrança existe (RevenueCat Web SDK, Anual/Mensal, entitlement `linka_pro`).
- Flag `VITE_BILLING_ENABLED`: só `"true"` liga a tela **Plano**, o SDK e o checkout. Sem a flag, `/plano` volta para a home.
- Hoje a flag está desligada: discovery não cobra.
- Ainda não há limite do que a conta gratuita pode guardar.

## O que ainda não existe

### Etapa 6 — busca em linguagem natural

- Escrever o que se quer achar e receber ofertas da `productOfferV2`.
- Escolher uma ou mais e gravar o produto já com link de afiliado, preço e loja.
- Hoje o cadastro é manual. A API só é usada para saber se a oferta ainda está no catálogo.

### Etapa 7 — limite da conta gratuita

- A cobrança está no código, atrás de `VITE_BILLING_ENABLED=true`.
- Ainda não há teto do que a conta gratuita pode guardar ou consultar.

### Etapa 8 — painel

- Visão de quantos links estão no ar, quantos caíram para backup e quais estão esgotados.
- Histórico de conferência além do “pela Shopee” em cada oferta.
- Não há contagem de cliques.

### Etapa 9 — PWA

- Ícone e manifest para instalar no celular e abrir como app.
- A home já é pensada para o telefone, mas ainda não é um app instalável.

### Etapa 10 — polimento

- Link encurtado (`shope.ee`) ainda não entra na conferência: falta o código da loja e do item.
- Não há fila nem cron fora do processo do servidor. Quem não abre a conta depende da visita, no máximo a cada 15 minutos.
- Textos de sair da conta continuam em inglês, porque esse controle é da plataforma.
- A bio não tem handle escolhido, links extras (WhatsApp, Instagram, Pix) nem contagem de cliques.
- Não há OAuth da Open Platform para a loja do próprio afiliado. Dados de vendedor além do catálogo de afiliado ficam para depois.

## Ordem sugerida

1. Busca conversacional, para montar o link sem colar URL na mão.
2. Painel curto do que está no ar e do que esgotou.
3. PWA, para usar no celular como app.
4. Pagamento, quando o uso gratuito precisar de limite.
