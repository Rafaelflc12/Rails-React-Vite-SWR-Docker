# Plano de Refatoração e Arquitetura — Rails + React + Docker

> Projeto: `Rails-React-Vite-SWR-Docker` (petshop "chiara_system")
> Objetivo: reorganizar o projeto para a arquitetura "correta" de uma aplicação **Rails API + React SPA + Docker**, mantendo o padrão de código atual mas evoluindo de forma profissional — para aprendizado e, depois, publicação como portfólio.

---

## 1. Diagnóstico atual

O projeto já tem a espinha dorsal certa (Rails 7.1 + React 19/Vite 8/SWR + Docker + Nginx + Postgres), mas está com inconsistências que impedem ele de rodar do jeito certo. Abaixo, os problemas agrupados por área, com os arquivos reais.

### 1.1 Versões de Ruby conflitantes

| Arquivo | Valor |
|---|---|
| `Gemfile` (linha 3) | `ruby "3.2.11"` |
| `.ruby-version` | `ruby-3.0.0` |
| `Gemfile.lock` | `ruby 3.0.0p0` |
| `Dockerfile` | `ruby:3.2-slim` |

**Por que é problema:** cada ferramenta (rbenv/rvm, Bundler, Docker) lê uma versão diferente. Isso causa falhas de "your Ruby version is X, but your Gemfile specified Y" e deixa o projeto não-reprodutível. Deve haver **uma única fonte de verdade**.

### 1.2 Frontend em triplicata

- `frontend/package.json` + `frontend/yarn.lock` — **órfãos** (React 18 / Vite 5), não usados por nada (o Docker aponta para `frontend/vite-project`).
- `frontend/vite-project/` — o frontend **real** (React 19 / Vite 8 / Tailwind 4 / SWR).
- `frontend/vite-project/srcantigo/` — cópia do código antigo, com **imports quebrados** (referencia `../src/components/produtos/produtos` que não existe, `../types/product` que não existe, e `App.tsx` com erro de sintaxe).

**Por que é problema:** código morto confunde, polui o repositório e dá falsa sensação de "há mais coisa do que realmente funciona".

### 1.3 Sem build de produção (roda dev no Docker)

- `frontend/vite-project/Dockerfile.front` roda `CMD ["yarn", "dev", "--host", "--port", "8080"]`.
- `docker-compose.yml` (serviço `frontend`) roda `yarn install && yarn dev --host --port 8080`.
- `nginx/nginx.conf` só tem `location / { proxy_pass http://web; }` — **não serve o React**.
- `app/controllers/home_controller.rb` faz `render file: Rails.root.join('public', 'index.html')`, mas **`public/index.html` não existe**.

**Por que é problema:** em produção não se roda servidor de desenvolvimento (lento, inseguro, não otimizado). O correto é gerar o build estático (`vite build` → `dist/`) e servir via Nginx. Hoje o app nem chega a funcionar de ponta a ponta pela porta 80.

### 1.4 Descompasso de dados (front ↔ back)

- `frontend/vite-project/src/types/produto.ts` espera os campos `brand`, `animal`, `weight`, `image`, `rating`, `originalPrice`.
- `app/controllers/produto/produtos_controller.rb` permite `:brand, :animal, :weight, :image, :rating`.
- Mas a tabela `produto_produtos` (migrations + `db/schema.rb`) só tem: `nome`, `descricao`, `preco`, `estoque`, `produto_categoria_id`.
- `src/api/produtos.ts` chama `fetchBrands()` → `GET /api/produto/brands`, que **não existe** em `config/routes.rb`.
- O `index` do controller só faz `Produto::Produto.all` — os filtros `animal`/`brand` do front **não são implementados**.

**Por que é problema:** o `POST` do front envia campos que o Rails aceita mas que não têm coluna no banco (falha ao salvar). É o clássico "o código está à frente do banco".

### 1.5 `api_only = true` conflitante

- `config/application.rb` define `config.api_only = true`, **mas** o projeto ainda tem: sprockets (asset pipeline), views `.jbuilder`, `app/views/layouts/application.html.erb`, e `home_controller` renderizando HTML.

