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
 * Best Time to Visit Antarctica — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: Image/video sources below are placeholders — swap the URLs
 * in PLACEHOLDER_IMAGES / PLACEHOLDER_VIDEO for real production assets.
 */

const PLACEHOLDER_IMAGES = {
  heroTall: "https://placehold.co/800x920/0f1c2e/8fb4e8?text=Glacier+%26+Iceberg",
  gridA: "https://placehold.co/640x420/16243a/8fb4e8?text=Gentoo+Penguins",
  gridB: "https://placehold.co/640x420/1c2f4a/8fb4e8?text=Humpback+Whale",
  gridC: "https://placehold.co/640x420/101b2c/8fb4e8?text=Zodiac+Excursion",
  videoPoster: "https://placehold.co/1280x720/0f1c2e/8fb4e8?text=Watch%3A+A+Day+Aboard+Expedition",
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
      "@id":"https://www.tripsandships.com/best-time-to-visit-antarctica",
      "url":"https://www.tripsandships.com/best-time-to-visit-antarctica",
      "name":"Best Time to Visit Antarctica",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Best Time to Visit Antarctica",
      "primaryImageOfPage":"https://www.tripsandships.com/images/best-time-to-visit-antarctica.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Best Time to Visit Antarctica", "item":"https://www.tripsandships.com/best-time-to-visit-antarctica" }
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
          "name":"When is Antarctica warmest?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January is usually the warmest month with temperatures around 0°C to 5°C." }
        },
        {
          "@type":"Question",
          "name":"How long is an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury Antarctica cruises last between 10 and 14 days." }
        },
        {
          "@type":"Question",
          "name":"When is whale watching best?",
          "acceptedAnswer":{ "@type":"Answer", "text":"February and March offer the highest likelihood of whale sightings." }
        },
        {
          "@type":"Question",
          "name":"How far ahead should I book?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Luxury Antarctica expeditions are best booked 12 to 18 months in advance." }
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

