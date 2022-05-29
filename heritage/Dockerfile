FROM node:16-alpine3.12

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install python

RUN npm run build

CMD [ "npm", "run", "start" ] 