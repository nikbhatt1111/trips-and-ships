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
  Fish,
  Camera,
  Users,
  Compass,
  ThermometerSun,
  Waves,
  Sparkles,
  Ship,
  Backpack,
  Wind,
  Anchor,
  Calendar,
} from "lucide-react";

/**
 * Antarctica for First-Time Travelers — Trips & Ships Luxury Travel
 * Reuses the shared .tsa_* design system introduced in
 * "Is an Antarctica Cruise Worth It?" so both pages feel like one site.
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 */

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
      "worksFor": {
        "@id": "https://www.tripsandships.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/first-time-antarctica-cruise",
      "url": "https://www.tripsandships.com/first-time-antarctica-cruise",
      "name": "Antarctica for First-Time Travelers",
      "isPartOf": {
        "@id": "https://www.tripsandships.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Antarctica a good destination for first-time expedition travelers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Luxury expedition cruises are designed for travelers of all experience levels, with expert guides, comfortable ships, and well-organized excursions."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best month for a first Antarctica cruise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "January and February offer the best combination of wildlife, weather, and daylight, making them ideal for first-time visitors."
          }
        },
        {
          "@type": "Question",
          "name": "How long should my first Antarctica cruise be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 10\u201314 day itinerary is the most popular choice, offering wildlife encounters, Zodiac excursions, and shore landings."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need previous expedition experience?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Most guests are first-time expedition travelers, and no special expedition experience is required."
          }
        },
        {
          "@type": "Question",
          "name": "Is the Drake Passage always rough?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Conditions vary from calm to rough. Modern expedition ships feature stabilizers, and fly-cruise itineraries can eliminate the sea crossing."
          }
        },
        {
          "@type": "Question",
          "name": "Will I actually step onto Antarctica?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Most expeditions include guided shore landings on the Antarctic Peninsula, weather and safety permitting."
          }
        },
        {
          "@type": "Question",
          "name": "What wildlife will I see?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depending on the season, you may see penguins, whales, seals, seabirds, and other iconic Antarctic wildlife."
          }
        },
        {
          "@type": "Question",
          "name": "How cold is Antarctica during cruise season?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Summer temperatures generally range from 0\u00b0C to 5\u00b0C (32\u00b0F to 41\u00b0F), making layered clothing the best choice."
          }
        },
        {
          "@type": "Question",
          "name": "What should I pack?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pack waterproof outerwear, thermal layers, gloves, a warm hat, sunglasses, sunscreen, and a camera. Many expedition operators provide waterproof boots."
          }
        },
        {
          "@type": "Question",
          "name": "Can older travelers enjoy an Antarctica cruise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Many luxury expedition cruises welcome active travelers of all ages and provide excursions suitable for different mobility levels."
          }
        },
        {
          "@type": "Question",
          "name": "How far in advance should I book?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Booking 12 to 18 months in advance is recommended for the best selection of luxury suites and preferred departure dates."
          }
        },
        {
          "@type": "Question",
          "name": "Are Antarctica cruises safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Licensed operators follow strict international safety standards and environmental regulations established by the Antarctic Treaty System and IAATO."
          }
        },
        {
          "@type": "Question",
          "name": "Will I have internet onboard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most luxury expedition ships offer onboard Wi-Fi, although speeds may be slower due to Antarctica's remote location."
          }
        },
        {
          "@type": "Question",
          "name": "Why should I use a luxury travel advisor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A luxury travel advisor helps compare ships, choose the ideal itinerary, coordinate flights and accommodations, and ensure every aspect of your Antarctica expedition is perfectly planned."
          }
        },
        {
          "@type": "Question",
          "name": "Why choose Trips & Ships Luxury Travel for my first Antarctica cruise?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trips & Ships Luxury Travel provides expert guidance on expedition ships, itineraries, travel seasons, accommodations, flights, and personalized planning to ensure a seamless first Antarctica experience."
          }
        }
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

