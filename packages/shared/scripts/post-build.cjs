const fs = require('fs');
const path = require('path');

// Copy CJS files from dist-cjs to dist with .cjs extension
function copyFiles(srcDir, destDir, ext) {
  if (!fs.existsSync(srcDir)) return;

  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      const newDestDir = path.join(destDir, file);
      if (!fs.existsSync(newDestDir)) {
        fs.mkdirSync(newDestDir, { recursive: true });
      }
      copyFiles(srcPath, newDestDir, ext);
    } else if (file.endsWith('.js')) {
      const destPath = path.join(destDir, file.replace('.js', ext));
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy CJS files
copyFiles(path.join(__dirname, '..', 'dist-cjs'), path.join(__dirname, '..', 'dist'), '.cjs');

console.log('Post-build: CJS files copied successfully');
