FROM node:21
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Set the environment variable NODE_ENV to 'dev'
ENV NODE_ENV=dev

# Set the environment variable NODE_ENV to 'dev'
#ENV NODE_ENV=prod

EXPOSE 8880
# Set the environment to run on dev
CMD ["node", "index.js"]

# Set the environment to run on prod
#CMD ["nodemon", "index.js"]
