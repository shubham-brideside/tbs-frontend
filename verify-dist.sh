#!/bin/bash

echo "======================================"
echo "VERIFYING DIST FOLDER FOR DEPLOYMENT"
echo "======================================"
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist folder not found!"
    echo "Run: npm run build"
    exit 1
fi

echo "✅ dist folder exists"
echo ""

# Check index.html
if [ -f "dist/index.html" ]; then
    echo "✅ dist/index.html exists"
    echo ""
    echo "Checking index.html content..."
    if grep -q "/src/main.tsx" "dist/index.html"; then
        echo "❌ ERROR: dist/index.html contains /src/main.tsx (WRONG!)"
        echo "   This is the source file, not the built file!"
        echo "   Run: npm run build"
        exit 1
    elif grep -q "/assets/.*\.js" "dist/index.html"; then
        echo "✅ dist/index.html contains compiled assets (CORRECT!)"
    else
        echo "⚠️  WARNING: Unexpected index.html content"
    fi
else
    echo "❌ ERROR: dist/index.html not found!"
    exit 1
fi
echo ""

# Check web.config
if [ -f "dist/web.config" ]; then
    echo "✅ dist/web.config exists"
else
    echo "❌ ERROR: dist/web.config not found!"
    echo "   Run: cp public/web.config dist/"
    exit 1
fi
echo ""

# Check assets folder
if [ -d "dist/assets" ]; then
    echo "✅ dist/assets folder exists"
    JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
    CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
    echo "   - JavaScript files: $JS_COUNT"
    echo "   - CSS files: $CSS_COUNT"
else
    echo "❌ ERROR: dist/assets folder not found!"
    exit 1
fi
echo ""

# List all files in dist
echo "======================================"
echo "DIST FOLDER CONTENTS:"
echo "======================================"
ls -lh dist/
echo ""
echo "======================================"
echo "DIST/ASSETS FOLDER:"
echo "======================================"
ls -lh dist/assets/ | head -20
echo ""

echo "======================================"
echo "✅ VERIFICATION COMPLETE!"
echo "======================================"
echo ""
echo "Your dist folder is ready for deployment."
echo ""
echo "NEXT STEPS:"
echo "1. Go to: https://thebrideside-frontend-cbfzg5gmdxaya2av.scm.canadacentral-01.azurewebsites.net"
echo "2. Click 'Debug console' -> 'CMD'"
echo "3. Navigate to: site\\wwwroot"
echo "4. DELETE ALL FILES in wwwroot"
echo "5. Drag and drop ALL files from your local dist/ folder"
echo "6. Restart your App Service"
echo ""
echo "Files to upload from dist/:"
echo "  - index.html"
echo "  - web.config"
echo "  - assets/ (entire folder)"
echo "  - favicon.ico"
echo "  - hero.jpg"
echo ""

