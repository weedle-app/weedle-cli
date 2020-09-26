#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:13-alpine3.10 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./scripts ./scripts
COPY ./src ./src
RUN ls -a
RUN npm i && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:13-alpine3.10

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY ./scripts  ./scripts
#RUN npm ci --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/dist ./dist

RUN ls -a ./dist
