FROM nginx:stable

COPY ./src/nuxt/.output/public /usr/share/nginx/html

RUN true

COPY ./containres/nginx/rootfs/default.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
