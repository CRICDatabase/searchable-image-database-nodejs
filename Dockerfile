FROM node:13.10.1-buster
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install && npm install -g nodemon