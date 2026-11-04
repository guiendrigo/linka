# Linka

App de afiliado Shopee: um produto com oferta principal e backups vira um link que, a cada visita, manda o clique para a primeira oferta ainda em estoque.

## Language

**Produto**:
O que o afiliado guarda na conta: título, preço, comissão e de uma a quatro ofertas ordenadas. O código público `/r/...` não muda quando o produto é editado.
_Avoid_: SmartLink (nome de tipo), listing, item

**Oferta**:
Um destino concreto (URL + loja) dentro do produto. A primeira é a principal; as demais são backups na ordem do clique.
_Avoid_: link (ambíguo com o endereço público), listing

**Link inteligente**:
O endereço público `/r/<código>` (e o espelho JSON `/api/r/<código>`) que reavalia estoque a cada visita e escolhe a primeira oferta https em estoque.
_Avoid_: short link, redirect URL sozinha, SmartLink como conceito de negócio

**Decisão do link**:
O resultado de uma visita ao link inteligente — um de: redirecionar (https válido em estoque), esgotado, destino inseguro (havia oferta mas a URL não passa no gate https), código inválido, ou link inexistente. Mesma decisão para HTML e JSON.
_Avoid_: resolution (jargão interno), loadPublicResolution, “o que a rota faz”, sold_out como guarda-chuva de URL ruim

**Conferência de estoque**:
Averiguar se as ofertas de um produto (ou do dono delas) ainda estão no catálogo afiliado / no estoque marcado, respeitando frescor e limites da Shopee.
_Avoid_: stock check genérico, sync, crawl

**Visão Links**:
O que a conta autenticada vê e edita na área Links: cabeçalho da bio, lista de produtos com estado de estoque legível, formulário de ofertas.
_Avoid_: dashboard, workspace genérico, WorkspaceView como conceito de negócio

**Página de bio**:
Página pública `/p/<código>` com título, descrição, foto e produtos visíveis ainda clicáveis (“Ver oferta”).
_Avoid_: linktree, profile page

**Estoque marcado**:
Estado manual `em estoque` / `esgotado` por oferta; vale até uma conferência automática bem-sucedida (ou permanece se a automática não puder rodar).
_Avoid_: cache, flag
