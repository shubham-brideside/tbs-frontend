#!/bin/bash

# Azure deployment script for Vite React app

# Exit on any error
set -e

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Copy web.config to dist folder
echo "Copying web.config to dist..."
cp web.config dist/

echo "Deployment complete!"

