FROM node:16.14-alpine
WORKDIR /api-sdpp
# COPY package*.json ./api-sdpp
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]