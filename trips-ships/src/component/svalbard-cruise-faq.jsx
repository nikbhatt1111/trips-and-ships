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
  UtensilsCrossed,
  Wifi,
  Ship,
  HelpCircle,
  Play,
} from "lucide-react";

/**
 * Svalbard Cruise FAQ — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * Built on the same enriched SEO/interlinking template used for
 * SvalbardPackingGuide.jsx / BespokeAntarcticaTripPlanning.jsx:
 * canonical + OG/Twitter tags, breadcrumb, jump-link table of
 * contents, zigzag media rows, ring stats, a full-bleed banner, a
 * video banner, and a "Read Next" internal linking grid — all built
 * around the FAQ topics (Before You Book, Life Onboard, Wildlife,
 * Activities, Weather, Choosing a Cruise) before the full 15-question
 * FAQ accordion. FAQPage + Breadcrumb JSON-LD included per the brief.
 *
 * Image paths follow /assets/Svalbard_Cruise_FAQ_[N].jpg — swap in
 * real production photography/video.
 */

const SITE_URL = "https://www.tripsandships.com";
const PAGE_PATH = "/svalbard-cruise-faq";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/svalbard-cruise-faq-og.jpg`;

const TOC_ITEMS = [
  { id: "glance", label: "FAQ at a Glance" },
  { id: "before-you-book", label: "Before You Book" },
  { id: "onboard", label: "Life Onboard" },
  { id: "wildlife", label: "Wildlife Expectations" },
  { id: "activities", label: "Expedition Activities" },
  { id: "weather", label: "Weather & Climate" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const RELATED_PAGES = [
  { tag: "Wildlife", title: "Svalbard Wildlife Guide", desc: "Polar bears, walruses, whales, and Arctic foxes by species.", href: "/svalbard-wildlife" },
  { tag: "Prepare", title: "Svalbard Packing Guide", desc: "The layering system, footwear, and camera gear to bring.", href: "/svalbard-packing-guide" },
  { tag: "Timing", title: "Best Time to Visit Svalbard", desc: "When to sail for wildlife, ice, and the Midnight Sun.", href: "/best-time-to-visit-svalbard" },
  { tag: "Compare", title: "HX Svalbard Cruises", desc: "See the ships and itineraries sailing the Arctic archipelago.", href: "/hx-svalbard-cruises" },
];

const IMG = {
  beforeYouBook: "/assets/Svalbard_Cruise_FAQ_1.jpg",
  onboard1: "/assets/Svalbard_Cruise_FAQ_2.jpg",
  onboard2: "/assets/Svalbard_Cruise_FAQ_3.jpg",
  wildlife: "/assets/Svalbard_Cruise_FAQ_4.jpg",
  bannerFull: "/assets/Svalbard_Cruise_FAQ_5.jpg",
  weather: "/assets/Svalbard_Cruise_FAQ_6.jpg",
  videoBanner: "/assets/Svalbard_Cruise_FAQ_7.jpg",
  activities1: "/assets/Svalbard_Cruise_FAQ_8.jpg",
  activities2: "/assets/Svalbard_Cruise_FAQ_9.jpg",
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
      "name":"Svalbard Cruise FAQ",
      "headline":"Svalbard Cruise FAQ | Expert Answers to Your Arctic Cruise Questions",
      "description":"Get answers to the most common questions about Svalbard cruises, including the best time to visit, wildlife, polar bears, cabins, packing, weather, expedition ships, and travel planning from Arctic cruise experts.",
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
        { "@type":"ListItem", "position":3, "name":"Svalbard Cruise FAQ", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"FAQPage",
      "@id":"${PAGE_URL}#faq",
      "mainEntity":[
        { "@type":"Question", "name":"When is the best time to take a Svalbard cruise?", "acceptedAnswer":{ "@type":"Answer", "text":"Late May through early September is the expedition cruise season, with June through August offering the best wildlife viewing opportunities." } },
        { "@type":"Question", "name":"Can you see polar bears on a Svalbard cruise?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Svalbard is one of the world's best destinations for observing polar bears in the wild, although sightings can never be guaranteed." } },
        { "@type":"Question", "name":"How long are Svalbard cruises?", "acceptedAnswer":{ "@type":"Answer", "text":"Most Svalbard expedition cruises last between 7 and 14 days, depending on the itinerary and cruise line." } },
        { "@type":"Question", "name":"What wildlife can I expect to see?", "acceptedAnswer":{ "@type":"Answer", "text":"You may see polar bears, walruses, whales, Arctic foxes, reindeer, seals, puffins, and numerous seabirds." } },
        { "@type":"Question", "name":"Are Zodiac excursions included?", "acceptedAnswer":{ "@type":"Answer", "text":"Most expedition cruises include guided Zodiac cruises and shore landings as part of the itinerary." } },
        { "@type":"Question", "name":"Do I need previous expedition experience?", "acceptedAnswer":{ "@type":"Answer", "text":"No. Most Svalbard cruises are suitable for first-time expedition travelers." } },
        { "@type":"Question", "name":"What should I pack?", "acceptedAnswer":{ "@type":"Answer", "text":"Pack layered clothing, waterproof outerwear, hiking boots, gloves, a warm hat, binoculars, and camera equipment." } },
        { "@type":"Question", "name":"Is Wi-Fi available onboard?", "acceptedAnswer":{ "@type":"Answer", "text":"Many expedition ships offer Wi-Fi, although speed and availability vary depending on the ship's location." } },
        { "@type":"Question", "name":"Are meals included?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Most expedition cruises include breakfast, lunch, dinner, and beverages such as coffee and tea." } },
        { "@type":"Question", "name":"Is Svalbard safe?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Guided expeditions follow strict safety procedures, especially during shore excursions in polar bear habitat." } },
        { "@type":"Question", "name":"What is the weather like?", "acceptedAnswer":{ "@type":"Answer", "text":"Summer temperatures generally range from 2°C to 8°C with changing Arctic weather conditions." } },
        { "@type":"Question", "name":"Is travel insurance recommended?", "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Comprehensive travel insurance with expedition cruise coverage is strongly recommended." } },
        { "@type":"Question", "name":"Can children join Svalbard cruises?", "acceptedAnswer":{ "@type":"Answer", "text":"Some expedition cruise lines welcome families, while others have minimum age requirements." } },
        { "@type":"Question", "name":"Are wildlife sightings guaranteed?", "acceptedAnswer":{ "@type":"Answer", "text":"No. Wildlife is completely wild, so sightings always depend on nature and environmental conditions." } },
        { "@type":"Question", "name":"Why book through Trips & Ships Luxury Travel?", "acceptedAnswer":{ "@type":"Answer", "text":"Our experienced advisors help you compare cruise lines, choose the ideal itinerary and cabin, arrange travel logistics, and provide personalized support before, during, and after your expedition." } }
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

export default function SvalbardCruiseFAQ() {
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
      ["description", "Get answers to the most common questions about Svalbard cruises, including the best time to visit, wildlife, polar bears, cabins, packing, weather, expedition ships, and travel planning from Arctic cruise experts."],
      ["og:title", "Svalbard Cruise FAQ | Trips & Ships"],
      ["og:description", "Everything you need to know before booking a Svalbard expedition cruise — wildlife, weather, packing, cabins, and more."],
      ["og:type", "article"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Svalbard Cruise FAQ | Trips & Ships"],
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
            <HelpCircle size={14} /> ARCTIC EXPEDITION GUIDE
          </div>
          <h1>Svalbard Cruise FAQ</h1>
          <p>
            Everything you need to know before booking a Svalbard expedition cruise. From choosing the
            best time to visit and understanding wildlife encounters to knowing what to pack and what life
            onboard is like, this guide answers the questions travelers ask most often.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Svalbard Cruises <ArrowRight size={16} />
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
          <a href="/arctic-cruises">Arctic Cruises</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <span className="tsa_breadcrumb_current">Svalbard Cruise FAQ</span>
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

      {/* ================= QUICK ANSWER + FAQ AT A GLANCE TABLE ================= */}
      <section className="tsa_section" id="glance">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Should You Know Before Booking a Svalbard Cruise?</h2>
            <p>
              Svalbard expedition cruises typically operate between late May and early September, offering
              opportunities to see polar bears, walruses, whales, glaciers, and spectacular Arctic
              landscapes. Most cruises include expert expedition teams, Zodiac excursions, educational
              lectures, and guided shore landings.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Covered in This Guide</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Best Time to Visit</td><td>Yes</td></tr>
                <tr><td>Polar Bears</td><td>Yes</td></tr>
                <tr><td>Wildlife</td><td>Yes</td></tr>
                <tr><td>Weather</td><td>Yes</td></tr>
                <tr><td>Expedition Cruises</td><td>Yes</td></tr>
                <tr><td>Packing</td><td>Yes</td></tr>
                <tr><td>Cabins</td><td>Yes</td></tr>
                <tr><td>Dining</td><td>Yes</td></tr>
                <tr><td>Safety</td><td>Yes</td></tr>
                <tr><td>Photography</td><td>Yes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= BEFORE YOU BOOK — zigzag, image LEFT / text RIGHT ================= */}
      <section className="tsa_section tsa_section_soft" id="before-you-book">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Planning Ahead</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.beforeYouBook} alt="Planning a Svalbard expedition cruise itinerary" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Calendar size={14} /> BEFORE YOU BOOK</div>
            <h2>What to Think Through First</h2>
            <p>
              Planning ahead helps you get the most from your Arctic adventure. Our advisors help you
              tailor every detail — from travel season to cabin category — to your specific travel goals.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Calendar size={15} /></span> Best travel season &amp; cruise duration</li>
              <li><span className="tsa_zz_list_icon"><Compass size={15} /></span> Wildlife priorities &amp; cabin category</li>
              <li><span className="tsa_zz_list_icon"><ShieldCheck size={15} /></span> Budget, packing &amp; travel insurance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= LIFE ONBOARD (PHOTO GRID) ================= */}
      <section className="tsa_section" id="onboard">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Ship size={14} /> LIFE ONBOARD</div>
            <h2>What Life Onboard Is Actually Like</h2>
            <p>Modern expedition ships offer a comfortable yet adventurous experience, with friendly, knowledgeable crews throughout your voyage.</p>
          </div>
          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.onboard1} alt="Comfortable expedition ship cabin and lounge" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Ship size={14} /> Accommodations</div>
                <h4>Comfortable Cabins &amp; Lounges</h4>
                <p>Comfortable accommodations, observation lounges, and Science Centers on many ships.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.onboard2} alt="Fine dining aboard an expedition ship" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><UtensilsCrossed size={14} /> Dining</div>
                <h4>Excellent Onboard Dining</h4>
                <p>Most cruises include breakfast, lunch, dinner, and beverages such as coffee and tea.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.wildlife} alt="Expedition briefing before a Zodiac landing" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Users size={14} /> Daily Rhythm</div>
                <h4>Lectures &amp; Expedition Briefings</h4>
                <p>Daily lectures and expedition briefings from expert naturalists and historians.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.activities1} alt="Guest using onboard Wi-Fi in a lounge" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label"><Wifi size={14} /> Connectivity</div>
                <h4>Wi-Fi Onboard</h4>
                <p>Many expedition ships offer complimentary Wi-Fi, though speed and availability vary by operator.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED BANNER ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><Binoculars size={13} /> Wildlife Is Unpredictable</span>
          <h2>Every Expedition Is Genuinely Unique</h2>
          <p>Polar bears, walruses, whales, and millions of seabirds — wildlife sightings depend on nature, which is exactly what makes every voyage different.</p>
          <button className="tsa_btn_primary">Compare Svalbard Cruises <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= WILDLIFE EXPECTATIONS (CHIP GRID) ================= */}
      <section className="tsa_section" id="wildlife">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Binoculars size={14} /> WILDLIFE EXPECTATIONS
            </div>
            <h2>One of the World's Premier Wildlife Destinations</h2>
            <p>
              Svalbard is one of the world's premier wildlife destinations. Wildlife is unpredictable,
              which is exactly what makes every expedition unique — sightings can never be guaranteed, but
              opportunities are frequent throughout the summer season.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Polar bears</div>
              <div className="tsa_chip"><Check size={16} /> Walruses</div>
              <div className="tsa_chip"><Check size={16} /> Whales</div>
              <div className="tsa_chip"><Check size={16} /> Arctic foxes</div>
              <div className="tsa_chip"><Check size={16} /> Reindeer &amp; seals</div>
              <div className="tsa_chip"><Check size={16} /> Millions of seabirds</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">7–14</div>
              <div className="tsa_why_card_label">Days — the typical length of a Svalbard expedition cruise</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Jun–Aug</div>
              <div className="tsa_why_card_label">Best window for overall wildlife viewing</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">0</div>
              <div className="tsa_why_card_label">Guaranteed sightings — wildlife here is genuinely wild</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPEDITION ACTIVITIES (SPLIT LAYOUT + PHOTOS) ================= */}
      <section className="tsa_section tsa_section_soft" id="activities">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Expedition Activities Look Like</h2>
            <p>Depending on weather and ice conditions, a typical day may include several of the following.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Compass size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Zodiac Cruises</div>
                  <h4>Small-Boat Exploration</h4>
                  <p>Guided Zodiac cruises get you close to glaciers, wildlife, and remote coastlines.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Users size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Guided Shore Landings</div>
                  <h4>On Arctic Ground</h4>
                  <p>Naturalist-led landings for glacier viewing, wildlife observation, and hiking.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Camera size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Photography</div>
                  <h4>Capturing the Arctic</h4>
                  <p>Dedicated time and guidance for photographing wildlife and landscapes.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Sparkles size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Science &amp; Lectures</div>
                  <h4>Scientific Presentations</h4>
                  <p>Citizen science projects and onboard lectures from expert naturalists.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src={IMG.activities2} alt="Zodiac excursion near a Svalbard glacier" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src={IMG.activities1} alt="Guided shore landing with naturalist guide" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WEATHER & CLIMATE — zigzag, image RIGHT / text LEFT ================= */}
      <section className="tsa_section" id="weather">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Weather &amp; Climate</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.weather} alt="Changing Arctic weather over Svalbard" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><ThermometerSun size={14} /> WEATHER &amp; CLIMATE</div>
            <h2>What the Weather Is Actually Like</h2>
            <p>
              Summer temperatures generally range between 2°C and 8°C, though conditions can change
              quickly. Layered clothing is recommended throughout the season.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Wind size={16} /> Wind</div>
              <div className="tsa_chip"><CloudRain size={16} /> Rain</div>
              <div className="tsa_chip"><ThermometerSun size={16} /> Cool temperatures</div>
              <div className="tsa_chip"><Sun size={16} /> Long daylight hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RING STATS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Svalbard Cruises, By the Numbers</h2>
            <p>What most travelers can expect when booking a Svalbard expedition.</p>
          </div>
          <div className="tsa_ring_stat_row">
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 55 }}>
                <div className="tsa_ring_stat_inner">Late May–Sep</div>
              </div>
              <div className="tsa_ring_stat_label">Full expedition cruise season</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 75 }}>
                <div className="tsa_ring_stat_inner">Jun–Aug</div>
              </div>
              <div className="tsa_ring_stat_label">Best window for wildlife viewing</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 45 }}>
                <div className="tsa_ring_stat_inner">2–8°C</div>
              </div>
              <div className="tsa_ring_stat_label">Typical summer temperature range</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 100 }}>
                <div className="tsa_ring_stat_inner">7–14</div>
              </div>
              <div className="tsa_ring_stat_label">Typical cruise length, in days</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO BANNER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Play size={14} /> SEE IT IN ACTION</div>
            <h2>Watch: A Day on a Svalbard Expedition</h2>
            <p>A short look at Zodiac landings, wildlife encounters, and life aboard an expedition ship.</p>
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
              title="A Day on a Svalbard Expedition Cruise"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ================= CHOOSING THE RIGHT CRUISE (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Choosing the Right Cruise</h2>
            <p>We help travelers compare options to find the perfect fit.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Cruise Line &amp; Ship Size</h4>
              <ul>
                <li><Check size={14} /> Small vs. larger expedition ships</li>
                <li><Check size={14} /> Onboard amenities &amp; comfort level</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Expedition Style</h4>
              <ul>
                <li><Check size={14} /> Wildlife-focused itineraries</li>
                <li><Check size={14} /> Photography-focused voyages</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Itinerary</h4>
              <ul>
                <li><Check size={14} /> Route &amp; port stops</li>
                <li><Check size={14} /> Length of voyage</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Cabin Options</h4>
              <ul>
                <li><Check size={14} /> Suite categories</li>
                <li><Check size={14} /> View &amp; deck location</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Included Excursions &amp; Value</h4>
              <ul>
                <li><Check size={14} /> What's included vs. optional</li>
                <li><Check size={14} /> Overall value for your budget</li>
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
              "One of the questions we're asked most often is whether a Svalbard expedition is suitable
              for first-time expedition travelers. The answer is absolutely yes. With expert guidance,
              comfortable ships, and extraordinary wildlife, Svalbard is one of the most rewarding Arctic
              destinations. Our role is to match each traveler with the itinerary that best suits their
              interests and expectations."
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
            <p>We'll make planning your Arctic adventure simple and stress-free.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Compare Cruise Lines</h4>
              <p>Firsthand knowledge of expedition ships and their itineraries.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Choose the Ideal Itinerary</h4>
              <p>Matched to your wildlife priorities and travel dates.</p>
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
                When is the best time to take a Svalbard cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Late May through early September is the main expedition cruise season, with June through August offering the best wildlife viewing.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Can you see polar bears on a Svalbard cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Svalbard is one of the world's best destinations for observing polar bears in the wild, although sightings can never be guaranteed.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                How long are Svalbard cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most itineraries range from 7 to 14 days, depending on the cruise line and route.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                What wildlife can I expect to see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Polar bears, walruses, whales, Arctic foxes, reindeer, seals, puffins, and numerous seabirds.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Are Zodiac excursions included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most expedition cruises include guided Zodiac cruises and shore landings.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Do I need previous expedition experience? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>No. Most Svalbard cruises are suitable for first-time expedition travelers.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What should I pack? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Bring layered clothing, waterproof outerwear, hiking boots, gloves, a warm hat, binoculars, and camera equipment.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is Wi-Fi available onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Many expedition ships offer Wi-Fi, although speed and availability vary by operator.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Are meals included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Most expedition cruises include breakfast, lunch, dinner, and beverages such as coffee and tea.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is Svalbard safe? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Guided expeditions follow strict safety protocols, particularly during shore landings in polar bear habitat.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What is the weather like? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Summer temperatures usually range between 2°C and 8°C with changing Arctic weather conditions.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Is travel insurance recommended? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Yes. Comprehensive travel insurance with expedition cruise coverage is strongly recommended.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Can children join Svalbard cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Some cruise lines welcome families, while others have minimum age requirements.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Are wildlife sightings guaranteed? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>No. Wildlife is completely wild, so sightings always depend on nature and environmental conditions.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Our experienced advisors help you compare cruise lines, choose the ideal itinerary and cabin, arrange travel logistics, and provide personalized support before, during, and after your expedition.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Plan Your Svalbard Expedition?</h2>
          <p>
            Whether you're dreaming of polar bears, glaciers, whales, or the Midnight Sun, our experts will
            help you choose the perfect expedition cruise.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request a Cruise Quote</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}