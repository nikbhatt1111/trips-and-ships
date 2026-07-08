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
  Waves,
  Sparkles,
  Ship,
  Play,
} from "lucide-react";

/**
 * Is an Antarctica Cruise Worth It? — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * MEDIA ADDED IN THIS VERSION:
 *  1. HERO        — background video/image behind the nav + headline
 *  2. DAY-IN-LIFE — left/right split: timeline (left) + stacked photos (right)
 *  3. WILDLIFE    — inline playable video card below the compare columns
 * All placeholder URLs are marked below — swap for your own assets.
 */

const JSON_LD = `{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Organization",
      "@id":"https://www.tripsandships.com/#organization",
      "name":"Trips & Ships Luxury Travel",
      "url":"https://www.tripsandships.com",
      "logo":"https://www.tripsandships.com/logo.png"
    },
    {
      "@type":"TravelAgency",
      "@id":"https://www.tripsandships.com/#travelagency",
      "name":"Trips & Ships Luxury Travel",
      "url":"https://www.tripsandships.com",
      "priceRange":"$$$$",
      "areaServed":"Worldwide"
    },
    {
      "@type":"WebPage",
      "@id":"https://www.tripsandships.com/is-an-antarctica-cruise-worth-it",
      "url":"https://www.tripsandships.com/is-an-antarctica-cruise-worth-it",
      "name":"Is an Antarctica Cruise Worth It?",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" }
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"Is an Antarctica cruise worth the money?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Luxury Antarctica expeditions offer extraordinary wildlife, pristine landscapes, and unforgettable experiences that many travelers consider life-changing." }
        },
        {
          "@type":"Question",
          "name":"Why are Antarctica cruises expensive?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The cost reflects specialized expedition ships, expert crews, remote logistics, environmental regulations, and premium onboard experiences." }
        },
        {
          "@type":"Question",
          "name":"What is the best month to visit Antarctica?",
          "acceptedAnswer":{ "@type":"Answer", "text":"January and February offer the best balance of wildlife viewing, weather, and expedition conditions." }
        },
        {
          "@type":"Question",
          "name":"How long should an Antarctica cruise be?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury Antarctica cruises last 10–14 days, while extended itineraries can range from 16–23 days." }
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

export default function IsAntarcticaCruiseWorthIt() {
  const [theme, setTheme] = useState("light");
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

  const handlePlayVideo = () => {
    setVideoPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="tsa_page" data-theme={theme} ref={rootRef}>
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} floating />

      {/* ================= HERO + NAV ================= */}
      <header className="tsa_hero">
        {/* Background media layer — replace src with your own footage/photo */}
        <div className="tsa_hero_media">
          <video autoPlay muted loop playsInline poster="https://placehold.co/1600x900/0f1c2e/1c2f4a?text=Antarctica+Hero+Poster">
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
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
          <h1>Is an Antarctica Cruise Worth It?</h1>
          <p>
            Discover why Antarctica is one of the most extraordinary journeys on Earth. If you're wondering
            whether an Antarctica cruise is truly worth the investment, the answer for most luxury
            travelers is a resounding yes.
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
            <div className="tsa_ss_month">Wildlife</div>
            <div className="tsa_ss_best">Penguins, whales &amp; seals at close range, daily</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Scenery</div>
            <div className="tsa_ss_best">Glaciers, icebergs &amp; landscapes found nowhere else</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Exclusivity</div>
            <div className="tsa_ss_best">Strict visitor limits keep every landing intimate</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Comfort</div>
            <div className="tsa_ss_best">All-suite ships with gourmet dining &amp; wellness</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Impact</div>
            <div className="tsa_ss_best">Described by many as the most transformative trip they've taken</div>
          </div>
        </div>
      </div>

      {/* ================= QUICK ANSWER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: Is an Antarctica Cruise Worth It?</h2>
            <p>
              For travelers seeking extraordinary wildlife, pristine landscapes, exclusive experiences, and
              true adventure, an Antarctica cruise is absolutely worth it. Many travelers describe it as the
              most transformative journey they've ever taken.
            </p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Incredible wildlife encounters</div>
            <div className="tsa_chip"><Check size={16} /> Massive glaciers and icebergs</div>
            <div className="tsa_chip"><Check size={16} /> Remote destinations, very few visitors</div>
            <div className="tsa_chip"><Check size={16} /> Luxury expedition ships</div>
            <div className="tsa_chip"><Check size={16} /> Expert naturalists and guides</div>
            <div className="tsa_chip"><Check size={16} /> Once-in-a-lifetime photography</div>
          </div>
        </div>
      </section>

      {/* ================= UNLIKE ANYWHERE ELSE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY ANTARCTICA IS DIFFERENT
            </div>
            <h2>Unlike Anywhere Else on Earth</h2>
            <p>Unlike traditional cruise destinations, Antarctica has no cities, no shopping districts, no tourist attractions, and no crowds. Instead, every day is shaped by nature.</p>
            <p>
              You may spend one morning watching thousands of penguins caring for their chicks, an
              afternoon cruising alongside towering blue icebergs, and the evening observing humpback
              whales feeding beside your expedition ship.
            </p>
            <p>Every expedition is unique because weather, wildlife, and ice conditions constantly change — that unpredictability is part of what makes Antarctica unforgettable.</p>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">0</div>
              <div className="tsa_why_card_label">Cities, malls, or tourist attractions along the way</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">3</div>
              <div className="tsa_why_card_label">Distinct daily rhythms — morning landing, afternoon zodiac, evening lecture</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">∞</div>
              <div className="tsa_why_card_label">Ways each voyage differs, shaped by weather, wildlife &amp; ice</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT MAKES IT WORTH THE COST ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Makes Antarctica Worth the Cost?</h2>
            <p>Luxury Antarctica expeditions represent a significant investment, but travelers consistently say the value comes from experiences impossible to recreate anywhere else.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Fish size={20} /></div>
              <h4>Extraordinary Wildlife</h4>
              <p>Penguins, whales, seals and seabirds remarkably unconcerned by human presence.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Spectacular Scenery</h4>
              <p>Massive glaciers, floating blue icebergs, and endless polar vistas.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Exclusive Access</h4>
              <p>Strict environmental regulations keep landing groups small and intimate.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Luxury Meets Adventure</h4>
              <p>Spacious suites, gourmet dining, and wellness facilities alongside true exploration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= A DAY IN THE LIFE (TIMELINE + SPLIT MEDIA) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What You'll Experience Each Day</h2>
            <p>Every itinerary differs depending on weather and wildlife, but a typical expedition day may include:</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Morning</div>
                  <h4>Scenic Cruising &amp; Shore Landing</h4>
                  <p>Scenic cruising, whale sightings, and a guided shore landing led by expedition naturalists.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Afternoon</div>
                  <h4>Zodiac Cruise &amp; Wildlife Viewing</h4>
                  <p>Zodiac cruising, wildlife viewing, photography opportunities, and optional hiking.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Evening</div>
                  <h4>Recap, Lectures &amp; Fine Dining</h4>
                  <p>An expedition recap, expert lectures, fine dining, and relaxation in the observation lounge.</p>
                </div>
              </div>
              <p style={{ textAlign: "center", marginTop: 24, color: "var(--tsa-text-muted)", fontStyle: "italic" }}>
                No two days are ever the same.
              </p>
            </div>

            {/* Stacked photo frames — replace both src attributes with real photography */}
            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/Is_an_Antarctica_Cruise_Worth_It_2.jpg" alt="Zodiac shore landing" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/Is_an_Antarctica_Cruise_Worth_It_1.jpg" alt="Evening fine dining aboard ship" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LUXURY VS TRADITIONAL CRUISE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Luxury Expedition vs Traditional Cruise</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Luxury Expedition Cruise</th>
                  <th>Traditional Ocean Cruise</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Purpose</td><td>Exploration</td><td>Leisure &amp; entertainment</td></tr>
                <tr><td>Passenger Numbers</td><td>Small, intimate ships</td><td>Large vessels</td></tr>
                <tr><td>Shore Access</td><td>Frequent Zodiac landings</td><td>Limited or no landings</td></tr>
                <tr><td>Guides</td><td>Expedition experts &amp; naturalists</td><td>General shore excursion staff</td></tr>
                <tr><td>Wildlife Encounters</td><td>Daily opportunities</td><td>Minimal</td></tr>
                <tr><td>Dining</td><td>Gourmet cuisine</td><td>Standard cruise dining</td></tr>
                <tr><td>Flexibility</td><td>Itinerary adapts to conditions</td><td>Fixed schedule</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WORTH IT FOR WILDLIFE LOVERS (compare cols + video) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is Antarctica Worth It for Wildlife Lovers &amp; Photographers?</h2>
            <p>Absolutely — depending on the season, you'll witness an extraordinary range of Antarctic wildlife.</p>
          </div>
          <div className="tsa_compare_grid">
            <div className="tsa_compare_col lux">
              <h3><Fish size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Wildlife Highlights</h3>
              <div className="tsa_compare_row"><Check size={16} /> Penguin colonies — November–February</div>
              <div className="tsa_compare_row"><Check size={16} /> Penguin chicks — January–February</div>
              <div className="tsa_compare_row"><Check size={16} /> Humpback whales — February–March</div>
              <div className="tsa_compare_row"><Check size={16} /> Orcas — January–March</div>
              <div className="tsa_compare_row"><Check size={16} /> Leopard seals — December–March</div>
              <div className="tsa_compare_row"><Check size={16} /> Weddell seals — November–February</div>
            </div>
            <div className="tsa_compare_col trad">
              <h3><Camera size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Photography Highlights</h3>
              <div className="tsa_compare_row"><Check size={16} /> Giant blue icebergs</div>
              <div className="tsa_compare_row"><Check size={16} /> Endless snow-covered landscapes</div>
              <div className="tsa_compare_row"><Check size={16} /> Penguins at close range</div>
              <div className="tsa_compare_row"><Check size={16} /> Whales surfacing beside the ship</div>
              <div className="tsa_compare_row"><Check size={16} /> Golden polar light &amp; reflections</div>
            </div>
          </div>

          <div
            className="tsa_video_card" style={{ marginTop: 40 }}
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
              "After more than four decades helping travelers explore the world, Antarctica remains one of
              the destinations that consistently exceeds expectations. Clients often tell us it's not
              simply the best trip they've taken — it's the one that changed the way they see our planet.
              A luxury expedition offers the perfect balance of adventure, comfort, and meaningful
              exploration."
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

      {/* ================= WORD STRIP — HOW TRAVELERS DESCRIBE IT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Travelers Say Antarctica Is Worth Every Dollar</h2>
            <p>Clients frequently describe Antarctica in words like these:</p>
          </div>
          <div className="tsa_word_strip">
            <span>Life-changing</span>
            <span>Humbling</span>
            <span>Peaceful</span>
            <span>Inspiring</span>
            <span>Unlike anywhere else</span>
            <span>Better than expected</span>
          </div>
          <p style={{ textAlign: "center", marginTop: 28, color: "var(--tsa-text-muted)", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Unlike many luxury vacations, Antarctica isn't about checking into a beautiful hotel — it's
            about experiencing one of Earth's last true wildernesses. That emotional impact is difficult to
            measure, and impossible to forget.
          </p>
        </div>
      </section>

      {/* ================= COMMON CONCERNS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Concerns About Antarctica Cruises</h2>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Waves size={20} /></div>
              <h4>Is the Drake Passage Bad?</h4>
              <p>Crossings vary — some are calm, others rough. Many luxury ships feature advanced stabilizers, and fly-cruise options exist for those wishing to avoid it.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ThermometerSun size={20} /></div>
              <h4>Is It Too Cold?</h4>
              <p>Summer temperatures typically range from 0°C to 5°C (32°F to 41°F). With proper layering, most visitors stay comfortable.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Is It Physically Demanding?</h4>
              <p>Guests can choose easy Zodiac cruises, scenic walks, moderate hikes, or optional kayaking — no athletic ability required.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Will I Get Seasick?</h4>
              <p>Modern expedition ships feature advanced stabilizers, and most travelers manage well with seasickness medication or wristbands if needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO SHOULD VISIT (FIT GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who Should Visit Antarctica?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Ideal For</h3>
              <ul>
                <li><Check size={14} /> Luxury travelers</li>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Couples</li>
                <li><Check size={14} /> Retired travelers</li>
                <li><Check size={14} /> Adventure seekers</li>
                <li><Check size={14} /> Nature photographers</li>
                <li><Check size={14} /> Experienced cruisers</li>
                <li><Check size={14} /> Bucket-list travelers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers seeking nightlife</li>
                <li><X size={14} /> Beach vacations</li>
                <li><X size={14} /> Shopping destinations</li>
                <li><X size={14} /> Resort-style entertainment seekers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANNING YOUR EXPEDITION ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Planning Your Antarctica Expedition</h2>
            <p>To get the most from your journey, keep these essentials in mind.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Book Early</h4>
              <ul>
                <li><Check size={14} /> Luxury suites sell out 12–18 months ahead</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>November</h4>
              <ul>
                <li><Check size={14} /> Pristine landscapes</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>December</h4>
              <ul>
                <li><Check size={14} /> Penguin colonies</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>January</h4>
              <ul>
                <li><Check size={14} /> Warmest weather</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>February / March</h4>
              <ul>
                <li><Check size={14} /> Whale watching, quieter sailings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH TRIPS & SHIPS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book with Trips &amp; Ships Luxury Travel?</h2>
            <p>
              Planning Antarctica is about far more than selecting a cruise. Led by Angela Hughes' decades
              of luxury travel expertise, we create Antarctic expeditions tailored to each client's travel
              style and aspirations.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Compare Ships</h4>
              <p>We help you compare luxury expedition ships side by side.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Choose the Itinerary</h4>
              <p>Selecting the ideal route and travel season for your goals.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Coordinate Everything</h4>
              <p>Flights, hotels, travel protection, and special celebrations.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Personalize Every Detail</h4>
              <p>An expedition tailored to your travel style and aspirations.</p>
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
                Is an Antarctica cruise really worth the money? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. For many travelers, an Antarctica cruise is a once-in-a-lifetime experience that offers extraordinary wildlife, breathtaking landscapes, and a level of exclusivity few destinations can match.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Why are Antarctica cruises so expensive? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Costs reflect specialized expedition ships, highly trained crews, strict environmental regulations, remote logistics, expert naturalists, and luxury onboard accommodations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What makes Antarctica different from other cruise destinations? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Unlike traditional cruises, Antarctica has no cities, shopping districts, or tourist attractions — instead you'll experience untouched wilderness, towering glaciers, and daily Zodiac excursions led by expedition experts.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                What wildlife can I expect to see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Depending on season and itinerary, you may encounter Gentoo, Adélie, and Chinstrap penguins, humpback and minke whales, orcas, leopard and Weddell seals, elephant seals, albatrosses, petrels, and seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What is the best month to visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>January and February are generally considered the best months because they offer mild temperatures, abundant wildlife, penguin chicks, and excellent whale-watching opportunities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                How long should an Antarctica cruise be? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most first-time travelers choose a 10–14-day luxury expedition. Longer itineraries of 16–23 days often include South Georgia and the Falkland Islands.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Is Antarctica suitable for first-time expedition travelers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Modern luxury expedition ships welcome first-time visitors with comfortable accommodations, expert guides, educational programs, and activities suited to different fitness levels.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is the Drake Passage really as rough as people say? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Drake Passage can range from calm to rough depending on conditions. Many luxury ships feature advanced stabilizers, and fly-cruise itineraries are available for travelers who prefer to avoid it.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Is Antarctica too cold for a comfortable vacation? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Not usually. During the Antarctic summer, coastal temperatures generally range from 0°C to 5°C (32°F to 41°F). With proper layering and waterproof gear, most travelers stay comfortable.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is an Antarctica cruise physically demanding? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expeditions accommodate a wide range of activity levels — from easy Zodiac cruises and gentle shore walks to moderate hikes and optional kayaking.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Is Antarctica safe to visit? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Licensed expedition operators follow strict international safety standards and environmental regulations under the Antarctic Treaty System and IAATO guidelines.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Is Antarctica a good destination for photographers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Antarctica is considered one of the world's premier photography destinations, with spectacular opportunities to capture penguins, whales, seals, glaciers, and dramatic polar light.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Luxury Antarctica cruises often sell out 12–18 months in advance, especially during the peak travel season from December through February.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Who should consider an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Antarctica is ideal for luxury travelers, wildlife enthusiasts, photographers, adventure seekers, couples celebrating special occasions, experienced cruisers, and anyone seeking one of the world's last great wildernesses.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why should I use a luxury travel advisor? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A luxury travel advisor helps you compare expedition ships, choose the best itinerary and travel season, secure preferred accommodations, and coordinate every detail of your journey.</p>
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
            Many travelers spend years dreaming about visiting the White Continent — and nearly all agree
            that once they arrive, it exceeds every expectation. Our specialists are here to help you
            choose the perfect voyage.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Explore Luxury Expedition Cruises</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}