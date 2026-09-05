import ServicesPage from "./ServicesPage";

export default function ServicesRecordingProductionPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Recording and music production"
      eyebrow="Recording studio"
      title="Cut the single. Build the album. Chase the idea."
      intro="Headliner’s Rocklin recording studio is for artists, bands, vocalists, producers, and writers making records in progress: singles, albums, remixes, features, demos, and ideas that need a real room. Track vocals, record live instruments, build out production, finish a mix, master a release, or bring your own producer and take over the room."
      listIntro="A good session starts with where the project is now and where it needs to go next. That might mean a clean vocal day, full-band tracking, a production pass, editing and comping, mixing, mastering, or room-only time for an artist and producer who already have a plan."
      serviceList={[
        "Singles, albums, remixes, features, and demos",
        "Engineered sessions or room-only bookings",
        "Vocals, instruments, solo artists, and bands",
        "Vocal production, doubles, harmonies, comping, and tuning",
        "Production, arrangement, editing, mixing, and mastering",
      ]}
      galleryIntro="A look at the kind of studio work this page covers, from tracking to production support."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording setup with microphones and control desk",
          title: "Recording sessions",
          caption: "Vocals, instruments, solo artists, features, and bands. Book an engineered session, bring your own producer, or ask about room-only time.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner studio workstation for recording and production",
          title: "Production and arrangement",
          caption: "Build the track, tighten the structure, find the part, shape the drop, finish the bridge, or move a rough idea closer to a record.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Musicians working together in a studio room",
          title: "Mixing and mastering",
          caption: "Clean up the session, balance the record, bring out the energy, and prep the final version for release.",
        },
      ]}
      faqs={[
        { q: "Can I book time for a single or album project?", a: "Yes. Tell us what you’re working on and where it stands. We can help plan a one-off session or talk through a larger project." },
        { q: "Can I bring my own producer?", a: "Yes. You can book room-only time with your own producer, or work with one of our engineers for a more supported session." },
        { q: "Do you work with bands and solo artists?", a: "Yes. We work with solo artists, vocalists, producers, songwriters, student artists, and bands." },
        { q: "Do you offer mixing and mastering?", a: "Yes. We can help with editing, mixing, and mastering when the project is ready for that stage." },
        { q: "Do I need to be a Headliner student?", a: "No. The studio is open to independent artists, students, bands, and musicians from Rocklin, Roseville, Lincoln, Loomis, Granite Bay, and the Sacramento area." },
      ]}
      ctaTitle="Tell us what you’re working on."
      ctaBody="Single, album, remix, feature, demo, or unfinished idea — send us the basics and we’ll help you choose the right session format."
    />
  );
}
