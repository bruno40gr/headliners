import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';

const base = process.env.FORM_TEST_BASE_URL || 'http://localhost:3000';
const browser = await puppeteer.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', request => request.url().startsWith(base) && request.method() !== 'POST' ? request.continue() : request.abort());
  for (const width of [390, 900, 1440]) {
    await page.setViewport({ width, height: 950 });
    await page.goto(base, { waitUntil: 'networkidle2' });
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    const hero = await page.$eval('[aria-labelledby="hero-title"]', element => ({ height: element.getBoundingClientRect().height, minimum: getComputedStyle(element).minHeight }));
    assert.equal(hero.minimum, '878px');
    assert.ok(hero.height >= 878);
    const posters = await page.$$('button[aria-label^="View details:"]');
    assert.equal(posters.length, 3);
    for (const [index, poster] of posters.entries()) {
      await poster.evaluate(element => element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }));
      await new Promise(resolve => setTimeout(resolve, 100));
      await poster.click();
      await page.waitForSelector('dialog[open]');
      await new Promise(resolve => setTimeout(resolve, 150));
      assert.equal(await page.$eval('dialog', element => element.open), true);
      assert.equal(await page.$eval('body', element => element.style.overflow), 'hidden');
      assert.ok(await page.$('dialog a[aria-label^="Open full-size flyer:"]'));
      if (index === 1) await page.keyboard.press('Escape');
      else await page.locator('button[aria-label="Close event details"]').click();
      await page.waitForSelector('dialog', { hidden: true });
      assert.notEqual(await page.$eval('body', element => element.style.overflow), 'hidden');
    }
    for (const view of ['Calendar', 'List']) {
      const viewButton = await page.$(`[aria-label="Event view"] button:nth-child(${view === 'Calendar' ? 1 : 2})`);
      await viewButton.evaluate(element => element.scrollIntoView({ block: 'center' }));
      await viewButton.click();
      const event = view === 'Calendar' ? '[class*="calendarDay"] button' : '[class*="agenda"] button';
      await page.waitForSelector(event);
      const eventButton = await page.$(event);
      await eventButton.evaluate(element => element.scrollIntoView({ block: 'center' }));
      await eventButton.click();
      await page.waitForSelector('dialog[open]');
      assert.equal(await page.$eval('#event-dialog-title', element => element.textContent), 'Halloween Sidewalk Showcase');
      await page.keyboard.press('Escape');
      await page.waitForSelector('dialog', { hidden: true });
    }
    console.log('PASS', width, 'three flyers, calendar and list modals, Escape/close, scroll restoration, viewport-height hero');
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}