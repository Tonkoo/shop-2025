FROM nginx:stable

COPY ./rootfs/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
