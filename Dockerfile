FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci --omit=dev

COPY . .

CMD [ "npm", "start" ]