import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';

const base = process.env.RSVP_TEST_BASE_URL || 'http://localhost:3000';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.setRequestInterception(true);
page.on('request', request => request.method() === 'POST' || !request.url().startsWith(base) ? request.abort() : request.continue());

async function assertFooterReachable(height) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const bounds = await page.$eval('main footer', footer => {
    const rect = footer.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom };
  });
  assert.ok(bounds.top >= 0 && bounds.bottom <= height + 1, 'Entire footer can be scrolled into view');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'No horizontal page overflow');
}

try {
  for (const [width, height] of [[320, 568], [360, 640], [375, 667], [390, 844], [412, 915], [430, 932], [667, 375]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    for (const reducedMotion of [false, true]) {
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }]);
      await page.goto(`${base}/rsvp`, { waitUntil: 'networkidle0' });
      const session = await page.createCDPSession();
      await session.send('Input.synthesizeScrollGesture', {
        x: Math.round(width / 2), y: Math.round(height * .7), yDistance: -Math.round(height * .6),
        speed: 1000, gestureSourceType: 'touch',
      });
      await session.detach();
      assert.ok(await page.evaluate(() => window.scrollY > 0), `Touch scrolling works at ${width}×${height}, reduced motion=${reducedMotion}`);
      await assertFooterReachable(height);
      await page.$eval('#rsvp', button => button.scrollIntoView({ block: 'center' }));
      await page.tap('#rsvp');
      await page.waitForSelector('dialog[open]');
      await page.tap('[aria-label="Close RSVP"]');
      await page.waitForFunction(() => !document.querySelector('dialog').open && document.body.style.overflow !== 'hidden');
      await assertFooterReachable(height);
    }
    // A shrinking/growing viewport models browser-chrome and orientation changes.
    await page.setViewport({ width, height: height - 80, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await assertFooterReachable(height - 80);
    console.log(`Touch, full footer, dialog scroll restoration, reduced motion, and resize passed: ${width}×${height}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}