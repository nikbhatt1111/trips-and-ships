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
  Utensils,
  Coffee,
  Wine,
  Leaf,
  ShieldCheck,
} from "lucide-react";

/**
 * HX Dining Guide — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * NOTE: Image/video sources below are placeholders — swap the URLs
 * in PLACEHOLDER_IMAGES / PLACEHOLDER_VIDEO for real production assets.
 */

const PLACEHOLDER_IMAGES = {
  heroTall: "https://placehold.co/800x920/0f1c2e/8fb4e8?text=Onboard+Fine+Dining",
  gridA: "https://placehold.co/640x420/16243a/8fb4e8?text=Main+Restaurant",
  gridB: "https://placehold.co/640x420/1c2f4a/8fb4e8?text=Specialty+Tasting+Menu",
  gridC: "https://placehold.co/640x420/101b2c/8fb4e8?text=Ocean+View+Dining",
  videoPoster: "https://placehold.co/1280x720/0f1c2e/8fb4e8?text=Watch%3A+Dining+Aboard+HX",
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
      "@id":"https://www.tripsandships.com/hx-dining",
      "url":"https://www.tripsandships.com/hx-dining",
      "name":"HX Dining Guide",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"HX Dining Guide",
      "primaryImageOfPage":"https://www.tripsandships.com/images/hx-dining-guide.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"HX Expeditions", "item":"https://www.tripsandships.com/hx" },
        { "@type":"ListItem", "position":4, "name":"HX Dining Guide", "item":"https://www.tripsandships.com/hx-dining" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"Is dining included on HX Expeditions?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. HX offers an all-inclusive dining experience with breakfast, lunch, and dinner included." }
        },
        {
          "@type":"Question",
          "name":"How many restaurants are onboard HX ships?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The number of restaurants varies by ship, with most offering multiple dining venues including a main restaurant, casual dining, and specialty options." }
        },
        {
          "@type":"Question",
          "name":"Does HX offer vegetarian and vegan meals?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Vegetarian, vegan, gluten-free, and other dietary requirements can be accommodated with advance notice." }
        },
        {
          "@type":"Question",
          "name":"What type of cuisine is served?",
          "acceptedAnswer":{ "@type":"Answer", "text":"HX serves international cuisine, regional specialties, fresh seafood, premium meats, and locally inspired dishes." }
        },
        {
          "@type":"Question",
          "name":"Is there a dress code for dinner?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Dining is smart casual, and formal evenings are generally not part of the HX experience." }
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

