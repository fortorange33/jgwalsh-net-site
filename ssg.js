// This is the entry point for the SSG script
import fs from 'fs';
import path from 'path';
let config;
try {
  config = require('./ssg.config');
  fs.mkdirSync(config.output, { recursive: true });
} catch (error) {
  console.error('Failed to load configuration file:', error.message);
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(config.output)) {
  fs.mkdirSync(config.output, { recursive: true });
}

// Copy assets to the output directory
const assetsSrc = path.join(__dirname, config.assets);
const assetsDest = path.join(__dirname, config.output, 'assets');
fs.cpSync(assetsSrc, assetsDest, { recursive: true });

function copyFolderSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// --- Helper for Active Nav Link (Example - needs refinement) ---
function setActiveNavLink(htmlContent, currentPageFilename) {
  // Example: Map filename to the link href
  const linkMap = {
    'index.html': 'index.html',
    'about.html': 'about.html',
    'experience.html': 'experience.html',
    'projects.html': 'projects.html',
    'contact.html': 'contact.html'
    // Add other pages if needed
  };
  const targetHref = linkMap[currentPageFilename];

  if (targetHref) {
    // Use regex or a DOM parser (like jsdom - more robust but adds dependency)
    // Simple Regex Example (can be fragile):
    const regex = new RegExp(`(<a\\s+[^>]*href=["']${targetHref}["'][^>]*)(class=["']([^"']*)["'])?`, 'i');
    htmlContent = htmlContent.replace(regex, (match, openingTag, classAttr, existingClasses) => {
      const activeClasses = 'text-blue-300 font-semibold'; // Your active classes
      let newClassAttr;
      if (classAttr) {
        // Add to existing classes if not already present
        if (!existingClasses.includes('text-blue-300')) { // Basic check
          newClassAttr = `class="${existingClasses} ${activeClasses}"`;
        } else {
          newClassAttr = classAttr; // Already active
        }
      } else {
        newClassAttr = `class="${activeClasses}"`;
      }
      // Also add aria-current="page"
      return `${openingTag.trim()} ${newClassAttr} aria-current="page"`;
    });
  }
  return htmlContent;
}

copyFolderSync(assetsSrc, assetsDest);
const pagesDir = path.join(__dirname, config.input);
fs.readdirSync(pagesDir).forEach(file => {
  const filePath = path.join(pagesDir, file);
  const outputFilePath = path.join(__dirname, config.output, file);

  // Check if the file has a valid text file extension
  if (path.extname(file).toLowerCase() === '.txt') {
    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(outputFilePath, content);
  } else {
    console.warn(`Skipping non-text file: ${file}`);
  }
});

console.log(`Build complete! Output directory: ${config.output}`);