import ServicesPage from "./ServicesPage";

export default function ServicesPaRentalPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="PA system rental"
      eyebrow="Services · live sound"
      title="PA system rental"
      intro="PA system rental for parties, showcases, school functions, and community events in Rocklin."
      listIntro="Sound support for events that need speakers, microphones, playback, or a simple live sound setup."
      serviceList={[
        "Speakers",
        "Microphones",
        "Playback support",
        "Event sound",
        "Quote-based rentals",
      ]}
      galleryIntro="A few examples of the kind of event sound support this page covers."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
          alt: "Speakers and lights set up for an event",
          title: "Event sound",
          caption: "A practical setup for rooms that need clear playback and dependable coverage.",
        },
        {
          image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
          alt: "Community event with live sound",
          title: "Parties and showcases",
          caption: "A good fit for school, community, and private events.",
        },
        {
          image: "https://images.unsplash.com/photo-1507677422600-1554c0f1d164?w=1200&q=80",
          alt: "Microphone and speaker setup for a live event",
          title: "Speaking and playback",
          caption: "Useful for announcements, music playback, and small live event needs.",
        },
      ]}
      faqs={[
        { q: "Do you list rental pricing online?", a: "Not yet. Pricing depends on the event, the gear, and the room." },
        { q: "Can this work for both music and speaking events?", a: "Yes. Let us know if you need playback, microphones, announcements, or all three." },
        { q: "What should I include in the inquiry?", a: "The date, location, event type, and rough audience size is enough to start." },
      ]}
      ctaTitle="Tell us about the event."
      ctaBody="Send us the date, location, and what the room needs to do. We will follow up with what fits."
    />
  );
}