export default function BestTimeToVisitAntarctica() {
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

      {/* ================= WHY VISIT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
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
              exceptional dining, expert naturalists, and carefully guided shore landings, allowing
              travelers to explore responsibly while enjoying premium comfort.
            </p>
            <p>Because Antarctica is accessible only during the Southern Hemisphere summer, selecting the right travel window is essential.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Vast penguin colonies</div>
              <div className="tsa_chip"><Check size={16} /> Humpback, minke &amp; orca whales</div>
              <div className="tsa_chip"><Check size={16} /> Leopard &amp; Weddell seals</div>
              <div className="tsa_chip"><Check size={16} /> Spectacular glaciers</div>
              <div className="tsa_chip"><Check size={16} /> Zodiac excursions</div>
              <div className="tsa_chip"><Check size={16} /> Historic exploration sites</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Oct–Mar</div>
              <div className="tsa_why_card_label">The only window each year Antarctica is open to visitors</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">12–18mo</div>
              <div className="tsa_why_card_label">How far in advance the best luxury suites typically sell out</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">5</div>
              <div className="tsa_why_card_label">Distinct months, each with its own wildlife and scenery highlights</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GALLERY (NEW) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> ANTARCTICA THROUGH THE SEASONS
            </div>
            <h2>See Antarctica Across the Expedition Season</h2>
            <p>
              Every month transforms Antarctica in a different way. Early-season snow, bustling penguin colonies, breaching whales, and dramatic sunsets create unforgettable moments from November through March.
            </p>
          </div>
          <div className="tsa_media_grid">
            <div className="tsa_media_card tall">
              <img src="/assets/Best_Time_to_Visit_Antarctica_1.jpg" alt="Glacier and iceberg landscape in Antarctica" />
              <div className="tsa_media_caption">November's pristine snow and towering blue icebergs</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Best_Time_to_Visit_Antarctica_2.jpg" alt="Gentoo penguin colony on the shoreline" />
              <div className="tsa_media_caption">Thousands of gentoo penguins nesting during the summer</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Best_Time_to_Visit_Antarctica_3.jpg" alt="Humpback whale breaching near the expedition ship" />
              <div className="tsa_media_caption">Humpback whales return to Antarctic waters from January</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Best_Time_to_Visit_Antarctica_4.jpg" alt="Guests on a zodiac excursion near icebergs" />
              <div className="tsa_media_caption">Zodiac cruises reveal glaciers, wildlife, and hidden coves</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/Best_Time_to_Visit_Antarctica_5.jpg" alt="Guests on a zodiac excursion near icebergs" />
              <div className="tsa_media_caption">Golden Antarctic sunsets during the late expedition season</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Is the Best Time to Visit Antarctica?</h2>
            <p>
              For most luxury travelers, December through February offers the best combination of wildlife
              viewing, comfortable temperatures, long daylight hours, and unforgettable expedition experiences.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>November</td><td>Fresh snow, dramatic landscapes, pristine scenery</td></tr>
                <tr><td>December</td><td>Penguin colonies, long daylight, holiday cruises</td></tr>
                <tr><td>January</td><td>Warmest weather, active wildlife, ideal first visit</td></tr>
                <tr><td>February</td><td>Peak whale watching, photography, fewer crowds</td></tr>
                <tr><td>March</td><td>Incredible whale encounters, quieter voyages</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SEASON EXPLAINED (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Antarctica Cruise Season Explained</h2>
            <p>Unlike many destinations, Antarctica is only open to visitors for a short period each year — late October through early March.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Sea Ice Limits</h4>
              <p>Outside the season, sea ice prevents safe navigation.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ThermometerSun size={20} /></div>
              <h4>Extreme Cold</h4>
              <p>Temperatures become extremely cold beyond the summer window.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Vessels Pause</h4>
              <p>Most expedition vessels do not operate outside the season.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Stations Close</h4>
              <p>Research stations become inaccessible for tourism.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MONTH BY MONTH EXPLORER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Month-by-Month Guide</h2>
            <p>Select a month to explore its highlights, ideal travelers, and considerations.</p>
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
                  <div className="tsa_month_tagline">Fresh Snow &amp; Untouched Beauty</div>
                  <h3 className="tsa_month_title">November</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Brilliant white landscapes and crystal-clear skies</li>
                    <li><Check size={16} /> Minimal visitor traffic for quieter sailings</li>
                    <li><Check size={16} /> Penguin courtship begins</li>
                    <li><Check size={16} /> Spectacular photography and dramatic glaciers</li>
                    <li><Check size={16} /> Excellent zodiac cruising</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Landscape Photographers</span>
                    <span>First Expeditions</span>
                    <span>Quiet Sailings</span>
                  </div>
                  <p className="tsa_month_note">
                    Considerations: temperatures are cooler than later in the season, and whale sightings
                    are less frequent compared to February.
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
                    <div className="tsa_stat_card_label">Daylight</div>
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
                  <div className="tsa_month_tagline">Peak Penguin Season</div>
                  <h3 className="tsa_month_title">December</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Nearly 24 hours of daylight for extended exploration</li>
                    <li><Check size={16} /> Peak penguin activity as adults incubate eggs</li>
                    <li><Check size={16} /> Comfortable expedition conditions</li>
                    <li><Check size={16} /> Beautiful ice formations and festive holiday departures</li>
                    <li><Check size={16} /> Wildlife: Gentoo, Adélie &amp; Chinstrap penguins, Weddell &amp; leopard seals</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Holiday Travelers</span>
                    <span>Photography</span>
                  </div>
                  <p className="tsa_month_note">
                    Luxury travelers often choose December because it combines spectacular scenery with
                    ideal weather conditions.
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
                    <div className="tsa_stat_card_label">Daylight</div>
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
                  <div className="tsa_month_tagline">The Warmest Month</div>
                  <h3 className="tsa_month_title">January</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Warmest temperatures of the season</li>
                    <li><Check size={16} /> Maximum wildlife activity, penguin chicks begin appearing</li>
                    <li><Check size={16} /> Excellent kayaking conditions and calm zodiac excursions</li>
                    <li><Check size={16} /> Comfortable hiking opportunities</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Couples</span>
                    <span>Active Travelers</span>
                    <span>Photography</span>
                  </div>
                  <p className="tsa_month_note">
                    Because demand peaks in January, booking 12–18 months in advance is highly recommended
                    to secure preferred suites and itineraries.
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
                    <div className="tsa_stat_card_label">Daylight</div>
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
                  <div className="tsa_month_tagline">Peak Whale Watching &amp; Exceptional Wildlife</div>
                  <h3 className="tsa_month_title">February</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Peak humpback whale sightings</li>
                    <li><Check size={16} /> Frequent minke and orca encounters</li>
                    <li><Check size={16} /> Larger areas accessible due to reduced sea ice</li>
                    <li><Check size={16} /> Penguin chicks becoming active and independent</li>
                    <li><Check size={16} /> Stunning iceberg formations and golden-hour photography</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Photographers</span>
                    <span>Whale Enthusiasts</span>
                    <span>Returning Visitors</span>
                  </div>
                  <p className="tsa_month_note">
                    By February, penguin chicks are growing rapidly, whales are feeding in large numbers,
                    and sea ice has receded — often considered the most rewarding month for wildlife.
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
                    <div className="tsa_stat_card_label">Daylight</div>
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
                  <div className="tsa_month_tagline">Quiet, Peaceful &amp; Whale-Focused</div>
                  <h3 className="tsa_month_title">March</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Outstanding whale encounters</li>
                    <li><Check size={16} /> Spectacular sunsets and dramatic polar lighting</li>
                    <li><Check size={16} /> Fewer ships and visitors for an intimate atmosphere</li>
                    <li><Check size={16} /> Excellent wildlife photography</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Peaceful Voyages</span>
                    <span>Whale Watchers</span>
                    <span>Smaller Crowds</span>
                  </div>
                  <p className="tsa_month_note">
                    March marks the final weeks of the season. Temperatures begin to cool, and there
                    are fewer penguin chicks than earlier in the season, but whale rewards are significant.
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
                    <div className="tsa_stat_card_label">Daylight</div>
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

      {/* ================= VIDEO: A DAY ABOARD (NEW) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> EXPEDITION EXPERIENCE
            </div>
            <h2>Experience Antarctica Before You Go</h2>
            <p>Watch what a typical expedition day feels like—from scenic Drake Passage crossings and zodiac landings to unforgettable wildlife encounters and evenings aboard your expedition ship.</p>
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
              title="Life Aboard Expedition"
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
              "After more than 40 years in the travel industry and journeys to over 121 countries, I've
              learned that Antarctica isn't simply a destination — it's one of the few places on Earth
              that genuinely transforms how people see the world. Choosing the right sailing date is about
              matching the season to your personal travel goals, whether that's wildlife photography,
              whale watching, or experiencing untouched polar landscapes in complete comfort."
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

      {/* ================= WHY LUXURY TRAVELERS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Luxury Travelers Choose Antarctica</h2>
            <p>
              For discerning travelers, Antarctica offers something increasingly rare: genuine exclusivity.
              Only a limited number of visitors are permitted to explore each season under strict
              environmental regulations.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Spacious Suites</h4>
              <p>All-suite accommodations designed for comfort at the end of the world.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Fine Dining</h4>
              <p>Cuisine inspired by regional and international flavors.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expert Naturalists</h4>
              <p>Expedition teams leading zodiac landings and wildlife briefings.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Sustainable Travel</h4>
              <p>Practices aligned with Antarctic conservation standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WEATHER + WILDLIFE TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Weather &amp; Wildlife by Month</h2>
            <p>Weather varies by location, itinerary, and prevailing conditions.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Avg Temp</th>
                    <th>Daylight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>November</td><td>-5°C to 2°C</td><td>18–20 hrs</td></tr>
                  <tr><td>December</td><td>-2°C to 4°C</td><td>~24 hrs</td></tr>
                  <tr><td>January</td><td>0°C to 5°C</td><td>20–22 hrs</td></tr>
                  <tr><td>February</td><td>-1°C to 4°C</td><td>16–18 hrs</td></tr>
                  <tr><td>March</td><td>-5°C to 1°C</td><td>12–15 hrs</td></tr>
                </tbody>
              </table>
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
                  <tr><td>Humpback Whales</td><td>February–March</td></tr>
                  <tr><td>Orcas &amp; Minke Whales</td><td>January–March</td></tr>
                  <tr><td>Leopard Seals</td><td>December–March</td></tr>
                  <tr><td>Weddell Seals</td><td>November–February</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH MONTH IS RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Month Is Right for You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose November If You Want:</h4>
              <ul>
                <li><Check size={14} /> Untouched snowy landscapes</li>
                <li><Check size={14} /> Dramatic ice formations</li>
                <li><Check size={14} /> Quiet sailings</li>
                <li><Check size={14} /> Early-season photography</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose December If You Want:</h4>
              <ul>
                <li><Check size={14} /> Holiday travel</li>
                <li><Check size={14} /> Long daylight hours</li>
                <li><Check size={14} /> Active penguin colonies</li>
                <li><Check size={14} /> Family-friendly departures</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose January If You Want:</h4>
              <ul>
                <li><Check size={14} /> Warmest temperatures</li>
                <li><Check size={14} /> Maximum wildlife diversity</li>
                <li><Check size={14} /> Active expedition activities</li>
                <li><Check size={14} /> First-time Antarctica experience</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose February If You Want:</h4>
              <ul>
                <li><Check size={14} /> Whale watching</li>
                <li><Check size={14} /> Penguin chicks</li>
                <li><Check size={14} /> Peak wildlife photography</li>
                <li><Check size={14} /> Access to remote areas</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose March If You Want:</h4>
              <ul>
                <li><Check size={14} /> Peaceful voyages</li>
                <li><Check size={14} /> Incredible whales</li>
                <li><Check size={14} /> Smaller crowds</li>
                <li><Check size={14} /> Lower-season availability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LUXURY VS STANDARD ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Luxury Expedition Cruise vs Standard Expedition</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Luxury Expedition</th>
                  <th>Standard Expedition</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Suites</td><td>Spacious, premium accommodations</td><td>Smaller cabins</td></tr>
                <tr><td>Dining</td><td>Gourmet cuisine</td><td>Traditional buffet/service</td></tr>
                <tr><td>Guides</td><td>Expert naturalists &amp; specialists</td><td>Expedition staff</td></tr>
                <tr><td>Shore Excursions</td><td>Small groups</td><td>Larger groups</td></tr>
                <tr><td>Service</td><td>Personalized</td><td>Standard</td></tr>
                <tr><td>Wellness</td><td>Spa, fitness, wellness programs</td><td>Limited</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= COMMON MISTAKES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Mistakes to Avoid</h2>
            <p>Many first-time visitors make avoidable planning mistakes.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Waiting Too Long to Book</h4>
                <p>Luxury suites and preferred departures often sell out well in advance.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Choosing Based Only on Price</h4>
                <p>Ship size, guide quality, itinerary, and inclusions all significantly impact your journey.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Ignoring Wildlife Seasons</h4>
                <p>Different months offer different wildlife highlights. Matching your travel dates to your interests is essential.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Underestimating Packing Needs</h4>
                <p>Even in Antarctica's summer, layered clothing, waterproof gear, and proper footwear are vital.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Not Using a Polar Travel Specialist</h4>
                <p>Expert guidance helps you select the right ship, itinerary, and season while avoiding costly mistakes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS ANTARCTICA RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is Antarctica Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Luxury travelers</li>
                <li><Check size={14} /> Adventure seekers</li>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Nature photographers</li>
                <li><Check size={14} /> Couples celebrating special occasions</li>
                <li><Check size={14} /> Bucket-list travelers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers expecting traditional beach vacations</li>
                <li><X size={14} /> Those uncomfortable with cold climates</li>
                <li><X size={14} /> Guests seeking nightlife-focused cruises</li>
                <li><X size={14} /> Travelers with very limited mobility</li>
                <li><X size={14} /> Last-minute planners during peak season</li>
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
                What is the best month to visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>For most travelers, January and February offer the ideal balance of wildlife, relatively mild temperatures, and excellent expedition conditions. However, November is perfect for pristine landscapes, while March is exceptional for whale watching.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                When is Antarctica warmest? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January is generally the warmest month, with coastal temperatures often ranging from 0°C to 5°C (32°F to 41°F).</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What wildlife can I see in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Depending on the month and itinerary, you may see Gentoo, Adélie, and Chinstrap penguins, humpback and minke whales, orcas, leopard and Weddell seals, and numerous seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                How long should an Antarctica cruise be? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expeditions last 10–14 days, though extended itineraries including South Georgia and the Falkland Islands may range from 16–23 days.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is Antarctica worth the cost? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>For many travelers, Antarctica is a once-in-a-lifetime destination offering extraordinary wildlife, untouched landscapes, and a level of exclusivity unmatched by most travel experiences.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury expedition cruises often sell out 12 to 18 months in advance, especially for peak departures and premium suite categories.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What should I pack for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Essentials include a waterproof jacket, layered clothing, thermal base layers, waterproof gloves, a warm hat, polarized sunglasses, waterproof boots (often provided), and a camera with extra batteries.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Will I experience the Drake Passage? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most voyages from Ushuaia cross the Drake Passage. Travelers can also consider fly-cruise itineraries that reduce or eliminate this crossing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Is Antarctica safe to visit? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Licensed expedition operators follow strict international safety and environmental regulations established under the Antarctic Treaty System and IAATO guidelines.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Can children visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many luxury expedition cruises welcome children, although minimum age requirements vary by cruise line and itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                What is the best month for whale watching? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>February and March are widely considered the best months for observing humpback, minke, and orca whales.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Which itinerary is best for first-time visitors? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Antarctic Peninsula is the most popular itinerary, offering spectacular scenery, abundant wildlife, and a comprehensive introduction to the continent.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Do I need a visa for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Antarctica itself does not require a visa, but travelers must meet the entry requirements for the country from which their expedition departs, such as Argentina or Chile.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                What makes a luxury Antarctica expedition different? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury expeditions typically feature spacious suites, gourmet dining, personalized service, expert expedition teams, enrichment programs, and premium onboard amenities while maintaining a strong focus on exploration.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why should I use a luxury travel advisor for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>An experienced luxury travel advisor helps you select the right ship, itinerary, cabin category, travel dates, and additional arrangements, ensuring your expedition aligns with your goals and preferences.</p>
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
            Whether your dream is photographing towering icebergs in November, witnessing penguin colonies
            in December, exploring during January's mildest weather, or encountering feeding whales in
            February and March, our expedition specialists can help you choose the perfect journey.
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