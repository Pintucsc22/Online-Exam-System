# Use official Node.js LTS image
FROM node:18

#Create app directory
WORKDIR /usr/src/app

#Copy package files and install dependencies
COPY package*.json ./
RUN npm install

#Copy backend source code
COPY . .

#Expose port
EXPOSE 5000

#Start the backend
CMD ["npm", "start"]