# Use the official Playwright image as a base
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy only the package files first
COPY package*.json ./

# Install dependencies
RUN npm install && \
    # Clean up to reduce image size
    npm cache clean --force && \
    rm -rf /root/.npm

# Copy the rest of the application code to the container
COPY . .

# Run Playwright install to download the browsers
RUN npx playwright install --with-deps && \
    # Clean up unnecessary files after installation
    rm -rf /root/.cache

# Expose necessary ports (if applicable)
EXPOSE 3000

# Define the command to run tests
CMD ["npx", "playwright", "test", "--reporter=list"]
