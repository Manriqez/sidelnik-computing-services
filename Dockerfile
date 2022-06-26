FROM node:16

RUN npm install -g http-server

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "-P", "http://localhost:8080?", "dist" ]