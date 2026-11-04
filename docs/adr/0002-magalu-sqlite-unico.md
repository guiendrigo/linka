# Magalu SQLite único

Produção e desenvolvimento do Linka usam só SQLite (`SQLITE_PATH`). Neon, PGLite e o preset Vercel foram rejeitados de propósito: mantê-los exigia duas árvores de migration, três backends em `getSql()` e chrome de preview Grok que não é o deploy real (`linka.guiendrigo.com` / Docker Magalu).

**Considered:** manter dual Postgres+SQLite para preview Grok; migrar Magalu para Neon. **Rejected:** complexidade operacional maior que o ganho no beta.

**Consequences:** Mac desenvolve com `SQLITE_PATH=./.local/linka.sqlite`; Magalu com `/data/linka.sqlite`. Schema só em `migrations/sqlite/`.
