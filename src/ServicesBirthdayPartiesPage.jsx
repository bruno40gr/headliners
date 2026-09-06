import ServicesPage from "./ServicesPage";

export default function ServicesBirthdayPartiesPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Birthday parties"
      title="Music birthday parties for kids in Rocklin"
      sectionTitle="Karaoke, bands, DJ parties, and recording"
      intro="Headliner hosts music birthday parties for kids and teens with karaoke, instruments, games, recording, and age-appropriate party activities. Parties are led by trained, kid-friendly staff."
      listIntro="Choose a party style based on the age of the kids and the kind of experience you want. We provide a designated party area with a kitchenette, and families can bring cake, snacks, decorations, and outside food."
      serviceList={[
        "Karaoke parties with microphones",
        "Rock band-style party activities",
        "DJ parties for older kids and teens",
        "Recording party options",
        "Designated party area and kitchenette",
        "Comfortable for up to 10 kids",
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
          title: "Karaoke party",
          caption: "Kids sing favorite songs with microphones, group numbers, and a party setup that feels like a real performance.",
        },
        {
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
          alt: "Kids and teens playing music together as a band",
          title: "Rock band party",
          caption: "Kids try instruments, learn simple parts, and play together like a band. Best for school-age kids and teens.",
        },
        {
          image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
          alt: "Young kids enjoying music activities together",
          title: "Young kids music party",
          caption: "A music party for younger kids with rhythm games, simple instruments, movement, and sing-along activities.",
        },
        {
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
          alt: "DJ setup for a kids party",
          title: "DJ party",
          caption: "A music party for older kids and teens with DJ music, microphones, and a party-room feel.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1787854712/e7994742-e89a-4d31-873c-5fc55dc6a028.png",
          alt: "Headliner recording studio setup for a birthday party recording activity",
          title: "Recording party",
          caption: "Kids can record a song, karaoke track, group chant, or birthday message in the studio.",
        },
      ]}
      faqs={[
        { q: "What ages are birthday parties for?", a: "We can plan parties for younger kids, school-age kids, and teens." },
        { q: "What kind of party can we book?", a: "Karaoke, rock band-style, DJ, recording, or younger-kids music parties." },
        { q: "Do kids need music experience?", a: "No. Party activities can be beginner-friendly." },
        { q: "Can we bring food and decorations?", a: "Yes. Families can bring cake, snacks, outside food, and decorations." },
        { q: "Is there a party area?", a: "Yes. We provide a designated party area with a kitchenette." },
        { q: "How many kids can attend?", a: "The space is comfortable for up to 10 kids." },
        { q: "Do parents stay?", a: "Yes. Birthday parties are family-friendly." },
      ]}
      ctaTitle="Plan a music birthday party."
      ctaBody="Tell us the date, age group, and party style you are interested in."
    />
  );
}