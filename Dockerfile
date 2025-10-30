# Usa Node específico
FROM node:22.14.0

# Diretório de trabalho
WORKDIR /app

# Copia apenas package.json e package-lock.json para cache
COPY package*.json ./

# Instala dependências locais e globais necessárias
RUN npm ci && \
    npm install -g nodemon livereload
# Copia o restante do código
COPY . .

# Expõe porta principal da aplicação
EXPOSE 3000 35729

# Comando padrão: nodemon via npm start
CMD ["sh", "-c", "livereload public --port 35729 & nodemon server.js"]