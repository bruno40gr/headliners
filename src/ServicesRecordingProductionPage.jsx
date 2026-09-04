import ServicesPage from "./ServicesPage";

export default function ServicesRecordingProductionPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Recording and music production"
      eyebrow="Studio work"
      title="Recording studio and music production in Rocklin"
      intro="Recording studio sessions, demos, vocals, and music production support for artists, students, and bands in the Rocklin and Sacramento area."
      listIntro="Recording sessions, vocal tracking, song demos, editing, arrangement, and production help for projects that are still taking shape and projects that are ready to track."
      serviceList={[
        "Recording studio sessions",
        "Vocal recording",
        "Song demos",
        "Production support",
        "Editing and arrangement",
        "Small band sessions",
      ]}
      galleryIntro="A look at the kind of studio work this page covers, from tracking to production support."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording setup with microphones and control desk",
          title: "Recording sessions",
          caption: "A clean setup for vocals, instruments, and demo sessions.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner studio workstation for recording and production",
          title: "Production support",
          caption: "Useful when a song needs structure, edits, or a clearer next step.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Musicians working together in a studio room",
          title: "Band and artist sessions",
          caption: "A good fit for artists, bands, and students who need a focused session.",
        },
      ]}
      faqs={[
        { q: "Can I reach out if the song is still rough?", a: "Yes. A voice memo, demo, or unfinished session is enough to start the conversation." },
        { q: "Do you help with editing and production too?", a: "Yes. We can help with recording, edits, arrangement, and production support." },
        { q: "Is this only for Headliner students?", a: "No. Students, artists, bands, and musicians from Rocklin, Roseville, Lincoln, Loomis, Granite Bay, and the Sacramento area can reach out about recording projects." },
        { q: "Is pricing listed online?", a: "Not yet. Reach out with the project details and we will follow up from there." },
      ]}
      ctaTitle="Tell us about the project."
      ctaBody="Send us a note with what you want to record or build, and we will talk through the next step."
    />
  );
}
