FROM node:20.18.1
WORKDIR /api

RUN npm install -g nodemon


#RUN npm run build

#CMD [ "node", "dist/main.js" ]
CMD npm run migration:run
CMD npm run start:dev