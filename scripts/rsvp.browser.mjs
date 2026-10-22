import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';

const base = process.env.RSVP_TEST_BASE_URL || 'http://localhost:3000';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setCacheEnabled(false);
const errors = [];
const submissions = [];
let status = 502;
page.on('pageerror', error => errors.push(error.message));
await page.setRequestInterception(true);
page.on('request', async request => {
  if (request.url() === `${base}/api/rsvp` && request.method() === 'POST') {
    submissions.push({ body: JSON.parse(request.postData()), key: request.headers()['idempotency-key'] });
    await new Promise(resolve => setTimeout(resolve, 250));
    return request.respond({ status, contentType: 'application/json', body: JSON.stringify(status >= 400 ? { error: 'We couldn’t save your RSVP. Please try again.' } : { ok: true }) });
  }
  if (request.method() === 'POST') return request.abort();
  return request.url().startsWith(base) ? request.continue() : request.abort();
});

try {
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.goto(`${base}/rsvp`, { waitUntil: 'networkidle0' });
  const mobileStart = await page.$eval('main', main => {
    const photo = main.querySelector('img');
    const panel = main.lastElementChild;
    return { top: panel.getBoundingClientRect().top, height: photo.getBoundingClientRect().height,
      margin: getComputedStyle(photo).marginTop, opacity: getComputedStyle(panel.firstElementChild).opacity };
  });
  assert.ok(mobileStart.top >= 811, 'White content starts below the mobile viewport');
  assert.ok(mobileStart.height >= 790, 'Photo fills the first screen');
  assert.equal(mobileStart.margin, '0px');
  assert.equal(mobileStart.opacity, '0');
  const titleCenter = await page.$eval('h1', heading => {
    const bounds = heading.getBoundingClientRect();
    return bounds.top + bounds.height / 2;
  });
  assert.ok(Math.abs(titleCenter - 406) < 2, 'Headline starts vertically centered');
  assert.equal(await page.$eval('main', main => main.getBoundingClientRect().left), 0);
  await page.screenshot({ path: '/tmp/headliner-rsvp-mobile-initial.png' });
  await page.evaluate(() => window.scrollTo(0, 90));
  await page.waitForFunction(() => {
    const opacity = Number(getComputedStyle(document.querySelector('main').lastElementChild.firstElementChild).opacity);
    return opacity > 0 && opacity < 1;
  });
  await page.screenshot({ path: '/tmp/headliner-rsvp-mobile-mid-scroll.png' });
  await page.evaluate(() => window.scrollTo(0, 240));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('main').lastElementChild.firstElementChild).opacity === '1');
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForFunction(() => Math.abs(document.querySelector('header').getBoundingClientRect().top - 30) < 2);
  await page.screenshot({ path: '/tmp/headliner-rsvp-mobile-anchored.png' });
  const roofPosition = () => page.$eval('main img', image => {
    const hero = image.parentElement;
    const scale = Math.max(hero.clientWidth / 808, hero.clientHeight / 1442);
    const cropX = (808 * scale - hero.clientWidth) / 2;
    const cropY = (1442 * scale - hero.clientHeight) / 2;
    return image.getBoundingClientRect().top + 480 * scale + .7 * cropX - cropY;
  });
  assert.ok(Math.abs(await roofPosition()) < 2, 'Photo stops when roof reaches top-left');
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForFunction(() => window.scrollY === 480);
  assert.ok(Math.abs(await roofPosition()) < 2, 'Photo remains anchored while details continue scrolling');
  await page.screenshot({ path: '/tmp/headliner-rsvp-mobile-roof-stop.png' });
  const anchoredStyles = await page.$eval('main', main => main.getAttribute('style'));
  for (const y of [460, 420, 360, 320, 360, 420, 480]) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.ok(Math.abs(await roofPosition()) < 2, `Roof stays anchored at scroll ${y}`);
    assert.ok(Math.abs(await page.$eval('header', header => header.getBoundingClientRect().top) - 30) < 2, `Headline stays anchored at scroll ${y}`);
    assert.equal(await page.$eval('main img', image => getComputedStyle(image).transform), 'none', 'No JS counter-scroll transform');
    assert.equal(await page.$eval('main', main => main.getAttribute('style')), anchoredStyles, 'No style updates after reveal completes');
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('main').lastElementChild.firstElementChild).opacity === '1');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  for (const width of [375, 768, 1440]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    const response = await page.goto(`${base}/rsvp`, { waitUntil: 'networkidle0' });
    assert.equal(response.status(), 200);
    assert.equal(await page.title(), 'Grand Opening RSVP | Headliner Music Academy');
    assert.ok(await page.$('#event-title'));
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.$eval('main', main => {
      const bounds = main.getBoundingClientRect();
      const header = main.querySelector('header').getBoundingClientRect();
      const image = main.querySelector('img');
      const photo = image.parentElement.getBoundingClientRect();
      const date = main.querySelector('h2').getBoundingClientRect();
      const heading = main.querySelector('h1');
      const footer = main.querySelector('footer');
      return {
        width: bounds.width, left: bounds.left, radius: getComputedStyle(main).borderRadius,
        titleFont: getComputedStyle(heading).fontFamily,
        headerOnPhoto: header.top >= photo.top && header.bottom < photo.bottom,
        headerBackground: getComputedStyle(main.querySelector('header')).backgroundColor,
        titleSpacing: parseFloat(getComputedStyle(heading).letterSpacing),
        swooshStroke: main.querySelector('svg path[stroke]').getAttribute('stroke-width'),
        dateBelowPhoto: date.top > photo.bottom,
        photoLoads: image.complete && image.naturalWidth === 808,
        photoHeightRatio: photo.height / bounds.width,
        logoClearance: image.getBoundingClientRect().top + 1000 * bounds.width / 808 - heading.getBoundingClientRect().bottom,
        photoHasText: !!image.parentElement.querySelector('p, h1, h2, h3'),
        dateSize: parseFloat(getComputedStyle(main.querySelector('h2')).fontSize),
        bandSize: parseFloat(getComputedStyle(main.querySelector('h2:nth-of-type(2)')).fontSize),
        footerLast: footer === main.lastElementChild.lastElementChild,
        addressBelowLogo: footer.lastElementChild.matches('a[href*="google.com/maps"]'),
        photoOverlay: getComputedStyle(image.parentElement, '::before').content,
        logoHeight: footer.querySelector('img').getBoundingClientRect().height,
        addressTransform: getComputedStyle(main.querySelector('a[href*="google.com/maps"]')).textTransform,
      };
    });
    assert.ok(width <= 600 ? layout.width === width : layout.width <= 440);
    assert.ok(Math.abs(layout.left - (width - layout.width) / 2) < 1);
    assert.equal(layout.radius, width <= 600 ? '0px' : '28px');
    assert.match(layout.titleFont, /Lilita/i);
    assert.ok(layout.headerOnPhoto && layout.dateBelowPhoto);
    assert.equal(layout.headerBackground, 'rgba(0, 0, 0, 0)');
    assert.ok(layout.titleSpacing < -3);
    assert.equal(layout.swooshStroke, '14');
    assert.ok(layout.photoLoads && layout.photoHasText);
    if (width > 600) assert.ok(layout.logoClearance >= 20, 'Storefront logo clears the headline');
    if (width > 600) assert.ok(Math.abs(layout.photoHeightRatio - (876.4 / 808)) < .01, 'Desktop photo crop is unchanged');
    assert.equal(layout.dateSize, 30);
    assert.equal(layout.bandSize, 28.8);
    assert.equal(layout.logoHeight, 34);
    assert.ok(layout.footerLast);
    assert.ok(layout.addressBelowLogo, 'Address is below the Chamber logo');
    assert.equal(layout.photoOverlay, 'none', 'Photo has no gradient overlay');
    assert.equal(layout.addressTransform, 'none');
    const copy = await page.$eval('main', main => main.textContent);
    for (const text of ['Friends & family, you’re invited', 'Friday, November 6th', '3 PM', '4 PM', '5–8 PM', 'Sunkast · Traktion · Samme · Faith', 'Please RSVP by November 2', 'Ribbon cutting with']) assert.ok(copy.includes(text), text);
    assert.equal(copy.split('Ribbon cutting celebration').length - 1, 1);
    for (const text of ['creative center', 'creative hub', 'Agenda', 'Celebrating with', 'And a mix of music']) assert.ok(!copy.includes(text), text);
    assert.equal(await page.$eval('dialog', element => element.open), false);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.equal(await page.$$eval('form input', inputs => inputs.every(input => input.labels.length === 1)), true);
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    assert.equal(await page.$eval('main', main => getComputedStyle(main.parentElement).backgroundColor), 'rgb(20, 20, 27)');
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    assert.equal(await page.$eval('main', main => getComputedStyle(main.parentElement).backgroundColor), 'rgb(244, 244, 245)');
    await page.$eval('#rsvp', button => button.focus());
    assert.equal(await page.$eval('#rsvp', button => getComputedStyle(button).outlineStyle), 'solid');
    await page.$eval('main footer', footer => footer.scrollIntoView());
    await page.waitForFunction(() => getComputedStyle(document.querySelector('main footer')).opacity === '1');
    await page.screenshot({ path: `/tmp/headliner-rsvp-${width}.png`, fullPage: true });
    await page.click('#rsvp');
    await page.waitForSelector('dialog[open]');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Close RSVP');
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog').open);
    await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'rsvp');
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  }
  await page.click('#rsvp');
  await page.waitForSelector('dialog[open]');
  await page.click('[aria-label="Close RSVP"]');
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await page.click('#rsvp');
  await page.waitForSelector('dialog[open]');
  await page.click('button[type="submit"]');
  assert.equal(submissions.length, 0, 'Empty form must not submit');
  await page.type('#rsvp-name', 'Synthetic Guest');
  await page.type('#rsvp-email', 'guest@example.com');
  await page.$eval('#rsvp-party', element => { element.value = ''; });
  await page.type('#rsvp-party', '3');
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('button[type="submit"]').disabled);
  await page.waitForSelector('[role="alert"]');
  assert.equal(await page.$eval('#rsvp-name', input => input.value), 'Synthetic Guest');
  status = 201;
  await page.click('button[type="submit"]');
  await page.waitForSelector('[role="status"]');
  assert.equal(submissions.length, 2);
  assert.deepEqual(submissions[0].body, { name: 'Synthetic Guest', email: 'guest@example.com', partySize: 3 });
  assert.equal(submissions[0].key, submissions[1].key, 'Retry must retain its idempotency key');
  assert.match(await page.$eval('[role="status"]', element => element.textContent), /3 people/);
  await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'status');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  const invalid = await page.evaluate(async () => {
    const response = await fetch('/api/rsvp', { method: 'PUT' });
    return response.status;
  });
  assert.equal(invalid, 405);
  assert.deepEqual(errors, []);
  console.log('RSVP browser checks passed: desktop/tablet/mobile, required fields, delivery failure, retry, party size, focus, and confirmation.');
} finally {
  await browser.close();
}