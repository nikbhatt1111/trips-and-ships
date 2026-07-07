import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Anchor,
  Waves,
  Camera,
  Users,
  Compass,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

/**
 * Zodiac Landings Explained — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 */

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
      "@id":"https://www.tripsandships.com/zodiac-landings",
      "url":"https://www.tripsandships.com/zodiac-landings",
      "name":"Zodiac Landings Explained",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Zodiac Landings Explained",
      "primaryImageOfPage":"https://www.tripsandships.com/images/zodiac-landings.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Zodiac Landings Explained", "item":"https://www.tripsandships.com/zodiac-landings" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is a Zodiac landing?",
          "acceptedAnswer":{ "@type":"Answer", "text":"A Zodiac landing is a guided excursion that transports passengers between an expedition ship and Antarctica's shore using a small inflatable boat." }
        },
        {
          "@type":"Question",
          "name":"Are Zodiac landings safe?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. They are conducted by experienced expedition staff following strict safety procedures and weather assessments." }
        },
        {
          "@type":"Question",
          "name":"What is the difference between a wet and dry landing?",
          "acceptedAnswer":{ "@type":"Answer", "text":"A wet landing requires stepping into shallow water before reaching shore, while a dry landing allows passengers to step directly onto land." }
        },
        {
          "@type":"Question",
          "name":"What should I wear for a Zodiac excursion?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Wear waterproof outer layers, insulated clothing, gloves, a warm hat, and waterproof boots, which are often provided by the expedition operator." }
        },
        {
          "@type":"Question",
          "name":"How many Zodiac excursions are included on an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury expedition cruises aim to offer one or two Zodiac excursions or shore landings each day, weather permitting." }
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