**Por que é problema:** `api_only` é para API JSON pura. Manter asset pipeline + jbuilder + HTML junto indica que a decisão "é API ou é app fullstack?" nunca foi feita de verdade.

### 1.6 Configurações quebradas

- **CORS**: `rack-cors` está no Gemfile, mas **não existe** `config/initializers/cors.rb`.
- **Banco**: `docker-compose.yml` define `DATABASE_URL`, mas `config/database.yml` lê `ENV['DATABASE_NAME/USER/PASSWORD/HOST/PORT']` — nomes diferentes → conexão não é feita como esperado.
- **Entrypoint**: `entrypoints/docker-entrypoint.sh` **não executa `exec "$@"`**, então o `command` do compose é ignorado.
- **`init.sql`**: cria a tabela `produtos` e o usuário manualmente, conflitando com as migrations (a tabela aparece no `schema.rb` sem migration correspondente).
- **PostgreSQL instalado dentro da imagem do app** (`Dockerfile` instala `postgresql postgresql-contrib`), redundante com o serviço `db`.
- **`secret_key_base = '1234'` hardcoded** em `config/environments/production.rb`.
- **Partials jbuilder com caminho errado**: `app/views/produto/produtos/index.json.jbuilder` referencia `partial: "produto_produtos/produto_produto"`, mas o arquivo real é `app/views/produto/produtos/_produto_produto.json.jbuilder` (mesmo problema em `base`, `estoque`, `categoria`).
- **Arquivos mortos commitados**: `db/development.sqlite3`, `db/test.sqlite3` (+ `.sqlite3-wal/shm`), `bin/webpack`, `bin/webpack-dev-server` (sem a gem Webpacker), `app/views/aplication/` (typo, órfão).
- **`config/importmap.rb`** referencia `app/javascript/controllers`, que **não existe**.

### 1.7 Models com associações erradas

- `app/models/produto/produto.rb`: `belongs_to :produto_categoria, class_name: 'Categoria'` (classe sem namespace).
- `app/models/estoque/pedido.rb`: `belongs_to :base_usuarios` (no plural, sem `class_name`).
- `app/models/estoque/pedido_item.rb`: `belongs_to :estoque_pedidos` e `belongs_to :produto_produtos` (no plural).
- `app/models/base/usuario.rb`: tem coluna `password_digest` mas **sem** `has_secure_password` (e a gem `bcrypt` não está no Gemfile).

### 1.8 Zero de CI / linters / testes reais

- Sem `.github/workflows`, sem CI.
- Sem `.rubocop.yml` no backend; ESLint legado (`.eslintrc.cjs`, formato antigo) no front.
- Testes: só scaffolds Minitest gerados, com corpos **em branco/comentados** (`test/models/*`).
- Frontend: `@types/react-router-dom ^5.3.3` incompatível com `react-router-dom ^7`; `components.json` em padrão **Next.js** (`"rsc": true`, `"css": "app/globals.css"`) que não casa com Vite; várias deps shadcn instaladas mas não usadas.
- Sem `.env.example`, sem documentação de setup (README é o template do Rails vazio).

---

## 2. Arquitetura-alvo

A decisão de arquitetura (alinhada com você): **Rails como API JSON pura + Nginx servindo o build do React**.

### 2.1 Diagrama (fluxo em produção)

```
         ┌─────────────┐
 Usuário │  Navegador  │
         └──────┬──────┘
                │ HTTPS (porta 80/443)
         ┌──────▼──────┐
         │    NGINX    │  ← borda única: serve SPA e faz proxy da API
         └──┬────────┬─┘
            │        │
   serve dist/        │ proxy_pass /api → http://web:3000
   (React estático)   │
            │        │
            │   ┌────▼────┐   ┌────────────┐
            │   │  Rails  │──▶│ Postgres   │
            │   │  (API)  │   │ (db:5432)  │
            │   └─────────┘   └────────────┘
            └─ React SPA faz fetch em /api (mesma origem, sem CORS em prod)
```

