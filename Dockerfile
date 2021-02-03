FROM node:alpine as builder
WORKDIR /usr/src/app

COPY . .
RUN set -ex \
  && npm install \
  && npm install -g @angular/cli \
  && ng build --prod

FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/dist/web-it-ebook /usr/share/nginx/html
COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf

