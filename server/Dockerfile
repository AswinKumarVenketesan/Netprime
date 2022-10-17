FROM node:14

WORKDIR /usr/src/app

# RUN npm install --global pm2

COPY /package*.json ./

RUN npm install

COPY . .

EXPOSE 8050

# RUN npm run start:server


CMD [ "node", "server.js"]