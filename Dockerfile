FROM node:13.10.1-buster as base
# Create project directory
WORKDIR /opt/cric/backend
# Install app dependencies
COPY package*.json ./
RUN npm install --production && npm cache clean --force
# Set PATH
ENV PATH /opt/cric/backend/node_modules/.bin:$PATH
LABEL   version="fagner-base" \
        description="Backend in Node.js for CRIC Searchable Image Database" \
        maintainer="oliveira.fagnerbernardo@gmail.com"

FROM base as development
RUN npm install && npm cache clean --force
LABEL   version="fagner-development"

FROM base as production
# Copy ./src
COPY . ./
ENV NODE_ENV production
LABEL   version="fagner-production"
