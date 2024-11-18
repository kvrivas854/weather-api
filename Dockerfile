# Use Node.js as the base image
FROM node:22.7.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the API port
EXPOSE 4000

# Start the NestJS application
CMD ["npm", "run", "start:dev"]
