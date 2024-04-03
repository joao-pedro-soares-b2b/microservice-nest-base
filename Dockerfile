# Build stage
FROM node:20.11-slim
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY . .

RUN npm i
RUN apt-get update -y && apt-get install -y openssl

# Expose the port your app runs on
EXPOSE 3000

# Command to run the startup script
CMD ["sh", "./bin/prod.sh"]