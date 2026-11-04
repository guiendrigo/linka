# Decisão do link ≠ Conferência de estoque

A visita pública (`/r`, `/api/r`) precisa de uma **Decisão do link** profunda (freshen atual → load → override demo → resolve → gate https → kind). A **Conferência de estoque** (freshness, cap, cooldown, catálogo afiliado) é outro módulo profundo, aprofundado depois, não engolido pelo public-resolve.

Unir os dois num único “módulo público” concentraria depth demais num interface largo e misturaria HTTP/visita com orquestração Shopee. Manter `freshenStoredStock` atrás do IO da Decisão do link no primeiro passo, e trocar esse adapter quando a Conferência de estoque ganhar `freshenForCode` / `freshenForUser`.
