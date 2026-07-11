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
  Ship,
  Star,
  Microscope,
  Utensils,
  Leaf,
} from "lucide-react";

/**
 * HX Reviews — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: Image/video sources below are placeholders — swap the URLs
 * in PLACEHOLDER_IMAGES / PLACEHOLDER_VIDEO for real production assets.
 */

const PLACEHOLDER_IMAGES = {
  heroTall: "https://placehold.co/800x920/0f1c2e/8fb4e8?text=HX+Expedition+Ship",
  gridA: "https://placehold.co/640x420/16243a/8fb4e8?text=Expedition+Team+Lecture",
  gridB: "https://placehold.co/640x420/1c2f4a/8fb4e8?text=Guests+on+Zodiac",
  gridC: "https://placehold.co/640x420/101b2c/8fb4e8?text=Science+Center+Exhibit",
  videoPoster: "https://placehold.co/1280x720/0f1c2e/8fb4e8?text=Watch%3A+Guest+Reviews+of+HX",
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
      "description":"Luxury Cruise & Expedition Specialist with over 40 years of experience and visits to more than 121 countries."
    },
    {
      "@type":"WebPage",
      "@id":"https://www.tripsandships.com/hx-reviews",
      "url":"https://www.tripsandships.com/hx-reviews",
      "name":"HX Reviews",
      "headline":"HX Reviews | Real Guest Experiences, Ratings & Expert Insights",
      "description":"Read comprehensive HX Reviews covering ships, expedition teams, cabins, dining, excursions, destinations, and guest experiences.",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":{ "@type":"Cruise", "name":"HX Expeditions" }
    },
    {
      "@type":"AggregateRating",
      "@id":"https://www.tripsandships.com/hx-reviews#aggregaterating",
      "itemReviewed":{ "@type":"Brand", "name":"HX Expeditions" },
      "ratingValue":"4.8",
      "bestRating":"5",
      "worstRating":"1",
      "ratingCount":"1000"
    },
    {
      "@type":"Review",
      "@id":"https://www.tripsandships.com/hx-reviews#review",
      "author":{ "@id":"https://www.tripsandships.com/#angelahughes" },
      "publisher":{ "@id":"https://www.tripsandships.com/#organization" },
      "itemReviewed":{ "@type":"Brand", "name":"HX Expeditions" },
      "reviewRating":{ "@type":"Rating", "ratingValue":"5", "bestRating":"5" },
      "reviewBody":"HX Expeditions consistently earns high praise for its expert expedition teams, immersive wildlife encounters, educational programs, sustainable approach to exploration, and thoughtfully designed expedition ships."
    },
    {
      "@type":"FAQPage",
      "@id":"https://www.tripsandships.com/hx-reviews#faq",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"Are HX reviews generally positive?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. HX receives consistently strong reviews for its expedition teams, wildlife experiences, educational programs, and destination-focused itineraries." }
        },
        {
          "@type":"Question",
          "name":"What do guests like most about HX?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Guests most frequently praise the Expedition Team, Zodiac excursions, wildlife encounters, Science Center, and educational lectures." }
        },
        {
          "@type":"Question",
          "name":"Are HX ships luxurious?",
          "acceptedAnswer":{ "@type":"Answer", "text":"HX offers premium expedition ships with modern Scandinavian design, although the emphasis is on exploration rather than traditional luxury cruising." }
        },
        {
          "@type":"Question",
          "name":"Is the food good on HX?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most guests rate the dining experience highly, praising fresh ingredients, international cuisine, and attentive service." }
        },
        {
          "@type":"Question",
          "name":"Is the Expedition Team highly rated?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Expedition leaders, scientists, and naturalists consistently receive excellent reviews for their expertise and professionalism." }
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

