# Azure Deployment Guide for TBS Website

## Problem Fixed

Your app was showing an empty page on Azure because:
1. ❌ Missing routing configuration for SPA (Single Page Application)
2. ❌ Azure couldn't find the proper files to serve
3. ❌ No web.config for IIS on Azure App Service

## Files Added

- ✅ `web.config` - IIS configuration for Azure App Service
- ✅ `staticwebapp.config.json` - Configuration for Azure Static Web Apps
- ✅ `public/web.config` - Automatically copied to dist during build
- ✅ `.deployment` & `deploy.sh` - Deployment automation scripts

## Deployment Steps

### Option 1: Azure App Service (Recommended)

1. **Configure App Service Settings**
   - Go to Azure Portal → Your App Service
   - Navigate to **Configuration** → **General settings**
   - Set the following:
     - **Stack**: Node
     - **Node version**: 18 LTS or higher
     - **Startup Command**: Leave empty (we'll use the dist folder)

2. **Set Application Settings**
   - In **Configuration** → **Application settings**, add:
     - `SCM_DO_BUILD_DURING_DEPLOYMENT` = `true`
     - `WEBSITE_NODE_DEFAULT_VERSION` = `18-lts`

3. **Configure Deployment Path**
   - Go to **Configuration** → **Path mappings**
   - Set **Physical path** to `site\wwwroot\dist` (if deploying full repo)
   - OR deploy only the `dist` folder contents to `site\wwwroot`

4. **Deploy Your Application**
   
   **Method A: Using Azure CLI**
   ```bash
   # Login to Azure
   az login
   
   # Build locally
   npm install
   npm run build
   
   # Deploy (replace with your app name)
   az webapp up --name your-app-name --resource-group your-resource-group --src-path ./dist
   ```

   **Method B: Using Git Deployment**
   ```bash
   # Build the app
   npm install
   npm run build
   
   # Initialize git (if not already)
   git init
   git add .
   git commit -m "Deploy to Azure"
   
   # Add Azure remote and push
   git remote add azure <your-azure-git-url>
   git push azure main
   ```

   **Method C: Using VS Code Azure Extension**
   - Install "Azure App Service" extension
   - Right-click the `dist` folder
   - Select "Deploy to Web App"
   - Choose your subscription and App Service

5. **Verify Deployment**
   - Wait 2-3 minutes for deployment to complete
   - Open your Azure domain (e.g., `https://your-app.azurewebsites.net`)
   - You should now see your homepage!

### Option 2: Azure Static Web Apps

1. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name your-app-name \
     --resource-group your-resource-group \
     --source https://github.com/your-username/your-repo \
     --location "East US 2" \
     --branch main \
     --app-location "/" \
     --output-location "dist"
   ```

2. **GitHub Actions Configuration**
   Azure will automatically create a GitHub Actions workflow file. Update it to:
   ```yaml
   app_location: "/" # Root of your app
   api_location: "" # No API
   output_location: "dist" # Build output
   ```

3. **Build Configuration**
   - The `staticwebapp.config.json` file will handle routing automatically
   - Push your code to GitHub to trigger deployment

## Important Notes

### For Azure App Service:

- ✅ The `web.config` file in the `dist` folder handles all routing
- ✅ All routes (like `/bride`, `/groom`, etc.) will redirect to `index.html`
- ✅ React Router will handle the client-side routing
- ✅ Static assets (CSS, JS, images) are served correctly

### For Azure Static Web Apps:

- ✅ The `staticwebapp.config.json` handles routing via `navigationFallback`
- ✅ Optimized for static sites with built-in CDN
- ✅ Better performance for pure frontend apps

## Troubleshooting

### Still seeing empty page?

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Check Console tab for errors
   - Look for 404 errors on assets

2. **Verify Build**
   ```bash
   npm run build
   # Check that dist/index.html exists
   # Check that dist/web.config exists
   ```

3. **Check App Service Logs**
   - Go to Azure Portal → App Service
   - Navigate to **Monitoring** → **Log stream**
   - Look for any errors

4. **Verify File Structure**
   Ensure your deployment looks like:
   ```
   wwwroot/
   ├── index.html
   ├── web.config
   ├── assets/
   │   ├── *.js
   │   └── *.css
   ├── favicon.ico
   └── hero.jpg
   ```

5. **Clear Browser Cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or open in incognito mode

6. **Check MIME Types**
   If assets aren't loading, the `web.config` includes proper MIME type mappings for:
   - `.js` files
   - `.css` files
   - `.json` files
   - Font files
   - SVG files

### Environment Variables

If your app uses environment variables:

1. **For Azure App Service**
   - Go to **Configuration** → **Application settings**
   - Add your variables (e.g., `VITE_API_URL`)
   - **Note**: Vite env vars are embedded at build time, so you need to rebuild with the correct values

2. **Build with correct env vars**
   ```bash
   # Set env vars before building
   export VITE_API_URL=https://your-api.com
   npm run build
   ```

## Next Steps

1. ✅ Build your app locally: `npm run build`
2. ✅ Verify the `dist` folder contains:
   - `index.html`
   - `web.config`
   - `assets/` folder
3. ✅ Deploy using one of the methods above
4. ✅ Test all routes on your Azure domain
5. ✅ Set up custom domain (optional)

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

This will serve the `dist` folder locally on `http://localhost:4173`

## Need Help?

- Check Azure App Service logs in the Azure Portal
- Verify the deployment succeeded in the Deployment Center
- Test your build locally first with `npm run preview`
- Make sure Node version matches between local and Azure (18 LTS recommended)

---

## Summary

✅ Your app is now configured for Azure deployment!
✅ All routes will work correctly (no more 404s)
✅ Static files will be served with proper MIME types
✅ The build process includes all necessary config files

Just deploy the `dist` folder to Azure and your app should work perfectly! 🚀

