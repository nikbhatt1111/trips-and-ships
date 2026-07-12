import React, { useState } from "react";
import {
  Anchor, Moon, SunMedium, Play, ChevronDown, MapPin, Ship, Utensils,
  Wifi, ShieldCheck, Calendar, Users, Compass
} from "lucide-react";
import "./tsa-common.css";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.tripsandships.com/#organization", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "logo": "https://www.tripsandships.com/logo.png" },
    { "@type": "TravelAgency", "@id": "https://www.tripsandships.com/#travelagency", "name": "Trips & Ships Luxury Travel", "url": "https://www.tripsandships.com", "priceRange": "$$$$", "areaServed": "Worldwide" },
    { "@type": "Person", "@id": "https://www.tripsandships.com/#angelahughes", "name": "Angela Hughes", "jobTitle": "CEO", "worksFor": { "@id": "https://www.tripsandships.com/#organization" }, "description": "Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience." },
    {
      "@type": "WebPage", "@id": "https://www.tripsandships.com/svalbard-cruise-faq", "url": "https://www.tripsandships.com/svalbard-cruise-faq",
      "name": "Svalbard Cruise FAQ", "headline": "Svalbard Cruise FAQ | Expert Answers to Your Arctic Cruise Questions",
      "description": "Get answers to the most common questions about Svalbard cruises, including the best time to visit, wildlife, cabins, packing, weather, and expedition ships.",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }, "breadcrumb": { "@id": "https://www.tripsandships.com/svalbard-cruise-faq#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList", "@id": "https://www.tripsandships.com/svalbard-cruise-faq#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tripsandships.com" },
        { "@type": "ListItem", "position": 2, "name": "Arctic Cruises", "item": "https://www.tripsandships.com/arctic-cruises" },
        { "@type": "ListItem", "position": 3, "name": "Svalbard Cruise FAQ", "item": "https://www.tripsandships.com/svalbard-cruise-faq" }
      ]
    },
    {
      "@type": "FAQPage", "@id": "https://www.tripsandships.com/svalbard-cruise-faq#faq",
      "mainEntity": [
        { "@type": "Question", "name": "When is the best time to take a Svalbard cruise?", "acceptedAnswer": { "@type": "Answer", "text": "Late May through early September is the main expedition cruise season, with June through August offering the best wildlife viewing." } },
        { "@type": "Question", "name": "Can you see polar bears on a Svalbard cruise?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Svalbard is one of the world's best destinations for observing polar bears in the wild, although sightings can never be guaranteed." } },
        { "@type": "Question", "name": "How long are Svalbard cruises?", "acceptedAnswer": { "@type": "Answer", "text": "Most itineraries range from 7 to 14 days, depending on the cruise line and route." } },
        { "@type": "Question", "name": "Are meals included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most expedition cruises include breakfast, lunch, dinner, and beverages such as coffee and tea." } },
        { "@type": "Question", "name": "Is travel insurance recommended?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Comprehensive travel insurance with expedition cruise coverage is strongly recommended." } }
      ]
    }
  ]
};

function SchemaScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />;
}

