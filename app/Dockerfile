FROM node:16-alpine as installer

WORKDIR /app

COPY package*.json .
RUN npm install --silent

COPY . .

FROM installer as builder

RUN npm run build

FROM nginx:1.19.10-alpine as server

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
