# Use a imagem base oficial do Ruby
FROM ruby:3.0.0

# Instale dependências do sistema operacional necessárias
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev curl nano && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    apt-get clean

# Instale o PostgreSQL
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib && \
    apt-get clean


# Crie e configure o diretório de trabalho
WORKDIR /app

# Copie o Gemfile e o Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Instale as dependências do bundler
RUN bundle install

# Copie o restante do código da aplicação
COPY . .

# Execute as instruções adicionais necessárias
# (exemplo: pré-compilar assets, etc)
RUN bundle exec rails assets:precompile


# Crie o usuário rafael com um shell bash e defina uma senha
RUN useradd -ms /bin/bash rafael

# Mude o proprietário do diretório /app para o usuário rafael
RUN chown -R rafael:rafael /app

# Defina o usuário padrão como rafael
USER rafael

# Defina a porta que a aplicação vai rodar
EXPOSE 3000
# Comando para iniciar a aplicação
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]

ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]