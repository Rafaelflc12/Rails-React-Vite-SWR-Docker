# Rails-React-Vite-SWR-Docker

Projeto de estudo com **Rails** (API JSON) no backend, **React + Vite** no frontend — usando **SWR** para cache e **React Router** para navegação — e **Docker** para empacotar e rodar tudo.

## Stack

| Camada    | Tecnologia                                                            |
| --------- | --------------------------------------------------------------------- |
| Backend   | Ruby 3.3.10, Rails 7.1 (api_only), PostgreSQL, Puma                   |
| Frontend  | React 19, TypeScript, Vite, SWR, React Router, Tailwind               |
| Infra     | Docker Compose (`web` + `db` + `frontend`) e Nginx servindo o build   |

## Estrutura

```
.
├── app/                    # API Rails (controllers em app/controllers/api/v1)
├── config/                 # routes.rb, database.yml, puma.rb, cors.rb
├── db/                     # migrations e seeds
├── entrypoints/            # docker-entrypoint.sh (db:prepare + puma)
├── frontend/
│   └── vite-project/       # app React + Vite (Dockerfile multi-stage + nginx.conf)
├── spec/                   # testes RSpec
├── Dockerfile              # imagem da API Rails
└── docker-compose.yml      # web (Rails) + db (Postgres) + frontend (Nginx)
```

## Pré-requisitos

- **Docker** e **Docker Compose** — caminho recomendado, sobe tudo.
- Para desenvolvimento local sem Docker: Ruby 3.3.10, Node 22 + Yarn e PostgreSQL.

## Rodando do zero (Docker — recomendado)

1. **Clone e entre no projeto:**

   ```bash
   git clone git@github.com:Rafaelflc12/Rails-React-Vite-SWR-Docker.git
   cd Rails-React-Vite-SWR-Docker
   ```

2. **Configure o ambiente** a partir do exemplo:

   ```bash
   cp .env.example .env
   ```

   Gere e preencha o `SECRET_KEY_BASE` (obrigatório em produção):

   ```bash
   openssl rand -hex 64
   ```

   Os valores de `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB` já têm defaults
   no compose — ajuste no `.env` apenas se quiser outros nomes/senhas.

3. **Suba os containers:**

   ```bash
   docker compose up --build
   ```

   Na primeira subida o entrypoint roda `rails db:prepare` automaticamente
   (cria o banco, se não existir, e aplica as migrations). O `db` só aceita o
   `web` depois do `healthcheck` do Postgres passar.

4. **Acesse:**

   - Frontend (React compilado, servido pelo Nginx): <http://localhost>
   - API: <http://localhost/api/v1/...> — o Nginx encaminha `/api/*` para o Rails
     (serviço `web`, porta 3000) sem reescrever a URI.

### Comandos úteis

```bash
docker compose up --build            # sobe (recompilando imagens)
docker compose up -d                 # sobe em background
docker compose logs -f web           # acompanha os logs do Rails
docker compose exec web bin/rails c  # console do Rails dentro do container
docker compose down                  # derruba os containers
docker compose down -v               # derruba e apaga o volume do banco (recria do zero)
```

## Desenvolvimento local (sem Docker)

Útil quando você quer hot-reload e iterar rápido, sem rebuild de imagem.

### Backend (Rails)

Com um PostgreSQL rodando localmente (o default de `config/database.yml` aponta para
`postgresql://rafael:password@localhost:5433/chiara_system` — sobrescreva com `DATABASE_URL`
se o seu for diferente):

```bash
bundle install
bin/rails db:prepare
bin/rails server          # escuta em http://localhost:3000
```

### Frontend (React + Vite)

```bash
cd frontend/vite-project
yarn install
yarn dev                  # dev server do Vite (http://localhost:5173)
```

O proxy de `/api` do Vite (`vite.config.ts`) aponta para `http://web:3000` — esse é o
nome do serviço na rede do Docker. Para rodar fora do Docker, troque o `target` para
`http://localhost:3000`.

## Testes e linters

### Backend

```bash
bundle exec rubocop     # linter
bundle exec rspec       # testes
```

### Frontend

```bash
cd frontend/vite-project
yarn lint               # ESLint
yarn build              # build de produção (vite build)
yarn format:check       # Prettier
```

O CI (`.github/workflows/ci.yml`) roda: RuboCop + RSpec (backend) e lint + build (frontend).

## Rotas da API

Tudo versionado sob `/api/v1`, retornando JSON:

| Recurso       | Endpoint                    | Ações                                   |
| ------------- | --------------------------- | --------------------------------------- |
| Produtos      | `/api/v1/produtos`          | `index`, `show`, `create`, `update`, `destroy` |
| Produtos      | `/api/v1/produtos/brands`   | `brands` (coleção)                      |
| Categorias    | `/api/v1/categorias`        | CRUD completo                           |
| Usuários      | `/api/v1/usuarios`          | CRUD completo                           |
| Pedidos       | `/api/v1/pedidos`           | CRUD completo                           |
| Itens de pedido | `/api/v1/pedido_items`    | CRUD completo                           |

Health check interno do Rails: `GET /up`.
