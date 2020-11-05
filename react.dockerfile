# Imagem de Origem
FROM node:13-alpine

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app

# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Instalando dependências da aplicação e armazenando em cache.
COPY ./front-react/package.json /app/package.json
# COPY ./front-react/server.js /app/server.js
# RUN npm install
RUN npm install
# EXPOSE 3000
CMD ["npm", "start"]