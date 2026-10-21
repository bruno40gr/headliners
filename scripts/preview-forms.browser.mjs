import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';

const base = process.env.FORM_TEST_BASE_URL || 'http://localhost:3000';
const publicRoutes = process.env.FORM_TEST_PUBLIC === '1';
function publicPath(route) {
  if (!publicRoutes) return route;
  return ({ '/home-preview': '/', '/home-preview/band': '/programs/band',
    '/home-preview/rehearsal-space': '/services/rehearsal-space',
    '/home-preview/recording-music-production': '/services/recording-music-production',
  })[route] || route.replace('/home-preview/', '/');
}
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setCacheEnabled(false);
const requests = [];
const errors = [];
const emails = [];
let responseStatus = 202;
let delay = 0;
page.on('pageerror', error => errors.push(error.message));
await page.setRequestInterception(true);
page.on('request', async request => {
  if (request.url().includes('api.emailjs.com') && request.method() === 'OPTIONS') {
    return request.respond({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type' } });
  }
  if (request.method() === 'POST') {
    if (request.url().includes('api.emailjs.com')) {
      emails.push(JSON.parse(request.postData()));
      return request.respond({ status: 200, headers: { 'access-control-allow-origin': '*' }, contentType: 'text/plain', body: 'OK' });
    }
    if (!request.url().endsWith('/api/intake')) return request.abort();
    requests.push({ url: request.url(), headers: request.headers(), body: JSON.parse(request.postData()) });
    const status = responseStatus;
    await new Promise(resolve => setTimeout(resolve, delay));
    return request.respond({ status, contentType: 'application/json', body: JSON.stringify(status >= 400 ? { error: 'Synthetic failure' } : { queued: true }) });
  }
  return request.url().startsWith(base) ? request.continue() : request.abort();
});

async function clickText(text) {
  await page.evaluate(text => {
    const button = [...document.querySelectorAll('button')].findLast(button => button.textContent.trim().toLowerCase() === text.toLowerCase());
    assertButton(button);
    function assertButton(button) { if (!button) throw new Error(`Missing button: ${text}`); }
    button.click();
  }, text);
}
async function go(route, width) {
  await page.setViewport({ width, height: 950 });
  await page.goto(`${base}${publicPath(route)}`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('button');
}
async function enabled(text, expected) {
  assert.equal(await page.evaluate(text => ![...document.querySelectorAll('button')].findLast(b => b.textContent.trim() === text).disabled, text), expected);
}
async function fill(selector, text) { await page.type(selector, text); }
async function retryAndSubmit(label, successText) {
  const fieldLabels = await page.$$eval('label', elements => elements.filter(element => !element.querySelector('input')).map(element => ({ text: element.textContent, size: getComputedStyle(element).fontSize })));
  for (const field of fieldLabels) assert.equal(field.size, '16px', field.text);
  const start = requests.length;
  const emailStart = emails.length;
  responseStatus = 503;
  await clickText(label);
  await page.waitForFunction(() => document.body.textContent.includes('Something went wrong'));
  assert.equal(requests.length, start + 1);
  await enabled(label, true);
  responseStatus = 202;
  delay = 300;
  await clickText(label);
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some(b => b.textContent.startsWith('Sending') && b.disabled));
  await page.waitForFunction(text => document.body.textContent.includes(text), {}, successText);
  delay = 0;
  assert.equal(requests.length, start + 2);
  assert.equal(emails.length, emailStart + 1);
  assert.ok(emails.at(-1).service_id);
  assert.ok(emails.at(-1).template_id);
  assert.deepEqual(requests[start].body, requests[start + 1].body);
  assert.ok(requests[start].headers['idempotency-key']);
  return requests.at(-1).body;
}

try {
  for (const width of [390, 1440]) {
    for (const route of ['/home-preview', '/home-preview/band']) {
      await go(route, width);
      await clickText(route.endsWith('band') ? 'Join the Program' : 'Request a lesson');
      await page.waitForSelector('input[placeholder="e.g. Jordan Smith"]');
      await enabled('Submit', false);
      await fill('input[placeholder="e.g. Jordan Smith"]', 'Synthetic Student');
      await fill('input[placeholder="Parent name, or your name if you are the student"]', 'Synthetic Parent');
      await fill('input[type="email"]', 'invalid');
      if (!route.endsWith('band')) await page.select('select', 'Piano');
      else assert.equal(await page.$eval('select', el => el.value), 'Band Performance');
      await clickText('Beginner');
      await enabled('Submit', false);
      await page.$eval('input[type="email"]', el => { el.select(); });
      await fill('input[type="email"]', 'forms@example.invalid');
      await clickText('Mon'); await clickText('Evening');
      await fill('textarea', 'Synthetic audit notes');
      const body = await retryAndSubmit('Submit', "We'll be in touch soon!");
      assert.equal(body.intake_type, 'lesson_inquiry');
      assert.equal(body.source_page, publicPath(route));
      assert.equal(body.program_label, route.endsWith('band') ? 'Band Performance' : 'Piano');
      assert.equal(body.full_name, 'Synthetic Parent');
      assert.equal(body.payload.student_name, 'Synthetic Student');
      assert.deepEqual(body.payload.preferred_days, ['Mon']);
      console.log('PASS', width, publicPath(route), 'lesson: validation, labels, identity, notes, failure, retry, success');
    }

    for (const [route, program] of [['/home-preview', 'Headliner Music Academy'], ['/home-preview/tiny-keys', 'Tiny Keys'], ['/home-preview/little-rockers', 'Little Rockers']]) {
      await go(route, width);
      await clickText(route === '/home-preview' ? 'Request a Tour' : 'Book a tour');
      await page.waitForSelector('input[type="date"]');
      await enabled('Book a tour', false);
      await fill('input[placeholder="e.g. Jordan Smith"]', 'Synthetic Student');
      await fill('input[placeholder="First and last name"]', 'Synthetic Parent');
      await page.$eval('input[type="date"]', el => {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(el, '2026-11-07'); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await clickText('Afternoon (12pm to 4pm)');
      await enabled('Book a tour', false);
      await fill('input[type="tel"]', '9165550100');
      const body = await retryAndSubmit('Book a tour', 'See you soon!');
      assert.equal(body.intake_type, 'tour_request'); assert.equal(body.program_label, program);
      assert.equal(body.full_name, 'Synthetic Parent'); assert.equal(body.payload.student_name, 'Synthetic Student');
      assert.equal(body.payload.preferred_date, '2026-11-07'); assert.equal(body.source_page, publicPath(route));
      console.log('PASS', width, publicPath(route), 'tour: contact requirement, labels, date, failure, retry, success');
    }

    for (const [route, service] of [['/home-preview/rehearsal-space', 'Rehearsal Space'], ['/home-preview/recording-music-production', 'Recording & Music Production']]) {
      await go(route, width);
      await page.$eval('header button', b => b.click());
      const label = route.endsWith('rehearsal-space') ? 'Submit' : 'Reach out';
      await enabled(label, false);
      await fill('input[placeholder="Your name"]', 'Synthetic Band');
      await fill('input[type="email"]', 'forms@example.invalid');
      await fill('textarea', 'Synthetic service notes');
      if (route.endsWith('rehearsal-space')) {
        await page.click('summary');
        await page.click('input[name="rehearsal-engineer"][value="Yes"]');
        await page.click('input[name="rehearsal-recording"][value="No"]');
        await fill('#rehearsal-setup', 'Drums, bass; three monitor feeds');
      }
      const body = await retryAndSubmit(label, 'We will be in touch soon.');
      assert.equal(body.intake_type, 'service_inquiry'); assert.equal(body.service_label, service); assert.equal(body.source_page, publicPath(route));
      assert.ok(body.payload.message.includes('Synthetic service notes'));
      if (route.endsWith('rehearsal-space')) {
        assert.ok(body.payload.message.includes('Production engineer: Yes'));
        assert.ok(body.payload.message.includes('Session recording: No'));
        assert.ok(await page.$('a[href^="mailto:"][href*="subject="]'));
      }
      console.log('PASS', width, publicPath(route), 'service: labels, notes, failure, retry, success');
    }
  }

  for (const [route, service] of [['/services/rehearsal-space', 'Rehearsal Space'], ['/services/recording-music-production', 'Recording & Music Production']]) {
    await go(route, 1440);
    await page.$eval('header button', button => button.click());
    await page.waitForSelector('input[placeholder="Your name"]');
    await fill('input[placeholder="Your name"]', 'Synthetic Production Service');
    await fill('input[type="email"]', 'forms@example.invalid');
    const body = await retryAndSubmit(route.endsWith('rehearsal-space') ? 'Submit' : 'Reach out', 'We will be in touch soon.');
    assert.equal(body.service_label, service);
    console.log('PASS', route, 'existing production-route service form');
  }

  await go('/careers', 390);
  await fill('input[placeholder="e.g. Alex Rivera"]', 'Synthetic Applicant');
  await fill('input[type="email"]', 'forms@example.invalid');
  await page.evaluate(() => {
    const field = [...document.querySelectorAll('label')].find(el => el.textContent.includes('What program can you teach?')).parentElement;
    field.querySelector('button').click();
  });
  await fill('textarea[placeholder^="What you play"]', 'Synthetic teaching application');
  const application = await retryAndSubmit('Send application', 'Thanks, we got your application');
  assert.equal(application.intake_type, 'job_application');
  assert.ok(application.payload.positions.length);
  console.log('PASS /careers application, failure, retry, success');

  await go('/special-offer', 390);
  await fill('#student-name', 'Synthetic Student'); await fill('#parent-name', 'Synthetic Parent');
  await fill('#phone', '9165550100'); await fill('#email', 'forms@example.invalid');
  await page.select('#instrument', 'Piano');
  const offer = await retryAndSubmit('Claim 40% Off', 'Thanks for claiming your Wag & Walk offer.');
  assert.equal(offer.intake_type, 'lesson_inquiry'); assert.equal(offer.source, 'event');
  assert.equal(offer.payload.student_name, 'Synthetic Student');
  console.log('PASS /special-offer event application, identity, failure, retry, success');

  for (const [route, destination] of [['/home-preview/tiny-keys', 'https://headlinerma.opus1.io/w/tinykeys'], ['/home-preview/little-rockers', 'https://headlinermusicacademy.com']]) {
    await go(route, 1440); await clickText('Reserve a spot');
    await page.evaluate(() => { window.open = url => { window.__bookingDestination = url; }; });
    await page.evaluate(() => [...document.querySelectorAll('span')].find(el => el.textContent === 'Level 1').parentElement.parentElement.click());
    await clickText('Reserve a spot');
    assert.equal(await page.evaluate(() => window.__bookingDestination), destination);
    console.log('PASS', publicPath(route), 'booking handoff:', destination);
  }
  assert.deepEqual(errors, []);
  console.log(`PASS: ${requests.length} intercepted submissions; no real leads/emails sent; no browser runtime errors.`);
} finally { await browser.close(); }