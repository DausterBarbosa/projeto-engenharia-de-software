FROM node:18

ENV DATABASE_URL=
ENV SECRET_KEY=

WORKDIR /app

COPY . /app

RUN npm install

RUN npx tsc

EXPOSE 8080

CMD [ "node", "dist/index.js" ]