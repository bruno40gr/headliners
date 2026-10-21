const cloud = 'https://res.cloudinary.com/diy08lj9x/image/upload';

export const bulletinPosters = [
  {
    title: 'Halloween Sidewalk Showcase',
    flyerImage: `${cloud}/v1792525200/32d5df78-d533-4af8-b163-2ccb5bab2bf2.png`,
    flyerAlt: 'Halloween Sidewalk Showcase flyer. October 31, 6–8 PM, at 2311 Sunset Blvd. All levels welcome. Contact the front desk to sign up.',
    startsAt: '2026-10-31T18:00:00-07:00',
    endsAt: '2026-10-31T20:00:00-07:00',
    description: 'Join us for the Halloween Sidewalk Showcase at 2311 Sunset Blvd. All levels are welcome, and sign-ups are open through the front desk.',
    action: { label: 'Contact the front desk to sign up', href: 'mailto:admin@headlinermusicacademy.com?subject=Halloween%20Sidewalk%20Showcase' },
  },
  {
    title: 'Leave us a review',
    flyerImage: `${cloud}/v1792525426/277c9121-7340-4931-a6a2-89bf04cc637c.png`,
    flyerAlt: 'Leave us a review on Google or Yelp. Flyer includes a QR code for each platform.',
    description: 'Share your experience at Headliner Music Academy. Scan the Google or Yelp QR code on the flyer to leave a review.',
  },
  {
    title: 'Little Rockers',
    flyerImage: `${cloud}/v1792525452/787f8caf-f20d-4e83-adb2-8dd59786cf4e.png`,
    flyerAlt: 'Little Rockers music classes for ages 3–5. Tuesdays 4–4:45 PM, Thursdays 5–5:45 PM, and Saturdays 10:30–11:15 AM.',
    description: 'Music classes for ages 3–5 with singing, dancing, rhythm games, instrument exploration, and musical storytelling. Classes meet Tuesdays from 4 to 4:45 PM, Thursdays from 5 to 5:45 PM, and Saturdays from 10:30 to 11:15 AM.',
    action: { label: 'Explore Little Rockers', href: '/little-rockers' },
  },
];

// Announcements belong on the board, but only dated events belong on the calendar.
export const bulletinEvents = bulletinPosters.filter(poster => poster.startsAt && poster.endsAt);