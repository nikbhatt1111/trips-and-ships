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
  Clock,
  Sparkles,
  Bird,
  Waves,
  Binoculars,
  Play,
  Anchor,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Antarctica Wildlife Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NEW IN THIS VERSION:
 *  - "Life Aboard Your Expedition Ship" video reel spotlight
 *  - "Wildlife Moments Captured" scrolling filmstrip gallery
 *  - A ringed portrait added to the existing Expert Quote section
 * All three use brand-new classes (tsa_reel_*, tsa_filmstrip_*,
 * tsa_quote_portrait_*) so nothing already in the shared CSS,
 * and nothing used on other pages, is reused or altered.
 *
 * NOTE: every image/video source below is a placeholder — swap
 * the URLs in PLACEHOLDER_MEDIA for real production assets.
 */

const PLACEHOLDER_MEDIA = {
  reelPoster: "https://placehold.co/900x675/0f1c2e/8fb4e8?text=Life+Aboard+the+Ship",
  reelVideo: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  portrait: "https://placehold.co/200x200/1c2f4a/8fb4e8?text=A.H.",
  film1: "https://placehold.co/520x680/16243a/8fb4e8?text=Gentoo+Colony",
  film2: "https://placehold.co/520x680/101b2c/8fb4e8?text=Leopard+Seal",
  film3: "https://placehold.co/520x680/1c2f4a/8fb4e8?text=Orca+Pod",
  film4: "https://placehold.co/520x680/16243a/8fb4e8?text=Albatross",
  film5: "https://placehold.co/520x680/101b2c/8fb4e8?text=Humpback+Tail",
};

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
      "@id":"https://www.tripsandships.com/antarctica-wildlife-guide",
      "url":"https://www.tripsandships.com/antarctica-wildlife-guide",
      "name":"Antarctica Wildlife Guide",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Wildlife Guide",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-wildlife-guide.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Wildlife Guide", "item":"https://www.tripsandships.com/antarctica-wildlife-guide" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What animals can you see in Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Antarctica is home to penguins, whales, seals, seabirds, and other marine wildlife, with sightings depending on the season and itinerary." }
        },
        {
          "@type":"Question",
          "name":"What is the best month for wildlife viewing?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January and February offer the best balance of wildlife activity, penguin chicks, and whale sightings." }
        },
        {
          "@type":"Question",
          "name":"Can I see Emperor Penguins?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Emperor Penguins are only seen on specialized expeditions and are not typically included on standard Antarctic Peninsula cruises." }
        },
        {
          "@type":"Question",
          "name":"When is whale watching best in Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"February and March are considered the best months for humpback, minke, and orca sightings." }
        },
        {
          "@type":"Question",
          "name":"Is Antarctica good for wildlife photography?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Antarctica is one of the world's premier wildlife photography destinations, offering exceptional opportunities to photograph penguins, whales, seals, and breathtaking polar landscapes." }
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

