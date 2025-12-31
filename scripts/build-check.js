#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build requirements...');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'tailwind.config.ts',
  'app/page.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

// Check dataset size
const datasetsPath = path.join('public', 'datasets');
if (fs.existsSync(datasetsPath)) {
  const stats = fs.statSync(datasetsPath);
  console.log(`📁 Datasets folder exists`);
  
  // Count files recursively
  function countFiles(dir) {
    let count = 0;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        count += countFiles(filePath);
      } else {
        count++;
      }
    });
    return count;
  }
  
  const fileCount = countFiles(datasetsPath);
  console.log(`📊 Total dataset files: ${fileCount}`);
} else {
  console.log(`❌ Datasets folder missing`);
  allFilesExist = false;
}

if (allFilesExist) {
  console.log('🎉 All build requirements satisfied!');
  process.exit(0);
} else {
  console.log('❌ Some requirements missing. Please fix before deploying.');
  process.exit(1);
}