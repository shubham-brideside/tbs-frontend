#!/bin/bash

# Azure deployment script for Vite React app

# Exit on any error
set -e

echo "Starting deployment..."

# Navigate to repository root
REPO_ROOT=$(pwd)

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Ensure web.config exists in dist folder
echo "Verifying web.config in dist..."
if [ ! -f "dist/web.config" ]; then
    echo "web.config not found in dist, copying from public..."
    cp public/web.config dist/
fi

# Verify dist folder contents
echo "Dist folder contents:"
ls -la dist/

echo "Deployment complete!"
echo "Remember: Deploy the 'dist' folder contents to site/wwwroot/"

