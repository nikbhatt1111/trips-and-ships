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
  Leaf,
  Ship,
  Microscope,
  Bird,
  Recycle,
  ShieldCheck,
  BookOpen,
  Waves,
} from "lucide-react";

/**
 * HX Sustainability — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS), including
 * the photo-card grid (.tsa_photo_grid) and split-layout timeline
 * (.tsa_split_layout) patterns introduced in the Antarctica Packing Guide.
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: every image source below is a placeholder — swap the URLs in
 * /assets/hx_sustainability_*.jpg for real production assets.
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
      "worksFor": { "@id": "https://www.tripsandships.com/#organization" },
      "description": "Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience."
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.tripsandships.com/hx-sustainability#aboutpage",
      "url": "https://www.tripsandships.com/hx-sustainability",
      "name": "HX Sustainability",
      "description": "Learn about HX Expeditions' commitment to sustainability through hybrid-powered ships, citizen science, conservation partnerships, responsible wildlife viewing, and environmentally responsible expedition travel.",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" },
      "about": { "@type": "Brand", "name": "HX Expeditions" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": "https://www.tripsandships.com/images/hx-sustainability.jpg" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.tripsandships.com/hx-sustainability",
      "url": "https://www.tripsandships.com/hx-sustainability",
      "name": "HX Sustainability",
      "headline": "HX Sustainability | Responsible Expedition Cruises & Environmental Commitment",
      "description": "Discover HX sustainability initiatives including hybrid-powered expedition ships, citizen science, Science Centers, responsible wildlife practices, and conservation partnerships.",
      "about": { "@type": "Brand", "name": "HX Expeditions" },
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" },
      "breadcrumb": { "@id": "https://www.tripsandships.com/hx-sustainability#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.tripsandships.com/hx-sustainability#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tripsandships.com" },
        { "@type": "ListItem", "position": 2, "name": "HX Expeditions", "item": "https://www.tripsandships.com/hx-expeditions" },
        { "@type": "ListItem", "position": 3, "name": "HX Sustainability", "item": "https://www.tripsandships.com/hx-sustainability" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.tripsandships.com/hx-sustainability#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Is HX committed to sustainability?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sustainability is central to HX operations, including hybrid-powered ships, scientific research, responsible tourism, and environmental education." } },
        { "@type": "Question", "name": "What makes HX different from other expedition cruise lines?", "acceptedAnswer": { "@type": "Answer", "text": "HX combines expedition travel with science, conservation, education, and environmentally responsible exploration." } },
        { "@type": "Question", "name": "What are hybrid-powered expedition ships?", "acceptedAnswer": { "@type": "Answer", "text": "Hybrid-powered ships combine traditional marine engines with battery technology to improve fuel efficiency and reduce emissions." } },
        { "@type": "Question", "name": "Does HX support scientific research?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guests can participate in citizen science projects and contribute to environmental research during many expeditions." } },
        { "@type": "Question", "name": "What is citizen science?", "acceptedAnswer": { "@type": "Answer", "text": "Citizen science allows travelers to assist scientists by collecting valuable environmental and wildlife data during expeditions." } },
        { "@type": "Question", "name": "Does HX have onboard Science Centers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Modern HX ships feature Science Centers with interactive exhibits, scientific equipment, and educational presentations." } },
        { "@type": "Question", "name": "How does HX protect wildlife?", "acceptedAnswer": { "@type": "Answer", "text": "HX follows strict wildlife viewing guidelines, maintains safe viewing distances, and complies with local and international environmental regulations." } },
        { "@type": "Question", "name": "Does HX reduce plastic waste?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. HX has introduced initiatives to reduce unnecessary single-use plastics and encourage more sustainable onboard practices." } },
        { "@type": "Question", "name": "Are sustainability lectures included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Educational lectures on climate science, wildlife, conservation, and ecosystems are included throughout every expedition." } },
        { "@type": "Question", "name": "Are sustainability practices different by destination?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sustainability practices vary depending on local regulations and environmental requirements in each destination." } },
        { "@type": "Question", "name": "Can guests actively participate in conservation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many expeditions include opportunities for guests to contribute to scientific research through citizen science programs." } },
        { "@type": "Question", "name": "Does sustainability affect the guest experience?", "acceptedAnswer": { "@type": "Answer", "text": "Most travelers find sustainability enhances the expedition through educational experiences and meaningful engagement with the destinations visited." } },
        { "@type": "Question", "name": "Are hybrid ships quieter?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Hybrid propulsion helps reduce engine noise, creating a quieter onboard experience that benefits both guests and wildlife." } },
        { "@type": "Question", "name": "Why is environmental education important on HX voyages?", "acceptedAnswer": { "@type": "Answer", "text": "Environmental education helps guests better understand fragile ecosystems and encourages responsible travel practices." } },
        { "@type": "Question", "name": "Why book an HX expedition through Trips & Ships Luxury Travel?", "acceptedAnswer": { "@type": "Answer", "text": "Our specialists explain HX sustainability initiatives, recommend the best itinerary, and help you plan an expedition that aligns with your travel values." } }
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

export default function HXSustainability() {
  const [theme, setTheme] = useState("light");
  const [activeInitiative, setActiveInitiative] = useState(0); // 0=Hybrid Ships .. 4=Reduced Plastics
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
            <Leaf size={14} /> RESPONSIBLE EXPEDITION TRAVEL
          </div>
          <h1>HX Sustainability</h1>
          <p>
            Exploring some of the world's most pristine and fragile environments comes with an important
            responsibility. HX Expeditions is committed to reducing its environmental footprint while
            inspiring travelers to become active participants in conservation and scientific discovery.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore HX Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an HX Expedition Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Hybrid-Powered Ships</div>
            <div className="tsa_ss_best">Yes</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Citizen Science</div>
            <div className="tsa_ss_best">Yes</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Science Centers</div>
            <div className="tsa_ss_best">Yes</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Responsible Wildlife Viewing</div>
            <div className="tsa_ss_best">Yes</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Reduced Single-Use Plastics</div>
            <div className="tsa_ss_best">Yes</div>
          </div>
        </div>
      </div>

      {/* ================= QUICK ANSWER: IS HX ENVIRONMENTALLY RESPONSIBLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> QUICK ANSWER
            </div>
            <h2>Is HX an Environmentally Responsible Cruise Line?</h2>
            <p>
              Yes. HX is widely recognized as one of the world's leading expedition cruise operators
              committed to sustainable exploration. Through hybrid-powered ships, onboard Science Centers,
              citizen science initiatives, responsible wildlife guidelines, conservation partnerships, and
              continuous innovation, HX works to reduce its environmental impact while helping guests better
              understand and protect the natural world.
            </p>
            <p>HX believes exploration should contribute positively to the destinations it visits through:</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Environmental education</div>
              <div className="tsa_chip"><Check size={16} /> Scientific collaboration</div>
              <div className="tsa_chip"><Check size={16} /> Responsible tourism</div>
              <div className="tsa_chip"><Check size={16} /> Low-impact operations</div>
              <div className="tsa_chip"><Check size={16} /> Conservation awareness</div>
              <div className="tsa_chip"><Check size={16} /> Sustainable innovation</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">10</div>
              <div className="tsa_why_card_label">Sustainability initiatives included across HX operations</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">5</div>
              <div className="tsa_why_card_label">Destinations covered, from Antarctica to the Galápagos</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">First</div>
              <div className="tsa_why_card_label">Among the first expedition lines to introduce hybrid-powered ships</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Sustainability at a Glance</h2>
            <p>At Trips &amp; Ships Luxury Travel, we help travelers understand how HX's sustainability initiatives enhance the expedition experience.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Sustainability Initiative</th>
                  <th>Included</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hybrid-Powered Ships</td><td>✔ Yes</td></tr>
                <tr><td>Citizen Science Programs</td><td>✔ Yes</td></tr>
                <tr><td>Science Centers</td><td>✔ Yes</td></tr>
                <tr><td>Responsible Wildlife Viewing</td><td>✔ Yes</td></tr>
                <tr><td>Environmental Education</td><td>✔ Yes</td></tr>
                <tr><td>Conservation Partnerships</td><td>✔ Yes</td></tr>
                <tr><td>Reduced Single-Use Plastics</td><td>✔ Yes</td></tr>
                <tr><td>Scientific Research Support</td><td>✔ Yes</td></tr>
                <tr><td>Destination Protection Practices</td><td>✔ Yes</td></tr>
                <tr><td>Sustainable Expedition Operations</td><td>✔ Yes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY INITIATIVES EXPLORER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Explore HX's Sustainability Initiatives</h2>
            <p>Select an initiative to see how it shapes the HX expedition experience.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeInitiative === 0 ? "active" : ""}`} onClick={() => setActiveInitiative(0)}>
                <Ship size={18} /> <span className="tsa_month_tab_label">Hybrid Ships</span>
              </button>
              <button className={`tsa_month_tab ${activeInitiative === 1 ? "active" : ""}`} onClick={() => setActiveInitiative(1)}>
                <Microscope size={18} /> <span className="tsa_month_tab_label">Science Centers</span>
              </button>
              <button className={`tsa_month_tab ${activeInitiative === 2 ? "active" : ""}`} onClick={() => setActiveInitiative(2)}>
                <Bird size={18} /> <span className="tsa_month_tab_label">Citizen Science</span>
              </button>
              <button className={`tsa_month_tab ${activeInitiative === 3 ? "active" : ""}`} onClick={() => setActiveInitiative(3)}>
                <ShieldCheck size={18} /> <span className="tsa_month_tab_label">Responsible Wildlife</span>
              </button>
              <button className={`tsa_month_tab ${activeInitiative === 4 ? "active" : ""}`} onClick={() => setActiveInitiative(4)}>
                <Recycle size={18} /> <span className="tsa_month_tab_label">Reduced Plastics</span>
              </button>
            </div>

            {activeInitiative === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Among the First Hybrid-Powered Expedition Ships</div>
                  <h3 className="tsa_month_title">Hybrid-Powered Ships</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Reduced carbon emissions</li>
                    <li><Check size={16} /> Improved fuel efficiency</li>
                    <li><Check size={16} /> Reduced engine noise</li>
                    <li><Check size={16} /> Innovative maritime technology</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Lower Emissions</span>
                    <span>Quieter Voyages</span>
                    <span>Energy Efficiency</span>
                  </div>
                  <p className="tsa_month_note">
                    Hybrid technology reflects HX's long-term commitment to advancing more sustainable
                    expedition cruising.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Ship size={22} />
                    <div className="tsa_stat_card_value">Hybrid Propulsion</div>
                    <div className="tsa_stat_card_label">Core Technology</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Industry First</div>
                    <div className="tsa_stat_card_label">Recognition</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">Hybrid</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">Science</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "88%" }} />
                            <div className="tsa_bar_label">Citizen</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "90%" }} />
                            <div className="tsa_bar_label">Wildlife</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "84%" }} />
                            <div className="tsa_bar_label">Plastic</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeInitiative === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Learning Built Into Every Voyage</div>
                  <h3 className="tsa_month_title">Onboard Science Centers</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Interactive exhibits &amp; microscopes</li>
                    <li><Check size={16} /> Wildlife identification &amp; marine biology presentations</li>
                    <li><Check size={16} /> Climate science discussions</li>
                    <li><Check size={16} /> Photography workshops &amp; research demonstrations</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Interactive Learning</span>
                    <span>Every Modern Ship</span>
                    <span>Expert-Led</span>
                  </div>
                  <p className="tsa_month_note">
                    The Science Center transforms every voyage into a learning experience.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Microscope size={22} />
                    <div className="tsa_stat_card_value">Interactive Exhibits</div>
                    <div className="tsa_stat_card_label">Core Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Every Ship</div>
                    <div className="tsa_stat_card_label">Availability</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">Hybrid</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "94%" }} />
                            <div className="tsa_bar_label">Science</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "89%" }} />
                            <div className="tsa_bar_label">Citizen</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "86%" }} />
                            <div className="tsa_bar_label">Wildlife</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "80%" }} />
                            <div className="tsa_bar_label">Plastic</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeInitiative === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Guests Become Active Contributors</div>
                  <h3 className="tsa_month_title">Citizen Science Programs</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Recording whale sightings &amp; monitoring seabirds</li>
                    <li><Check size={16} /> Collecting oceanographic observations</li>
                    <li><Check size={16} /> Measuring sea ice &amp; tracking marine mammals</li>
                    <li><Check size={16} /> Supporting biodiversity research</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Hands-On Research</span>
                    <span>Shared With Scientists</span>
                    <span>Meaningful Contribution</span>
                  </div>
                  <p className="tsa_month_note">
                    Collected data is shared with scientific organizations and research partners around the
                    world.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Bird size={22} />
                    <div className="tsa_stat_card_value">Real Research</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Many Voyages</div>
                    <div className="tsa_stat_card_label">Availability</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">Hybrid</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "94%" }} />
                            <div className="tsa_bar_label">Science</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "95%" }} />
                            <div className="tsa_bar_label">Citizen</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "89%" }} />
                            <div className="tsa_bar_label">Wildlife</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "82%" }} />
                            <div className="tsa_bar_label">Plastic</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeInitiative === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">One of HX's Highest Priorities</div>
                  <h3 className="tsa_month_title">Responsible Wildlife Viewing</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Maintaining safe viewing distances</li>
                    <li><Check size={16} /> Limiting group sizes ashore</li>
                    <li><Check size={16} /> Respecting nesting areas &amp; using designated landing sites</li>
                    <li><Check size={16} /> Continuous wildlife monitoring</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Minimized Disturbance</span>
                    <span>Strict Guidelines</span>
                    <span>Natural Behavior Preserved</span>
                  </div>
                  <p className="tsa_month_note">
                    Expedition teams follow strict guidelines designed to minimize disturbance while
                    maximizing guest experiences.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ShieldCheck size={22} />
                    <div className="tsa_stat_card_value">Strict Guidelines</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Every Landing</div>
                    <div className="tsa_stat_card_label">Applied To</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "96%" }} />
                            <div className="tsa_bar_label">Hybrid</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "92%" }} />
                            <div className="tsa_bar_label">Science</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "90%" }} />
                            <div className="tsa_bar_label">Citizen</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "97%" }} />
                            <div className="tsa_bar_label">Wildlife</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "84%" }} />
                            <div className="tsa_bar_label">Plastic</div>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeInitiative === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Reducing Waste in Marine Environments</div>
                  <h3 className="tsa_month_title">Reducing Single-Use Plastics</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Refillable water stations</li>
                    <li><Check size={16} /> Reduced plastic packaging</li>
                    <li><Check size={16} /> Sustainable guest amenities</li>
                    <li><Check size={16} /> Environmentally conscious sourcing</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Waste Reduction</span>
                    <span>Sustainable Sourcing</span>
                    <span>Marine Protection</span>
                  </div>
                  <p className="tsa_month_note">
                    These initiatives help reduce pollution in marine environments across every destination.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Recycle size={22} />
                    <div className="tsa_stat_card_value">Waste Reduction</div>
                    <div className="tsa_stat_card_label">Core Focus</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Fleet-Wide</div>
                    <div className="tsa_stat_card_label">Scope</div>
                  </div>

                    <div className="tsa_bar_chart">
                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "95%" }} />
                            <div className="tsa_bar_label">Hybrid</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "90%" }} />
                            <div className="tsa_bar_label">Science</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "88%" }} />
                            <div className="tsa_bar_label">Citizen</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar" style={{ height: "91%" }} />
                            <div className="tsa_bar_label">Wildlife</div>
                        </div>

                        <div className="tsa_bar_col">
                            <div className="tsa_bar active" style={{ height: "98%" }} />
                            <div className="tsa_bar_label">Plastic</div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABLE OPERATIONS (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Sustainable Operations</h2>
            <p>Sustainability extends beyond the ships themselves, shaping how every voyage is planned and run.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Efficient Voyage Planning</h4>
              <p>Routes are planned to minimize environmental impact while maximizing guest experiences.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Recycle size={20} /></div>
              <h4>Responsible Waste Management</h4>
              <p>Waste management practices are designed to protect the destinations visited.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Leaf size={20} /></div>
              <h4>Energy Conservation</h4>
              <p>Energy conservation and sustainable procurement are built into daily operations.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Crew Sustainability Training</h4>
              <p>Crew members are trained in environmental compliance and continuous operational improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY BY DESTINATION (PHOTO CARD GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Leaf size={14} /> BY DESTINATION
            </div>
            <h2>Sustainability in Different Destinations</h2>
            <p>Operational practices vary depending on local regulations and environmental requirements in each destination.</p>
          </div>

          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_sustainability_1.jpg" alt="Antarctic Peninsula landing site" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Snowflake size={14} /> Antarctica
                </div>
                <h4>IAATO Guidelines</h4>
                <p>Strict landing protocols and wildlife protection guide every Antarctic voyage.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> IAATO guidelines</span>
                  <span><Check size={16} /> Strict landing protocols</span>
                  <span><Check size={16} /> Wildlife protection</span>
                  <span><Check size={16} /> Scientific research</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_sustainability_2.jpg" alt="Arctic sea ice and marine mammals" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Waves size={14} /> Arctic
                </div>
                <h4>Polar Ecosystem Education</h4>
                <p>Marine mammal conservation and climate monitoring shape every Arctic itinerary.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Polar ecosystem education</span>
                  <span><Check size={16} /> Marine mammal conservation</span>
                  <span><Check size={16} /> Climate monitoring</span>
                  <span><Check size={16} /> Responsible wildlife viewing</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_sustainability_3.jpg" alt="Greenland coastal community" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Users size={14} /> Greenland
                </div>
                <h4>Community Engagement</h4>
                <p>Local community engagement and cultural respect are central to every Greenland voyage.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> Local community engagement</span>
                  <span><Check size={16} /> Cultural respect</span>
                  <span><Check size={16} /> Environmental stewardship</span>
                  <span><Check size={16} /> Sustainable operations</span>
                </div>
              </div>
            </div>

            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src="/assets/hx_sustainability_4.jpg" alt="Galápagos wildlife and naturalist guide" />
              <div className="tsa_photo_card_body">
                <div className="tsa_photo_label">
                  <Bird size={14} /> Galápagos
                </div>
                <h4>National Park Regulations</h4>
                <p>Certified naturalist guides and sensitive ecosystem protection define every landing.</p>
                <div className="tsa_photo_list">
                  <span><Check size={16} /> National Park regulations</span>
                  <span><Check size={16} /> Certified naturalist guides</span>
                  <span><Check size={16} /> Sensitive ecosystem protection</span>
                  <span><Check size={16} /> Wildlife-focused itineraries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE HX FOR SUSTAINABLE TRAVEL (SPLIT LAYOUT) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Choose HX for Sustainable Travel?</h2>
            <p>HX combines exploration with purpose, leaving guests with a deeper understanding of their role in protecting the natural world.</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Ship size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Industry-Leading Technology</div>
                  <h4>Hybrid Propulsion Fleet-Wide</h4>
                  <p>Industry-leading hybrid technology reduces environmental impact across the fleet.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Microscope size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Science-Focused Expeditions</div>
                  <h4>Learning at the Center of Every Voyage</h4>
                  <p>Conservation partnerships and educational experiences enrich every itinerary.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Bird size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Citizen Science Opportunities</div>
                  <h4>Guests as Active Contributors</h4>
                  <p>Travelers participate directly in environmental awareness and research efforts.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time"><Sparkles size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />Meaningful Travel</div>
                  <h4>Responsible Tourism Practices</h4>
                  <p>The result is meaningful travel that respects the destinations visited.</p>
                </div>
              </div>
            </div>

            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/hx_sustainability_5.jpg" alt="Hybrid-powered expedition ship at sea" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/hx_sustainability_6.jpg" alt="Guests participating in citizen science aboard" />
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
              "One of the reasons I recommend HX Expeditions is their genuine commitment to responsible
              exploration. Sustainability isn't simply a marketing message—it's woven into the guest
              experience through education, scientific collaboration, and thoughtful expedition practices.
              Travelers return home with unforgettable memories and a greater appreciation for protecting
              our planet's most remarkable places."
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

      {/* ================= WHICH SUSTAINABILITY INITIATIVE MATTERS MOST TO YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Sustainability Initiative Matters Most to You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Hybrid Ships If You Want:</h4>
              <ul>
                <li><Check size={14} /> Lower carbon emissions</li>
                <li><Check size={14} /> Quieter onboard experiences</li>
                <li><Check size={14} /> Innovative maritime technology</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Citizen Science If You Want:</h4>
              <ul>
                <li><Check size={14} /> Hands-on research participation</li>
                <li><Check size={14} /> Wildlife &amp; ocean data collection</li>
                <li><Check size={14} /> A meaningful conservation contribution</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Responsible Wildlife Viewing If You Want:</h4>
              <ul>
                <li><Check size={14} /> Safe, respectful encounters</li>
                <li><Check size={14} /> Minimal disturbance to animals</li>
                <li><Check size={14} /> Strict regulatory compliance</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Conservation Partnerships If You Want:</h4>
              <ul>
                <li><Check size={14} /> Collaboration with universities &amp; scientists</li>
                <li><Check size={14} /> Support for biodiversity studies</li>
                <li><Check size={14} /> Contributions to ocean health research</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Environmental Education If You Want:</h4>
              <ul>
                <li><Check size={14} /> Daily lectures on climate &amp; ecosystems</li>
                <li><Check size={14} /> Deeper understanding of fragile environments</li>
                <li><Check size={14} /> Long-lasting, responsible travel habits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS SUSTAINABLE EXPEDITION TRAVEL RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is Sustainable Expedition Travel Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Travelers who value environmental responsibility</li>
                <li><Check size={14} /> Curious guests who enjoy learning onboard</li>
                <li><Check size={14} /> Wildlife enthusiasts &amp; conservation-minded travelers</li>
                <li><Check size={14} /> Guests who want their travel to have a positive impact</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers uninterested in environmental programming</li>
                <li><X size={14} /> Guests seeking a purely leisure-focused cruise</li>
                <li><X size={14} /> Those who prefer to skip educational lectures</li>
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
            <p>We're committed to helping you travel responsibly while enjoying an unforgettable adventure.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare Sustainable Expedition Itineraries</h4>
                <p>We help you weigh voyages side by side based on their sustainability initiatives.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Select the Ideal Destination</h4>
                <p>We match your interests to Antarctica, the Arctic, Greenland, Alaska, or the Galápagos.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Explain Sustainability Initiatives</h4>
                <p>We walk you through exactly how HX reduces its environmental footprint on every voyage.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Choose the Right Ship</h4>
                <p>We match your travel style to the HX ship that fits it best.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Arrange Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on the expedition ahead.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">06</div>
              <div>
                <h4>Personalize Every Aspect of Your Journey</h4>
                <p>With decades of luxury travel expertise, we tailor every detail to your travel values.</p>
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
                Is HX committed to sustainability? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Sustainability is a core part of HX's operations, including hybrid-powered ships, scientific research, responsible tourism, and environmental education.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                What makes HX different from other expedition cruise lines? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX combines expedition travel with science, conservation, education, and environmental responsibility.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What are hybrid-powered expedition ships? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Hybrid-powered ships combine traditional marine engines with battery technology to improve fuel efficiency and reduce emissions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Does HX support scientific research? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guests can participate in citizen science projects and contribute to environmental research during many voyages.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What is citizen science? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Citizen science allows travelers to assist scientists by collecting valuable environmental and wildlife data during expeditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Does HX have onboard Science Centers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Modern HX ships feature Science Centers with interactive learning experiences, scientific equipment, and expert presentations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                How does HX protect wildlife? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX follows strict wildlife viewing guidelines, maintains safe viewing distances, and complies with local and international environmental regulations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Does HX reduce plastic waste? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. HX has implemented initiatives to reduce unnecessary single-use plastics and encourage more sustainable onboard practices.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Are sustainability lectures included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Educational lectures on climate science, wildlife, conservation, and ecosystems are included on every expedition.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are sustainability practices different by destination? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Operational practices vary depending on local regulations and environmental requirements in destinations such as Antarctica, the Arctic, Greenland, Alaska, and the Galápagos.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Can guests actively participate in conservation? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many expeditions include opportunities to contribute to scientific research through citizen science programs.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Does sustainability affect the guest experience? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most travelers find sustainability enhances the expedition by providing deeper educational experiences and meaningful engagement with the destinations visited.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Are hybrid ships quieter? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Hybrid technology can reduce engine noise, creating a quieter experience that may benefit both guests and wildlife.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Why is environmental education important on HX voyages? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Education helps guests better understand fragile ecosystems and encourages responsible travel practices long after their expedition ends.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX expedition through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists explain HX's sustainability initiatives, recommend the right itinerary, and help you plan a meaningful expedition that aligns with your travel values.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Explore Responsibly?</h2>
          <p>
            HX proves that extraordinary adventure and environmental responsibility can go hand in hand.
            Whether you're exploring Antarctica, the Arctic, Greenland, Alaska, or the Galápagos, you'll
            travel with a company dedicated to protecting the places you visit.
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