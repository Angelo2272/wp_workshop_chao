const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../src/ts');
const distDir = path.join(__dirname, '../../dist');

const watcher = chokidar.watch(`${srcDir}/**/*.ts`, {
  ignored: /(^|[\/\\])\../, 
  persistent: true
});

watcher.on('unlink', tsFilePath => {
  const relativePath = path.relative(srcDir, tsFilePath);
  const jsFilePath = path.join(distDir, relativePath.replace(/\.ts$/, '.js'));

  console.log(`TS file deleted: ${tsFilePath}`);
  console.log(`Attempting to delete corresponding JS file: ${jsFilePath}`);

  if (fs.existsSync(jsFilePath)) {
    fs.unlink(jsFilePath, (err) => {
      if (err) {
        console.error(`Error removing ${jsFilePath}:`, err);
      } else {
        console.log(`Removed corresponding JS file: ${jsFilePath}`);
      }
    });
  } else {
    console.log(`JS file does not exist: ${jsFilePath}`);
  }
});

console.log(`Watching ${srcDir} for deleted TypeScript files...`);
