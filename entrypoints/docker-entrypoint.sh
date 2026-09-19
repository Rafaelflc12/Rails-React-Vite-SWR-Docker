#!/bin/sh
set -e

# Remove pid antigo (evita "A server is already running")
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

# Cria o banco (se não existir) e roda as migrations
bundle exec rails db:prepare

# Executa o comando passado ao container (o CMD do Dockerfile/compose)
exec "$@"
