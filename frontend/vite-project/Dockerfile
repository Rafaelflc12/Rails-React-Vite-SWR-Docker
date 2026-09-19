# Multi-stage: compila o React e serve os arquivos estáticos com Nginx.
#
# Stage 1 tem Node (para o `vite build`); Stage 2 é só o Nginx com o `dist/`,
# então a imagem final fica pequena e sem node_modules.

# ---- Stage 1: build ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala as dependências primeiro (camada cacheada: só refaz quando muda)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o código e gera o build de produção (dist/)
COPY . .
RUN yarn build

# ---- Stage 2: servir ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
