import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Users,
  Compass,
  Clock,
  Sparkles,
  ShieldCheck,
  UtensilsCrossed,
  Wifi,
  Microscope,
  Anchor,
  BookOpen,
  Bird,
  Backpack,
  Camera,
  Play,
} from "lucide-react";

/**
 * What's Included with HX Expeditions — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * MEDIA ADDED IN THIS VERSION (mirrors the Antarctica Wildlife Guide):
 *  - "See What's Included in Action" video reel spotlight (tsa_reel_*)
 *  - "The HX Experience Gallery" scrolling filmstrip (tsa_filmstrip_*)
 *  - A ringed portrait added to the Expert Quote section (tsa_quote_portrait_*)
 * All placeholder URLs are marked below — swap for real production assets.
 */

const PLACEHOLDER_MEDIA = {
  reelVideo: "https://www.youtube.com/embed/YtAL8y2lACs?si=XERQ-OcrTlAIBgua",
  portrait: "https://placehold.co/200x200/1c2f4a/8fb4e8?text=A.H.",
  film1: "https://placehold.co/520x680/16243a/8fb4e8?text=Accommodation",
  film2: "https://placehold.co/520x680/101b2c/8fb4e8?text=All-Inclusive+Dining",
  film3: "https://placehold.co/520x680/1c2f4a/8fb4e8?text=Science+Center",
  film4: "https://placehold.co/520x680/16243a/8fb4e8?text=Zodiac+Excursion",
  film5: "https://placehold.co/520x680/101b2c/8fb4e8?text=Complimentary+Wi-Fi",
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
      "worksFor": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/hx-whats-included",
      "url": "https://www.tripsandships.com/hx-whats-included",
      "name": "What's Included with HX Expeditions",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is included with an HX expedition cruise?", "acceptedAnswer": { "@type": "Answer", "text": "Your fare typically includes accommodations, daily meals, the Expedition Team, Zodiac excursions, guided shore landings, Science Center access, educational lectures, Wi-Fi, and citizen science programs." } },
        { "@type": "Question", "name": "Are meals included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Breakfast, lunch, and dinner are included, along with coffee and tea. Dietary requirements can usually be accommodated with advance notice." } },
        { "@type": "Question", "name": "Are Zodiac excursions included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guided Zodiac cruises and shore landings are included on most HX itineraries." } },
        { "@type": "Question", "name": "Is the Expedition Team included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every voyage includes an experienced team of expedition leaders, scientists, naturalists, and other specialists." } },
        { "@type": "Question", "name": "Is Wi-Fi included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Complimentary Wi-Fi is included, although connection speeds may vary depending on the ship's location." } },
        { "@type": "Question", "name": "Is access to the Science Center included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guests have full access to the Science Center, educational lectures, and many interactive learning experiences." } },
        { "@type": "Question", "name": "Are drinks included?", "acceptedAnswer": { "@type": "Answer", "text": "Coffee and tea are generally included. Other beverage inclusions vary depending on the itinerary and fare." } },
        { "@type": "Question", "name": "Are waterproof boots provided?", "acceptedAnswer": { "@type": "Answer", "text": "Many HX expeditions include loaned waterproof boots for shore landings. Availability varies by destination." } },
        { "@type": "Question", "name": "Are flights included?", "acceptedAnswer": { "@type": "Answer", "text": "International flights are generally not included unless specifically stated in your cruise package." } },
        { "@type": "Question", "name": "Is travel insurance included?", "acceptedAnswer": { "@type": "Answer", "text": "Travel insurance is usually not included and is highly recommended for expedition travel." } },
        { "@type": "Question", "name": "Are gratuities included?", "acceptedAnswer": { "@type": "Answer", "text": "Gratuity policies vary by itinerary and booking package. Your travel advisor can explain current policies before booking." } },
        { "@type": "Question", "name": "Can I participate in citizen science?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many HX voyages offer opportunities to contribute to scientific research and environmental conservation projects." } },
        { "@type": "Question", "name": "Are optional activities included?", "acceptedAnswer": { "@type": "Answer", "text": "Some optional experiences, such as kayaking or camping, may require an additional fee depending on the itinerary." } },
        { "@type": "Question", "name": "Are educational lectures included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Daily lectures and presentations led by expedition experts are included throughout the voyage." } },
        { "@type": "Question", "name": "Why book an HX expedition through Trips & Ships Luxury Travel?", "acceptedAnswer": { "@type": "Answer", "text": "Trips & Ships Luxury Travel helps you understand all inclusions, compare itineraries, choose the right ship and cabin, and plan every detail of your expedition for a seamless travel experience." } }
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

