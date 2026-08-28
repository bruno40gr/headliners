import ServicesPage from "./ServicesPage";

export default function ServicesRehearsalSpacePage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Rehearsal space"
      eyebrow="Services · rehearsal space"
      title="Rehearsal space"
      intro="Rehearsal space for bands, small groups, and musicians who need room to run a set, work through songs, or prepare for a show."
      listIntro="Room availability for band rehearsals, set run-throughs, and performance prep."
      serviceList={[
        "Band rehearsals",
        "Set run-throughs",
        "Performance prep",
        "One-time bookings",
        "Recurring time when available",
      ]}
      galleryIntro="A look at the kind of room and rehearsal use this page is built around."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854919/e8dfe1ae-2f43-41c7-9528-5b459eafdadd.png",
          alt: "Headliner rehearsal space set up for band practice",
          title: "Band rehearsal",
          caption: "A room where a group can hear each other and stay with the work.",
        },
        {
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
          alt: "Band working through a rehearsal together",
          title: "Set prep",
          caption: "Useful before a showcase, recording date, or live performance.",
        },
        {
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
          alt: "Musicians rehearsing together in a studio setting",
          title: "Group rehearsals",
          caption: "A better fit for timing, transitions, and preparing together.",
        },
      ]}
      faqs={[
        { q: "Who is rehearsal space for?", a: "Bands, small groups, and musicians who need a place to rehearse or run a set." },
        { q: "Can I ask about one-time use and recurring time?", a: "Yes. Let us know what kind of booking you are looking for." },
        { q: "Is pricing or availability listed online?", a: "Not yet. Rehearsal space depends on scheduling, so the best first step is to ask." },
      ]}
      ctaTitle="Ask about rehearsal space."
      ctaBody="Send us your group size, what kind of rehearsal you need, and the times you are hoping for."
    />
  );
}
