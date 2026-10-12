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

// Shell content only. These publications are not backed by the CRM.
export const previewPublications = [
  {
    slug: 'friday-showcase',
    mockPublishedAt: '2026-10-09', // Preview-only sample, not a real publication date.
    category: 'Performances',
    title: 'A few photos from Friday’s showcase',
    excerpt: 'First-time performers, a packed room, and one more song before everyone went home.',
    image: `${cloud}/f_auto,q_auto,w_1000/v1781715554/20250628_153338_srnhk2.jpg`,
    alt: 'A Headliner band performing live',
    paragraphs: [
      'The opening band had been working on their set for six weeks. At soundcheck, they were still sorting out how to start the second song. By showtime, they had it.',
      'We heard piano solos, a first vocal performance, and a band that brought their own original song. Thanks to everyone who helped move chairs and stayed to listen to the last set.',
    ],
    cta: null,
  },
  {
    slug: 'meet-maya',
    mockPublishedAt: '2026-10-07',
    category: 'Teachers',
    title: 'Meet Maya, our new piano teacher',
    excerpt: 'Her first question: what do you like listening to?',
    image: `${cloud}/f_auto,q_auto,w_900/v1781715525/PXL_20260615_232703074.PORTRAIT_mqdiam.jpg`,
    alt: 'Piano instruction at Headliner',
    paragraphs: [
      'Maya grew up playing classical piano and now spends most of her time accompanying singers. She likes starting with a song the student already knows, then using it to work on reading, rhythm, and technique.',
      'She’ll be teaching on Tuesdays and Thursdays. Ask the front desk about a first lesson.',
    ],
    cta: { label: 'Explore music lessons', href: '/programs/private-lessons' },
  },
  {
    slug: 'first-original',
    mockPublishedAt: '2026-10-03',
    category: 'In the studio',
    title: 'Their first original, recorded',
    excerpt: 'The Wednesday band took a song from rehearsal into the studio.',
    image: `${cloud}/f_auto,q_auto,w_900/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png`,
    alt: 'Recording equipment in the Headliner studio',
    paragraphs: [
      'It started with a guitar riff at rehearsal. A month later, the band had verses, a chorus, and a drum part everyone agreed on.',
      'For their first session, they recorded the rhythm section together, then added vocals. Listening back gave them a few ideas for the next rehearsal.',
    ],
    cta: null,
  },
];