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
  Ship,
  Anchor,
  Leaf,
  Microscope,
  Wifi,
  UtensilsCrossed,
  Waves,
  Binoculars,
  BedDouble,
} from "lucide-react";

/**
 * HX Ships Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS), including
 * the photo-card grid (.tsa_photo_grid) and split-layout timeline
 * (.tsa_split_layout) patterns introduced in the Antarctica Packing Guide.
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: every image source below is a placeholder — swap the URLs in
 * /assets/hx_ships_guide_*.jpg for real production assets.
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
      "worksFor": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/hx-expeditions-ships",
      "url": "https://www.tripsandships.com/hx-expeditions-ships",
      "name": "HX Ships Guide",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is HX Expeditions?", "acceptedAnswer": { "@type": "Answer", "text": "HX Expeditions is a premium expedition cruise company, formerly known as Hurtigruten Expeditions, specializing in voyages to Antarctica, the Arctic, Greenland, Iceland, Alaska, the Galápagos, and other remote destinations." } },
        { "@type": "Question", "name": "How many ships does HX have?", "acceptedAnswer": { "@type": "Answer", "text": "HX currently operates a fleet of five expedition ships designed for immersive exploration and destination-focused travel." } },
        { "@type": "Question", "name": "Which HX ship is best for Antarctica?", "acceptedAnswer": { "@type": "Answer", "text": "MS Roald Amundsen, MS Fridtjof Nansen, and MS Fram are among the most popular HX ships for Antarctica expeditions." } },
        { "@type": "Question", "name": "Are Zodiac excursions included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guided Zodiac cruises and shore landings are included on most HX expedition itineraries." } },
        { "@type": "Question", "name": "Is Wi-Fi included onboard?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Complimentary Wi-Fi is available on HX ships, although internet speeds may vary in remote destinations." } },
        { "@type": "Question", "name": "Are HX ships luxurious?", "acceptedAnswer": { "@type": "Answer", "text": "HX offers premium expedition cruising with stylish accommodations, exceptional dining, wellness facilities, and immersive destination experiences." } },
        { "@type": "Question", "name": "What destinations does HX visit?", "acceptedAnswer": { "@type": "Answer", "text": "HX sails to Antarctica, the Arctic, Greenland, Iceland, Alaska, Norway, Svalbard, the Galápagos Islands, South America, and other remote destinations." } },
        { "@type": "Question", "name": "What is the Science Center onboard?", "acceptedAnswer": { "@type": "Answer", "text": "The Science Center is an interactive learning space where guests enjoy lectures, workshops, and citizen science programs led by expedition experts." } },
        { "@type": "Question", "name": "Are children allowed on HX cruises?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many HX itineraries welcome families, although minimum age requirements vary depending on the voyage and destination." } },
        { "@type": "Question", "name": "Is kayaking available?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Optional kayaking excursions are available on many HX expeditions and are led by experienced guides." } },
        { "@type": "Question", "name": "Are HX ships environmentally friendly?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. HX is recognized for sustainability initiatives, including hybrid-powered ships, reduced single-use plastics, and scientific research partnerships." } },
        { "@type": "Question", "name": "What should I pack for an HX expedition?", "acceptedAnswer": { "@type": "Answer", "text": "Pack waterproof outerwear, thermal layers, gloves, insulated footwear, sunglasses, sunscreen, binoculars, and a camera. Packing recommendations vary by destination." } },
        { "@type": "Question", "name": "How far in advance should I book?", "acceptedAnswer": { "@type": "Answer", "text": "Booking 12 to 18 months in advance is recommended for the best selection of cabins, itineraries, and departure dates." } },
        { "@type": "Question", "name": "Are expedition activities suitable for beginners?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most expedition activities are designed for travelers of varying fitness levels, and no previous expedition experience is required." } },
        { "@type": "Question", "name": "Why book HX through Trips & Ships Luxury Travel?", "acceptedAnswer": { "@type": "Answer", "text": "Trips & Ships Luxury Travel helps travelers compare HX ships, choose the ideal itinerary, arrange flights and accommodations, and personalize every aspect of their expedition for a seamless travel experience." } }
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

export default function HXShipsGuide() {
  const [theme, setTheme] = useState("light");
  const [activeShip, setActiveShip] = useState(0); // 0=Roald Amundsen .. 4=Santa Cruz II
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
            <Ship size={14} /> LUXURY EXPEDITION FLEET GUIDE
          </div>
          <h1>HX Ships Guide</h1>
          <p>
            HX Expeditions (formerly Hurtigruten Expeditions) operates one of the world's most experienced
            expedition fleets, offering immersive voyages to Antarctica, the Arctic, Greenland, Iceland,
            Alaska, the Galápagos, and other remote destinations. Designed for curious travelers, HX ships
            combine scientific exploration, sustainability, and modern comfort.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore HX Expeditions Cruises <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Fleet Size</div>
            <div className="tsa_ss_best">5 expedition ships</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Style</div>
            <div className="tsa_ss_best">Premium expedition cruising</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Guest Capacity</div>
            <div className="tsa_ss_best">Approximately 90–530 guests</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Science Center</div>
            <div className="tsa_ss_best">Onboard every ship</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Dining &amp; Wi-Fi</div>
            <div className="tsa_ss_best">All-inclusive &amp; complimentary</div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE HX ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY CHOOSE HX EXPEDITIONS?
            </div>
            <h2>More Than a Century of Exploration Heritage</h2>
            <p>
              HX is recognized as one of the pioneers of modern expedition cruising, combining expert
              expedition teams, small-ship exploration, and onboard science centers with comfortable
              accommodations and sustainable operations.
            </p>
            <p>
              Every voyage emphasizes learning, discovery, and responsible travel — guided by researchers
              and naturalists who bring each destination to life.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Expert expedition teams</div>
              <div className="tsa_chip"><Check size={16} /> Small-ship exploration</div>
              <div className="tsa_chip"><Check size={16} /> Zodiac landings</div>
              <div className="tsa_chip"><Check size={16} /> Onboard science centers</div>
              <div className="tsa_chip"><Check size={16} /> Lectures by researchers &amp; naturalists</div>
              <div className="tsa_chip"><Check size={16} /> Sustainable operations</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">5</div>
              <div className="tsa_why_card_label">Purpose-built expedition ships across the HX fleet</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">100+ yrs</div>
              <div className="tsa_why_card_label">Of exploration heritage behind every voyage</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">9+</div>
              <div className="tsa_why_card_label">Remote destinations explored, from Antarctica to the Galápagos</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Expeditions at a Glance</h2>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers compare HX ships and find the perfect expedition for their travel style.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Quick Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Fleet Size</td><td>5 Expedition Ships</td></tr>
                <tr><td>Style</td><td>Premium Expedition Cruises</td></tr>
                <tr><td>Destinations</td><td>Antarctica, Arctic, Greenland, Iceland, Alaska, Galápagos &amp; More</td></tr>
                <tr><td>Guest Capacity</td><td>Approximately 90–530 Guests</td></tr>
                <tr><td>Expedition Team</td><td>Included</td></tr>
                <tr><td>Zodiac Excursions</td><td>Included</td></tr>
                <tr><td>Science Center</td><td>Onboard Every Ship</td></tr>
                <tr><td>Dining</td><td>All-Inclusive</td></tr>
                <tr><td>Wi-Fi</td><td>Included</td></tr>
                <tr><td>Best For</td><td>Adventure with Premium Comfort</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= MEET THE HX FLEET (SHIP EXPLORER) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Meet the HX Fleet</h2>
            <p>Select a ship to explore its highlights and the destinations it's best suited for.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeShip === 0 ? "active" : ""}`} onClick={() => setActiveShip(0)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">Roald Amundsen</span>
              </button>
              <button className={`tsa_month_tab ${activeShip === 1 ? "active" : ""}`} onClick={() => setActiveShip(1)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Fridtjof Nansen</span>
              </button>
              <button className={`tsa_month_tab ${activeShip === 2 ? "active" : ""}`} onClick={() => setActiveShip(2)}>
                <Anchor size={18} /> <span className="tsa_month_tab_label">Fram</span>
              </button>
              <button className={`tsa_month_tab ${activeShip === 3 ? "active" : ""}`} onClick={() => setActiveShip(3)}>
                <Binoculars size={18} /> <span className="tsa_month_tab_label">Spitsbergen</span>
              </button>
              <button className={`tsa_month_tab ${activeShip === 4 ? "active" : ""}`} onClick={() => setActiveShip(4)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Santa Cruz II</span>
              </button>
            </div>

            {activeShip === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">One of the World's First Hybrid-Powered Expedition Ships</div>
                  <h3 className="tsa_month_title">MS Roald Amundsen</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Hybrid propulsion</li>
                    <li><Check size={16} /> Infinity pool &amp; wellness facilities</li>
                    <li><Check size={16} /> Onboard Science Center</li>
                    <li><Check size={16} /> Multiple restaurants and modern Scandinavian design</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Antarctica</span>
                    <span>Greenland</span>
                    <span>Arctic Expeditions</span>
                  </div>
                  <p className="tsa_month_note">
                    A flagship-scale expedition ship pairing hybrid technology with a full suite of onboard
                    comforts.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Ship size={22} />
                    <div className="tsa_stat_card_value">Hybrid-Powered</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Large Ship</div>
                    <div className="tsa_stat_card_label">Fleet Position</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">RA</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">FN</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Fram</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "35%" }} /><div className="tsa_bar_label">Spits.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "30%" }} /><div className="tsa_bar_label">SC II</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeShip === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Advanced Hybrid Technology, Premium Comfort</div>
                  <h3 className="tsa_month_title">MS Fridtjof Nansen</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Spacious suites</li>
                    <li><Check size={16} /> Observation decks &amp; Explorer Lounge</li>
                    <li><Check size={16} /> Onboard Science Center</li>
                    <li><Check size={16} /> Dedicated wellness area</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Antarctica</span>
                    <span>Iceland</span>
                    <span>Greenland &amp; Arctic Voyages</span>
                  </div>
                  <p className="tsa_month_note">
                    A sister ship to Roald Amundsen, offering the same scale and technology with its own
                    distinct onboard atmosphere.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Ship size={22} />
                    <div className="tsa_stat_card_value">Hybrid-Powered</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Large Ship</div>
                    <div className="tsa_stat_card_label">Fleet Position</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">RA</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">FN</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Fram</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "35%" }} /><div className="tsa_bar_label">Spits.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "30%" }} /><div className="tsa_bar_label">SC II</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeShip === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Purpose-Built for Expedition Cruising</div>
                  <h3 className="tsa_month_title">MS Fram</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Comfortable cabins</li>
                    <li><Check size={16} /> Expedition-focused design</li>
                    <li><Check size={16} /> Observation Lounge &amp; Science Center</li>
                    <li><Check size={16} /> Flexible expedition operations</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Antarctica</span>
                    <span>Greenland</span>
                    <span>Arctic</span>
                  </div>
                  <p className="tsa_month_note">
                    A mid-size expedition ship built specifically for flexible, destination-focused
                    operations.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Expedition-Built</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Mid-Size Ship</div>
                    <div className="tsa_stat_card_label">Fleet Position</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">RA</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">FN</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">Fram</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "35%" }} /><div className="tsa_bar_label">Spits.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "30%" }} /><div className="tsa_bar_label">SC II</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeShip === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">A Smaller Vessel Designed for Intimate Exploration</div>
                  <h3 className="tsa_month_title">MS Spitsbergen</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Cozy atmosphere</li>
                    <li><Check size={16} /> Excellent wildlife viewing</li>
                    <li><Check size={16} /> Smaller guest capacity</li>
                    <li><Check size={16} /> Deep expedition expertise</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Svalbard</span>
                    <span>Norway</span>
                    <span>Arctic Expeditions</span>
                  </div>
                  <p className="tsa_month_note">
                    A smaller ship that trades scale for intimacy — ideal for travelers who want a closer,
                    more personal expedition experience.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Wildlife Viewing</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Small Ship</div>
                    <div className="tsa_stat_card_label">Fleet Position</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">RA</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">FN</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Fram</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "35%" }} /><div className="tsa_bar_label">Spits.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "30%" }} /><div className="tsa_bar_label">SC II</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeShip === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Specially Designed for Galápagos Expeditions</div>
                  <h3 className="tsa_month_title">MS Santa Cruz II</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Elegant accommodations</li>
                    <li><Check size={16} /> Expert naturalist guides</li>
                    <li><Check size={16} /> Observation decks</li>
                    <li><Check size={16} /> Zodiac excursions and wildlife-focused itineraries</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Galápagos Islands</span>
                  </div>
                  <p className="tsa_month_note">
                    The smallest ship in the fleet, purpose-built for the unique wildlife encounters of the
                    Galápagos.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Galápagos-Focused</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Small Ship</div>
                    <div className="tsa_stat_card_label">Fleet Position</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">RA</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">FN</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Fram</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "35%" }} /><div className="tsa_bar_label">Spits.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "30%" }} /><div className="tsa_bar_label">SC II</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS EXPLORED BY HX ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Destinations Explored by HX</h2>
            <p>Each itinerary is designed to maximize wildlife encounters, cultural experiences, and scientific discovery.</p>
          </div>
          <div className="tsa_chip_grid">
            <div className="tsa_chip"><Check size={16} /> Antarctica</div>
            <div className="tsa_chip"><Check size={16} /> Arctic</div>
            <div className="tsa_chip"><Check size={16} /> Greenland</div>
            <div className="tsa_chip"><Check size={16} /> Iceland</div>
            <div className="tsa_chip"><Check size={16} /> Norway</div>
            <div className="tsa_chip"><Check size={16} /> Svalbard</div>
            <div className="tsa_chip"><Check size={16} /> Alaska</div>
            <div className="tsa_chip"><Check size={16} /> Northwest Passage</div>
            <div className="tsa_chip"><Check size={16} /> Galápagos Islands</div>
            <div className="tsa_chip"><Check size={16} /> South America</div>
          </div>
        </div>
      </section>

      {/* ================= LIFE ONBOARD (PHOTO CARD GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Ship size={14} /> LIFE ONBOARD
            </div>
            <h2>Comfort and Exploration Go Hand in Hand</h2>
            <p>
              Guests enjoy spacious lounges, panoramic observation decks, and a full range of wellness and
              dining facilities between excursions.
            </p>
          </div>

          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
                <img
                    className="tsa_photo_card_img"
                    src="/assets/hx_ships_guide_1.jpg"
                    alt="Explorer Lounge and panoramic observation deck aboard an HX expedition ship"
                />
                <div className="tsa_photo_card_body">
                    <div className="tsa_photo_label">
                    <Compass size={14} /> Onboard Experience
                    </div>
                    <h4>Explorer Lounge & Observation Decks</h4>
                    <p>
                    Relax between excursions while enjoying panoramic ocean views from spacious lounges and observation decks designed for expedition cruising.
                    </p>
                    <div className="tsa_photo_list">
                    <span><Check size={16} /> Explorer Lounge & Bar</span>
                    <span><Check size={16} /> Panoramic observation decks</span>
                    <span><Check size={16} /> Complimentary Wi-Fi</span>
                    <span><Check size={16} /> Educational presentations</span>
                    </div>
                </div>
            </div>

            <div className="tsa_photo_card">
                <img
                    className="tsa_photo_card_img"
                    src="/assets/hx_ships_guide_2.jpg"
                    alt="All-inclusive dining aboard an HX expedition ship"
                />
                <div className="tsa_photo_card_body">
                    <div className="tsa_photo_label">
                    <UtensilsCrossed size={14} /> Dining
                    </div>
                    <h4>All-Inclusive Dining Experience</h4>
                    <p>
                    Enjoy expertly prepared cuisine featuring regional specialties, fresh seafood, and flexible dining options throughout your expedition.
                    </p>
                    <div className="tsa_photo_list">
                    <span><Check size={16} /> International cuisine</span>
                    <span><Check size={16} /> Regional specialties</span>
                    <span><Check size={16} /> Vegetarian & vegan options</span>
                    <span><Check size={16} /> Complimentary beverages</span>
                    </div>
                </div>
            </div>

            <div className="tsa_photo_card">
                <img
                    className="tsa_photo_card_img"
                    src="/assets/hx_ships_guide_3.jpg"
                    alt="Luxury expedition suite aboard an HX ship"
                />
                <div className="tsa_photo_card_body">
                    <div className="tsa_photo_label">
                    <BedDouble size={14} /> Accommodation
                    </div>
                    <h4>Suites & Accommodations</h4>
                    <p>
                    From comfortable Polar Cabins to spacious Expedition Suites, every stateroom is designed for relaxation after a day of exploration.
                    </p>
                    <div className="tsa_photo_list">
                    <span><Check size={16} /> Polar Inside & Outside Cabins</span>
                    <span><Check size={16} /> Balcony & Expedition Suites</span>
                    <span><Check size={16} /> Ocean-view windows</span>
                    <span><Check size={16} /> Premium amenities</span>
                    </div>
                </div>
            </div>

            <div className="tsa_photo_card">
                <img
                    className="tsa_photo_card_img"
                    src="/assets/hx_ships_guide_4.jpg"
                    alt="HX hybrid-powered expedition ship sailing responsibly"
                />
                <div className="tsa_photo_card_body">
                    <div className="tsa_photo_label">
                    <Leaf size={14} /> Sustainability
                    </div>
                    <h4>Responsible Expedition Travel</h4>
                    <p>
                    HX leads the way in sustainable exploration with hybrid-powered ships, citizen science programs, and environmentally responsible operations.
                    </p>
                    <div className="tsa_photo_list">
                    <span><Check size={16} /> Hybrid-powered technology</span>
                    <span><Check size={16} /> Citizen science programs</span>
                    <span><Check size={16} /> Reduced single-use plastics</span>
                    <span><Check size={16} /> Responsible wildlife viewing</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DINING EXPERIENCE (SPLIT LAYOUT + PHOTOS) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Dining Experience</h2>
            <p>An all-inclusive dining experience with menus inspired by the regions visited.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><UtensilsCrossed size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />International Cuisine</div>
                  <h4>Global Flavors Onboard</h4>
                  <p>Menus crafted with high-quality ingredients and international dishes for every palate.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Compass size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Regional Specialties</div>
                  <h4>Inspired by Each Destination</h4>
                  <p>Fresh seafood and regional specialties bring the flavors of each destination to your table.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Leaf size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Vegetarian &amp; Vegan</div>
                  <h4>Flexible Dining for Every Guest</h4>
                  <p>Vegetarian and vegan options are available alongside flexible dining throughout the voyage.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Sparkles size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Beverages</div>
                  <h4>Complimentary on Many Voyages</h4>
                  <p>Many voyages include complimentary beverages alongside the all-inclusive dining experience.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/hx_ships_guide_5.jpg" alt="HX shipboard restaurant table setting" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/hx_ships_guide_6.jpg" alt="Fresh regional seafood dish served onboard" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUITES & ACCOMMODATIONS TABLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Suites &amp; Accommodations</h2>
            <p>Many suites feature private balconies, sitting areas, premium amenities, and ocean views.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Cabin Category</th>
                  <th>Typical Features</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Polar Inside Cabins</td><td>Comfortable, no window, best value</td></tr>
                <tr><td>Polar Outside Cabins</td><td>Picture window or porthole, ocean views</td></tr>
                <tr><td>Balcony Cabins</td><td>Private balcony, floor-to-ceiling windows</td></tr>
                <tr><td>Expedition Suites</td><td>Larger living area, premium amenities</td></tr>
                <tr><td>Grand Suites</td><td>Separate living area, large private balcony</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= EXPEDITION ACTIVITIES (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Expedition Activities</h2>
            <p>Every activity is led by experienced expedition guides.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>On the Water:</h4>
              <ul>
                <li><Check size={14} /> Zodiac cruises</li>
                <li><Check size={14} /> Guided shore landings</li>
                <li><Check size={14} /> Optional kayaking</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>On Land:</h4>
              <ul>
                <li><Check size={14} /> Hiking</li>
                <li><Check size={14} /> Snowshoeing</li>
                <li><Check size={14} /> Wildlife observation</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Photography:</h4>
              <ul>
                <li><Check size={14} /> Guided photography walks</li>
                <li><Check size={14} /> Onboard observation decks</li>
                <li><Check size={14} /> Wildlife-rich landings</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Science &amp; Learning:</h4>
              <ul>
                <li><Check size={14} /> Citizen science programs</li>
                <li><Check size={14} /> Expert-led lectures</li>
                <li><Check size={14} /> Science Center workshops</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
                <h4>Wellness & Onboard:</h4>
                <ul>
                    <li><Check size={14} /> Explorer Lounge & Bar</li>
                    <li><Check size={14} /> Sauna & fitness center</li>
                    <li><Check size={14} /> Panoramic observation decks</li>
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY AT HX (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Sustainability at HX</h2>
            <p>HX is recognized for its commitment to responsible expedition travel.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Hybrid-Powered Ships</h4>
              <p>Hybrid propulsion reduces environmental impact without compromising the expedition experience.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Leaf size={20} /></div>
              <h4>Single-Use Plastic Reduction</h4>
              <p>Ongoing initiatives reduce single-use plastics fleet-wide.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Microscope size={20} /></div>
              <h4>Citizen Science Programs</h4>
              <p>Travelers can actively participate in scientific research during select voyages.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Binoculars size={20} /></div>
              <h4>Responsible Wildlife Viewing</h4>
              <p>Environmental education and responsible viewing guidelines protect every destination visited.</p>
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
              "HX Expeditions combines more than a century of exploration experience with modern expedition
              technology and sustainability. Their destination-focused approach allows guests to experience
              remote regions in comfort while learning from world-class expedition teams."
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

      {/* ================= WHO SHOULD CHOOSE HX ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who Should Choose HX?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Travelers who value learning through exploration</li>
                <li><Check size={14} /> Fans of smaller expedition ships</li>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Travelers drawn to scientific discovery</li>
                <li><Check size={14} /> First-time and experienced explorers alike</li>
                <li><Check size={14} /> Sustainable, responsible travelers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers wanting a mega-ship, resort-style cruise</li>
                <li><X size={14} /> Guests seeking nightlife-focused itineraries</li>
                <li><X size={14} /> Those uncomfortable with cold or remote climates</li>
                <li><X size={14} /> Last-minute planners during peak season</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK HX WITH US (NUMBERED) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book HX with Trips &amp; Ships Luxury Travel?</h2>
            <p>Our expertise ensures you choose the HX voyage that's right for you.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare HX Ships</h4>
                <p>We walk you through every vessel in the fleet so you know exactly what each one offers.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Choose the Best Itinerary</h4>
                <p>We help you match your travel goals with the right destination and departure date.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Select the Right Cabin</h4>
                <p>From Polar Inside to Grand Suites, we help you find the ideal accommodation.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Arrange Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on the expedition ahead.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Recommend Travel Protection</h4>
                <p>We help you understand your options for protecting your investment.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">06</div>
              <div>
                <h4>Personalize Every Detail</h4>
                <p>With decades of luxury travel expertise, we help you experience HX at its very best.</p>
              </div>
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
                What is HX Expeditions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX Expeditions is a premium expedition cruise company, formerly known as Hurtigruten Expeditions, specializing in voyages to remote destinations including Antarctica, the Arctic, Greenland, Iceland, Alaska, and the Galápagos.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How many ships does HX have? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX currently operates a fleet of five expedition ships designed for destination-focused exploration.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Which HX ship is best for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>MS Roald Amundsen, MS Fridtjof Nansen, and MS Fram are among the most popular ships for Antarctica expeditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Are Zodiac excursions included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guided Zodiac cruises and shore landings are included on most HX expedition itineraries.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is Wi-Fi included onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Complimentary Wi-Fi is available on HX ships, although internet speeds may vary in remote polar regions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are HX ships luxurious? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX offers premium expedition cruising with stylish accommodations, excellent dining, wellness facilities, and destination-focused experiences.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What destinations does HX visit? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX sails to Antarctica, the Arctic, Greenland, Iceland, Alaska, Norway, Svalbard, the Galápagos Islands, and other remote destinations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                What is the Science Center onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Science Center is an interactive learning space where guests participate in lectures, workshops, and citizen science programs led by expedition experts.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Are children allowed on HX cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many HX itineraries welcome families, although minimum age requirements may vary depending on the destination and voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is kayaking available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Optional kayaking excursions are available on many expeditions and are led by experienced guides.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Are HX ships environmentally friendly? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. HX is recognized for sustainability initiatives, including hybrid-powered ships, reduced plastic use, and scientific research partnerships.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                What should I pack for an HX expedition? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Pack waterproof outerwear, thermal layers, gloves, insulated footwear, sunglasses, sunscreen, binoculars, and a camera. Packing recommendations vary by destination.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Booking 12–18 months ahead is recommended for the best choice of cabins, itineraries, and sailing dates.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Are expedition activities suitable for beginners? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Most activities are designed for travelers of varying fitness levels, and no prior expedition experience is required.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book HX through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists provide expert guidance on selecting the right HX ship, itinerary, suite, travel season, and logistics, ensuring a seamless and personalized expedition experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Explore with HX Expeditions?</h2>
          <p>
            Whether you're planning your first expedition cruise or comparing ships for your next adventure,
            our luxury travel specialists will match you with the ideal HX ship, itinerary, and destination
            based on your travel goals.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request an HX Cruise Quote</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}