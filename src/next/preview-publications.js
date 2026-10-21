const cloud = 'https://res.cloudinary.com/diy08lj9x/image/upload';

// Optional CMS-ready fields: publishedAt (ISO date or timestamp), credit (text).
// Format the supplied calendar date without shifting it through local time zones.
export function publicationDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return null;
  const calendarDate = value.slice(0, 10);
  const date = new Date(`${calendarDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== calendarDate) return null;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}

// Shared by editorial stories and community media. Missing fields stay absent.
export function publicationMetadata(item, label) {
  const text = value => typeof value === 'string' ? value.trim() : '';
  return {
    label: text(label),
    date: publicationDate(item.publishedAt),
    credit: text(item.credit),
  };
}

// Local CMS-shaped records. Replace this data source when the CMS is connected.
// Dates and credits remain absent until explicitly supplied by an editor.
export const previewPublications = [
  {
    id: 'shadys-coffee-performance',
    slug: 'student-performances-at-shadys-coffee',
    publishedAt: '2026-10-17',
    category: 'Performances',
    title: 'A sunny Saturday of music at Shady’s Coffee',
    excerpt: 'Students shared their music over what might have been the last hot Saturday of the year. Thank you to everyone who performed and cheered them on.',
    image: `${cloud}/v1792531539/97f36539-20a1-41b2-9f14-d78785c1835e.png`,
    alt: 'A student singing and playing acoustic guitar outdoors at Shady’s Coffee',
    focalPoint: 'center 35%',
    body: [
      { id: 'afternoon', type: 'paragraph', text: 'What might have been the last hot Saturday of the year turned into a wonderful afternoon of student performances at Shady’s Coffee. We had a great time sharing music together, and we’re grateful to everyone who came out to listen and support the performers.' },
      { id: 'performers', type: 'paragraph', text: 'A big thank-you to Owen Thompson, Madi Thompson, Collin Tang, Tyler Daigle, Samme Fosse, Wyatt Young, and Londyn Morris for bringing their music to the stage.' },
      { id: 'thanks', type: 'paragraph', text: 'Thank you to Shady’s Coffee for hosting us, and to Collin, our drum teacher, for providing setup and support throughout the afternoon. We loved getting to spend the day making music with this community.' },
    ],
  },
  {
    id: 'jennifer-belle-live-session',
    slug: 'jennifer-belle-live-studio-session',
    publishedAt: '2026-10-15',
    category: 'In the studio',
    title: 'Jennifer Belle brings her band to the studio for Reno fire relief',
    excerpt: 'We welcomed Jennifer Belle and her musicians for a live session filmed in 4K, recorded for a telethon supporting people affected by the Reno fires.',
    image: `${cloud}/v1792531716/41a7b5b6-91dd-4895-8ed2-1fe0be4765cd.png`,
    alt: 'Jennifer Belle, her band, and the crew together at Headliner’s studio',
    focalPoint: 'center 45%',
    body: [
      { id: 'session', type: 'paragraph', text: 'We were delighted to welcome Jennifer Belle and her band to Headliner for a live studio session filmed in 4K. The performance was recorded for a music telethon supporting people affected by the fires in Reno, Nevada.' },
      { id: 'broadcast', type: 'paragraph', text: 'In her announcement, Jennifer shared that the telethon is set to air on Roku TV on October 30 at 5 PM, with a viewing link to follow. We’ll share more details when they’re available.' },
      { id: 'musicians', type: 'paragraph', text: 'Joining Jennifer were Bobby Campbell on drums, Alan “Al” Harrison on bass, Bill McCoy on keyboard, and Craig Stegall and Trent Durst on guitar. Thank you to the musicians and everyone behind the scenes for bringing the session together.' },
      { id: 'community', type: 'paragraph', text: 'Jennifer described the evening as a reminder of how music brings people together. We’re grateful to have played a part in a performance supporting the Reno community.' },
    ],
    source: {
      label: 'Read Jennifer’s announcement on Facebook',
      url: 'https://www.facebook.com/groups/1389528004598964/permalink/4473770866174647/',
    },
  },
  {
    id: 'wag-and-walk-2026',
    slug: 'wag-and-walk-with-placer-spca',
    publishedAt: '2026-10-10',
    category: 'In the community',
    title: 'Music, dogs, and a Saturday morning with Placer SPCA',
    excerpt: 'We joined Placer SPCA’s Wag & Walk with a booth and an early set from Sunkast, spending a wonderful Saturday morning supporting a great cause.',
    image: `${cloud}/v1792532225/b997600c-d64c-46ec-bbd8-d91fd884d1b6.png`,
    alt: 'Headliner at Placer SPCA’s Wag & Walk',
    body: [
      { id: 'morning', type: 'paragraph', text: 'We spent Saturday morning, October 10, at Wag & Walk, hosted by Placer SPCA. Between meeting visitors at our booth and spending time with the dogs, it was a wonderful way to come together for a great cause.' },
      { id: 'sunkast', type: 'paragraph', text: 'The morning started early as we supported our band Sunkast for their 8 AM performance. Thank you to the musicians for bringing their energy and music to the event, and to everyone who stopped by to listen or say hello at the booth.' },
      { id: 'relationship', type: 'paragraph', text: 'We’re grateful for our ongoing relationship with Placer SPCA and the opportunities to support their work through music. Thank you to their team for bringing the community together for such a lovely Saturday morning.' },
      { id: 'event-artwork', type: 'image', src: `${cloud}/v1791594003/c21a5d7e-db1a-45e7-a163-3df6587c7f3d.png`, alt: 'Placer SPCA Wag & Walk 2026 event artwork' },
    ],
  },
];
