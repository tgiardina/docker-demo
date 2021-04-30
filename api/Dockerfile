FROM node:16-alpine as installer

WORKDIR /app

COPY package*.json .
RUN npm install --silent

COPY . .

ENTRYPOINT ["node", "index.js"]
