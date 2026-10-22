# Subir a Linka na Magalu Cloud

Domínio: `linka.guiendrigo.com` (zona na Cloudflare).  
App: Docker Compose na VM. Caddy na frente, na 80/443. SQLite no volume. Login só e-mail/senha.

O banco Neon da Vercel **não** vem junto. Produção nesta VM começa vazia.

---

## 0. O que você precisa ter

- VM na Magalu com IP público, Docker e Docker Compose.
- Caddy já servindo (ou você instala) **no host**, na 80 e 443 — o mesmo Caddy dos outros projetos.
- Acesso SSH.
- Conta Cloudflare na zona `guiendrigo.com`.
- Código da Linka neste repositório.

Firewall / security group da Magalu: **22, 80, 443**. Não abra a 3000 para a internet.

---

## 1. Cloudflare — DNS

No dashboard da zona `guiendrigo.com`:

1. **DNS → Records → Add record**
   - Type: `A`
   - Name: `linka`
   - IPv4: IP público da VM Magalu
   - Proxy status: **Proxied** (nuvem laranja)
   - TTL: Auto

Fica `linka.guiendrigo.com` → Cloudflare → sua VM.

2. **SSL/TLS → Overview**
   - Encryption mode: **Full (strict)**  
     Não use Flexible. Os cookies `__Host-grok-auth.*` exigem HTTPS de ponta a ponta.

3. **SSL/TLS → Edge Certificates**
   - Always Use HTTPS: On

4. **Caching → Cache Rules → Create rule** (obrigatório)

   O smart link `/r/...` é 302 com `cache-control: no-store`. Se a Cloudflare cachear, o estoque fica errado.

   - Rule name: `linka bypass app`
   - When incoming requests match:
     - Field: URI Path
     - Operator: starts with
     - Value: `/r/`
     - Or URI Path starts with `/api/`
   - Then: Cache eligibility → **Bypass cache**
   - Deploy

Se a UI pedir um único path, faça duas rules: uma `/r/`, outra `/api/`.

---

## 2. Certificado no Caddy (escolha uma)

A nuvem laranja quebra o HTTP-01 do Let's Encrypt na primeira emissão. Use um destes.

### Opção A — Origin Certificate da Cloudflare (recomendado com proxy laranja)

1. Cloudflare → **SSL/TLS → Origin Server → Create Certificate**
   - Hostnames: `linka.guiendrigo.com`
   - Validity: 15 years
   - Key format: PEM
2. Salve na VM, só root lê:

```sh
sudo mkdir -p /etc/caddy/certs
sudo nano /etc/caddy/certs/linka.pem      # certificado
sudo nano /etc/caddy/certs/linka.key      # chave privada
sudo chmod 600 /etc/caddy/certs/linka.key
sudo chown caddy:caddy /etc/caddy/certs/linka.*   # ou o user do Caddy
```

### Opção B — Let's Encrypt, DNS cinza só na emissão

1. No DNS da Cloudflare, deixe o recorde `linka` **DNS only** (nuvem cinza).
2. Suba o Caddy com o bloco da seção 5 **sem** `tls` de origin.
3. Quando o certificado emitir, volte o recorde para **Proxied**.
4. SSL/TLS continua **Full (strict)**.

---

## 3. Código e `.env` na VM

```sh
ssh usuario@IP_DA_VM
sudo mkdir -p /opt/linka
sudo chown "$USER":"$USER" /opt/linka
cd /opt/linka
git clone SEU_REPO .
# ou rsync/scp do seu Mac
```

```sh
cd /opt/linka
cp .env.example .env
```

Edite `.env`:

```env
BETTER_AUTH_URL=https://linka.guiendrigo.com
BETTER_AUTH_SECRET=
SQLITE_PATH=/data/linka.sqlite
```

Gere o segredo e cole em `BETTER_AUTH_SECRET`:

```sh
openssl rand -hex 32
```

Não defina `DATABASE_URL`. Não defina `GROK_AUTH_*`. Login é e-mail e senha.

---

## 4. Compose: Caddy no host precisa alcançar a 3000

O `docker-compose.yml` só faz `expose: "3000"` (rede Docker). Caddy no host não entra aí. Publique a 3000 **só em loopback**.