export default function HXReviews() {
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState(0); // 0=Expedition Experience .. 4=Dining & Science Center
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
            <Star size={14} /> HX REVIEWS
          </div>
          <h1>HX Reviews</h1>
          <p>
            Choosing an expedition cruise is a significant investment, and reading authentic reviews is
            one of the best ways to determine whether HX Expeditions is the right fit for your travel
            style. Known for immersive expeditions, expert-led exploration, innovative hybrid ships, and
            science-focused voyages, HX consistently earns praise from real travelers.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Read HX Cruise Reviews <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an HX Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expedition Team</div>
            <div className="tsa_ss_best">Scientists &amp; naturalists, consistently the highest praise</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Wildlife</div>
            <div className="tsa_ss_best">Encounters guests say exceed expectations</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Science Center</div>
            <div className="tsa_ss_best">Interactive exhibits and daily lectures</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Dining</div>
            <div className="tsa_ss_best">Fresh, flexible, regionally inspired cuisine</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Sustainability</div>
            <div className="tsa_ss_best">Hybrid ships and responsible exploration</div>
          </div>
        </div>
      </div>

      {/* ================= WHAT GUESTS LOVE MOST ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHAT GUESTS LOVE MOST
            </div>
            <h2>Are HX Expeditions Worth It?</h2>
            <p>
              For travelers seeking immersive expedition travel rather than traditional cruising, HX
              consistently receives high praise for its expert expedition teams, wildlife encounters,
              educational programs, onboard Science Centers, and destination-focused itineraries.
            </p>
            <p>
              At Trips &amp; Ships Luxury Travel, we combine decades of luxury cruise expertise with real
              traveler feedback to help you compare itineraries, ships, and destinations so you can book
              with confidence.
            </p>
            <p>Guests especially appreciate the all-inclusive expedition experience, while noting that weather-dependent itineraries are a natural part of polar exploration.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Outstanding Expedition Team</div>
              <div className="tsa_chip"><Check size={16} /> Incredible wildlife encounters</div>
              <div className="tsa_chip"><Check size={16} /> Small expedition groups</div>
              <div className="tsa_chip"><Check size={16} /> Comfortable modern ships</div>
              <div className="tsa_chip"><Check size={16} /> Excellent food</div>
              <div className="tsa_chip"><Check size={16} /> Sustainable expedition travel</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">4.8 / 5</div>
              <div className="tsa_why_card_label">Aggregate guest rating across review platforms</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1,000+</div>
              <div className="tsa_why_card_label">Guest reviews contributing to that rating</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">⭐⭐⭐⭐⭐</div>
              <div className="tsa_why_card_label">Overall guest satisfaction rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GALLERY ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> LIFE ABOARD HX
            </div>
            <h2>What Guests Are Talking About</h2>
            <p>
              From expert-led lectures to close wildlife encounters, these are the moments guests mention
              most often in their reviews.
            </p>
          </div>
          <div className="tsa_media_grid">
            <div className="tsa_media_card tall">
              <img src="/assets/HX_Reviews_1.jpg" alt="HX expedition ship navigating polar waters" />
              <div className="tsa_media_caption">Guests consistently praise HX's modern, hybrid-powered ships</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Reviews_2.jpg" alt="Expedition team member giving a lecture" />
              <div className="tsa_media_caption">The Expedition Team is one of the most highly rated features</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Reviews_3.jpg" alt="Guests on a Zodiac excursion spotting wildlife" />
              <div className="tsa_media_caption">Wildlife encounters frequently exceed guest expectations</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Reviews_4.jpg" alt="Guests exploring the onboard Science Center" />
              <div className="tsa_media_caption">The Science Center adds significant educational value</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Reviews_5.jpg" alt="Table set with fresh regional cuisine aboard HX" />
              <div className="tsa_media_caption">Dining reviews highlight fresh, flexible, regional menus</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Reviews at a Glance</h2>
            <p>A quick reference for how guests rate each part of the HX expedition experience.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Review Category</th>
                  <th>Overall Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Expedition Experience</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Expedition Team</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Wildlife Encounters</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Educational Programs</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Science Center</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Dining</td><td>⭐⭐⭐⭐☆</td></tr>
                <tr><td>Cabins &amp; Suites</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Sustainability</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Value for Expedition Travel</td><td>⭐⭐⭐⭐⭐</td></tr>
                <tr><td>Overall Guest Satisfaction</td><td>⭐⭐⭐⭐⭐</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHY HX EARNS STRONG REVIEWS (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why HX Earns Consistently Strong Reviews</h2>
            <p>Across multiple review platforms, these are the categories guests mention most often.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Expedition Experience</h4>
              <p>Frequent Zodiac operations, flexible itineraries, and daily shore landings.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Expedition Team</h4>
              <p>Marine biologists, naturalists, and historians combining expertise with approachable guidance.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Fish size={20} /></div>
              <h4>Wildlife Encounters</h4>
              <p>Penguins, whales, polar bears, and seals frequently described as exceeding expectations.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Microscope size={20} /></div>
              <h4>Science Center</h4>
              <p>Interactive exhibits, daily lectures, and citizen science guests describe as a highlight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEW CATEGORY EXPLORER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Category-by-Category Reviews</h2>
            <p>Select a category to explore what guests say most often.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeCategory === 0 ? "active" : ""}`} onClick={() => setActiveCategory(0)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Expedition Experience</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 1 ? "active" : ""}`} onClick={() => setActiveCategory(1)}>
                <Users size={18} /> <span className="tsa_month_tab_label">Expedition Team</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 2 ? "active" : ""}`} onClick={() => setActiveCategory(2)}>
                <Fish size={18} /> <span className="tsa_month_tab_label">Wildlife</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 3 ? "active" : ""}`} onClick={() => setActiveCategory(3)}>
                <Ship size={18} /> <span className="tsa_month_tab_label">Ship &amp; Cabins</span>
              </button>
              <button className={`tsa_month_tab ${activeCategory === 4 ? "active" : ""}`} onClick={() => setActiveCategory(4)}>
                <Utensils size={18} /> <span className="tsa_month_tab_label">Dining &amp; Science Center</span>
              </button>
            </div>

            {activeCategory === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Where HX Truly Stands Apart</div>
                  <h3 className="tsa_month_title">Expedition Experience</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Frequent Zodiac operations and daily shore landings</li>
                    <li><Check size={16} /> Expert wildlife spotting and glacier cruising</li>
                    <li><Check size={16} /> Flexible itineraries adapted for weather and wildlife</li>
                    <li><Check size={16} /> Ice navigation and small expedition groups</li>
                    <li><Check size={16} /> Adventure-focused daily activities</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Adventure Seekers</span>
                    <span>Flexible Travelers</span>
                    <span>First-Time Expeditioners</span>
                  </div>
                  <p className="tsa_month_note">
                    Rather than following fixed cruise schedules, expedition leaders continuously adapt
                    the itinerary to maximize wildlife sightings and favorable conditions.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Star size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐⭐</div>
                    <div className="tsa_stat_card_label">Guest Rating</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Compass size={22} />
                    <div className="tsa_stat_card_value">Daily</div>
                    <div className="tsa_stat_card_label">Zodiac Operations</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "98%" }} /><div className="tsa_bar_label">Exp.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "97%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Wldlf</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "82%" }} /><div className="tsa_bar_label">Dine</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Highest Praise From Travelers</div>
                  <h3 className="tsa_month_title">Expedition Team</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Marine biologists, naturalists &amp; historians</li>
                    <li><Check size={16} /> Geologists, ornithologists &amp; professional photographers</li>
                    <li><Check size={16} /> Friendly personalities and outstanding knowledge</li>
                    <li><Check size={16} /> Personalized guidance during excursions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Curious Travelers</span>
                    <span>Lifelong Learners</span>
                    <span>Wildlife Enthusiasts</span>
                  </div>
                  <p className="tsa_month_note">
                    Many travelers describe the Expedition Team as the highlight of their voyage because
                    they combine scientific expertise with approachable, engaging presentations.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Star size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐⭐</div>
                    <div className="tsa_stat_card_label">Guest Rating</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Users size={22} />
                    <div className="tsa_stat_card_value">Highlight</div>
                    <div className="tsa_stat_card_label">Most-Mentioned Feature</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "98%" }} /><div className="tsa_bar_label">Exp.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "97%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Wldlf</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "82%" }} /><div className="tsa_bar_label">Dine</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Encounters That Exceed Expectations</div>
                  <h3 className="tsa_month_title">Wildlife Experience</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Penguins, whales, seals &amp; puffins</li>
                    <li><Check size={16} /> Polar bears, walrus &amp; Arctic foxes (Arctic voyages)</li>
                    <li><Check size={16} /> Albatrosses and other seabirds</li>
                    <li><Check size={16} /> Unpredictable, one-of-a-kind sightings every voyage</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Enthusiasts</span>
                    <span>Photographers</span>
                    <span>Nature Lovers</span>
                  </div>
                  <p className="tsa_month_note">
                    Because wildlife is unpredictable, every expedition is unique, making each voyage a
                    one-of-a-kind experience according to guest reviews.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Star size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐⭐</div>
                    <div className="tsa_stat_card_label">Guest Rating</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Fish size={22} />
                    <div className="tsa_stat_card_value">Unpredictable</div>
                    <div className="tsa_stat_card_label">By Design</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "98%" }} /><div className="tsa_bar_label">Exp.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "97%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Wldlf</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "82%" }} /><div className="tsa_bar_label">Dine</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Modern Scandinavian Design</div>
                  <h3 className="tsa_month_title">Ship &amp; Cabin Reviews</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Comfortable lounges and large observation decks</li>
                    <li><Check size={16} /> Quiet hybrid technology and wellness facilities</li>
                    <li><Check size={16} /> Comfortable beds, spacious bathrooms &amp; large windows</li>
                    <li><Check size={16} /> Excellent storage and daily housekeeping</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Comfort-Focused Travelers</span>
                    <span>Design Enthusiasts</span>
                    <span>Sustainability-Minded Guests</span>
                  </div>
                  <p className="tsa_month_note">
                    Hybrid-powered vessels such as MS Roald Amundsen and MS Fridtjof Nansen are
                    particularly recognized for contemporary amenities and environmentally conscious design.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Star size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐⭐</div>
                    <div className="tsa_stat_card_label">Guest Rating</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Ship size={22} />
                    <div className="tsa_stat_card_value">Hybrid</div>
                    <div className="tsa_stat_card_label">Ship Technology</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "98%" }} /><div className="tsa_bar_label">Exp.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "97%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Wldlf</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "90%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "82%" }} /><div className="tsa_bar_label">Dine</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Consistently Positive Feedback</div>
                  <h3 className="tsa_month_title">Dining &amp; Science Center</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Fresh ingredients and regional specialties</li>
                    <li><Check size={16} /> Vegetarian, vegan &amp; flexible dining options</li>
                    <li><Check size={16} /> Interactive exhibits and daily lectures</li>
                    <li><Check size={16} /> Photography workshops and citizen science</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Foodies</span>
                    <span>Lifelong Learners</span>
                    <span>Families</span>
                  </div>
                  <p className="tsa_month_note">
                    Meal service accommodates the changing expedition schedule, while the Science Center
                    adds significant educational value guests frequently highlight in reviews.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Star size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐☆</div>
                    <div className="tsa_stat_card_label">Dining Guest Rating</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Microscope size={22} />
                    <div className="tsa_stat_card_value">⭐⭐⭐⭐⭐</div>
                    <div className="tsa_stat_card_label">Science Center Rating</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "98%" }} /><div className="tsa_bar_label">Exp.</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "97%" }} /><div className="tsa_bar_label">Team</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Wldlf</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Ship</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "82%" }} /><div className="tsa_bar_label">Dine</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= VIDEO: GUEST REVIEWS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> IN THEIR OWN WORDS
            </div>
            <h2>Hear From HX Guests</h2>
            <p>Watch travelers share what stood out most about their HX expedition — from the wildlife to the expedition team to life aboard a hybrid-powered ship.</p>
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
                  ? "https://www.youtube.com/embed/x4hGr1wo1yQ?si=ah9GIW78NCR9KEkV"
                  : "https://www.youtube.com/embed/x4hGr1wo1yQ?si=ah9GIW78NCR9KEkV"
              }
              title="Guest Reviews of HX Expeditions"
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
              "The reviews we hear most often from our clients focus on the people — the expedition team,
              scientists, crew, and fellow travelers. Guests return home talking about unforgettable
              wildlife encounters, fascinating lectures, and experiences they simply couldn't have had on
              a conventional cruise. Setting the right expectations before departure is the key to an
              exceptional expedition, and that's exactly where our expertise makes a difference."
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
            <h2>Why Book Your HX Expedition with Trips &amp; Ships Luxury Travel?</h2>
            <p>
              We match every traveler with the HX voyage that best fits their travel style and expectations.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Compare Ships &amp; Destinations</h4>
              <p>We help you compare HX ships and destinations side by side.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Choose the Best Itinerary</h4>
              <p>We help you select the itinerary and cabin that fit your travel style.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Understand Inclusions</h4>
              <p>We explain exactly what's included so there are no surprises onboard.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Prepare You Fully</h4>
              <p>Flights, travel protection, and expectations, all coordinated in advance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FULL RATINGS + WILDLIFE TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Full Ratings Breakdown &amp; Popular Wildlife Sightings</h2>
            <p>A closer look at how guests rate each category and which wildlife they mention most.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Expedition Experience</td><td>⭐⭐⭐⭐⭐</td></tr>
                  <tr><td>Expedition Team</td><td>⭐⭐⭐⭐⭐</td></tr>
                  <tr><td>Wildlife Encounters</td><td>⭐⭐⭐⭐⭐</td></tr>
                  <tr><td>Science Center</td><td>⭐⭐⭐⭐⭐</td></tr>
                  <tr><td>Dining</td><td>⭐⭐⭐⭐☆</td></tr>
                  <tr><td>Sustainability</td><td>⭐⭐⭐⭐⭐</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Wildlife</th>
                    <th>Where Guests See Them</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Penguins</td><td>Antarctica</td></tr>
                  <tr><td>Whales</td><td>Antarctica &amp; Arctic</td></tr>
                  <tr><td>Polar Bears</td><td>Arctic</td></tr>
                  <tr><td>Walrus</td><td>Arctic</td></tr>
                  <tr><td>Puffins</td><td>Arctic</td></tr>
                  <tr><td>Albatrosses</td><td>Southern Ocean</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT MATTERS MOST TO YOU (CHOOSE GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Reviews Matter Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Focus on the Expedition Team If You Want:</h4>
              <ul>
                <li><Check size={14} /> Expert-led lectures and guidance</li>
                <li><Check size={14} /> Personalized wildlife spotting</li>
                <li><Check size={14} /> Approachable, engaging scientists</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Focus on Wildlife If You Want:</h4>
              <ul>
                <li><Check size={14} /> Once-in-a-lifetime sightings</li>
                <li><Check size={14} /> Penguins, whales &amp; polar bears</li>
                <li><Check size={14} /> Unpredictable, unique voyages</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Focus on Comfort If You Want:</h4>
              <ul>
                <li><Check size={14} /> Modern Scandinavian design</li>
                <li><Check size={14} /> Quiet hybrid-powered ships</li>
                <li><Check size={14} /> Spacious Expedition Suites</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Focus on Learning If You Want:</h4>
              <ul>
                <li><Check size={14} /> Daily Science Center lectures</li>
                <li><Check size={14} /> Photography workshops</li>
                <li><Check size={14} /> Citizen science participation</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Focus on Value If You Want:</h4>
              <ul>
                <li><Check size={14} /> All-inclusive expedition fare</li>
                <li><Check size={14} /> Included Zodiac excursions</li>
                <li><Check size={14} /> Strong overall guest satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HX VS TRADITIONAL CRUISE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Expeditions vs Traditional Cruising, According to Reviews</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>HX Expeditions</th>
                  <th>Traditional Cruise</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Focus</td><td>Exploration &amp; education</td><td>Entertainment &amp; leisure</td></tr>
                <tr><td>Ships</td><td>Hybrid-powered, small expedition vessels</td><td>Large entertainment-focused ships</td></tr>
                <tr><td>Guides</td><td>Scientists &amp; naturalists</td><td>General cruise staff</td></tr>
                <tr><td>Itinerary</td><td>Flexible, weather- and wildlife-driven</td><td>Fixed schedule</td></tr>
                <tr><td>Excursions</td><td>Daily Zodiac landings included</td><td>Optional, often at extra cost</td></tr>
                <tr><td>Sustainability</td><td>Hybrid technology, citizen science</td><td>Varies by operator</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= COMMON MISCONCEPTIONS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Misconceptions About HX Reviews</h2>
            <p>Setting realistic expectations helps travelers get the most from an HX expedition.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Expecting Entertainment-Focused Cruising</h4>
                <p>HX is educational and adventure-focused rather than entertainment-focused — reviews consistently reflect this.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Assuming Wi-Fi Will Be Fast Everywhere</h4>
                <p>Complimentary Wi-Fi is included, but speeds vary in remote polar regions.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Assuming All Activities Are Included</h4>
                <p>Optional activities such as kayaking may require an additional fee on select voyages.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Expecting a Fixed Itinerary</h4>
                <p>Expedition schedules may change because of weather, sea ice, or wildlife conditions.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Overlooking Pre-Cruise Communication</h4>
                <p>Some reviews note pre-cruise communication as an area for improvement — working with a specialist helps close that gap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO WILL LOVE HX ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who Will Love HX Expeditions?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Wildlife and nature lovers</li>
                <li><Check size={14} /> Photographers</li>
                <li><Check size={14} /> Curious, lifelong learners</li>
                <li><Check size={14} /> Adventure seekers</li>
                <li><Check size={14} /> Science-minded travelers</li>
                <li><Check size={14} /> Small-group exploration fans</li>
                <li><Check size={14} /> Responsible travel advocates</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Guests wanting entertainment-focused cruising</li>
                <li><X size={14} /> Travelers requiring a guaranteed fixed itinerary</li>
                <li><X size={14} /> Those expecting nightlife-focused evenings</li>
                <li><X size={14} /> Guests requiring high-speed Wi-Fi everywhere</li>
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
                Are HX reviews generally positive? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. HX receives consistently strong reviews for its expedition teams, wildlife experiences, educational programs, and destination-focused itineraries.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What do guests like most about HX? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Expedition Team, Zodiac excursions, wildlife encounters, Science Center, and educational lectures are among the most frequently praised features.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are HX ships luxurious? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX offers premium expedition ships with modern Scandinavian design, though the focus is on exploration rather than ultra-luxury amenities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Is the food good on HX? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most guests rate the dining experience highly, with praise for fresh ingredients, international cuisine, and attentive service.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is the Expedition Team highly rated? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition leaders, scientists, and naturalists consistently receive excellent reviews for their expertise and enthusiasm.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are shore excursions included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most Zodiac cruises and guided shore landings are included as part of the expedition fare.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are itineraries guaranteed? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Expedition itineraries may change because of weather, sea ice, or wildlife conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is HX suitable for first-time expedition travelers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many guests choose HX for their first expedition because of its balance of comfort and adventure.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Is Wi-Fi available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Complimentary Wi-Fi is included, although speeds vary in remote regions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are HX ships environmentally friendly? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX is recognized for hybrid-powered ships, sustainability initiatives, and citizen science programs.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Is expedition cruising physically demanding? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most activities are accessible to travelers with moderate mobility, though requirements vary by itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Is HX family-friendly? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Some itineraries welcome families, but most guests are adults seeking educational and adventure-focused travel.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are optional activities available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Experiences such as kayaking or camping may be available on select voyages for an additional fee.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                What destinations receive the highest reviews? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Antarctica, Greenland, the Arctic, Alaska, and the Galápagos are consistently among the highest-rated HX destinations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists provide personalized recommendations, explain itinerary differences, help you select the right ship and cabin, and support you before, during, and after your expedition.</p>
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
            Thousands of travelers have chosen HX for unforgettable expeditions to Antarctica, the Arctic,
            Greenland, Alaska, the Galápagos, and beyond. Let Trips &amp; Ships Luxury Travel help you select
            the perfect itinerary and plan every detail of your next adventure.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Compare HX Cruises</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}