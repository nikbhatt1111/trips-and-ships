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
} from "lucide-react";

/**
 * Antarctica Photography Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: Image/video sources below are placeholders — swap the URLs
 * in PLACEHOLDER_IMAGES / PLACEHOLDER_VIDEO for real production assets.
 */

const PLACEHOLDER_IMAGES = {
  heroTall: "https://placehold.co/800x920/0f1c2e/8fb4e8?text=Iceberg+at+Golden+Hour",
  gridA: "https://placehold.co/640x420/16243a/8fb4e8?text=Gentoo+Penguin+Portrait",
  gridB: "https://placehold.co/640x420/1c2f4a/8fb4e8?text=Humpback+Whale+Tail",
  gridC: "https://placehold.co/640x420/101b2c/8fb4e8?text=Zodiac+Photographer",
  videoPoster: "https://placehold.co/1280x720/0f1c2e/8fb4e8?text=Watch%3A+Shooting+Antarctica",
};

const PLACEHOLDER_VIDEO = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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
      "@id":"https://www.tripsandships.com/antarctica-photography-guide",
      "url":"https://www.tripsandships.com/antarctica-photography-guide",
      "name":"Antarctica Photography Guide",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Photography Guide",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-photography-guide.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Photography Guide", "item":"https://www.tripsandships.com/antarctica-photography-guide" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the best month for Antarctica photography?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January and February offer the best combination of active wildlife, relatively mild temperatures, long daylight hours, and excellent photography conditions." }
        },
        {
          "@type":"Question",
          "name":"What camera should I bring?",
          "acceptedAnswer":{ "@type":"Answer", "text":"A mirrorless or DSLR camera with a wide-angle lens and a telephoto zoom is ideal for Antarctica." }
        },
        {
          "@type":"Question",
          "name":"Are drones allowed in Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"No. Drone use is generally prohibited on Antarctica expeditions to protect wildlife and the environment." }
        },
        {
          "@type":"Question",
          "name":"Do I need a tripod?",
          "acceptedAnswer":{ "@type":"Answer", "text":"A tripod is optional. Most wildlife and Zodiac photography is easier handheld, though a lightweight tripod can be useful onboard." }
        },
        {
          "@type":"Question",
          "name":"What wildlife can I photograph?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Depending on the season, you can photograph penguins, whales, seals, seabirds, glaciers, and iconic Antarctic landscapes." }
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

