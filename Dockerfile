FROM node:10-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./backend .
RUN echo $(pwd)
RUN echo $(ls -a)

RUN npm install

EXPOSE 9000

RUN npm start

CMD ["npm", "start"]