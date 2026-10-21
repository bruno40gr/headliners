import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const slugs = ['little-rockers', 'tiny-keys'];

test('program previews preserve every original image URL, FAQ, level, and booking destination', () => {
  for (const slug of slugs) {
    const name = slug === 'tiny-keys' ? 'TinyKeys' : 'LittleRockers';
    const existing = readFileSync(new URL(`../src/${name}.jsx`, import.meta.url), 'utf8');
    const preview = readFileSync(new URL(`../src/next/${name}Preview.jsx`, import.meta.url), 'utf8');
    const urls = existing.match(/https:\/\/[^"\s<>]+/g);
    for (const url of new Set(urls)) assert.ok(preview.includes(url), `${slug} missing ${url}`);
    for (const match of existing.matchAll(/(?:q|a|title|body|eyebrow|submitLabel)[:=]\s*["']([^"']+)["']/g)) {
      // The preview intentionally removes the unsupported enrollment urgency claim.
      if (slug === 'little-rockers' && match[1] === 'Classes fill up fast.') continue;
      if (slug === 'tiny-keys' && match[1] === 'Spots fill up.') continue;
      assert.ok(preview.includes(match[1]), `${slug} changed copy: ${match[1]}`);
    }
    for (const match of existing.matchAll(/>\s*([A-Z][^<>{}]+?)\s*</g)) {
      if (slug === 'little-rockers' && ['Classes fill up fast.', 'Common questions', 'Questions parents ask', 'Ages 3 to 5 · GROW THROUGH MUSIC'].includes(match[1].trim())) continue;
       if (slug === 'tiny-keys' && ['Common questions', 'Questions parents ask', 'Ages 5 – 7 · Piano Foundations', 'Every class includes keyboard time'].includes(match[1].trim())) continue;
      assert.ok(preview.includes(match[1].trim()), `${slug} removed text: ${match[1]}`);
    }
  }
});

test('Tiny Keys adopts the refined conventions without borrowing program-specific facts', () => {
  const preview = readFileSync(new URL('../src/next/TinyKeysPreview.jsx', import.meta.url), 'utf8');
  assert.ok(preview.includes('$35 per lesson'));
  assert.ok(preview.includes('Billed monthly'));
  assert.ok(preview.includes('Frequently asked questions'));
  assert.ok(!preview.includes('Spots fill up.'));
  assert.ok(!preview.includes('Common questions'));
  assert.ok(!preview.includes('<Bubble'));
  assert.ok(!preview.includes('Up to 6 kids'));
  assert.ok(preview.includes('Level {level}.'));
});

test('Little Rockers closes with an invitation rather than an unsupported urgency claim', () => {
  const preview = readFileSync(new URL('../src/next/LittleRockersPreview.jsx', import.meta.url), 'utf8');
  assert.ok(!preview.includes('Classes fill up fast.'));
  assert.ok(preview.includes('<h2>Want to give it a try?</h2>'));
});

test('Tiny Keys has four non-clickable classroom panels and consolidates only the duplicate photo', () => {
  const preview = readFileSync(new URL('../src/next/TinyKeysPreview.jsx', import.meta.url), 'utf8');
  for (const title of ['Piano technique', 'Playing by ear', 'Sight-reading', 'Creative listening']) assert.ok(preview.includes(`title: "${title}"`));
  assert.match(preview, /<ProgramLearningCard key={title} orientation=/);
  assert.equal(preview.match(/PXL_20260615_232703074\.PORTRAIT_mqdiam\.jpg/g).length, 1);
  assert.ok(preview.includes('Students build muscle memory and confidence from day one.'));
});

test('programs share learning cards and accessible five-star reviews', () => {
  for (const name of ['TinyKeys', 'LittleRockers']) {
    const preview = readFileSync(new URL(`../src/next/${name}Preview.jsx`, import.meta.url), 'utf8');
    assert.ok(preview.includes('<ProgramLearningCard'));
    assert.ok(preview.includes('<ProgramReview testimonial={approvedTestimonial} />'));
    assert.ok(!preview.includes('<article'));
  }
  const review = readFileSync(new URL('../src/next/ProgramReview.jsx', import.meta.url), 'utf8');
  assert.ok(review.includes('aria-label="5 out of 5 stars"'));
  assert.ok(review.includes('★★★★★'));
  const wrapper = readFileSync(new URL('../src/next/ProgramPreview.jsx', import.meta.url), 'utf8');
  assert.ok(wrapper.includes("name: 'Sara Ferguson'"));
  assert.ok(wrapper.includes('All of the staff here is wonderful and welcoming and excellent as instructors and people. My kids have discovered their passion for piano with the guidance of the teachers here.'));
});

test('Tiny Keys levels use bullets and remove the ornamental keyboard strip', () => {
  const preview = readFileSync(new URL('../src/next/TinyKeysPreview.jsx', import.meta.url), 'utf8');
  assert.ok(preview.includes('<ul className="tk-level-skills">'));
  assert.ok(preview.includes('<li key={skill}>{skill}</li>'));
  assert.ok(!preview.includes('Chip'));
  assert.ok(!preview.includes('PianoKeys'));
  assert.ok(!preview.includes('Every class includes keyboard time'));
  assert.ok(preview.includes('className="tk-level-label"'));
});

test('preview routes remain noindex and canonicalize to the public routes', () => {
  for (const slug of slugs) {
    const route = readFileSync(new URL(`../app/home-preview/${slug}/page.js`, import.meta.url), 'utf8');
    assert.match(route, /index: false, follow: false/);
    assert.ok(route.includes(`canonical: '/${slug}'`));
    assert.ok(route.includes(`program="${slug}"`));
  }
});
test('Little Rockers removes eyebrows and shows complete card photos', () => {
  const preview = readFileSync(new URL('../src/next/LittleRockersPreview.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/next/program-components.module.css', import.meta.url), 'utf8');
  assert.ok(preview.includes('Frequently asked questions'));
  assert.ok(!preview.includes('Common questions'));
  assert.ok(!preview.includes('Ages 3 to 5 · GROW THROUGH MUSIC'));
  assert.match(css, /\.learningPhoto img \{[^}]*object-fit: contain/);
});

test('learning card appearance is shared, with orientation rather than program variants', () => {
  const component = readFileSync(new URL('../src/next/ProgramLearningCard.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/next/program-preview.module.css', import.meta.url), 'utf8');
  assert.ok(component.includes("orientation = 'vertical'"));
  assert.ok(component.includes("orientation === 'horizontal'"));
  assert.ok(!component.includes('variant'));
  assert.ok(!component.includes('tk-class-'));
  assert.ok(!component.includes('lr-learning-'));
  assert.ok(!css.includes('tk-class-panel'));
  assert.ok(!css.includes('lr-learning-copy'));
});
