import fs from 'node:fs';
import path from 'node:path';

// Read links from data/links.json
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

async function updateScripts() {
  for (const script of scripts) {
    try {
      let content;
      if (script.type === 'shell') {
        console.log(`Generating shell wrapper for ${script.filename} -> ${script.url}...`);
        content = generateShellWrapper(script.url);
      } else {
        console.log(`Generating redirect for ${script.filename} -> ${script.url}...`);
        content = generateRedirectHtml(script.url);
      }
      
      fs.writeFileSync(path.join(outputDir, script.filename), content);
      console.log(`Saved to public/${script.filename}`);
    } catch (error) {
      console.error(`Error processing ${script.filename}:`, error);
      process.exit(1);
    }
  }
}

updateScripts();