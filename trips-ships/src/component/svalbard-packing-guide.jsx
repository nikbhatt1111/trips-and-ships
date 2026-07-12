import React, { useState } from "react";
import {
  Anchor, Moon, SunMedium, Play, ChevronDown, MapPin, Shirt, Footprints,
  Camera, Backpack, Zap, HeartPulse, CheckCircle2, XCircle, Snowflake
} from "lucide-react";
import "./tsa-common.css";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.tripsandships.com/#organization", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "logo": "https://www.tripsandships.com/logo.png" },
    { "@type": "TravelAgency", "@id": "https://www.tripsandships.com/#travelagency", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "priceRange": "$$$$", "areaServed": "Worldwide" },
    { "@type": "Person", "@id": "https://www.tripsandships.com/#angelahughes", "name": "Angela Hughes", "jobTitle": "CEO", "worksFor": { "@id": "https://www.tripsandships.com/#organization" }, "description": "Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with over 40 years of luxury travel experience." },
    {
      "@type": "WebPage", "@id": "https://www.tripsandships.com/svalbard-packing-guide", "url": "https://www.tripsandships.com/svalbard-packing-guide",
      "name": "Svalbard Packing Guide", "headline": "Svalbard Packing Guide | What to Pack for an Arctic Expedition",
      "description": "Discover exactly what to pack for Svalbard, including clothing, footwear, camera gear, accessories, and Arctic travel essentials.",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }, "breadcrumb": { "@id": "https://www.tripsandships.com/svalbard-packing-guide#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList", "@id": "https://www.tripsandships.com/svalbard-packing-guide#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tripsandships.com" },
        { "@type": "ListItem", "position": 2, "name": "Arctic Cruises", "item": "https://www.tripsandships.com/arctic-cruises" },
        { "@type": "ListItem", "position": 3, "name": "Svalbard Packing Guide", "item": "https://www.tripsandships.com/svalbard-packing-guide" }
      ]
    },
    {
      "@type": "HowTo", "@id": "https://www.tripsandships.com/svalbard-packing-guide#howto", "name": "How to Pack for a Svalbard Expedition",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Pack thermal base layers", "text": "Bring moisture-wicking thermal tops and bottoms to provide warmth and comfort." },
        { "@type": "HowToStep", "position": 2, "name": "Add insulating mid-layers", "text": "Pack fleece or insulated jackets to retain body heat." },
        { "@type": "HowToStep", "position": 3, "name": "Bring waterproof outerwear", "text": "A waterproof jacket and trousers protect against rain, snow, and sea spray." },
        { "@type": "HowToStep", "position": 4, "name": "Pack proper footwear", "text": "Bring waterproof hiking boots and warm wool socks for shore excursions." },
        { "@type": "HowToStep", "position": 5, "name": "Prepare for wildlife viewing", "text": "Pack binoculars, a telephoto camera lens, spare batteries, and memory cards." },
        { "@type": "HowToStep", "position": 6, "name": "Pack essential accessories", "text": "Include gloves, a warm hat, sunglasses, sunscreen, medications, and a waterproof daypack." }
      ]
    },
    {
      "@type": "FAQPage", "@id": "https://www.tripsandships.com/svalbard-packing-guide#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What clothes should I pack for Svalbard?", "acceptedAnswer": { "@type": "Answer", "text": "Layered clothing, waterproof outerwear, thermal base layers, and insulated mid-layers are recommended." } },
        { "@type": "Question", "name": "Is Svalbard extremely cold in summer?", "acceptedAnswer": { "@type": "Answer", "text": "No. Summer temperatures generally range from 2°C to 8°C, although wind and rain can make it feel colder." } },
        { "@type": "Question", "name": "Are waterproof boots provided?", "acceptedAnswer": { "@type": "Answer", "text": "Many expedition cruise operators provide waterproof boots for shore landings, though availability varies by itinerary." } },
        { "@type": "Question", "name": "What camera lens is best?", "acceptedAnswer": { "@type": "Answer", "text": "A telephoto lens between 300mm and 600mm is ideal for Arctic wildlife photography." } },
        { "@type": "Question", "name": "Can I wear jeans?", "acceptedAnswer": { "@type": "Answer", "text": "Jeans are not recommended for outdoor activities because they absorb moisture and provide little insulation." } }
      ]
    }
  ]
};

function SchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />;
}

