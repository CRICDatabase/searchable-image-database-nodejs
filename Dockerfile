FROM node:13.10.1-buster as base
LABEL   version="0.1.1" \
        description="Backend in Node.js for CRIC Searchable Image Database" \
        maintainer="raniere@rgaiacs.com"
# Create project directory
WORKDIR /opt/cric/backend
# Install app dependencies
COPY package*.json ./
RUN npm install && npm install -g nodemon && npm cache clean --force
# Set PATH
ENV PATH /opt/cric/backend/node_modules/.bin:$PATH

FROM base as production
# Copy ./src
COPY . ./