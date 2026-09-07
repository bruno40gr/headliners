import ServicesPage from "./ServicesPage";

export default function ServicesPrivateEventsPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Private Events"
      title="Private music events in Rocklin"
      sectionTitle="Music-centered events for groups"
      intro="Headliner hosts private music events for companies, families, teams, schools, and groups that want something more active than a standard party. Choose karaoke, live-band style activities, DJ music, recording, or a custom music experience. BYOB is welcome for adult events; alcohol is not offered or sold by Headliner."
      listIntro="Private events can be simple or fully hosted. Tell us the group size, age range, date, and what kind of experience you want, and we can help shape the event."
      serviceList={[
        "Corporate events and team-building",
        "Private karaoke parties",
        "Adult birthday parties and family celebrations",
        "Staff-led rock band activities",
        "DJ music, microphones, and announcements",
        "Recording options for songs, shoutouts, or group keepsakes",
        "Private party room and music space",
        "BYOB for adult events; alcohol is not offered or sold",
        "Custom event format based on the group",
      ]}
      galleryIntro="Private music event options available at Headliner."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1741594412133-ffd6530482ad?auto=format&fit=crop&fm=jpg&q=80&w=1200",
          alt: "Adults singing karaoke together at a party",
          title: "Private karaoke parties",
          caption: "Bring your group to Headliner for karaoke, DJ music, recording, or a hosted music activity.",
        },
        {
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
          alt: "Corporate group gathered for a team event",
          title: "Corporate events",
          caption: "A music-based event for team-building, staff appreciation, holiday parties, client events, or company celebrations.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Singer using a microphone at a private event",
          title: "Karaoke Parties",
          caption: "Choose your songs, grab the mic, and enjoy a private karaoke setup supported by Headliner staff.",
        },
        {
          image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
          alt: "Adults playing music together on stage at a casual event",
          title: "Rock band experience",
          caption: "Guests can try simple parts, play together, and get a casual on-stage moment with help from Headliner staff.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording studio for private event recording add-ons",
          title: "Recording add-ons",
          caption: "Add a recording option for a song, group message, chant, or keepsake from the event.",
        },
      ]}
      faqs={[
        { q: "What kinds of private events can you host?", a: "Corporate events, team-building events, adult birthdays, private parties, karaoke nights, school groups, and family celebrations." },
        { q: "Can adults book events at Headliner?", a: "Yes. Private events can be built for adults, kids, teens, or mixed-age groups." },
        { q: "Do you offer corporate team-building?", a: "Yes. We can build a music-based team event with karaoke, group performance, recording, or band-style activities." },
        { q: "Can we do karaoke?", a: "Yes. Private karaoke parties are one of the easiest event formats to set up." },
        { q: "Can guests play instruments?", a: "Yes. For some events, guests can try instruments and play simple parts with help from Headliner staff." },
        { q: "Can we add recording?", a: "Yes. Recording can be added depending on the event format and schedule." },
        { q: "Can we bring food and drinks?", a: "Yes. You can bring your own food and drinks. For adult events, BYOB is welcome; alcohol is not offered or sold by Headliner." },
        { q: "How much does it cost?", a: "Pricing depends on the date, length, group size, staffing, and event format." },
      ]}
      ctaTitle="Plan a private music event."
      ctaBody="Send the date, group size, age range, and the kind of experience you want."
    />
  );
}