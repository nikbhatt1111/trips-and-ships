import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ListTree,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Users,
  Sparkles,
  Calendar,
  ThermometerSun,
  Wind,
  CloudRain,
  Binoculars,
  Camera,
  Waves,
  Snowflake,
  Clock,
  Play,
} from "lucide-react";

/**
 * Best Time to Visit Greenland — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * Built on the same enriched SEO/interlinking template used for
 * SvalbardCruiseFAQ.jsx / SvalbardPackingGuide.jsx / SvalbardWildlifeGuide.jsx:
 * canonical + OG/Twitter tags, breadcrumb, jump-link table of
 * contents, zigzag media rows, ring stats, a month-by-month explorer,
 * a full-bleed banner, a video banner, a duo grid, and a "Read Next"
 * internal linking grid — all built around the seasonal topics
 * (Seasons at a Glance, Greenland by Season, Month-by-Month,
 * Wildlife, Icebergs & Northern Lights, Why Timing Matters) before
 * the full 15-question FAQ accordion. ItemList (months) + FAQPage +
 * Breadcrumb JSON-LD included per the source brief.
 *
 * Image paths follow /assets/Best_Time_Greenland_[N].jpg — swap in
 * real production photography/video.
 */

const SITE_URL = "https://www.tripsandships.com";
const PAGE_PATH = "/best-time-to-visit-greenland";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/best-time-to-visit-greenland-og.jpg`;

const TOC_ITEMS = [
  { id: "glance", label: "Seasons at a Glance" },
  { id: "seasons", label: "Greenland by Season" },
  { id: "months", label: "Month-by-Month Guide" },
  { id: "wildlife", label: "Best Time for Wildlife" },
  { id: "icebergs-lights", label: "Icebergs & Northern Lights" },
  { id: "timing", label: "Why Timing Matters" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const RELATED_PAGES = [
  { tag: "Icebergs", title: "Greenland Icebergs Guide", desc: "Disko Bay, Ilulissat, and where to see the biggest bergs.", href: "/greenland-icebergs" },
  { tag: "Wildlife", title: "Greenland Wildlife Guide", desc: "Whales, musk oxen, Arctic foxes, and seabirds by season.", href: "/greenland-wildlife" },
  { tag: "Icefjord", title: "Ilulissat Icefjord Guide", desc: "Inside the UNESCO World Heritage icefjord and its glacier.", href: "/ilulissat-icefjord" },
  { tag: "Answers", title: "Greenland Cruise FAQ", desc: "Every common question about booking and sailing to Greenland.", href: "/greenland-cruise-faq" },
];

const IMG = {
  summer: "/assets/Best_Time_Greenland_1.jpg",
  autumn: "/assets/Best_Time_Greenland_2.jpg",
  winter: "/assets/Best_Time_Greenland_3.jpg",
  bannerFull: "/assets/Best_Time_Greenland_4.jpg",
  icebergsLights: "/assets/Best_Time_Greenland_5.jpg",
  videoBanner: "/assets/Best_Time_Greenland_6.jpg",
};

const JSON_LD = `{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Organization",
      "@id":"${SITE_URL}/#organization",
      "name":"Trips & Ships Luxury Travel",
      "url":"${SITE_URL}",
      "logo":"${SITE_URL}/logo.png",
      "sameAs":[
        "https://www.facebook.com/",
        "https://www.linkedin.com/",
        "https://www.instagram.com/"
      ]
    },
    {
      "@type":"TravelAgency",
      "@id":"${SITE_URL}/#travelagency",
      "name":"Trips & Ships Luxury Travel",
      "url":"${SITE_URL}",
      "priceRange":"$$$$",
      "areaServed":"Worldwide"
    },
    {
      "@type":"Person",
      "@id":"${SITE_URL}/#angelahughes",
      "name":"Angela Hughes",
      "jobTitle":"CEO",
      "worksFor":{ "@id":"${SITE_URL}/#organization" },
      "description":"Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience."
    },
    {
      "@type":"WebPage",
      "@id":"${PAGE_URL}",
      "url":"${PAGE_URL}",
      "name":"Best Time to Visit Greenland",
      "headline":"Best Time to Visit Greenland | Month-by-Month Arctic Travel Guide",
      "description":"Discover the best time to visit Greenland for whales, icebergs, Northern Lights, hiking, kayaking, and expedition cruises.",
      "about":{ "@type":"Place", "name":"Greenland" },
      "isPartOf":{ "@id":"${SITE_URL}/#organization" },
      "primaryImageOfPage":"${OG_IMAGE}",
      "breadcrumb":{ "@id":"${PAGE_URL}#breadcrumb" }
    },
    {
      "@type":"BreadcrumbList",
      "@id":"${PAGE_URL}#breadcrumb",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"${SITE_URL}" },
        { "@type":"ListItem", "position":2, "name":"Greenland Cruises", "item":"${SITE_URL}/greenland-cruises" },
        { "@type":"ListItem", "position":3, "name":"Best Time to Visit Greenland", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"ItemList",
      "@id":"${PAGE_URL}#months",
      "name":"Best Time to Visit Greenland by Month",
      "itemListOrder":"https://schema.org/ItemListOrderAscending",
      "numberOfItems":6,
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"May", "description":"Early expedition season, sea ice, birdlife." },
        { "@type":"ListItem", "position":2, "name":"June", "description":"Midnight Sun, whales arrive, expedition cruises." },
        { "@type":"ListItem", "position":3, "name":"July", "description":"Peak wildlife, hiking, kayaking, warmest weather." },
        { "@type":"ListItem", "position":4, "name":"August", "description":"Outstanding iceberg viewing, whales, photography." },
        { "@type":"ListItem", "position":5, "name":"September", "description":"Northern Lights begin, autumn colors, fewer crowds." },
        { "@type":"ListItem", "position":6, "name":"October to April", "description":"Northern Lights, winter adventures, dog sledding." }
      ]
    },
    {
      "@type":"FAQPage",
      "@id":"${PAGE_URL}#faq",
      "mainEntity":[
        { "@type":"Question", "name":"What is the best month to visit Greenland?", "acceptedAnswer":{ "@type":"Answer", "text":"July and August are generally considered the best months for wildlife viewing, expedition cruises, and comfortable weather." } },
        { "@type":"Question", "name":"When is the expedition cruise season?", "acceptedAnswer":{ "@type":"Answer", "text":"Most Greenland expedition cruises operate from late May through September." } },
        { "@type":"Question", "name":"When can I see whales?", "acceptedAnswer":{ "@type":"Answer", "text":"Whale season typically runs from June through September." } },
        { "@type":"Question", "name":"When are icebergs most impressive?", "acceptedAnswer":{ "@type":"Answer", "text":"Icebergs can be seen throughout the summer, with June through September offering the best viewing." } },
        { "@type":"Question", "name":"Can I see the Northern Lights?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. The best viewing season generally begins in late September and continues through March." } },
        { "@type":"Question", "name":"Is Greenland cold in summer?", "acceptedAnswer":{ "@type":"Answer", "text":"Summer temperatures are relatively mild, usually ranging between 5°C and 12°C." } },
        { "@type":"Question", "name":"What wildlife can I see?", "acceptedAnswer":{ "@type":"Answer", "text":"Depending on the region and season, visitors may see whales, seals, musk oxen, Arctic foxes, seabirds, and occasionally polar bears in East Greenland." } },
        { "@type":"Question", "name":"Is July the busiest month?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. July is typically the peak month for Greenland expedition cruises." } },
        { "@type":"Question", "name":"When is the Midnight Sun?", "acceptedAnswer":{ "@type":"Answer", "text":"Northern Greenland experiences the Midnight Sun during June and July." } },
        { "@type":"Question", "name":"Is September a good time to visit?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. September offers beautiful autumn scenery, fewer crowds, and the return of the Northern Lights." } },
        { "@type":"Question", "name":"What should I pack?", "acceptedAnswer":{ "@type":"Answer", "text":"Pack layered clothing, waterproof outerwear, hiking boots, gloves, sunglasses, and camera equipment." } },
        { "@type":"Question", "name":"Are expedition cruises family-friendly?", "acceptedAnswer":{ "@type":"Answer", "text":"Some expedition cruise lines welcome families, while others are designed primarily for adults." } },
        { "@type":"Question", "name":"How long are Greenland cruises?", "acceptedAnswer":{ "@type":"Answer", "text":"Most itineraries range from 8 to 15 days depending on the route and cruise line." } },
        { "@type":"Question", "name":"Do I need travel insurance?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Comprehensive travel insurance covering expedition cruises is strongly recommended." } },
        { "@type":"Question", "name":"Why book through Trips & Ships Luxury Travel?", "acceptedAnswer":{ "@type":"Answer", "text":"Our experienced Arctic specialists help you choose the ideal season, itinerary, cruise line, cabin, and travel arrangements to ensure an unforgettable Greenland expedition." } }
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

