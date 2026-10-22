# Linka na Magalu + Cloudflare

Produção neste recorte é a VM da Magalu (Docker Compose) com um arquivo SQLite. A Cloudflare fica na frente (DNS/TLS), não como Workers/Containers.

## Variáveis

Copie `.env.example` para `.env` na VM. Obrigatórias:

- `BETTER_AUTH_URL` — origem HTTPS pública, por exemplo `https://linka.seudominio.com`. Better Auth usa isso em callback, CSRF (`trustedOrigins`) e cookies.
- `BETTER_AUTH_SECRET` — segredo aleatório com 32 bytes ou mais.
- `SQLITE_PATH` — no Compose já vai ` /data/linka.sqlite` no volume.

Não defina `DATABASE_URL` nesta VM (isso seleciona Neon). Não defina `GROK_AUTH_CLIENT_ID` / `GROK_AUTH_CLIENT_SECRET` até ter OAuth próprio; sem eles o login é só e-mail e senha.

## Hostname próprio

Use um hostname só da Linka (`linka.seudominio.com`). Cookies `__Host-grok-auth.*` exigem HTTPS, `Path=/` e nenhum atributo `Domain`. Um path (`seudominio.com/linka`) quebra a sessão.

## Compose ao lado dos outros projetos

```sh
docker compose -p linka up -d --build
```

O serviço `app` escuta na rede Docker na porta **3000** e **não** publica 80 nem 443.

### Já existe nginx / Caddy / Traefik

Aponte o vhost HTTPS para `http://linka-app-1:3000` (ou o nome do container na rede compartilhada). Deixe o serviço `cloudflared` comentado.

### Não existe proxy

1. Crie um Tunnel no Zero Trust da Cloudflare.
2. Descomente `cloudflared` no `docker-compose.yml`.
3. Coloque `TUNNEL_TOKEN` no `.env`.
4. Roteie o hostname para `http://app:3000`.

## Cache

`/r/$code` responde 302 com `cache-control: no-store` para reavaliar estoque. Na Cloudflare, **desligue o cache** para:

- `/r/*`
- `/api/*`

Cache Rule (exemplo): se URI Path começa com `/r/` ou `/api/` → Cache eligibility Bypass.

## Cutover

O SQLite começa vazio. Não há dump da Neon.

1. Staging (`linka-staging.…`): criar conta e-mail/senha, um produto, abrir `/r/codigo`, `docker compose restart`, conferir que o produto continua.
2. `GET /api/health` deve devolver `{"ok":true,...}`.
3. Apontar o hostname de produção para o Tunnel ou o proxy.
4. Só então desligar o projeto na Vercel nesse domínio.

## Rollback

Aponte o DNS de volta para a Vercel. O arquivo SQLite na Magalu não escreve na Neon.

## Backup

Copie `/data/linka.sqlite` (e `-wal` / `-shm` se existirem) para fora da VM. Em validação, um `sqlite3 /data/linka.sqlite ".backup /backup/linka.sqlite"` no cron basta.
