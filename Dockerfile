FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030

CMD ["npm", "run", "start:prod"]