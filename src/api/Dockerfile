FROM node:latest
WORKDIR /src/api

COPY /src/api/package.json package.json

RUN npm install

COPY /src/api .

RUN npm run build

CMD [ "node", "dist/main.js" ]