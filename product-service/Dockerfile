FROM node:20

WORKDIR /app

# Copy package.json & package-lock.json first (better layer caching)
COPY package*.json ./

RUN npm install

# Copy all source code
COPY . .

# Build TypeScript → dist/
RUN npm run build

EXPOSE 4001

# Run compiled NestJS app
CMD ["node", "dist/main.js"]
