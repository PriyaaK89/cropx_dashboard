FROM node:18-alpine AS nodework

WORKDIR /myapp

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}

RUN npm run build


FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html


RUN rm -rf ./*


COPY --from=nodework /myapp/build .


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