### 2.2 Papel de cada peça

| Peça | Responsabilidade |
|---|---|
| **Rails** | Só a API: recebe JSON, valida, persiste no Postgres, devolve JSON. Não renderiza HTML, não serve assets. |
| **React + Vite** | Só a interface: SPA em TypeScript, com SWR para cache de dados. Em produção é compilada para arquivos estáticos (`dist/`). |
| **Nginx** | Borda de entrada. Serve os arquivos estáticos do React (com `try_files ... /index.html` para as rotas do SPA) e repassa `/api` para o Rails. Também é onde entram HTTPS/certificados. |
| **Postgres** | Banco de dados (container `db`). |
| **Docker Compose** | Orquestra os serviços localmente e (depois) em deploy. |

### 2.3 Por que essa divisão?

- **Separação clara de responsabilidades**: o Rails não precisa saber de React, e o React não precisa saber de Rails — só falam por HTTP/JSON em `/api`.
- **Deploy e escala independentes**: dá para cachear o front no CDN, escalar a API sozinha, etc.
- **É o padrão de mercado** para "Rails API + React SPA" e é o que recrutadores esperam ver.

---

## 3. Estrutura de diretórios alvo

### 3.1 Backend (raiz do projeto, Rails API)

```
Rails-React-Vite-SWR-Docker/
├── app/
│   ├── controllers/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── produtos_controller.rb
│   │   │       ├── categorias_controller.rb
│   │   │       ├── usuarios_controller.rb
│   │   │       └── ...
│   │   └── application_controller.rb      # ActionController::API
│   ├── models/                             # Produto, Categoria, Usuario, Pedido, PedidoItem
│   ├── serializers/                        # (opcional) serialização consistente
│   └── services/                           # (opcional) regras de negócio
├── config/
│   ├── routes.rb                           # namespace :api -> :v1
│   ├── database.yml                        # usa DATABASE_URL
│   └── initializers/cors.rb                # CORS configurado
├── db/migrate/                             # migrations (colunas reais)
├── spec/                                   # RSpec (request specs, models, factories)
├── .ruby-version                           # 3.2.11 (única fonte de verdade)
├── Gemfile                                 # rails 7.1, pg, bcrypt, rack-cors, rspec...
├── Dockerfile                              # multi-stage, sem PostgreSQL embutido
├── docker-compose.yml
├── .env.example
└── planejamentos/                          # (este documento)
```

### 3.2 Frontend (`frontend/`, raiz única)

```
frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # rotas
│   ├── api/                    # client HTTP (produtos.ts, client.ts)
│   ├── hooks/                  # useProdutos, useBrands (SWR)
│   ├── pages/                  # Home, ProductsPage
│   ├── components/             # Header, Footer, FilterBar, produtos/*
│   ├── types/                  # produto.ts
│   └── lib/                    # utils.ts
├── public/                     # favicon.svg etc.
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig*.json
├── .env.example                # VITE_API_BASE_URL
└── Dockerfile                  # multi-stage (build → nginx/alpine)
```

> A pasta `srcantigo/`, o `frontend/package.json`/`yarn.lock` órfãos e o aninhamento `frontend/vite-project/` somem — fica só `frontend/`.

---

## 4. Roadmap de refatoração (fases)

> Cada fase é independente e testável. Execute em ordem. "Mudanças" = o que fazer; "Por quê" = o aprendizado.

### Fase 0 — Limpeza de baseline

**Objetivo:** deixar o projeto num estado limpo e reprodutível antes de qualquer mudança estrutural.

Mudanças:
- Unificar Ruby em **3.2.x**: ajustar `.ruby-version` para `ruby-3.2.11` (e rodar `bundle update` para regenerar o lock na versão certa).
- Revisar `.gitignore` (remover duplicações de `/node_modules`, `yarn-error.log`) e garantir que `db/*.sqlite3*`, `config/master.key`, `.env` estejam ignorados.
- Remover arquivos mortos:
  - `frontend/package.json`, `frontend/yarn.lock` (órfãos).
  - `frontend/vite-project/srcantigo/` (inteiro).
  - `db/development.sqlite3`, `db/test.sqlite3` e `-wal/-shm`.
  - `bin/webpack`, `bin/webpack-dev-server`.
  - `app/views/aplication/` (typo órfão).
  - `config/importmap.rb` (não há `app/javascript/`).

