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
  Play,
  MapPin,
  Ship,
  Calendar,
  ChevronRight,
  ListTree,
  ArrowUpRight,
} from "lucide-react";

/**
 * Best Time to Visit Antarctica — REDESIGN (media-rich edition)
 * Same .tsa_* design tokens/colors as the original page. Every
 * new section uses brand-new class names (tsa_stat_band,
 * tsa_team_*, tsa_log_*, tsa_moments_*, tsa_reel_*, tsa_filmstrip_*,
 * tsa_split_*, tsa_photo_*) so style.css can be shared between
 * this page and the original without touching a single existing rule.
 *
 * All image/video sources are placeholders — swap for production assets.
 *
 * SEO additions in this version (see accompanying notes):
 *  - Canonical + Open Graph + Twitter tags injected alongside the
 *    existing JSON-LD useEffect, using the same pattern already
 *    in this file rather than a new mechanism.
 *  - JSON-LD now uses the live domain (trips-and-ships.vercel.app)
 *    consistently, adds an Article node, and gives the Person an
 *    ImageObject + sameAs profiles for E-E-A-T.
 *  - A visible breadcrumb (mirrors the BreadcrumbList schema),
 *    a jump-link table of contents, and a "Read Next" internal
 *    linking grid to the site's other guide pages.
 *  - Exactly one <h1>; every section below it is <h2>, with
 *    <h3>/<h4> only nested under a preceding <h2>.
 */

