import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ListTree,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Users,
  Sparkles,
  Binoculars,
  Camera,
  Snowflake,
  Waves,
  Bird,
  Anchor,
  Fish,
  Clock,
  ThermometerSun,
  Play,
} from "lucide-react";

/**
 * Svalbard Wildlife Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * Built on the same enriched SEO/interlinking template used for
 * SvalbardCruiseFAQ.jsx / SvalbardPackingGuide.jsx: canonical +
 * OG/Twitter tags, breadcrumb, jump-link table of contents, zigzag
 * media rows, ring stats, a full-bleed banner, a video banner, a
 * duo grid, and a "Read Next" internal linking grid — all built
 * around the wildlife topics (Wildlife at a Glance, Why Svalbard Is
 * a Paradise, Featured Species, Best Time to Visit, Photography,
 * Responsible Viewing) before the full 15-question FAQ accordion.
 * ItemList (species) + FAQPage + Breadcrumb JSON-LD included per
 * the source brief.
 *
 * Image paths follow /assets/Svalbard_Wildlife_Guide_[N].jpg — swap
 * in real production photography/video.
 */

const SITE_URL = "https://www.tripsandships.com";
const PAGE_PATH = "/svalbard-wildlife";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/svalbard-wildlife-og.jpg`;

const TOC_ITEMS = [
  { id: "glance", label: "Wildlife at a Glance" },
  { id: "paradise", label: "Why Svalbard Is a Wildlife Paradise" },
  { id: "species", label: "Featured Arctic Species" },
  { id: "best-time", label: "Best Time for Wildlife Viewing" },
  { id: "photography", label: "Wildlife Photography Tips" },
  { id: "safety", label: "Responsible Viewing & Safety" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const RELATED_PAGES = [
  { tag: "Prepare", title: "Svalbard Packing Guide", desc: "The layering system, footwear, and camera gear to bring.", href: "/svalbard-packing-guide" },
  { tag: "Answers", title: "Svalbard Cruise FAQ", desc: "Every common question about booking and sailing to Svalbard.", href: "/svalbard-cruise-faq" },
  { tag: "Timing", title: "Best Time to Visit Svalbard", desc: "When to sail for wildlife, ice, and the Midnight Sun.", href: "/best-time-to-visit-svalbard" },
  { tag: "Compare", title: "HX Svalbard Cruises", desc: "See the ships and itineraries sailing the Arctic archipelago.", href: "/hx-svalbard-cruises" },
];

const IMG = {
  paradise: "/assets/Svalbard_Wildlife_Guide_1.jpg",
  polarBear: "/assets/Svalbard_Wildlife_Guide_2.jpg",
  walrus: "/assets/Svalbard_Wildlife_Guide_3.jpg",
  whale: "/assets/Svalbard_Wildlife_Guide_4.jpg",
  arcticFox: "/assets/Svalbard_Wildlife_Guide_5.jpg",
  bannerFull: "/assets/Svalbard_Wildlife_Guide_6.jpg",
  bestTime: "/assets/Svalbard_Wildlife_Guide_7.jpg",
  videoBanner: "/assets/Svalbard_Wildlife_Guide_8.jpg",
  duoLand: "/assets/Svalbard_Wildlife_Guide_9.jpg",
  duoMarine: "/assets/Svalbard_Wildlife_Guide_10.jpg",
  safety1: "/assets/Svalbard_Wildlife_Guide_11.jpg",
  safety2: "/assets/Svalbard_Wildlife_Guide_12.jpg",
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
      "name":"Svalbard Wildlife Guide",
      "headline":"Svalbard Wildlife Guide | Polar Bears, Whales, Walruses & Arctic Wildlife",
      "description":"Explore the ultimate Svalbard Wildlife Guide featuring polar bears, whales, walruses, Arctic foxes, reindeer, seabirds, and more. Discover the best time for wildlife viewing, expedition cruises, and expert travel advice.",
      "isPartOf":{ "@id":"${SITE_URL}/#organization" },
      "about":{
        "@type":"Place",
        "name":"Svalbard",
        "address":{ "@type":"PostalAddress", "addressCountry":"Norway" }
      },
      "primaryImageOfPage":"${OG_IMAGE}",
      "breadcrumb":{ "@id":"${PAGE_URL}#breadcrumb" }
    },
    {
      "@type":"BreadcrumbList",
      "@id":"${PAGE_URL}#breadcrumb",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"${SITE_URL}" },
        { "@type":"ListItem", "position":2, "name":"Arctic Cruises", "item":"${SITE_URL}/arctic-cruises" },
        { "@type":"ListItem", "position":3, "name":"Svalbard Wildlife Guide", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"ItemList",
      "@id":"${PAGE_URL}#species",
      "name":"Featured Wildlife in Svalbard",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "item":{ "@type":"Taxon", "name":"Polar Bear", "alternateName":"Ursus maritimus" } },
        { "@type":"ListItem", "position":2, "item":{ "@type":"Taxon", "name":"Walrus", "alternateName":"Odobenus rosmarus" } },
        { "@type":"ListItem", "position":3, "item":{ "@type":"Taxon", "name":"Beluga Whale", "alternateName":"Delphinapterus leucas" } },
        { "@type":"ListItem", "position":4, "item":{ "@type":"Taxon", "name":"Minke Whale", "alternateName":"Balaenoptera acutorostrata" } },
        { "@type":"ListItem", "position":5, "item":{ "@type":"Taxon", "name":"Blue Whale", "alternateName":"Balaenoptera musculus" } },
        { "@type":"ListItem", "position":6, "item":{ "@type":"Taxon", "name":"Arctic Fox", "alternateName":"Vulpes lagopus" } },
        { "@type":"ListItem", "position":7, "item":{ "@type":"Taxon", "name":"Svalbard Reindeer", "alternateName":"Rangifer tarandus platyrhynchus" } },
        { "@type":"ListItem", "position":8, "item":{ "@type":"Taxon", "name":"Ringed Seal", "alternateName":"Pusa hispida" } },
        { "@type":"ListItem", "position":9, "item":{ "@type":"Taxon", "name":"Bearded Seal", "alternateName":"Erignathus barbatus" } },
        { "@type":"ListItem", "position":10, "item":{ "@type":"Taxon", "name":"Atlantic Puffin", "alternateName":"Fratercula arctica" } }
      ]
    },
    {
      "@type":"FAQPage",
      "@id":"${PAGE_URL}#faq",
      "mainEntity":[
        { "@type":"Question", "name":"What animals live in Svalbard?", "acceptedAnswer":{ "@type":"Answer", "text":"Svalbard is home to polar bears, walruses, whales, Arctic foxes, Svalbard reindeer, seals, and millions of seabirds." } },
        { "@type":"Question", "name":"What is the best time for wildlife viewing?", "acceptedAnswer":{ "@type":"Answer", "text":"June through August generally offers the best opportunities for wildlife viewing during expedition cruise season." } },
        { "@type":"Question", "name":"Can I see polar bears in Svalbard?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Svalbard is one of the world's premier destinations for observing wild polar bears." } },
        { "@type":"Question", "name":"Are whale sightings common?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Beluga, minke, blue, fin, and humpback whales may be seen during the summer months." } },
        { "@type":"Question", "name":"Can I see walruses?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Walrus haul-out colonies are a highlight of many Svalbard expedition cruises." } },
        { "@type":"Question", "name":"Are Arctic foxes easy to spot?", "acceptedAnswer":{ "@type":"Answer", "text":"Arctic foxes are regularly seen during summer expeditions, particularly near bird colonies." } },
        { "@type":"Question", "name":"What birds can I see?", "acceptedAnswer":{ "@type":"Answer", "text":"Visitors commonly see puffins, little auks, ivory gulls, kittiwakes, fulmars, Arctic terns, and guillemots." } },
        { "@type":"Question", "name":"Is wildlife viewing safe?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Guided expeditions follow strict safety procedures and responsible wildlife viewing practices." } },
        { "@type":"Question", "name":"Do cruises include wildlife experts?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Expedition teams include naturalists, marine biologists, ornithologists, and wildlife specialists." } },
        { "@type":"Question", "name":"Are wildlife sightings guaranteed?", "acceptedAnswer":{ "@type":"Answer", "text":"No. Wildlife is completely wild, so sightings can never be guaranteed." } },
        { "@type":"Question", "name":"Is Svalbard good for wildlife photography?", "acceptedAnswer":{ "@type":"Answer", "text":"Absolutely. Svalbard is considered one of the world's finest Arctic wildlife photography destinations." } },
        { "@type":"Question", "name":"Can I visit independently?", "acceptedAnswer":{ "@type":"Answer", "text":"Most wildlife experiences are safest and most rewarding through guided expedition cruises." } },
        { "@type":"Question", "name":"Does wildlife viewing harm animals?", "acceptedAnswer":{ "@type":"Answer", "text":"Responsible expedition operators follow strict environmental guidelines to minimize disturbance to wildlife." } },
        { "@type":"Question", "name":"What should I bring?", "acceptedAnswer":{ "@type":"Answer", "text":"Bring warm layered clothing, binoculars, a telephoto camera lens, waterproof gear, and sturdy footwear." } },
        { "@type":"Question", "name":"Why book through Trips & Ships Luxury Travel?", "acceptedAnswer":{ "@type":"Answer", "text":"Our specialists help you choose the best season, expedition cruise, and itinerary to maximize wildlife viewing while providing expert guidance throughout your journey." } }
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

export default function SvalbardWildlifeGuide() {
  const [theme, setTheme] = useState("light");
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
      ["description", "Explore the ultimate Svalbard Wildlife Guide featuring polar bears, whales, walruses, Arctic foxes, reindeer, seabirds, and more. Discover the best time for wildlife viewing, expedition cruises, and expert travel advice."],
      ["og:title", "Svalbard Wildlife Guide | Trips & Ships"],
      ["og:description", "Polar bears, whales, walruses, Arctic foxes, reindeer, and seabirds — everything you need to know about Arctic wildlife in Svalbard."],
      ["og:type", "article"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Svalbard Wildlife Guide | Trips & Ships"],
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
            <Binoculars size={14} /> ARCTIC WILDLIFE GUIDE
          </div>
          <h1>Svalbard Wildlife Guide</h1>
          <p>
            Svalbard is one of the world's greatest wildlife destinations. Located between mainland Norway
            and the North Pole, this remote Arctic archipelago is home to some of the planet's most iconic
            animals, including polar bears, walruses, whales, Arctic foxes, reindeer, seals, and millions
            of nesting seabirds.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Svalbard Wildlife Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Arctic Wildlife Specialist</button>
          </div>
        </div>
      </header>

      {/* ================= BREADCRUMB ================= */}
      <div className="tsa_wrap">
        <nav className="tsa_breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <a href="/arctic-cruises">Arctic Cruises</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <span className="tsa_breadcrumb_current">Svalbard Wildlife Guide</span>
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

      {/* ================= QUICK ANSWER + WILDLIFE AT A GLANCE TABLE ================= */}
      <section className="tsa_section" id="glance">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Wildlife Can You See in Svalbard?</h2>
            <p>
              Svalbard is one of the richest wildlife destinations in the Arctic. Visitors may encounter
              polar bears, walruses, beluga whales, minke whales, Arctic foxes, Svalbard reindeer, ringed
              seals, bearded seals, puffins, little auks, ivory gulls, and numerous other seabirds. The best
              wildlife viewing generally takes place between June and August, when expedition cruises can
              access remote fjords, glaciers, and sea ice.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Wildlife</th>
                  <th>Best Time to See</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Polar Bears</td><td>June – August</td></tr>
                <tr><td>Walruses</td><td>June – August</td></tr>
                <tr><td>Beluga Whales</td><td>June – September</td></tr>
                <tr><td>Minke Whales</td><td>June – August</td></tr>
                <tr><td>Blue Whales</td><td>July – August</td></tr>
                <tr><td>Arctic Foxes</td><td>March – August</td></tr>
                <tr><td>Svalbard Reindeer</td><td>Year-Round</td></tr>
                <tr><td>Ringed Seals</td><td>Spring &amp; Summer</td></tr>
                <tr><td>Bearded Seals</td><td>Summer</td></tr>
                <tr><td>Puffins</td><td>June – August</td></tr>
                <tr><td>Little Auks</td><td>May – July</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHY SVALBARD IS A WILDLIFE PARADISE — zigzag, image LEFT / text RIGHT ================= */}
      <section className="tsa_section tsa_section_soft" id="paradise">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Arctic Wilderness</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.paradise} alt="Vast protected Arctic wilderness in Svalbard" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Sparkles size={14} /> WHY SVALBARD IS A WILDLIFE PARADISE</div>
            <h2>Ideal Habitat for a Remarkable Diversity of Wildlife</h2>
            <p>
              Unlike traditional sightseeing vacations, wildlife encounters in Svalbard are truly wild and
              unpredictable. Every expedition offers unique opportunities to observe animals in their
              natural habitat while learning from expert expedition teams dedicated to conservation and
              responsible exploration.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Compass size={15} /></span> Vast protected wilderness &amp; national parks</li>
              <li><span className="tsa_zz_list_icon"><Waves size={15} /></span> Rich Arctic marine ecosystems &amp; productive coastal waters</li>
              <li><span className="tsa_zz_list_icon"><ShieldCheck size={15} /></span> Minimal human population &amp; strict environmental regulations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= RING STATS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Svalbard Wildlife, By the Numbers</h2>
            <p>What most travelers can expect when planning a wildlife-focused expedition.</p>
          </div>
          <div className="tsa_ring_stat_row">
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 75 }}>
                <div className="tsa_ring_stat_inner">Jun–Aug</div>
              </div>
              <div className="tsa_ring_stat_label">Peak window for overall wildlife viewing</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 100 }}>
                <div className="tsa_ring_stat_inner">10+</div>
              </div>
              <div className="tsa_ring_stat_label">Featured species regularly seen on expeditions</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 60 }}>
                <div className="tsa_ring_stat_inner">5</div>
              </div>
              <div className="tsa_ring_stat_label">Whale species that migrate through Svalbard's waters</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 40 }}>
                <div className="tsa_ring_stat_inner">Millions</div>
              </div>
              <div className="tsa_ring_stat_label">Of seabirds nesting on Svalbard's cliffs each summer</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ARCTIC SPECIES (PHOTO CARD GRID) ================= */}
      <section className="tsa_section tsa_section_soft" id="species">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Binoculars size={14} /> FEATURED ARCTIC SPECIES
            </div>
            <h2>The Wildlife You'll Encounter Most Often</h2>
            <p>From the world's largest land predator to playful haul-out colonies, these species define a Svalbard expedition.</p>
          </div>

          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.polarBear} alt="Polar bear walking across Svalbard sea ice" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Snowflake size={14} /> Apex Predator</div>
                <h4>Polar Bears</h4>
                <p>The undisputed icon of Svalbard — the world's largest land predator, best viewed from expedition ships near sea ice.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Best viewed from expedition ships</span>
                  <span><Check size={16} /> Seen near sea ice</span>
                  <span><Check size={16} /> Outstanding photography opportunities</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.walrus} alt="Walrus haul-out colony on a Svalbard beach" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Anchor size={14} /> Coastal Colonies</div>
                <h4>Walruses</h4>
                <p>Among Svalbard's most entertaining animals, known for massive tusks and social haul-out behavior.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Large haul-out colonies</span>
                  <span><Check size={16} /> Excellent Zodiac viewing</span>
                  <span><Check size={16} /> Best chances in summer</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.whale} alt="Beluga whales swimming in Svalbard waters" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Waves size={14} /> Marine Giants</div>
                <h4>Whales</h4>
                <p>Beluga, minke, blue, fin, and humpback whales migrate through Svalbard's waters each summer.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Multiple species each summer</span>
                  <span><Check size={16} /> Seen during scenic cruising</span>
                  <span><Check size={16} /> Frequent between landing sites</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.arcticFox} alt="Arctic fox on the Svalbard tundra" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Compass size={14} /> Year-Round Residents</div>
                <h4>Arctic Foxes</h4>
                <p>Adaptable predators active year-round, commonly seen near bird cliffs and tundra habitats.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Summer &amp; winter coats</span>
                  <span><Check size={16} /> Curious, active personalities</span>
                  <span><Check size={16} /> Excellent photography subjects</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tsa_chip_grid" style={{ marginTop: "1.5rem" }}>
            <div className="tsa_chip"><Check size={16} /> Svalbard Reindeer grazing the tundra</div>
            <div className="tsa_chip"><Check size={16} /> Ringed &amp; bearded seals</div>
            <div className="tsa_chip"><Check size={16} /> Puffins &amp; little auks</div>
            <div className="tsa_chip"><Check size={16} /> Ivory gulls, kittiwakes &amp; fulmars</div>
            <div className="tsa_chip"><Check size={16} /> Arctic terns &amp; guillemots</div>
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED BANNER ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><Binoculars size={13} /> Wildlife Is Wild &amp; Unpredictable</span>
          <h2>Every Expedition Offers Something Different</h2>
          <p>From a polar bear walking across sea ice to a pod of beluga whales beside your ship, no two Svalbard voyages are ever quite the same.</p>
          <button className="tsa_btn_primary">Compare Svalbard Wildlife Expeditions <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= BEST TIME FOR WILDLIFE VIEWING — zigzag, image RIGHT / text LEFT ================= */}
      <section className="tsa_section" id="best-time">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Peak Season</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.bestTime} alt="Midnight Sun over Svalbard during peak wildlife season" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Clock size={14} /> BEST TIME FOR WILDLIFE VIEWING</div>
            <h2>June Through August Offers the Best Combination</h2>
            <p>
              These months provide the best combination of accessibility and wildlife activity, from polar
              bears and walruses to whales, bird colonies, and the Midnight Sun.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Polar bears &amp; walruses</div>
              <div className="tsa_chip"><Check size={16} /> Whales &amp; bird colonies</div>
              <div className="tsa_chip"><Check size={16} /> Midnight Sun</div>
              <div className="tsa_chip"><Check size={16} /> Glacier exploration</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO BANNER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Play size={14} /> SEE IT IN ACTION</div>
            <h2>Watch: Wildlife Encounters in Svalbard</h2>
            <p>A short look at polar bears, walruses, and whales encountered during Arctic expedition cruises.</p>
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
              title="Wildlife Encounters in Svalbard"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE PHOTOGRAPHY TIPS (ICON GRID) ================= */}
      <section className="tsa_section" id="photography">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Camera size={14} /> PHOTOGRAPHY TIPS</div>
            <h2>Wildlife Photography Tips</h2>
            <p>Photography is best during the Midnight Sun, when soft Arctic light lasts throughout the day.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Telephoto Lens</h4>
              <p>A 300–600mm telephoto lens is ideal for capturing distant wildlife safely.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Binoculars size={20} /></div>
              <h4>Binoculars</h4>
              <p>Essential for spotting polar bears, whales, and seabirds before they're within camera range.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Waterproof Camera Bag</h4>
              <p>Protects your gear from sea spray during Zodiac cruises and shore landings.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sun size={20} /></div>
              <h4>Midnight Sun Lighting</h4>
              <p>Soft, extended daylight throughout the summer creates exceptional photography conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DUO GRID — land vs marine wildlife ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Compass size={14} /> TWO WORLDS OF WILDLIFE</div>
            <h2>Land Predators vs. Marine Giants</h2>
            <p>Svalbard's wildlife spans both the tundra and the sea — each offering a completely different kind of encounter.</p>
          </div>
          <div className="tsa_duo_grid">
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">On Land</span>
              <img src={IMG.duoLand} alt="Polar bear and Arctic fox on Svalbard's tundra" />
              <div className="tsa_duo_overlay">
                <h4>Land &amp; Tundra Wildlife</h4>
                <p>Polar bears, Arctic foxes, and Svalbard reindeer roam the archipelago's coastlines and tundra.</p>
              </div>
            </div>
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">At Sea</span>
              <img src={IMG.duoMarine} alt="Walruses and whales in Svalbard's coastal waters" />
              <div className="tsa_duo_overlay">
                <h4>Marine &amp; Coastal Wildlife</h4>
                <p>Walruses, seals, and multiple whale species make Svalbard's waters equally extraordinary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESPONSIBLE VIEWING & SAFETY (SPLIT LAYOUT + PHOTOS) ================= */}
      <section className="tsa_section" id="safety">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Responsible Viewing &amp; Safety</h2>
            <p>Leading expedition operators follow strict guidelines to protect wildlife and keep guests safe.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><ShieldCheck size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Safe Viewing Distances</div>
                  <h4>Minimizing Disturbance</h4>
                  <p>Expedition teams maintain safe distances and avoid feeding or interfering with wildlife.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Users size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Small-Group Landings</div>
                  <h4>Controlled Zodiac Operations</h4>
                  <p>Small landing groups and controlled excursions protect both guests and wildlife.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Compass size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Guided Excursions</div>
                  <h4>Safety Briefings &amp; Landing Protocols</h4>
                  <p>Guests receive safety briefings and follow strict landing protocols on every excursion.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Sparkles size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Environmental Education</div>
                  <h4>Respect for Nesting Sites</h4>
                  <p>Environmental education and respect for nesting sites help preserve Svalbard's ecosystems.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src={IMG.safety1} alt="Expedition guide monitoring wildlife during a landing" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src={IMG.safety2} alt="Guests observing wildlife from a safe distance" />
              </div>
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
              "One of the greatest joys of visiting Svalbard is that every day brings the possibility of
              extraordinary wildlife encounters. From a polar bear walking across sea ice to a pod of beluga
              whales swimming beside your expedition ship, these moments are unforgettable. Choosing the
              right itinerary and season makes all the difference, and that's where our expertise helps our
              clients create truly remarkable Arctic adventures."
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

      {/* ================= WHICH WILDLIFE MATTERS MOST TO YOU (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Wildlife Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Polar Bears If You Want:</h4>
              <ul>
                <li><Check size={14} /> Sea ice &amp; coastal sightings</li>
                <li><Check size={14} /> Expert-led wildlife spotting</li>
                <li><Check size={14} /> A once-in-a-lifetime encounter</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Whales If You Want:</h4>
              <ul>
                <li><Check size={14} /> Beluga &amp; minke whale sightings</li>
                <li><Check size={14} /> Scenic cruising between landings</li>
                <li><Check size={14} /> Occasional blue &amp; humpback whales</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Seabirds If You Want:</h4>
              <ul>
                <li><Check size={14} /> Towering bird cliff spectacles</li>
                <li><Check size={14} /> Puffins &amp; little auks</li>
                <li><Check size={14} /> Ivory gulls &amp; kittiwakes</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Land Mammals If You Want:</h4>
              <ul>
                <li><Check size={14} /> Arctic foxes near bird colonies</li>
                <li><Check size={14} /> Svalbard reindeer on the tundra</li>
                <li><Check size={14} /> Easy, frequent sightings</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Marine Mammals If You Want:</h4>
              <ul>
                <li><Check size={14} /> Walrus haul-out colonies</li>
                <li><Check size={14} /> Ringed &amp; bearded seals</li>
                <li><Check size={14} /> Excellent Zodiac viewing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book with Trips &amp; Ships Luxury Travel?</h2>
            <p>We'll help you experience the very best of Arctic wildlife.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Clock size={20} /></div>
              <h4>Choose the Best Wildlife Season</h4>
              <p>We match your travel dates to the wildlife you most want to see.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Select the Ideal Itinerary</h4>
              <p>Firsthand knowledge of expedition ships and their wildlife-focused routes.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Prepare You for Arctic Travel</h4>
              <p>Packing guidance and travel protection recommendations suited to remote Arctic wildlife travel.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Personalize Every Detail</h4>
              <p>From flights and hotels to cabin selection, planned around your wildlife priorities.</p>
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
            <p>More guides to help you plan the right Svalbard departure.</p>
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
                What animals live in Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Polar bears, walruses, whales, Arctic foxes, Svalbard reindeer, seals, and numerous seabirds.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What is the best time for wildlife viewing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>June through August offers the best overall wildlife opportunities.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Can I see polar bears? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Svalbard is one of the world's premier destinations for wild polar bear viewing.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Are whale sightings common? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Several whale species visit Svalbard during the summer months.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Can I see walruses? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Walrus haul-out colonies are a highlight of many expedition cruises.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are Arctic foxes easy to spot? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>They are regularly seen during summer expeditions, especially near bird colonies.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What birds can I see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Puffins, little auks, ivory gulls, kittiwakes, fulmars, Arctic terns, and guillemots.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is wildlife viewing safe? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Guided expeditions follow strict safety procedures and responsible wildlife viewing practices.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Do cruises include wildlife experts? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Expedition teams include naturalists, marine biologists, ornithologists, and wildlife specialists.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are wildlife sightings guaranteed? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>No. Wildlife is completely wild, so sightings can never be guaranteed.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Is Svalbard good for wildlife photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Absolutely. It is considered one of the world's finest Arctic wildlife photography destinations.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I visit independently? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most wildlife experiences are safest and most rewarding through guided expedition cruises.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Does wildlife viewing harm animals? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Responsible expedition operators follow strict environmental guidelines to minimize disturbance.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                What should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Warm layered clothing, binoculars, a telephoto camera lens, waterproof gear, and sturdy footwear.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Our specialists help you choose the best season, expedition cruise, and itinerary to maximize wildlife viewing while providing expert guidance throughout your journey.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience Svalbard Wildlife?</h2>
          <p>
            From majestic polar bears and playful walruses to whales, Arctic foxes, and millions of nesting
            seabirds, Svalbard offers one of the world's most extraordinary wildlife experiences. Let our
            specialists help you plan the perfect Arctic expedition.
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