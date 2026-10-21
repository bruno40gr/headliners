import test from 'node:test';
import assert from 'node:assert/strict';
import { publicationDate, publicationMetadata, previewPublications } from '../src/next/preview-publications.js';

test('publication dates are optional and never inferred', () => {
  for (const value of [undefined, null, '', 'yesterday', '2026-02-30', '2026-13-01']) {
    assert.equal(publicationDate(value), null);
  }
  assert.equal(publicationDate('2026-10-09'), 'Oct 9, 2026');
  assert.equal(publicationDate('2026-10-09T23:30:00-07:00'), 'Oct 9, 2026');
  assert.equal(publicationMetadata({}, 'Performances').date, null);
  assert.ok(previewPublications.every(item => !item.credit));
  assert.ok(previewPublications.every(item => !item.mockPublishedAt));
  assert.ok(previewPublications.every(item => publicationMetadata(item, item.category).date));
});

test('real CMS-shaped articles replace all fictional stories', () => {
  assert.equal(previewPublications.length, 3);
  for (const item of previewPublications) {
    assert.ok(item.id && item.slug && item.title && item.excerpt && item.image && item.alt);
    assert.ok(item.body.every(block => block.id && (block.type === 'paragraph' ? block.text : block.type === 'image' && block.src && block.alt)));
    assert.equal(new Set(item.body.map(block => block.id)).size, item.body.length);
    assert.ok(!item.title.includes('Maya'));
  }
  const [shadys, jennifer] = previewPublications;
  const text = shadys.body.map(block => block.text).join(' ');
  for (const name of ['Owen Thompson', 'Madi Thompson', 'Collin Tang', 'Tyler Daigle', 'Samme Fosse', 'Wyatt Young', 'Londyn Morris']) assert.ok(text.includes(name));
  assert.ok(text.includes('our drum teacher'));
  assert.ok(!text.includes('2:00'));
  const studio = jennifer.body.map(block => block.text).join(' ');
  for (const name of ['Bobby Campbell', 'Alan “Al” Harrison', 'Bill McCoy', 'Craig Stegall', 'Trent Durst']) assert.ok(studio.includes(name));
  assert.ok(studio.includes('October 30 at 5 PM'));
  assert.ok(!studio.includes('Pacific'));
  assert.ok(jennifer.source.url.includes('/4473770866174647/'));
});

test('articles show supplied posting dates in newest-first order and include Wag & Walk', () => {
  assert.deepEqual(previewPublications.map(item => item.publishedAt), ['2026-10-17', '2026-10-15', '2026-10-10']);
  assert.deepEqual(previewPublications.map(item => publicationMetadata(item).date), ['Oct 17, 2026', 'Oct 15, 2026', 'Oct 10, 2026']);
  const wag = previewPublications[2];
  const text = wag.body.filter(block => block.type === 'paragraph').map(block => block.text).join(' ');
  for (const detail of ['October 10', 'Placer SPCA', 'Sunkast', '8 AM', 'booth', 'ongoing relationship', 'dogs']) assert.ok(text.includes(detail));
  assert.ok(wag.image.endsWith('b997600c-d64c-46ec-bbd8-d91fd884d1b6.png'));
  assert.ok(wag.body.some(block => block.type === 'image' && block.src.endsWith('c21a5d7e-db1a-45e7-a163-3df6587c7f3d.png')));
});

test('metadata omits empty fields and supports independent labels, dates, and credits', () => {
  assert.deepEqual(publicationMetadata({}, undefined), { label: '', date: null, credit: '' });
  assert.deepEqual(publicationMetadata({ credit: '  ' }, '  '), { label: '', date: null, credit: '' });
  assert.deepEqual(publicationMetadata({ publishedAt: '2026-10-09', credit: ' Photos by staff ' }, ' Performances '), {
    label: 'Performances', date: 'Oct 9, 2026', credit: 'Photos by staff',
  });
  assert.deepEqual(publicationMetadata({ credit: 'Contributor credit' }), { label: '', date: null, credit: 'Contributor credit' });
});