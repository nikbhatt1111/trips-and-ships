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
  Backpack,
  Shirt,
  Layers,
  Snowflake,
  ThermometerSun,
  Camera,
  Binoculars,
  Battery,
  Luggage,
  CloudRain,
  Wind,
  Play,
} from "lucide-react";

/**
 * Svalbard Packing Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * Combines the packing-guide layering photo grid (see
 * AntarcticaPackingGuide.jsx) with the fuller SEO/interlinking
 * scaffolding from BespokeAntarcticaTripPlanning.jsx: canonical +
 * OG/Twitter tags, breadcrumb, jump-link table of contents, zigzag
 * media rows, ring stats, a full-bleed banner, a video banner, a
 * duo grid, and a "Read Next" internal linking grid. HowTo +
 * ItemList + FAQ + Breadcrumb JSON-LD included per the source brief.
 *
 * Image paths follow /assets/Svalbard_Packing_Guide_[N].jpg —
 * swap in real production photography/video.
 */

const SITE_URL = "https://www.tripsandships.com";
const PAGE_PATH = "/svalbard-packing-guide";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/svalbard-packing-guide-og.jpg`;

const TOC_ITEMS = [
  { id: "climate", label: "Understanding the Arctic Climate" },
  { id: "layering", label: "The Layering System" },
  { id: "footwear", label: "Footwear & Accessories" },
  { id: "gear", label: "Camera, Binoculars & Day Pack" },
  { id: "checklist", label: "Provided vs. Bring Yourself" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const RELATED_PAGES = [
  { tag: "Wildlife", title: "Svalbard Wildlife Guide", desc: "Polar bears, walruses, whales, and Arctic foxes by species.", href: "/svalbard-wildlife" },
  { tag: "Timing", title: "Best Time to Visit Svalbard", desc: "When to sail for wildlife, ice, and the Midnight Sun.", href: "/best-time-to-visit-svalbard" },
  { tag: "Answers", title: "Svalbard Cruise FAQ", desc: "Every common question about booking and sailing to Svalbard.", href: "/svalbard-cruise-faq" },
  { tag: "Compare", title: "HX Svalbard Cruises", desc: "See the ships and itineraries sailing the Arctic archipelago.", href: "/hx-svalbard-cruises" },
];

const IMG = {
  hero1: "/assets/Svalbard_Packing_Guide_1.jpg",
  climate: "/assets/Svalbard_Packing_Guide_2.jpg",
  layer1: "/assets/Svalbard_Packing_Guide_3.jpg",
  layer2: "/assets/Svalbard_Packing_Guide_4.jpg",
  layer3: "/assets/Svalbard_Packing_Guide_5.jpg",
  layer4: "/assets/Svalbard_Packing_Guide_6.jpg",
  footwearApproach: "/assets/Svalbard_Packing_Guide_7.jpg",
  bannerFull: "/assets/Svalbard_Packing_Guide_8.jpg",
  daypackBack: "/assets/Svalbard_Packing_Guide_9.jpg",
  daypackFront: "/assets/Svalbard_Packing_Guide_10.jpg",
  videoBanner: "/assets/Svalbard_Packing_Guide_11.jpg",
  duo1: "/assets/Svalbard_Packing_Guide_12.jpg",
  duo2: "/assets/Svalbard_Packing_Guide_13.jpg",
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
      "description":"Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with over 40 years of luxury travel experience."
    },
    {
      "@type":"WebPage",
      "@id":"${PAGE_URL}",
      "url":"${PAGE_URL}",
      "name":"Svalbard Packing Guide",
      "headline":"Svalbard Packing Guide | What to Pack for an Arctic Expedition",
      "description":"Learn exactly what to pack for Svalbard, including clothing, footwear, photography gear, accessories, and Arctic travel essentials.",
      "about":{
        "@type":"Place",
        "name":"Svalbard",
        "address":{ "@type":"PostalAddress", "addressCountry":"Norway" }
      },
      "isPartOf":{ "@id":"${SITE_URL}/#organization" },
      "primaryImageOfPage":"${OG_IMAGE}",
      "breadcrumb":{ "@id":"${PAGE_URL}#breadcrumb" }
    },
    {
      "@type":"BreadcrumbList",
      "@id":"${PAGE_URL}#breadcrumb",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"${SITE_URL}" },
        { "@type":"ListItem", "position":2, "name":"Arctic Cruises", "item":"${SITE_URL}/arctic-cruises" },
        { "@type":"ListItem", "position":3, "name":"Svalbard Packing Guide", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"HowTo",
      "@id":"${PAGE_URL}#howto",
      "name":"How to Pack for a Svalbard Expedition",
      "description":"A step-by-step guide to packing for an Arctic expedition cruise in Svalbard.",
      "step":[
        { "@type":"HowToStep", "position":1, "name":"Pack thermal base layers", "text":"Bring moisture-wicking thermal tops and bottoms to provide warmth and comfort." },
        { "@type":"HowToStep", "position":2, "name":"Add insulating mid-layers", "text":"Pack fleece or insulated jackets to retain body heat." },
        { "@type":"HowToStep", "position":3, "name":"Bring waterproof outerwear", "text":"A waterproof jacket and trousers protect against rain, snow, and sea spray." },
        { "@type":"HowToStep", "position":4, "name":"Pack proper footwear", "text":"Bring waterproof hiking boots and warm wool socks for shore excursions." },
        { "@type":"HowToStep", "position":5, "name":"Prepare for wildlife viewing", "text":"Pack binoculars, a telephoto camera lens, spare batteries, and memory cards." },
        { "@type":"HowToStep", "position":6, "name":"Pack essential accessories", "text":"Include gloves, a warm hat, sunglasses, sunscreen, medications, and a waterproof daypack." }
      ]
    },
    {
      "@type":"ItemList",
      "@id":"${PAGE_URL}#packinglist",
      "name":"Essential Svalbard Packing Checklist",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Waterproof Jacket" },
        { "@type":"ListItem", "position":2, "name":"Waterproof Pants" },
        { "@type":"ListItem", "position":3, "name":"Thermal Base Layers" },
        { "@type":"ListItem", "position":4, "name":"Insulated Mid Layer" },
        { "@type":"ListItem", "position":5, "name":"Waterproof Hiking Boots" },
        { "@type":"ListItem", "position":6, "name":"Warm Hat" },
        { "@type":"ListItem", "position":7, "name":"Waterproof Gloves" },
        { "@type":"ListItem", "position":8, "name":"Wool Socks" },
        { "@type":"ListItem", "position":9, "name":"Binoculars" },
        { "@type":"ListItem", "position":10, "name":"Camera with Telephoto Lens" },
        { "@type":"ListItem", "position":11, "name":"Waterproof Daypack" },
        { "@type":"ListItem", "position":12, "name":"Power Bank" }
      ]
    },
    {
      "@type":"FAQPage",
      "@id":"${PAGE_URL}#faq",
      "mainEntity":[
        { "@type":"Question", "name":"What clothes should I pack for Svalbard?", "acceptedAnswer":{ "@type":"Answer", "text":"Layered clothing, waterproof outerwear, thermal base layers, and insulated mid-layers are recommended." } },
        { "@type":"Question", "name":"Is Svalbard extremely cold in summer?", "acceptedAnswer":{ "@type":"Answer", "text":"No. Summer temperatures generally range from 2°C to 8°C, although wind and rain can make it feel colder." } },
        { "@type":"Question", "name":"Do I need waterproof clothing?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Waterproof jackets and trousers are strongly recommended." } },
        { "@type":"Question", "name":"Are waterproof boots provided?", "acceptedAnswer":{ "@type":"Answer", "text":"Many expedition cruise operators provide waterproof boots for shore landings, though availability varies by itinerary." } },
        { "@type":"Question", "name":"Should I bring binoculars?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Binoculars greatly enhance wildlife viewing, especially for spotting polar bears, whales, and seabirds." } },
        { "@type":"Question", "name":"What camera lens is best?", "acceptedAnswer":{ "@type":"Answer", "text":"A telephoto lens between 300mm and 600mm is ideal for Arctic wildlife photography." } },
        { "@type":"Question", "name":"Should I bring hiking boots?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Waterproof hiking boots are recommended for shore excursions and hiking." } },
        { "@type":"Question", "name":"Can I wear jeans?", "acceptedAnswer":{ "@type":"Answer", "text":"Jeans are not recommended for outdoor activities because they absorb moisture and provide little insulation." } },
        { "@type":"Question", "name":"Is formal clothing required onboard?", "acceptedAnswer":{ "@type":"Answer", "text":"No. Expedition cruises have a relaxed and casual dress code." } },
        { "@type":"Question", "name":"Should I pack sunscreen?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. UV exposure can be surprisingly strong due to reflections from snow and ice." } },
        { "@type":"Question", "name":"What luggage should I bring?", "acceptedAnswer":{ "@type":"Answer", "text":"A lightweight suitcase or duffel bag along with a waterproof daypack is recommended." } },
        { "@type":"Question", "name":"Are trekking poles necessary?", "acceptedAnswer":{ "@type":"Answer", "text":"Some itineraries provide trekking poles, but bringing your own may offer additional comfort." } },
        { "@type":"Question", "name":"Can I wash clothes onboard?", "acceptedAnswer":{ "@type":"Answer", "text":"Many expedition ships offer laundry services or self-service laundry facilities." } },
        { "@type":"Question", "name":"Should I pack medications?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Bring all prescription medications along with motion sickness remedies if needed." } },
        { "@type":"Question", "name":"Why book through Trips & Ships Luxury Travel?", "acceptedAnswer":{ "@type":"Answer", "text":"Our specialists help you prepare every aspect of your expedition, including packing advice, itinerary selection, and personalized travel planning." } }
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

export default function SvalbardPackingGuide() {
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
      ["description", "Discover exactly what to pack for Svalbard, including clothing, footwear, camera gear, accessories, and Arctic travel essentials."],
      ["og:title", "Svalbard Packing Guide | Trips & Ships"],
      ["og:description", "Everything you need to pack for an unforgettable Arctic expedition — layering system, footwear, camera gear, and more."],
      ["og:type", "article"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Svalbard Packing Guide | Trips & Ships"],
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
            <Backpack size={14} /> ARCTIC EXPEDITION GUIDE
          </div>
          <h1>Svalbard Packing Guide</h1>
          <p>
            Everything you need to pack for an unforgettable Arctic expedition. Weather conditions can
            change rapidly, temperatures remain cool even during summer, and expedition activities often
            involve Zodiac landings, glacier walks, and wildlife viewing — fortunately, modern expedition
            cruises provide many essentials, so packing smart matters more than packing heavy.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Svalbard Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Arctic Travel Specialist</button>
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
          <span className="tsa_breadcrumb_current">Svalbard Packing Guide</span>
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

      {/* ================= PACKING CHECKLIST AT A GLANCE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Should You Pack for Svalbard?</h2>
            <p>
              The key to packing for Svalbard is dressing in layers. Even during summer, temperatures
              typically range between 2°C and 8°C (36°F–46°F), with wind, rain, and occasional snow
              possible. Many expedition cruise operators also provide items such as waterproof boots and
              expedition jackets on selected voyages.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Recommended</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Waterproof Jacket</td><td>Essential</td></tr>
                <tr><td>Waterproof Pants</td><td>Recommended</td></tr>
                <tr><td>Insulated Mid Layer</td><td>Essential</td></tr>
                <tr><td>Thermal Base Layers</td><td>Essential</td></tr>
                <tr><td>Warm Hat</td><td>Essential</td></tr>
                <tr><td>Gloves</td><td>Essential</td></tr>
                <tr><td>Neck Gaiter / Buff</td><td>Recommended</td></tr>
                <tr><td>Waterproof Hiking Boots</td><td>Essential</td></tr>
                <tr><td>Wool Socks</td><td>Essential</td></tr>
                <tr><td>Sunglasses</td><td>Essential</td></tr>
                <tr><td>Sunscreen</td><td>Essential</td></tr>
                <tr><td>Camera</td><td>Recommended</td></tr>
                <tr><td>Binoculars</td><td>Highly Recommended</td></tr>
                <tr><td>Small Backpack</td><td>Recommended</td></tr>
                <tr><td>Power Bank</td><td>Recommended</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= UNDERSTANDING THE ARCTIC CLIMATE — zigzag, image LEFT / text RIGHT ================= */}
      <section className="tsa_section tsa_section_soft" id="climate">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Arctic Weather</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.climate} alt="Changing weather over Svalbard's fjords and glaciers" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><CloudRain size={14} /> UNDERSTANDING THE ARCTIC CLIMATE</div>
            <h2>Svalbard's Weather Is Highly Variable</h2>
            <p>
              Cool temperatures, strong winds, rain showers, occasional snowfall, bright sunshine, and
              glacier breezes can all occur within a single expedition day. Layering is the best strategy
              for staying comfortable as conditions shift.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><ThermometerSun size={15} /></span> 2°C–8°C typical summer range</li>
              <li><span className="tsa_zz_list_icon"><Wind size={15} /></span> Wind and glacier breezes intensify the chill</li>
              <li><span className="tsa_zz_list_icon"><CloudRain size={15} /></span> Rain and occasional snow, even in July</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= RING STATS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Svalbard Climate, By the Numbers</h2>
            <p>What to expect on a typical summer expedition.</p>
          </div>
          <div className="tsa_ring_stat_row">
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 45 }}>
                <div className="tsa_ring_stat_inner">2–8°C</div>
              </div>
              <div className="tsa_ring_stat_label">Typical summer temperature range</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 100 }}>
                <div className="tsa_ring_stat_inner">3</div>
              </div>
              <div className="tsa_ring_stat_label">Layers you need: base, mid &amp; waterproof outer</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 70 }}>
                <div className="tsa_ring_stat_inner">24hr</div>
              </div>
              <div className="tsa_ring_stat_label">Midnight Sun daylight during peak season</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 60 }}>
                <div className="tsa_ring_stat_inner">1 bag</div>
              </div>
              <div className="tsa_ring_stat_label">Checked suitcase most travelers need, plus a daypack</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE LAYERING SYSTEM (PHOTO CARD GRID) ================= */}
      <section className="tsa_section tsa_section_soft" id="layering">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Layers size={14} /> THE LAYERING SYSTEM
            </div>
            <h2>Dress in Layers, Not One Heavy Coat</h2>
            <p>
              Pack clothing that can be layered throughout the day. Choose breathable technical fabrics
              instead of cotton whenever possible — many expedition cruise operators also provide an
              expedition jacket, so you only need to bring the right layers underneath.
            </p>
          </div>

          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.layer1} alt="Thermal base layer clothing for Svalbard" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Shirt size={14} /> Layer 1</div>
                <h4>Thermal Base Layers</h4>
                <p>Moisture-wicking thermal tops and leggings that sit against the skin and keep you warm and dry.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Thermal tops &amp; leggings</span>
                  <span><Check size={16} /> Breathable technical fabric</span>
                  <span><X size={16} /> Avoid cotton clothing</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.layer2} alt="Insulated fleece mid layer" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Snowflake size={14} /> Layer 2</div>
                <h4>Insulated Mid Layer</h4>
                <p>An insulated fleece or down/synthetic jacket traps body heat while remaining breathable.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Insulated fleece</span>
                  <span><Check size={16} /> Down or synthetic jacket</span>
                  <span><Check size={16} /> Easy to remove indoors</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.layer3} alt="Waterproof shell jacket and trousers" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Compass size={14} /> Layer 3</div>
                <h4>Waterproof Outer Layer</h4>
                <p>A waterproof shell jacket and trousers protect against rain, snow, and sea spray during landings.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Waterproof shell jacket</span>
                  <span><Check size={16} /> Waterproof trousers</span>
                  <span><Check size={16} /> Essential for Zodiac cruises</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.layer4} alt="Expedition boots and accessories provided by cruise line" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Backpack size={14} /> Usually Included</div>
                <h4>What Your Cruise May Provide</h4>
                <p>Depending on the operator and itinerary, you may receive loaner boots, a jacket, and walking poles.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Waterproof expedition boots (loan)</span>
                  <span><Check size={16} /> Expedition jacket</span>
                  <span><Check size={16} /> Walking poles (selected itineraries)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED BANNER ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><ShieldCheck size={13} /> Pack Smart, Not Heavy</span>
          <h2>Comfort and Practicality Beat Fashion</h2>
          <p>Well-prepared travelers enjoy greater comfort, better wildlife viewing, and less stress — leaving more attention for the Arctic scenery itself.</p>
          <button className="tsa_btn_primary">Download Your Packing Checklist <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= FOOTWEAR & ACCESSORIES — zigzag, image RIGHT / text LEFT ================= */}
      <section className="tsa_section" id="footwear">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Footwear &amp; Accessories</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.footwearApproach} alt="Waterproof hiking boots and cold-weather accessories laid out" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Snowflake size={14} /> FOOTWEAR &amp; COLD WEATHER ACCESSORIES</div>
            <h2>Good Footwear Is Essential</h2>
            <p>
              Many expedition cruises provide waterproof boots for shore landings, but comfortable walking
              shoes, wool socks, and a few small accessories make every excursion noticeably more
              comfortable.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Waterproof hiking boots</div>
              <div className="tsa_chip"><Check size={16} /> Wool socks &amp; extra pairs</div>
              <div className="tsa_chip"><Check size={16} /> Warm knit hat</div>
              <div className="tsa_chip"><Check size={16} /> Waterproof &amp; liner gloves</div>
              <div className="tsa_chip"><Check size={16} /> Neck gaiter or buff</div>
              <div className="tsa_chip"><Check size={16} /> Lightweight slippers onboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAMERA & PHOTOGRAPHY EQUIPMENT (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft" id="gear">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Camera size={14} /> PHOTOGRAPHY EQUIPMENT</div>
            <h2>Camera &amp; Photography Gear</h2>
            <p>Svalbard is one of the world's finest wildlife photography destinations. Cold temperatures reduce battery life, so carry spares.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Camera Body</h4>
              <p>A DSLR or mirrorless camera with a telephoto lens (300–600mm) and a wide-angle lens.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Battery size={20} /></div>
              <h4>Spare Batteries</h4>
              <p>Cold temperatures drain batteries quickly — pack extras and keep them close to your body.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Protection</h4>
              <p>A waterproof camera bag and lens cleaning cloth guard against sea spray and snow.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Binoculars size={20} /></div>
              <h4>Binoculars</h4>
              <p>Essential for spotting polar bears, walruses, whales, Arctic foxes, and seabirds at a distance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DAY PACK (SPLIT LAYOUT + PHOTOS) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Goes in Your Day Pack</h2>
            <p>A small waterproof backpack keeps every excursion essential within reach.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Compass size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Zodiac Cruises</div>
                  <h4>Spray-Heavy Excursions</h4>
                  <p>Waterproof gloves, camera in a dry bag, sunglasses, and a warm hat.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Snowflake size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Shore Landings</div>
                  <h4>On the Arctic Tundra</h4>
                  <p>Waterproof boots, extra gloves, and layered clothing for changing conditions.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Binoculars size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Wildlife Watching</div>
                  <h4>Ready for Any Sighting</h4>
                  <p>Binoculars, spare camera batteries, and memory cards within easy reach.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Luggage size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Daypack Essentials</div>
                  <h4>Always Include</h4>
                  <p>Water bottle, snacks, sunscreen, and a compact waterproof layer.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src={IMG.daypackBack} alt="Waterproof daypack packed for a Zodiac excursion" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src={IMG.daypackFront} alt="Binoculars and camera gear ready for wildlife viewing" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO BANNER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Play size={14} /> SEE IT IN ACTION</div>
            <h2>Watch: Packing for an Arctic Expedition</h2>
            <p>A quick walkthrough of the layering system and gear our travelers rely on in Svalbard.</p>
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
              title="Packing for a Svalbard Arctic Expedition"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ================= DUO GRID — two packing mindsets ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Layers size={14} /> TWO WAYS TO PACK</div>
            <h2>Minimalist vs. Fully Equipped</h2>
            <p>Both approaches work well in Svalbard — the right one depends on how you plan to spend your days.</p>
          </div>
          <div className="tsa_duo_grid">
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Minimalist</span>
              <img src={IMG.duo1} alt="Minimalist packing layout for Svalbard" />
              <div className="tsa_duo_overlay">
                <h4>Pack Light</h4>
                <p>Rely on the cruise's provided parka and boots, and travel with a single carry-on and daypack.</p>
              </div>
            </div>
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Fully Equipped</span>
              <img src={IMG.duo2} alt="Fully equipped photography and gear layout for Svalbard" />
              <div className="tsa_duo_overlay">
                <h4>Bring Your Own Gear</h4>
                <p>Ideal for serious photographers who want their own lenses, boots, and cold-weather layers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROVIDED VS BRING YOURSELF ================= */}
      <section className="tsa_section tsa_section_soft" id="checklist">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Your Expedition Cruise May Provide</h2>
            <p>Always confirm specific inclusions before departure — policies vary by operator and itinerary.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Often Provided by Cruise Line</th>
                  <th>You Should Bring</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Outerwear</td><td>Expedition jacket (selected voyages)</td><td>Waterproof trousers, insulated mid layer</td></tr>
                <tr><td>Footwear</td><td>Waterproof expedition boots (loan)</td><td>Wool socks, comfortable onboard shoes</td></tr>
                <tr><td>Hiking Support</td><td>Walking poles (selected itineraries)</td><td>Your own poles for extra comfort</td></tr>
                <tr><td>Safety Gear</td><td>Life jackets &amp; Zodiac safety equipment</td><td>Thin liner gloves, neck gaiter</td></tr>
                <tr><td>Amenities</td><td>Educational materials, laundry (varies)</td><td>Personal toiletries, medications</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= PACKING TIPS (CHOOSE GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Packing Tips From Our Specialists</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Dress in Layers</h4>
              <ul>
                <li><Check size={14} /> Base, mid &amp; waterproof outer</li>
                <li><Check size={14} /> Adjust throughout the day</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Waterproof Fabrics</h4>
              <ul>
                <li><Check size={14} /> Avoid cotton entirely</li>
                <li><Check size={14} /> Technical, breathable materials</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Pack Light</h4>
              <ul>
                <li><Check size={14} /> Use packing cubes</li>
                <li><Check size={14} /> Leave room for souvenirs</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Keep Essentials Accessible</h4>
              <ul>
                <li><Check size={14} /> Camera gear within reach</li>
                <li><Check size={14} /> Medications in hand luggage</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Electronics</h4>
              <ul>
                <li><Check size={14} /> Universal travel adapter</li>
                <li><Check size={14} /> Power bank &amp; USB cables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT NOT TO PACK ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Pack This, Leave This at Home</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Pack This</h3>
              <ul>
                <li><Check size={14} /> Thermal base layers</li>
                <li><Check size={14} /> Waterproof jacket &amp; trousers</li>
                <li><Check size={14} /> Wool socks &amp; liner gloves</li>
                <li><Check size={14} /> Binoculars &amp; telephoto lens</li>
                <li><Check size={14} /> Sunscreen &amp; sunglasses</li>
                <li><Check size={14} /> Motion sickness medication</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>Leave This at Home</h3>
              <ul>
                <li><X size={14} /> Heavy suitcases</li>
                <li><X size={14} /> Formal evening wear &amp; high heels</li>
                <li><X size={14} /> Umbrellas</li>
                <li><X size={14} /> Excess clothing</li>
                <li><X size={14} /> Hair dryers (often provided)</li>
                <li><X size={14} /> Large amounts of cash</li>
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
              "One of the biggest surprises for first-time visitors is that Svalbard isn't about extreme
              cold — it's about changing conditions. Layering is the secret. With the right clothing and a
              few carefully chosen accessories, you'll stay comfortable whether you're photographing polar
              bears, cruising past glaciers, or enjoying a Zodiac landing. We provide every client with
              destination-specific packing guidance before departure."
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
            <p>Our Arctic specialists help you prepare every detail before you ever step onboard.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Backpack size={20} /></div>
              <h4>Prepare Your Packing List</h4>
              <p>Destination-specific guidance tailored to your itinerary and cabin category.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Choose the Right Expedition</h4>
              <p>We help you understand exactly what each cruise line includes.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Arrange Travel Insurance</h4>
              <p>Coverage recommendations suited to remote Arctic travel.</p>
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
                What clothes should I pack for Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Layered clothing, waterproof outerwear, thermal base layers, and insulated mid-layers are recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Is Svalbard extremely cold in summer? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Not usually. Summer temperatures typically range from 2°C to 8°C, but wind and rain can make it feel colder.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Do I need waterproof clothing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Waterproof jackets and trousers are strongly recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Are waterproof boots provided? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Many expedition cruise operators provide waterproof boots for shore landings, though policies vary by itinerary.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Should I bring binoculars? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Binoculars greatly improve wildlife viewing, especially for spotting polar bears, whales, and seabirds.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                What camera lens is best? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>A telephoto lens between 300mm and 600mm is ideal for wildlife photography.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Should I bring hiking boots? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Waterproof hiking boots are recommended for walking and excursions.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can I wear jeans? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Jeans are not ideal outdoors because they absorb moisture and provide little insulation. Technical outdoor clothing is a better choice.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Is formal clothing required onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>No. Expedition cruises have a relaxed dress code.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Should I pack sunscreen? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. UV exposure can be strong due to snow, ice, and long daylight hours.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What luggage should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>A lightweight suitcase or duffel bag and a small waterproof daypack are recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Are trekking poles necessary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Some itineraries provide them, but personal poles may be useful for additional support.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Can I wash clothes onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Some expedition ships offer laundry services or self-service laundry facilities.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Should I pack medications? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Bring all prescription medications, along with motion sickness remedies if needed.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Our specialists help you prepare every aspect of your expedition, including packing advice, itinerary selection, and personalized travel planning.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready for Your Svalbard Expedition?</h2>
          <p>
            With the right clothing and equipment, you'll be prepared to enjoy every wildlife encounter,
            glacier cruise, and Arctic landscape in complete comfort. Let our experts help you plan your
            expedition and travel with confidence.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Download Your Packing Checklist</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}