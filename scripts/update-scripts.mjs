import fs from 'node:fs';
import path from 'node:path';

const scripts = [
  {
    url: 'https://raw.githubusercontent.com/atqamz/dotfiles/refs/heads/master/fedora-fresh.sh',
    filename: 'fedora-fresh.sh'
  }
];

const outputDir = path.join(process.cwd(), 'public', 'script');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadScripts() {
  for (const script of scripts) {
    try {
      console.log(`Downloading ${script.url}...`);
      const res = await fetch(script.url);
      if (!res.ok) throw new Error(`Failed to fetch ${script.url}: ${res.statusText}`);
      const content = await res.text();
      fs.writeFileSync(path.join(outputDir, script.filename), content);
      console.log(`Saved to public/script/${script.filename}`);
    } catch (error) {
      console.error(`Error downloading ${script.filename}:`, error);
      process.exit(1);
    }
  }
}

downloadScripts();
