# Estágio 1: Build da aplicação React (Frontend)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência do frontend
COPY frontend/package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o código fonte do frontend
COPY frontend/ ./

# Compila a aplicação para arquivos estáticos de produção
RUN npm run build

# Estágio 2: Servidor Web Nginx ultra-leve
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada do Nginx com Gzip, Rate Limiting e Cache
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 para o Traefik / Web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
