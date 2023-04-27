FROM node:16 as node
WORKDIR /opt/app
ADD *.json ./
RUN npm install --legacy-peer-deps
ADD . .
RUN REACT_APP_API_URL=http://localhost:3001 PUBLIC_URL=http://127.0.0.1:3000 npm run build

FROM nginx:1.13
COPY --from=node /opt/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80