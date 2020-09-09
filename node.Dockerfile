FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./backend-node/package*.json ./

RUN npm install

COPY ./backend-node/ .

COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD [ "node", "app.js" ]