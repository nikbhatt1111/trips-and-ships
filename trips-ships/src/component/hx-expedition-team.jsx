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
  Camera,
  Users,
  Compass,
  Clock,
  Sparkles,
  Microscope,
  Anchor,
  Bird,
  BookOpen,
  ShieldCheck,
  Binoculars,
  Waves,
} from "lucide-react";

/**
 * HX Expedition Team Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS), including
 * the photo-card grid (.tsa_photo_grid) and split-layout timeline
 * (.tsa_split_layout) patterns introduced in the Antarctica Packing Guide.
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: every image source below is a placeholder — swap the URLs in
 * /assets/hx_expedition_team_*.jpg for real production assets.
 */

const JSON_LD = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tripsandships.com/#organization",
      "name": "Trips & Ships Luxury Travel",
      "url": "https://www.tripsandships.com",
      "logo": "https://www.tripsandships.com/logo.png"
    },
    {
      "@type": "TravelAgency",
      "@id": "https://www.tripsandships.com/#travelagency",
      "name": "Trips & Ships Luxury Travel",
      "url": "https://www.tripsandships.com",
      "priceRange": "$$$$",
      "areaServed": "Worldwide"
    },
    {
      "@type": "Person",
      "@id": "https://www.tripsandships.com/#angelahughes",
      "name": "Angela Hughes",
      "jobTitle": "CEO",
      "worksFor": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/hx-expedition-team",
      "url": "https://www.tripsandships.com/hx-expedition-team",
      "name": "HX Expedition Team Guide",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the HX Expedition Team?", "acceptedAnswer": { "@type": "Answer", "text": "The HX Expedition Team is a multidisciplinary group of specialists, including naturalists, scientists, historians, photographers, and expedition leaders who guide every voyage." } },
        { "@type": "Question", "name": "Are expedition team members included on every cruise?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every HX expedition includes a dedicated expedition team that leads excursions, lectures, and educational programs." } },
        { "@type": "Question", "name": "Can the expedition team help with photography?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many voyages include photography experts who provide guidance on camera settings, composition, and wildlife photography." } },
        { "@type": "Question", "name": "What is citizen science?", "acceptedAnswer": { "@type": "Answer", "text": "Citizen science allows guests to contribute to real scientific research by collecting wildlife observations and environmental data during their expedition." } },
        { "@type": "Question", "name": "Why is the expedition team important?", "acceptedAnswer": { "@type": "Answer", "text": "The expedition team enhances every voyage through expert guidance, educational lectures, wildlife interpretation, safety leadership, and immersive exploration." } }
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

