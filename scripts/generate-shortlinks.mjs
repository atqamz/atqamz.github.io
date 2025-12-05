import fs from 'node:fs';
import path from 'node:path';

// read links from data/links.json
const linksPath = path.join(process.cwd(), 'data', 'links.json');
const scripts = JSON.parse(fs.readFileSync(linksPath, 'utf-8'));

const outputDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function generateRedirectHtml(url) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Redirecting...</title>
<meta http-equiv="refresh" content="0; url=${url}">
<script>window.location.href = "${url}"</script>
</head>
<body>
<p>Redirecting to <a href="${url}">${url}</a>...</p>
</body>
</html>`;
}

function generateShellWrapper(url) {
  return `#!/bin/sh
curl -fsSL "${url}" | bash -s -- "$@"
`;
}

async function generate() {
  for (const script of scripts) {
    try {
      let content;
      if (script.type === 'shell') {
        console.log(`Generating shell wrapper for ${script.filename} -> ${script.url}...`);
        content = generateShellWrapper(script.url);
        
        const linkPath = path.join(outputDir, script.filename);

        // clean up if it was previously a directory (from a redirect)
        if (fs.existsSync(linkPath) && fs.statSync(linkPath).isDirectory()) {
          fs.rmSync(linkPath, { recursive: true, force: true });
        }

        // write directly to file for shell scripts
        fs.writeFileSync(linkPath, content);
      } else {
        console.log(`Generating redirect for ${script.filename} -> ${script.url}...`);
        content = generateRedirectHtml(script.url);
        
        // for HTML redirects, create folder/index.html so it renders as a page
        const linkDir = path.join(outputDir, script.filename);
        
        // clean up if it was previously a file
        if (fs.existsSync(linkDir) && fs.statSync(linkDir).isFile()) {
          fs.unlinkSync(linkDir);
        }

        if (!fs.existsSync(linkDir)) {
          fs.mkdirSync(linkDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(linkDir, 'index.html'), content);
      }
      
      console.log(`Saved public/${script.filename}`);
    } catch (error) {
      console.error(`Error processing ${script.filename}:`, error);
      process.exit(1);
    }
  }
}

generate();