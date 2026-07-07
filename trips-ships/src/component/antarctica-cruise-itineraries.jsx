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
  Plane,
  Globe,
  Mountain,
} from "lucide-react";

/**
 * Antarctica Cruise Itineraries Explained — Trips & Ships Luxury Travel
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
      "@id":"https://www.tripsandships.com/antarctica-cruise-itineraries",
      "url":"https://www.tripsandships.com/antarctica-cruise-itineraries",
      "name":"Antarctica Cruise Itineraries Explained",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Cruise Itineraries Explained",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-cruise-itineraries.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Cruise Itineraries Explained", "item":"https://www.tripsandships.com/antarctica-cruise-itineraries" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the best Antarctica cruise itinerary for first-time visitors?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The Antarctic Peninsula is the most popular itinerary for first-time visitors, offering spectacular scenery, abundant wildlife, and excellent expedition experiences." }
        },
        {
          "@type":"Question",
          "name":"How long should an Antarctica cruise be?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury Antarctica cruises last between 10 and 14 days, while extended itineraries including South Georgia and the Falkland Islands range from 16 to 23 days." }
        },
        {
          "@type":"Question",
          "name":"Should I choose a fly-cruise itinerary?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Fly-cruise itineraries are ideal for travelers who want to avoid the Drake Passage and maximize their time exploring Antarctica." }
        },
        {
          "@type":"Question",
          "name":"Which itinerary offers the best wildlife?",
          "acceptedAnswer":{ "@type":"Answer", "text":"South Georgia and Grand Expedition itineraries offer the greatest diversity of wildlife, including king penguins, elephant seals, whales, and seabirds." }
        },
        {
          "@type":"Question",
          "name":"When should I book an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Luxury Antarctica cruises are best booked 12 to 18 months in advance to secure preferred departure dates and suite categories." }
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

export default function AntarcticaCruiseItineraries() {
  const [theme, setTheme] = useState("light");
  const [activeItinerary, setActiveItinerary] = useState(0); // 0=Peninsula .. 5=Antarctic Circle
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
            <Globe size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Antarctica Cruise Itineraries Explained</h1>
          <p>
            No two Antarctica cruises are exactly alike. While every expedition promises breathtaking
            icebergs, incredible wildlife, and unforgettable adventures, the itinerary you choose will
            determine what you'll see, how long you'll travel, and the overall experience you'll enjoy.
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
            <div className="tsa_ss_month">Antarctic Peninsula</div>
            <div className="tsa_ss_best">First-time visitors</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Fly &amp; Cruise</div>
            <div className="tsa_ss_best">Avoiding the Drake Passage</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">South Georgia</div>
            <div className="tsa_ss_best">Extraordinary wildlife</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Falkland Islands</div>
            <div className="tsa_ss_best">Birdlife and history</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Grand Expedition</div>
            <div className="tsa_ss_best">Ultimate expedition experience</div>
          </div>
        </div>
      </div>

      {/* ================= WHY YOUR ITINERARY MATTERS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY YOUR ITINERARY MATTERS
            </div>
            <h2>Antarctica Isn't a Destination With a Single Route</h2>
            <p>
              Different itineraries offer different wildlife, different landscapes, different cruise
              lengths, different levels of adventure, different departure ports, and different price
              ranges.
            </p>
            <p>
              Choosing the right itinerary ensures your expedition delivers the experiences that matter
              most to you.
            </p>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers compare luxury expedition options and choose the itinerary that best matches their interests, travel style, and bucket-list goals.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Different wildlife highlights</div>
              <div className="tsa_chip"><Check size={16} /> Different landscapes</div>
              <div className="tsa_chip"><Check size={16} /> Different cruise lengths</div>
              <div className="tsa_chip"><Check size={16} /> Different levels of adventure</div>
              <div className="tsa_chip"><Check size={16} /> Different departure ports</div>
              <div className="tsa_chip"><Check size={16} /> Different price ranges</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">6</div>
              <div className="tsa_why_card_label">Popular Antarctica itineraries to choose from</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">8–23 days</div>
              <div className="tsa_why_card_label">Typical range of expedition cruise lengths</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">12–18mo</div>
              <div className="tsa_why_card_label">How far in advance the best suites typically sell out</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: Which Antarctica Cruise Itinerary Is Best?</h2>
            <p>
              For most first-time visitors, the Antarctic Peninsula offers the ideal balance of spectacular
              scenery, abundant wildlife, and excellent value. However, other itineraries provide unique
              experiences.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Itinerary</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Antarctic Peninsula</td><td>First-time visitors</td></tr>
                <tr><td>Fly &amp; Cruise Antarctica</td><td>Avoiding the Drake Passage</td></tr>
                <tr><td>South Georgia &amp; Antarctica</td><td>Extraordinary wildlife</td></tr>
                <tr><td>Falkland Islands + Antarctica</td><td>Birdlife and history</td></tr>
                <tr><td>Antarctica, South Georgia &amp; Falklands</td><td>Ultimate expedition experience</td></tr>
                <tr><td>Crossing the Antarctic Circle</td><td>Experienced explorers</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= UNDERSTANDING CRUISE REGIONS (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Understanding Antarctica Cruise Regions</h2>
            <p>Luxury expedition cruises visit several remarkable regions, each offering its own highlights.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Ushuaia, Argentina</h4>
              <p>The world's southernmost city and departure point for most Antarctica expeditions.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Plane size={20} /></div>
              <h4>Punta Arenas, Chile</h4>
              <p>Departure point for fly-cruise itineraries that skip the Drake Passage crossing.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>The Drake Passage</h4>
              <p>The classic sea crossing between South America and the Antarctic Peninsula.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Mountain size={20} /></div>
              <h4>The Antarctic Circle</h4>
              <p>A remote southern latitude reached only by select expeditions, weather permitting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ITINERARY EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Compare Antarctica's Most Popular Itineraries</h2>
            <p>Select an itinerary to explore its duration, highlights, wildlife, and ideal traveler.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeItinerary === 0 ? "active" : ""}`} onClick={() => setActiveItinerary(0)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Peninsula</span>
              </button>
              <button className={`tsa_month_tab ${activeItinerary === 1 ? "active" : ""}`} onClick={() => setActiveItinerary(1)}>
                <Plane size={18} /> <span className="tsa_month_tab_label">Fly &amp; Cruise</span>
              </button>
              <button className={`tsa_month_tab ${activeItinerary === 2 ? "active" : ""}`} onClick={() => setActiveItinerary(2)}>
                <Users size={18} /> <span className="tsa_month_tab_label">South Georgia</span>
              </button>
              <button className={`tsa_month_tab ${activeItinerary === 3 ? "active" : ""}`} onClick={() => setActiveItinerary(3)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">Falklands</span>
              </button>
              <button className={`tsa_month_tab ${activeItinerary === 4 ? "active" : ""}`} onClick={() => setActiveItinerary(4)}>
                <Globe size={18} /> <span className="tsa_month_tab_label">Grand Expedition</span>
              </button>
              <button className={`tsa_month_tab ${activeItinerary === 5 ? "active" : ""}`} onClick={() => setActiveItinerary(5)}>
                <Mountain size={18} /> <span className="tsa_month_tab_label">Antarctic Circle</span>
              </button>
            </div>

            {activeItinerary === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Most Popular Antarctica Itinerary</div>
                  <h3 className="tsa_month_title">Antarctic Peninsula</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Massive glaciers and floating blue icebergs</li>
                    <li><Check size={16} /> Penguin colonies and whale watching</li>
                    <li><Check size={16} /> Zodiac cruises and snow-covered mountains</li>
                    <li><Check size={16} /> Historic research stations</li>
                    <li><Check size={16} /> Wildlife: Gentoo, Adélie &amp; Chinstrap penguins, leopard &amp; Weddell seals, humpback &amp; minke whales, seasonal orcas</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Visitors</span>
                    <span>Couples</span>
                    <span>Families</span>
                    <span>Wildlife Photographers</span>
                  </div>
                  <p className="tsa_month_note">
                    The classic introduction to Antarctica, offering the ideal balance of scenery, wildlife, and value.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">10–12 Days</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Ushuaia</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeItinerary === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Skip the Drake Passage</div>
                  <h3 className="tsa_month_title">Fly &amp; Cruise Antarctica</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Fly directly to King George Island instead of crossing by ship</li>
                    <li><Check size={16} /> Less travel time and reduced seasickness risk</li>
                    <li><Check size={16} /> More time in Antarctica itself</li>
                    <li><Check size={16} /> Ideal for travelers with limited vacation time</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Travelers Avoiding Rough Seas</span>
                    <span>Luxury Travelers</span>
                    <span>Shorter Vacations</span>
                  </div>
                  <p className="tsa_month_note">
                    Considerations: weather may affect flight schedules, and flight availability is limited.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">8–10 Days</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Plane size={22} />
                    <div className="tsa_stat_card_value">Punta Arenas</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeItinerary === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Antarctica's Ultimate Wildlife Expedition</div>
                  <h3 className="tsa_month_title">South Georgia &amp; Antarctica</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Hundreds of thousands of King Penguins</li>
                    <li><Check size={16} /> Massive elephant seals and fur seals</li>
                    <li><Check size={16} /> Historic explorer sites and dramatic mountain scenery</li>
                    <li><Check size={16} /> Wildlife: king penguins, elephant seals, fur seals, wandering albatross, petrels, whales</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Enthusiasts</span>
                    <span>Photographers</span>
                    <span>Returning Visitors</span>
                  </div>
                  <p className="tsa_month_note">
                    Often called the "Serengeti of the Southern Ocean" for its unmatched wildlife.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">16–20 Days</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Ushuaia</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeItinerary === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">A Perfect Blend of History and Wildlife</div>
                  <h3 className="tsa_month_title">Falkland Islands + Antarctica</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Colorful coastal towns and historic sites</li>
                    <li><Check size={16} /> Black-browed albatross colonies</li>
                    <li><Check size={16} /> Rockhopper penguins</li>
                    <li><Check size={16} /> Spectacular birdlife throughout the voyage</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Birdwatchers</span>
                    <span>History Lovers</span>
                    <span>Travelers Seeking Variety</span>
                  </div>
                  <p className="tsa_month_note">
                    The Falkland Islands add a fascinating cultural and wildlife dimension to your expedition.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">14–18 Days</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Ushuaia</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeItinerary === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Ultimate Antarctic Adventure</div>
                  <h3 className="tsa_month_title">Antarctica, South Georgia &amp; Falkland Islands</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Combines the Antarctic Peninsula, South Georgia &amp; the Falklands</li>
                    <li><Check size={16} /> Incredible wildlife diversity across three destinations</li>
                    <li><Check size={16} /> Remote polar landscapes and historic exploration sites</li>
                    <li><Check size={16} /> The most comprehensive expedition available</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Bucket-List Travelers</span>
                    <span>Luxury Expedition Enthusiasts</span>
                    <span>Experienced Cruisers</span>
                  </div>
                  <p className="tsa_month_note">
                    For travelers seeking the most comprehensive expedition, this Grand Expedition combines three extraordinary destinations into one unforgettable voyage.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">18–23 Days</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Ushuaia</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeItinerary === 5 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Venture Even Farther South</div>
                  <h3 className="tsa_month_title">Crossing the Antarctic Circle</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Remote ice formations and continuous polar landscapes</li>
                    <li><Check size={16} /> A greater sense of true exploration</li>
                    <li><Check size={16} /> Less-visited landing sites</li>
                    <li><Check size={16} /> Reaches latitudes few travelers ever experience</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Experienced Expedition Travelers</span>
                    <span>Adventure Seekers</span>
                    <span>Repeat Visitors</span>
                  </div>
                  <p className="tsa_month_note">
                    These voyages depend heavily on weather and ice conditions, so itineraries can shift at sea.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Weather-Dependent</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Ushuaia</div>
                    <div className="tsa_stat_card_label">Departure Port</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">AP</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "40%" }} /><div className="tsa_bar_label">FC</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">SG</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">FI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">GE</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">AC</div></div>
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
              "The itinerary you choose has a tremendous impact on your Antarctica experience. Some
              travelers dream of standing among thousands of king penguins in South Georgia, while others
              want the breathtaking glaciers and iconic landscapes of the Antarctic Peninsula. Our role is
              to understand your travel goals and recommend the expedition that's the perfect fit."
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

      {/* ================= LUXURY EXPEDITION EXPERIENCE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Luxury Expedition Experience</h2>
            <p>Regardless of your itinerary, luxury expedition cruises typically include the same high standard of comfort.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Spacious Suites</h4>
              <p>All-suite accommodations designed for comfort at the end of the world.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Gourmet Dining</h4>
              <p>Personalized service paired with cuisine inspired by regional and international flavors.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Expedition Teams</h4>
              <p>Educational lectures and small-group shore landings led by experienced naturalists.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Zodiac Excursions</h4>
              <p>Observation lounges and wellness facilities complement every Zodiac adventure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CRUISE LENGTH + WILDLIFE TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Cruise Length &amp; Wildlife by Itinerary</h2>
            <p>Longer voyages offer more wildlife, more landings, and more opportunities for exploration.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Cruise Length</th>
                    <th>Ideal For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>8–10 Days</td><td>Fly-cruise travelers</td></tr>
                  <tr><td>10–12 Days</td><td>First-time visitors</td></tr>
                  <tr><td>14–18 Days</td><td>Falklands itineraries</td></tr>
                  <tr><td>16–20 Days</td><td>South Georgia expeditions</td></tr>
                  <tr><td>18–23 Days</td><td>Grand expeditions</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Itinerary</th>
                    <th>Wildlife Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Antarctic Peninsula</td><td>Penguins, whales, seals</td></tr>
                  <tr><td>South Georgia</td><td>King Penguins, elephant seals, albatrosses</td></tr>
                  <tr><td>Falkland Islands</td><td>Rockhopper Penguins, albatrosses, dolphins</td></tr>
                  <tr><td>Antarctic Circle</td><td>Penguins, whales, remote wildlife</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH ITINERARY IS RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Itinerary Is Right for You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose the Antarctic Peninsula If You Want:</h4>
              <ul>
                <li><Check size={14} /> Your first Antarctica experience</li>
                <li><Check size={14} /> Incredible scenery</li>
                <li><Check size={14} /> Penguin colonies</li>
                <li><Check size={14} /> Whale watching and excellent value</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Fly &amp; Cruise If You Want:</h4>
              <ul>
                <li><Check size={14} /> To avoid the Drake Passage</li>
                <li><Check size={14} /> More time in Antarctica</li>
                <li><Check size={14} /> A shorter vacation</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose South Georgia If You Want:</h4>
              <ul>
                <li><Check size={14} /> Extraordinary wildlife</li>
                <li><Check size={14} /> King Penguin colonies</li>
                <li><Check size={14} /> Exceptional wildlife photography</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Falkland Islands If You Want:</h4>
              <ul>
                <li><Check size={14} /> Rich birdlife</li>
                <li><Check size={14} /> Historic settlements</li>
                <li><Check size={14} /> Diverse landscapes</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose the Grand Expedition If You Want:</h4>
              <ul>
                <li><Check size={14} /> The most complete Antarctica experience</li>
                <li><Check size={14} /> Maximum wildlife diversity</li>
                <li><Check size={14} /> Multiple destinations in one voyage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANNING YOUR CRUISE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Planning Your Antarctica Cruise</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Planning Step</th>
                  <th>What It Involves</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Book Early</td><td>The most desirable luxury suites often sell out 12–18 months in advance</td></tr>
                <tr><td>Choose the Right Season</td><td>Different months offer penguin courtship, chicks, whale watching, fresh snow, or longer daylight</td></tr>
                <tr><td>Work with a Polar Travel Specialist</td><td>Compare ships, cabins, cruise lines, wildlife opportunities, and travel logistics</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US (NUMBERED) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book With Trips &amp; Ships Luxury Travel?</h2>
            <p>Every Antarctica expedition is unique — choosing the right one takes the right guidance.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare Expedition Routes</h4>
                <p>We help you weigh the Antarctic Peninsula against South Georgia, the Falklands, and beyond.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Select the Ideal Cruise Line</h4>
                <p>Ship size, comfort level, and itinerary all shape your overall experience.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Match Wildlife Interests to Itineraries</h4>
                <p>We align your must-see species with the route that offers the best chance to see them.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Arrange Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on the expedition itself.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Personalize Every Detail of Your Journey</h4>
                <p>With decades of luxury travel expertise, we help you choose an expedition that exceeds every expectation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS THIS ITINERARY RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is This Itinerary Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> First-time visitors seeking excellent value</li>
                <li><Check size={14} /> Wildlife photographers and enthusiasts</li>
                <li><Check size={14} /> Birdwatchers and history lovers</li>
                <li><Check size={14} /> Bucket-list and returning travelers</li>
                <li><Check size={14} /> Experienced expedition adventurers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers with very limited vacation time (unless choosing fly-cruise)</li>
                <li><X size={14} /> Those highly prone to seasickness on Drake Passage crossings</li>
                <li><X size={14} /> Guests wanting a guaranteed Antarctic Circle crossing</li>
                <li><X size={14} /> Last-minute planners during peak season</li>
                <li><X size={14} /> Budget travelers seeking the shortest, most affordable option</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="tsa_faq_list">
            <div className={`tsa_faq_item ${openFaq.q1 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q1")}>
                What is the best Antarctica cruise itinerary for first-time visitors? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula is the most popular itinerary, offering spectacular scenery, abundant wildlife, and an excellent introduction to Antarctica.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How long should an Antarctica cruise be? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most first-time travelers choose a 10–12-day expedition, while longer itineraries of 16–23 days include destinations such as South Georgia and the Falkland Islands.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What is the difference between the Antarctic Peninsula and South Georgia? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula is known for glaciers, icebergs, and penguin colonies, while South Georgia is famous for its extraordinary wildlife, including king penguins and elephant seals.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Should I choose a fly-cruise itinerary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Fly-cruise expeditions are ideal if you want to avoid crossing the Drake Passage and maximize your time in Antarctica.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What is included in a luxury Antarctica cruise itinerary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury expeditions typically include accommodations, meals, expert guides, Zodiac excursions, educational lectures, and most onboard amenities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Which itinerary offers the best wildlife? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>South Georgia and Grand Expedition itineraries provide the greatest wildlife diversity, including king penguins, elephant seals, whales, and seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Can I visit the Antarctic Circle? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Some longer expeditions travel beyond the Antarctic Circle, although access depends on weather and sea ice conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Which itinerary is best for photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula and South Georgia are excellent choices for photographers because of their dramatic landscapes and abundant wildlife.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Where do Antarctica cruises depart from? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most cruises depart from Ushuaia, Argentina, while fly-cruise expeditions typically begin in Punta Arenas, Chile.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                When should I book an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury expedition cruises are best booked 12–18 months in advance to secure preferred itineraries and suite categories.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Are South Georgia and the Falkland Islands worth adding? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. These destinations offer exceptional wildlife, fascinating history, and landscapes that complement the Antarctic experience.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                What is the shortest Antarctica itinerary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Fly-cruise itineraries typically last 8–10 days and are the shortest option for visiting Antarctica.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are all Antarctica itineraries the same? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Routes vary in duration, destinations, wildlife, activities, and overall experience, making itinerary selection an important part of trip planning.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Can families take Antarctica cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many luxury expedition cruise lines welcome families, though minimum age requirements vary by operator and itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why should I use a luxury travel advisor when choosing an itinerary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A luxury travel advisor helps match your interests, budget, travel style, and preferred wildlife experiences with the right ship, route, and departure date.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Choose Your Antarctica Itinerary?</h2>
          <p>
            Whether you're planning your first voyage to the Antarctic Peninsula, dreaming of South
            Georgia's incredible wildlife, or seeking the ultimate Grand Expedition, our specialists are
            here to help you find the luxury expedition that perfectly matches your interests, travel
            style, and bucket-list goals.
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