**Por quê:** começar limpo evita arrastar decisões antigas. É o "commit de higiene" que torna o diff das próximas fases legível.

### Fase 1 — Rails API pura

**Objetivo:** transformar o Rails num backend JSON consistente.

Mudanças:
- Confirmar `config.api_only = true` e **remover** o que sobra de fullstack: sprockets (`config.assets`), views `.jbuilder`, `app/views/*`, `sprockets-rails`/`jbuilder`/`importmap-rails`/`turbo-rails`/`stimulus-rails` do Gemfile.
- Mover controladores para `app/controllers/api/v1/` e reescrever `config/routes.rb`:
  ```ruby
  namespace :api do
    namespace :v1 do
      resources :produtos
      resources :categorias
      resources :usuarios
      resources :pedidos
      resources :pedido_items
    end
  end
  ```
- `ApplicationController < ActionController::API`.
- **Serialização consistente**: escolher UM jeito (recomendo `render json:` com um serializer simples/`as_json`, ou jbuilder corrigido se preferir views) e aplicar em todos os controllers.
- **Corrigir os models**:
  - `Produto::Produto`: `belongs_to :categoria, class_name: 'Produto::Categoria', foreign_key: :produto_categoria_id`.
  - `Estoque::Pedido`: `belongs_to :usuario, class_name: 'Base::Usuario', foreign_key: :base_usuario_id`.
  - `Estoque::PedidoItem`: `belongs_to :pedido, class_name: 'Estoque::Pedido', foreign_key: :estoque_pedido_id` e `belongs_to :produto, class_name: 'Produto::Produto', foreign_key: :produto_produto_id`.
  - `Base::Usuario`: adicionar `has_secure_password` + gem `bcrypt`.
- **Criar as migrations das colunas faltantes** em `produto_produtos`: `brand`, `animal`, `weight`, `image`, `rating`, `original_price` (decimal) — para casar com o front.
- **Implementar filtros** no `ProdutosController#index` (`animal`, `brand`) e o endpoint `GET /api/v1/brands`.
- **CORS**: criar `config/initializers/cors.rb` (necessário só para dev quando o Vite chama por outra origem; em produção com Nginx na mesma origem, fica redundante mas inofensivo).

**Por quê:** `api_only` + `ActionController::API` removem middleware desnecessário (cookies/sessão/CSRF) e deixam a API leve. Namespace `/api/v1` permite versionar a API no futuro. Associações corretas (`foreign_key` explícito) evitam o Rails adivinhar errado.

### Fase 2 — Frontend limpo

**Objetivo:** ter UM frontend consistente que compila e chama a API certa.

Mudanças:
- Unificar a raiz: mover `frontend/vite-project/*` para `frontend/` (ou simplesmente apagar os órfãos e adotar `frontend/` como raiz).
- Corrigir `components.json` para Vite (remover `"rsc": true`, `"css": "app/globals.css"`, apontar para `src/`).
- Corrigir `@types/react-router-dom` para v7 (ou remover, já que o router v7 traz tipos próprios).
- Corrigir rotas: `Link to="/products"` (o `Home.tsx` hoje aponta para `/produtos`, que não existe).
- Adicionar `public/favicon.svg` e referenciar corretamente no `index.html`.
- **`.env` para a base URL**: usar `VITE_API_BASE_URL` (ex.: `/api/v1`) em vez de hardcoded `'/api/produto'`.
- Remover deps shadcn **não usadas** (react-hook-form, zod, recharts, date-fns, sonner, vaul, cmdk, embla, input-otp, react-day-picker, react-resizable-panels) e o `styles/globals.css` morto.

**Por quê:** um único `package.json`/lock evita "qual deles vale?". `.env` com `VITE_*` é o jeito Vite de configurar por ambiente (dev aponta pro proxy, prod aponta pra `/api`).

