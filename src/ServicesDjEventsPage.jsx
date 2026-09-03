import ServicesPage from "./ServicesPage";

export default function ServicesDjEventsPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="DJ and events"
      eyebrow="Events"
      title="DJ and events"
      intro="DJ support for private, school, and community events, with music, announcements, and event flow handled in a clear and steady way."
      listIntro="Music, announcements, and event support for gatherings that need a smooth pace and a room that feels taken care of."
      serviceList={[
        "Private events",
        "School events",
        "Community events",
        "Announcements",
        "Music and event flow",
      ]}
      galleryIntro="A look at the kind of event support this page is built for."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
          alt: "DJ setup at an evening event",
          title: "DJ support",
          caption: "Music that fits the room and helps the event move well.",
        },
        {
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
          alt: "People gathered at an indoor event venue",
          title: "Event flow",
          caption: "Useful when the day includes transitions, speaking moments, or multiple moving parts.",
        },
        {
          image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80",
          alt: "Audio and DJ controls in use",
          title: "Announcements and sound",
          caption: "A good fit for events that need both music and practical sound support.",
        },
      ]}
      faqs={[
        { q: "Can you help with announcements too?", a: "Yes. If the event includes announcements or microphones, include that in your inquiry." },
        { q: "Do I need to know the exact music plan ahead of time?", a: "No. It helps to know the tone you want and anything you want included or avoided." },
        { q: "Is pricing listed online?", a: "Not yet. Event scope can vary, so it makes more sense to start with the event details." },
      ]}
      ctaTitle="Tell us about the event."
      ctaBody="Send us the date, location, and the kind of event you are planning. We will follow up from there."
    />
  );
}
