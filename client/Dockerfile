FROM node:16-alpine AS ai-letters-client-builder
RUN mkdir -p /home/node/ai-letters-client/node_modules && chown -R node:node /home/node/ai-letters-client
WORKDIR /home/node/ai-letters-client
COPY package.json ./
USER node
RUN npm install --production --silent
COPY --chown=node:node . .
RUN npm run build

FROM nginx:1.21.3
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=ai-letters-client-builder /home/node/ai-letters-client/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
