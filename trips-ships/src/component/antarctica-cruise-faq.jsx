import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Anchor,
  Waves,
  Camera,
  Users,
  Compass,
  ShieldCheck,
  Clock,
  Sparkles,
  Fish,
  ThermometerSun,
} from "lucide-react";

/**
 * Antarctica Cruise FAQ — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 */

const JSON_LD = `{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Organization",
      "@id":"https://www.tripsandships.com/#organization",
      "name":"Trips & Ships Luxury Travel",
      "url":"https://www.tripsandships.com",
      "logo":"https://www.tripsandships.com/logo.png",
      "sameAs":[
        "https://www.facebook.com/",
        "https://www.linkedin.com/",
        "https://www.instagram.com/"
      ]
    },
    {
      "@type":"TravelAgency",
      "@id":"https://www.tripsandships.com/#travelagency",
      "name":"Trips & Ships Luxury Travel",
      "url":"https://www.tripsandships.com",
      "telephone":"+1-XXX-XXX-XXXX",
      "priceRange":"$$$$",
      "areaServed":"Worldwide"
    },
    {
      "@type":"Person",
      "@id":"https://www.tripsandships.com/#angelahughes",
      "name":"Angela Hughes",
      "jobTitle":"CEO",
      "worksFor":{ "@id":"https://www.tripsandships.com/#organization" },
      "description":"CEO of Trips & Ships Luxury Travel, Founder of Luxury Travel University, luxury travel expert with more than 40 years of experience and travel to over 121 countries."
    },
    {
      "@type":"WebPage",
      "@id":"https://www.tripsandships.com/antarctica-cruise-faq",
      "url":"https://www.tripsandships.com/antarctica-cruise-faq",
      "name":"Antarctica Cruise FAQ",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Cruise FAQ",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-cruise-faq.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Cruise FAQ", "item":"https://www.tripsandships.com/antarctica-cruise-faq" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the best month to visit Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January and February offer the best balance of wildlife viewing, weather, and expedition conditions." }
        },
        {
          "@type":"Question",
          "name":"How long does an Antarctica cruise last?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury Antarctica cruises last between 10 and 14 days, with longer itineraries extending to 23 days." }
        },
        {
          "@type":"Question",
          "name":"Is the Drake Passage dangerous?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Sea conditions vary, but modern expedition ships use stabilizers and experienced crews to maximize passenger comfort and safety." }
        },
        {
          "@type":"Question",
          "name":"Will I see penguins on an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Most Antarctica itineraries offer opportunities to see Gentoo, Adélie, and Chinstrap penguins in their natural habitat." }
        },
        {
          "@type":"Question",
          "name":"How far in advance should I book?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Booking 12 to 18 months in advance is recommended to secure preferred departure dates and luxury suite categories." }
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

export default function AntarcticaCruiseFAQ() {
  const [theme, setTheme] = useState("light");
  const [activeTopic, setActiveTopic] = useState(0); // 0=Timing .. 4=Packing
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
            <Compass size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Antarctica Cruise FAQ</h1>
          <p>
            Planning an Antarctica cruise is unlike planning any other vacation. Questions about weather,
            wildlife, itineraries, the Drake Passage, costs, packing, and expedition activities are common
            — especially for first-time visitors. Here are the answers we hear most often.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Plan Your Antarctica Expedition <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Best Time</div>
            <div className="tsa_ss_best">November–March, with January &amp; February ideal</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Cruise Length</div>
            <div className="tsa_ss_best">Typically 10–14 days from Ushuaia, Argentina</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Wildlife</div>
            <div className="tsa_ss_best">Penguins, whales, seals and seabirds</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Temperature</div>
            <div className="tsa_ss_best">0°C to 5°C in the Antarctic summer</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Booking Window</div>
            <div className="tsa_ss_best">12–18 months in advance recommended</div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> BEFORE YOU BOOK
            </div>
            <h2>Why Choose an Antarctica Cruise?</h2>
            <p>
              An Antarctica expedition offers experiences found nowhere else on Earth. Unlike traditional
              cruises, every day is shaped by nature and exploration.
            </p>
            <p>
              At Trips &amp; Ships Luxury Travel, we help clients choose the ideal ship, itinerary, and
              travel season while ensuring every detail is planned for a seamless and unforgettable
              journey.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Extraordinary wildlife</div>
              <div className="tsa_chip"><Check size={16} /> Towering glaciers</div>
              <div className="tsa_chip"><Check size={16} /> Massive blue icebergs</div>
              <div className="tsa_chip"><Check size={16} /> Zodiac landings</div>
              <div className="tsa_chip"><Check size={16} /> Expert naturalists</div>
              <div className="tsa_chip"><Check size={16} /> Historic exploration sites</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">0</div>
              <div className="tsa_why_card_label">Prior expedition experience needed to join</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">12–18mo</div>
              <div className="tsa_why_card_label">How far in advance to book for the best suites</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">$$$$</div>
              <div className="tsa_why_card_label">Premium investment for specialized ships &amp; crews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWERS TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answers: Antarctica Cruise at a Glance</h2>
            <p>The essentials, answered in one glance before you dive into the details below.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Quick Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Best time to visit</td><td>November–March</td></tr>
                <tr><td>Best months</td><td>January &amp; February</td></tr>
                <tr><td>Typical cruise length</td><td>10–14 days</td></tr>
                <tr><td>Departure city</td><td>Ushuaia, Argentina</td></tr>
                <tr><td>Wildlife</td><td>Penguins, whales, seals, seabirds</td></tr>
                <tr><td>Temperature</td><td>0°C to 5°C in summer</td></tr>
                <tr><td>Expedition experience needed</td><td>None</td></tr>
                <tr><td>Zodiac excursions</td><td>Included on most cruises</td></tr>
                <tr><td>Booking window</td><td>12–18 months in advance</td></tr>
                <tr><td>Luxury level</td><td>Exceptional comfort with adventure</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= TOPIC EXPLORER (GROUPED FAQ) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Most Frequently Asked Questions</h2>
            <p>Select a topic to explore the questions travelers ask most before booking.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeTopic === 0 ? "active" : ""}`} onClick={() => setActiveTopic(0)}>
                <Clock size={18} /> <span className="tsa_month_tab_label">Timing &amp; Length</span>
              </button>
              <button className={`tsa_month_tab ${activeTopic === 1 ? "active" : ""}`} onClick={() => setActiveTopic(1)}>
                <Sparkles size={18} /> <span className="tsa_month_tab_label">Cost &amp; Value</span>
              </button>
              <button className={`tsa_month_tab ${activeTopic === 2 ? "active" : ""}`} onClick={() => setActiveTopic(2)}>
                <Fish size={18} /> <span className="tsa_month_tab_label">Wildlife</span>
              </button>
              <button className={`tsa_month_tab ${activeTopic === 3 ? "active" : ""}`} onClick={() => setActiveTopic(3)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Drake Passage &amp; Fitness</span>
              </button>
              <button className={`tsa_month_tab ${activeTopic === 4 ? "active" : ""}`} onClick={() => setActiveTopic(4)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Packing &amp; Landings</span>
              </button>
            </div>

            {activeTopic === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">When to Go &amp; How Long to Stay</div>
                  <h3 className="tsa_month_title">Timing &amp; Length</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Expedition season runs late October through early March</li>
                    <li><Check size={16} /> November offers fresh snow and pristine landscapes</li>
                    <li><Check size={16} /> January is the warmest month of the season</li>
                    <li><Check size={16} /> February brings peak whale watching</li>
                    <li><Check size={16} /> March offers quieter voyages and outstanding marine life</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Visitors</span>
                    <span>Whale Watchers</span>
                    <span>Quiet Sailings</span>
                  </div>
                  <p className="tsa_month_note">
                    Most luxury expeditions last 10–12 days for the Antarctic Peninsula, 12–14 days with
                    the South Shetland Islands, or 16–23 days including South Georgia &amp; the Falklands.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">10–14 days</div>
                    <div className="tsa_stat_card_label">Most Common Length</div>
                  </div>
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Nov–Mar</div>
                    <div className="tsa_stat_card_label">Expedition Season</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "45%" }} /><div className="tsa_bar_label">Peninsula</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">+ Shetlands</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">+ S. Georgia</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">What Drives the Price — and Why It's Worth It</div>
                  <h3 className="tsa_month_title">Cost &amp; Value</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Pricing depends on ship, cabin category, length, season and luxury level</li>
                    <li><Check size={16} /> Luxury expeditions reflect specialized ships and expert crews</li>
                    <li><Check size={16} /> Remote logistics add to the premium investment</li>
                    <li><Check size={16} /> Most travelers describe it as life-changing and worth every cent</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Bucket-List Travelers</span>
                    <span>Milestone Trips</span>
                    <span>First-Time Expeditions</span>
                  </div>
                  <p className="tsa_month_note">
                    For most travelers, Antarctica is described as life-changing, peaceful, humbling, and
                    often the best trip they've ever taken.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Sparkles size={22} />
                    <div className="tsa_stat_card_value">$$$$</div>
                    <div className="tsa_stat_card_label">Price Range</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Users size={22} />
                    <div className="tsa_stat_card_value">Premium</div>
                    <div className="tsa_stat_card_label">Ships &amp; Crews</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Cabin</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Length</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "45%" }} /><div className="tsa_bar_label">Season</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Luxury Level</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Penguins, Whales &amp; More</div>
                  <h3 className="tsa_month_title">Wildlife</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Gentoo, Adélie and Chinstrap penguins are common sightings</li>
                    <li><Check size={16} /> Specialty expeditions may also visit Emperor Penguins</li>
                    <li><Check size={16} /> Humpback, minke and orca whales are frequently encountered</li>
                    <li><Check size={16} /> February and March usually offer the best whale watching</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Photographers</span>
                    <span>Whale Enthusiasts</span>
                    <span>Penguin Lovers</span>
                  </div>
                  <p className="tsa_month_note">
                    Antarctica offers some of the world's most accessible wildlife viewing — sightings are
                    the rule, not the exception.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Fish size={22} />
                    <div className="tsa_stat_card_value">3 Species</div>
                    <div className="tsa_stat_card_label">Common Penguins</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Feb–Mar</div>
                    <div className="tsa_stat_card_label">Best Whale Watching</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "100%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Crossing the Drake &amp; Staying Active</div>
                  <h3 className="tsa_month_title">Drake Passage &amp; Fitness</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Sea conditions vary — some crossings calm, others rough</li>
                    <li><Check size={16} /> Modern ships feature advanced stabilizers</li>
                    <li><Check size={16} /> Fly-cruise itineraries reduce or eliminate the crossing</li>
                    <li><Check size={16} /> No expedition experience or exceptional fitness required</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>All Fitness Levels</span>
                    <span>First-Time Expeditioners</span>
                    <span>Fly-Cruise Option</span>
                  </div>
                  <p className="tsa_month_note">
                    Guests can choose between Zodiac cruises, scenic walks, moderate hikes, or optional
                    kayaking, depending on their comfort and mobility.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Stabilized</div>
                    <div className="tsa_stat_card_label">Modern Ships</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Users size={22} />
                    <div className="tsa_stat_card_value">All Levels</div>
                    <div className="tsa_stat_card_label">Fitness Suitable</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">Zodiac</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "45%" }} /><div className="tsa_bar_label">Walks</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Hikes</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "35%" }} /><div className="tsa_bar_label">Kayaking</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">What to Bring &amp; What to Expect Ashore</div>
                  <h3 className="tsa_month_title">Packing &amp; Landings</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Waterproof jacket and pants, thermal layers, warm gloves and hat</li>
                    <li><Check size={16} /> Polarized sunglasses and a camera for bright, reflective conditions</li>
                    <li><Check size={16} /> Waterproof boots often provided by the operator</li>
                    <li><Check size={16} /> Most cruises include guided shore landings, weather permitting</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Packers</span>
                    <span>Photographers</span>
                    <span>Shore Landings</span>
                  </div>
                  <p className="tsa_month_note">
                    Shore landings are not guaranteed — weather, sea ice and wildlife activity keep every
                    itinerary flexible.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Weather-Dependent</div>
                    <div className="tsa_stat_card_label">Shore Landings</div>
                  </div>
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Often Included</div>
                    <div className="tsa_stat_card_label">Boots Provided</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "80%" }} /><div className="tsa_bar_label">Outerwear</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Layers</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Eyewear</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">Camera Gear</div></div>
                  </div>
                </div>
              </div>
            )}
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
              "Antarctica raises more questions than almost any other destination we plan — and that's
              completely understandable. Our role is to simplify every decision, from choosing the ideal
              itinerary to preparing clients for their first Zodiac landing. By the time they board, they
              know exactly what to expect and can simply enjoy the experience."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>121+ Countries Visited</span>
              <span>2024 Luxury Travel Influencer of the Year</span>
              <span>Most Influential Women in Travel (2026)</span>
              <span>Travel Leaders Network Advisory Board</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES LUXURY DIFFERENT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Makes Luxury Expeditions Different?</h2>
            <p>Adventure and comfort go hand in hand.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Spacious Suites</h4>
              <p>Gourmet dining and personalized service throughout the voyage.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Teams</h4>
              <p>Small-group shore excursions led by expedition specialists.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Educational Lectures</h4>
              <p>Onboard enrichment programs bring the destination to life.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Wellness Facilities</h4>
              <p>All-inclusive amenities on many voyages, plus onboard wellness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMON MYTHS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Myths About Antarctica Cruises</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Myth</th>
                  <th>Reality</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Antarctica is too cold</td><td>Summer temperatures generally range from 0°C to 5°C (32°F to 41°F)</td></tr>
                <tr><td>You need expedition experience</td><td>Most guests are first-time expedition travelers</td></tr>
                <tr><td>Wildlife is difficult to find</td><td>Antarctica offers some of the world's most accessible wildlife viewing</td></tr>
                <tr><td>Every day follows a fixed schedule</td><td>Expedition leaders adapt daily plans based on weather, wildlife and sea ice</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FITNESS FIT GRID ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Do I Need to Be Physically Fit?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Most Travelers Can Participate</h3>
              <ul>
                <li><Check size={14} /> Zodiac cruises suitable for varying mobility</li>
                <li><Check size={14} /> Scenic walks at a relaxed pace</li>
                <li><Check size={14} /> Moderate hikes for the more active</li>
                <li><Check size={14} /> Optional kayaking for adventurous guests</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>Conditions That Affect Plans</h3>
              <ul>
                <li><X size={14} /> Weather and sea ice can limit landings</li>
                <li><X size={14} /> Drake Passage sea conditions vary day to day</li>
                <li><X size={14} /> Wildlife activity may shift the daily schedule</li>
                <li><X size={14} /> Shore landings are never guaranteed in advance</li>
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
                What is the best month to visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January and February offer the best balance of wildlife viewing, weather, and expedition conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How long does an Antarctica cruise last? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most Antarctica cruises last between 10 and 14 days, while extended itineraries can range from 16 to 23 days.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                How much does an Antarctica cruise cost? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Pricing varies depending on the cruise line, itinerary, ship, suite category, and travel season. Luxury expeditions generally command premium pricing due to their specialized nature.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Do I need a visa to visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Antarctica itself does not require a visa, but you'll need to meet the entry requirements for the departure country, such as Argentina or Chile.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What wildlife will I see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Depending on the season, you may see penguins, whales, seals, seabirds, and other iconic Antarctic wildlife.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Will I get seasick crossing the Drake Passage? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Sea conditions vary. Modern expedition ships feature stabilizers, and medications or patches can help reduce motion sickness.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are Antarctica cruises suitable for older travelers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many luxury expedition cruises welcome active travelers of all ages and provide excursions suitable for different mobility levels.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can children travel to Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many expedition cruise lines welcome children, although minimum age requirements vary by operator.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                What should I wear in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Dress in waterproof outerwear with warm layered clothing, gloves, a hat, and insulated boots suitable for cold, wet conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Can I use my phone or internet onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expedition ships offer Wi-Fi, although speeds may be slower due to Antarctica's remote location.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Are shore landings guaranteed? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Shore landings depend on weather, sea ice, wildlife activity, and safety conditions, so itineraries remain flexible.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I kayak in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many luxury expedition cruises offer optional kayaking excursions led by experienced guides.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                What is a Zodiac excursion? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A Zodiac excursion uses a small inflatable boat to transport guests between the ship and shore or to explore glaciers, icebergs, and wildlife up close.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Booking 12–18 months in advance is recommended for the best choice of luxury suites and preferred sailing dates.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why should I book through a luxury travel advisor? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A luxury travel advisor helps you compare ships, choose the ideal itinerary, coordinate flights and accommodations, and ensure every aspect of your Antarctica expedition is perfectly planned.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Explore Antarctica?</h2>
          <p>
            Whether you're comparing itineraries, wondering about the Drake Passage, or deciding when to
            travel, we're here to help. Our expedition specialists will answer your questions and design
            an Antarctica journey tailored to your interests, travel style, and expectations.
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