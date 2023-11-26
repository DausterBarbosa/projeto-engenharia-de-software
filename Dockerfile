FROM node:18

ENV DATABASE_URL=

WORKDIR /app

COPY . /app

RUN npm install

RUN npx tsc

EXPOSE 8080

CMD [ "node", "dist/index.js" ]