FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm cache clean --force

RUN npm install
 
COPY src ./src

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm", "run", "dev"]
