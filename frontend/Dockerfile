# Use Node.js LTS version
FROM node:20.17.0


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .


# Install serve to serve the build
RUN npm install -g serve

# Expose port
EXPOSE 5173

# Start the server
CMD ["npm", "run", "dev"]