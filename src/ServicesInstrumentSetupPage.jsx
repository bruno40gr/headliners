import ServicesPage from "./ServicesPage";

export default function ServicesInstrumentSetupPage(props) {
  return (
    <ServicesPage
      {...props}
      pageName="Instrument setup"
      eyebrow="Gear and setup"
      title="Instrument setup"
      intro="Help with instrument electronics, pedalboards, synth rigs, signal flow, and home studio gear in Rocklin."
      listIntro="Setup support for instruments and rigs that need attention, troubleshooting, or a cleaner signal path."
      serviceList={[
        "Instrument electronics",
        "Pedalboard setup",
        "Synth rigs",
        "Signal flow help",
        "Home studio gear",
      ]}
      galleryIntro="Examples of the kinds of gear setups and signal paths this page is meant to cover."
      gallery={[
        {
          image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80",
          alt: "Electric guitar and amplifier setup",
          title: "Instrument electronics",
          caption: "A place to start when the instrument or signal path is not working the way it should.",
        },
        {
          image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80",
          alt: "Pedalboard and live performance equipment",
          title: "Rigs and routing",
          caption: "Useful for pedalboards, synth setups, and home or live signal chains.",
        },
        {
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
          alt: "Music workstation with synths and studio gear",
          title: "Home studio gear",
          caption: "A better fit for setups that need a clearer workflow or connection path.",
        },
      ]}
      faqs={[
        { q: "Is this only for guitars and basses?", a: "No. This page also covers synths, pedalboards, electronic music gear, and home setups." },
        { q: "Can I reach out if I am not sure how to describe the issue?", a: "Yes. A short note about the gear and what is going wrong is enough to start." },
        { q: "Is pricing listed online?", a: "Not yet. These requests can vary a lot depending on the gear and the problem." },
      ]}
      ctaTitle="Tell us about the gear."
      ctaBody="Send us a note about the instrument, setup, or rig you are working with and what needs attention."
    />
  );
}
