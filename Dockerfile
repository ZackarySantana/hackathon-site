# Base node image
FROM node:22 as base

RUN mkdir /app
WORKDIR /app

# Create deps image that is just the dependancies installed
FROM base as deps

COPY package.json package-lock.json ./
RUN npm install --production=false --force

# Build the app
FROM deps as build

COPY svelte.config.js vite.config.js jsconfig.json tailwind.config.js postcss.config.js ./
COPY src src
COPY static static
# We copy .env for build time.
COPY .env .env 
RUN npm run build

# Only the production dependancies
FROM deps as production-deps

ENV NODE_ENV=production
RUN npm prune --production --force

# Starts with the production deps, and grabs the application
FROM production-deps

# Built files
COPY --from=build /app/build /app/build

CMD ["npm", "run", "start"]