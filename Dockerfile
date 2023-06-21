# Stage 1 - the build process
FROM node:14 as build-deps
WORKDIR /Users/decagon/Simon_game_App
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM node:14-slim
WORKDIR /Users/decagon/Simon_game_App
COPY --from=build-deps /Users/decagon/Simon_game_App/build ./build
COPY package*.json ./
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "build/app.js"]