export default function AntarcticaPhotographyGuide() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState(1); // 0=Nov .. 4=Mar
  const [openFaq, setOpenFaq] = useState({});
  const [videoPlaying, setVideoPlaying] = useState(false);
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
            <Camera size={14} /> ANTARCTICA PHOTOGRAPHY GUIDE
          </div>
          <h1>Antarctica Photography Guide</h1>
          <p>
            Capture the world's most extraordinary polar landscapes. Towering blue icebergs, enormous
            glaciers, dramatic mountain ranges, curious penguins, breaching whales, and breathtaking light
            create endless opportunities for unforgettable images — whether you're an enthusiastic hobbyist
            or an experienced photographer.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Plan Your Antarctica Photography Expedition <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">November</div>
            <div className="tsa_ss_best">Fresh snowfall, clean landscapes, dramatic ice formations</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">December</div>
            <div className="tsa_ss_best">Penguin courtship, nest building, longer daylight</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">January</div>
            <div className="tsa_ss_best">Peak photography season, penguin chicks, beautiful light</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">February</div>
            <div className="tsa_ss_best">Best whale photography, dramatic sunsets</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">March</div>
            <div className="tsa_ss_best">Golden light, fewer ships, atmospheric moody skies</div>
          </div>
        </div>
      </div>

      {/* ================= WHY VISIT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> A PHOTOGRAPHER'S DREAM
            </div>
            <h2>Why Antarctica Is a Photographer's Dream</h2>
            <p>
              Few places on Earth offer the diversity and scale found in Antarctica. Every landing offers
              new compositions and unforgettable moments.
            </p>
            <p>
              At Trips &amp; Ships Luxury Travel, we help travelers choose luxury expedition cruises that
              provide exceptional wildlife encounters, expert-led photography opportunities, and unforgettable
              experiences in the White Continent.
            </p>
            <p>Careful preparation helps you return home with incredible photographs while fully enjoying your luxury expedition.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Massive blue icebergs</div>
              <div className="tsa_chip"><Check size={16} /> Towering glaciers</div>
              <div className="tsa_chip"><Check size={16} /> Penguin colonies</div>
              <div className="tsa_chip"><Check size={16} /> Humpback &amp; orca whales</div>
              <div className="tsa_chip"><Check size={16} /> Historic expedition huts</div>
              <div className="tsa_chip"><Check size={16} /> Crystal-clear reflections</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Nov–Mar</div>
              <div className="tsa_why_card_label">Best photography season, each month with its own light and subjects</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Jan–Mar</div>
              <div className="tsa_why_card_label">Peak window for wildlife photography, including whales</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">All Levels</div>
              <div className="tsa_why_card_label">Antarctica photography is suitable for beginners through experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GALLERY ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> IMAGES FROM THE ICE
            </div>
            <h2>See What's Possible Behind the Lens</h2>
            <p>
              From brilliant white snow and deep blue ice to breaching whales and golden polar light,
              Antarctica delivers unforgettable compositions from November through March.
            </p>
          </div>
          <div className="tsa_media_grid">
            <div className="tsa_media_card tall">
              <img src="/assets/Antarctica_Photography_Guide_1.jpg" alt="Blue iceberg glowing in soft polar light" />
              <div className="tsa_media_caption">November's brilliant snow and deep blue iceberg formations</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Antarctica_Photography_Guide_2.jpg" alt="Gentoo penguin colony with chicks" />
              <div className="tsa_media_caption">Penguin colonies offer endless behavior and portrait shots</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Antarctica_Photography_Guide_3.jpg" alt="Humpback whale tail fluke breaking the surface" />
              <div className="tsa_media_caption">Humpback whale flukes and breaches peak in February and March</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Antarctica_Photography_Guide_4.jpg" alt="Photographer shooting from a Zodiac excursion" />
              <div className="tsa_media_caption">Zodiac excursions bring you close to glaciers and wildlife</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Antarctica_Photography_Guide_5.jpg" alt="Golden hour light over Antarctic mountains" />
              <div className="tsa_media_caption">Extended golden-hour light creates dramatic late-season images</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Antarctica Photography at a Glance</h2>
            <p>
              A quick reference for planning your gear, season, and shooting style before you set out
              for the White Continent.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Photography Topic</th>
                  <th>Quick Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Best photography season</td><td>November–March</td></tr>
                <tr><td>Best wildlife photography</td><td>January–March</td></tr>
                <tr><td>Best iceberg photography</td><td>November–January</td></tr>
                <tr><td>Golden hour</td><td>Extended soft polar light</td></tr>
                <tr><td>Camera type</td><td>DSLR or Mirrorless</td></tr>
                <tr><td>Recommended lenses</td><td>24–70mm, 70–200mm, 100–400mm</td></tr>
                <tr><td>Tripod</td><td>Optional</td></tr>
                <tr><td>Drone use</td><td>Not permitted</td></tr>
                <tr><td>Waterproof protection</td><td>Highly recommended</td></tr>
                <tr><td>Photography experience</td><td>Suitable for all levels</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= ESSENTIAL CAMERA EQUIPMENT (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Essential Camera Equipment</h2>
            <p>Bring gear that balances image quality with portability during shore landings.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Camera Body</h4>
              <p>A mirrorless or DSLR camera, plus a backup body if possible.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Wide-Angle Lens (16–35mm)</h4>
              <p>Perfect for landscapes, icebergs, glaciers, and Zodiac scenes.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Standard Zoom (24–70mm)</h4>
              <p>Ideal for general travel, people, and scenic expedition views.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Fish size={20} /></div>
              <h4>Telephoto Lens (70–400mm)</h4>
              <p>Excellent for penguins, whales, seals, birds, and distant landscapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MONTH BY MONTH EXPLORER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Best Time for Antarctica Photography, Month by Month</h2>
            <p>Select a month to explore its photography highlights, ideal shooters, and considerations.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeMonth === 0 ? "active" : ""}`} onClick={() => setActiveMonth(0)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">November</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 1 ? "active" : ""}`} onClick={() => setActiveMonth(1)}>
                <Sparkles size={18} /> <span className="tsa_month_tab_label">December</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 2 ? "active" : ""}`} onClick={() => setActiveMonth(2)}>
                <Sun size={18} /> <span className="tsa_month_tab_label">January</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 3 ? "active" : ""}`} onClick={() => setActiveMonth(3)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">February</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 4 ? "active" : ""}`} onClick={() => setActiveMonth(4)}>
                <Fish size={18} /> <span className="tsa_month_tab_label">March</span>
              </button>
            </div>

            {activeMonth === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Fresh Snowfall &amp; Clean Landscapes</div>
                  <h3 className="tsa_month_title">November</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Brilliant white snow and deep blue ice</li>
                    <li><Check size={16} /> Fewer footprints for pristine compositions</li>
                    <li><Check size={16} /> Unique early-season iceberg formations</li>
                    <li><Check size={16} /> Dramatic scenery with minimal visitor traffic</li>
                    <li><Check size={16} /> Ideal early expedition season conditions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Landscape Photographers</span>
                    <span>Iceberg Photography</span>
                    <span>Quiet Shoots</span>
                  </div>
                  <p className="tsa_month_note">
                    Considerations: temperatures are cooler than later in the season, and wildlife
                    behavior shots are less abundant compared to December and January.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">-5°C to 2°C</div>
                    <div className="tsa_stat_card_label">Average Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">18–20 hrs</div>
                    <div className="tsa_stat_card_label">Usable Daylight</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "88%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Penguin Courtship &amp; Nest Building</div>
                  <h3 className="tsa_month_title">December</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Nearly 24 hours of daylight for extended shooting</li>
                    <li><Check size={16} /> Active penguin courtship and nest-building behavior</li>
                    <li><Check size={16} /> Colorful wildlife activity throughout the colonies</li>
                    <li><Check size={16} /> Excellent landscape conditions</li>
                    <li><Check size={16} /> Long daylight windows for flexible shoot planning</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Behavior</span>
                    <span>Extended Daylight</span>
                    <span>Photography</span>
                  </div>
                  <p className="tsa_month_note">
                    Photographers often choose December for its combination of active colonies and
                    long daylight hours for flexible shooting schedules.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">-2°C to 4°C</div>
                    <div className="tsa_stat_card_label">Average Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">~24 hrs</div>
                    <div className="tsa_stat_card_label">Usable Daylight</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "88%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Peak Photography Season</div>
                  <h3 className="tsa_month_title">January</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Warmest temperatures for comfortable shooting</li>
                    <li><Check size={16} /> Penguin chicks appearing across the colonies</li>
                    <li><Check size={16} /> Excellent Zodiac excursions for close-up shots</li>
                    <li><Check size={16} /> Beautiful, soft polar lighting</li>
                    <li><Check size={16} /> Maximum overall wildlife activity</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>All-Around Photography</span>
                    <span>Penguin Chicks</span>
                    <span>Zodiac Shooting</span>
                  </div>
                  <p className="tsa_month_note">
                    Because demand peaks in January, booking well in advance is recommended to secure
                    preferred departures for the season's best light and wildlife activity.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">0°C to 5°C</div>
                    <div className="tsa_stat_card_label">Average Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">20–22 hrs</div>
                    <div className="tsa_stat_card_label">Usable Daylight</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "88%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Best for Whale Photography</div>
                  <h3 className="tsa_month_title">February</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Peak humpback whale photography opportunities</li>
                    <li><Check size={16} /> Frequent minke whale and orca encounters</li>
                    <li><Check size={16} /> Penguin chicks becoming active and independent</li>
                    <li><Check size={16} /> Dramatic sunsets and extended golden light</li>
                    <li><Check size={16} /> Larger areas accessible as sea ice recedes</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Whale Photography</span>
                    <span>Dramatic Light</span>
                    <span>Returning Photographers</span>
                  </div>
                  <p className="tsa_month_note">
                    By February, whales are feeding in large numbers and sunsets grow more dramatic —
                    often considered the most rewarding month for action and wildlife photography.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">-1°C to 4°C</div>
                    <div className="tsa_stat_card_label">Average Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">16–18 hrs</div>
                    <div className="tsa_stat_card_label">Usable Daylight</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "88%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "50%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Best for Atmospheric Images</div>
                  <h3 className="tsa_month_title">March</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Golden, low-angle polar light</li>
                    <li><Check size={16} /> Fewer ships for quieter, uncrowded shots</li>
                    <li><Check size={16} /> Moody, dramatic skies</li>
                    <li><Check size={16} /> Outstanding whale encounters continue</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Atmospheric Light</span>
                    <span>Whale Photography</span>
                    <span>Uncrowded Shoots</span>
                  </div>
                  <p className="tsa_month_note">
                    March marks the final weeks of the season. Temperatures begin to cool and daylight
                    shortens, but the low golden light and quieter sailings reward patient photographers.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">-5°C to 1°C</div>
                    <div className="tsa_stat_card_label">Average Temperature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">12–15 hrs</div>
                    <div className="tsa_stat_card_label">Usable Daylight</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "78%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "88%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "50%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= VIDEO: SHOOTING ANTARCTICA ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> BEHIND THE LENS
            </div>
            <h2>See Antarctica Photography in Action</h2>
            <p>Watch how photographers capture icebergs, wildlife, and dramatic light during Zodiac excursions and shore landings on a luxury expedition.</p>
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
                  ? "https://www.youtube.com/embed/DsmZYSIfAqY?si=B5gtZuVQo_yNGPEK"
                  : "https://www.youtube.com/embed/DsmZYSIfAqY?si=B5gtZuVQo_yNGPEK"
              }
              title="Photographing Antarctica"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
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
              "Antarctica rewards patience more than any camera. Some of the most unforgettable images
              come from simply slowing down, observing wildlife respectfully, and allowing nature to
              unfold. Choosing the right expedition itinerary and travel season gives photographers the
              greatest opportunities to capture truly extraordinary moments."
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

      {/* ================= WHY BOOK WITH US ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book Your Photography Expedition with Trips &amp; Ships</h2>
            <p>
              Our expertise ensures you can focus on capturing unforgettable memories while we handle
              every detail of your Antarctica photography expedition.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Ideal Ship &amp; Season</h4>
              <p>We help you choose the ideal expedition ship and the best photography season.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Wildlife-Rich Itineraries</h4>
              <p>We find itineraries with exceptional wildlife and photography opportunities.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Every Detail Coordinated</h4>
              <p>Pre- and post-cruise travel, hotels, flights, and travel protection, arranged for you.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Personalized Journey</h4>
              <p>Every aspect of the journey is personalized to your photography goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE + CAMERA SETTINGS TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Wildlife Timing &amp; Camera Settings</h2>
            <p>Plan your subjects and dial in your settings before each landing or Zodiac excursion.</p>
          </div>
          <div className="tsa_tables_grid">
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
                  <tr><td>Humpback Whales</td><td>February–March</td></tr>
                  <tr><td>Orcas &amp; Minke Whales</td><td>January–March</td></tr>
                  <tr><td>Leopard Seals</td><td>December–March</td></tr>
                  <tr><td>Weddell Seals</td><td>November–February</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th>Recommended Settings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Wildlife</td><td>1/1000s+, continuous AF, burst mode</td></tr>
                  <tr><td>Icebergs</td><td>f/8–f/11, ISO 100–400, shoot RAW</td></tr>
                  <tr><td>Zodiac Photography</td><td>Image stabilization, fast shutter, Auto ISO</td></tr>
                  <tr><td>General Landscapes</td><td>Wide-angle lens, RAW, mind the reflections</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH MONTH IS RIGHT FOR YOUR PHOTOGRAPHY ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Month Is Right for Your Photography?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose November If You Want:</h4>
              <ul>
                <li><Check size={14} /> Pristine, untouched snowy landscapes</li>
                <li><Check size={14} /> Deep blue ice and dramatic formations</li>
                <li><Check size={14} /> Quiet, low-traffic shoots</li>
                <li><Check size={14} /> Early-season iceberg photography</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose December If You Want:</h4>
              <ul>
                <li><Check size={14} /> Penguin courtship and nesting behavior</li>
                <li><Check size={14} /> Nearly 24 hours of shooting daylight</li>
                <li><Check size={14} /> Active, colorful colonies</li>
                <li><Check size={14} /> Excellent landscape conditions</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose January If You Want:</h4>
              <ul>
                <li><Check size={14} /> The single best all-around photography month</li>
                <li><Check size={14} /> Penguin chicks and maximum wildlife activity</li>
                <li><Check size={14} /> Excellent Zodiac excursion access</li>
                <li><Check size={14} /> Warmest, most comfortable shooting conditions</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose February If You Want:</h4>
              <ul>
                <li><Check size={14} /> Peak whale photography</li>
                <li><Check size={14} /> Independent, active penguin chicks</li>
                <li><Check size={14} /> Dramatic sunsets and golden light</li>
                <li><Check size={14} /> Access to remote, ice-free areas</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose March If You Want:</h4>
              <ul>
                <li><Check size={14} /> Atmospheric, moody skies</li>
                <li><Check size={14} /> Outstanding whale encounters</li>
                <li><Check size={14} /> Fewer ships and quieter compositions</li>
                <li><Check size={14} /> Extended golden-hour photography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LENS GUIDE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Lens for Which Shot?</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Lens</th>
                  <th>Focal Length</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Wide-Angle</td><td>16–35mm</td><td>Landscapes, icebergs, glaciers, ship &amp; Zodiac scenes</td></tr>
                <tr><td>Standard Zoom</td><td>24–70mm</td><td>General travel, people, expedition activities</td></tr>
                <tr><td>Telephoto</td><td>70–200mm</td><td>Penguins, seals, birds, closer wildlife</td></tr>
                <tr><td>Super-Telephoto</td><td>100–400mm</td><td>Whales, distant wildlife, distant landscapes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= COMMON MISTAKES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Photography Mistakes to Avoid</h2>
            <p>Many first-time Antarctica photographers make avoidable mistakes.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Not Protecting Gear From Cold &amp; Moisture</h4>
                <p>Keep spare batteries warm, use waterproof bags, and let cameras acclimate indoors to reduce condensation.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Getting Too Close to Wildlife</h4>
                <p>Keep a safe distance, follow guide instructions, and focus on behavior rather than close-ups.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Not Bringing Enough Batteries &amp; Memory Cards</h4>
                <p>Cold temperatures drain batteries quickly, and long shooting days fill memory cards fast.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Over-Editing Images</h4>
                <p>Antarctica's natural colors are already extraordinary — avoid heavy-handed post-processing.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Not Matching Season to Photography Goals</h4>
                <p>Iceberg photographers, wildlife photographers, and whale photographers should each target different months.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS THIS RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is an Antarctica Photography Expedition Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Photographers of all experience levels</li>
                <li><Check size={14} /> Wildlife and nature photographers</li>
                <li><Check size={14} /> Landscape and iceberg photographers</li>
                <li><Check size={14} /> Photographers seeking dramatic, atmospheric light</li>
                <li><Check size={14} /> Bucket-list photography travelers</li>
                <li><Check size={14} /> Those who enjoy patient, observational shooting</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Photographers who plan to fly a drone (not permitted)</li>
                <li><X size={14} /> Those uncomfortable with cold, wet conditions</li>
                <li><X size={14} /> Photographers seeking guaranteed, close-up encounters</li>
                <li><X size={14} /> Travelers with very limited mobility for shore landings</li>
                <li><X size={14} /> Last-minute planners during peak photography months</li>
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
                What is the best month for Antarctica photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January and February offer the best combination of active wildlife, relatively mild temperatures, long daylight hours, and excellent photography conditions. November is ideal for pristine snowy landscapes, while March offers dramatic light and outstanding whale photography.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What camera should I bring to Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A mirrorless or DSLR camera with interchangeable lenses is recommended. These cameras provide excellent image quality, fast autofocus, and flexibility for capturing landscapes, wildlife, and expedition activities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What lenses are best for Antarctica photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A wide-angle lens (16–35mm) is perfect for glaciers, icebergs, and landscapes, while a telephoto lens (70–200mm or 100–400mm) is ideal for photographing penguins, whales, seals, and seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Can beginners take great photos in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Antarctica's breathtaking scenery makes it an incredible destination for photographers of all skill levels. Expedition guides often provide helpful photography tips during landings and Zodiac excursions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Do I need a tripod? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A tripod is optional. Most wildlife and Zodiac photography is easier handheld due to movement, but a lightweight travel tripod can be useful for scenic photography onboard the ship or during calm conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are drones allowed in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Drone use is generally prohibited on Antarctica expeditions to protect wildlife, preserve the natural environment, and comply with IAATO guidelines and expedition regulations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                How do I protect my camera from the cold? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Keep spare batteries in an inside pocket to stay warm, use waterproof bags, avoid rapid temperature changes, and allow your equipment to acclimate gradually when moving between the ship and the outdoors.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                What wildlife can I photograph in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Depending on the season, you may photograph Gentoo, Adélie, and Chinstrap penguins, humpback whales, orcas, minke whales, Weddell seals, leopard seals, elephant seals, and a variety of seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Should I shoot in RAW or JPEG? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>RAW is highly recommended because it preserves more image data, allowing you to recover highlights, adjust white balance, and edit exposure more effectively during post-processing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                How much camera equipment should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Bring only the gear you'll comfortably carry during shore landings. One camera body, two or three versatile lenses, extra batteries, memory cards, and protective accessories are usually sufficient.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Can I charge my camera batteries onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Luxury expedition ships provide power outlets in guest cabins, allowing you to recharge camera batteries and other electronic devices between excursions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Is waterproof camera protection necessary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Sea spray, snow, rain, and wet Zodiac rides can expose your equipment to moisture. Waterproof camera covers, dry bags, and weather-sealed gear provide valuable protection.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                What camera settings work best for wildlife photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Use a fast shutter speed (1/1000 second or faster), continuous autofocus, burst shooting mode, and Auto ISO when lighting changes quickly to capture sharp images of moving wildlife.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Can I photograph the Northern Lights in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Antarctica is in the Southern Hemisphere, where you may occasionally see the Aurora Australis (Southern Lights) during late-season voyages, but most summer expedition cruises occur when continuous daylight makes aurora viewing unlikely.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an Antarctica photography expedition through Trips &amp; Ships? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Trips &amp; Ships Luxury Travel helps you choose the best luxury expedition ship, photography-friendly itinerary, ideal travel season, and accommodations while coordinating flights, hotels, and every detail to ensure an exceptional photography adventure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Photograph Antarctica?</h2>
          <p>
            Every Antarctica expedition offers extraordinary photographic opportunities, but the right
            itinerary, season, and ship can make all the difference. Our luxury travel specialists will
            help you choose the expedition that matches your photography goals, travel style, and expectations.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request a Custom Antarctica Photography Itinerary</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}