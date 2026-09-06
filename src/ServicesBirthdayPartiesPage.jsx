import ServicesPage from "./ServicesPage";

export default function ServicesBirthdayPartiesPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Birthday parties"
      title="Music birthday parties for kids in Rocklin"
      sectionTitle="Pick the party that fits the age group"
      intro="Celebrate at Headliner with a music birthday party led by trained, energetic, kid-friendly staff. Choose from karaoke, rock band, DJ, recording, or younger-kids music party options."
      listIntro="Party options can be playful, performance-focused, or built around singing and recording. Each party includes staff-led music activities, time for cake and presents, and use of our party area with kitchenette."
      serviceList={[
        "Party Director and staff-led music activities",
        "Karaoke, rock band, DJ, and recording party options",
        "Little Rockers parties with rhythm and movement",
        "Digital recordings for select party types",
        "Bring your own food, drinks, dessert, and decorations",
        "Goodie bags, free trial lesson passes, and birthday T-shirt",
        "Comfortable for up to 12 kids",
      ]}
      galleryIntro="Music birthday party options available at Headliner."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
          alt: "Kids birthday party with balloons and decorations",
          title: "Kids music birthday parties",
          caption: "Karaoke, instruments, games, DJ music, recording, and party time at Headliner.",
        },
        {
          image: "https://images.unsplash.com/photo-1522863602463-afebb8886ab2?w=1200&q=80",
          alt: "Child singing into a microphone",
          title: "Karaoke Party",
          caption: "For ages 6 and up. Kids sing a song of their choice with coaching, harmonies, and a recording session with our sound engineer.",
        },
        {
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
          alt: "Kids and teens playing music together as a band",
          title: "Rock Band Party",
          caption: "For ages 7 and up. Kids choose instruments, rehearse together, and record a song. Parents can join for the final performance when the group is ready.",
        },
        {
          image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
          alt: "Young kids enjoying music activities together",
          title: "Little Rockers Party",
          caption: "For ages 4 to 6. Rhythm games, movement, and hands-on time with real instruments, led by one of our early childhood music teachers.",
        },
        {
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
          alt: "DJ setup for a kids party",
          title: "DJ Party",
          caption: "A music party for older kids and teens with DJ music, microphones, and a party-room feel.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854657/1151af51-5dfa-47d6-84b9-977d87bba218.png",
          alt: "Headliner party area for cake snacks and presents",
          title: "Cake, presents, and party room",
          caption: "Bring your own food, drinks, dessert, and decorations. We provide a party area with kitchenette for the non-music part of the celebration.",
        },
      ]}
      faqs={[
        { q: "What ages are birthday parties for?", a: "We offer options for younger kids, school-age kids, and teens." },
        { q: "What party types can we choose from?", a: "Karaoke, rock band, DJ, recording, and Little Rockers parties." },
        { q: "Do kids need music experience?", a: "No. Our staff can lead beginner-friendly activities." },
        { q: "Can we bring food and decorations?", a: "Yes. Families can bring food, drinks, dessert, and decorations." },
        { q: "Is there a party area?", a: "Yes. Parties include use of a designated area with kitchenette." },
        { q: "Are recordings included?", a: "Select party types include digital recordings for parents." },
        { q: "How many kids can attend?", a: "The space is comfortable for up to 12 kids." },
        { q: "Do parties include staff?", a: "Yes. Parties include a Party Director and trained Headliner staff." },
      ]}
      ctaTitle="Plan a music birthday party."
      ctaBody="Tell us the date, age group, and party style you are interested in."
    />
  );
}