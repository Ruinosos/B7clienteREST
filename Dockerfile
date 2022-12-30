# Specify the parent image from which we build
FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
