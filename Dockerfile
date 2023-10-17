FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

# Copy package.json
COPY package.json .

# Install pnpm as package manager
RUN npm i pnpm -g

# Install packages
RUN pnpm i

# Copy source code
COPY . .

# Building the project
RUN pnpm run build

FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app/prod

# Copy build folder do production
COPY --from=BUILD_IMAGE /app/dist /app/prod/dist
EXPOSE 4173

# Some env variables
ENV VITE_BACKEND_URL = "http://localhost:3333"
ENV VITE_API_VERSION = "/api/v1"

COPY package.json .
COPY vite.config.ts .

# Install pnpm as package manager
RUN npm i pnpm -g

# Install typecript for production
RUN pnpm i typescript

EXPOSE 4173
CMD [ "npm", "run", "preview"]
