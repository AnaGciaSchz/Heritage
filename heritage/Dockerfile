FROM node:14-alpine
WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install python
RUN npm install --platform=linuxmusl --arch=x64

RUN npm run build

CMD [ "npm", "run", "start" ] 