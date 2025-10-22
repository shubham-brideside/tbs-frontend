import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting build file copy process...');

// Source and destination paths
const distDir = path.join(__dirname, 'dist');
const rootDir = __dirname;

// Copy index.html from dist to root
const indexSource = path.join(distDir, 'index.html');
const indexDest = path.join(rootDir, 'index.html');

if (fs.existsSync(indexSource)) {
  fs.copyFileSync(indexSource, indexDest);
  console.log('✅ Copied index.html to root');
} else {
  console.error('❌ Error: dist/index.html not found!');
  process.exit(1);
}

// Copy web.config from dist to root
const webConfigSource = path.join(distDir, 'web.config');
const webConfigDest = path.join(rootDir, 'web.config');

if (fs.existsSync(webConfigSource)) {
  fs.copyFileSync(webConfigSource, webConfigDest);
  console.log('✅ Copied web.config to root');
} else {
  console.log('⚠️  Warning: dist/web.config not found, skipping...');
}

// Copy assets folder from dist to root
const assetsSource = path.join(distDir, 'assets');
const assetsDest = path.join(rootDir, 'assets');

// Remove existing assets folder in root if it exists
if (fs.existsSync(assetsDest)) {
  fs.rmSync(assetsDest, { recursive: true, force: true });
  console.log('🗑️  Removed old assets folder from root');
}

// Copy assets folder
if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, assetsDest, { recursive: true });
  console.log('✅ Copied assets folder to root');
} else {
  console.error('❌ Error: dist/assets folder not found!');
  process.exit(1);
}

// Copy public assets (favicon, images, etc.) from dist to root
const publicFiles = ['favicon.ico', 'hero.jpg'];

publicFiles.forEach(file => {
  const source = path.join(distDir, file);
  const dest = path.join(rootDir, file);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`✅ Copied ${file} to root`);
  } else {
    console.log(`⚠️  Warning: ${file} not found in dist, skipping...`);
  }
});

console.log('');
console.log('✨ Build files copied successfully!');
console.log('📁 Files are now in the root directory:');
console.log('   - index.html');
console.log('   - web.config');
console.log('   - assets/');
console.log('   - favicon.ico');
console.log('   - hero.jpg');
console.log('');
console.log('🚀 Ready for Azure deployment!');

