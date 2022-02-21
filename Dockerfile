FROM node:14 as dev

# Specify our working directory, this is in our container/in our image
WORKDIR /dusan/src/app

# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Here we install all the deps
RUN npm install

# Bundle app source / copy all other files
COPY . .

# Build the app to the /dist folder
RUN npm run build

# FROM dev as testing
# COPY . .
# RUN ["npm", "run", "test:e2e"]

FROM dev as test

RUN npm run test:e2e