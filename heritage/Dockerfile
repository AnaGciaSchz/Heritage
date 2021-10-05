FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install python
RUN npm install --platform=linuxmusl --arch=x64

CMD [ "npm", "run", "dev" ] 