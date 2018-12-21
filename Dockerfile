# ***********************
#      First Stage
# ***********************
FROM node:10.8.0-alpine

# To build this DockerFile, you will need to provide the NPM_TOKEN env variable
ARG NPM_TOKEN

# Install git, which is not standard in alpine
RUN apk add --no-cache git python bash make gcc g++ go
WORKDIR /tmp

# Gopath
ENV GOPATH /root/go
ENV PATH $GOPATH/bin:$PATH

# Install node prune
RUN go get github.com/tj/node-prune/cmd/node-prune

# copy .npmrc, package-lock.json and package.json so we can install deps
ADD .npmrc /tmp/.npmrc
ADD yarn.lock /tmp/yarn.lock
ADD package.json /tmp/package.json

# Run the npm install
RUN yarn

# Prune the node modules
RUN node-prune

# copy the build artifacts to the run directory
RUN mkdir -p /var/www/exchange-fe && \
    cp -a /tmp/node_modules /var/www/exchange-fe

# Define working directory
WORKDIR /var/www/exchange-fe
# Add files
ADD . /var/www/exchange-fe

# Build the app
RUN NODE_ENV=production yarn build

# Prune dev dependencies
# Yarn handles this via the install command rather than npm prune
RUN yarn install --production

## ***********************
##      Second Stage
## ***********************

# Now copy the build over
FROM node:10.8.0-alpine
RUN apk add --update --no-cache bash bind-tools
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /home/appuser/exchange-fe
WORKDIR /home/appuser/exchange-fe

COPY --from=0 /var/www/exchange-fe .
RUN chown -R appuser:appgroup .

USER appuser

CMD yarn start-pm2
