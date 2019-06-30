FROM node:10-slim

RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]