# 🚀 Azure Deployment Checklist

## ✅ Pre-Deployment (Already Done!)

- [x] Created `web.config` for IIS routing
- [x] Created `staticwebapp.config.json` for Static Web Apps
- [x] Added `web.config` to `public/` folder (auto-copies to dist)
- [x] Built the application successfully
- [x] Verified `dist/web.config` exists
- [x] Verified `dist/index.html` exists with correct asset paths

## 📋 Deploy Now - Quick Steps

### Fastest Method: Deploy dist folder directly

1. **Go to Azure Portal** (portal.azure.com)

2. **Navigate to your App Service**

3. **Go to Deployment Center**
   - Click "Browse" or use FTP/Git
   
4. **Upload the ENTIRE `dist` folder contents to:**
   ```
   site/wwwroot/
   ```
   
   Your structure should look like:
   ```
   site/wwwroot/
   ├── index.html          ✅
   ├── web.config          ✅ IMPORTANT!
   ├── assets/
   ├── favicon.ico
   └── hero.jpg
   ```

5. **Restart your App Service**
   - Go to "Overview"
   - Click "Restart"

6. **Test Your Site**
   - Open your Azure URL: `https://your-app-name.azurewebsites.net`
   - Should now show your homepage!
   - Test navigation (click around)
   - All routes should work!

## 🔧 Alternative: Use Azure CLI (if installed)

```bash
# Make sure you're in the project root
cd "/Users/shubhamlohra/Downloads/TBS Website"

# Login to Azure
az login

# Deploy the dist folder
az webapp up --name YOUR-APP-NAME --resource-group YOUR-RESOURCE-GROUP --html --src-path ./dist

# Replace YOUR-APP-NAME and YOUR-RESOURCE-GROUP with your actual values
```

## 🔍 Verify It's Working

After deployment, test these URLs (replace with your domain):

- ✅ https://your-app.azurewebsites.net/ (Home page)
- ✅ https://your-app.azurewebsites.net/bride (Should work, not 404!)
- ✅ https://your-app.azurewebsites.net/groom (Should work!)
- ✅ Check browser console for no 404 errors

## ❓ Still Having Issues?

### Quick Fixes:

1. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

2. **Check Azure Logs**
   - Azure Portal → Your App Service
   - Go to "Log stream"
   - Look for errors

3. **Verify web.config exists in wwwroot**
   - Go to "Advanced Tools" (Kudu)
   - Click "Debug console" → "CMD"
   - Navigate to `site/wwwroot`
   - Confirm `web.config` file is there

4. **Check App Service Configuration**
   - Go to Configuration → General Settings
   - Platform: **Linux** or **Windows** (both work with web.config on Windows)
   - Stack: Node
   - If Windows: Should work immediately
   - If Linux: You might need to use nginx config instead

### If on Linux App Service:

Create a `nginx.conf` or use the startup command:
```bash
pm2 serve dist 8080 --spa
```

But Windows App Service is recommended for React apps with IIS.

## 📞 Get Help

Read the full guide: `AZURE_DEPLOYMENT.md`

---

## 🎉 Quick Summary

**What was wrong:**
- ❌ Azure didn't know how to handle React Router routes
- ❌ No web.config = IIS served 404 for non-root routes
- ❌ SPA needs all routes to redirect to index.html

**What's fixed:**
- ✅ web.config redirects all routes to index.html
- ✅ React Router handles client-side routing
- ✅ Static files are served with correct MIME types
- ✅ Your app will now work on Azure!

**Next Step:**
Upload the `dist` folder to Azure and restart the service. That's it! 🚀