export default function HXDiningGuide() {
  const [theme, setTheme] = useState("light");
  const [activeMeal, setActiveMeal] = useState(1); // 0=Breakfast .. 4=Specialty Dining
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
            <Utensils size={14} /> HX DINING GUIDE
          </div>
          <h1>HX Dining Guide</h1>
          <p>
            Dining is an essential part of every HX Expeditions voyage. Whether you're exploring
            Antarctica, the Arctic, Greenland, or the Galápagos, you'll enjoy fresh, regionally inspired
            cuisine crafted to complement your expedition experience — served with comfortable venues and
            attentive service, surrounded by some of the world's most spectacular scenery.
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
            <div className="tsa_ss_month">Breakfast</div>
            <div className="tsa_ss_best">Generous buffet, eggs cooked to order, fresh juices</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Lunch</div>
            <div className="tsa_ss_best">International buffet, fresh salads, seafood, soups</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Dinner</div>
            <div className="tsa_ss_best">Premium seafood, seasonal vegetables, artisan desserts</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Casual Dining</div>
            <div className="tsa_ss_best">Light meals, sandwiches, hot entrées, all day</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Specialty Dining</div>
            <div className="tsa_ss_best">Chef-inspired tasting menus, intimate atmosphere</div>
          </div>
        </div>
      </div>

      {/* ================= WHY GUESTS LOVE DINING ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY GUESTS LOVE DINING ON HX
            </div>
            <h2>A Culinary Experience Made for Expedition Travel</h2>
            <p>
              Meals aboard HX are designed to complement your expedition by combining fresh ingredients,
              regional flavors, and high-quality service.
            </p>
            <p>
              At Trips &amp; Ships Luxury Travel, we help travelers choose the right HX expedition while
              ensuring every aspect of their journey — including onboard dining — matches their expectations.
            </p>
            <p>Dining is both a culinary and social experience, set against some of the world's most spectacular scenery.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Locally inspired cuisine</div>
              <div className="tsa_chip"><Check size={16} /> Fresh seafood</div>
              <div className="tsa_chip"><Check size={16} /> Seasonal ingredients</div>
              <div className="tsa_chip"><Check size={16} /> Relaxed atmosphere</div>
              <div className="tsa_chip"><Check size={16} /> Scenic ocean views</div>
              <div className="tsa_chip"><Check size={16} /> Flexible dining times</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">All-Inclusive</div>
              <div className="tsa_why_card_label">Breakfast, lunch, and dinner included in every HX cruise fare</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Multiple</div>
              <div className="tsa_why_card_label">Dining venues available, varying by ship</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Smart Casual</div>
              <div className="tsa_why_card_label">Relaxed dress code — formal nights are not part of the HX experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GALLERY ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Camera size={14} /> DINING ABOARD HX
            </div>
            <h2>A Look at the HX Dining Experience</h2>
            <p>
              From hearty breakfasts before morning excursions to chef-inspired tasting menus in the
              evening, HX dining venues are designed for comfort, flavor, and spectacular views.
            </p>
          </div>
          <div className="tsa_media_grid">
            <div className="tsa_media_card tall">
              <img src="/assets/HX_Dining_Guide_1.jpg" loading="lazy" alt="Main restaurant table set for dinner aboard an HX ship" />
              <div className="tsa_media_caption">The main restaurant serves breakfast, lunch, and dinner daily</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Dining_Guide_2.jpg" loading="lazy" alt="Fresh seafood plate served aboard HX" />
              <div className="tsa_media_caption">Fresh, regionally inspired seafood is a signature of HX menus</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Dining_Guide_3.jpg" loading="lazy" alt="Chef preparing a specialty tasting menu dish" />
              <div className="tsa_media_caption">Specialty dining offers chef-inspired tasting menus on select ships</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Dining_Guide_4.jpg" loading="lazy" alt="Guests enjoying a casual meal with ocean views" />
              <div className="tsa_media_caption">Casual dining venues offer light meals with scenic ocean views</div>
            </div>
            <div className="tsa_media_card">
              <img src="/assets/HX_Dining_Guide_5.jpg" loading="lazy" alt="Coffee and pastries served during breakfast" />
              <div className="tsa_media_caption">Complimentary coffee and tea are available throughout the day</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Dining at a Glance</h2>
            <p>
              A quick reference for what to expect from dining venues, cuisine, and beverages aboard
              your HX expedition.
            </p>
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
                <tr><td>Dining Style</td><td>All-Inclusive</td></tr>
                <tr><td>Main Restaurants</td><td>Multiple venues (ship dependent)</td></tr>
                <tr><td>Cuisine</td><td>International &amp; Regional</td></tr>
                <tr><td>Specialty Dining</td><td>Available on selected ships</td></tr>
                <tr><td>Vegetarian Options</td><td>Yes</td></tr>
                <tr><td>Vegan Options</td><td>Yes</td></tr>
                <tr><td>Dietary Requirements</td><td>Accommodated with advance notice</td></tr>
                <tr><td>Complimentary Coffee &amp; Tea</td><td>Yes</td></tr>
                <tr><td>Beverage Packages</td><td>Available on selected voyages</td></tr>
                <tr><td>Dress Code</td><td>Smart Casual</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= DINING VENUES (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Dining Venues</h2>
            <p>Depending on the ship, guests may enjoy a variety of dining options throughout the day.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Utensils size={20} /></div>
              <h4>Main Restaurant</h4>
              <p>Buffet breakfasts, à la carte dinners, and freshly prepared regional specialties.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Coffee size={20} /></div>
              <h4>Casual Dining</h4>
              <p>Perfect for lighter meals — salads, soups, sandwiches, and hot entrées.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Specialty Dining</h4>
              <p>Chef-inspired tasting menus with premium ingredients on select HX ships.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Regional Cuisine</h4>
              <p>Nordic, South American, and other local flavors woven into every itinerary.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEAL BY MEAL EXPLORER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Meal-by-Meal Guide</h2>
            <p>Select a meal or venue to explore its highlights, typical offerings, and what to expect.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeMeal === 0 ? "active" : ""}`} onClick={() => setActiveMeal(0)}>
                <Coffee size={18} /> <span className="tsa_month_tab_label">Breakfast</span>
              </button>
              <button className={`tsa_month_tab ${activeMeal === 1 ? "active" : ""}`} onClick={() => setActiveMeal(1)}>
                <Utensils size={18} /> <span className="tsa_month_tab_label">Lunch</span>
              </button>
              <button className={`tsa_month_tab ${activeMeal === 2 ? "active" : ""}`} onClick={() => setActiveMeal(2)}>
                <Wine size={18} /> <span className="tsa_month_tab_label">Dinner</span>
              </button>
              <button className={`tsa_month_tab ${activeMeal === 3 ? "active" : ""}`} onClick={() => setActiveMeal(3)}>
                <Leaf size={18} /> <span className="tsa_month_tab_label">Casual Dining</span>
              </button>
              <button className={`tsa_month_tab ${activeMeal === 4 ? "active" : ""}`} onClick={() => setActiveMeal(4)}>
                <Sparkles size={18} /> <span className="tsa_month_tab_label">Specialty Dining</span>
              </button>
            </div>

            {activeMeal === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Start Each Expedition Day Right</div>
                  <h3 className="tsa_month_title">Breakfast</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Fresh fruit, yogurt, and pastries</li>
                    <li><Check size={16} /> Eggs cooked to order, bacon, and sausages</li>
                    <li><Check size={16} /> Cereals and fresh juices</li>
                    <li><Check size={16} /> Complimentary coffee and tea</li>
                    <li><Check size={16} /> A hearty start before morning excursions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Early Excursions</span>
                    <span>Hearty Starts</span>
                    <span>Buffet Style</span>
                  </div>
                  <p className="tsa_month_note">
                    A generous breakfast prepares guests for the day's activities, served buffet-style
                    in the main restaurant.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Utensils size={22} />
                    <div className="tsa_stat_card_value">Buffet</div>
                    <div className="tsa_stat_card_label">Service Style</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Flexible</div>
                    <div className="tsa_stat_card_label">Serving Times</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">Bkfst</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Lunch</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Dinner</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Casual</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Spclty</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMeal === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Refuel Between Expedition Activities</div>
                  <h3 className="tsa_month_title">Lunch</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> International buffet and fresh salads</li>
                    <li><Check size={16} /> Seafood, pasta, and sandwiches</li>
                    <li><Check size={16} /> Soup and regional dishes</li>
                    <li><Check size={16} /> Desserts to round out the meal</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Between Excursions</span>
                    <span>Quick &amp; Varied</span>
                    <span>Buffet Style</span>
                  </div>
                  <p className="tsa_month_note">
                    Lunch is designed to refuel guests between expedition activities with a varied,
                    international buffet.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Utensils size={22} />
                    <div className="tsa_stat_card_value">Buffet</div>
                    <div className="tsa_stat_card_label">Service Style</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Flexible</div>
                    <div className="tsa_stat_card_label">Serving Times</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Bkfst</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "65%" }} /><div className="tsa_bar_label">Lunch</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Dinner</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Casual</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Spclty</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMeal === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">A Highlight of the Voyage</div>
                  <h3 className="tsa_month_title">Dinner</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Premium seafood, beef, and poultry</li>
                    <li><Check size={16} /> Vegetarian entrées and seasonal vegetables</li>
                    <li><Check size={16} /> Artisan desserts and fine cheeses</li>
                    <li><Check size={16} /> Many dishes reflect the regions being explored</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Evening Highlight</span>
                    <span>À La Carte</span>
                    <span>Regional Flavors</span>
                  </div>
                  <p className="tsa_month_note">
                    Evening dining is one of the highlights of the voyage, with à la carte menus that
                    often reflect the destinations being explored.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Utensils size={22} />
                    <div className="tsa_stat_card_value">À La Carte</div>
                    <div className="tsa_stat_card_label">Service Style</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Evening</div>
                    <div className="tsa_stat_card_label">Serving Times</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Bkfst</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Lunch</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "95%" }} /><div className="tsa_bar_label">Dinner</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Casual</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Spclty</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMeal === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Light Meals, Anytime</div>
                  <h3 className="tsa_month_title">Casual Dining</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Salads, soups, and sandwiches</li>
                    <li><Check size={16} /> Fresh seafood and hot entrées</li>
                    <li><Check size={16} /> Desserts throughout the day</li>
                    <li><Check size={16} /> Informal, relaxed atmosphere</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Light Meals</span>
                    <span>Informal Dining</span>
                    <span>All-Day Access</span>
                  </div>
                  <p className="tsa_month_note">
                    Casual dining is perfect for guests who want a lighter, more informal meal outside
                    of the main restaurant's set service times.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Leaf size={22} />
                    <div className="tsa_stat_card_value">Informal</div>
                    <div className="tsa_stat_card_label">Service Style</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">All Day</div>
                    <div className="tsa_stat_card_label">Serving Times</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Bkfst</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Lunch</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Dinner</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "55%" }} /><div className="tsa_bar_label">Casual</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Spclty</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMeal === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Elevated, Chef-Inspired Dining</div>
                  <h3 className="tsa_month_title">Specialty Dining</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Chef-inspired tasting menus</li>
                    <li><Check size={16} /> Premium ingredients</li>
                    <li><Check size={16} /> Intimate dining atmosphere</li>
                    <li><Check size={16} /> Elevated culinary experiences</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Special Occasions</span>
                    <span>Elevated Cuisine</span>
                    <span>Intimate Setting</span>
                  </div>
                  <p className="tsa_month_note">
                    Available on select HX ships, with reservations sometimes required. A memorable
                    upgrade for guests celebrating a special occasion.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Sparkles size={22} />
                    <div className="tsa_stat_card_value">Tasting Menu</div>
                    <div className="tsa_stat_card_label">Service Style</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Reservation</div>
                    <div className="tsa_stat_card_label">May Be Required</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Bkfst</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Lunch</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "95%" }} /><div className="tsa_bar_label">Dinner</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Casual</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "85%" }} /><div className="tsa_bar_label">Spclty</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= VIDEO: DINING ABOARD HX ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center">
              <Play size={14} /> ONBOARD EXPERIENCE
            </div>
            <h2>Experience Dining Aboard HX</h2>
            <p>Watch what a typical mealtime feels like aboard an HX expedition ship — from a hearty breakfast before excursions to a relaxed, regionally inspired dinner in the evening.</p>
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
                  ? "https://www.youtube.com/embed/Ldff62yo0Z4?si=p86gNtld3zvS95XV"
                  : "https://www.youtube.com/embed/Ldff62yo0Z4?si=p86gNtld3zvS95XV"
              }
              title="Dining Aboard HX"
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
              "HX delivers an outstanding dining experience that perfectly complements expedition travel.
              Guests enjoy high-quality cuisine, regional inspiration, and relaxed dining environments
              that reflect the spirit of exploration while maintaining exceptional comfort."
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
            <h2>Why Book with Trips &amp; Ships Luxury Travel?</h2>
            <p>
              We'll help you select the ideal HX voyage based on your preferences and travel style,
              including every detail of your onboard dining experience.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Compare HX Ships</h4>
              <p>We help you compare ships and understand each one's dining options.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Choose the Right Suite</h4>
              <p>We match your suite category to your comfort and dining preferences.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Leaf size={20} /></div>
              <h4>Coordinate Dietary Requests</h4>
              <p>We ensure your dietary requirements are communicated well before sailing.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Personalize Your Expedition</h4>
              <p>Flights, hotels, and every detail arranged around your travel style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIETARY + BEVERAGES TABLES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Dietary Requirements &amp; Beverages</h2>
            <p>HX accommodates a wide range of dietary needs and offers a variety of beverage options.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Dietary Need</th>
                    <th>Accommodated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Vegetarian</td><td>Yes</td></tr>
                  <tr><td>Vegan</td><td>Yes</td></tr>
                  <tr><td>Gluten-Free</td><td>Yes</td></tr>
                  <tr><td>Dairy-Free</td><td>Yes</td></tr>
                  <tr><td>Nut Allergies</td><td>Yes</td></tr>
                  <tr><td>Low-Sodium Meals</td><td>Yes</td></tr>
                  <tr><td>Religious Dietary Preferences</td><td>Yes</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th>Beverage</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Complimentary Coffee</td><td>Yes</td></tr>
                  <tr><td>Premium Teas</td><td>Yes</td></tr>
                  <tr><td>Soft Drinks</td><td>Varies by voyage</td></tr>
                  <tr><td>Wine with Meals</td><td>Selected itineraries</td></tr>
                  <tr><td>Beer</td><td>Available</td></tr>
                  <tr><td>Cocktails &amp; Premium Spirits</td><td>Available</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHICH VENUE IS RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Dining Venue Is Right for You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose the Main Restaurant If You Want:</h4>
              <ul>
                <li><Check size={14} /> Buffet breakfasts</li>
                <li><Check size={14} /> À la carte dinners</li>
                <li><Check size={14} /> Regional specialties</li>
                <li><Check size={14} /> A full daily dining routine</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Casual Dining If You Want:</h4>
              <ul>
                <li><Check size={14} /> Lighter, informal meals</li>
                <li><Check size={14} /> Flexible serving times</li>
                <li><Check size={14} /> Sandwiches, salads, and soups</li>
                <li><Check size={14} /> A relaxed, no-fuss atmosphere</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Specialty Dining If You Want:</h4>
              <ul>
                <li><Check size={14} /> Chef-inspired tasting menus</li>
                <li><Check size={14} /> Premium ingredients</li>
                <li><Check size={14} /> An intimate atmosphere</li>
                <li><Check size={14} /> A special-occasion meal</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Regional Menus If You Want:</h4>
              <ul>
                <li><Check size={14} /> Nordic or South American flavors</li>
                <li><Check size={14} /> Fresh, local ingredients</li>
                <li><Check size={14} /> A culinary connection to your itinerary</li>
                <li><Check size={14} /> International classics alongside local dishes</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Room Service If You Want:</h4>
              <ul>
                <li><Check size={14} /> In-suite dining flexibility</li>
                <li><Check size={14} /> Availability in selected suite categories</li>
                <li><Check size={14} /> A quieter, private meal</li>
                <li><Check size={14} /> Convenience around your schedule</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REGIONAL CUISINE TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Regional Cuisine by Itinerary</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Focus</th>
                  <th>Menu Highlights</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Antarctica</td><td>Fresh seafood &amp; international classics</td><td>Premium seafood, seasonal vegetables</td></tr>
                <tr><td>Arctic &amp; Greenland</td><td>Nordic specialties</td><td>Local ingredients, Nordic-inspired dishes</td></tr>
                <tr><td>Galápagos</td><td>South American cuisine</td><td>Fresh seafood, regional produce</td></tr>
                <tr><td>All Itineraries</td><td>International classics</td><td>Familiar favorites alongside regional dishes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= COMMON MISTAKES ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Dining Mistakes to Avoid</h2>
            <p>A little planning ensures your dining experience matches your expectations.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Not Communicating Dietary Needs Early</h4>
                <p>Vegetarian, vegan, allergy, and other dietary requirements should be shared before sailing.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Expecting Formal Nights</h4>
                <p>HX dining is smart casual throughout the voyage — formal evenings are generally not part of the experience.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Skipping Specialty Dining Reservations</h4>
                <p>Specialty venues may require reservations and can fill up, so plan ahead where offered.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Overlooking Regional Menus</h4>
                <p>Locally inspired dishes are part of the experience — don't default only to familiar options.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Assuming All Beverages Are Included</h4>
                <p>Coffee and tea are complimentary, but other beverage inclusions vary by voyage and fare.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IS THIS RIGHT FOR YOU ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Is HX Dining Right for You?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Best For</h3>
              <ul>
                <li><Check size={14} /> Guests who enjoy fresh, regionally inspired cuisine</li>
                <li><Check size={14} /> Travelers with dietary requirements needing accommodation</li>
                <li><Check size={14} /> Those who prefer a relaxed, smart-casual atmosphere</li>
                <li><Check size={14} /> Guests who value flexible dining times</li>
                <li><Check size={14} /> Families seeking child-friendly menu options</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Guests expecting nightly formal dining</li>
                <li><X size={14} /> Travelers wanting unlimited alcohol on every voyage</li>
                <li><X size={14} /> Those expecting specialty dining without reservations</li>
                <li><X size={14} /> Guests who didn't communicate dietary needs in advance</li>
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
                Is dining included on HX Expeditions? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. HX offers an all-inclusive dining experience with breakfast, lunch, and dinner included in your cruise fare.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How many restaurants are onboard HX ships? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The number of restaurants varies by ship, with most offering multiple dining venues including a main restaurant, casual dining, and specialty options.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are specialty restaurants included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Some specialty dining experiences are included, while others may require reservations depending on the ship and itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Does HX offer vegetarian and vegan meals? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Vegetarian, vegan, gluten-free, and other dietary requirements can be accommodated with advance notice.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What type of cuisine is served? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Guests enjoy international cuisine, regional specialties, fresh seafood, premium meats, vegetarian dishes, and locally inspired menus.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Is room service available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Room service is available in selected suite categories and may vary by ship.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are drinks included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Coffee and tea are complimentary, while beverage inclusions vary depending on the voyage and fare.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Is there a dress code for dinner? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. The dress code is smart casual, and formal evenings are generally not part of the HX experience.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Can food allergies be accommodated? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Guests should notify HX of any food allergies or dietary restrictions before departure.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Are children's meals available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Family-friendly menu options are available on voyages that welcome children.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Is dining flexible? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. HX offers flexible dining times and relaxed seating arrangements on most voyages.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Does HX use local ingredients? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Whenever possible, HX incorporates regional ingredients and locally inspired cuisine into its menus.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Is alcohol available onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Wine, beer, cocktails, and premium spirits are available, with inclusions varying by itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Are snacks available between meals? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Depending on the ship, light snacks, pastries, beverages, and refreshments are available throughout the day.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX expedition through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our experts help you compare ships, dining experiences, cabin categories, and itineraries while ensuring your voyage is tailored to your preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience HX Dining?</h2>
          <p>
            Exceptional cuisine is part of every HX expedition. Whether you're sailing to Antarctica or
            the Arctic, you'll enjoy delicious meals, attentive service, and memorable dining experiences
            throughout your journey.
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