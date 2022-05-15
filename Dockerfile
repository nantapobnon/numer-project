FROM node:alpine3.11

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH
# RUN yarn global add nodemon
RUN npm install 

CMD ["npm","start"]
