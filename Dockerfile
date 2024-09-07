# Use the official Node.js image as a base
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Run Playwright install to download the browsers
RUN npx playwright install 

# Expose any necessary ports (if applicable)
EXPOSE 3000

# Define the command to run tests
CMD ["npx", "playwright", "test", "--reporter=html"]