export default function HXWhatsIncluded() {
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState(1); // 0=Accommodation .. 4=Equipment
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
            <ShieldCheck size={14} /> INCLUSIONS GUIDE
          </div>
          <h1>What's Included with HX Expeditions?</h1>
          <p>
            HX Expeditions offers more than a cruise—it delivers an all-inclusive expedition experience
            designed to let you focus on discovery rather than logistics. From comfortable accommodations
            and exceptional dining to expert-led shore landings, educational lectures, and Science Center
            access, many of the essential elements of your adventure are already included in your fare.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore HX Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an HX Cruise Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Accommodation</div>
            <div className="tsa_ss_best">Included</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Daily Dining</div>
            <div className="tsa_ss_best">Breakfast, lunch &amp; dinner included</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expedition Team</div>
            <div className="tsa_ss_best">Included</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Zodiac Excursions</div>
            <div className="tsa_ss_best">Included</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Wi-Fi</div>
            <div className="tsa_ss_best">Complimentary onboard</div>
          </div>
        </div>
      </div>

      {/* ================= WHAT'S INCLUDED IN EVERY HX EXPEDITION ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHAT'S INCLUDED IN EVERY HX EXPEDITION?
            </div>
            <h2>Everything You Need for an Unforgettable Adventure</h2>
            <p>
              Your expedition fare typically includes everything needed for an unforgettable adventure,
              allowing you to fully immerse yourself in your destination rather than worry about logistics.
            </p>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers understand exactly what's included, compare itineraries, and choose the HX expedition that best matches their expectations.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Comfortable accommodation</div>
              <div className="tsa_chip"><Check size={16} /> All daily meals</div>
              <div className="tsa_chip"><Check size={16} /> Expedition Team</div>
              <div className="tsa_chip"><Check size={16} /> Guided shore landings</div>
              <div className="tsa_chip"><Check size={16} /> Zodiac cruises</div>
              <div className="tsa_chip"><Check size={16} /> Educational lectures</div>
              <div className="tsa_chip"><Check size={16} /> Science Center access</div>
              <div className="tsa_chip"><Check size={16} /> Citizen science programs</div>
              <div className="tsa_chip"><Check size={16} /> Complimentary Wi-Fi</div>
              <div className="tsa_chip"><Check size={16} /> Daily expedition briefings</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">10</div>
              <div className="tsa_why_card_label">Core elements included in every HX expedition fare</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">3</div>
              <div className="tsa_why_card_label">Daily meals included, plus coffee and tea</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">All-Inclusive</div>
              <div className="tsa_why_card_label">Dining, excursions, lectures &amp; Wi-Fi bundled into your fare</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Inclusions at a Glance</h2>
            <p>Depending on the itinerary, your fare bundles together the essentials of a seamless expedition.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Included Feature</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Accommodation</td><td>✔ Included</td></tr>
                <tr><td>Daily Breakfast, Lunch &amp; Dinner</td><td>✔ Included</td></tr>
                <tr><td>Expedition Team</td><td>✔ Included</td></tr>
                <tr><td>Zodiac Excursions</td><td>✔ Included</td></tr>
                <tr><td>Guided Shore Landings</td><td>✔ Included</td></tr>
                <tr><td>Science Center Access</td><td>✔ Included</td></tr>
                <tr><td>Educational Lectures</td><td>✔ Included</td></tr>
                <tr><td>Complimentary Wi-Fi</td><td>✔ Included</td></tr>
                <tr><td>Citizen Science Programs</td><td>✔ Included</td></tr>
                <tr><td>Daily Expedition Activities</td><td>✔ Included</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES HX INCLUSIONS DIFFERENT (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Makes HX Inclusions Different</h2>
            <p>HX offers one of the most comprehensive expedition experiences available, so almost everything you need is already included.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Exceptional Value</h4>
              <p>Accommodation, dining, excursions, and learning are bundled into a single, transparent fare.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Guidance</h4>
              <p>The Expedition Team is included on every voyage, leading landings, lectures, and excursions.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Microscope size={20} /></div>
              <h4>Educational Experiences</h4>
              <p>Science Center access and daily lectures are built into the fare, not sold as add-ons.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Destination-Focused Itineraries</h4>
              <p>Every inclusion is designed around getting you closer to the places you've come to see.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INCLUSIONS BY CATEGORY EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Inclusions by Category</h2>
            <p>Select a category to see exactly what's built into your HX expedition fare.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeCategory === 0 ? "active" : ""}`} onClick={() => setActiveCategory(0)}>
                <ShieldCheck size={18} /> <span className="tsa_month_tab_label">Accommodation</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 1 ? "active" : ""}`} onClick={() => setActiveCategory(1)}>
                <UtensilsCrossed size={18} /> <span className="tsa_month_tab_label">Dining</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 2 ? "active" : ""}`} onClick={() => setActiveCategory(2)}>
                <Users size={18} /> <span className="tsa_month_tab_label">Expedition Team</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 3 ? "active" : ""}`} onClick={() => setActiveCategory(3)}>
                <Microscope size={18} /> <span className="tsa_month_tab_label">Science Center</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 4 ? "active" : ""}`} onClick={() => setActiveCategory(4)}>
                <Backpack size={18} /> <span className="tsa_month_tab_label">Equipment</span>
              </button>
            </div>

            {activeCategory === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Thoughtfully Designed &amp; Ready to Relax In</div>
                  <h3 className="tsa_month_title">Accommodation</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Private ensuite bathroom</li>
                    <li><Check size={16} /> Comfortable bedding &amp; climate control</li>
                    <li><Check size={16} /> Daily housekeeping</li>
                    <li><Check size={16} /> Complimentary Wi-Fi in every cabin</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Comfort</span>
                    <span>Scandinavian Design</span>
                    <span>Every Category</span>
                  </div>
                  <p className="tsa_month_note">
                    Accommodation categories range from Polar Inside Cabins to luxurious Expedition Suites,
                    all included in your fare.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Every Cabin</div>
                    <div className="tsa_stat_card_label">Included Category</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Daily</div>
                    <div className="tsa_stat_card_label">Housekeeping</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "90%" }} /><div className="tsa_bar_label">Stay</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Dine</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Learn</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Gear</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Fresh, Destination-Inspired &amp; All-Inclusive</div>
                  <h3 className="tsa_month_title">Dining</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Breakfast, lunch &amp; dinner included</li>
                    <li><Check size={16} /> Coffee and tea included</li>
                    <li><Check size={16} /> Regional cuisine &amp; international favorites</li>
                    <li><Check size={16} /> Vegetarian and vegan options available</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>All Three Meals</span>
                    <span>Dietary Accommodations</span>
                    <span>Fresh Ingredients</span>
                  </div>
                  <p className="tsa_month_note">
                    Dietary requirements can usually be accommodated with advance notice before your voyage.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <UtensilsCrossed size={22} />
                    <div className="tsa_stat_card_value">3 Meals Daily</div>
                    <div className="tsa_stat_card_label">Included</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Coffee &amp; Tea</div>
                    <div className="tsa_stat_card_label">Also Included</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Stay</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "85%" }} /><div className="tsa_bar_label">Dine</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Learn</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Gear</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Leading Every Landing &amp; Lecture</div>
                  <h3 className="tsa_month_title">Expedition Team</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Expedition Leaders &amp; Marine Biologists</li>
                    <li><Check size={16} /> Naturalists, Historians &amp; Geologists</li>
                    <li><Check size={16} /> Ornithologists &amp; Professional Photographers</li>
                    <li><Check size={16} /> Guidance enhances every excursion onboard</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Every Voyage</span>
                    <span>Multidisciplinary</span>
                    <span>Expert-Led</span>
                  </div>
                  <p className="tsa_month_note">
                    Every voyage is led by a multidisciplinary team whose guidance enhances every excursion
                    and onboard experience.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Users size={22} />
                    <div className="tsa_stat_card_value">Multidisciplinary</div>
                    <div className="tsa_stat_card_label">Team Makeup</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Every Voyage</div>
                    <div className="tsa_stat_card_label">Onboard Presence</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Stay</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Dine</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "75%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Learn</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Gear</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Unlimited Access, Every Voyage</div>
                  <h3 className="tsa_month_title">Science Center</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Daily lectures &amp; interactive exhibits</li>
                    <li><Check size={16} /> Scientific equipment on display</li>
                    <li><Check size={16} /> Citizen science participation</li>
                    <li><Check size={16} /> Photography workshops</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Daily Lectures</span>
                    <span>Citizen Science</span>
                    <span>All Experience Levels</span>
                  </div>
                  <p className="tsa_month_note">
                    Learning is an integral part of every expedition, with programs suitable for all
                    experience levels.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Microscope size={22} />
                    <div className="tsa_stat_card_value">Unlimited Access</div>
                    <div className="tsa_stat_card_label">Included</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Daily</div>
                    <div className="tsa_stat_card_label">Lectures</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Stay</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Dine</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">Learn</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Gear</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Loaned Gear for Shore Landings</div>
                  <h3 className="tsa_month_title">Expedition Equipment</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Waterproof expedition boots (loan)</li>
                    <li><Check size={16} /> Trekking poles on selected voyages</li>
                    <li><Check size={16} /> Landing equipment &amp; safety briefings</li>
                    <li><Check size={16} /> Expedition jackets on selected itineraries</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Loaned Gear</span>
                    <span>Safety First</span>
                    <span>Varies by Sailing</span>
                  </div>
                  <p className="tsa_month_note">
                    Specific equipment inclusions vary by destination and sailing — your specialist will
                    confirm exactly what's provided.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Backpack size={22} />
                    <div className="tsa_stat_card_value">Boots &amp; Poles</div>
                    <div className="tsa_stat_card_label">Often Included</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Varies</div>
                    <div className="tsa_stat_card_label">By Sailing</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Stay</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Dine</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "75%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Learn</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "55%" }} /><div className="tsa_bar_label">Gear</div></div>
                  </div>
                </div>
              </div>
            )}
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
              "One of the reasons travelers love HX Expeditions is the simplicity of knowing that so much of
              the experience is already included. From expert-led excursions to outstanding dining and
              educational programs, guests can focus entirely on enjoying the adventure."
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

      {/* ================= THE HX ALL-INCLUSIVE ADVANTAGE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>The HX All-Inclusive Advantage</h2>
            <p>
              HX offers one of the most comprehensive expedition experiences available, so guests can
              spend less time managing logistics and more time enjoying the adventure.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Anchor size={20} /></div>
              <h4>Zodiac Cruises &amp; Landings</h4>
              <p>Guided excursions are included whenever weather and safety conditions permit.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><BookOpen size={20} /></div>
              <h4>Daily Educational Programs</h4>
              <p>Presentations on marine biology, geology, history, and photography are built into every voyage.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Bird size={20} /></div>
              <h4>Citizen Science</h4>
              <p>Contribute to real research through wildlife monitoring and environmental data collection.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Photography Support</h4>
              <p>Professional photographers help you capture every included excursion at its best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEE WHAT'S INCLUDED IN ACTION (VIDEO REEL) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> WATCH THE EXPERIENCE
            </div>
            <h2>See What's Included in Action</h2>
            <p>From comfortable cabins and all-inclusive dining to guided Zodiac cruises and Science Center lectures, take a closer look at everything bundled into your HX expedition fare.</p>
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
                    ? "https://www.youtube.com/embed/7Z1IRjAIuY4?si=JyRc8oAfjw2zeQK2"
                    : "https://www.youtube.com/embed/7Z1IRjAIuY4?si=JyRc8oAfjw2zeQK2"
                }
                title="Inside the HX Science Center"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="tsa_reel_stats">
              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Accommodation &amp; Dining
                  </div>
                  <div className="tsa_reel_stat_label">
                    See the comfortable cabins and all-inclusive meals bundled into every fare.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Anchor size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Expedition Team &amp; Zodiacs
                  </div>
                  <div className="tsa_reel_stat_label">
                    Watch the expedition team lead guided Zodiac cruises and shore landings.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Microscope size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Science Center &amp; Wi-Fi
                  </div>
                  <div className="tsa_reel_stat_label">
                    Explore the onboard learning spaces and stay connected throughout your voyage.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INCLUSIONS SPOTLIGHT (TWO TABLES) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Inclusions Spotlight</h2>
            <p>A closer look at what's bundled into your fare onboard and out on excursion.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Onboard Inclusion</th>
                    <th>What's Covered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Accommodation</td><td>Private ensuite bathroom, housekeeping, Wi-Fi</td></tr>
                  <tr><td>Dining</td><td>Breakfast, lunch, dinner, coffee &amp; tea</td></tr>
                  <tr><td>Science Center</td><td>Lectures, exhibits, citizen science</td></tr>
                  <tr><td>Connectivity</td><td>Complimentary Wi-Fi onboard every ship</td></tr>
                  <tr><td>Briefings</td><td>Daily expedition briefings</td></tr>
                  <tr><td>Photography Support</td><td>Workshops led by professional photographers</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Excursion Inclusion</th>
                    <th>What's Covered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Zodiac Cruises</td><td>Guided excursions led by the expedition team</td></tr>
                  <tr><td>Shore Landings</td><td>Wildlife viewing, glacier exploration</td></tr>
                  <tr><td>Expedition Team</td><td>Leaders, biologists, naturalists &amp; historians</td></tr>
                  <tr><td>Citizen Science</td><td>Wildlife monitoring &amp; environmental data</td></tr>
                  <tr><td>Landing Equipment</td><td>Safety briefings &amp; loaned gear</td></tr>
                  <tr><td>Expedition Boots</td><td>Loaned waterproof boots (varies by voyage)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH INCLUSION MATTERS MOST TO YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Inclusion Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Zodiac Cruises &amp; Shore Landings:</h4>
              <ul>
                <li><Check size={14} /> Guided Zodiac cruises</li>
                <li><Check size={14} /> Wildlife viewing &amp; glacier exploration</li>
                <li><Check size={14} /> Scenic photography opportunities</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Expert Expedition Team:</h4>
              <ul>
                <li><Check size={14} /> Expedition Leaders &amp; Marine Biologists</li>
                <li><Check size={14} /> Naturalists &amp; Historians</li>
                <li><Check size={14} /> Professional Photographers</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Educational Programs:</h4>
              <ul>
                <li><Check size={14} /> Marine biology &amp; climate science</li>
                <li><Check size={14} /> Polar history &amp; geology</li>
                <li><Check size={14} /> Photography &amp; conservation topics</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Citizen Science:</h4>
              <ul>
                <li><Check size={14} /> Wildlife monitoring</li>
                <li><Check size={14} /> Ocean observations &amp; bird surveys</li>
                <li><Check size={14} /> Environmental data collection</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Expedition Equipment:</h4>
              <ul>
                <li><Check size={14} /> Waterproof boots (loan)</li>
                <li><Check size={14} /> Trekking poles on select voyages</li>
                <li><Check size={14} /> Landing equipment &amp; safety briefings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE HX EXPERIENCE GALLERY (FILMSTRIP) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> INCLUSIONS GALLERY
            </div>
            <h2>The HX Experience Gallery</h2>
            <p>Every HX expedition bundles together comfort, dining, learning, and adventure. Browse a closer look at what's already included in your fare.</p>
          </div>
          <div className="tsa_filmstrip_wrap">
            <div className="tsa_filmstrip">
              <div className="tsa_filmstrip_frame">
                <img src="/assets/hx_whats_included_1.jpg" alt="Comfortable HX cabin accommodation" />
                <span className="tsa_filmstrip_tag">Accommodation</span>
                <div className="tsa_filmstrip_caption">Thoughtfully designed cabins with private ensuite bathrooms, included in every fare.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/hx_whats_included_2.jpg" alt="All-inclusive dining onboard" />
                <span className="tsa_filmstrip_tag">All-Inclusive Dining</span>
                <div className="tsa_filmstrip_caption">Breakfast, lunch, and dinner served with fresh, destination-inspired flavors.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/hx_whats_included_3.jpg" alt="Science Center lecture onboard" />
                <span className="tsa_filmstrip_tag">Science Center</span>
                <div className="tsa_filmstrip_caption">Unlimited access to daily lectures, exhibits, and citizen science programs.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/hx_whats_included_4.jpg" alt="Guided Zodiac excursion" />
                <span className="tsa_filmstrip_tag">Zodiac Excursion</span>
                <div className="tsa_filmstrip_caption">Guided Zodiac cruises and shore landings led by the expedition team.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/hx_whats_included_5.jpg" alt="Guest using complimentary Wi-Fi onboard" />
                <span className="tsa_filmstrip_tag">Complimentary Wi-Fi</span>
                <div className="tsa_filmstrip_caption">Stay connected and share your adventure with complimentary Wi-Fi onboard.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT'S INCLUDED vs WHAT'S NOT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What's Included vs. What's Not</h2>
            <p>Our travel specialists will explain all inclusions before you book.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Typically Included</th>
                  <th>May Cost Extra</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Accommodation &amp; daily meals</td><td>International airfare</td></tr>
                <tr><td>Expedition Team &amp; Zodiac excursions</td><td>Travel insurance</td></tr>
                <tr><td>Science Center access &amp; lectures</td><td>Premium alcoholic beverages (varies by voyage)</td></tr>
                <tr><td>Complimentary Wi-Fi</td><td>Spa treatments</td></tr>
                <tr><td>Citizen science programs</td><td>Optional kayaking or camping experiences</td></tr>
                <tr><td>Daily expedition briefings</td><td>Personal shopping &amp; gratuities</td></tr>
                <tr><td>Loaned expedition boots (varies)</td><td>Pre- and post-cruise hotels</td></tr>
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
            <p>We'll ensure there are no surprises — just unforgettable experiences.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Understand Exactly What's Included</h4>
                <p>We walk you through every inclusion so there are no surprises once you're onboard.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Compare Itineraries</h4>
                <p>We help you weigh voyages side by side based on what's included in each fare.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Select the Right Ship</h4>
                <p>We match your travel style to the HX ship that fits it best.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Choose the Ideal Cabin</h4>
                <p>From Polar Inside to Grand Suites, we help you find the right accommodation.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Arrange Flights and Hotels</h4>
                <p>We coordinate the logistics that aren't included in your expedition fare.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS THE ALL-INCLUSIVE HX EXPERIENCE RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is the All-Inclusive HX Experience Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Travelers who want predictable, all-in pricing</li>
                <li><Check size={14} /> Guests who value expert-led excursions</li>
                <li><Check size={14} /> Curious travelers who enjoy learning onboard</li>
                <li><Check size={14} /> Families seeking a seamless, worry-free trip</li>
                <li><Check size={14} /> First-time and experienced expedition travelers alike</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers who prefer to book every activity à la carte</li>
                <li><X size={14} /> Guests wanting an included premium open bar</li>
                <li><X size={14} /> Those who don't want any structured programming</li>
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
                What is included with an HX expedition cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Your fare typically includes accommodations, daily meals, the Expedition Team, Zodiac excursions, guided shore landings, Science Center access, educational lectures, Wi-Fi, and citizen science programs.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Are meals included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Breakfast, lunch, and dinner are included, along with coffee and tea. Dietary requirements can usually be accommodated with advance notice.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are Zodiac excursions included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guided Zodiac cruises and shore landings are included on most HX itineraries.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Is the Expedition Team included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Every voyage includes an experienced team of expedition leaders, scientists, naturalists, and other specialists.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is Wi-Fi included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Complimentary Wi-Fi is included, although connection speeds may vary depending on the ship's location.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Is access to the Science Center included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guests have full access to the Science Center, educational lectures, and many interactive learning experiences.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are drinks included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Coffee and tea are generally included. Other beverage inclusions vary depending on the itinerary and fare.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Are waterproof boots provided? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many HX expeditions include loaned waterproof boots for shore landings. Availability varies by destination.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Are flights included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>International flights are generally not included unless specifically stated in your cruise package.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is travel insurance included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Travel insurance is usually not included and is highly recommended for expedition travel.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Are gratuities included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Gratuity policies vary by itinerary and booking package. Your travel advisor can explain current policies before booking.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I participate in citizen science? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many HX voyages offer opportunities to contribute to scientific research and environmental conservation projects.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are optional activities included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Some optional experiences, such as kayaking or camping, may require an additional fee depending on the itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Are educational lectures included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Daily lectures and presentations led by expedition experts are included throughout the voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX expedition through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our experts help you understand all inclusions, compare itineraries, choose the right ship and cabin, and plan every detail of your expedition for a seamless travel experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience HX Expeditions?</h2>
          <p>
            With exceptional inclusions, expert guidance, and immersive exploration, HX makes expedition
            travel both enriching and effortless. Let our specialists help you choose the perfect itinerary
            and make the most of everything HX has to offer.
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