### Fase 3 — Docker + Nginx (o coração do deploy)

**Objetivo:** build de produção de verdade, com Nginx na frente.

Mudanças:
- **Dockerfile do frontend multi-stage**:
  ```dockerfile
  # Stage 1: build
  FROM node:22-alpine AS build
  WORKDIR /app
  COPY package.json yarn.lock ./
  RUN yarn install --frozen-lockfile
  COPY . .
  RUN yarn build
  # Stage 2: servir
  FROM nginx:alpine
  COPY --from=build /app/dist /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  ```
- **Dockerfile do Rails**: remover a instalação de PostgreSQL (`postgresql postgresql-contrib`) — o banco vive no serviço `db`. Manter só as libs de compilação (`libpq-dev`).
- **Corrigir entrypoint**: `entrypoints/docker-entrypoint.sh` deve terminar com `exec "$@"` para respeitar o `command` do compose.
- **Alinhar variáveis de banco**: fazer `config/database.yml` usar `ENV.fetch("DATABASE_URL")` (Rails 7.1 já suporta nativamente) ou definir as ENVs `DATABASE_NAME/USER/...` no compose — escolher um e só um.
- **`nginx/nginx.conf`**:
  ```nginx
  server {
    listen 80;
    root /usr/share/nginx/html;
    location / { try_files $uri /index.html; }       # SPA
    location /api/ { proxy_pass http://web:3000; }    # Rails
  }
  ```
- **Criar `.env.example`** na raiz (e `.env` fora do git) com as variáveis reais.
- No compose, o serviço `frontend` vira um build que gera a imagem Nginx (ou o Nginx é um serviço próprio que consome o `dist/`).

**Por quê:** multi-stage build deixa a imagem final pequena (só o `dist/` + nginx, sem Node/npm). `try_files ... /index.html` faz o SPA responder em qualquer rota (o React Router cuida do resto). Remover o Postgres da imagem do app respeita "um processo por container".

### Fase 4 — Testes, linters e CI

**Objetivo:** dar confiança para evoluir e impressionar como portfólio.

Mudanças:
- **RSpec + FactoryBot**: adicionar `rspec-rails`, `factory_bot_rails`; remover o Minitest; escrever request specs dos endpoints e model specs.
- **RuboCop**: adicionar `rubocop` + `rubocop-rails` e um `.rubocop.yml` básico.
- **ESLint flat config** + Prettier no frontend, com script `lint` funcional.
- **GitHub Actions** (`.github/workflows/ci.yml`): jobs de `rubocop`, `rspec` (com serviço Postgres) e `yarn build`.

**Por quê:** testes request specs garantem que a API responde o que o front espera (fecha o descompasso da seção 1.4). CI roda isso automaticamente a cada push. É o que separa "projeto de estudo" de "portfólio".

### Fase 5 — O que fica para o próximo plano (desenvolvimento)

