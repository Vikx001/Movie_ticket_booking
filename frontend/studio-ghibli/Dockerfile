# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using NGINX
FROM nginx:alpine

# Copy the built React app from the build stage to NGINX's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Set the port to expose from the .env file
ARG PORT
ENV PORT=$FRONTEND_APPLICATION_PORT

# Expose the port specified in the .env file
EXPOSE $PORT

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
