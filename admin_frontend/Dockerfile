# Use an appropriate base image for building React applications
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built React application
FROM nginx:alpine

# Copy the built React application from the build stage to the NGINX web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port specified in the PORT environment variable
ARG PORT
ENV PORT=${FRONTEND_APPLICATION_PORT}
EXPOSE ${FRONTEND_APPLICATION_PORT}

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Command to start NGINX web server
CMD ["nginx", "-g", "daemon off;"]
