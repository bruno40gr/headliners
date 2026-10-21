import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { communityPosts } from '../src/next/community-posts.js';

test('community feed contains the five approved posts without tracking parameters', () => {
  assert.equal(communityPosts.length, 5);
  assert.equal(new Set(communityPosts.map(post => post.id)).size, 5);
  assert.deepEqual(communityPosts.slice(0, 2).map(post => post.url), [
    'https://www.instagram.com/p/DeVpesZpFMk/',
    'https://www.instagram.com/reel/Dd-WaIrJzTN/',
  ]);
  for (const post of communityPosts) {
    assert.equal(new URL(post.url).search, '');
    assert.ok(!post.caption && !post.publishedAt);
  }
});

test('TikTok short links resolve to two videos and a photo post with explicit player IDs', () => {
  const posts = communityPosts.filter(post => post.platform === 'TikTok');
  assert.deepEqual(posts.map(post => post.postId), ['7697307631681080590', '7691875432219544845', '7686604208149220622']);
  for (const post of posts) assert.ok(post.url.startsWith('https://www.tiktok.com/@headlinerma/'));
  assert.ok(posts[2].url.includes('/photo/'));
});

test('embeds remove custom headers and use resize-aware masonry', () => {
  const component = readFileSync(new URL('../src/next/PreviewCommunityEmbeds.jsx', import.meta.url), 'utf8');
  assert.ok(component.includes('communityPosts.map'));
  assert.ok(component.includes('href={post.url}'));
  assert.ok(!component.includes('Open original'));
  assert.ok(!component.includes('styles.embedHeader'));
  assert.ok(component.includes('new ResizeObserver'));
  assert.ok(component.includes('style.gridRowEnd'));
  assert.ok(component.includes('observer.disconnect()'));
  assert.ok(component.includes('${post.postId}?autoplay=0'));
  assert.ok(!component.includes('public example'));
  assert.ok(!component.includes('scout2015'));
  assert.ok(!component.includes('nationalmuseuminwarsaw'));
});