export default function HXExpeditionTeam() {
  const [theme, setTheme] = useState("light");
  const [activeRole, setActiveRole] = useState(0); // 0=Expedition Leaders .. 4=Photography Experts
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

        {/* Background media layer — replace src with your own footage/photo */}
        <div className="tsa_hero_media">
          <img
            src="/assets/Hero_hx_expedition_team.gif"
            alt="Antarctica"
            className="tsa_hero_bg"
            fetchPriority="high"
          />
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
            <Users size={14} /> MEET THE EXPERTS
          </div>
          <h1>HX Expedition Team</h1>
          <p>
            An HX expedition is much more than a cruise—it's an immersive learning experience led by one of
            the industry's most experienced expedition teams. From marine biologists and geologists to
            historians, photographers, and polar experts, the HX Expedition Team enriches every voyage with
            fascinating insights, educational lectures, and safe, expertly guided shore landings.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore HX Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an HX Cruise Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expedition Staff</div>
            <div className="tsa_ss_best">Included on every voyage</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expertise</div>
            <div className="tsa_ss_best">Polar regions, wildlife, science &amp; history</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Shore Landings</div>
            <div className="tsa_ss_best">Guided by experts</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Lectures</div>
            <div className="tsa_ss_best">Delivered daily</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Best For</div>
            <div className="tsa_ss_best">Curious travelers &amp; nature lovers</div>
          </div>
        </div>
      </div>

      {/* ================= WHAT IS THE HX EXPEDITION TEAM ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHAT IS THE HX EXPEDITION TEAM?
            </div>
            <h2>A Multidisciplinary Team Behind Every Voyage</h2>
            <p>
              The HX Expedition Team is a multidisciplinary group of specialists who lead every expedition
              cruise. Their role is to educate, inspire, and ensure guests safely experience some of the
              world's most remote destinations.
            </p>
            <p>Every voyage benefits from the team's extensive experience and local knowledge. Team members may include:</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Expedition Leaders</div>
              <div className="tsa_chip"><Check size={16} /> Marine Biologists</div>
              <div className="tsa_chip"><Check size={16} /> Naturalists</div>
              <div className="tsa_chip"><Check size={16} /> Ornithologists</div>
              <div className="tsa_chip"><Check size={16} /> Historians</div>
              <div className="tsa_chip"><Check size={16} /> Geologists &amp; Glaciologists</div>
              <div className="tsa_chip"><Check size={16} /> Photographers</div>
              <div className="tsa_chip"><Check size={16} /> Kayak Guides &amp; Polar Experts</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">10+</div>
              <div className="tsa_why_card_label">Specialist disciplines represented across the expedition team</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Daily</div>
              <div className="tsa_why_card_label">Educational lectures delivered throughout every voyage</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">100%</div>
              <div className="tsa_why_card_label">Of Zodiac excursions and shore landings led by the expedition team</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Expedition Team at a Glance</h2>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers choose the ideal HX expedition where exceptional destinations are matched by world-class expertise.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Quick Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Expedition Staff</td><td>Included on Every Voyage</td></tr>
                <tr><td>Expertise</td><td>Polar Regions, Wildlife, Science, History &amp; Photography</td></tr>
                <tr><td>Shore Landings</td><td>Guided by Experts</td></tr>
                <tr><td>Zodiac Excursions</td><td>Led by Expedition Team</td></tr>
                <tr><td>Educational Lectures</td><td>Daily</td></tr>
                <tr><td>Science Programs</td><td>Available</td></tr>
                <tr><td>Citizen Science</td><td>Included on Select Voyages</td></tr>
                <tr><td>Guest Interaction</td><td>Throughout the Cruise</td></tr>
                <tr><td>Photography Support</td><td>Yes</td></tr>
                <tr><td>Best For</td><td>Curious Travelers &amp; Nature Lovers</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= MEET THE SPECIALISTS (ROLE EXPLORER) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Meet the Specialists</h2>
            <p>Select a role to see how each specialist enriches your expedition.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeRole === 0 ? "active" : ""}`} onClick={() => setActiveRole(0)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Expedition Leaders</span>
              </button>
              <button className={`tsa_month_tab ${activeRole === 1 ? "active" : ""}`} onClick={() => setActiveRole(1)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Marine Biologists</span>
              </button>
              <button className={`tsa_month_tab ${activeRole === 2 ? "active" : ""}`} onClick={() => setActiveRole(2)}>
                <Bird size={18} /> <span className="tsa_month_tab_label">Naturalists</span>
              </button>
              <button className={`tsa_month_tab ${activeRole === 3 ? "active" : ""}`} onClick={() => setActiveRole(3)}>
                <BookOpen size={18} /> <span className="tsa_month_tab_label">Historians</span>
              </button>
              <button className={`tsa_month_tab ${activeRole === 4 ? "active" : ""}`} onClick={() => setActiveRole(4)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">Photography Experts</span>
              </button>
            </div>

            {activeRole === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Coordinating Every Day of Your Voyage</div>
                  <h3 className="tsa_month_title">Expedition Leaders</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Planning landings and assessing weather</li>
                    <li><Check size={16} /> Managing safety across every excursion</li>
                    <li><Check size={16} /> Leading daily briefings</li>
                    <li><Check size={16} /> Coordinating expedition staff and adapting itineraries</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Daily Planning</span>
                    <span>Safety Oversight</span>
                    <span>Itinerary Decisions</span>
                  </div>
                  <p className="tsa_month_note">
                    Each voyage is overseen by an experienced Expedition Leader whose decisions ensure every
                    expedition is safe and rewarding.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Safety &amp; Planning</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>

                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Every Voyage</div>
                    <div className="tsa_stat_card_label">Onboard Presence</div>
                  </div>

                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col">
                      <div className="tsa_bar active" style={{ height: "90%" }} />
                      <div className="tsa_bar_label">Leader</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "80%" }} />
                      <div className="tsa_bar_label">Biology</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "75%" }} />
                      <div className="tsa_bar_label">Nature</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "65%" }} />
                      <div className="tsa_bar_label">History</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "60%" }} />
                      <div className="tsa_bar_label">Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRole === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Understanding an Incredible Marine Ecosystem</div>
                  <h3 className="tsa_month_title">Marine Biologists</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Whales, seals, penguins &amp; krill</li>
                    <li><Check size={16} /> Ocean conservation topics</li>
                    <li><Check size={16} /> Marine biodiversity insights</li>
                    <li><Check size={16} /> Wildlife sightings turned into learning moments</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Marine Ecosystems</span>
                    <span>Wildlife Biology</span>
                    <span>Ocean Conservation</span>
                  </div>
                  <p className="tsa_month_note">
                    Marine biologists help guests understand the marine ecosystem, turning every sighting
                    into an unforgettable educational experience.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Marine Ecosystems</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Daily Lectures</div>
                    <div className="tsa_stat_card_label">Guest Access</div>
                  </div>

                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "90%" }} />
                      <div className="tsa_bar_label">Leader</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar active" style={{ height: "80%" }} />
                      <div className="tsa_bar_label">Biology</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "75%" }} />
                      <div className="tsa_bar_label">Nature</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "65%" }} />
                      <div className="tsa_bar_label">History</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "60%" }} />
                      <div className="tsa_bar_label">Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRole === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Bringing the Landscape to Life</div>
                  <h3 className="tsa_month_title">Naturalists &amp; Wildlife Experts</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Identifying penguins, seabirds &amp; whales</li>
                    <li><Check size={16} /> Identifying seals and native plants</li>
                    <li><Check size={16} /> Interpreting Antarctic ecosystems</li>
                    <li><Check size={16} /> Accompanying shore landings and Zodiac excursions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Identification</span>
                    <span>Shore Landings</span>
                    <span>Zodiac Excursions</span>
                  </div>
                  <p className="tsa_month_note">
                    Naturalists accompany guests on every landing, bringing the landscape and its wildlife
                    to life.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Bird size={22} />
                    <div className="tsa_stat_card_value">Wildlife I.D.</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Every Landing</div>
                    <div className="tsa_stat_card_label">Onboard Presence</div>
                  </div>

                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "90%" }} />
                      <div className="tsa_bar_label">Leader</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "80%" }} />
                      <div className="tsa_bar_label">Biology</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar active" style={{ height: "75%" }} />
                      <div className="tsa_bar_label">Nature</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "65%" }} />
                      <div className="tsa_bar_label">History</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "60%" }} />
                      <div className="tsa_bar_label">Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRole === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">History Becomes Part of Every Journey</div>
                  <h3 className="tsa_month_title">Historians &amp; Polar Experts</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> The Heroic Age of Exploration</li>
                    <li><Check size={16} /> Early explorers and historic huts</li>
                    <li><Check size={16} /> Scientific research through history</li>
                    <li><Check size={16} /> The Antarctic Treaty</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Polar History</span>
                    <span>Early Explorers</span>
                    <span>Historic Sites</span>
                  </div>
                  <p className="tsa_month_note">
                    Engaging presentations from historians and polar experts turn every landing into a
                    history lesson.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <BookOpen size={22} />
                    <div className="tsa_stat_card_value">Polar History</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Daily Lectures</div>
                    <div className="tsa_stat_card_label">Guest Access</div>
                  </div>

                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "90%" }} />
                      <div className="tsa_bar_label">Leader</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "80%" }} />
                      <div className="tsa_bar_label">Biology</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "75%" }} />
                      <div className="tsa_bar_label">Nature</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar active" style={{ height: "65%" }} />
                      <div className="tsa_bar_label">History</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "60%" }} />
                      <div className="tsa_bar_label">Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRole === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Instruction for Every Skill Level</div>
                  <h3 className="tsa_month_title">Photography Experts</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Camera advice and composition tips</li>
                    <li><Check size={16} /> Wildlife photography techniques</li>
                    <li><Check size={16} /> Editing guidance</li>
                    <li><Check size={16} /> Photo presentations onboard</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Camera Technique</span>
                    <span>Wildlife Photography</span>
                    <span>Editing Guidance</span>
                  </div>
                  <p className="tsa_month_note">
                    Photographers of every skill level benefit from expert instruction throughout the
                    voyage.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Camera size={22} />
                    <div className="tsa_stat_card_value">Photo Coaching</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Select Voyages</div>
                    <div className="tsa_stat_card_label">Availability</div>
                  </div>

                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "90%" }} />
                      <div className="tsa_bar_label">Leader</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "80%" }} />
                      <div className="tsa_bar_label">Biology</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "75%" }} />
                      <div className="tsa_bar_label">Nature</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar" style={{ height: "65%" }} />
                      <div className="tsa_bar_label">History</div>
                    </div>
                    <div className="tsa_bar_col">
                      <div className="tsa_bar active" style={{ height: "60%" }} />
                      <div className="tsa_bar_label">Photo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= WHAT DOES THE EXPEDITION TEAM DO (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What Does the Expedition Team Do?</h2>
            <p>They transform every excursion into a meaningful learning experience.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Anchor size={20} /></div>
              <h4>Leads Zodiac Cruises &amp; Landings</h4>
              <p>Every excursion is led by expedition specialists, from Zodiac cruises to shore landings.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><BookOpen size={20} /></div>
              <h4>Delivers Educational Lectures</h4>
              <p>Daily lectures explain local ecosystems, wildlife, and expedition history.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Assists With Photography</h4>
              <p>Guidance and hands-on assistance help you capture every moment.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Ensures Guest Safety</h4>
              <p>The team monitors weather and sea conditions to keep every excursion safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCIENCE CENTER & CITIZEN SCIENCE (PHOTO CARD GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Microscope size={14} /> SCIENCE ONBOARD
            </div>
            <h2>Learning &amp; Discovery Throughout the Voyage</h2>
            <p>Guests become active participants in scientific discovery through the onboard Science Center and daily programming.</p>
          </div>

          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_expedition_team_1.jpg" alt="HX Science Center lecture" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Microscope size={14} /> Learning Space
                </div>
                <h4>Science Center Programs</h4>
                <p>Attend lectures, view scientific equipment, and explore exhibits led by expedition experts.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Attend lectures</span>
                  <span><Check size={16} /> View scientific equipment</span>
                  <span><Check size={16} /> Analyze wildlife observations</span>
                  <span><Check size={16} /> Learn about climate research</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_expedition_team_2.jpg" alt="Guests collecting citizen science data" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Bird size={14} /> Get Involved
                </div>
                <h4>Citizen Science</h4>
                <p>Many expeditions invite guests to contribute to ongoing scientific research.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Wildlife observations</span>
                  <span><Check size={16} /> Weather monitoring</span>
                  <span><Check size={16} /> Bird counts &amp; ocean sampling</span>
                  <span><Check size={16} /> Marine debris research</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_expedition_team_3.jpg" alt="Guests attending a daily lecture onboard" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <BookOpen size={14} /> Daily
                </div>
                <h4>Daily Lectures</h4>
                <p>Expert presentations cover polar wildlife, climate science, geology, history, and more.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Polar wildlife &amp; geology</span>
                  <span><Check size={16} /> Photography &amp; history</span>
                  <span><Check size={16} /> Marine biology</span>
                  <span><Check size={16} /> Conservation topics</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_expedition_team_4.jpg" alt="Expedition team leading a Zodiac cruise" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Anchor size={14} /> Excursions
                </div>
                <h4>Shore Landings &amp; Zodiac Cruises</h4>
                <p>Every landing is planned with safety and education in mind, according to weather and wildlife conditions.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Wildlife observation</span>
                  <span><Check size={16} /> Glacier exploration</span>
                  <span><Check size={16} /> Historic site visits</span>
                  <span><Check size={16} /> Photography opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY THE EXPEDITION TEAM MATTERS (SPLIT LAYOUT) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why the Expedition Team Matters</h2>
            <p>Unlike traditional cruises, the Expedition Team is central to the HX experience.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><BookOpen size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Learn Continuously</div>
                  <h4>Daily Insight From World-Class Experts</h4>
                  <p>Lectures and onboard discussions deepen your understanding of every destination.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><ShieldCheck size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Explore Safely</div>
                  <h4>Expertly Guided Every Step of the Way</h4>
                  <p>The team monitors conditions and leads every excursion with safety as the top priority.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Bird size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Discover Wildlife</div>
                  <h4>Expert Interpretation of Every Sighting</h4>
                  <p>Naturalists and biologists help you understand the wildlife and ecosystems around you.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Camera size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Capture Better Photographs</div>
                  <h4>Expert Guidance in the Field</h4>
                  <p>Photography experts help you capture wildlife and landscapes at their very best.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/hx_expedition_team_5.jpg" alt="Naturalist pointing out wildlife to guests" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/hx_expedition_team_6.jpg" alt="Expedition guide leading a shore landing" />
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
              "One of the greatest strengths of HX Expeditions is its exceptional expedition team. Their
              knowledge, enthusiasm, and ability to bring each destination to life make every voyage far
              more meaningful than simply visiting remarkable places."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>Visited 121+ Countries</span>
              <span>Luxury Cruise &amp; Expedition Specialist</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH EXPERTISE MATTERS MOST TO YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Expertise Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Marine Biology If You Want:</h4>
              <ul>
                <li><Check size={14} /> Whale, seal &amp; penguin insights</li>
                <li><Check size={14} /> Ocean conservation topics</li>
                <li><Check size={14} /> Marine biodiversity deep dives</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Naturalist Guidance If You Want:</h4>
              <ul>
                <li><Check size={14} /> Wildlife identification on landings</li>
                <li><Check size={14} /> Ecosystem interpretation</li>
                <li><Check size={14} /> Close, guided Zodiac excursions</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Polar History If You Want:</h4>
              <ul>
                <li><Check size={14} /> Heroic Age of Exploration stories</li>
                <li><Check size={14} /> Historic hut &amp; site visits</li>
                <li><Check size={14} /> Antarctic Treaty context</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Photography Coaching If You Want:</h4>
              <ul>
                <li><Check size={14} /> Composition &amp; camera advice</li>
                <li><Check size={14} /> Wildlife photography techniques</li>
                <li><Check size={14} /> Editing guidance &amp; photo talks</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Citizen Science If You Want:</h4>
              <ul>
                <li><Check size={14} /> Wildlife &amp; weather data collection</li>
                <li><Check size={14} /> Hands-on research participation</li>
                <li><Check size={14} /> A meaningful conservation contribution</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS AN EXPERT-LED EXPEDITION RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is an Expert-Led Expedition Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Curious travelers and lifelong learners</li>
                <li><Check size={14} /> Nature and wildlife lovers</li>
                <li><Check size={14} /> Aspiring and experienced photographers</li>
                <li><Check size={14} /> Travelers interested in polar history</li>
                <li><Check size={14} /> Guests who want to contribute to citizen science</li>
                <li><Check size={14} /> Families seeking an educational adventure</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers who prefer an unstructured, lecture-free cruise</li>
                <li><X size={14} /> Guests seeking a purely nightlife-focused itinerary</li>
                <li><X size={14} /> Those who prefer to skip educational programming</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US (NUMBERED) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book With Trips &amp; Ships Luxury Travel?</h2>
            <p>We'll help you choose the expedition that best matches your interests.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare HX Itineraries</h4>
                <p>We help you weigh voyages based on the expertise and programming each one offers.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Understand Expedition Activities</h4>
                <p>We explain what each excursion involves so you know exactly what to expect.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Choose the Right Voyage</h4>
                <p>We match your interests — wildlife, history, photography, or science — to the ideal itinerary.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Select the Ideal Cabin</h4>
                <p>We help you find the accommodation that best complements your expedition.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Coordinate Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on the experience ahead.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">06</div>
              <div>
                <h4>Personalize Your Expedition</h4>
                <p>With decades of luxury travel expertise, we tailor every detail of your journey.</p>
              </div>
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
                What is the HX Expedition Team? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The HX Expedition Team is a group of experienced specialists—including naturalists, scientists, historians, photographers, and expedition leaders—who guide every voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Are expedition team members included on every cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Every HX expedition includes a dedicated expedition team that leads excursions, lectures, and onboard educational programs.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What qualifications do expedition team members have? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Team members typically have expertise in fields such as marine biology, geology, ornithology, photography, history, polar exploration, and environmental science.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Do expedition guides lead Zodiac excursions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. All Zodiac cruises and shore landings are led by experienced expedition team members.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Are educational lectures included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Daily lectures covering wildlife, history, conservation, geology, and photography are included as part of the expedition experience.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Can the expedition team help with photography? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many voyages include photography experts who offer practical advice, workshops, and tips for capturing wildlife and landscapes.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                What is the onboard Science Center? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Science Center is an interactive learning space where guests attend lectures, participate in citizen science, and explore scientific exhibits.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                What is citizen science? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Citizen science allows guests to contribute to real scientific research by recording wildlife observations, weather data, and environmental information during the voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                How does the expedition team ensure guest safety? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The team monitors weather, sea ice, and wildlife conditions while leading shore landings, Zodiac operations, and daily activities according to strict safety procedures.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Will I have opportunities to interact with the expedition team? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Team members dine with guests, host presentations, answer questions, and accompany excursions throughout the voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Are activities suitable for beginners? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition activities are designed for travelers of varying experience and fitness levels, with guidance provided every step of the way.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                How many expedition team members are onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The size of the expedition team varies depending on the ship, destination, and number of guests, ensuring personalized guidance throughout the voyage.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Does the expedition team change the itinerary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition leaders may adjust daily plans based on weather, wildlife, sea ice, and safety to maximize guest experiences.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Why is the expedition team important? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Their expertise transforms the voyage into an immersive educational experience, helping guests better understand wildlife, ecosystems, history, and conservation.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX expedition through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our experts help you compare HX voyages, understand expedition activities, select the ideal itinerary, and ensure every aspect of your journey is carefully planned.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Explore with HX Experts?</h2>
          <p>
            Every HX expedition is enriched by passionate specialists who educate, inspire, and guide guests
            throughout the journey. Let us help you find the perfect expedition where learning and adventure
            go hand in hand.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request an HX Cruise Quote</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}