import React, { useState } from "react";
import {
  Anchor, Moon, SunMedium, Play, ChevronDown, MapPin, Binoculars,
  ShieldCheck, Camera, Compass, PawPrint
} from "lucide-react";
import "./tsa-common.css";

/* Schema.org JSON-LD for this page */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.tripsandships.com/#organization", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "logo": "https://www.tripsandships.com/logo.png" },
    { "@type": "TravelAgency", "@id": "https://www.tripsandships.com/#travelagency", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "priceRange": "$$$$", "areaServed": "Worldwide" },
    { "@type": "Person", "@id": "https://www.tripsandships.com/#angelahughes", "name": "Angela Hughes", "jobTitle": "CEO", "worksFor": { "@id": "https://www.tripsandships.com/#organization" }, "description": "Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience." },
    {
      "@type": "WebPage", "@id": "https://www.tripsandships.com/svalbard-wildlife", "url": "https://www.tripsandships.com/svalbard-wildlife",
      "name": "Svalbard Wildlife Guide", "headline": "Svalbard Wildlife Guide | Polar Bears, Whales, Walruses & Arctic Wildlife",
      "description": "Explore the ultimate Svalbard Wildlife Guide featuring polar bears, whales, walruses, Arctic foxes, reindeer, seabirds, and more.",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }, "breadcrumb": { "@id": "https://www.tripsandships.com/svalbard-wildlife#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList", "@id": "https://www.tripsandships.com/svalbard-wildlife#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tripsandships.com" },
        { "@type": "ListItem", "position": 2, "name": "Arctic Cruises", "item": "https://www.tripsandships.com/arctic-cruises" },
        { "@type": "ListItem", "position": 3, "name": "Svalbard Wildlife Guide", "item": "https://www.tripsandships.com/svalbard-wildlife" }
      ]
    },
    {
      "@type": "FAQPage", "@id": "https://www.tripsandships.com/svalbard-wildlife#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What animals live in Svalbard?", "acceptedAnswer": { "@type": "Answer", "text": "Svalbard is home to polar bears, walruses, whales, Arctic foxes, Svalbard reindeer, seals, and millions of seabirds." } },
        { "@type": "Question", "name": "What is the best time for wildlife viewing?", "acceptedAnswer": { "@type": "Answer", "text": "June through August generally offers the best opportunities for wildlife viewing during expedition cruise season." } },
        { "@type": "Question", "name": "Can I see polar bears in Svalbard?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Svalbard is one of the world's premier destinations for observing wild polar bears." } },
        { "@type": "Question", "name": "Are whale sightings common?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Beluga, minke, blue, fin, and humpback whales may be seen during the summer months." } },
        { "@type": "Question", "name": "Are wildlife sightings guaranteed?", "acceptedAnswer": { "@type": "Answer", "text": "No. Wildlife is completely wild, so sightings can never be guaranteed." } }
      ]
    }
  ]
};

function SchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />;
}

