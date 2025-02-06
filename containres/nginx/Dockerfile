FROM nginx

COPY ./src/nuxt/dist /usr/share/nginx/html

COPY ./containres/nginx/rootfs/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
