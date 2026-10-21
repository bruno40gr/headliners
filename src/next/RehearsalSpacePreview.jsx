"use client";

import ServicesRehearsalSpacePage from '../ServicesRehearsalSpacePage';
import ServicePreviewLayout from './ServicePreviewLayout';

function RehearsalLayout(props) {
  const galleryItems = [
    {
      ...props.gallery[0],
      title: 'Band Rehearsal',
      caption: 'Take the stage for practice, audition prep, writing sessions, cutting a demo, or filming a live performance video.',
    },
    {
      ...props.gallery[3],
      title: 'Full-Service Multimedia Production',
      caption: 'Capture you at your best with the help of our talented production staff. We are equipped to offer high-fidelity mixed audio recordings and 4K cinematic videos. Need help with post-production? We also offer mixing, mastering, and video editing.',
    },
  ];

  return <ServicePreviewLayout {...props} mainId="rehearsal-main" ctaLabel="Book rehearsal space" galleryTitle="Rehearsal and production" galleryItems={galleryItems} />;
}

export default function RehearsalSpacePreview() {
  return <ServicesRehearsalSpacePage PageComponent={RehearsalLayout} contentOverrides={{
    title: 'Band Rehearsal Space in Rocklin',
    intro: 'Headliner offers full-service rehearsal spaces for musicians, small groups, and bands who need to prepare for a show, workshop new material, or just a general practice space.',
    sectionTitle: 'What we offer',
    listIntro: 'Rates start at $50/hr and include a full digital PA, wedges, house drum kit, guitar amps, a bass amp, keys, mics, and stage lighting. After-hours and Sunday bookings are available by consultation. We have talented production staff available upon request to handle the technical humdrum and let you focus on the music.',
    serviceList: [
      'Practice space and backline',
      'PA and performance lighting',
      'Production professionals to support your rehearsal',
    ],
    faqs: [
      { q: 'How much is rehearsal space?', a: 'Rates start at $50/hr.' },
      { q: 'What equipment is included?', a: 'A full digital PA, wedges, house drum kit, guitar amps, a bass amp, keys, mics, and stage lighting are included.' },
      { q: 'Can I book after hours or on Sundays?', a: 'After-hours and Sunday bookings are available by consultation.' },
      { q: 'Can production staff support my rehearsal?', a: 'Production staff are available upon request to handle the technical side of your rehearsal. Ask about audio recording, 4K video, mixing, mastering, and video editing.' },
      { q: 'Can I store gear at Headliner?', a: 'No. Storage is not available.' },
      { q: 'Are alcohol or smoking allowed?', a: 'No. Headliner is a family environment, so alcohol and smoking are not allowed on premises.' },
      { q: 'Can I book recurring rehearsal time?', a: 'Yes. Ask about recurring availability when you contact us.' },
    ],
  }} />;
}