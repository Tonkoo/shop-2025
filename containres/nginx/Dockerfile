FROM nginx:stable

COPY ./rootfs/nginx.conf /etc/nginx/nginx.conf
COPY ./rootfs/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
