FROM node:10-slim

RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY . .

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]