export default function AntarcticaFirstTimeTravelers() {
  const [theme, setTheme] = useState("light");
  const [openFaq, setOpenFaq] = useState({});
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
            <Compass size={14} /> FIRST-TIME TRAVELER GUIDE
          </div>
          <h1>Antarctica for First-Time Travelers</h1>
          <p>
            An Antarctica cruise is unlike any other vacation. From crossing the legendary Drake Passage to
            stepping onto the White Continent for the first time, every moment is unforgettable. We guide
            first-time travelers through every step of planning, ensuring a seamless, luxurious, and
            unforgettable polar adventure.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Plan Your First Antarctica Expedition <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Antarctica Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Best Time</div>
            <div className="tsa_ss_best">November through March</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Ideal Months</div>
            <div className="tsa_ss_best">January &amp; February for peak wildlife</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Duration</div>
            <div className="tsa_ss_best">10–14 days for most first-time itineraries</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Departure</div>
            <div className="tsa_ss_best">Sailing from Ushuaia, Argentina</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Experience Needed</div>
            <div className="tsa_ss_best">None — every guest starts a first-timer</div>
          </div>
        </div>
      </div>

      {/* ================= WHY PERFECT FOR FIRST-TIMERS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Antarctica Is Perfect for First-Time Expedition Travelers</h2>
            <p>
              Many people assume Antarctica is only for experienced explorers. The reality is quite
              different — today's luxury expedition cruises are designed to make Antarctica accessible,
              comfortable, and safe for travelers of every experience level. No mountaineering or previous
              expedition experience is required.
            </p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Expert expedition teams</div>
            <div className="tsa_chip"><Check size={16} /> Small-group shore landings</div>
            <div className="tsa_chip"><Check size={16} /> Luxury accommodations</div>
            <div className="tsa_chip"><Check size={16} /> Fine dining</div>
            <div className="tsa_chip"><Check size={16} /> Educational lectures</div>
            <div className="tsa_chip"><Check size={16} /> Incredible wildlife encounters</div>
            <div className="tsa_chip"><Check size={16} /> Personalized service</div>
            <div className="tsa_chip"><Check size={16} /> Comfortable expedition ships</div>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES IT DIFFERENT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY ANTARCTICA IS DIFFERENT
            </div>
            <h2>What Makes Antarctica Different from Other Cruises?</h2>
            <p>Unlike traditional ocean cruises, there are no crowded ports. Nature determines the daily schedule, and every day offers unique wildlife encounters.</p>
            <p>
              Expedition leaders adapt plans based on weather and sea ice, small Zodiac boats take guests
              ashore, and exploration is the focus rather than onboard entertainment.
            </p>
            <p>Every voyage is unique — no two first Antarctica expeditions ever look the same.</p>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">0</div>
              <div className="tsa_why_card_label">Crowded ports or fixed shopping stops</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1–2</div>
              <div className="tsa_why_card_label">Shore landings per day, weather permitting</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">∞</div>
              <div className="tsa_why_card_label">Ways each voyage differs, shaped by weather, wildlife &amp; ice</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHOOSING THE RIGHT ITINERARY ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Choosing the Right Itinerary</h2>
            <p>Your first expedition can be as focused or as extensive as you'd like.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>10–12 Days</h4>
              <p style={{ marginBottom: 10, color: "var(--tsa-text-muted)" }}>Perfect for first-time visitors.</p>
              <ul>
                <li><Check size={14} /> Drake Passage</li>
                <li><Check size={14} /> Antarctic Peninsula</li>
                <li><Check size={14} /> Zodiac landings</li>
                <li><Check size={14} /> Wildlife viewing</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>12–14 Days</h4>
              <p style={{ marginBottom: 10, color: "var(--tsa-text-muted)" }}>Ideal for additional exploration.</p>
              <ul>
                <li><Check size={14} /> Antarctic Peninsula</li>
                <li><Check size={14} /> South Shetland Islands</li>
                <li><Check size={14} /> More landing opportunities</li>
                <li><Check size={14} /> Greater wildlife diversity</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>18–23 Days</h4>
              <p style={{ marginBottom: 10, color: "var(--tsa-text-muted)" }}>Best for a once-in-a-lifetime journey.</p>
              <ul>
                <li><Check size={14} /> South Georgia</li>
                <li><Check size={14} /> Falkland Islands</li>
                <li><Check size={14} /> Antarctica</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
                <h4>Fly & Cruise</h4>
                <p style={{ marginBottom: 10, color: "var(--tsa-text-muted)" }}>
                    Ideal for travelers who prefer to skip the Drake Passage.
                </p>
                <ul>
                    <li><Check size={14} /> Fly directly to Antarctica</li>
                    <li><Check size={14} /> Avoid the Drake Crossing</li>
                    <li><Check size={14} /> Antarctic Peninsula exploration</li>
                    <li><Check size={14} /> Luxury expedition experience</li>
                </ul>
            </div>

            <div className="tsa_choose_card">
                <h4>Custom Expeditions</h4>
                <p style={{ marginBottom: 10, color: "var(--tsa-text-muted)" }}>
                    Perfect for travelers seeking a personalized polar adventure.
                </p>
                <ul>
                    <li><Check size={14} /> Tailored luxury itineraries</li>
                    <li><Check size={14} /> Optional kayaking & snowshoeing</li>
                    <li><Check size={14} /> Photography-focused departures</li>
                    <li><Check size={14} /> Pre & post-cruise extensions</li>
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Wildlife Will You See?</h2>
            <p>Wildlife sightings are one of the highlights of every expedition, and vary by season.</p>
          </div>
          <div className="tsa_compare_grid">
            <div className="tsa_compare_col lux">
              <h3><Fish size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Penguins &amp; Marine Mammals</h3>
              <div className="tsa_compare_row"><Check size={16} /> Gentoo penguins</div>
              <div className="tsa_compare_row"><Check size={16} /> Adélie penguins</div>
              <div className="tsa_compare_row"><Check size={16} /> Chinstrap penguins</div>
              <div className="tsa_compare_row"><Check size={16} /> Humpback &amp; minke whales</div>
              <div className="tsa_compare_row"><Check size={16} /> Orcas</div>
              <div className="tsa_compare_row"><Check size={16} /> Weddell, leopard &amp; elephant seals</div>
            </div>
            <div className="tsa_compare_col trad">
              <h3><Camera size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Seabirds</h3>
              <div className="tsa_compare_row"><Check size={16} /> Albatross</div>
              <div className="tsa_compare_row"><Check size={16} /> Petrels</div>
              <div className="tsa_compare_row"><Check size={16} /> Skuas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DRAKE PASSAGE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Wind size={14} /> THE CROSSING
            </div>
            <h2>Understanding the Drake Passage</h2>
            <p>One of the biggest concerns for first-time travelers is the Drake Passage. Sea conditions vary from voyage to voyage.</p>
            <p>Some crossings are remarkably calm ("Drake Lake"), while others are more adventurous ("Drake Shake").</p>
            <p>Fly-cruise itineraries are also available for travelers who prefer to avoid the crossing entirely.</p>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num"><Anchor size={22} /></div>
              <div className="tsa_why_card_label">Advanced stabilizers on luxury expedition ships</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num"><Compass size={22} /></div>
              <div className="tsa_why_card_label">Experienced captains &amp; modern navigation technology</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num"><Ship size={22} /></div>
              <div className="tsa_why_card_label">Comfortable cabins for the two-day crossing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ZODIAC EXCURSIONS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Is a Zodiac Excursion?</h2>
            <p>A Zodiac is a small inflatable expedition boat that allows close access to Antarctica's incredible landscapes and wildlife.</p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Transport guests ashore</div>
            <div className="tsa_chip"><Check size={16} /> Explore glaciers</div>
            <div className="tsa_chip"><Check size={16} /> Cruise around icebergs</div>
            <div className="tsa_chip"><Check size={16} /> Observe whales</div>
            <div className="tsa_chip"><Check size={16} /> Photograph wildlife</div>
          </div>
        </div>
      </section>

      {/* ================= PACKING ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Should You Pack?</h2>
            <p>Many luxury cruise operators provide insulated waterproof boots — here's what to bring yourself.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Backpack size={20} /></div>
              <h4>Outer Layers</h4>
              <p>Waterproof jacket and waterproof pants for landings and Zodiac rides.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ThermometerSun size={20} /></div>
              <h4>Warmth</h4>
              <p>Thermal base layers, insulated mid-layers, warm gloves and a wool hat.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sun size={20} /></div>
              <h4>Sun &amp; Glare</h4>
              <p>Polarized sunglasses and sunscreen for the reflective polar light.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Gear</h4>
              <p>Camera, extra batteries, and a dry bag to keep everything protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FITNESS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Do You Need to Be Fit?</h2>
            <p>Most travelers with average mobility can comfortably enjoy an Antarctica expedition — you can participate at your own comfort level.</p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Scenic Zodiac cruises</div>
            <div className="tsa_chip"><Check size={16} /> Gentle beach walks</div>
            <div className="tsa_chip"><Check size={16} /> Moderate hikes</div>
            <div className="tsa_chip"><Check size={16} /> Snowshoeing on select voyages</div>
            <div className="tsa_chip"><Check size={16} /> Optional kayaking</div>
          </div>
        </div>
      </section>

      {/* ================= A TYPICAL DAY (TIMELINE) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Is a Typical Day Like?</h2>
            <p>Every day is different depending on weather and wildlife, but a typical expedition day may include:</p>
          </div>
          <div className="tsa_timeline">
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Morning</div>
              <h4>Breakfast &amp; Zodiac Landing</h4>
              <p>Breakfast, a Zodiac landing, and wildlife viewing to start the day.</p>
            </div>
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Afternoon</div>
              <h4>Scenic Cruise &amp; Lecture</h4>
              <p>A scenic cruise, an educational lecture, and another landing weather permitting.</p>
            </div>
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Evening</div>
              <h4>Dinner, Recap &amp; Relaxation</h4>
              <p>Gourmet dinner, an expedition recap, photography presentations, and time in the lounge.</p>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 24, color: "var(--tsa-text-muted)", fontStyle: "italic" }}>
            Every day is different depending on weather and wildlife.
          </p>
        </div>
      </section>

      {/* ================= TIPS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Tips for First-Time Antarctica Travelers</h2>
            <p>Preparation helps you make the most of every moment.</p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 860, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Book early for the best cabins</div>
            <div className="tsa_chip"><Check size={16} /> Pack in waterproof layers</div>
            <div className="tsa_chip"><Check size={16} /> Bring binoculars</div>
            <div className="tsa_chip"><Check size={16} /> Carry extra camera batteries</div>
            <div className="tsa_chip"><Check size={16} /> Expect flexible itineraries</div>
            <div className="tsa_chip"><Check size={16} /> Listen to expedition guides</div>
            <div className="tsa_chip"><Check size={16} /> Respect wildlife</div>
            <div className="tsa_chip"><Check size={16} /> Prepare for changing weather</div>
            <div className="tsa_chip"><Check size={16} /> Purchase comprehensive travel protection</div>
          </div>
        </div>
      </section>

      {/* ================= COMMON MYTHS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Myths</h2>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><X size={20} /></div>
              <h4>Myth: Antarctica Is Unbearably Cold</h4>
              <p>Reality: summer temperatures generally range from 0°C to 5°C (32°F–41°F).</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><X size={20} /></div>
              <h4>Myth: You Must Be an Adventurer</h4>
              <p>Reality: most guests are first-time expedition travelers.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><X size={20} /></div>
              <h4>Myth: The Cruise Is Uncomfortable</h4>
              <p>Reality: luxury expedition ships offer spacious suites, gourmet dining, wellness facilities, and exceptional service.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><X size={20} /></div>
              <h4>Myth: Wildlife Is Difficult to See</h4>
              <p>Reality: Antarctica offers some of the world's most accessible wildlife viewing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERT QUOTE ================= */}
      <section className="tsa_section tsa_quote_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_quote_card">
            <div className="tsa_quote_mark">
              <Sparkles size={32} />
            </div>
            <p className="tsa_quote_text">
              "For first-time visitors, Antarctica often exceeds every expectation. The combination of
              extraordinary wildlife, breathtaking scenery, and expert-led exploration creates an
              experience unlike anywhere else on Earth. With the right planning, your first expedition can
              be both effortless and unforgettable."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>121+ Countries Visited</span>
              <span>Luxury Cruise &amp; Expedition Specialist</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO SHOULD VISIT / WHY BOOK ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book with Trips &amp; Ships Luxury Travel?</h2>
            <p>Planning your first Antarctica cruise can feel overwhelming — but it doesn't have to be. Our expertise ensures your first expedition is seamless from start to finish.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Compare Ships</h4>
              <p>We help you compare luxury expedition ships side by side.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Calendar size={20} /></div>
              <h4>Choose the Season</h4>
              <p>Select the ideal itinerary and travel season for your goals.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Arrange the Details</h4>
              <p>Flights, pre- and post-cruise hotels, and travel protection.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Personalize Every Detail</h4>
              <p>An expedition tailored to your travel style and expectations.</p>
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
                Is Antarctica a good destination for first-time expedition travelers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Luxury expedition cruises are designed for travelers of all experience levels, with expert guides, comfortable ships, and well-organized excursions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What is the best month for a first Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January and February offer the best combination of wildlife, weather, and daylight, making them ideal for first-time visitors.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                How long should my first Antarctica cruise be? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A 10–14 day itinerary is the most popular choice, offering plenty of wildlife encounters, Zodiac excursions, and shore landings.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Do I need previous expedition experience? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Most guests are first-time expedition travelers, and no special skills are required.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is the Drake Passage always rough? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Conditions vary from calm to rough. Modern expedition ships have stabilizers, and fly-cruise options can eliminate the sea crossing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Will I actually step onto Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Most expeditions include guided shore landings on the Antarctic Peninsula, weather and safety permitting.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What wildlife will I see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Depending on the season, you may see penguins, whales, seals, seabirds, and other iconic Antarctic wildlife.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                How cold is Antarctica during cruise season? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Summer temperatures typically range from 0°C to 5°C (32°F–41°F), making layered clothing the best choice.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                What should I pack? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Bring waterproof outerwear, thermal layers, gloves, a warm hat, sunglasses, sunscreen, and a camera. Many operators provide waterproof boots.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Can older travelers enjoy an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Many luxury expeditions welcome active travelers of all ages and offer excursions suited to different mobility levels.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Booking 12–18 months ahead is recommended to secure your preferred ship, suite, and departure date.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Are Antarctica cruises safe? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Licensed expedition operators follow strict international safety standards and environmental guidelines established by the Antarctic Treaty System and IAATO.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Will I have internet onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expedition ships offer onboard Wi-Fi, although speeds may be slower than at home due to the remote location.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Why should I use a luxury travel advisor? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>An experienced advisor helps you compare ships, select the ideal itinerary, coordinate flights and accommodations, and ensure every detail is planned for a stress-free expedition.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why choose Trips &amp; Ships Luxury Travel for my first Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists provide expert guidance on luxury expedition ships, travel seasons, itineraries, accommodations, and logistics — helping first-time travelers enjoy a seamless and unforgettable Antarctica experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready for Your First Antarctica Adventure?</h2>
          <p>
            Whether you're wondering about the Drake Passage, deciding when to travel, or choosing between
            luxury expedition ships, our specialists are here to help. We'll design a personalized
            Antarctica itinerary based on your travel style, interests, and expectations.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request a Custom Antarctica Itinerary</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}