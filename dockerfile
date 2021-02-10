FROM node:current-alpine3.12

COPY . /bot

WORKDIR /bot
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]
