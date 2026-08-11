FROM node:24 AS test-stage

WORKDIR /usr/src/app

COPY . . 

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm ci

RUN npm test

FROM node:24

WORKDIR /usr/src/app

COPY . . 

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm ci

RUN npm run build

RUN npm install -g serve
CMD ["serve", "-n", "dist"]
