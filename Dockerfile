FROM nginx:alpine

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Salin file HTML/CSS/JS ke folder Nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

RUN chown -R nonroot:nonroot /usr/share/nginx/html

USER nonroot

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

