# Stage 1: Build the application using Node.js
FROM node:lts AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build the project (e.g., React, Angular, etc.)
RUN yarn build

# Stage 2: Serve the built files using Nginx
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built files from the previous stage
COPY --from=build /app/dist/ .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Nginx
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