export default function SvalbardWildlifeGuide() {
  const [theme, setTheme] = useState("light");
  const [openFaq1, setOpenFaq1] = useState(false);
  const [openFaq2, setOpenFaq2] = useState(false);
  const [openFaq3, setOpenFaq3] = useState(false);
  const [openFaq4, setOpenFaq4] = useState(false);
  const [openFaq5, setOpenFaq5] = useState(false);

  return (
    <div className="tsa_page" data-theme={theme}>
      <SchemaScript />

      {/* NAV */}
      <header className="tsa-nav">
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8">
            <Anchor size={20} color="var(--tsa-navy)" />
            <span className="tsa-logo">Trips &amp; Ships</span>
          </div>
          <div className="tsa-flex tsa-gap-16">
            <span className="tsa-muted" style={{ fontSize: 13, fontWeight: 600 }}>ARCTIC CRUISES / SVALBARD</span>
            <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", height: "88vh", minHeight: 580, overflow: "hidden" }}>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Polar_bear_(Ursus_maritimus)_in_the_drift_ice_region_north_of_Svalbard.jpg"
          alt="Polar bear on drift ice north of Svalbard"
          className="tsa-img-cover"
          style={{ position: "absolute", inset: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #0f1c2ef5 0%, #0f1c2e55 45%, #0f1c2e22 100%)" }} />
        <div className="tsa-container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 72 }}>
          <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Svalbard Wildlife Guide</span>
          <h1 className="tsa-h1" style={{ color: "#fff", marginTop: 14, maxWidth: 820 }}>
            Discover the Incredible Wildlife of the High Arctic
          </h1>
          <p style={{ color: "#dce7f2", fontSize: 18, maxWidth: 600, marginTop: 18 }}>
            Polar bears, walruses, whales, Arctic foxes, reindeer, seals, and millions of nesting seabirds — all within reach of a single expedition ship.
          </p>
          <div className="tsa-flex tsa-gap-16 tsa-mt-32">
            <a href="#plan" className="tsa-btn tsa-btn--gold">Explore Svalbard Wildlife Expeditions</a>
            <a href="#animals" className="tsa-btn tsa-btn--outline">Speak with a Wildlife Specialist</a>
          </div>
        </div>
      </section>

      {/* AT A GLANCE STAT STRIP */}
      <section className="tsa-section--tight">
        <div className="tsa-container tsa-grid tsa-grid-4">
          <div className="tsa-stat"><div className="tsa-stat-num">June–Aug</div><div className="tsa-stat-label">Peak Wildlife Season</div></div>
          <div className="tsa-stat"><div className="tsa-stat-num">300+</div><div className="tsa-stat-label">Resident Polar Bears</div></div>
          <div className="tsa-stat"><div className="tsa-stat-num">5</div><div className="tsa-stat-label">Whale Species Sighted</div></div>
          <div className="tsa-stat"><div className="tsa-stat-num">Millions</div><div className="tsa-stat-label">Nesting Seabirds</div></div>
        </div>
      </section>

      {/* WHY A WILDLIFE PARADISE */}
      <section className="tsa-section--soft">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow">Why Svalbard</span>
            <h2 className="tsa-h2 tsa-mt-16">A wildlife paradise built by geography</h2>
            <p className="tsa-mt-16 tsa-muted">
              Svalbard sits between mainland Norway and the North Pole, a remote archipelago of vast protected wilderness, minimal human population, and rich Arctic marine ecosystems. Productive coastal waters, extensive glaciers, seasonal sea ice, and strictly protected national parks combine to create ideal habitat for a remarkable diversity of Arctic wildlife.
            </p>
            <p className="tsa-mt-16 tsa-muted">
              Unlike traditional sightseeing vacations, wildlife encounters here are genuinely wild and unpredictable — every expedition offers a different story, guided by expert naturalists dedicated to conservation and responsible exploration.
            </p>
          </div>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Walrus_(Odobenus_rosmarus)_on_Svalbard.jpg" alt="Walrus hauled out on Svalbard" className="tsa-img-cover" />
          </div>
        </div>
      </section>

      {/* POLAR BEARS */}
      <section id="animals" className="tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Endangered_arctic_-_starving_polar_bear.jpg" alt="Polar bear on Svalbard sea ice" className="tsa-img-cover" />
          </div>
          <div>
            <span className="tsa-badge">Ursus maritimus</span>
            <h3 className="tsa-h3 tsa-mt-16" style={{ fontSize: 30 }}>Polar Bears</h3>
            <p className="tsa-mt-16 tsa-muted">The undisputed icon of Svalbard, and the world's largest land predator. Bears are best viewed from expedition ships near the sea ice, under strict viewing guidelines and expert wildlife interpretation — the best opportunities occur during summer expedition cruises, from June through August.</p>
            <div className="tsa-flex tsa-gap-8 tsa-mt-24" style={{ flexWrap: "wrap" }}>
              <span className="tsa-badge">Seen near sea ice</span>
              <span className="tsa-badge">Best viewed from ship</span>
              <span className="tsa-badge">Outstanding photography</span>
            </div>
          </div>
        </div>
      </section>

      {/* WALRUSES */}
      <section className="tsa-section--soft">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", direction: "rtl" }}>
          <div className="tsa-media tsa-ratio-4-3" style={{ direction: "ltr" }}>
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Walrus_(Odobenus_rosmarus)_on_Svalbard.jpg" alt="Walrus haul-out colony" className="tsa-img-cover" />
          </div>
          <div style={{ direction: "ltr" }}>
            <span className="tsa-badge">Odobenus rosmarus</span>
            <h3 className="tsa-h3 tsa-mt-16" style={{ fontSize: 30 }}>Walruses</h3>
            <p className="tsa-mt-16 tsa-muted">Among Svalbard's most entertaining animals — massive tusks, deeply social behavior, and large haul-out colonies along coastal beaches. Summer provides the highest chances of sightings, with excellent Zodiac viewing of swimming groups and beach colonies alike.</p>
            <div className="tsa-flex tsa-gap-8 tsa-mt-24" style={{ flexWrap: "wrap" }}>
              <span className="tsa-badge">Large haul-out colonies</span>
              <span className="tsa-badge">Excellent Zodiac viewing</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHALES + VIDEO */}
      <section className="tsa-section--dark tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Migrating Through Arctic Waters</span>
            <h2 className="tsa-h2 tsa-mt-16">Whales of Svalbard</h2>
            <p className="tsa-muted tsa-mt-16">
              Several whale species migrate through Svalbard's waters each summer, including beluga whales, minke whales, blue whales, fin whales, and humpback whales. Sightings often occur during scenic cruising between landing sites, sometimes within sight of the ship's rail.
            </p>
            <a href="#plan" className="tsa-btn tsa-btn--gold tsa-mt-24">Speak with a Specialist</a>
          </div>
          <div className="tsa-video">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Beluga_whale.png" alt="Beluga whale" />
            <span className="tsa-video-tag">3 min film</span>
            <span className="tsa-video-label">Whales of the High Arctic</span>
            <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={26} fill="var(--tsa-navy)" /></div></div>
          </div>
        </div>
      </section>

      {/* ARCTIC FOX + REINDEER SIDE BY SIDE */}
      <section className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">On the Tundra</span>
          <h2 className="tsa-h2 tsa-mt-16">Arctic foxes and Svalbard reindeer</h2>
          <div className="tsa-grid tsa-grid-2 tsa-mt-32">
            <div className="tsa-card tsa-card--hover" style={{ overflow: "hidden" }}>
              <div className="tsa-ratio-4-3"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Fox_in_Alkhornet,_Svalbard,_Arctic_(19661233784).jpg" alt="Arctic fox at Alkhornet, Svalbard" className="tsa-img-cover" style={{ height: "100%" }} /></div>
              <div className="tsa-card-pad">
                <h4 style={{ fontWeight: 700, fontSize: 18 }}>Arctic Foxes</h4>
                <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>These adaptable predators remain active year-round, shifting between a brown summer coat and pure white winter camouflage. Curious and photogenic, they're commonly seen near bird cliffs and tundra habitats.</p>
              </div>
            </div>
            <div className="tsa-card tsa-card--hover" style={{ overflow: "hidden" }}>
              <div className="tsa-ratio-4-3"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Reindeer,_Alkhornet,_Svalbard,_Arctic_(20095870608).jpg" alt="Svalbard reindeer grazing tundra" className="tsa-img-cover" style={{ height: "100%" }} /></div>
              <div className="tsa-card-pad">
                <h4 style={{ fontWeight: 700, fontSize: 18 }}>Svalbard Reindeer</h4>
                <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Unique to the archipelago, Svalbard reindeer are smaller and stockier than their mainland cousins. They graze freely near settlements and along hiking routes, making them among the easiest mammals to observe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEABIRDS GALLERY */}
      <section className="tsa-section--soft">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Bird Cliffs</span>
          <h2 className="tsa-h2 tsa-mt-16">Millions of seabirds nest here each summer</h2>
          <p className="tsa-muted tsa-mt-16" style={{ maxWidth: 640 }}>Puffins, little auks, ivory gulls, kittiwakes, fulmars, Arctic terns, and Brünnich's guillemots turn towering bird cliffs into some of the Arctic's most spectacular wildlife spectacles.</p>
          <div className="tsa-gallery tsa-mt-32" style={{ height: 480 }}>
            <div className="tsa-media" style={{ height: "100%" }}><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Puffin_(Fratercula_arctica).jpg" className="tsa-img-cover" alt="Atlantic puffin" /></div>
            <div className="tsa-media"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Fox_in_Alkhornet,_Svalbard,_Arctic_(19661233784).jpg" className="tsa-img-cover" alt="Arctic fox" /></div>
            <div className="tsa-media"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Walrus_(Odobenus_rosmarus)_on_Svalbard.jpg" className="tsa-img-cover" alt="Walrus" /></div>
            <div className="tsa-media"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Reindeer,_Alkhornet,_Svalbard,_Arctic_(20095870608).jpg" className="tsa-img-cover" alt="Svalbard reindeer" /></div>
            <div className="tsa-media"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Beluga_whale.png" className="tsa-img-cover" alt="Beluga whale" /></div>
          </div>
        </div>
      </section>

      {/* BEST TIME + RESPONSIBLE VIEWING */}
      <section className="tsa-section">
        <div className="tsa-container tsa-grid tsa-grid-3">
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Binoculars size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Best Time for Wildlife</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>June through August offers the best combination of accessibility and wildlife activity — polar bears, walruses, whales, bird colonies, and the Midnight Sun, all within reach of expedition cruises.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><ShieldCheck size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Responsible Viewing</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Leading operators follow strict guidelines: safe viewing distances, no feeding, no disturbance, small-group landings, and respect for nesting sites — protecting Svalbard's ecosystems for future generations.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Camera size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Photography Tips</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Bring a telephoto lens (300–600mm), binoculars, spare batteries, extra memory cards, and a waterproof camera bag. Photography is best during the Midnight Sun, when soft Arctic light lasts all day.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="tsa-section--soft tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: "var(--tsa-font-display)", fontSize: 24, color: "var(--tsa-navy)", lineHeight: 1.5, fontStyle: "italic" }}>
            "From a polar bear walking across sea ice to a pod of beluga whales swimming beside your expedition ship, these moments are unforgettable."
          </p>
          <p className="tsa-muted tsa-mt-16" style={{ fontWeight: 600 }}>Angela Hughes — CEO, Trips &amp; Ships · 40+ Years in Luxury Travel</p>
        </div>
      </section>

      {/* WHY EXPEDITION CRUISE */}
      <section className="tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow">Access the Remote</span>
            <h2 className="tsa-h2 tsa-mt-16">Why choose an expedition cruise?</h2>
            <p className="tsa-mt-16 tsa-muted">Expedition cruises provide access to remote wildlife habitats inaccessible by road — flexible itineraries, Zodiac cruises, glacier landings, wildlife experts, daily lectures, and photography guidance. Independent exploration outside settlements is not recommended due to the presence of polar bears, so every day is guided by experienced expedition teams.</p>
            <div className="tsa-flex tsa-gap-8 tsa-mt-24" style={{ flexWrap: "wrap" }}>
              <span className="tsa-badge">Zodiac cruises</span>
              <span className="tsa-badge">Glacier landings</span>
              <span className="tsa-badge">Daily lectures</span>
              <span className="tsa-badge">Small-group exploration</span>
            </div>
          </div>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Svalbard_Expedition_Centre,_vei_400,_Longyearbyen.jpg" alt="Svalbard Expedition Centre, Longyearbyen" className="tsa-img-cover" />
          </div>
        </div>
      </section>

      {/* FAQ — individually authored, no map */}
      <section className="tsa-section" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="tsa-container">
          <span className="tsa-eyebrow">Frequently Asked Questions</span>
          <h2 className="tsa-h2 tsa-mt-16">Svalbard Wildlife, Answered</h2>
          <div className="tsa-mt-32">
            <div className={`tsa-faq-item${openFaq1 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq1(!openFaq1)}>What animals live in Svalbard?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Polar bears, walruses, whales, Arctic foxes, Svalbard reindeer, seals, and numerous seabirds.</div>
            </div>
            <div className={`tsa-faq-item${openFaq2 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq2(!openFaq2)}>What is the best time for wildlife viewing?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">June through August offers the best overall wildlife opportunities, combining accessibility with peak activity.</div>
            </div>
            <div className={`tsa-faq-item${openFaq3 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq3(!openFaq3)}>Can I see polar bears?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Yes. Svalbard is one of the world's premier destinations for wild polar bear viewing, always from a safe, guided distance.</div>
            </div>
            <div className={`tsa-faq-item${openFaq4 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq4(!openFaq4)}>Are whale sightings common?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Yes. Several whale species visit Svalbard during the summer months, often spotted during scenic cruising.</div>
            </div>
            <div className={`tsa-faq-item${openFaq5 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq5(!openFaq5)}>Are wildlife sightings guaranteed?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">No. Wildlife is completely wild, so sightings can never be guaranteed — which is part of what makes each expedition unique.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tsa-section" id="plan">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <PawPrint size={30} color="var(--tsa-ice)" />
            <h2 className="tsa-h2 tsa-mt-16">Ready to experience Svalbard wildlife?</h2>
            <p style={{ color: "#c9d6e8", maxWidth: 520, margin: "16px auto 0" }}>From majestic polar bears to playful walruses, whales, and millions of nesting seabirds — let our specialists plan the perfect Arctic expedition.</p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Schedule a Consultation</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Compare Arctic Expeditions</a>
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