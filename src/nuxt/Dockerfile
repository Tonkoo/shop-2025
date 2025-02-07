FROM node:latest

COPY /src/nuxt/package.json package.json

RUN npm install

COPY /src/nuxt .

RUN npm run build

CMD ["node", ".output/server/index.mjs"]



