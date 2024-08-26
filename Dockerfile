# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Use a minimal Node.js image for production
FROM node:18-alpine AS production

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy the built files and node_modules from the previous step
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/public ./public

# Step 10: Set the environment variable for production
ENV NODE_ENV production

# Step 11: Expose the port the app runs on
EXPOSE 3000

# Step 12: Start the Next.js app
CMD ["npm", "start"]
