FROM node:20.11.1-alpine AS build_image
WORKDIR /app
COPY vite.config.js .
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
EXPOSE 4001 

FROM node:20.11.1-alpine AS production_image
WORKDIR /app
COPY package.json .
COPY --from=build_image /app/dist /app/dist
RUN npm install --only=production
EXPOSE 4001 
CMD ["npx", "http-server", "./dist"] 
