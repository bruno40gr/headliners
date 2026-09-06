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
  '/about/funding-support',
  '/tiny-keys',
  '/wonder-notes',
  '/programs/private-lessons',
  '/programs/band',
  '/services/recording-music-production',
  '/services/pa-system-rental',
  '/services/private-events',
  '/services/dj-and-events',
  '/services/instrument-setup',
  '/services/rehearsal-space',
];

const BASE_URL = 'https://www.headlinermusicacademy.com';

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
    description: 'Meet Headliner Music Academy’s trained music teachers in Rocklin, CA. Our faculty includes active musicians and multi-instrumental instructors for kids, teens, and adults.',
  },
  '/careers': {
    title: 'Careers | Headliner Music Academy',
    description: 'Join the team at Headliner Music Academy in Rocklin, CA. Explore career opportunities in music education.',
  },
  '/about/funding-support': {
    title: 'Funding Support | Headliner Music Academy',
    description: 'Funding support for music lessons in Rocklin, CA. Headliner is an approved vendor for Alta California Regional Center, South Sutter, ACE FMS, Mains\'l, and Aveanna.',
  },
  '/tiny-keys': {
    title: 'Tiny Keys — Piano for Ages 5–7 | Headliner Music Academy',
    description: 'Group piano classes for kids ages 5 to 7 in Rocklin, CA. A structured, three-level curriculum that builds real skills through songs, games, and time at the keys.',
  },
  '/wonder-notes': {
    title: 'Wonder Notes — Music for Ages 3–5 | Headliner Music Academy',
    description: 'A joyful, play-based music class for preschoolers ages 3 to 5 in Rocklin, CA. Sing, move, explore, and grow through music together.',
  },
  '/programs/private-lessons': {
    title: 'Private and Semi-Private Music Lessons | Headliner Music Academy',
    description: 'Private and semi-private music lessons in Rocklin, CA for kids, teens, and adults. Piano, guitar, voice, drums, bass, ukulele, violin, cello, brass, woodwinds, music production, songwriting, Levels 1-3, Zoom lessons, and monthly recitals.',
  },
  '/programs/band': {
    title: 'Band Performance Program | Headliner Music Academy',
    description: 'Live stage experience for young musicians in Rocklin, CA. Join a band and perform on a real stage.',
  },
  '/services/recording-music-production': {
    title: 'Recording & Music Production in Rocklin, CA | Headliner Music Academy',
    description: 'Recording and music production support in Rocklin, CA. Reach out about demos, vocal sessions, song development, and production help.',
  },
  '/services/pa-system-rental': {
    title: 'PA System Rental in Rocklin, CA | Headliner Music Academy',
    description: 'PA system rental in Rocklin, CA for parties, showcases, school functions, and community events. Ask about event sound support and availability.',
  },
  '/services/private-events': {
    title: 'Private Music Events & Corporate Parties in Rocklin, CA | Headliner Music Academy',
    description: 'Private music events in Rocklin, CA for corporate events, team-building, karaoke parties, adult birthdays, family celebrations, DJ music, recording, and group activities.',
  },
  '/services/dj-and-events': {
    title: 'DJ & Event Services in Rocklin, CA | Headliner Music Academy',
    description: 'DJ and event support in Rocklin, CA for private, school, and community events. Reach out about music, announcements, and event flow.',
  },
  '/services/instrument-setup': {
    title: 'Instrument Setup in Rocklin, CA | Headliner Music Academy',
    description: 'Instrument setup support in Rocklin, CA for instrument electronics, pedalboards, synth rigs, and home studio gear.',
  },
  '/services/rehearsal-space': {
    title: 'Rehearsal Space in Rocklin, CA | Headliner Music Academy',
    description: 'Rehearsal space in Rocklin, CA for bands, groups, and performance prep. Ask about room availability and scheduling.',
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