export default function AntarcticaWildlifeGuide() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState(1); // 0=Nov .. 4=Mar
  const [openFaq, setOpenFaq] = useState({});
  const [reelPlaying, setReelPlaying] = useState(false);
  const rootRef = useScrollReveal();
  const [hovered, setHovered] = useState(false);

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
            <Binoculars size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Antarctica Wildlife Guide</h1>
          <p>
            Discover the extraordinary animals that make Antarctica one of the world's greatest wildlife
            destinations. From thousands of penguins gathering in bustling colonies to humpback whales
            surfacing beside your expedition ship, every day offers unforgettable encounters.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Plan Your Antarctica Wildlife Expedition <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Penguins</div>
            <div className="tsa_ss_best">Gentoo, Adélie &amp; Chinstrap colonies</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Whales</div>
            <div className="tsa_ss_best">Humpback, minke &amp; orca sightings</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Seals</div>
            <div className="tsa_ss_best">Leopard, Weddell &amp; crabeater seals</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Seabirds</div>
            <div className="tsa_ss_best">Albatrosses, petrels &amp; skuas overhead</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">South Georgia</div>
            <div className="tsa_ss_best">Elephant seals &amp; king penguin colonies</div>
          </div>
        </div>
      </div>

      {/* ================= WHY VISIT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY ANTARCTICA IS A WILDLIFE LOVER'S DREAM
            </div>
            <h2>Few Destinations Rival Antarctica's Abundance of Wildlife</h2>
            <p>
              Antarctica is one of the last truly wild places on Earth, home to remarkable wildlife found
              nowhere else. From thousands of penguins gathering in bustling colonies to humpback whales
              surfacing beside your expedition ship, every day offers unforgettable encounters.
            </p>
            <p>
              Unlike traditional safaris, Antarctica's wildlife thrives in an untouched environment where
              animals often show little fear of humans. Carefully guided shore landings and Zodiac cruises
              allow travelers to observe these incredible species responsibly while respecting strict
              environmental guidelines.
            </p>
            <p>At Trips &amp; Ships Luxury Travel, we help you choose the ideal expedition and travel season to maximize your wildlife viewing opportunities while enjoying the comfort of a luxury expedition cruise.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Thousands of nesting penguins</div>
              <div className="tsa_chip"><Check size={16} /> Humpback whales feeding in icy waters</div>
              <div className="tsa_chip"><Check size={16} /> Leopard seals resting on floating ice</div>
              <div className="tsa_chip"><Check size={16} /> Orcas hunting in pods</div>
              <div className="tsa_chip"><Check size={16} /> Weddell seals lounging on sea ice</div>
              <div className="tsa_chip"><Check size={16} /> Giant albatrosses soaring overhead</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">16+</div>
              <div className="tsa_why_card_label">Species of penguins, whales, seals &amp; seabirds you may encounter</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">12–18mo</div>
              <div className="tsa_why_card_label">How far in advance wildlife-focused expeditions are best booked</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">4</div>
              <div className="tsa_why_card_label">Major wildlife groups: penguins, whales, seals &amp; seabirds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Wildlife Can You See in Antarctica?</h2>
            <p>
              Depending on the season and itinerary, you may encounter a wide range of penguins, whales,
              seals, and seabirds — each with its own peak viewing window.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Wildlife</th>
                  <th>Best Time</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Gentoo Penguins</td><td>November–February</td></tr>
                <tr><td>Adélie Penguins</td><td>November–January</td></tr>
                <tr><td>Chinstrap Penguins</td><td>December–February</td></tr>
                <tr><td>Emperor Penguins</td><td>Specialty departures</td></tr>
                <tr><td>Humpback Whales</td><td>February–March</td></tr>
                <tr><td>Minke Whales &amp; Orcas</td><td>January–March</td></tr>
                <tr><td>Leopard &amp; Crabeater Seals</td><td>December–March</td></tr>
                <tr><td>Weddell Seals</td><td>November–February</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES IT DIFFERENT (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Makes Antarctic Wildlife Different</h2>
            <p>Unlike a traditional safari, Antarctica's animals thrive in an untouched environment shaped by strict conservation rules.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Binoculars size={20} /></div>
              <h4>Little Fear of Humans</h4>
              <p>Animals here often show little fear of humans, allowing remarkably close, respectful encounters.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Guided Zodiac Cruises</h4>
              <p>Small-boat cruises get you close to whales, seals, and ice floes safely and responsibly.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Guided Shore Landings</h4>
              <p>Carefully guided landings let you walk among penguin colonies while respecting nesting areas.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Strict Environmental Guidelines</h4>
              <p>Every encounter follows environmental guidelines designed to protect this untouched habitat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE BY MONTH EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Best Time for Wildlife Viewing, Month by Month</h2>
            <p>Select a month to explore which species are most active and easiest to see.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeMonth === 0 ? "active" : ""}`} onClick={() => setActiveMonth(0)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">November</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 1 ? "active" : ""}`} onClick={() => setActiveMonth(1)}>
                <Users size={18} /> <span className="tsa_month_tab_label">December</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 2 ? "active" : ""}`} onClick={() => setActiveMonth(2)}>
                <Sun size={18} /> <span className="tsa_month_tab_label">January</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 3 ? "active" : ""}`} onClick={() => setActiveMonth(3)}>
                <Fish size={18} /> <span className="tsa_month_tab_label">February</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 4 ? "active" : ""}`} onClick={() => setActiveMonth(4)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">March</span>
              </button>
            </div>

            {activeMonth === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Penguin Courtship Begins</div>
                  <h3 className="tsa_month_title">November</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Gentoo and Adélie penguins begin courtship displays</li>
                    <li><Check size={16} /> Weddell seals resting on fresh sea ice</li>
                    <li><Check size={16} /> Elephant seals on South Georgia itineraries (into early Nov)</li>
                    <li><Check size={16} /> Dramatic, untouched landscapes for wildlife photography</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Landscape Photographers</span>
                    <span>Penguin Courtship</span>
                    <span>Quiet Sailings</span>
                  </div>
                  <p className="tsa_month_note">
                    Considerations: whale sightings are less frequent than later in the season, and penguin
                    chicks have not yet hatched.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Gentoo &amp; Adélie</div>
                    <div className="tsa_stat_card_label">Signature Species</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Courtship</div>
                    <div className="tsa_stat_card_label">Peak Behavior</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "92%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Nesting Penguins &amp; Active Seal Colonies</div>
                  <h3 className="tsa_month_title">December</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Gentoo and Chinstrap penguins incubating eggs</li>
                    <li><Check size={16} /> Weddell seals frequently resting on sea ice</li>
                    <li><Check size={16} /> Leopard and crabeater seals become more active</li>
                    <li><Check size={16} /> Nearly 24 hours of daylight for extended wildlife viewing</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Holiday Travelers</span>
                    <span>Nesting Penguins</span>
                  </div>
                  <p className="tsa_month_note">
                    Luxury travelers often choose December for the combination of nesting penguin colonies
                    and long daylight hours for wildlife photography.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Chinstrap &amp; Seals</div>
                    <div className="tsa_stat_card_label">Signature Species</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">~24 hrs</div>
                    <div className="tsa_stat_card_label">Daylight for Viewing</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "92%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Penguin Chicks &amp; Diverse Wildlife</div>
                  <h3 className="tsa_month_title">January</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Penguin chicks begin appearing across colonies</li>
                    <li><Check size={16} /> Orcas and minke whales seen weaving through icy channels</li>
                    <li><Check size={16} /> Warmest weather of the season for comfortable viewing</li>
                    <li><Check size={16} /> Excellent kayaking and Zodiac conditions for close encounters</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Penguin Chicks</span>
                    <span>Active Travelers</span>
                  </div>
                  <p className="tsa_month_note">
                    Because demand peaks in January, booking 12–18 months in advance is highly recommended
                    to secure preferred suites and itineraries.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Penguin Chicks</div>
                    <div className="tsa_stat_card_label">Signature Species</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Orcas &amp; Minke</div>
                    <div className="tsa_stat_card_label">Peak Sightings Begin</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "92%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Peak Whale Watching &amp; Active Penguin Chicks</div>
                  <h3 className="tsa_month_title">February</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Peak humpback whale sightings begin</li>
                    <li><Check size={16} /> Penguin chicks becoming active and independent</li>
                    <li><Check size={16} /> Frequent minke whale and orca encounters</li>
                    <li><Check size={16} /> Leopard and crabeater seals remain highly active</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Photographers</span>
                    <span>Whale Enthusiasts</span>
                    <span>Returning Visitors</span>
                  </div>
                  <p className="tsa_month_note">
                    By February, penguin chicks are growing rapidly and whales are feeding in large numbers —
                    often considered the most rewarding month for wildlife.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Humpback Whales</div>
                    <div className="tsa_stat_card_label">Signature Species</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Peak Activity</div>
                    <div className="tsa_stat_card_label">Overall Wildlife</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "92%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Outstanding Whale Encounters, Fewer Visitors</div>
                  <h3 className="tsa_month_title">March</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Outstanding humpback, minke, and orca whale encounters</li>
                    <li><Check size={16} /> Antarctic fur seals more commonly encountered</li>
                    <li><Check size={16} /> Peaceful, uncrowded wildlife viewing</li>
                    <li><Check size={16} /> Spectacular polar lighting for wildlife photography</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Peaceful Voyages</span>
                    <span>Whale Watchers</span>
                    <span>Smaller Crowds</span>
                  </div>
                  <p className="tsa_month_note">
                    March marks the final weeks of the season. There are fewer penguin chicks than earlier
                    in the season, but whale rewards remain significant.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Whales &amp; Fur Seals</div>
                    <div className="tsa_stat_card_label">Signature Species</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Fewer Visitors</div>
                    <div className="tsa_stat_card_label">Crowd Levels</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "92%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "80%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= EXPERT QUOTE (now with ringed portrait) ================= */}
      <section className="tsa_section tsa_quote_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_quote_card">
            <div className="tsa_quote_mark">
              <Sparkles size={32} />
            </div>
            <p className="tsa_quote_text">
              "Antarctica offers wildlife experiences unlike anywhere else on Earth. Whether it's standing
              beside a bustling penguin colony or watching humpback whales surface just meters from your
              Zodiac, these moments leave a lasting impression. Choosing the right season and itinerary
              makes all the difference, and that's where expert guidance becomes invaluable."
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

      {/* ================= LUXURY WILDLIFE EXPEDITIONS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Luxury Wildlife Expeditions</h2>
            <p>
              Luxury expedition cruises enhance wildlife viewing through small-group excursions, expert
              guidance, and flexible itineraries built around wildlife activity.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Small-Group Zodiacs</h4>
              <p>Small-group Zodiac excursions get you closer to wildlife without disturbing it.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Naturalists</h4>
              <p>Onboard naturalists lead landings, briefings, and wildlife lectures throughout the voyage.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Binoculars size={20} /></div>
              <h4>Observation Decks</h4>
              <p>Dedicated observation decks make it easy to spot whales and seabirds from the ship.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Photography Support</h4>
              <p>Professional photography support helps you capture every wildlife encounter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW: LIFE ABOARD YOUR EXPEDITION SHIP (VIDEO REEL) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> WATCH WILDLIFE
            </div>
            <h2>Watch Antarctica's Wildlife in Action</h2>
            <p>Experience the unforgettable moments that make Antarctica one of the world's greatest wildlife destinations—from curious penguins and resting leopard seals to breaching humpback whales and soaring seabirds.</p>
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
                  ? "https://www.youtube.com/embed/YtAL8y2lACs?si=XERQ-OcrTlAIBgua"
                  : "https://www.youtube.com/embed/YtAL8y2lACs?si=XERQ-OcrTlAIBgua"
              }
              title="Antarctica Wildlife Encounters"
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
                    Penguin Colonies
                  </div>
                  <div className="tsa_reel_stat_label">
                    Observe Gentoo, Adélie, and Chinstrap penguins nesting, feeding, and caring for their chicks.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <Anchor size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Whale Encounters
                  </div>
                  <div className="tsa_reel_stat_label">
                    Watch humpback whales breach, minke whales glide through sea ice, and orcas patrol icy channels.
                  </div>
                </div>
              </div>

              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon">
                  <UtensilsCrossed size={18} />
                </div>
                <div>
                  <div className="tsa_reel_stat_title">
                    Seals & Seabirds
                  </div>
                  <div className="tsa_reel_stat_label">
                    Spot leopard seals, Weddell seals, wandering albatrosses, petrels, and skuas throughout your voyage.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= WEATHER + WILDLIFE TABLES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Species Spotlight</h2>
            <p>A closer look at Antarctica's penguins, seals, and the seabirds you'll see overhead.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Penguin / Seal</th>
                    <th>Known For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Gentoo Penguins</td><td>Bright orange beaks, curious personalities</td></tr>
                  <tr><td>Adélie Penguins</td><td>Energetic behavior, pebble nest building</td></tr>
                  <tr><td>Chinstrap Penguins</td><td>Thin black chin line, excellent climbers</td></tr>
                  <tr><td>Leopard Seals</td><td>Antarctica's apex predator, powerful swimmers</td></tr>
                  <tr><td>Weddell Seals</td><td>Calm behavior, excellent diving abilities</td></tr>
                  <tr><td>Elephant Seals</td><td>Largest seal species, seen on South Georgia itineraries</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Seabird</th>
                    <th>Role in the Ecosystem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Wandering Albatross</td><td>Soars for hours over open Southern Ocean waters</td></tr>
                  <tr><td>Southern Giant Petrel</td><td>Scavenges and hunts along the coastline</td></tr>
                  <tr><td>Snow Petrel</td><td>Nests on cliffs deep within Antarctic territory</td></tr>
                  <tr><td>Antarctic Tern</td><td>Agile flier seen darting near expedition ships</td></tr>
                  <tr><td>Brown Skua</td><td>Bold predator of penguin colonies</td></tr>
                  <tr><td>Blue-Eyed Shag</td><td>Diving seabird found along rocky shorelines</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH WILDLIFE MATTERS MOST TO YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Wildlife Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Penguins If You Want:</h4>
              <ul>
                <li><Check size={14} /> Gentoo, Adélie &amp; Chinstrap colonies</li>
                <li><Check size={14} /> Penguin courtship and chick-rearing</li>
                <li><Check size={14} /> Pebble-nest building behavior</li>
                <li><Check size={14} /> Family-friendly wildlife viewing</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Whales If You Want:</h4>
              <ul>
                <li><Check size={14} /> Humpback breaching and tail-slapping</li>
                <li><Check size={14} /> Bubble-net feeding displays</li>
                <li><Check size={14} /> Orca pods hunting cooperatively</li>
                <li><Check size={14} /> Minke whales weaving through sea ice</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Seals If You Want:</h4>
              <ul>
                <li><Check size={14} /> Leopard seals resting on ice floes</li>
                <li><Check size={14} /> Weddell seals' calm, curious nature</li>
                <li><Check size={14} /> Crabeater seals in large numbers</li>
                <li><Check size={14} /> Elephant seals on South Georgia</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Seabirds If You Want:</h4>
              <ul>
                <li><Check size={14} /> Wandering albatrosses overhead</li>
                <li><Check size={14} /> Petrels and skuas near the ship</li>
                <li><Check size={14} /> Coastal shag and tern sightings</li>
                <li><Check size={14} /> Birdwatching between landings</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose South Georgia If You Want:</h4>
              <ul>
                <li><Check size={14} /> Vast king penguin colonies</li>
                <li><Check size={14} /> Massive elephant seal gatherings</li>
                <li><Check size={14} /> An extended, wildlife-rich itinerary</li>
                <li><Check size={14} /> A truly bucket-list expedition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEW: WILDLIFE MOMENTS CAPTURED (FILMSTRIP GALLERY) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> WILDLIFE GALLERY
            </div>
            <h2>Iconic Antarctic Wildlife You'll Encounter</h2>
            <p>Every expedition offers unique wildlife sightings. Browse some of Antarctica's most remarkable animals that photographers and travelers regularly encounter throughout the expedition season.</p>
          </div>
          <div className="tsa_filmstrip_wrap">
            <div className="tsa_filmstrip">
              <div className="tsa_filmstrip_frame">
                <img src="/assets/antarctica_wildlife_guide_1.jpg" alt="Gentoo penguin colony on rocky shoreline" />
                <span className="tsa_filmstrip_tag">Gentoo Penguins</span>
                <div className="tsa_filmstrip_caption">Curious and friendly penguins commonly seen across the Antarctic Peninsula.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/antarctica_wildlife_guide_2.jpg" alt="Leopard seal resting on an ice floe" />
                <span className="tsa_filmstrip_tag">Leopard Seal</span>
                <div className="tsa_filmstrip_caption">Antarctica's apex predator often spotted relaxing on floating ice between hunts.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/antarctica_wildlife_guide_3.jpg" alt="Orca pod swimming near the ship" />
                <span className="tsa_filmstrip_tag">Orca Pod</span>
                <div className="tsa_filmstrip_caption">Powerful killer whales occasionally hunt cooperatively through icy channels.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/antarctica_wildlife_guide_4.jpg" alt="Wandering albatross in flight" />
                <span className="tsa_filmstrip_tag">Wandering Albatross</span>
                <div className="tsa_filmstrip_caption">One of the world's largest flying birds, effortlessly gliding above the Southern Ocean.</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src="/assets/antarctica_wildlife_guide_5.jpg" alt="Humpback whale tail diving" />
                <span className="tsa_filmstrip_tag">Humpback Whale</span>
                <div className="tsa_filmstrip_caption">Late-season expeditions offer spectacular whale sightings and unforgettable photography opportunities.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTOGRAPHY TIPS vs RESPONSIBLE VIEWING ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Wildlife Photography Tips &amp; Responsible Viewing</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Photography Tips</th>
                  <th>Responsible Wildlife Viewing</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Keep your camera easily accessible</td><td>Maintain required distances</td></tr>
                <tr><td>Use a zoom lens for whales and seabirds</td><td>Never feed wildlife</td></tr>
                <tr><td>Respect minimum wildlife distances</td><td>Avoid sudden movements</td></tr>
                <tr><td>Carry spare batteries</td><td>Follow guide instructions</td></tr>
                <tr><td>Protect equipment from sea spray</td><td>Leave no trace</td></tr>
                <tr><td>Be patient — wildlife often approaches unexpectedly</td><td>Respect nesting areas</td></tr>
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
            <p>Choosing the right Antarctica itinerary is essential if wildlife is your priority.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Match Travel Dates With Wildlife Seasons</h4>
                <p>We align your sailing dates with the species and behaviors you most want to see.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Select the Best Expedition Ship</h4>
                <p>Ship size and itinerary shape how close and how often you'll encounter wildlife.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Compare Itineraries</h4>
                <p>We help you weigh Antarctic Peninsula routes against South Georgia extensions.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Arrange Flights and Accommodations</h4>
                <p>Every logistical detail is handled so you can focus on the wildlife.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Personalize Every Aspect of Your Journey</h4>
                <p>With decades of luxury travel expertise, we help you experience Antarctica at its very best.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS WILDLIFE TRAVEL RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is a Wildlife-Focused Expedition Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Nature photographers</li>
                <li><Check size={14} /> Bucket-list travelers</li>
                <li><Check size={14} /> Families seeking educational adventure</li>
                <li><Check size={14} /> Returning visitors chasing whale season</li>
                <li><Check size={14} /> Travelers who value responsible tourism</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers wanting a guaranteed sighting checklist</li>
                <li><X size={14} /> Those uncomfortable with cold climates</li>
                <li><X size={14} /> Guests seeking nightlife-focused cruises</li>
                <li><X size={14} /> Travelers with very limited mobility</li>
                <li><X size={14} /> Last-minute planners during peak whale season</li>
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
                What animals can you see in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>You may encounter penguins, whales, seals, seabirds, and other marine wildlife depending on the season and itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What is the best month to see wildlife in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January and February generally offer the best combination of active wildlife, penguin chicks, and whale sightings.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Can you see Emperor Penguins on a regular Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most standard Antarctic Peninsula cruises do not visit Emperor Penguin colonies. Seeing them requires specialized expeditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Which penguin species live in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Commonly seen species include Gentoo, Adélie, and Chinstrap penguins. Emperor Penguins are found on select specialty voyages.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                When is whale watching best? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>February and March are considered the peak months for humpback, minke, and orca sightings.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are leopard seals dangerous? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Leopard seals are powerful predators, but licensed expedition operators maintain safe viewing distances and follow strict wildlife guidelines.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Will I see whales on every expedition? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Wildlife sightings can never be guaranteed, but many travelers encounter whales, particularly during late-season sailings.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can I photograph the wildlife? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Antarctica is one of the world's premier wildlife photography destinations, offering exceptional opportunities for photographers of all skill levels.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                How close can I get to the animals? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Visitors must follow IAATO guidelines and maintain respectful distances. In many cases, wildlife may approach you naturally.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are wildlife encounters ethical? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Licensed expedition operators follow strict conservation and environmental regulations to minimize human impact.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What birds can I see in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Common seabirds include wandering albatrosses, petrels, skuas, Antarctic terns, and blue-eyed shags.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Are there polar bears in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Polar bears live in the Arctic, while Antarctica is home to penguins, seals, whales, and seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                What is the best itinerary for wildlife lovers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula offers abundant wildlife, while itineraries including South Georgia provide opportunities to see elephant seals and vast king penguin colonies.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Is Antarctica good for wildlife photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. The continent offers incredible opportunities to photograph penguins, whales, seals, icebergs, and dramatic polar landscapes.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                How far in advance should I book a wildlife-focused expedition? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury wildlife expeditions are best booked 12–18 months in advance to secure preferred itineraries and suite categories.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience Antarctica's Incredible Wildlife?</h2>
          <p>
            Whether your dream is photographing thousands of penguins, watching humpback whales breach
            beside your ship, or observing leopard seals resting on floating ice, Antarctica offers
            unforgettable wildlife encounters found nowhere else on Earth.
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