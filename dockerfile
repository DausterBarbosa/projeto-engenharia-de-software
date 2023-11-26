FROM node:16

ENV DATABASE_URL="postgres://lblxusrk:W4p1Iz-7Wbom5Flc8MWBAYP3WqXHG5Ph@bubble.db.elephantsql.com/lblxusrk"

WORKDIR /app

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8080

CMD [ "node", "dist/index.js" ]