export default function BestTimeToVisitGreenland() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState(2); // 0=May .. 4=September
  const [openFaq, setOpenFaq] = useState({});
  const [hovered, setHovered] = useState(false);
  const rootRef = useScrollReveal();

  const toggleFaq = (key) => setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON_LD;
    document.head.appendChild(script);

    const created = [];
    const setTag = (selector, make) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = make();
        document.head.appendChild(el);
        created.push(el);
      }
      return el;
    };

    setTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      l.href = PAGE_URL;
      return l;
    });

    const metaPairs = [
      ["description", "Discover the best time to visit Greenland for whales, icebergs, Northern Lights, hiking, kayaking, and expedition cruises. Compare each season and plan your perfect Arctic adventure with expert advice."],
      ["og:title", "Best Time to Visit Greenland | Trips & Ships"],
      ["og:description", "Month-by-month guide to Greenland's best season for whales, icebergs, hiking, kayaking, and the Northern Lights."],
      ["og:type", "article"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Best Time to Visit Greenland | Trips & Ships"],
      ["twitter:image", OG_IMAGE],
    ];
    metaPairs.forEach(([key, content]) => {
      const isOg = key.startsWith("og:") || key.startsWith("twitter:");
      const attr = isOg ? "property" : "name";
      setTag(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute(attr, key);
        m.setAttribute("content", content);
        return m;
      });
    });

    return () => {
      document.head.removeChild(script);
      created.forEach((el) => document.head.removeChild(el));
    };
  }, []);

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
            <Calendar size={14} /> ARCTIC TRAVEL GUIDE
          </div>
          <h1>Best Time to Visit Greenland</h1>
          <p>
            Greenland is one of the world's last great wilderness destinations, offering breathtaking
            fjords, towering icebergs, glaciers, Inuit culture, abundant wildlife, and unforgettable
            expedition cruising. The best time to visit depends on the experiences you're seeking — every
            season offers something unique.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Greenland Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Arctic Cruise Specialist</button>
          </div>
        </div>
      </header>

      {/* ================= BREADCRUMB ================= */}
      <div className="tsa_wrap">
        <nav className="tsa_breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <a href="/greenland-cruises">Greenland Cruises</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <span className="tsa_breadcrumb_current">Best Time to Visit Greenland</span>
        </nav>
      </div>

      {/* ================= TABLE OF CONTENTS ================= */}
      <section className="tsa_section" style={{ paddingBottom: 0 }}>
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_toc">
            <div className="tsa_toc_title"><ListTree size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />On This Page</div>
            <div className="tsa_toc_list">
              {TOC_ITEMS.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}>
                  <span className="tsa_toc_num">{String(i + 1).padStart(2, "0")}</span> {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER + SEASONS AT A GLANCE TABLE ================= */}
      <section className="tsa_section" id="glance">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: When Is the Best Time to Visit Greenland?</h2>
            <p>
              For most travelers, June through August is the best time to visit Greenland. These months
              offer the warmest weather, nearly 24-hour daylight, excellent wildlife viewing, spectacular
              iceberg scenery, and ideal conditions for expedition cruising, hiking, and kayaking. If your
              priority is seeing the Northern Lights, visit between late September and March, when long
              nights provide the best viewing opportunities.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Highlights</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>May</td><td>Early expedition season, sea ice, birdlife</td><td>★★★★☆</td></tr>
                <tr><td>June</td><td>Midnight Sun, whales begin arriving</td><td>★★★★★</td></tr>
                <tr><td>July</td><td>Peak wildlife, hiking, kayaking</td><td>★★★★★</td></tr>
                <tr><td>August</td><td>Icebergs, whales, warmest weather</td><td>★★★★★</td></tr>
                <tr><td>September</td><td>Northern Lights begin, fall colors</td><td>★★★★☆</td></tr>
                <tr><td>October–April</td><td>Northern Lights, winter adventures</td><td>★★★★☆</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= GREENLAND BY SEASON — zigzag, image LEFT / text RIGHT ================= */}
      <section className="tsa_section tsa_section_soft" id="seasons">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Peak Season</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.summer} alt="Summer icebergs and Midnight Sun in Greenland" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Sun size={14} /> SUMMER (JUNE–AUGUST)</div>
            <h2>The Most Popular Season for Expedition Cruises</h2>
            <p>
              Summer brings the Midnight Sun, iceberg scenery, whale watching, hiking, kayaking, glacier
              viewing, and visits to Inuit communities — all at comfortable average temperatures of 5°C to
              12°C (41°F–54°F).
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Sun size={15} /></span> Midnight Sun &amp; long daylight hours</li>
              <li><span className="tsa_zz_list_icon"><Waves size={15} /></span> Icebergs, whale watching &amp; glacier viewing</li>
              <li><span className="tsa_zz_list_icon"><Compass size={15} /></span> Hiking, kayaking &amp; Inuit communities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= DUO GRID — Autumn vs Winter ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Snowflake size={14} /> BEYOND SUMMER</div>
            <h2>Autumn vs. Winter in Greenland</h2>
            <p>Beyond the main expedition season, both autumn and winter offer their own rewards for the right traveler.</p>
          </div>
          <div className="tsa_duo_grid">
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Autumn</span>
              <img src={IMG.autumn} alt="Autumn colors and Northern Lights beginning in Greenland" />
              <div className="tsa_duo_overlay">
                <h4>September</h4>
                <p>A quieter, beautiful time to visit with Northern Lights, fall colors, fewer visitors, and continued iceberg viewing.</p>
              </div>
            </div>
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Winter</span>
              <img src={IMG.winter} alt="Winter dog sledding and Northern Lights in Greenland" />
              <div className="tsa_duo_overlay">
                <h4>October–April</h4>
                <p>Ideal for Northern Lights, dog sledding, snowmobiling, ice fishing, and Inuit cultural experiences. Cruise options are very limited.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RING STATS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Greenland Seasons, By the Numbers</h2>
            <p>What most travelers can expect when planning a Greenland expedition.</p>
          </div>
          <div className="tsa_ring_stat_row">
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 70 }}>
                <div className="tsa_ring_stat_inner">Late May–Sep</div>
              </div>
              <div className="tsa_ring_stat_label">Full expedition cruise season</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 100 }}>
                <div className="tsa_ring_stat_inner">Jun–Aug</div>
              </div>
              <div className="tsa_ring_stat_label">Best window for wildlife &amp; comfortable weather</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 45 }}>
                <div className="tsa_ring_stat_inner">5–12°C</div>
              </div>
              <div className="tsa_ring_stat_label">Typical summer coastal temperature range</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 65 }}>
                <div className="tsa_ring_stat_inner">8–15</div>
              </div>
              <div className="tsa_ring_stat_label">Typical cruise length, in days</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MONTH-BY-MONTH EXPLORER ================= */}
      <section className="tsa_section" id="months">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Month-by-Month Guide</h2>
            <p>Select a month to see what to expect on a Greenland expedition.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeMonth === 0 ? "active" : ""}`} onClick={() => setActiveMonth(0)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">May</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 1 ? "active" : ""}`} onClick={() => setActiveMonth(1)}>
                <Sun size={18} /> <span className="tsa_month_tab_label">June</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 2 ? "active" : ""}`} onClick={() => setActiveMonth(2)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">July</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 3 ? "active" : ""}`} onClick={() => setActiveMonth(3)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">August</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 4 ? "active" : ""}`} onClick={() => setActiveMonth(4)}>
                <Sparkles size={18} /> <span className="tsa_month_tab_label">September</span>
              </button>
            </div>

            {activeMonth === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Expedition Season Begins</div>
                  <h3 className="tsa_month_title">May</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Sea ice remains across many fjords</li>
                    <li><Check size={16} /> Migratory birds begin arriving</li>
                    <li><Check size={16} /> A quiet travel period with fewer visitors</li>
                    <li><Check size={16} /> Early expedition departures begin</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Photography</span>
                    <span>Birdwatching</span>
                    <span>Early Expeditions</span>
                  </div>
                  <p className="tsa_month_note">
                    A quiet start to the season, ideal for travelers who prefer fewer crowds and dramatic
                    sea ice scenery.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Snowflake size={22} />
                    <div className="tsa_stat_card_value">Sea Ice</div>
                    <div className="tsa_stat_card_label">Signature Scenery</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Quiet Season</div>
                    <div className="tsa_stat_card_label">Crowd Levels</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "55%" }} /><div className="tsa_bar_label">May</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Jun</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jul</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Aug</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Sep</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Midnight Sun &amp; Arriving Whales</div>
                  <h3 className="tsa_month_title">June</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Midnight Sun across northern Greenland</li>
                    <li><Check size={16} /> Impressive icebergs throughout coastal waters</li>
                    <li><Check size={16} /> Whale season begins</li>
                    <li><Check size={16} /> Long hiking days with extended daylight</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Expedition Cruises</span>
                    <span>Wildlife</span>
                    <span>Scenic Cruising</span>
                  </div>
                  <p className="tsa_month_note">
                    June marks the beginning of the main expedition season, with long daylight hours for
                    exploring.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Sun size={22} />
                    <div className="tsa_stat_card_value">Midnight Sun</div>
                    <div className="tsa_stat_card_label">Signature Highlight</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Whales Arrive</div>
                    <div className="tsa_stat_card_label">Wildlife Update</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">May</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "80%" }} /><div className="tsa_bar_label">Jun</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jul</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Aug</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Sep</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Peak Greenland Travel Season</div>
                  <h3 className="tsa_month_title">July</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> The warmest weather of the season</li>
                    <li><Check size={16} /> Excellent whale sightings</li>
                    <li><Check size={16} /> Hiking &amp; kayaking conditions at their best</li>
                    <li><Check size={16} /> Full expedition schedules &amp; glacier exploration</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Hiking</span>
                    <span>Kayaking</span>
                    <span>Peak Season</span>
                  </div>
                  <p className="tsa_month_note">
                    July is typically the peak month for Greenland expedition cruises, so early booking is
                    recommended.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Warmest Month</div>
                    <div className="tsa_stat_card_label">Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Peak Demand</div>
                    <div className="tsa_stat_card_label">Booking Window</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">May</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Jun</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Jul</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Aug</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Sep</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">One of the Best Months Overall</div>
                  <h3 className="tsa_month_title">August</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Outstanding iceberg viewing</li>
                    <li><Check size={16} /> Continued whale activity</li>
                    <li><Check size={16} /> Excellent conditions for photography</li>
                    <li><Check size={16} /> Full expedition cruise schedules</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Icebergs</span>
                    <span>Photography</span>
                    <span>Wildlife</span>
                  </div>
                  <p className="tsa_month_note">
                    Disko Bay remains one of the world's premier iceberg destinations throughout August.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Best Icebergs</div>
                    <div className="tsa_stat_card_label">Signature Highlight</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Full Schedule</div>
                    <div className="tsa_stat_card_label">Cruise Availability</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">May</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Jun</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jul</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Aug</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Sep</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Excellent Shoulder Season</div>
                  <h3 className="tsa_month_title">September</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Return of the Northern Lights</li>
                    <li><Check size={16} /> Beautiful autumn scenery</li>
                    <li><Check size={16} /> Noticeably fewer crowds</li>
                    <li><Check size={16} /> Great conditions for photography</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Northern Lights</span>
                    <span>Autumn Colors</span>
                    <span>Fewer Crowds</span>
                  </div>
                  <p className="tsa_month_note">
                    Weather becomes cooler in September, but many expedition cruises still operate through
                    the month.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Sparkles size={22} />
                    <div className="tsa_stat_card_value">Aurora Returns</div>
                    <div className="tsa_stat_card_label">Signature Highlight</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Shoulder Season</div>
                    <div className="tsa_stat_card_label">Crowd Levels</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">May</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "80%" }} /><div className="tsa_bar_label">Jun</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jul</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Aug</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "65%" }} /><div className="tsa_bar_label">Sep</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED BANNER ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><Waves size={13} /> Icebergs Await Nearly Year-Round</span>
          <h2>Disko Bay Is a World-Class Iceberg Destination</h2>
          <p>Towering icebergs, calving glaciers, and remote fjords make Greenland one of the most extraordinary expedition destinations on Earth.</p>
          <button className="tsa_btn_primary">Compare Greenland Cruises <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= BEST TIME FOR WILDLIFE (TABLE) ================= */}
      <section className="tsa_section" id="wildlife">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Binoculars size={14} /> WILDLIFE TIMING</div>
            <h2>Best Time for Wildlife</h2>
            <p>Depending on the region and season, you may see whales, seals, musk oxen, Arctic foxes, seabirds, and occasionally polar bears in East Greenland.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Wildlife</th>
                  <th>Best Months</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Humpback Whales</td><td>June–September</td></tr>
                <tr><td>Fin Whales</td><td>June–August</td></tr>
                <tr><td>Minke Whales</td><td>June–August</td></tr>
                <tr><td>Musk Oxen</td><td>Summer</td></tr>
                <tr><td>Arctic Foxes</td><td>Summer</td></tr>
                <tr><td>Seabirds</td><td>June–August</td></tr>
                <tr><td>Seals</td><td>Summer</td></tr>
                <tr><td>Polar Bears (East Greenland)</td><td>Summer Expeditions</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= ICEBERGS & NORTHERN LIGHTS — zigzag, image RIGHT / text LEFT ================= */}
      <section className="tsa_section tsa_section_soft" id="icebergs-lights">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Icebergs &amp; Aurora</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.icebergsLights} alt="Greenland icebergs beneath the Northern Lights" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Sparkles size={14} /> ICEBERGS &amp; THE NORTHERN LIGHTS</div>
            <h2>Two Very Different Kinds of Magic</h2>
            <p>
              Greenland's enormous icebergs can be seen throughout much of the expedition season, with Disko
              Bay remaining one of the world's premier iceberg destinations. The Aurora Borealis, meanwhile,
              is visible during the darker months, when long winter nights create ideal viewing conditions.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Waves size={16} /> Icebergs: June–September</div>
              <div className="tsa_chip"><Sparkles size={16} /> Northern Lights: Late Sep–Mar</div>
              <div className="tsa_chip"><Camera size={16} /> Disko Bay photography</div>
              <div className="tsa_chip"><Moon size={16} /> Long winter nights for aurora viewing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO BANNER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Play size={14} /> SEE IT IN ACTION</div>
            <h2>Watch: Greenland Through the Seasons</h2>
            <p>A short look at icebergs, whales, and the Northern Lights across Greenland's expedition year.</p>
          </div>
          <div
            className="tsa_video_card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <iframe
              key={hovered ? "play" : "pause"}
              className="tsa_video_iframe"
              src={
                hovered
                  ? "https://www.youtube.com/embed/LKFxnTDyL8Q?autoplay=1&mute=1&rel=0"
                  : "https://www.youtube.com/embed/LKFxnTDyL8Q?autoplay=0&mute=1&rel=0"
              }
              title="Greenland Through the Seasons"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ================= WHY TIMING MATTERS (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft" id="timing">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Timing Matters</h2>
            <p>Choosing the right season depends entirely on your priorities.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>For Wildlife, Choose:</h4>
              <ul>
                <li><Check size={14} /> July – August</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Icebergs, Choose:</h4>
              <ul>
                <li><Check size={14} /> June – September</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Hiking, Choose:</h4>
              <ul>
                <li><Check size={14} /> July – August</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Northern Lights, Choose:</h4>
              <ul>
                <li><Check size={14} /> September – March</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Expedition Cruising, Choose:</h4>
              <ul>
                <li><Check size={14} /> June – August</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Photography, Choose:</h4>
              <ul>
                <li><Check size={14} /> June – September</li>
              </ul>
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
              "Greenland offers something extraordinary throughout the year, but for most travelers, the
              summer expedition season provides the greatest variety of experiences. Long daylight hours,
              incredible wildlife, towering icebergs, and remote fjords combine to create one of the world's
              most remarkable expedition destinations. We help our clients select the itinerary and travel
              dates that perfectly match their interests."
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

      {/* ================= WHY BOOK WITH US ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book with Trips &amp; Ships Luxury Travel?</h2>
            <p>We'll help you experience Greenland at its very best.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Calendar size={20} /></div>
              <h4>Choose the Best Travel Season</h4>
              <p>We match your travel dates to the experiences you value most.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Select the Right Itinerary</h4>
              <p>Firsthand knowledge of expedition ships and their Greenland routes.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Recommend Travel Insurance</h4>
              <p>Coverage recommendations suited to remote Arctic expedition travel.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Personalize Every Detail</h4>
              <p>From flights and hotels to cabin selection, planned around you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= READ NEXT — internal linking ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><ArrowUpRight size={14} /> KEEP PLANNING</div>
            <h2>Read Next</h2>
            <p>More guides to help you plan the right Greenland departure.</p>
          </div>
          <div className="tsa_related_grid">
            {RELATED_PAGES.map((page) => (
              <a className="tsa_related_card" href={page.href} key={page.href}>
                <span className="tsa_related_tag">{page.tag}</span>
                <h4>{page.title}</h4>
                <p>{page.desc}</p>
                <span className="tsa_related_link">Read guide <ArrowUpRight size={13} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tsa_section" id="faq">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="tsa_faq_list">
            <div className={`tsa_faq_item ${openFaq.q1 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q1")}>
                What is the best month to visit Greenland? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>July and August are generally considered the best months for wildlife, expedition cruises, and comfortable weather.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                When is the expedition cruise season? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most Greenland expedition cruises operate from late May through September.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                When can I see whales? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Whale season typically runs from June through September.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                When are icebergs most impressive? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Icebergs can be seen throughout summer, with June through September offering exceptional viewing.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Can I see the Northern Lights? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. The best viewing season generally begins in late September and continues through March.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Is Greenland cold in summer? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Summer temperatures are relatively mild, usually ranging between 5°C and 12°C.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What wildlife can I see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Depending on the region and season, you may see whales, seals, musk oxen, Arctic foxes, seabirds, and occasionally polar bears in East Greenland.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is July the busiest month? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. July is typically peak season for Greenland expedition cruises.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                When is the Midnight Sun? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Northern Greenland experiences the Midnight Sun during the summer months, especially June and July.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is September a good time to visit? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. September offers beautiful autumn scenery, fewer crowds, and the return of the Northern Lights.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What should I pack? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Layered clothing, waterproof outerwear, hiking boots, gloves, sunglasses, and camera equipment are recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Are expedition cruises family-friendly? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Some cruise lines welcome families, while others are designed primarily for adults.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                How long are Greenland cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most itineraries range from 8 to 15 days, depending on the route and cruise line.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Do I need travel insurance? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Comprehensive travel insurance covering expedition cruises is strongly recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Our experienced Arctic specialists help you choose the ideal season, itinerary, cruise line, cabin, and travel arrangements to ensure an unforgettable Greenland expedition.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Visit Greenland?</h2>
          <p>
            Whether you want to cruise among giant icebergs, photograph whales beneath the Midnight Sun, or
            experience the magic of the Northern Lights, we'll help you choose the perfect time to visit.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request a Greenland Cruise Quote</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}