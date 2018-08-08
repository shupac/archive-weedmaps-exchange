# Set the base image to Node
FROM node:9.10-alpine

MAINTAINER Weedmaps
# To build this DockerFile, you will need to provide the NPM_TOKEN env variable
ARG NPM_TOKEN
# copy .npmrc, package-lock.json and package.json so we can install deps
ADD .npmrc /tmp/.npmrc
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

# Install git, which is not standard in alpine
RUN apk add --no-cache git python bash make gcc g++ python && \
    cd /tmp && \
    npm install && \
    apk del git gcc make g++ python
    # remove build deps afterwards, since we don't need 'em

# copy the build artifacts to the run directory
RUN mkdir -p /var/www/admin && \
    cp -a /tmp/node_modules /var/www/admin

# Define working directory
WORKDIR /var/www/admin
ADD . /var/www/admin

# Build the app
RUN NODE_ENV=production npm run build
RUN npm run generate-buildid

# Copy the init script
COPY docker-entrypoint.sh /
COPY docker-entrypoint-storybook.sh /
RUN chmod +x /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint-storybook.sh
