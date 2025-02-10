FROM nginx:stable

#COPY ./src/nuxt/.output/server /usr/share/nginx/html
#
#RUN true

COPY rootfs/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
