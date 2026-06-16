---
name: testing-app
description: Como rodar e testar o app de gestao financeira end-to-end localmente (backend Express+Prisma+Postgres e frontend Expo Web). Use ao testar fluxos de transacoes, categorias ou resumo.
---

# Rodar e testar o app localmente

Monorepo: frontend Expo (raiz) + backend em `backend/`.

## 1. Banco de dados (Postgres via Docker)

```bash
docker run -d --name gf-postgres \
  -e POSTGRES_PASSWORD=devpass -e POSTGRES_USER=postgres -e POSTGRES_DB=gestao_financeira \
  -p 5432:5432 postgres:16
```

Ajuste `backend/.env` para a senha do container (apenas senha de dev local):
`DATABASE_URL="postgresql://postgres:devpass@localhost:5432/gestao_financeira"`

## 2. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy   # aplica migrations
npm run db:seed             # insere 5 categorias padrao (Renda, Alimentacao, Casa, Educacao, Viagens)
npm run dev                 # sobe em http://localhost:3000
```

Healthcheck: `curl http://localhost:3000/` deve retornar `{"status":"ok"...}`.

Contrato (verificado):
- `POST /transactions` -> `{ description, value (number>0), date (ISO), categoryId (UUID), type: "INCOME"|"EXPENSE" }`
- `POST /categories` -> `{ name (slug lowercase), displayName, icon, color (#RRGGBB, opcional) }`
- `GET /transactions`, `GET /categories`, `DELETE /:id`. **Nao existe PUT/PATCH** para transacoes (edit-transaction da 404).

## 3. Frontend (Expo Web para testar no navegador)

```bash
npx expo start --web --port 8082
```

**Importante:** `services/api.ts` usa `baseURL: "http://10.0.2.2:3000"` (alias do host no emulador Android). Para testar no **Expo Web**, troque temporariamente para `http://localhost:3000` e **nao commite** essa mudanca.

## 4. Login e navegacao

- Login e so por nome (sem senha); fica salvo em AsyncStorage. `RouterGuard` em `app/_layout.tsx` redireciona: sem nome -> `/login`, com nome -> `/(tabs)`.
- Abas: Transacoes (`/`), Adicionar (`+`, `/add-transactions`), Resumo (`/summary`).
- **`/categories` nao tem botao/link no app** e o `RouterGuard` redireciona deep-links para `/(tabs)`. Para testar a tela, desabilite temporariamente o redirect do guard.
- Lista/Resumo buscam dados so na montagem; de reload para ver dados novos apos adicionar.

## Checks

```bash
npx tsc --noEmit   # 0 erros
npx expo lint      # 0 problemas
```
