"use client";

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import styles from './home-preview.module.css';
import { communityPosts } from './community-posts';

export default function PreviewCommunityEmbeds() {
  const gridRef = useRef(null);
  useEffect(() => {
    const grid = gridRef.current;
    const observer = new ResizeObserver(entries => {
      for (const { target } of entries) {
        target.parentElement.style.gridRowEnd = `span ${Math.ceil(target.getBoundingClientRect().height + 20)}`;
      }
    });
    for (const item of grid.children) observer.observe(item.firstElementChild);
    return () => observer.disconnect();
  }, []);

  return <>
    <div ref={gridRef} className={styles.communityEmbedGrid}>
      {communityPosts.map(post => <div className={styles.socialEmbed} key={post.id}>
        <div className={styles.embedContent}>
        {post.platform === 'Instagram' ? <div className={styles.instagramEmbed}>
          <blockquote className="instagram-media" data-instgrm-permalink={post.url} data-instgrm-version="14" data-instgrm-captioned="true">
            <a href={post.url} target="_blank" rel="noreferrer">View this post on Instagram</a>
          </blockquote>
        </div> : <iframe className={styles.tiktokEmbed} src={`https://www.tiktok.com/player/v1/${post.postId}?autoplay=0&controls=1&description=1&music_info=1&rel=0`} title={`Headliner TikTok post ${post.postId}`} loading="lazy" allow="fullscreen" allowFullScreen />}
        </div>
      </div>)}
    </div>
    <Script id="preview-instagram-embed" src="https://www.instagram.com/embed.js" strategy="lazyOnload" onReady={() => window.instgrm?.Embeds?.process()} />
  </>;
}