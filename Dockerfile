# Imagem de produção da API Rails.
#
# O Postgres vive em um container separado (serviço `db` no compose), então aqui
# só entram as libs necessárias para compilar as gems nativas (o `pg` precisa do
# `libpq-dev`, que é o cliente do Postgres). Sem Node/Yarn: a API não tem asset
# pipeline (api_only), então não há o que pré-compilar.

FROM ruby:3.3.10-slim

# Dependências do SO para compilar gems nativas (gcc/make + cliente libpq)
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instala as gems primeiro — camada cacheada: só refaz quando Gemfile/Gemfile.lock mudam
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copia o restante do código
COPY . .

EXPOSE 3000

# O entrypoint cuida do db:prepare e repassa o CMD para o processo principal
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]
