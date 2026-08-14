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
  '/teachers',
  '/careers',
  '/tiny-keys',
  '/wonder-notes',
  '/programs/band',
];

const BASE_URL = 'https://headlinermusicacademy.com';

const SEO_META = {
  '/': {
    title: 'Headliner Music Academy | Rocklin, CA',
    description: 'Private, semi-private, and group music lessons in Rocklin, CA. Inspiring the next generation of musicians through premium, personalized education.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Headliner Music Academy',
    description: 'Privacy policy for Headliner Music Academy. Learn how we collect, use, and protect your personal information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Headliner Music Academy',
    description: 'Terms and conditions for enrollment at Headliner Music Academy in Rocklin, CA.',
  },
  '/teachers': {
    title: 'Our Teachers | Headliner Music Academy',
    description: 'Meet the passionate instructors at Headliner Music Academy in Rocklin, CA.',
  },
  '/careers': {
    title: 'Careers | Headliner Music Academy',
    description: 'Join the team at Headliner Music Academy in Rocklin, CA. Explore career opportunities in music education.',
  },
  '/tiny-keys': {
    title: 'Tiny Keys — Piano for Ages 5–7 | Headliner Music Academy',
    description: 'Group piano classes for kids ages 5 to 7 in Rocklin, CA. A structured, three-level curriculum that builds real skills through songs, games, and time at the keys.',
  },
  '/wonder-notes': {
    title: 'Wonder Notes — Music for Ages 3–5 | Headliner Music Academy',
    description: 'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
  },
  '/programs/band': {
    title: 'Band Performance Program | Headliner Music Academy',
    description: 'Live stage experience for young musicians in Rocklin, CA. Join a band and perform on a real stage.',
  },
};

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

    let html = await page.content();

    // Inject per-page SEO metadata
    const meta = SEO_META[route];
    if (meta) {
      const pageUrl = route === '/' ? BASE_URL : `${BASE_URL}${route}`;

      // Replace <title>
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${meta.title}</title>`
      );

      // Replace meta description
      html = html.replace(
        /<meta name="description" content=".*?"/,
        `<meta name="description" content="${meta.description}"`
      );

      // Replace canonical URL
      html = html.replace(
        /<link rel="canonical" href=".*?"/,
        `<link rel="canonical" href="${pageUrl}"`
      );

      // Replace og:title
      html = html.replace(
        /<meta property="og:title" content=".*?"/,
        `<meta property="og:title" content="${meta.title}"`
      );

      // Replace og:description
      html = html.replace(
        /<meta property="og:description" content=".*?"/,
        `<meta property="og:description" content="${meta.description}"`
      );

      // Replace og:url
      html = html.replace(
        /<meta property="og:url" content=".*?"/,
        `<meta property="og:url" content="${pageUrl}"`
      );
    }

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