# 🚨 QUICK FIX: Deploy Correct Files to Azure

## The Problem
❌ You deployed SOURCE CODE (root folder) to Azure
✅ You need to deploy BUILT FILES (dist folder)

Your logs show: `GET /src/main.tsx ... 404`
This means Azure is serving the wrong `index.html`!

---

## 🔧 Fix Now - Choose ONE Method:

### **METHOD 1: Azure Portal (Easiest - 2 minutes)**

1. **Build locally:**
   ```bash
   cd "/Users/shubhamlohra/Downloads/TBS Website"
   npm run build
   ```

2. **Go to Azure Portal:**
   - Navigate to: https://portal.azure.com
   - Find your App Service: `thebrideside-frontend`

3. **Open Advanced Tools (Kudu):**
   - Click "Advanced Tools" in left menu
   - Click "Go →"
   - This opens: `https://thebrideside-frontend-cbfzg5gmdxaya2av.scm.canadacentral-01.azurewebsites.net`

4. **Clear wwwroot and Upload dist:**
   - Click "Debug console" → "CMD"
   - Navigate to: `site/wwwroot`
   - **DELETE EVERYTHING** in wwwroot:
     ```
     cd site\wwwroot
     del /s /q *
     ```
   
5. **Upload dist folder contents:**
   - Drag and drop ALL files from your local `dist/` folder into wwwroot
   - Make sure you see:
     - ✅ index.html
     - ✅ web.config
     - ✅ assets/ folder
     - ✅ favicon.ico
     - ✅ hero.jpg

6. **Restart App Service:**
   - Back in Azure Portal → Overview
   - Click "Restart"
   - Wait 30 seconds

7. **Test:** Open https://thebrideside-frontend-cbfzg5gmdxaya2av.canadacentral-01.azurewebsites.net

✅ Should work now!

---

### **METHOD 2: Azure CLI (Fastest - 1 minute)**

```bash
# Make sure you're in the project root
cd "/Users/shubhamlohra/Downloads/TBS Website"

# Build
npm run build

# Login to Azure (if not already logged in)
az login

# Deploy ONLY the dist folder
az webapp up \
  --name thebrideside-frontend \
  --resource-group thebrideside-frontend_group \
  --html \
  --src-path ./dist

# Restart
az webapp restart \
  --name thebrideside-frontend \
  --resource-group thebrideside-frontend_group
```

Wait 30 seconds, then test your site!

---

### **METHOD 3: FTP Upload**

1. **Get FTP credentials:**
   - Azure Portal → Your App Service
   - Click "Deployment Center" → "FTPS credentials"
   - Copy FTP hostname and credentials

2. **Build locally:**
   ```bash
   npm run build
   ```

3. **Upload using FileZilla or any FTP client:**
   - Connect to the FTP host
   - Navigate to: `/site/wwwroot/`
   - **DELETE everything** in wwwroot
   - Upload ALL contents from your local `dist/` folder

4. **Restart the app** via Azure Portal

---

## ✅ Verify It's Fixed

After deployment, open browser console (F12) and check:

**BEFORE (Wrong):**
```
❌ GET /src/main.tsx 404 (Not Found)
```

**AFTER (Correct):**
```
✅ GET /assets/index-DyZgzSyN.js 200 (OK)
✅ GET /assets/index-mJJd1PQZ.css 200 (OK)
```

---

## 🎯 What Should Be in wwwroot

Your Azure `site/wwwroot/` should look like this:

```
wwwroot/
├── index.html          (from dist, NOT from root!)
├── web.config          ✅ Important!
├── assets/
│   ├── index-DyZgzSyN.js
│   ├── index-mJJd1PQZ.css
│   ├── Home-D3qsT5MM.js
│   └── ... (all other JS/CSS files)
├── favicon.ico
└── hero.jpg
```

**Should NOT have:**
- ❌ src/ folder
- ❌ node_modules/ folder
- ❌ package.json
- ❌ Source files

---

## 🔄 For Future Deployments

**If using GitHub Actions / Azure DevOps:**

Update your build pipeline to:
1. Run `npm install`
2. Run `npm run build`
3. Deploy contents of `dist/` folder to wwwroot (NOT the root folder!)

**Build Command:**
```bash
npm run build
```

**Deploy Path:**
```
dist/  (not ./ or root)
```

---

## Still Not Working?

1. **Hard refresh your browser:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check Azure logs:** Make sure you don't see `404` errors for `/src/*` files
3. **Verify files:** Open Kudu console and confirm `index.html` contains:
   ```html
   <script type="module" crossorigin src="/assets/index-DyZgzSyN.js"></script>
   ```
   NOT:
   ```html
   <script type="module" src="/src/main.tsx"></script>
   ```

---

## 🎉 Once Fixed

Your app will load properly because:
- ✅ Correct built files are served
- ✅ All JavaScript is compiled and bundled
- ✅ web.config handles routing
- ✅ No more 404 errors!

**Deploy the `dist/` folder now and your blank screen will be gone!** 🚀

