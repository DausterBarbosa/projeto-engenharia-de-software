FROM node:18

ENV DATABASE_URL="postgres://lblxusrk:W4p1Iz-7Wbom5Flc8MWBAYP3WqXHG5Ph@bubble.db.elephantsql.com/lblxusrk"

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

RUN npx tsc

CMD [ "node", "dist/index.js" ]