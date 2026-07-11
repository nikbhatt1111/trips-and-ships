import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Snowflake,
  Camera,
  Users,
  Compass,
  Clock,
  Sparkles,
  Waves,
  Binoculars,
  Play,
  Anchor,
  ShieldCheck,
  MapPin,
  Bird,
  Fish,
} from "lucide-react";

/**
 * Polar Bears in Svalbard — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS), including
 * the video reel spotlight, filmstrip gallery, and ringed portrait quote
 * patterns introduced in the Antarctica Wildlife Guide.
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: every image/video source below is a placeholder — swap
 * the URLs in PLACEHOLDER_MEDIA for real production assets.
 */

const PLACEHOLDER_MEDIA = {
  reelVideo: "https://www.youtube.com/embed/YtAL8y2lACs?si=XERQ-OcrTlAIBgua",
  portrait: "https://placehold.co/200x200/1c2f4a/8fb4e8?text=A.H.",
};

const JSON_LD = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tripsandships.com/#organization",
      "name": "Trips & Ships Luxury Travel",
      "url": "https://www.tripsandships.com",
      "logo": "https://www.tripsandships.com/logo.png"
    },
    {
      "@type": "TravelAgency",
      "@id": "https://www.tripsandships.com/#travelagency",
      "name": "Trips & Ships Luxury Travel",
      "url": "https://www.tripsandships.com",
      "priceRange": "$$$$",
      "areaServed": "Worldwide"
    },
    {
      "@type": "Person",
      "@id": "https://www.tripsandships.com/#angelahughes",
      "name": "Angela Hughes",
      "jobTitle": "CEO",
      "worksFor": { "@id": "https://www.tripsandships.com/#organization" },
      "description": "Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience."
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/polar-bears-svalbard",
      "url": "https://www.tripsandships.com/polar-bears-svalbard",
      "name": "Polar Bears in Svalbard",
      "headline": "Polar Bears in Svalbard | Where to See Them & Best Time to Visit",
      "description": "Learn where to see polar bears in Svalbard, the best time to visit, expedition cruises, wildlife safety, photography tips, and expert advice.",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" },
      "about": [
        {
          "@type": "Place",
          "name": "Svalbard",
          "address": { "@type": "PostalAddress", "addressCountry": "Norway" }
        },
        { "@type": "Taxon", "name": "Polar Bear", "alternateName": "Ursus maritimus" }
      ],
      "breadcrumb": { "@id": "https://www.tripsandships.com/polar-bears-svalbard#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.tripsandships.com/polar-bears-svalbard#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tripsandships.com" },
        { "@type": "ListItem", "position": 2, "name": "Arctic Cruises", "item": "https://www.tripsandships.com/arctic-cruises" },
        { "@type": "ListItem", "position": 3, "name": "Polar Bears in Svalbard", "item": "https://www.tripsandships.com/polar-bears-svalbard" }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://www.tripsandships.com/polar-bears-svalbard#highlights",
      "name": "Polar Bear Experience Highlights",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Best time to see polar bears: June–August" },
        { "@type": "ListItem", "position": 2, "name": "Best viewing method: Expedition cruises" },
        { "@type": "ListItem", "position": 3, "name": "Top locations: Northwest Spitsbergen, Hinlopen Strait, Nordaustlandet" },
        { "@type": "ListItem", "position": 4, "name": "Guided Zodiac wildlife excursions" },
        { "@type": "ListItem", "position": 5, "name": "Responsible wildlife viewing practices" },
        { "@type": "ListItem", "position": 6, "name": "Expert-led Arctic expeditions" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.tripsandships.com/polar-bears-svalbard#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Can you see polar bears in Svalbard?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Svalbard is one of the world's premier destinations for observing polar bears in the wild." } },
        { "@type": "Question", "name": "What is the best time to see polar bears?", "acceptedAnswer": { "@type": "Answer", "text": "June through August generally offers the highest chances during expedition cruise season." } },
        { "@type": "Question", "name": "Are polar bear sightings guaranteed?", "acceptedAnswer": { "@type": "Answer", "text": "No. Polar bears are wild animals, so sightings can never be guaranteed." } },
        { "@type": "Question", "name": "Is it safe to see polar bears?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guided expeditions follow strict wildlife viewing and safety protocols." } },
        { "@type": "Question", "name": "Can I photograph polar bears?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Expedition cruises provide outstanding wildlife photography opportunities while maintaining safe viewing distances." } },
        { "@type": "Question", "name": "Do expedition cruises include wildlife experts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every voyage includes experienced expedition leaders, naturalists, and wildlife specialists." } },
        { "@type": "Question", "name": "Where do polar bears live in Svalbard?", "acceptedAnswer": { "@type": "Answer", "text": "Polar bears are commonly found near sea ice, glacier fronts, remote islands, and coastal regions throughout the archipelago." } },
        { "@type": "Question", "name": "What do polar bears eat?", "acceptedAnswer": { "@type": "Answer", "text": "Their primary prey is seals, although they are opportunistic hunters." } },
        { "@type": "Question", "name": "Can I hike where polar bears live?", "acceptedAnswer": { "@type": "Answer", "text": "Only with experienced guides and proper safety procedures in designated areas." } },
        { "@type": "Question", "name": "Are polar bears endangered?", "acceptedAnswer": { "@type": "Answer", "text": "Polar bears are classified as Vulnerable due to threats including climate change and habitat loss." } },
        { "@type": "Question", "name": "What should I bring for wildlife photography?", "acceptedAnswer": { "@type": "Answer", "text": "A telephoto lens, binoculars, extra batteries, memory cards, and layered clothing are recommended." } },
        { "@type": "Question", "name": "Will I see other Arctic wildlife?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many expeditions also encounter whales, walruses, Arctic foxes, reindeer, seals, and seabirds." } },
        { "@type": "Question", "name": "Are Zodiac cruises included?", "acceptedAnswer": { "@type": "Answer", "text": "Most expedition cruises include guided Zodiac excursions for wildlife viewing." } },
        { "@type": "Question", "name": "How long are Svalbard expeditions?", "acceptedAnswer": { "@type": "Answer", "text": "Most voyages last between 7 and 12 days, depending on the itinerary." } },
        { "@type": "Question", "name": "Why book through Trips & Ships Luxury Travel?", "acceptedAnswer": { "@type": "Answer", "text": "Our specialists help you choose the best wildlife itinerary, ship, cabin, and travel season while providing expert guidance before, during, and after your expedition." } }
      ]
    }
  ]
}`;

function useScrollReveal() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".tsa_reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("tsa_in_view");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

function ThemeToggle({ theme, onToggle, floating }) {
  return (
    <button
      className={`tsa_theme_toggle ${floating ? "tsa_theme_toggle_float" : ""} ${theme === "dark" ? "dark" : ""}`}
      onClick={onToggle}
      aria-label="Toggle dark mode"
      type="button"
    >
      <span className="tsa_theme_toggle_knob">
        {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}

export default function PolarBearsSvalbard() {
  const [theme, setTheme] = useState("light");
  const [activeRegion, setActiveRegion] = useState(0); // 0=NW Spitsbergen .. 4=Eastern Svalbard
  const [openFaq, setOpenFaq] = useState({});
  const [hovered, setHovered] = useState(false);
  const rootRef = useScrollReveal();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON_LD;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const toggleFaq = (key) =>
    setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="tsa_page" data-theme={theme} ref={rootRef}>
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} floating />

      {/* ================= HERO + NAV ================= */}
      <header className="tsa_hero">
        <nav className="tsa_nav">
          <div className="tsa_logo">TRIPS &amp; SHIPS</div>
          <ul className="tsa_nav_links">
            <li>Destinations</li>
            <li>Expeditions</li>
            <li>About Angela</li>
            <li>Contact</li>
          </ul>
          <div className="tsa_nav_right">
            <button className="tsa_nav_cta">Speak With a Specialist</button>
          </div>
        </nav>

        <div className="tsa_hero_inner">
          <div className="tsa_hero_eyebrow">
            <Binoculars size={14} /> ARCTIC WILDLIFE GUIDE
          </div>
          <h1>Polar Bears in Svalbard</h1>
          <p>
            Svalbard is one of the few places on Earth where visitors have an excellent opportunity to
            observe polar bears in their natural habitat. Located between mainland Norway and the North
            Pole, this remote Arctic archipelago is home to one of the world's healthiest polar bear
            populations and offers extraordinary wildlife encounters during expedition cruises.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Svalbard Polar Bear Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Arctic Wildlife Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Best Time to See</div>
            <div className="tsa_ss_best">June – August</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Best Way to See Them</div>
            <div className="tsa_ss_best">Expedition Cruise</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Wildlife Viewing</div>
            <div className="tsa_ss_best">Excellent</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Photography</div>
            <div className="tsa_ss_best">Outstanding</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Arctic Experts</div>
            <div className="tsa_ss_best">On every expedition</div>
          </div>
        </div>
      </div>

      {/* ================= WHY SVALBARD IS ONE OF THE BEST PLACES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> QUICK ANSWER
            </div>
            <h2>Can You See Polar Bears in Svalbard?</h2>
            <p>
              Yes. Svalbard is one of the world's best destinations for observing polar bears in the wild.
              During summer expedition cruises, expert expedition teams search remote coastlines, drifting
              sea ice, and glacier fronts where bears are commonly seen hunting, resting, or traveling.
              While sightings can never be guaranteed, many expeditions successfully encounter one or more
              polar bears during the voyage.
            </p>
            <p>Svalbard offers ideal habitat for polar bears because of its:</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Extensive sea ice</div>
              <div className="tsa_chip"><Check size={16} /> Rich marine ecosystem</div>
              <div className="tsa_chip"><Check size={16} /> Remote Arctic wilderness</div>
              <div className="tsa_chip"><Check size={16} /> Protected national parks</div>
              <div className="tsa_chip"><Check size={16} /> Healthy seal populations</div>
              <div className="tsa_chip"><Check size={16} /> Limited human development</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Jun–Aug</div>
              <div className="tsa_why_card_label">The window with the highest probability of sightings</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">7–12 days</div>
              <div className="tsa_why_card_label">Typical length of most Svalbard expedition voyages</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Vulnerable</div>
              <div className="tsa_why_card_label">IUCN conservation status due to climate change &amp; habitat loss</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Polar Bears in Svalbard at a Glance</h2>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers choose the best expedition cruise, travel season, and itinerary for the greatest opportunity to experience polar bears responsibly and safely.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Best Information</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Best Time to See Polar Bears</td><td>June – August</td></tr>
                <tr><td>Best Way to See Them</td><td>Expedition Cruise</td></tr>
                <tr><td>Wildlife Viewing</td><td>Excellent</td></tr>
                <tr><td>Photography</td><td>Outstanding</td></tr>
                <tr><td>Guided Excursions</td><td>Included</td></tr>
                <tr><td>Zodiac Cruises</td><td>Included</td></tr>
                <tr><td>Arctic Experts</td><td>On Every Expedition</td></tr>
                <tr><td>Safety Briefings</td><td>Included</td></tr>
                <tr><td>Glacier Viewing</td><td>Included</td></tr>
                <tr><td>Whale Watching</td><td>Often Combined</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHERE CAN YOU SEE POLAR BEARS (REGION EXPLORER) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Where Can You See Polar Bears?</h2>
            <p>Your exact route depends on weather and ice conditions. Select a region to learn more.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeRegion === 0 ? "active" : ""}`} onClick={() => setActiveRegion(0)}>
                <MapPin size={18} /> <span className="tsa_month_tab_label">NW Spitsbergen</span>
              </button>
              <button className={`tsa_month_tab ${activeRegion === 1 ? "active" : ""}`} onClick={() => setActiveRegion(1)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Hinlopen Strait</span>
              </button>
              <button className={`tsa_month_tab ${activeRegion === 2 ? "active" : ""}`} onClick={() => setActiveRegion(2)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">Nordaustlandet</span>
              </button>
              <button className={`tsa_month_tab ${activeRegion === 3 ? "active" : ""}`} onClick={() => setActiveRegion(3)}>
                <Bird size={18} /> <span className="tsa_month_tab_label">Seven Islands</span>
              </button>
              <button className={`tsa_month_tab ${activeRegion === 4 ? "active" : ""}`} onClick={() => setActiveRegion(4)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Eastern Svalbard</span>
              </button>
            </div>

            {activeRegion === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Accessible Coastlines &amp; Glacier Fronts</div>
                  <h3 className="tsa_month_title">Northwest Spitsbergen</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Frequently visited glacier fronts</li>
                    <li><Check size={16} /> Accessible coastal routes</li>
                    <li><Check size={16} /> Often combined with whale watching</li>
                    <li><Check size={16} /> Popular early-season stop</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Accessible Routes</span>
                    <span>Glacier Views</span>
                    <span>Whale Watching</span>
                  </div>
                  <p className="tsa_month_note">
                    Bears are commonly seen traveling along the coast or resting near glacier fronts here.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <MapPin size={22} />
                    <div className="tsa_stat_card_value">Glacier Fronts</div>
                    <div className="tsa_stat_card_label">Signature Habitat</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Frequently Visited</div>
                    <div className="tsa_stat_card_label">Accessibility</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">NW</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">Hin.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "89%" }} />
                            <div className="tsa_bar_label">Nord</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "83%" }} />
                            <div className="tsa_bar_label">7 Isl.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "91%" }} />
                            <div className="tsa_bar_label">East</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeRegion === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">A Remote Strait Between Sea Ice Zones</div>
                  <h3 className="tsa_month_title">Hinlopen Strait</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Remote fjords and pack ice edges</li>
                    <li><Check size={16} /> Frequently traveled bear corridor</li>
                    <li><Check size={16} /> Rich marine ecosystem</li>
                    <li><Check size={16} /> Excellent Zodiac cruising conditions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Remote Fjords</span>
                    <span>Pack Ice Edge</span>
                    <span>Zodiac Cruising</span>
                  </div>
                  <p className="tsa_month_note">
                    This strait connects key sea ice zones, making it a favored travel corridor for bears.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Pack Ice Edge</div>
                    <div className="tsa_stat_card_label">Signature Habitat</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Remote</div>
                    <div className="tsa_stat_card_label">Accessibility</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">NW</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "94%" }} />
                            <div className="tsa_bar_label">Hin.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "90%" }} />
                            <div className="tsa_bar_label">Nord</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "84%" }} />
                            <div className="tsa_bar_label">7 Isl.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">East</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeRegion === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Vast Ice Caps &amp; Remote Islands</div>
                  <h3 className="tsa_month_title">Nordaustlandet</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Extensive sea ice coverage</li>
                    <li><Check size={16} /> Remote Arctic wilderness</li>
                    <li><Check size={16} /> Limited human development</li>
                    <li><Check size={16} /> Ideal habitat for denning &amp; hunting</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Extensive Sea Ice</span>
                    <span>True Wilderness</span>
                    <span>Ice Cap Views</span>
                  </div>
                  <p className="tsa_month_note">
                    As one of Svalbard's most remote regions, access depends heavily on ice conditions each
                    season.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Snowflake size={22} />
                    <div className="tsa_stat_card_value">Ice Cap Region</div>
                    <div className="tsa_stat_card_label">Signature Habitat</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Weather Dependent</div>
                    <div className="tsa_stat_card_label">Accessibility</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "95%" }} />
                            <div className="tsa_bar_label">NW</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "93%" }} />
                            <div className="tsa_bar_label">Hin.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "97%" }} />
                            <div className="tsa_bar_label">Nord</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "86%" }} />
                            <div className="tsa_bar_label">7 Isl.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "94%" }} />
                            <div className="tsa_bar_label">East</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeRegion === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Svalbard's Northernmost Reaches</div>
                  <h3 className="tsa_month_title">Seven Islands</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Among the northernmost points in the archipelago</li>
                    <li><Check size={16} /> Frequent seabird colonies nearby</li>
                    <li><Check size={16} /> Reached only when ice conditions allow</li>
                    <li><Check size={16} /> A true bucket-list destination</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Bucket-List Travelers</span>
                    <span>Seabird Colonies</span>
                    <span>Remote Access</span>
                  </div>
                  <p className="tsa_month_note">
                    Reaching the Seven Islands is considered a highlight for travelers seeking the far north
                    of Svalbard.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Bird size={22} />
                    <div className="tsa_stat_card_value">Northernmost</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Ice Dependent</div>
                    <div className="tsa_stat_card_label">Accessibility</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "95%" }} />
                            <div className="tsa_bar_label">NW</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "91%" }} />
                            <div className="tsa_bar_label">Hin.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "90%" }} />
                            <div className="tsa_bar_label">Nord</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "98%" }} />
                            <div className="tsa_bar_label">7 Isl.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">East</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeRegion === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Untouched Coastlines &amp; Drifting Ice</div>
                  <h3 className="tsa_month_title">Eastern Svalbard</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Protected national park areas</li>
                    <li><Check size={16} /> Drifting sea ice frequently present</li>
                    <li><Check size={16} /> Rich in seals, a key polar bear food source</li>
                    <li><Check size={16} /> Remote fjords and coastlines</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Protected Parks</span>
                    <span>Seal Populations</span>
                    <span>Remote Coastlines</span>
                  </div>
                  <p className="tsa_month_note">
                    Healthy seal populations here make this region especially attractive to hunting polar
                    bears.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Protected Parks</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Fish size={22} />
                    <div className="tsa_stat_card_value">Seal-Rich Waters</div>
                    <div className="tsa_stat_card_label">Why Bears Gather</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "95%" }} />
                            <div className="tsa_bar_label">NW</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">Hin.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "94%" }} />
                            <div className="tsa_bar_label">Nord</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "89%" }} />
                            <div className="tsa_bar_label">7 Isl.</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">East</div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS DURING A SIGHTING (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Happens During a Polar Bear Sighting?</h2>
            <p>When a bear is spotted, the Expedition Team carefully evaluates the situation before approaching. The bear's welfare always takes priority.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Safe Viewing Distances</h4>
              <p>The Expedition Team maintains distances that protect both guests and the bear.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Quiet Observation</h4>
              <p>Guests observe quietly to avoid disturbing natural behavior.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Expert Interpretation</h4>
              <p>Naturalists explain behavior and context in real time.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Photography Opportunities</h4>
              <p>Guests get time to photograph the encounter while respecting wildlife distances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERT QUOTE (with ringed portrait) ================= */}
      <section className="tsa_section tsa_quote_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_quote_card">
            <div className="tsa_quote_mark">
              <Sparkles size={32} />
            </div>
            <p className="tsa_quote_text">
              "Watching a polar bear in its natural environment is one of the most extraordinary wildlife
              experiences on Earth. Svalbard offers exceptional opportunities to observe these magnificent
              animals responsibly, and the expertise of the expedition team makes every sighting both
              exciting and educational."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>Visited 121+ Countries</span>
              <span>Luxury Cruise &amp; Expedition Specialist</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESPONSIBLE WILDLIFE VIEWING (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Responsible Wildlife Viewing</h2>
            <p>HX and other leading expedition operators follow strict wildlife guidelines to help protect polar bears for future generations.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><X size={20} /></div>
              <h4>No Feeding or Disturbance</h4>
              <p>Bears are observed from a distance, never approached or fed.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Anchor size={20} /></div>
              <h4>Controlled Zodiac Operations</h4>
              <p>Small landing groups and controlled excursions minimize disturbance.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Compliance With Arctic Regulations</h4>
              <p>Every operator follows environmental protection standards for the region.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Environmental Protection</h4>
              <p>Responsible tourism practices help preserve the fragile Arctic ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WATCH ARCTIC WILDLIFE IN ACTION (VIDEO REEL) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> WATCH ARCTIC WILDLIFE
            </div>
            <h2>Watch Arctic Wildlife in Action</h2>
            <p>From polar bears traveling across sea ice to walruses hauled out on remote shores, get a preview of the wildlife encounters waiting in Svalbard.</p>
          </div>
          <div className="tsa_reel_grid">
            <div className="tsa_reel_media"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <iframe
                key={hovered ? "play" : "pause"}
                className="tsa_video_iframe"
                src={
                    hovered
                    ? "https://www.youtube.com/embed/k7NwXMo6wr8?si=KfPol0YCsvAYD6-M"
                    : "https://www.youtube.com/embed/k7NwXMo6wr8?si=KfPol0YCsvAYD6-M"
                }
                title="Exploring Svalbard by Expedition Ship"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                />
            </div>

            <div className="tsa_reel_stats">
              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Binoculars size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Polar Bear Sightings
                  </div>
                  <div className="tsa_reel_stat_label">
                    Watch bears hunting, resting, and traveling across sea ice and coastlines.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Anchor size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Zodiac Excursions
                  </div>
                  <div className="tsa_reel_stat_label">
                    See how guided Zodiac cruises safely bring you close to remote wildlife habitats.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Fish size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Other Arctic Wildlife
                  </div>
                  <div className="tsa_reel_stat_label">
                    Preview the walruses, beluga whales, and seabirds you may also encounter.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTOGRAPHY TIPS & SAFETY PROCEDURES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Photography Tips &amp; Safety Procedures</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Photography Tips</th>
                  <th>Safety Procedures</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Bring binoculars</td><td>Expert Expedition Leaders</td></tr>
                <tr><td>Use a telephoto lens (300–600mm)</td><td>Mandatory briefings</td></tr>
                <tr><td>Keep your camera ready</td><td>Controlled shore landings</td></tr>
                <tr><td>Dress warmly &amp; be patient</td><td>Continuous wildlife monitoring</td></tr>
                <tr><td>Follow photographer guidance</td><td>Emergency equipment onboard</td></tr>
                <tr><td>Respect wildlife distances</td><td>Strict landing protocols</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHICH ARCTIC EXPERIENCE MATTERS MOST TO YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Arctic Experience Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Polar Bears If You Want:</h4>
              <ul>
                <li><Check size={14} /> Sea ice &amp; glacier front sightings</li>
                <li><Check size={14} /> Expert-led wildlife spotting</li>
                <li><Check size={14} /> A once-in-a-lifetime encounter</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Other Arctic Wildlife If You Want:</h4>
              <ul>
                <li><Check size={14} /> Walruses &amp; beluga whales</li>
                <li><Check size={14} /> Arctic foxes &amp; reindeer</li>
                <li><Check size={14} /> Puffins, little auks &amp; ivory gulls</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Photography If You Want:</h4>
              <ul>
                <li><Check size={14} /> Midnight Sun lighting</li>
                <li><Check size={14} /> Professional photographers onboard</li>
                <li><Check size={14} /> Telephoto wildlife opportunities</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Conservation If You Want:</h4>
              <ul>
                <li><Check size={14} /> Education on climate change &amp; sea ice loss</li>
                <li><Check size={14} /> Responsible tourism practices</li>
                <li><Check size={14} /> A deeper understanding of Arctic ecosystems</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Guided Safety If You Want:</h4>
              <ul>
                <li><Check size={14} /> Expert Expedition Leaders</li>
                <li><Check size={14} /> Mandatory safety briefings</li>
                <li><Check size={14} /> Controlled, monitored landings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCTIC WILDLIFE GALLERY (FILMSTRIP) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> ARCTIC WILDLIFE GALLERY
            </div>
            <h2>Arctic Wildlife You'll Encounter</h2>
            <p>Each voyage offers a rich diversity of Arctic wildlife beyond polar bears alone.</p>
          </div>
          <div className="tsa_filmstrip_wrap">
            <div className="tsa_filmstrip">
              <div className="tsa_filmstrip_frame">
                <img src="/assets/polar_bears_svalbard_1.jpg" alt="Polar bear walking across sea ice" />
                <span className="tsa_filmstrip_tag">Polar Bear</span>
                <div className="tsa_filmstrip_caption">The Arctic's most iconic predator, seen traveling across drifting sea ice.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/polar_bears_svalbard_2.jpg" alt="Walrus haul-out on a remote beach" />
                <span className="tsa_filmstrip_tag">Walrus Haul-Out</span>
                <div className="tsa_filmstrip_caption">Large walrus groups are commonly seen resting along remote Svalbard beaches.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/polar_bears_svalbard_3.jpg" alt="Beluga whales swimming near the ship" />
                <span className="tsa_filmstrip_tag">Beluga Whales</span>
                <div className="tsa_filmstrip_caption">Pods of beluga whales are often spotted in Svalbard's coastal waters.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/polar_bears_svalbard_4.jpg" alt="Arctic fox in summer coat" />
                <span className="tsa_filmstrip_tag">Arctic Fox</span>
                <div className="tsa_filmstrip_caption">Arctic foxes are frequently seen foraging along the tundra and coastline.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/polar_bears_svalbard_5.jpg" alt="Puffins nesting on a cliffside" />
                <span className="tsa_filmstrip_tag">Puffins</span>
                <div className="tsa_filmstrip_caption">Seabird cliffs come alive with puffins, little auks, and ivory gulls each summer.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US (NUMBERED) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book With Trips &amp; Ships Luxury Travel?</h2>
            <p>We'll help you experience one of the world's greatest wildlife adventures.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Choose the Best Wildlife Itinerary</h4>
                <p>We match your travel dates and route to the regions most likely to offer sightings.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Compare Expedition Cruise Lines</h4>
                <p>We help you weigh ships side by side based on comfort, itinerary, and Arctic expertise.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Select the Ideal Sailing Season</h4>
                <p>We align your voyage with the months offering the highest chance of sightings.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Choose the Right Cabin</h4>
                <p>We help you find the accommodation that best complements your expedition.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Arrange Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on the wildlife ahead.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">06</div>
              <div>
                <h4>Prepare You for Arctic Conditions</h4>
                <p>We help you pack and prepare so you're ready for whatever the Arctic brings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS A POLAR BEAR EXPEDITION RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is a Polar Bear Expedition Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Wildlife enthusiasts &amp; nature photographers</li>
                <li><Check size={14} /> Bucket-list travelers</li>
                <li><Check size={14} /> Travelers who value responsible tourism</li>
                <li><Check size={14} /> Guests who enjoy remote, expert-led exploration</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers wanting a guaranteed sighting</li>
                <li><X size={14} /> Those uncomfortable with cold, remote conditions</li>
                <li><X size={14} /> Guests seeking a nightlife-focused cruise</li>
                <li><X size={14} /> Last-minute planners during peak season</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="tsa_faq_list">
            <div className={`tsa_faq_item ${openFaq.q1 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q1")}>
                Can you see polar bears in Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Svalbard is one of the world's premier destinations for observing polar bears in the wild.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What is the best time to see polar bears? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>June through August generally offers the highest chances during expedition cruise season.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are polar bear sightings guaranteed? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Polar bears are wild animals, so sightings can never be guaranteed.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Is it safe to see polar bears? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guided expeditions follow strict wildlife viewing and safety protocols.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Can I photograph polar bears? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition cruises provide outstanding wildlife photography opportunities while maintaining safe viewing distances.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Do expedition cruises include wildlife experts? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Every voyage includes experienced expedition leaders, naturalists, and wildlife specialists.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Where do polar bears live in Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>They are commonly found near sea ice, glacier fronts, remote islands, and coastal regions throughout the archipelago.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                What do polar bears eat? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Their primary prey is seals, although they are opportunistic hunters.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Can I hike where polar bears live? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Only with experienced guides and proper safety procedures in designated areas.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are polar bears endangered? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Polar bears are classified as Vulnerable due to threats such as climate change and habitat loss.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What should I bring for wildlife photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A telephoto lens, binoculars, extra batteries, memory cards, and layered clothing are recommended.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Will I see other Arctic wildlife? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many expeditions also encounter whales, walruses, Arctic foxes, reindeer, seals, and seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are Zodiac cruises included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most expedition cruises include guided Zodiac excursions for wildlife viewing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                How long are Svalbard expeditions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most voyages last between 7 and 12 days, depending on the itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists help you choose the best wildlife itinerary, ship, cabin, and travel season while providing expert support from planning through your return home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to See Polar Bears in Svalbard?</h2>
          <p>
            A Svalbard expedition offers one of the best opportunities anywhere on Earth to observe polar
            bears in their natural Arctic habitat. Let our specialists help you choose the perfect itinerary
            for unforgettable wildlife encounters.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request a Svalbard Cruise Quote</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}