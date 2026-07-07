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
  Mountain,
  Flame,
  Landmark,
  Footprints,
} from "lucide-react";

/**
 * Antarctica Landing Sites — Trips & Ships Luxury Travel
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
      "@id":"https://www.tripsandships.com/antarctica-landing-sites",
      "url":"https://www.tripsandships.com/antarctica-landing-sites",
      "name":"Antarctica Landing Sites",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Landing Sites",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-landing-sites.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Landing Sites", "item":"https://www.tripsandships.com/antarctica-landing-sites" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"Can you walk on the Antarctic continent?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Many Antarctica expeditions include guided shore landings that allow visitors to step onto the Antarctic continent while following strict environmental guidelines." }
        },
        {
          "@type":"Question",
          "name":"What is the most popular Antarctica landing site?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Neko Harbour is one of the most popular landing sites because it offers stunning glacier views and one of the few mainland landings on the Antarctic Peninsula." }
        },
        {
          "@type":"Question",
          "name":"Are Antarctica landing sites guaranteed?",
          "acceptedAnswer":{ "@type":"Answer", "text":"No. Landing sites depend on weather, sea ice, wildlife activity, and safety conditions, so expedition leaders may adjust the itinerary as needed." }
        },
        {
          "@type":"Question",
          "name":"How many landings are included on an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury expedition cruises aim for one or two landings or Zodiac excursions each day, depending on conditions." }
        },
        {
          "@type":"Question",
          "name":"Which itinerary includes the best landing sites?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The Antarctic Peninsula itinerary includes many of the continent's most famous landing sites, while longer voyages add destinations in South Georgia and the Falkland Islands." }
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

export default function AntarcticaLandingSites() {
  const [theme, setTheme] = useState("light");
  const [activeSite, setActiveSite] = useState(0); // 0=Neko Harbour .. 5=Port Lockroy
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
            <Footprints size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Antarctica Landing Sites</h1>
          <p>
            One of the most exciting parts of an Antarctica expedition is leaving the ship and stepping
            onto the White Continent itself. Every landing offers a new perspective — towering glaciers,
            bustling penguin colonies, dramatic mountain scenery, historic exploration sites, and
            unforgettable wildlife encounters.
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
            <div className="tsa_ss_month">Neko Harbour</div>
            <div className="tsa_ss_best">Stand on the Antarctic mainland</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Paradise Bay</div>
            <div className="tsa_ss_best">Glacier walls &amp; calm waters</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Cuverville Island</div>
            <div className="tsa_ss_best">Thousands of Gentoo penguins</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Deception Island</div>
            <div className="tsa_ss_best">A flooded volcanic caldera</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Port Lockroy</div>
            <div className="tsa_ss_best">Historic research station &amp; museum</div>
          </div>
        </div>
      </div>

      {/* ================= WHY LANDING SITES MATTER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY ANTARCTICA LANDING SITES MATTER
            </div>
            <h2>No Two Antarctica Cruises Are Exactly the Same</h2>
            <p>
              Weather, sea ice, wildlife activity, and environmental conditions determine where expedition
              ships can safely land each day. This flexibility means every voyage is unique, but many
              itineraries include some of Antarctica's most iconic destinations.
            </p>
            <p>
              Unlike traditional cruises, Antarctica expeditions are designed around exploration. Small-group
              Zodiac landings allow you to experience some of the world's most remote and pristine locations
              while following strict environmental guidelines.
            </p>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers choose the ideal expedition itinerary based on the landing sites, wildlife, and experiences they want most.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Walk on the Antarctic continent</div>
              <div className="tsa_chip"><Check size={16} /> Visit penguin colonies</div>
              <div className="tsa_chip"><Check size={16} /> Observe seals and seabirds</div>
              <div className="tsa_chip"><Check size={16} /> Explore historic huts</div>
              <div className="tsa_chip"><Check size={16} /> Photograph glaciers and icebergs</div>
              <div className="tsa_chip"><Check size={16} /> Enjoy guided hikes and Zodiac cruises</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">10+</div>
              <div className="tsa_why_card_label">Iconic landing sites commonly featured on Antarctica itineraries</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1–3 hrs</div>
              <div className="tsa_why_card_label">Typical length of a shore landing, depending on conditions</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1–2</div>
              <div className="tsa_why_card_label">Landings or Zodiac excursions most luxury expeditions offer each day</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Are the Best Antarctica Landing Sites?</h2>
            <p>Each landing site offers its own unique scenery, wildlife, and history.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Landing Site</th>
                  <th>Known For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Neko Harbour</td><td>Mainland landing, glaciers, Gentoo penguins</td></tr>
                <tr><td>Paradise Bay</td><td>Glass-like water, glacier walls, whale sightings</td></tr>
                <tr><td>Cuverville Island</td><td>One of Antarctica's largest Gentoo colonies</td></tr>
                <tr><td>Deception Island</td><td>Flooded volcanic caldera &amp; historic whaling station</td></tr>
                <tr><td>Half Moon Island</td><td>Chinstrap penguins &amp; Antarctic fur seals</td></tr>
                <tr><td>Port Lockroy</td><td>Historic British research station &amp; museum</td></tr>
                <tr><td>Petermann Island</td><td>Adélie penguins &amp; dramatic ice formations</td></tr>
                <tr><td>Brown Station</td><td>Panoramic viewpoints over Paradise Bay</td></tr>
                <tr><td>Danco Island</td><td>Snow-covered trails &amp; elevated viewpoints</td></tr>
                <tr><td>Wilhelmina Bay</td><td>One of Antarctica's best whale-watching areas</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS DURING A LANDING (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Happens During a Landing?</h2>
            <p>Most shore visits last between one and three hours, depending on conditions.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Board the Zodiac</h4>
              <p>A short cruise to shore in a small, agile boat built for polar landings.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Footprints size={20} /></div>
              <h4>Guided Walk</h4>
              <p>Expedition staff lead the way with educational commentary along the route.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Wildlife Viewing</h4>
              <p>Time to observe penguins, seals, and seabirds up close and responsibly.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Photography &amp; Return</h4>
              <p>Capture the landscape before returning to the ship by Zodiac.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LANDING SITE EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Explore Antarctica's Most Iconic Landing Sites</h2>
            <p>Select a landing site to explore its highlights, wildlife, and ideal traveler.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeSite === 0 ? "active" : ""}`} onClick={() => setActiveSite(0)}>
                <Mountain size={18} /> <span className="tsa_month_tab_label">Neko Harbour</span>
              </button>
              <button className={`tsa_month_tab ${activeSite === 1 ? "active" : ""}`} onClick={() => setActiveSite(1)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">Paradise Bay</span>
              </button>
              <button className={`tsa_month_tab ${activeSite === 2 ? "active" : ""}`} onClick={() => setActiveSite(2)}>
                <Users size={18} /> <span className="tsa_month_tab_label">Cuverville Island</span>
              </button>
              <button className={`tsa_month_tab ${activeSite === 3 ? "active" : ""}`} onClick={() => setActiveSite(3)}>
                <Flame size={18} /> <span className="tsa_month_tab_label">Deception Island</span>
              </button>
              <button className={`tsa_month_tab ${activeSite === 4 ? "active" : ""}`} onClick={() => setActiveSite(4)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">Half Moon Island</span>
              </button>
              <button className={`tsa_month_tab ${activeSite === 5 ? "active" : ""}`} onClick={() => setActiveSite(5)}>
                <Landmark size={18} /> <span className="tsa_month_tab_label">Port Lockroy</span>
              </button>
            </div>

            {activeSite === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">One of the Few Places You Can Stand on the Antarctic Continent</div>
                  <h3 className="tsa_month_title">Neko Harbour</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Massive glaciers and snow-covered peaks</li>
                    <li><Check size={16} /> A thriving Gentoo penguin colony</li>
                    <li><Check size={16} /> Scenic hiking opportunities</li>
                    <li><Check size={16} /> Panoramic photography of the mainland</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Visitors</span>
                    <span>Landscape Photographers</span>
                  </div>
                  <p className="tsa_month_note">
                    Wildlife: Gentoo penguins, Weddell seals, and kelp gulls.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Mainland Landing</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeSite === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Spectacular Scenery and Calm Waters</div>
                  <h3 className="tsa_month_title">Paradise Bay</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Towering mountains reflected in glass-like water</li>
                    <li><Check size={16} /> Dramatic icebergs and glacier walls</li>
                    <li><Check size={16} /> Zodiac cruises and whale sightings</li>
                    <li><Check size={16} /> Nearby research stations</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Scenic Cruising</span>
                    <span>Wildlife Photography</span>
                  </div>
                  <p className="tsa_month_note">
                    Wildlife: humpback whales, penguins, and seals.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Zodiac Cruising</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeSite === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Home to One of Antarctica's Largest Gentoo Penguin Colonies</div>
                  <h3 className="tsa_month_title">Cuverville Island</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Thousands of Gentoo penguins</li>
                    <li><Check size={16} /> A dramatic mountain backdrop</li>
                    <li><Check size={16} /> Excellent photography opportunities</li>
                    <li><Check size={16} /> Classic Zodiac landings</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Penguin Lovers</span>
                    <span>Wildlife Enthusiasts</span>
                  </div>
                  <p className="tsa_month_note">
                    This small island is famous for its thriving penguin population.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Penguin Colony</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeSite === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Explore a Flooded Volcanic Caldera</div>
                  <h3 className="tsa_month_title">Deception Island</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Enter through the narrow Neptune's Bellows passage</li>
                    <li><Check size={16} /> A historic whaling station and research remains</li>
                    <li><Check size={16} /> Black volcanic beaches</li>
                    <li><Check size={16} /> Geothermal activity beneath the surface</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>History Lovers</span>
                    <span>Unique Landscapes</span>
                  </div>
                  <p className="tsa_month_note">
                    One of Antarctica's most unique destinations, formed inside an active volcanic caldera.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Volcanic Caldera</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeSite === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Penguins, Seals, and Stunning Coastal Views</div>
                  <h3 className="tsa_month_title">Half Moon Island</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> A Chinstrap penguin colony</li>
                    <li><Check size={16} /> Antarctic fur seals resting along the shore</li>
                    <li><Check size={16} /> Scenic, easy hiking terrain</li>
                    <li><Check size={16} /> Beautiful South Shetland Islands coastline</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Viewing</span>
                    <span>Easy Walks</span>
                  </div>
                  <p className="tsa_month_note">
                    Located in the South Shetland Islands, offering a mix of wildlife and spectacular scenery.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Chinstrap Colony</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeSite === 5 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Antarctica's Historic British Research Station</div>
                  <h3 className="tsa_month_title">Port Lockroy</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Historic buildings dating to Antarctic exploration</li>
                    <li><Check size={16} /> Nearby penguin colonies</li>
                    <li><Check size={16} /> A seasonal post office and souvenir shop</li>
                    <li><Check size={16} /> An on-site Antarctic museum</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>History Enthusiasts</span>
                    <span>First-Time Visitors</span>
                  </div>
                  <p className="tsa_month_note">
                    Today it operates as a museum and seasonal post office, combining history with wildlife.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Historic Museum</div>
                    <div className="tsa_stat_card_label">Signature Experience</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–2 hrs</div>
                    <div className="tsa_stat_card_label">Typical Visit Length</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">NH</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">PB</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">CI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">DI</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">HM</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "80%" }} /><div className="tsa_bar_label">PL</div></div>
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
              "The magic of Antarctica isn't just seeing it from the ship—it's stepping ashore and
              experiencing its extraordinary landscapes firsthand. Every landing site offers something
              different, whether it's a bustling penguin colony, a historic research station, or
              breathtaking glacier views. Each visit becomes a memory that lasts a lifetime."
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
            <p>Luxury expedition cruises enhance every landing with comfort, expertise, and flexibility.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Small-Group Excursions</h4>
              <p>Smaller landing groups mean a calmer, more personal experience ashore.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Naturalists</h4>
              <p>Personalized guidance from naturalists who know every landing site intimately.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Comfortable Zodiac Operations</h4>
              <p>Well-run Zodiac logistics make each shore excursion smooth and unhurried.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Flexible Daily Itineraries</h4>
              <p>Premium onboard amenities and flexible plans adapt to weather and wildlife each day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LANDING SITES BY INTEREST + SPOTLIGHT TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Landing Sites by Interest</h2>
            <p>Not every site made the explorer above — here are a few more worth knowing about.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Interest</th>
                    <th>Recommended Landing Sites</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Penguins</td><td>Cuverville Island, Neko Harbour, Danco Island</td></tr>
                  <tr><td>Whales</td><td>Paradise Bay, Wilhelmina Bay</td></tr>
                  <tr><td>History</td><td>Port Lockroy, Deception Island</td></tr>
                  <tr><td>Hiking</td><td>Brown Station, Neko Harbour</td></tr>
                  <tr><td>Photography</td><td>Paradise Bay, Petermann Island</td></tr>
                  <tr><td>Scenic Views</td><td>Danco Island, Paradise Bay</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Additional Site</th>
                    <th>Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Petermann Island</td><td>Adélie penguins, blue-eyed shags, ice cliffs, whale sightings</td></tr>
                  <tr><td>Brown Station</td><td>Scenic hike, glacier views, Argentine research station</td></tr>
                  <tr><td>Danco Island</td><td>Gentoo penguins, elevated viewpoints, snow-covered trails</td></tr>
                  <tr><td>Wilhelmina Bay</td><td>Humpback whales, calm waters, Zodiac-only wildlife cruising</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHOOSE YOUR LANDING SITES BY INTEREST ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Landing Sites Match Your Interests?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Penguin-Focused Sites If You Want:</h4>
              <ul>
                <li><Check size={14} /> Cuverville Island's massive Gentoo colony</li>
                <li><Check size={14} /> Neko Harbour's penguins and glaciers</li>
                <li><Check size={14} /> Danco Island's scenic penguin trails</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Whale-Focused Sites If You Want:</h4>
              <ul>
                <li><Check size={14} /> Paradise Bay's calm-water whale sightings</li>
                <li><Check size={14} /> Wilhelmina Bay's dedicated Zodiac cruising</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose History-Focused Sites If You Want:</h4>
              <ul>
                <li><Check size={14} /> Port Lockroy's museum and post office</li>
                <li><Check size={14} /> Deception Island's whaling station remains</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Hiking-Focused Sites If You Want:</h4>
              <ul>
                <li><Check size={14} /> Brown Station's panoramic viewpoints</li>
                <li><Check size={14} /> Neko Harbour's scenic hiking trails</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Photography-Focused Sites If You Want:</h4>
              <ul>
                <li><Check size={14} /> Paradise Bay's glacier walls and reflections</li>
                <li><Check size={14} /> Petermann Island's ice formations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT CAN CHANGE A LANDING ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Can Every Landing Be Guaranteed?</h2>
            <p>No. Antarctica is governed by nature, and experienced expedition leaders continually adjust the itinerary to maximize safety and guest experience.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Weather</td><td>Storms and high winds can make a landing unsafe</td></tr>
                <tr><td>Sea Ice</td><td>Ice conditions can block access to certain sites entirely</td></tr>
                <tr><td>Wind</td><td>Strong wind affects Zodiac operations and landing safety</td></tr>
                <tr><td>Wildlife Activity</td><td>Nesting or breeding activity can restrict access to protect animals</td></tr>
                <tr><td>Environmental Regulations</td><td>IAATO guidelines may limit visitor numbers or timing at a site</td></tr>
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
            <p>Choosing the right expedition means choosing the right experiences.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare Antarctica Itineraries</h4>
                <p>We help you weigh routes based on the landing sites each one is likely to include.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Understand Potential Landing Sites</h4>
                <p>We set realistic expectations for what your specific voyage may include.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Match Cruises With Wildlife Interests</h4>
                <p>We align your must-see wildlife with the itineraries most likely to deliver it.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Coordinate Flights and Accommodations</h4>
                <p>Every logistical detail is handled so you can focus on the expedition itself.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Personalize Every Aspect of the Journey</h4>
                <p>Our goal is to ensure your Antarctica expedition exceeds every expectation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS THIS RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Are Antarctica Landings Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Travelers comfortable walking on uneven, snowy terrain</li>
                <li><Check size={14} /> Wildlife and landscape photographers</li>
                <li><Check size={14} /> History enthusiasts</li>
                <li><Check size={14} /> Adventurous, flexible travelers</li>
                <li><Check size={14} /> Guests excited by spontaneous itinerary changes</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers who need a fixed, guaranteed daily schedule</li>
                <li><X size={14} /> Guests with very limited mobility on uneven terrain</li>
                <li><X size={14} /> Those uncomfortable with cold, changeable weather</li>
                <li><X size={14} /> Travelers expecting every listed site to be visited</li>
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
                What are Antarctica landing sites? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Landing sites are designated locations where expedition passengers go ashore or explore by Zodiac during an Antarctica cruise.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Can you walk on the Antarctic continent? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many expeditions include landings on the Antarctic Peninsula, allowing travelers to walk on the continent under the guidance of expedition staff.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are all landing sites included on every cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Landing sites vary depending on the itinerary, weather, sea ice, wildlife activity, and environmental regulations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                What is the most popular landing site in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Neko Harbour is one of the most popular because it allows visitors to stand on the Antarctic mainland while enjoying spectacular glacier views.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Which landing site has the most penguins? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Cuverville Island is famous for its large Gentoo Penguin colony, while Half Moon Island and Petermann Island also offer excellent penguin viewing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Where can I see whales during an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Paradise Bay and Wilhelmina Bay are among the best locations for spotting humpback whales, minke whales, and occasionally orcas.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Is Port Lockroy worth visiting? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Port Lockroy offers a fascinating combination of Antarctic history, a museum, a seasonal post office, and nearby penguin colonies.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can landing sites change during the cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition leaders adjust daily plans based on weather, sea ice, wildlife, and safety conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                How long do Antarctica landings last? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most shore excursions last between one and three hours, depending on the location and conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are Antarctica landings physically demanding? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most landings involve walking on uneven, snowy terrain. Activity levels vary, and many cruises offer options suitable for different fitness levels.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What should I wear during landings? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Dress in waterproof layers, insulated clothing, gloves, a warm hat, and waterproof boots—many luxury cruise lines provide the boots and expedition parka.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I take photographs during shore excursions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Antarctica's landing sites provide exceptional opportunities to photograph wildlife, glaciers, icebergs, and dramatic polar landscapes.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are Antarctica landing sites environmentally protected? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. All visitors must follow IAATO guidelines and the Antarctic Treaty System to help preserve the continent's fragile ecosystems.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Which itinerary includes the best landing sites? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula itinerary includes many of the most iconic landing sites, while longer voyages to South Georgia and the Falkland Islands add even more unique destinations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                How many landings can I expect on an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expeditions aim for one to two landings or Zodiac excursions each day, although the exact number depends on weather, sea conditions, and itinerary.</p>
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
            Every landing in Antarctica is unique. From standing among curious penguins at Cuverville
            Island to cruising past glaciers in Paradise Bay, each destination reveals another side of the
            White Continent's extraordinary beauty. Let our expedition specialists help you choose the
            itinerary that includes the landing sites and wildlife experiences you've always dreamed of.
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