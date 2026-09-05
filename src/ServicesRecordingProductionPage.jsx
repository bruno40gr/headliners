import ServicesPage from "./ServicesPage";

export default function ServicesRecordingProductionPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Recording and music production"
      title="Recording for records in progress"
      sectionTitle="Sessions with a clear next step"
      intro="Headliner’s Rocklin recording studio is for the single, the album, the feature, the remix, the demo, and the idea that is ready to leave the notes app. Bring your band, your producer, your vocal, or the track you have been living with. We will help set up the session around what you are making."
      listIntro="A session can be as simple as getting a vocal right or as involved as taking a project through production, editing, mixing, and mastering. We work with solo artists, bands, producers, songwriters, and students who want the room, the workflow, and the help to move the record forward."
      serviceList={[
        "Singles, albums, features, remixes, and demos",
        "Engineered recording sessions or room-only studio time",
        "Vocals, live instruments, band tracking, production, mixing, and mastering",
      ]}
      galleryIntro="A look at the kind of studio work this page covers, from tracking to production support."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording setup with microphones and control desk",
          title: "Track the performance",
          caption: "Vocals, live instruments, features, solo artists, and bands. We can engineer the recording session or set up the room for you and your producer.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner studio workstation for recording and production",
          title: "Build the record",
          caption: "Work through parts, structure, vocal layers, edits, hooks, transitions, and the production choices that make the track feel finished.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Musicians working together in a studio room",
          title: "Shape the vocal",
          caption: "Comping, tuning, doubles, harmonies, ad-libs, timing, and vocal production for takes that need detail after the first pass.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner studio workstation prepared for mixing and mastering",
          title: "Finish the sound",
          caption: "Editing, cleanup, mixing, mastering, balance, and final delivery for projects that are ready to leave the session folder.",
        },
      ]}
      faqs={[
        { q: "Can I book time for a single or album project?", a: "Yes. Tell us what you’re working on and where it stands. We can help plan a one-off session or talk through a larger project." },
        { q: "Can I bring my own producer?", a: "Yes. You can book room-only time with your own producer, or work with one of our engineers for a more supported session." },
        { q: "Do you work with bands and solo artists?", a: "Yes. We work with solo artists, vocalists, producers, songwriters, student artists, and bands." },
        { q: "Can you help finish the project?", a: "Yes. We can help with editing, mixing, and mastering when the project is ready for that stage." },
        { q: "Do I need to be a Headliner student?", a: "No. The studio is open to independent artists, students, bands, and musicians from Rocklin, Roseville, Lincoln, Loomis, Granite Bay, and the Sacramento area." },
      ]}
      ctaTitle="Tell us what you’re working on."
      ctaBody="Send the basics on the single, album, feature, remix, demo, or session you have in mind. We will help you find the right format before you book."
    />
  );
}
