FROM node:13.10.1-buster
# Create project directory
WORKDIR /opt/cric/backend
# Install app dependencies
COPY package*.json ./
RUN npm install && npm install -g nodemon && npm cache clean --force
# Set PATH
ENV PATH /opt/cric/backend/node_modules/.bin:$PATH
# We don't copy ./src because it will be mapped by docker-compose