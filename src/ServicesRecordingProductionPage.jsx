import ServicesPage from "./ServicesPage";

export default function ServicesRecordingProductionPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Recording and music production"
      title="Recording studio, production, mixing, and mastering in Rocklin"
      sectionTitle="Recording, production, and room-only studio time"
      intro="Headliner offers recording, music production, mixing, and mastering for artists, bands, vocalists, producers, and songwriters in Rocklin and the Sacramento area. Book time with an engineer, bring your own producer, or ask about room-only studio use."
      listIntro="Use the studio for vocals, live instruments, band tracking, demos, singles, albums, remixes, and features. When you reach out, tell us how many songs you are working on, what you need to record, and whether you need engineering, production, mixing, mastering, or just the room."
      serviceList={[
        "Recording for vocals, instruments, bands, demos, singles, and albums",
        "Music production, vocal production, editing, mixing, and mastering",
        "Engineered sessions and room-only bookings for producers",
      ]}
      galleryIntro="Recording studio services available at Headliner."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording setup with microphones and control desk",
          title: "Recording studio in Rocklin",
          caption: "A local recording studio for artists, bands, vocalists, producers, and songwriters in Rocklin and the Sacramento area.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner studio workstation for recording and production",
          title: "Recording sessions",
          caption: "Book studio time for vocals, live instruments, overdubs, demos, singles, albums, features, remixes, and band sessions.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Musicians working together in a studio room",
          title: "Vocal production",
          caption: "Comping, tuning, doubles, harmonies, ad-libs, timing, and vocal production for singers and featured artists.",
        },
        {
          image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
          alt: "Music production workstation with recording equipment",
          title: "Music production",
          caption: "Help with song structure, parts, sounds, edits, hooks, transitions, and production choices before the final mix.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1788635746/23f9480c-9999-469c-ae29-2d6cb6206e53.png",
          alt: "Recording studio room prepared for a music session",
          title: "Room-only studio time",
          caption: "Bring your own producer or engineer and book the room for a writing session, vocal session, tracking date, or project work.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1788635798/ec9ff101-d65f-4a07-adcf-836239dcc7fd.png",
          alt: "Headliner studio workstation for editing mixing and mastering",
          title: "Mixing and mastering",
          caption: "Editing, cleanup, mix balance, mastering, and final delivery for songs, demos, and release projects.",
        },
      ]}
      faqs={[
        { q: "What can I record at Headliner?", a: "Vocals, live instruments, overdubs, demos, singles, albums, features, remixes, and band sessions." },
        { q: "Can I bring my own producer or engineer?", a: "Yes. You can ask about room-only studio time if you already have a producer or engineer." },
        { q: "Can Headliner provide an engineer?", a: "Yes. Ask about an engineered recording session when you contact us." },
        { q: "Do you offer mixing and mastering?", a: "Yes. We can help with editing, mixing, mastering, and final delivery when the project is ready." },
        { q: "Who can book the recording studio?", a: "Artists, vocalists, producers, songwriters, students, bands, and musicians from Rocklin, Roseville, Lincoln, Loomis, Granite Bay, and the Sacramento area can reach out." },
      ]}
      ctaTitle="Book recording studio time."
      ctaBody="Tell us what you want to record, how many songs you are working on, what instruments or vocals are involved, and whether you need engineering, production, mixing, mastering, or room-only time."
    />
  );
}
