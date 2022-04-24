### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies
# This is needed to build and compile our code
# while generating the docker image
FROM node:18-alpine AS build-step
# Create a Virtual directory inside the docker image
RUN mkdir -p /app
# Navigating to the app directory
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force

# Copy files from local machine to virtual directory in docker image
COPY package.json /app
RUN npm install
# Copying the other contents of the project folder to the app folder
COPY . /app

# build the project in the app folder
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying all the build contents to the configured Nginx HTML folder
COPY src/nginx/etc/conf.d/default.conf  /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/angular-api /usr/share/nginx/html
# Exposing 4200 as our container port and 80 as our host port
EXPOSE 80
