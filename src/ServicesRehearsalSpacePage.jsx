import ServicesPage from "./ServicesPage";

export default function ServicesRehearsalSpacePage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Rehearsal space"
      title="Band rehearsal space in Rocklin"
      sectionTitle="Rehearsal space with backline and PA"
      intro="Headliner offers rehearsal space for bands, small groups, and musicians who need a room to prepare for a show or work through new material."
      listIntro="Rehearsal space is $50 per hour and includes a complete PA system, wedges, drum kit, guitar amps, bass amp, keyboard, mics, and performance lights. After-hours bookings and Sunday rehearsals may be available by consultation."
      serviceList={[
        "Complete PA system, wedges, and performance lights",
        "Drum kit, guitar amps, bass amp, keyboard, mics included",
        "One-time rehearsal time or recurring availability",
        "After-hours and Sunday bookings by consultation",
        "No alcohol, smoking, or storage",
      ]}
      galleryIntro="Rehearsal space services available at Headliner."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854919/e8dfe1ae-2f43-41c7-9528-5b459eafdadd.png",
          alt: "Headliner rehearsal space set up for band practice",
          title: "Band rehearsal space",
          caption: "A Rocklin rehearsal room for bands, small groups, and musicians.",
        },
        {
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
          alt: "Band working through a rehearsal together",
          title: "Band rehearsal",
          caption: "Use the room for band rehearsals, audition prep, recording a demo, or a focused writing session.",
        },
        {
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
          alt: "Musicians rehearsing together in a studio setting",
          title: "Show preparation with stage lights",
          caption: "Use rehearsal time before a recital, school event, recording date, or live performance.",
        },
        {
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
          alt: "Small group of musicians practicing together",
          title: "Small group practice",
          caption: "Sometimes you just need a space to make music together. A fit for duos or student groups.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Music equipment in a rehearsal and recording room",
          title: "Included equipment",
          caption: "Rehearsal time includes a drum kit, two guitar amps, one bass amp, complete PA system, wedges, and performance lights.",
        },
      ]}
      faqs={[
        { q: "How much is rehearsal space?", a: "Rehearsal space is $50 per hour." },
        { q: "What equipment is included?", a: "Rehearsal time includes a drum kit, two guitar amps, one bass amp, a complete PA system, wedges, and performance lights." },
        { q: "Can I book after hours or on Sundays?", a: "Ask us about after-hours bookings or Sunday rehearsal time. Availability is by consultation." },
        { q: "Can I store gear at Headliner?", a: "No. Storage is not available." },
        { q: "Are alcohol or smoking allowed?", a: "No. Headliner is a family environment, so alcohol and smoking are not allowed on premises." },
        { q: "Can I book recurring rehearsal time?", a: "Yes. Ask about recurring availability when you contact us." },
      ]}
      ctaTitle="Book a rehearsal space."
      ctaBody="Ask about one-time rehearsal time, recurring availability, after-hours bookings, or Sunday rehearsals."
    />
  );
}
