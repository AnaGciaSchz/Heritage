FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN rm -r /usr/app/node_modules/sharp
RUN npm install python
RUN npm install --platform=linuxmusl --arch=x64
RUN npm run-script build
RUN npm install sharp

CMD [ "npm","run", "start" ]