export default function SvalbardPackingGuide() {
  const [theme, setTheme] = useState("light");
  const [openFaq1, setOpenFaq1] = useState(false);
  const [openFaq2, setOpenFaq2] = useState(false);
  const [openFaq3, setOpenFaq3] = useState(false);
  const [openFaq4, setOpenFaq4] = useState(false);

  return (
    <div className="tsa_page" data-theme={theme}>
      <SchemaScript />

      <header className="tsa-nav">
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8"><Anchor size={20} color="var(--tsa-navy)" /><span className="tsa-logo">Trips &amp; Ships</span></div>
          <div className="tsa-flex tsa-gap-16">
            <span className="tsa-muted" style={{ fontSize: 13, fontWeight: 600 }}>ARCTIC CRUISES / SVALBARD</span>
            <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", height: "80vh", minHeight: 540, overflow: "hidden" }}>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Polar_bear_(Ursus_maritimus)_in_the_drift_ice_region_north_of_Svalbard.jpg"
          alt="Arctic sea ice landscape, Svalbard"
          className="tsa-img-cover"
          style={{ position: "absolute", inset: 0, filter: "saturate(0.85)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #0f1c2ef5 0%, #0f1c2e66 50%, #0f1c2e33 100%)" }} />
        <div className="tsa-container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 72 }}>
          <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Svalbard Packing Guide</span>
          <h1 className="tsa-h1" style={{ color: "#fff", marginTop: 14, maxWidth: 780 }}>Everything You Need to Pack for an Unforgettable Arctic Expedition</h1>
          <p style={{ color: "#dce7f2", fontSize: 18, maxWidth: 580, marginTop: 18 }}>
            Weather changes fast and temperatures stay cool even in summer. Here's how to pack smart, not heavy.
          </p>
          <div className="tsa-flex tsa-gap-16 tsa-mt-32">
            <a href="#plan" className="tsa-btn tsa-btn--gold">Explore Svalbard Expeditions</a>
            <a href="#checklist" className="tsa-btn tsa-btn--outline">Jump to the Checklist</a>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 720 }}>
          <span className="tsa-eyebrow tsa-center" style={{ justifyContent: "center" }}>Quick Answer</span>
          <h2 className="tsa-h2 tsa-mt-16">What should you pack for Svalbard?</h2>
          <p className="tsa-muted tsa-mt-16">
            The key is dressing in layers. Even during summer, temperatures typically range between 2°C and 8°C (36°F–46°F), with wind, rain, and occasional snow possible. Bring waterproof outerwear, warm insulating layers, thermal clothing, sturdy footwear, and accessories that keep you comfortable on outdoor wildlife excursions. Many operators also provide items such as waterproof boots and expedition jackets on selected voyages.
          </p>
        </div>
      </section>

      {/* CLOTHING SECTION */}
      <section id="checklist" className="tsa-section--soft">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="tsa-icon-tile"><Shirt size={22} /></div>
            <h2 className="tsa-h2 tsa-mt-16">Essential Clothing</h2>
            <p className="tsa-muted tsa-mt-16">Pack clothing that layers throughout the day: a waterproof shell jacket, waterproof trousers, insulated fleece, a down or synthetic insulated jacket, thermal tops and leggings, lightweight hiking pants, and comfortable clothing for evenings onboard. Choose breathable technical fabrics instead of cotton whenever possible.</p>
            <ul className="tsa-mt-24" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Waterproof shell jacket — essential</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Waterproof trousers — recommended</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Insulated mid layer — essential</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Thermal base layers — essential</li>
            </ul>
          </div>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Reindeer,_Alkhornet,_Svalbard,_Arctic_(20095870608).jpg" alt="Layered outdoor clothing conditions, Svalbard tundra" className="tsa-img-cover" />
          </div>
        </div>
      </section>

      {/* FOOTWEAR + ACCESSORIES */}
      <section className="tsa-section">
        <div className="tsa-container tsa-grid tsa-grid-3">
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Footprints size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Footwear</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Waterproof hiking boots, comfortable walking shoes, wool socks, extra socks, and lightweight slippers for onboard use. Many expedition cruises provide waterproof boots for shore landings.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Snowflake size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Cold Weather Accessories</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>A warm knit hat, waterproof gloves, thin liner gloves, a neck gaiter or scarf, and optional hand warmers — small items that significantly improve comfort during Zodiac cruises.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Backpack size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Day Pack</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>A small waterproof backpack to carry a water bottle, camera, extra gloves, a hat, snacks, sunscreen, binoculars, and a waterproof layer on every excursion.</p>
          </div>
        </div>
      </section>

      {/* CAMERA + BINOCULARS + VIDEO */}
      <section className="tsa-section--dark">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Photography &amp; Optics</span>
            <h2 className="tsa-h2 tsa-mt-16">Camera gear worth the extra weight</h2>
            <p className="tsa-muted tsa-mt-16">Svalbard is one of the world's finest wildlife photography destinations. Bring a DSLR or mirrorless camera, a telephoto lens (300–600mm), a wide-angle lens, extra batteries, memory cards, a waterproof camera bag, and a lens cleaning cloth. Cold temperatures reduce battery life, so carry spares.</p>
            <p className="tsa-muted tsa-mt-16">A quality pair of binoculars is just as essential — ideal for spotting polar bears, walruses, whales, Arctic foxes, seabirds, and glaciers from the ship's deck.</p>
          </div>
          <div className="tsa-video">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Svalbard_Expedition_Centre,_vei_400,_Longyearbyen.jpg" alt="Svalbard Expedition Centre" />
            <span className="tsa-video-label">Packing for the Midnight Sun</span>
            <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={26} fill="var(--tsa-navy)" /></div></div>
          </div>
        </div>
      </section>

      {/* WHAT'S PROVIDED VS WHAT TO LEAVE HOME */}
      <section className="tsa-section--soft">
        <div className="tsa-container tsa-grid tsa-grid-2">
          <div className="tsa-card tsa-card-pad">
            <h4 style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>What Your Expedition Cruise May Provide</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Waterproof expedition boots (loan)</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Expedition jacket</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Walking poles on selected itineraries</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14 }}><CheckCircle2 size={16} color="var(--tsa-green)" /> Life jackets &amp; Zodiac safety equipment</li>
            </ul>
            <p className="tsa-muted tsa-mt-16" style={{ fontSize: 13 }}>Always confirm specific inclusions with your specialist before departure.</p>
          </div>
          <div className="tsa-card tsa-card-pad">
            <h4 style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>What Not to Pack</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14, color: "var(--tsa-text-muted)" }}><XCircle size={16} color="var(--tsa-red)" /> Heavy suitcases and formal evening wear</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14, color: "var(--tsa-text-muted)" }}><XCircle size={16} color="var(--tsa-red)" /> High heels and umbrellas</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14, color: "var(--tsa-text-muted)" }}><XCircle size={16} color="var(--tsa-red)" /> Excess clothing and hair dryers (often provided)</li>
              <li className="tsa-flex tsa-gap-8" style={{ fontSize: 14, color: "var(--tsa-text-muted)" }}><XCircle size={16} color="var(--tsa-red)" /> Large amounts of cash</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PERSONAL ESSENTIALS + ELECTRONICS */}
      <section className="tsa-section">
        <div className="tsa-container tsa-grid tsa-grid-2">
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><HeartPulse size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Personal Essentials</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Passport, travel insurance documents, prescription medications, lip balm, moisturizer, sunscreen, sunglasses, toiletries, and motion sickness medication if needed.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Zap size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Electronics</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>A universal travel adapter, phone charger, camera charger, power bank, and USB cables. Most expedition ships offer charging facilities in cabins.</p>
          </div>
        </div>
      </section>

      {/* WHY PACK CAREFULLY / QUOTE */}
      <section className="tsa-section--soft tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: "var(--tsa-font-display)", fontSize: 24, color: "var(--tsa-navy)", lineHeight: 1.5, fontStyle: "italic" }}>
            "The biggest surprise for first-time visitors is that Svalbard isn't about extreme cold — it's about changing conditions. Layering is the secret."
          </p>
          <p className="tsa-muted tsa-mt-16" style={{ fontWeight: 600 }}>Angela Hughes — CEO, Trips &amp; Ships · 40+ Years in Luxury Travel</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="tsa-section" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="tsa-container">
          <span className="tsa-eyebrow">Frequently Asked Questions</span>
          <h2 className="tsa-h2 tsa-mt-16">Packing Questions, Answered</h2>
          <div className="tsa-mt-32">
            <div className={`tsa-faq-item${openFaq1 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq1(!openFaq1)}>Is Svalbard extremely cold in summer?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Not usually. Summer temperatures typically range from 2°C to 8°C, but wind and rain can make it feel colder.</div>
            </div>
            <div className={`tsa-faq-item${openFaq2 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq2(!openFaq2)}>Are waterproof boots provided?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Many expedition cruise operators provide waterproof boots for shore landings, though policies vary by itinerary.</div>
            </div>
            <div className={`tsa-faq-item${openFaq3 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq3(!openFaq3)}>What camera lens is best?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">A telephoto lens between 300mm and 600mm is ideal for wildlife photography.</div>
            </div>
            <div className={`tsa-faq-item${openFaq4 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq4(!openFaq4)}>Can I wear jeans?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Jeans are not ideal outdoors because they absorb moisture and provide little insulation. Technical outdoor clothing is a better choice.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tsa-section" id="plan">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <h2 className="tsa-h2 tsa-mt-16">Ready for your Svalbard expedition?</h2>
            <p style={{ color: "#c9d6e8", maxWidth: 520, margin: "16px auto 0" }}>With the right clothing and equipment, you'll be ready for every wildlife encounter, glacier cruise, and Arctic landscape in complete comfort.</p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Schedule a Consultation</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Download Your Packing Checklist</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Request a Cruise Quote</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 0", borderTop: "1px solid var(--tsa-navy-border)" }}>
        <div className="tsa-container tsa-flex" style={{ justifyContent: "space-between" }}>
          <span className="tsa-muted" style={{ fontSize: 13 }}>© Trips &amp; Ships Luxury Travel</span>
          <span className="tsa-muted tsa-flex tsa-gap-8" style={{ fontSize: 13 }}><MapPin size={14} /> Svalbard, Norway</span>
        </div>
      </footer>
    </div>
  );
}