export default function SvalbardCruiseFaq() {
  const [theme, setTheme] = useState("light");
  const [openFaq1, setOpenFaq1] = useState(true);
  const [openFaq2, setOpenFaq2] = useState(false);
  const [openFaq3, setOpenFaq3] = useState(false);
  const [openFaq4, setOpenFaq4] = useState(false);
  const [openFaq5, setOpenFaq5] = useState(false);
  const [openFaq6, setOpenFaq6] = useState(false);

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
      <section className="tsa-section" style={{ paddingBottom: 0 }}>
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow">Svalbard Cruise FAQ</span>
            <h1 className="tsa-h1 tsa-mt-16">Everything You Need to Know Before Booking</h1>
            <p className="tsa-lede tsa-mt-16">
              From choosing the best time to visit and understanding wildlife encounters to knowing what to pack and what life onboard is like — answers to the questions travelers ask most often.
            </p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32">
              <a href="#plan" className="tsa-btn tsa-btn--primary">Explore Svalbard Cruises</a>
              <a href="#faq" className="tsa-btn tsa-btn--ghost">Jump to Questions</a>
            </div>
          </div>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/North_Pole_Expedition_Museum,_Longyearbyen.jpg" alt="Longyearbyen, Svalbard" className="tsa-img-cover" />
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 720 }}>
          <h2 className="tsa-h2">What should you know before booking?</h2>
          <p className="tsa-muted tsa-mt-16">
            Svalbard expedition cruises typically operate between late May and early September, offering opportunities to see polar bears, walruses, whales, glaciers, and spectacular Arctic landscapes. Most cruises include expert expedition teams, Zodiac excursions, educational lectures, and guided shore landings. Choosing the right itinerary, ship, and travel season can make a significant difference in your experience.
          </p>
        </div>
      </section>

      {/* BEFORE YOU BOOK / LIFE ONBOARD cards */}
      <section className="tsa-section--soft">
        <div className="tsa-container tsa-grid tsa-grid-3">
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Calendar size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Before You Book</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Consider your best travel season, cruise duration, wildlife priorities, cabin category, budget, packing requirements, travel insurance, and flights and hotels. Our advisors tailor every detail to your goals.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Ship size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Life Onboard</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Comfortable accommodations, daily lectures, excellent dining, observation lounges, science centers on many ships, and friendly, knowledgeable crews throughout your voyage.</p>
          </div>
          <div className="tsa-card tsa-card-pad tsa-card--hover">
            <div className="tsa-icon-tile"><Compass size={22} /></div>
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 18 }}>Expedition Activities</h4>
            <p className="tsa-muted tsa-mt-8" style={{ fontSize: 14 }}>Zodiac cruises, guided shore landings, glacier viewing, wildlife observation, photography, hiking, and scientific presentations, weather and ice permitting.</p>
          </div>
        </div>
      </section>

      {/* WILDLIFE EXPECTATIONS */}
      <section className="tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div className="tsa-media tsa-ratio-4-3">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Walrus_(Odobenus_rosmarus)_on_Svalbard.jpg" alt="Walrus, Svalbard" className="tsa-img-cover" />
          </div>
          <div>
            <span className="tsa-eyebrow">What to Expect</span>
            <h2 className="tsa-h2 tsa-mt-16">Wildlife expectations</h2>
            <p className="tsa-muted tsa-mt-16">Svalbard is one of the world's premier wildlife destinations. Possible sightings include polar bears, walruses, whales, Arctic foxes, reindeer, seals, puffins, and millions of seabirds. Wildlife is unpredictable, which makes every expedition unique — and sightings can never be guaranteed.</p>
            <div className="tsa-flex tsa-gap-8 tsa-mt-24" style={{ flexWrap: "wrap" }}>
              <span className="tsa-badge">Polar bears</span>
              <span className="tsa-badge">Walruses</span>
              <span className="tsa-badge">Whales</span>
              <span className="tsa-badge">Seabirds</span>
            </div>
          </div>
        </div>
      </section>

      {/* WEATHER + VIDEO */}
      <section className="tsa-section--dark">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Weather &amp; Climate</span>
            <h2 className="tsa-h2 tsa-mt-16">What the weather is actually like</h2>
            <p className="tsa-muted tsa-mt-16">Summer temperatures generally range between 2°C and 8°C, though conditions can change quickly — expect wind, rain, cool temperatures, long daylight hours, and glacier breezes. Layered clothing is recommended throughout the season.</p>
            <a href="/svalbard-packing-guide" className="tsa-btn tsa-btn--gold tsa-mt-24">See the Packing Guide</a>
          </div>
          <div className="tsa-video">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Arctic_Reindeer,_Alkhornet,_Svalbard,_Arctic_(20095870608).jpg" alt="Svalbard tundra" />
            <span className="tsa-video-label">A Day Aboard a Svalbard Expedition</span>
            <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={26} fill="var(--tsa-navy)" /></div></div>
          </div>
        </div>
      </section>

      {/* CHOOSING THE RIGHT CRUISE */}
      <section className="tsa-section--soft">
        <div className="tsa-container tsa-grid tsa-grid-4">
          <div className="tsa-card tsa-card-pad">
            <Ship size={20} color="var(--tsa-navy)" />
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 15 }}>Ship Size &amp; Style</h4>
            <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>Expedition style, cabin options, and overall value.</p>
          </div>
          <div className="tsa-card tsa-card-pad">
            <Utensils size={20} color="var(--tsa-navy)" />
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 15 }}>Dining</h4>
            <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>Breakfast, lunch, dinner, and beverages typically included.</p>
          </div>
          <div className="tsa-card tsa-card-pad">
            <Wifi size={20} color="var(--tsa-navy)" />
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 15 }}>Connectivity</h4>
            <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>Wi-Fi is available on many ships; speed varies by location.</p>
          </div>
          <div className="tsa-card tsa-card-pad">
            <ShieldCheck size={20} color="var(--tsa-navy)" />
            <h4 className="tsa-mt-16" style={{ fontWeight: 700, fontSize: 15 }}>Safety</h4>
            <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>Strict protocols, especially during shore landings in bear habitat.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="tsa-section tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: "var(--tsa-font-display)", fontSize: 24, color: "var(--tsa-navy)", lineHeight: 1.5, fontStyle: "italic" }}>
            "Is a Svalbard expedition suitable for first-time expedition travelers? The answer is absolutely yes."
          </p>
          <p className="tsa-muted tsa-mt-16" style={{ fontWeight: 600 }}>Angela Hughes — CEO, Trips &amp; Ships · 40+ Years in Luxury Travel</p>
        </div>
      </section>

      {/* FAQ — individually authored */}
      <section id="faq" className="tsa-section--soft" style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="tsa-container">
          <span className="tsa-eyebrow">Frequently Asked Questions</span>
          <h2 className="tsa-h2 tsa-mt-16">Everything Travelers Ask Us</h2>
          <div className="tsa-mt-32">
            <div className={`tsa-faq-item${openFaq1 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq1(!openFaq1)}>When is the best time to take a Svalbard cruise?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Late May through early September is the main expedition cruise season, with June through August offering the best wildlife viewing.</div>
            </div>
            <div className={`tsa-faq-item${openFaq2 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq2(!openFaq2)}>Can you see polar bears on a Svalbard cruise?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Yes. Svalbard is one of the world's best destinations for observing polar bears in the wild, although sightings can never be guaranteed.</div>
            </div>
            <div className={`tsa-faq-item${openFaq3 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq3(!openFaq3)}>How long are Svalbard cruises?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Most itineraries range from 7 to 14 days, depending on the cruise line and route.</div>
            </div>
            <div className={`tsa-faq-item${openFaq4 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq4(!openFaq4)}>Are meals included?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Yes. Most expedition cruises include breakfast, lunch, dinner, and beverages such as coffee and tea.</div>
            </div>
            <div className={`tsa-faq-item${openFaq5 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq5(!openFaq5)}>Do I need previous expedition experience?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">No. Most Svalbard cruises are suitable for first-time expedition travelers.</div>
            </div>
            <div className={`tsa-faq-item${openFaq6 ? " is-open" : ""}`}>
              <button className="tsa-faq-q" onClick={() => setOpenFaq6(!openFaq6)}>Is travel insurance recommended?<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
              <div className="tsa-faq-a">Yes. Comprehensive travel insurance with expedition cruise coverage is strongly recommended.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tsa-section" id="plan">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <Users size={30} color="var(--tsa-ice)" />
            <h2 className="tsa-h2 tsa-mt-16">Ready to plan your Svalbard expedition?</h2>
            <p style={{ color: "#c9d6e8", maxWidth: 520, margin: "16px auto 0" }}>Whether you're dreaming of polar bears, glaciers, whales, or the Midnight Sun, our experts will help you choose the perfect cruise.</p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Schedule a Consultation</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Compare Svalbard Cruises</a>
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