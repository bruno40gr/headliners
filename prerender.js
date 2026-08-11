import puppeteer from 'puppeteer';
import http from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

const routes = [
  '/',
  '/privacy-policy',
  '/terms-and-conditions',
  '/summer-camp',
  '/teachers',
  '/careers',
  '/tiny-keys',
  '/wonder-notes',
  '/programs/band',
];

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function serveStatic(req, res) {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  // Remove query strings
  filePath = filePath.split('?')[0];
  const fullPath = join(DIST, filePath);

  try {
    const data = readFileSync(fullPath);
    const ext = extname(fullPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    // SPA fallback: serve index.html for any unmatched route
    try {
      const data = readFileSync(join(DIST, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }
}

async function prerender() {
  // Start a plain static file server (no Vite client injection)
  const server = http.createServer(serveStatic);
  await new Promise(resolve => server.listen(4173, resolve));
  const baseUrl = 'http://localhost:4173';
  console.log('Static server started at', baseUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of routes) {
    console.log(`Prerendering: ${route}`);
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to hydrate
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.content();

    // Determine output path
    const outDir = join(DIST, route === '/' ? '' : route);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }
    const outPath = join(outDir, 'index.html');
    writeFileSync(outPath, html);
    console.log(`  -> Saved to ${outPath}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});