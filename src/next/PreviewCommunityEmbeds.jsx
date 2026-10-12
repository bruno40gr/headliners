"use client";

import Script from 'next/script';
import styles from './home-preview.module.css';

// Public examples only. Replace with approved Headliner URLs before launch.
const instagramPost = 'https://www.instagram.com/p/CUbHfhpswxt/';
const tiktokPost = 'https://www.tiktok.com/@scout2015/video/6718335390845095173';
const examplePosts = [
  { id: 'instagram-1', platform: 'Instagram', url: instagramPost, embedSupported: true, previewImage: null, previewAlt: '' },
  { id: 'tiktok-1', platform: 'TikTok', url: tiktokPost, embedSupported: true, previewImage: null, previewAlt: '' },
  { id: 'instagram-2', platform: 'Instagram', url: 'https://www.instagram.com/p/DSIXLwRkYGi/', embedSupported: true, previewImage: null, previewAlt: '' },
  { id: 'tiktok-2', platform: 'TikTok', url: 'https://www.tiktok.com/@nationalmuseuminwarsaw/video/7246776822338243866', embedSupported: true, previewImage: null, previewAlt: '' },
];

export default function PreviewCommunityEmbeds() {
  return <>
    <p className={styles.embedNotice}>Four public example posts, not Headliner content. Content is displayed through official Instagram and TikTok embeds. If a post cannot load, use “Open original”.</p>
    <div className={styles.communityEmbedGrid}>
      {examplePosts.map(post => <div className={styles.socialEmbed} key={post.id}>
        <div className={styles.embedHeader}><span>{post.platform} · public example</span><a href={post.url} target="_blank" rel="noreferrer">Open original <span className={styles.srOnly}>{post.platform} post (new tab)</span></a></div>
        {post.platform === 'Instagram' ? <div className={styles.instagramEmbed}>
          <blockquote className="instagram-media" data-instgrm-permalink={post.url} data-instgrm-version="14" data-instgrm-captioned="true">
            <a href={post.url} target="_blank" rel="noreferrer">View the example post on Instagram</a>
          </blockquote>
        </div> : <iframe className={styles.tiktokEmbed} src={`https://www.tiktok.com/player/v1/${post.url.split('/').pop()}?autoplay=0&controls=1&description=1&music_info=1&rel=0`} title={`Public TikTok example ${post.id} — not Headliner content`} loading="lazy" allow="fullscreen" allowFullScreen />}
      </div>)}
    </div>
    <Script id="preview-instagram-embed" src="https://www.instagram.com/embed.js" strategy="lazyOnload" onReady={() => window.instgrm?.Embeds?.process()} />
  </>;
}