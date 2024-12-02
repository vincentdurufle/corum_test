# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm install

# Copy the rest of the application
COPY . .

RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:dev"]