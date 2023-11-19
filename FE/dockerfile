FROM node:16-alpine

WORKDIR /environment

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD ["node", "server.js"]
