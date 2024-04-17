FROM node:16.13.2-alpine3.15

WORKDIR /elasticproxy

ENV npm_config_cache=/app/.npm
ENV APP_NAME paatokset-elasticproxy
COPY package*.json ./
RUN npm install && npm cache clean --force  
RUN chown -R :0 /app/.npm
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