Estes itens **não são refatoração** — são novas features/deploy, para o seu "plano de desenvolvimento":
- **Deploy** (Fly.io, Render ou uma VM com Docker Compose + HTTPS via Caddy/Nginx + Let's Encrypt).
- **Autenticação** real (login/token JWT ou Devise API + Devise-JWT).
- **Redis + Sidekiq** para jobs em background.
- **Paginação** (Kaminari/Pagy) e ordenação na API.
- **Docker Hub / GHCR** para publicar as imagens.

---

## 5. Explicações educativas (o "me explique tudo")

### `api_only = true` e `ActionController::API`
O modo `--api` do Rails gera uma app **só de API**: sem views, sem asset pipeline, sem cookies/sessão/CSRF (que só fazem sentido com formulários HTML). O controller base vira `ActionController::API` em vez de `ActionController::Base`, removendo middleware desnecessário. Se o projeto é "Rails API + React separado", esse é o modo certo.

### CORS
O navegador bloqueia requisições de uma origem para outra (ex.: React em `localhost:8080` chamando Rails em `localhost:3000`). CORS é o mecanismo que permite isso explicitamente. Em **dev** você precisa dele (ou usa o proxy do Vite). Em **produção**, com Nginx servindo o SPA e `/api` na **mesma origem**, CORS deixa de ser necessário — por isso o Nginx na frente é elegante.

### Proxy reverso (Nginx)
Nginx fica na "porta da frente" e decide para onde manda cada requisição: `/` → arquivos estáticos, `/api` → Rails. Isso centraliza HTTPS, uma porta só para o mundo, e esconde os containers internos (`web`, `db`). É o mesmo papel do `server.proxy` do Vite, só que em produção.

### Multi-stage build (Docker)
Num `Dockerfile` multi-stage, você usa uma imagem "gorda" (com Node e as deps) só para **compilar**, e copia o resultado (`dist/`) para uma imagem final "magra" (ex.: `nginx:alpine`). A imagem final não carrega Node/npm/node_modules → fica pequena e segura.

### `DATABASE_URL`
É uma variável de ambiente padrão que encapsula toda a conexão (`postgresql://user:pass@host:port/db`). Rails 7.1 já lê ela nativamente no `database.yml`. Ter **uma** fonte de verdade (ou `DATABASE_URL`, ou as ENVs separadas — nunca as duas ao mesmo tempo com nomes divergentes) evita o banco errado na hora errada.

### Serialização JSON
Quando o Rails responde JSON, você escolhe **como** transformar o objeto Ruby em JSON. Opções: `render json:` direto (simples), `jbuilder` (views .jbuilder), ou serializers (`active_model_serializers`, `jsonapi-serializer`). Para um projeto de aprendizado, o mais didático é começar com `render json:` explícito e evoluir para um serializer quando o payload crescer. O importante é **consistência** — o projeto atual mistura `render json:` com jbuilder, o que gera comportamento imprevisível.

### Por que separar front e back?
- Cada lado evolui no seu ritmo e na sua linguagem.
- O contrato entre eles é só o JSON em `/api`.
- Fica mais fácil testar cada lado isoladamente e escalar/​deployar de forma independente.
- É o modelo dominante hoje (o "fullstack" agora costuma ser "API + SPA", não Rails renderizando HTML).

---

## 6. Recomendações

1. **Uma fonte de verdade por decisão**: uma versão de Ruby, um `package.json`, um jeito de serializar, uma forma de configurar o banco. A duplicação foi o maior vilão deste projeto.
2. **Nunca hardcodar segredos**: `secret_key_base` deve vir de `ENV`/`Rails.credentials`, nunca `'1234'` no código (o commit de hoje deixa o segredo no histórico do git).
3. **Comprometa-se cedo com testes**: escreva o request spec **antes** de fechar cada endpoint. É o teste que segura o descompasso front↔back.
4. **`.env.example` + `.env` fora do git**: documenta o que cada ambiente precisa sem vazar segredos.
5. **CI desde já**: mesmo um GitHub Actions simples (lint + test + build) dá credibilidade de portfólio e pega regressões.
6. **Aprenda lendo o que gerou**: ao rodar `rails g scaffold`, `vite` e `docker`, leia os arquivos gerados com calma — é aí que mora o aprendizado.
7. **Próximo plano (desenvolvimento)**: foque primeiro em **deploy funcional** (uma URL no ar vale mais que 10 features), depois autenticação, depois polish.

---

## Verificação de cada fase

- **Fase 0**: `git status` limpo (sem arquivos mortos); `ruby -v` e `.ruby-version` batem.
- **Fase 1**: `bin/rails routes | grep api` mostra `/api/v1/*`; `bundle exec rails db:migrate` roda sem errar as colunas novas; `curl localhost:3000/api/v1/produtos` devolve JSON.
- **Fase 2**: `yarn build` gera `dist/` sem erros de type; rotas funcionam (`/`, `/products`).
- **Fase 3**: `docker compose up --build` sobe tudo; acessar `http://localhost` serve o SPA e `/api` responde via Nginx.
- **Fase 4**: `bundle exec rspec` verde; `bundle exec rubocop` sem ofensas; Actions verdes no GitHub.