No serviço `app`, acrescente:

```yaml
    ports:
      - "127.0.0.1:3000:3000"
```

Não publique `80:80` nem `443:443` neste compose. Isso é do Caddy.

Build e sobe:

```sh
cd /opt/linka
docker compose -p linka up -d --build
docker compose -p linka ps
curl -sS http://127.0.0.1:3000/api/health
```

Esperado: `{"ok":true,"service":"linka","stage":"foundation"}`.

A Magalu costuma ser `linux/amd64`. Se o build local foi no Mac ARM, **compile na VM**, não copie a imagem.

---

## 5. Caddyfile

Acrescente um site. Não apague os outros.

### Com Origin Certificate (opção A)

```caddy
linka.guiendrigo.com {
	tls /etc/caddy/certs/linka.pem /etc/caddy/certs/linka.key

	encode gzip
	header {
		-Server
	}

	reverse_proxy 127.0.0.1:3000
}
```

### Com Let's Encrypt (opção B, nuvem cinza na emissão)

```caddy
linka.guiendrigo.com {
	encode gzip
	header {
		-Server
	}

	reverse_proxy 127.0.0.1:3000
}
```

Validar e recarregar:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
# ou: sudo caddy reload --config /etc/caddy/Caddyfile
```

---

## 6. Conferir

Do seu computador, não da VM:

```sh
curl -sSI https://linka.guiendrigo.com/api/health
```

- Status 200
- Corpo com `"ok":true`
- Certificado ok (cadeado no browser)

No browser:

1. `https://linka.guiendrigo.com/login` — e-mail e senha, **sem** Google/X.
2. Criar conta, guardar um produto com oferta `https://...`.
3. Abrir `/r/CODIGO` — 302 para a oferta.
4. `docker compose -p linka restart` na VM — conta e produto continuam.

Headers do smart link:

```sh
curl -sSI https://linka.guiendrigo.com/r/CODIGO
```

Tem que ter `cache-control: no-store`. Se a Cloudflare devolver `cf-cache-status: HIT` em `/r/` ou `/api/`, a rule da seção 1 está errada.

---

## 7. Cutover da Vercel

Só depois da seção 6 verde:

1. Ninguém mais deve depender do hostname antigo da Vercel, **ou** você aponta `linka.guiendrigo.com` só agora (se o recorde já era este, já está na Magalu).
2. No projeto Vercel, remova o domínio `linka.guiendrigo.com` para não brigar no DNS.
3. SQLite da Magalu é outro banco. Usuários da Neon não migram.

Rollback: no Cloudflare, aponte o `A` de `linka` de volta para a Vercel (ou recoloque o CNAME da Vercel) e reanexe o domínio no projeto Vercel.

---

## 8. Backup

O arquivo vive no volume Docker `linka_linka-data` (nome: projeto `linka` + volume `linka-data`).

```sh
# achar o mount
docker volume inspect linka_linka-data

# cópia a quente (validação)
docker compose -p linka exec app node -e "
const Database = require('better-sqlite3');
const db = new Database('/data/linka.sqlite');
db.backup('/data/linka-backup.sqlite').then(() => { db.close(); console.log('ok'); });
"
```

Copie `/data/linka.sqlite`, e se existirem `linka.sqlite-wal` / `linka.sqlite-shm`, para fora da VM (outro disco, S3, etc.). Sem isso, um `docker compose down -v` apaga contas e produtos.

---

## Checklist rápido

- [x] `A` `linka` → IP Magalu, proxied
- [ ] SSL Full (strict) + Always HTTPS
- [ ] Cache bypass `/r/` e `/api/`
- [ ] `.env` com `BETTER_AUTH_URL=https://linka.guiendrigo.com` e secret de 32+ bytes
- [ ] Compose publica `127.0.0.1:3000:3000`
- [ ] `curl http://127.0.0.1:3000/api/health` na VM
- [ ] Site `linka.guiendrigo.com` no Caddyfile → `reverse_proxy 127.0.0.1:3000`
- [ ] `https://linka.guiendrigo.com/api/health` de fora
- [ ] Login e-mail/senha, produto, `/r/codigo`, restart
- [ ] Backup do SQLite combinado