const SITE_URL = "https://trips-and-ships.vercel.app";
const PAGE_PATH = "/best-time-to-visit-antarctica";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/best-time-to-visit-antarctica-og.jpg`;

const RELATED_PAGES = [
  { tag: "Plan", title: "Antarctica Cruise Itineraries", desc: "Compare route lengths, ships, and departure months.", href: "/antarctica-cruise-itineraries" },
  { tag: "Prepare", title: "Antarctica Packing Guide", desc: "Layering, boots, and gear for every deck and landing.", href: "/antarctica-packing-guide" },
  { tag: "Wildlife", title: "Antarctica Wildlife Guide", desc: "Penguins, seals, and whales — and when to see each.", href: "/antarctica-wildlife-guide" },
  { tag: "Explore", title: "Antarctica Landing Sites", desc: "Port Lockroy, Paradise Bay, and other iconic stops.", href: "/antarctica-landing-sites" },
  { tag: "Learn", title: "Zodiac Landings Explained", desc: "What a shore landing actually feels like, step by step.", href: "/zodiac-landings" },
  { tag: "Capture", title: "Antarctica Photography Guide", desc: "Camera settings and light for ice, wildlife, and skies.", href: "/antarctica-photography-guide" },
  { tag: "Value", title: "Is an Antarctica Cruise Worth It?", desc: "A straight answer on cost versus experience.", href: "/is-an-antarctica-cruise-worth-it" },
  { tag: "Answers", title: "Antarctica Cruise FAQ", desc: "Every common question about booking and sailing.", href: "/antarctica-cruise-faq" },
];

const TOC_ITEMS = [
  { id: "why-visit", label: "Why Visit Antarctica" },
  { id: "photo-gallery", label: "Antarctica Through the Seasons" },
  { id: "video-reel", label: "Drake Passage Crossing" },
  { id: "wildlife", label: "Antarctic Wildlife" },
  { id: "expedition-team", label: "Meet the Expedition Team" },
  { id: "expedition-log", label: "Featured Departures" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const IMG = {
  heroVideo: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  splitBack: "https://placehold.co/900x900/16243a/8fb4e8?text=Zodiac+Landing",
  splitFront: "https://placehold.co/700x700/1c2f4a/8fb4e8?text=Guest+on+Deck",
  statBand: "https://placehold.co/1600x700/0f1c2e/274472?text=Southern+Ocean",
  photo1: "https://placehold.co/700x500/16243a/8fb4e8?text=Gentoo+Colony",
  photo2: "https://placehold.co/700x500/1c2f4a/8fb4e8?text=Iceberg+Arch",
  photo3: "https://placehold.co/700x500/101b2c/8fb4e8?text=Humpback+Dive",
  photo4: "https://placehold.co/700x500/16243a/8fb4e8?text=Suite+Balcony",
  reelMedia: "https://placehold.co/900x680/0f1c2e/8fb4e8?text=Watch%3A+Drake+Passage+Crossing",
  film1: "https://placehold.co/520x680/16243a/8fb4e8?text=Leopard+Seal",
  film2: "https://placehold.co/520x680/1c2f4a/8fb4e8?text=Orca+Pod",
  film3: "https://placehold.co/520x680/101b2c/8fb4e8?text=Chinstrap+Chicks",
  film4: "https://placehold.co/520x680/16243a/8fb4e8?text=Albatross",
  film5: "https://placehold.co/520x680/1c2f4a/8fb4e8?text=Blue+Ice+Cave",
  quotePortrait: "https://placehold.co/200x200/274472/ffffff?text=AH",
  team1: "https://placehold.co/300x300/16243a/8fb4e8?text=Naturalist",
  team2: "https://placehold.co/300x300/1c2f4a/8fb4e8?text=Captain",
  team3: "https://placehold.co/300x300/101b2c/8fb4e8?text=Photographer",
  team4: "https://placehold.co/300x300/16243a/8fb4e8?text=Historian",
  log1: "https://placehold.co/640x420/16243a/8fb4e8?text=Peninsula+Classic",
  log2: "https://placehold.co/640x420/1c2f4a/8fb4e8?text=South+Georgia",
  log3: "https://placehold.co/640x420/101b2c/8fb4e8?text=Weddell+Sea",
  moment1: "https://placehold.co/440x560/16243a/8fb4e8?text=Moment+1",
  moment2: "https://placehold.co/440x340/1c2f4a/8fb4e8?text=Moment+2",
  moment3: "https://placehold.co/440x480/101b2c/8fb4e8?text=Moment+3",
  moment4: "https://placehold.co/440x400/16243a/8fb4e8?text=Moment+4",
  moment5: "https://placehold.co/440x560/1c2f4a/8fb4e8?text=Moment+5",
  moment6: "https://placehold.co/440x340/101b2c/8fb4e8?text=Moment+6",
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
      "telephone":"+1-XXX-XXX-XXXX",
      "priceRange":"$$$$",
      "areaServed":"Worldwide"
    },
    {
      "@type":"Person",
      "@id":"${SITE_URL}/#angelahughes",
      "name":"Angela Hughes",
      "jobTitle":"CEO",
      "image":"${SITE_URL}/images/angela-hughes.jpg",
      "worksFor":{ "@id":"${SITE_URL}/#organization" },
      "sameAs":[
        "https://www.linkedin.com/"
      ],
      "description":"CEO of Trips & Ships Luxury Travel, Founder of Luxury Travel University, luxury travel expert with more than 40 years of experience and travel to over 121 countries."
    },
    {
      "@type":"WebPage",
      "@id":"${PAGE_URL}",
      "url":"${PAGE_URL}",
      "name":"Best Time to Visit Antarctica",
      "isPartOf":{ "@id":"${SITE_URL}/#organization" },
      "about":"Best Time to Visit Antarctica",
      "primaryImageOfPage":"${OG_IMAGE}"
    },
    {
      "@type":"Article",
      "@id":"${PAGE_URL}/#article",
      "headline":"Best Time to Visit Antarctica",
      "mainEntityOfPage":{ "@id":"${PAGE_URL}" },
      "author":{ "@id":"${SITE_URL}/#angelahughes" },
      "publisher":{ "@id":"${SITE_URL}/#organization" },
      "image":"${OG_IMAGE}",
      "datePublished":"2026-06-15",
      "dateModified":"2026-07-10",
      "keywords":["Antarctica cruise season","Antarctic wildlife","luxury expedition travel"]
    },
    {
      "@type":"ImageObject",
      "@id":"${OG_IMAGE}#image",
      "contentUrl":"${OG_IMAGE}",
      "caption":"Expedition ship among icebergs in Antarctica"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"${SITE_URL}" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"${SITE_URL}/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"${SITE_URL}/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Best Time to Visit Antarctica", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the best month to visit Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January and February generally offer the best combination of wildlife viewing, weather, and expedition conditions." }
        },
        {
          "@type":"Question",
          "name":"How far ahead should I book?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Luxury Antarctica expeditions are best booked 12 to 18 months in advance." }
        },
        {
          "@type":"Question",
          "name":"What is the best month for whale watching?",
          "acceptedAnswer":{ "@type":"Answer", "text":"February and March offer the highest likelihood of whale sightings." }
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
    const els = root.querySelectorAll(".tsa_reveal, .tsa_reveal_stagger");
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

export default function Test() {
  const [theme, setTheme] = useState("light");
  const [openFaq, setOpenFaq] = useState({});
  const rootRef = useScrollReveal();

  const toggleFaq = (key) => setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON_LD;
    document.head.appendChild(script);

    // Canonical + Open Graph + Twitter — same URL used everywhere so
    // schema, social previews, and the sitemap all point at one page.
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
      ["description", "Find the best month to visit Antarctica for wildlife, weather, and luxury expedition cruising — a season-by-season guide."],
      ["og:title", "Best Time to Visit Antarctica | Trips & Ships"],
      ["og:description", "A season-by-season guide to Antarctica's wildlife, weather, and best luxury expedition departures."],
      ["og:type", "article"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Best Time to Visit Antarctica | Trips & Ships"],
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

      {/* ================= HERO — video background ================= */}
      <header className="tsa_hero">
        <div className="tsa_hero_media tsa_hero_media_video">
          <video src={IMG.heroVideo} autoPlay muted loop playsInline />
        </div>
        <div className="tsa_hero_scrim" />

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
          <h1>Best Time to Visit Antarctica</h1>
          <p>
            Experience Earth's last great wilderness at the perfect time. Every Antarctic journey is
            extraordinary, but the timing of your expedition shapes the wildlife you'll encounter, the
            landscapes you'll witness, and the overall experience you'll enjoy.
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
            <div className="tsa_ss_month">November</div>
            <div className="tsa_ss_best">Fresh snow, dramatic landscapes, pristine scenery</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">December</div>
            <div className="tsa_ss_best">Penguin colonies, long daylight, holiday cruises</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">January</div>
            <div className="tsa_ss_best">Warmest weather, active wildlife, ideal first visit</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">February</div>
            <div className="tsa_ss_best">Peak whale watching, photography, fewer crowds</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">March</div>
            <div className="tsa_ss_best">Incredible whale encounters, quieter voyages</div>
          </div>
        </div>
      </div>

      {/* ================= BREADCRUMB — mirrors the BreadcrumbList schema ================= */}
      <div className="tsa_wrap">
        <nav className="tsa_breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <a href="/destinations">Destinations</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <a href="/antarctica">Antarctica</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <span className="tsa_breadcrumb_current">Best Time to Visit Antarctica</span>
        </nav>
      </div>

      {/* ================= TABLE OF CONTENTS — jump links into every H2 below ================= */}
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

      {/* ================= WHY VISIT — split layout w/ stacked photos ================= */}
      <section className="tsa_section" id="why-visit">
        <div className="tsa_wrap tsa_split_layout tsa_reveal">
          <div className="tsa_split_media">
            <div className="tsa_split_media_frame back">
              <img src={IMG.splitBack} alt="Zodiac landing near an ice shelf" />
            </div>
            <div className="tsa_split_media_frame front">
              <img src={IMG.splitFront} alt="Guest photographing from the ship deck" />
            </div>
            <div className="tsa_split_media_accent" />
          </div>
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY VISIT ANTARCTICA
            </div>
            <h2>A Continent Unlike Any Other on Earth</h2>
            <p>
              Antarctica is a continent of towering glaciers, pristine icebergs, extraordinary wildlife,
              and untouched landscapes that few people will ever experience firsthand.
            </p>
            <p>
              Unlike traditional vacations, visiting Antarctica is about immersion in one of the world's
              most remote environments. Luxury expedition cruises combine world-class accommodations,
              exceptional dining, expert naturalists, and carefully guided shore landings.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Vast penguin colonies</div>
              <div className="tsa_chip"><Check size={16} /> Humpback, minke &amp; orca whales</div>
              <div className="tsa_chip"><Check size={16} /> Leopard &amp; Weddell seals</div>
              <div className="tsa_chip"><Check size={16} /> Spectacular glaciers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STAT BAND — full-bleed image ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_stat_band">
            <img src={IMG.statBand} alt="Southern Ocean seascape" />
            <div className="tsa_stat_band_grid">
              <div className="tsa_stat_band_item">
                <div className="tsa_stat_band_num">Oct–Mar</div>
                <div className="tsa_stat_band_label">Only visitor window each year</div>
              </div>
              <div className="tsa_stat_band_item">
                <div className="tsa_stat_band_num">12–18mo</div>
                <div className="tsa_stat_band_label">How early top suites sell out</div>
              </div>
              <div className="tsa_stat_band_item">
                <div className="tsa_stat_band_num">121+</div>
                <div className="tsa_stat_band_label">Countries our founder has explored</div>
              </div>
              <div className="tsa_stat_band_item">
                <div className="tsa_stat_band_num">5</div>
                <div className="tsa_stat_band_label">Months, each a different Antarctica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GRID ================= */}
      <section className="tsa_section" id="photo-gallery">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> ANTARCTICA THROUGH THE SEASONS
            </div>
            <h2>See Antarctica Across the Expedition Season</h2>
            <p>Every month transforms the continent in a different way — from fresh November snow to March's golden light.</p>
          </div>
          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.photo1} alt="Gentoo penguin colony" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Fish size={14} /> Wildlife</span>
                <h4>Peak Penguin Colonies</h4>
                <p>Thousands of gentoo, Adélie, and chinstrap penguins nest along the peninsula shoreline each summer.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.photo2} alt="Blue iceberg arch" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Snowflake size={14} /> Landscape</span>
                <h4>Sculpted Iceberg Fields</h4>
                <p>Deep-blue ice formations, carved by wind and current, drift through the Gerlache Strait.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.photo3} alt="Humpback whale diving" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Compass size={14} /> Marine Life</span>
                <h4>Feeding Humpbacks</h4>
                <p>From late January onward, humpback and minke whales feed in the krill-rich coastal waters.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.photo4} alt="Suite balcony overlooking glaciers" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Ship size={14} /> Onboard</span>
                <h4>Suites With a View</h4>
                <p>Private balconies put glaciers and passing icebergs right outside your window.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO REEL SPOTLIGHT ================= */}
      <section className="tsa_section tsa_section_soft" id="video-reel">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> EXPEDITION EXPERIENCE
            </div>
            <h2>Cross the Drake Before You Go</h2>
            <p>A first look at the crossing, the landings, and life aboard your expedition ship.</p>
          </div>
          <div className="tsa_reel_grid">
            <div className="tsa_reel_media">
              <img src={IMG.reelMedia} alt="Ship crossing the Drake Passage" />
              <button className="tsa_reel_play" type="button">
                <span className="tsa_reel_play_icon"><Play size={18} /></span>
                <span>Watch the crossing (3:12)</span>
              </button>
            </div>
            <div className="tsa_reel_stats">
              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon"><Clock size={18} /></div>
                <div>
                  <div className="tsa_reel_stat_title">~2 Days at Sea</div>
                  <div className="tsa_reel_stat_label">Typical Drake Passage crossing time each way</div>
                </div>
              </div>
              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon"><MapPin size={18} /></div>
                <div>
                  <div className="tsa_reel_stat_title">Ushuaia Departure</div>
                  <div className="tsa_reel_stat_label">Most voyages sail from the world's southernmost city</div>
                </div>
              </div>
              <div className="tsa_reel_stat">
                <div className="tsa_reel_stat_icon"><Users size={18} /></div>
                <div>
                  <div className="tsa_reel_stat_title">Small Guest Counts</div>
                  <div className="tsa_reel_stat_label">Intimate ships mean more time ashore, per person</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE FILMSTRIP ================= */}
      <section className="tsa_section" id="wildlife">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>A Closer Look at Antarctic Wildlife</h2>
            <p>Scroll through a handful of encounters guests photograph most often.</p>
          </div>
        </div>
        <div className="tsa_wrap">
          <div className="tsa_filmstrip_wrap tsa_reveal">
            <div className="tsa_filmstrip">
              <div className="tsa_filmstrip_frame">
                <img src={IMG.film1} alt="Leopard seal resting on ice" />
                <span className="tsa_filmstrip_tag">Leopard Seal</span>
                <div className="tsa_filmstrip_caption">Dec–Mar, often spotted near zodiac landings</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src={IMG.film2} alt="Orca pod surfacing" />
                <span className="tsa_filmstrip_tag">Orca Pod</span>
                <div className="tsa_filmstrip_caption">Jan–Mar, hunting in open leads</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src={IMG.film3} alt="Chinstrap penguin chicks" />
                <span className="tsa_filmstrip_tag">Chinstrap Chicks</span>
                <div className="tsa_filmstrip_caption">Late Dec–Feb, on rocky colonies</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src={IMG.film4} alt="Wandering albatross in flight" />
                <span className="tsa_filmstrip_tag">Albatross</span>
                <div className="tsa_filmstrip_caption">Year-round escorts over open water</div>
              </div>
              <div className="tsa_filmstrip_frame">
                <img src={IMG.film5} alt="Blue ice cave" />
                <span className="tsa_filmstrip_tag">Blue Ice Cave</span>
                <div className="tsa_filmstrip_caption">Best light in early and late season</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERT QUOTE — with portrait ================= */}
      <section className="tsa_section tsa_quote_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_quote_card">
            <div className="tsa_quote_portrait_wrap">
              <div className="tsa_quote_portrait_ring">
                <img className="tsa_quote_portrait" src={IMG.quotePortrait} alt="Angela Hughes" />
              </div>
            </div>
            <div className="tsa_quote_mark">
              <Sparkles size={32} />
            </div>
            <p className="tsa_quote_text">
              "After more than 40 years in the travel industry and journeys to over 121 countries, I've
              learned that Antarctica isn't simply a destination — it's one of the few places on Earth
              that genuinely transforms how people see the world."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>121+ Countries Visited</span>
              <span>2024 Luxury Travel Influencer of the Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPEDITION TEAM ================= */}
      <section className="tsa_section" id="expedition-team">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Users size={14} /> WHO GUIDES YOUR JOURNEY
            </div>
            <h2>Meet the Expedition Team</h2>
            <p>Naturalists, historians, and photographers who bring every landing to life.</p>
          </div>
          <div className="tsa_team_grid">
            <div className="tsa_team_card">
              <div className="tsa_team_photo_ring">
                <img className="tsa_team_photo" src={IMG.team1} alt="Lead naturalist" />
              </div>
              <h4>Dr. Elena Marsh</h4>
              <span className="tsa_team_role">Lead Naturalist</span>
              <p>Fifteen seasons studying penguin colonies across the peninsula.</p>
            </div>
            <div className="tsa_team_card">
              <div className="tsa_team_photo_ring">
                <img className="tsa_team_photo" src={IMG.team2} alt="Expedition captain" />
              </div>
              <h4>Captain Rolf Aanes</h4>
              <span className="tsa_team_role">Expedition Captain</span>
              <p>Twenty-two years navigating polar waters on ice-class vessels.</p>
            </div>
            <div className="tsa_team_card">
              <div className="tsa_team_photo_ring">
                <img className="tsa_team_photo" src={IMG.team3} alt="Onboard photographer" />
              </div>
              <h4>Mika Torres</h4>
              <span className="tsa_team_role">Onboard Photographer</span>
              <p>Runs daily workshops on shooting ice, light, and wildlife.</p>
            </div>
            <div className="tsa_team_card">
              <div className="tsa_team_photo_ring">
                <img className="tsa_team_photo" src={IMG.team4} alt="Polar historian" />
              </div>
              <h4>James Whitfield</h4>
              <span className="tsa_team_role">Polar Historian</span>
              <p>Traces the routes of Shackleton and early Antarctic explorers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPEDITION LOG — featured itineraries ================= */}
      <section className="tsa_section tsa_section_soft" id="expedition-log">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Calendar size={14} /> FEATURED DEPARTURES
            </div>
            <h2>A Sample of the Expedition Log</h2>
            <p>Three itineraries that show how the season shapes the journey.</p>
          </div>
          <div className="tsa_log_grid">
            <div className="tsa_log_card">
              <div className="tsa_log_media">
                <img src={IMG.log1} alt="Antarctic Peninsula classic route" />
                <span className="tsa_log_stamp">11 Days</span>
              </div>
              <div className="tsa_log_perforation" />
              <div className="tsa_log_body">
                <div className="tsa_log_route">Ushuaia → Peninsula → Ushuaia</div>
                <h4>Antarctic Peninsula Classic</h4>
                <p style={{ fontSize: 13.5, color: "var(--tsa-text-muted)" }}>The essential first expedition — glaciers, penguin colonies, and Drake Passage crossings.</p>
                <div className="tsa_log_meta">
                  <span>Dec–Feb</span>
                  <span>Beginner Friendly</span>
                </div>
              </div>
            </div>
            <div className="tsa_log_card">
              <div className="tsa_log_media">
                <img src={IMG.log2} alt="South Georgia wildlife route" />
                <span className="tsa_log_stamp">18 Days</span>
              </div>
              <div className="tsa_log_perforation" />
              <div className="tsa_log_body">
                <div className="tsa_log_route">Ushuaia → South Georgia → Peninsula</div>
                <h4>South Georgia &amp; the Peninsula</h4>
                <p style={{ fontSize: 13.5, color: "var(--tsa-text-muted)" }}>King penguin megacolonies and historic Shackleton sites, paired with peninsula landings.</p>
                <div className="tsa_log_meta">
                  <span>Nov & Feb</span>
                  <span>Wildlife Focused</span>
                </div>
              </div>
            </div>
            <div className="tsa_log_card">
              <div className="tsa_log_media">
                <img src={IMG.log3} alt="Weddell Sea deep expedition" />
                <span className="tsa_log_stamp">14 Days</span>
              </div>
              <div className="tsa_log_perforation" />
              <div className="tsa_log_body">
                <div className="tsa_log_route">Ushuaia → Weddell Sea → Ushuaia</div>
                <h4>Weddell Sea Deep Expedition</h4>
                <p style={{ fontSize: 13.5, color: "var(--tsa-text-muted)" }}>Ice-strengthened access to remote emperor penguin territory and towering tabular bergs.</p>
                <div className="tsa_log_meta">
                  <span>Feb Only</span>
                  <span>Advanced Route</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOMENTS MASONRY ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>In the Moment</h2>
            <p>A few frames guests have shared from recent voyages.</p>
          </div>
          <div className="tsa_moments_grid">
            <div className="tsa_moment_frame"><img src={IMG.moment1} alt="Guest moment 1" /></div>
            <div className="tsa_moment_frame"><img src={IMG.moment2} alt="Guest moment 2" /></div>
            <div className="tsa_moment_frame"><img src={IMG.moment3} alt="Guest moment 3" /></div>
            <div className="tsa_moment_frame"><img src={IMG.moment4} alt="Guest moment 4" /></div>
            <div className="tsa_moment_frame"><img src={IMG.moment5} alt="Guest moment 5" /></div>
            <div className="tsa_moment_frame"><img src={IMG.moment6} alt="Guest moment 6" /></div>
          </div>
        </div>
      </section>

      {/* ================= READ NEXT — internal linking to other guides ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <ArrowUpRight size={14} /> KEEP PLANNING
            </div>
            <h2>Read Next</h2>
            <p>More guides to help you plan the right Antarctica departure.</p>
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
      <section className="tsa_section tsa_section_soft" id="faq">
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
                <p>For most travelers, January and February offer the ideal balance of wildlife, relatively mild temperatures, and excellent expedition conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury expedition cruises often sell out 12 to 18 months in advance, especially for peak departures and premium suite categories.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What is the best month for whale watching? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>February and March are widely considered the best months for observing humpback, minke, and orca whales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience Antarctica?</h2>
          <p>
            Whether your dream is photographing towering icebergs in November or encountering feeding
            whales in February and March, our expedition specialists can help you choose the perfect journey.
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