export default function ZodiacLandingsExplained() {
  const [theme, setTheme] = useState("light");
  const [activeStep, setActiveStep] = useState(1); // 0=Briefing .. 4=Exploration
  const [openFaq, setOpenFaq] = useState({});
  const rootRef = useScrollReveal();

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
            <Anchor size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Zodiac Landings Explained</h1>
          <p>
            One of the defining experiences of any Antarctica expedition is stepping into a Zodiac — a
            small, inflatable expedition boat that brings you closer to the White Continent than a
            traditional cruise ship ever could. Here's exactly what to expect.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Plan Your Antarctica Expedition <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_season_strip tsa_reveal">
        <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Shore Landings</div>
            <div className="tsa_ss_best">Walk on Antarctica, visit colonies, guided hikes</div>
        </div>

        <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Scenic Cruises</div>
            <div className="tsa_ss_best">Ice-filled bays, glacier fronts, iceberg photography</div>
        </div>

        <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Wildlife Excursions</div>
            <div className="tsa_ss_best">Whales, seals and penguins at water level</div>
        </div>

        <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expert Expedition Guides</div>
            <div className="tsa_ss_best">Naturalist-led excursions with fascinating Antarctic insights</div>
        </div>

        <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Photography Opportunities</div>
            <div className="tsa_ss_best">Capture glaciers, wildlife and dramatic polar landscapes</div>
        </div>
    </div>

      {/* ================= WHAT IS A ZODIAC LANDING ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHAT IS A ZODIAC LANDING?
            </div>
            <h2>Your Gateway to the White Continent</h2>
            <p>
              A Zodiac is a durable inflatable boat powered by an outboard motor and operated by trained
              expedition staff. These boats are specially designed to reach remote landing sites, navigate
              through floating ice, access shallow beaches, and transport guests safely between the ship
              and shore.
            </p>
            <p>
              Without Zodiacs, most Antarctica expeditions simply wouldn't be possible. At Trips &amp;
              Ships Luxury Travel, we help travelers understand exactly what to expect so they can enjoy
              every Zodiac adventure with confidence.
            </p>
            <p>For many travelers, Zodiac excursions become the highlight of the entire expedition.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Step onto the Antarctic continent</div>
              <div className="tsa_chip"><Check size={16} /> Visit penguin colonies</div>
              <div className="tsa_chip"><Check size={16} /> Cruise among icebergs</div>
              <div className="tsa_chip"><Check size={16} /> Observe whales &amp; seals</div>
              <div className="tsa_chip"><Check size={16} /> Explore remote bays</div>
              <div className="tsa_chip"><Check size={16} /> Access historic research stations</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">5–20min</div>
              <div className="tsa_why_card_label">Typical Zodiac ride time to a landing site</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1–3hrs</div>
              <div className="tsa_why_card_label">Average length of a shore landing or scenic cruise</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1–2</div>
              <div className="tsa_why_card_label">Zodiac excursions typically included each day</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Are Zodiac Landings?</h2>
            <p>
              Zodiac landings are guided excursions that transport passengers from their expedition ship
              to Antarctica's shores or through icy waterways — the closest and most immersive way to
              experience the continent.
            </p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>You'll Use a Zodiac To</th>
                  <th>What It Delivers</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Step onto Antarctica</td><td>Guided shore landings on the continent itself</td></tr>
                <tr><td>Visit penguin colonies</td><td>Close, respectful wildlife encounters</td></tr>
                <tr><td>Cruise among icebergs</td><td>Water-level scenery and photography</td></tr>
                <tr><td>Observe whales and seals</td><td>Quiet approaches that don't disturb wildlife</td></tr>
                <tr><td>Explore remote bays</td><td>Access places larger ships cannot reach</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHY SPECIAL (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Are Zodiac Excursions So Special?</h2>
            <p>Unlike large cruise ships that remain offshore, Zodiacs let you experience Antarctica from water level.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Waves size={20} /></div>
              <h4>Hear the Ice</h4>
              <p>Glaciers cracking in the distance become part of the experience.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Watch Penguins Porpoise</h4>
              <p>See penguins move through the water right alongside the boat.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Navigate Narrow Channels</h4>
              <p>Weave between icebergs no larger vessel could enter.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Reach Remote Places</h4>
              <p>Access landing sites inaccessible to larger ships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS: STEP EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Happens During a Zodiac Landing?</h2>
            <p>Select a step to see what to expect, from safety briefing to guided exploration ashore.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeStep === 0 ? "active" : ""}`} onClick={() => setActiveStep(0)}>
                <ShieldCheck size={18} /> <span className="tsa_month_tab_label">Safety Briefing</span>
              </button>
              <button className={`tsa_month_tab ${activeStep === 1 ? "active" : ""}`} onClick={() => setActiveStep(1)}>
                <Anchor size={18} /> <span className="tsa_month_tab_label">Boarding</span>
              </button>
              <button className={`tsa_month_tab ${activeStep === 2 ? "active" : ""}`} onClick={() => setActiveStep(2)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Cruise to Shore</span>
              </button>
              <button className={`tsa_month_tab ${activeStep === 3 ? "active" : ""}`} onClick={() => setActiveStep(3)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Landing</span>
              </button>
              <button className={`tsa_month_tab ${activeStep === 4 ? "active" : ""}`} onClick={() => setActiveStep(4)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">Exploration</span>
              </button>
            </div>

            {activeStep === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Before You Board</div>
                  <h3 className="tsa_month_title">Step 1: Safety Briefing</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Boarding procedures explained step by step</li>
                    <li><Check size={16} /> Safety guidelines for the ride and landing</li>
                    <li><Check size={16} /> Landing techniques for wet or dry shores</li>
                    <li><Check size={16} /> Wildlife regulations and distance requirements</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Guests</span>
                    <span>Every Excursion</span>
                    <span>All Ages</span>
                  </div>
                  <p className="tsa_month_note">
                    Expedition staff cover everything you need to know before a single guest steps into
                    the boat — safety is always the top priority.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">~5 min</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Required</div>
                    <div className="tsa_stat_card_label">Life Jackets Fitted</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "25%" }} /><div className="tsa_bar_label">Brief</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Board</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Cruise</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Land</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Explore</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Stepping Aboard</div>
                  <h3 className="tsa_month_title">Step 2: Boarding the Zodiac</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Crew assist each guest from the ship's embarkation platform</li>
                    <li><Check size={16} /> Life jackets worn throughout the excursion</li>
                    <li><Check size={16} /> Guests seated along the pontoons for stability</li>
                    <li><Check size={16} /> A steady hand from crew at every step</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>All Fitness Levels</span>
                    <span>Assisted Boarding</span>
                    <span>Families</span>
                  </div>
                  <p className="tsa_month_note">
                    You'll need to step carefully and maintain balance during boarding — luxury expedition
                    teams assist guests throughout the process.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">~5 min</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Users size={22} />
                    <div className="tsa_stat_card_value">Assisted</div>
                    <div className="tsa_stat_card_label">Crew Support</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Brief</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "25%" }} /><div className="tsa_bar_label">Board</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Cruise</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Land</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Explore</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Water-Level Views Begin</div>
                  <h3 className="tsa_month_title">Step 3: Cruise to Shore</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Rides usually last between 5 and 20 minutes</li>
                    <li><Check size={16} /> Icebergs, penguins and seals often appear along the way</li>
                    <li><Check size={16} /> Whales and seabirds may surface nearby</li>
                    <li><Check size={16} /> Expedition guides narrate the passage</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Photographers</span>
                    <span>Wildlife Watchers</span>
                    <span>Scenic Cruising</span>
                  </div>
                  <p className="tsa_month_note">
                    Depending on the landing site, the crossing is your first close look at Antarctica's
                    icebergs and wildlife from water level.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">5–20 min</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Water Level</div>
                    <div className="tsa_stat_card_label">Vantage Point</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Brief</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Board</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "60%" }} /><div className="tsa_bar_label">Cruise</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Land</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Explore</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Wet or Dry, Guided Every Step</div>
                  <h3 className="tsa_month_title">Step 4: Wet or Dry Landing</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Wet landing: step directly into shallow water before shore</li>
                    <li><Check size={16} /> Dry landing: step ashore from rocks, docks or stable ground</li>
                    <li><Check size={16} /> Waterproof boots essential for wet landings</li>
                    <li><Check size={16} /> Your expedition team explains which to expect in advance</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wet Landings</span>
                    <span>Dry Landings</span>
                    <span>Guided Every Time</span>
                  </div>
                  <p className="tsa_month_note">
                    Whichever type your landing site requires, expedition staff help each guest step
                    safely onto Antarctica.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Moments</div>
                    <div className="tsa_stat_card_label">Time to Step Ashore</div>
                  </div>
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Staff-Assisted</div>
                    <div className="tsa_stat_card_label">Every Landing</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Brief</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Board</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Cruise</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "100%" }} /><div className="tsa_bar_label">Land</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Explore</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Time Ashore</div>
                  <h3 className="tsa_month_title">Step 5: Guided Exploration</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Guided walks led by expert naturalists</li>
                    <li><Check size={16} /> Close, respectful wildlife observation</li>
                    <li><Check size={16} /> Photography at scenic viewpoints</li>
                    <li><Check size={16} /> Educational commentary throughout</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Photography</span>
                    <span>Wildlife Viewing</span>
                    <span>Guided Learning</span>
                  </div>
                  <p className="tsa_month_note">
                    Most landings last one to three hours — often the most memorable part of the entire
                    expedition day.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">1–3 hrs</div>
                    <div className="tsa_stat_card_label">Typical Duration</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Camera size={22} />
                    <div className="tsa_stat_card_value">Unlimited</div>
                    <div className="tsa_stat_card_label">Photo Opportunities</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Brief</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "25%" }} /><div className="tsa_bar_label">Board</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "60%" }} /><div className="tsa_bar_label">Cruise</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "100%" }} /><div className="tsa_bar_label">Land</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "100%" }} /><div className="tsa_bar_label">Explore</div></div>
                  </div>
                </div>
              </div>
            )}
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
              "For many travelers, the first Zodiac ride is the moment Antarctica truly comes alive.
              Gliding quietly through icy waters, surrounded by towering glaciers and curious wildlife,
              creates a sense of connection that's impossible to experience from the ship alone. It's
              often the highlight of the entire expedition."
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

      {/* ================= LUXURY EXPEDITION EXPERIENCE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>The Luxury Expedition Experience</h2>
            <p>
              Understanding how Zodiac excursions operate helps travelers choose the right ship and
              itinerary — and arrive fully prepared for every landing.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Small Guest Ratios</h4>
              <p>Low guest-to-guide ratios for a more personal excursion.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Expert Naturalists</h4>
              <p>Experienced expedition teams leading every landing.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Premium Equipment</h4>
              <p>Flexible itineraries and premium waterproof gear provided.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Anchor size={20} /></div>
              <h4>Comfortable Ships</h4>
              <p>Adventure and comfort work together seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PACKING + WILDLIFE TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What to Wear &amp; Wildlife You May See</h2>
            <p>Dress in layers, and let every excursion be a chance for an unforgettable encounter.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>What to Wear</th>
                    <th>Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Waterproof expedition parka</td><td>Blocks wind and spray</td></tr>
                  <tr><td>Thermal base layers</td><td>Retains core warmth</td></tr>
                  <tr><td>Waterproof gloves &amp; warm hat</td><td>Protects extremities</td></tr>
                  <tr><td>Waterproof boots (usually provided)</td><td>Essential for wet landings</td></tr>
                  <tr><td>Sunglasses &amp; sunscreen</td><td>Sunlight reflects strongly off snow and ice</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Wildlife</th>
                    <th>Where You'll See It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Gentoo &amp; Adélie Penguins</td><td>Shore landings</td></tr>
                  <tr><td>Chinstrap Penguins</td><td>Shore landings</td></tr>
                  <tr><td>Humpback &amp; Minke Whales</td><td>Scenic cruises</td></tr>
                  <tr><td>Orcas</td><td>Scenic cruises</td></tr>
                  <tr><td>Leopard, Weddell &amp; Crabeater Seals</td><td>Ice floes &amp; shorelines</td></tr>
                  <tr><td>Blue-eyed Shags &amp; Skuas</td><td>Coastal cliffs</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TYPES OF EXCURSIONS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Types of Zodiac Excursions</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Shore Landings</h4>
              <ul>
                <li><Check size={14} /> Walk on Antarctica</li>
                <li><Check size={14} /> Visit wildlife colonies</li>
                <li><Check size={14} /> Join guided hikes</li>
                <li><Check size={14} /> Learn from expedition staff</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Scenic Zodiac Cruises</h4>
              <ul>
                <li><Check size={14} /> Ice-filled bays</li>
                <li><Check size={14} /> Glacier fronts</li>
                <li><Check size={14} /> Floating icebergs</li>
                <li><Check size={14} /> Outstanding photography</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Wildlife-Focused Excursions</h4>
              <ul>
                <li><Check size={14} /> Humpback &amp; minke whales</li>
                <li><Check size={14} /> Orcas</li>
                <li><Check size={14} /> Leopard &amp; Weddell seals</li>
                <li><Check size={14} /> Penguin colonies</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Wet Landings</h4>
              <ul>
                <li><Check size={14} /> Step directly into shallow water</li>
                <li><Check size={14} /> Waterproof boots essential</li>
                <li><Check size={14} /> Most common landing type</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Dry Landings</h4>
              <ul>
                <li><Check size={14} /> Step onto rocks or stable ground</li>
                <li><Check size={14} /> No entry into the water</li>
                <li><Check size={14} /> Used where terrain allows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ZODIAC ETIQUETTE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Zodiac Etiquette</h2>
            <p>Responsible exploration ensures Antarctica remains protected for future generations.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Follow Guide Instructions</h4>
                <p>Expedition guides make real-time calls that keep both guests and wildlife safe.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Keep a Respectful Distance</h4>
                <p>Wildlife regulations set safe distances that protect natural behavior.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Never Feed Animals</h4>
                <p>Feeding wildlife disrupts natural foraging and can cause harm.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Stay on Designated Walking Areas</h4>
                <p>Marked paths protect fragile vegetation and nesting sites.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Leave Nothing Behind</h4>
                <p>Every item that arrives with you should leave with you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS IT RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What to Know Before You Go</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Most Travelers Can Participate</h3>
              <ul>
                <li><Check size={14} /> Step carefully into the Zodiac with crew assistance</li>
                <li><Check size={14} /> Maintain balance during boarding</li>
                <li><Check size={14} /> Walk across uneven terrain at a comfortable pace</li>
                <li><Check size={14} /> Follow simple crew instructions throughout</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>Excursions May Be Adjusted or Cancelled</h3>
              <ul>
                <li><X size={14} /> Strong winds or rough seas</li>
                <li><X size={14} /> Heavy sea ice at a landing site</li>
                <li><X size={14} /> Sensitive wildlife activity</li>
                <li><X size={14} /> Changing weather conditions</li>
              </ul>
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
                What is a Zodiac landing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A Zodiac landing is a guided excursion where passengers travel from their expedition ship to Antarctica's shore using a small inflatable boat operated by trained expedition staff.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Are Zodiac boats safe? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Luxury expedition operators use professionally maintained Zodiacs, experienced drivers, mandatory life jackets, and strict safety procedures for every excursion.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What is the difference between a wet landing and a dry landing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A wet landing requires stepping into shallow water before reaching shore, while a dry landing allows passengers to step directly onto rocks, a dock, or stable ground.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Do I need special footwear? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Waterproof insulated boots are recommended, and most luxury expedition cruise lines provide them for guests.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                How long do Zodiac excursions last? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most Zodiac cruises and shore landings last between one and three hours, depending on weather, wildlife, and the daily itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                What wildlife can I see from a Zodiac? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>You may see penguins, whales, seals, seabirds, and spectacular icebergs, with sightings varying by season and location.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are Zodiac rides rough? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most rides are smooth, though sea conditions can vary. Expedition leaders only operate excursions when conditions are considered safe.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can older travelers participate? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many guests of varying ages enjoy Zodiac excursions. Expedition staff assist passengers during boarding and landing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                What should I bring on a Zodiac excursion? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Bring a camera, binoculars, sunscreen, sunglasses, extra gloves, and a waterproof bag for personal items.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Can Zodiac excursions be cancelled? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Weather, sea ice, strong winds, or safety concerns may require expedition leaders to modify or cancel an excursion.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                How many Zodiac excursions are included each day? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expeditions aim for one or two Zodiac excursions or shore landings daily, depending on conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I take photographs during the ride? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Zodiac cruises offer some of the best photography opportunities for wildlife, glaciers, and Antarctic scenery.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are children allowed on Zodiac excursions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Policies vary by cruise line, but many family-friendly luxury expeditions welcome children who meet minimum age and safety requirements.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Will I get wet during a Zodiac landing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>During wet landings, you may step into shallow water, which is why waterproof boots and pants are essential. Dry landings allow you to step directly onto land.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why are Zodiac excursions considered the highlight of an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>They provide close access to wildlife, glaciers, icebergs, and remote landing sites that larger ships cannot reach, creating unforgettable up-close experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience Antarctica by Zodiac?</h2>
          <p>
            There's no better way to explore Antarctica than by Zodiac. From cruising among giant icebergs
            to stepping onto remote beaches filled with penguins, these small boats provide unforgettable
            access to one of the world's last great wildernesses.
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