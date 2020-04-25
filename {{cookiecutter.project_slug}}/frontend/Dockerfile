FROM node:13

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update && apt upgrade -y
RUN apt install git

COPY . /usr/src/app/
RUN npm install

RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
