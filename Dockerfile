FROM node:16 as builder

RUN mkdir /application
WORKDIR /application

COPY app /application
RUN npm install

RUN npm rum build

FROM nginx:1.22

COPY --from=builder /application/index.html /usr/share/nginx/html
COPY --from=builder /application/dist /usr/share/nginx/html/dist