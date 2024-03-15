# Stage 1: Build the React application
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Argument to specify the environment (default is `local`)
ARG ENV=local

# Ensure no .env files are present
RUN rm -f .env


RUN if [ "$ENV" = "production" ]; then \
    cp .env.production .env; \
    elif [ "$ENV" = "local" ]; then \
    cp .env.local .env; \
    else \
    cp .env.dev .env; \
    fi

# Build the application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]