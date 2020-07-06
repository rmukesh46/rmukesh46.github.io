FROM node:13.3.0-alpine3.10 as frontend-build
WORKDIR frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.17.6-alpine
COPY --from=frontend-build frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

