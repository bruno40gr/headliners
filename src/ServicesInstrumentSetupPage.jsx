import ServicesPage from "./ServicesPage";

export default function ServicesInstrumentSetupPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Instrument Setup"
      title="Instrument and gear services in Rocklin"
      sectionTitle="Setups, repairs, upgrades, and routing"
      intro="Setup, repair, upgrade, and routing help for guitars, basses, pedalboards, electronics, MIDI gear, and drum hardware."
      listIntro="Headliner works on the practical problems musicians run into with their gear. That includes guitar and bass adjustments, light electronics, shielding, pedalboard layout, signal flow, MIDI routing, and drum kit hardware."
      serviceList={[
        "Guitar and bass adjustments",
        "Light electronics, upgrades, and shielding",
        "Pedalboard layout, power, and routing",
        "Signal flow and MIDI routing",
        "Drum kit hardware",
        "Setup for lessons, rehearsals, recording, and shows",
      ]}
      galleryIntro="Instrument and gear services available at Headliner."
      gallery={[
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789612893/f972d9db-b491-4edf-8ef9-f2371a92157b.png",
          alt: "Instrument setup service at Headliner Music Academy",
          title: "Instrument and gear services",
          caption: "Setup, repair, upgrade, and routing help for musicians and their gear.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789613173/c5d5fa52-4099-40fe-be56-42d14ce153c0.png",
          alt: "Guitar and bass setup work",
          title: "Guitar and bass work",
          caption: "Playability adjustments for guitars and basses, including truss rod, action, intonation, pickup height, and hardware checks.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789613007/620bba36-a6da-41fa-a97a-6e399599a614.png",
          alt: "Instrument electronics and shielding work",
          title: "Electronics and shielding",
          caption: "Light electronics work, basic wiring, connection issues, upgrades, shielding, and noise reduction.",
        },
        {
          image: "https://res.cloudinary.com/diy08lj9x/image/upload/v1789613076/a7ad0776-8075-439d-92ab-c4d6420d594a.png",
          alt: "Pedalboard setup and signal routing",
          title: "Pedalboards, signal flow, and MIDI",
          caption: "Pedal order, cable routing, power, MIDI routing, noise issues, and cleaner paths for practice, recording, and live use.",
        },
        {
          image: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=1200&q=80",
          alt: "Drum kit hardware and cymbal stands",
          title: "Drum kit hardware",
          caption: "Help with pedals, stands, mounts, loose hardware, positioning, and general kit hardware work.",
        },
      ]}
      faqs={[
        { q: "What gear do you work on?", a: "We work on guitars, basses, pedalboards, signal flow, MIDI routing, light electronics, and drum kit hardware." },
        { q: "Do you do guitar and bass setups?", a: "Yes. Guitar and bass work can include truss rod adjustment, action, intonation, pickup height, and hardware checks." },
        { q: "Do you handle electronics?", a: "Yes. We handle light electronics, basic wiring, connection issues, electronic upgrades, shielding, and noise reduction." },
        { q: "Can you help with pedalboards?", a: "Yes. We can help with pedal order, routing, power, cable paths, noise issues, signal flow, and MIDI routing." },
        { q: "Do you work on drum kits?", a: "We help with drum kit hardware, including pedals, stands, mounts, loose hardware, and positioning." },
        { q: "How much does gear work cost?", a: "Pricing depends on the gear and the work needed." },
      ]}
      ctaTitle="Bring us the gear problem."
      ctaBody="Tell us what is not working, what you want changed, or what you need ready for rehearsal, recording, or performance."
    />
  );
}
