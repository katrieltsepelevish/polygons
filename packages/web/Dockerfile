FROM node:latest

WORKDIR /app/web

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run", "dev"]