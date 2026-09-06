import ServicesPage from "./ServicesPage";

export default function ServicesDjEventsPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="DJ and events"
      title="DJ services"
      sectionTitle="Music and sound for local events"
      intro="Headliner provides DJ services for private parties, school events, community events, and local gatherings. We can handle music, announcements, microphones, and event sound based on what the event needs."
      listIntro="We bring the music and sound support. You tell us what kind of event you are planning."
      serviceList={[
        "Private parties and family events",
        "School dances, assemblies, recitals, and fundraisers",
        "Community events and local gatherings",
        "DJ music and announcements",
        "Microphones and event sound",
        "Setup based on the venue and event",
      ]}
      galleryIntro="DJ and event services available at Headliner."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
          alt: "DJ setup at an evening event",
          title: "DJ and event services",
          caption: "DJ music, microphones, announcements, and sound support for local events.",
        },
        {
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
          alt: "People gathered at an indoor event venue",
          title: "Private parties",
          caption: "Music and sound for birthdays, celebrations, family events, and private gatherings.",
        },
        {
          image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80",
          alt: "Audio and DJ controls in use",
          title: "School events",
          caption: "DJ support for dances, assemblies, recitals, fundraisers, and student events.",
        },
        {
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80",
          alt: "Community event with people gathered together",
          title: "Community events",
          caption: "Music and sound for local gatherings, fundraisers, showcases, and public programs.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Microphone and audio controls for event announcements",
          title: "Announcements and microphones",
          caption: "Support for introductions, awards, transitions, and speaking moments.",
        },
      ]}
      faqs={[
        { q: "What events do you DJ?", a: "Private parties, school events, community events, recitals, fundraisers, and local gatherings." },
        { q: "Can you make announcements?", a: "Yes. We can handle basic announcements and speaking moments." },
        { q: "Do you provide microphones?", a: "Yes. Let us know how many microphones the event needs." },
        { q: "Can we request songs?", a: "Yes. Send songs you want included and anything you want avoided." },
        { q: "Do you work school events?", a: "Yes. We can keep the music school-appropriate." },
        { q: "How much does it cost?", a: "Pricing depends on the event length, location, and setup." },
      ]}
      ctaTitle="Tell us about the event."
      ctaBody="Send the date, location, and what you need handled."
    />
  );
}
