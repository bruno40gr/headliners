import test from 'node:test';
import assert from 'node:assert/strict';
import { publicationDate, publicationMetadata, previewPublications } from '../src/next/preview-publications.js';

test('publication dates are optional and never inferred', () => {
  for (const value of [undefined, null, '', 'yesterday', '2026-02-30', '2026-13-01']) {
    assert.equal(publicationDate(value), null);
  }
  assert.equal(publicationDate('2026-10-09'), 'Oct 9, 2026');
  assert.equal(publicationDate('2026-10-09T23:30:00-07:00'), 'Oct 9, 2026');
  assert.ok(previewPublications.every(item => !item.publishedAt && !item.credit));
  assert.ok(previewPublications.every(item => publicationDate(item.mockPublishedAt)));
  assert.ok(previewPublications.every(item => publicationMetadata(item, item.category).date === null));
});

test('metadata omits empty fields and supports independent labels, dates, and credits', () => {
  assert.deepEqual(publicationMetadata({}, undefined), { label: '', date: null, credit: '' });
  assert.deepEqual(publicationMetadata({ credit: '  ' }, '  '), { label: '', date: null, credit: '' });
  assert.deepEqual(publicationMetadata({ publishedAt: '2026-10-09', credit: ' Photos by staff ' }, ' Performances '), {
    label: 'Performances', date: 'Oct 9, 2026', credit: 'Photos by staff',
  });
  assert.deepEqual(publicationMetadata({ credit: 'Contributor credit' }), { label: '', date: null, credit: 'Contributor credit' });
});