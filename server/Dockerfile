FROM node:16
RUN mkdir -p /home/node/ai-letters-server/node_modules
WORKDIR /home/node/ai-letters-server
COPY package.json ./
RUN npm install --production --silent
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]