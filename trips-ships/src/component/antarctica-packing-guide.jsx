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
  ThermometerSun,
  Clock,
  Sparkles,
  Backpack,
  Shirt,
  Battery,
  Layers,
  Luggage,
} from "lucide-react";

/**
 * Antarctica Packing Guide — Trips & Ships Luxury Travel
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
      "@id":"https://www.tripsandships.com/antarctica-packing-guide",
      "url":"https://www.tripsandships.com/antarctica-packing-guide",
      "name":"Antarctica Packing Guide",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" },
      "about":"Antarctica Packing Guide",
      "primaryImageOfPage":"https://www.tripsandships.com/images/antarctica-packing-guide.jpg"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Destinations", "item":"https://www.tripsandships.com/destinations" },
        { "@type":"ListItem", "position":3, "name":"Antarctica", "item":"https://www.tripsandships.com/antarctica" },
        { "@type":"ListItem", "position":4, "name":"Antarctica Packing Guide", "item":"https://www.tripsandships.com/antarctica-packing-guide" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What should I pack for an Antarctica cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Pack moisture-wicking base layers, insulating mid-layers, a waterproof outer layer, waterproof pants, warm accessories, and essential gear such as sunglasses, sunscreen, and a camera." }
        },
        {
          "@type":"Question",
          "name":"Do Antarctica cruises provide jackets?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most luxury expedition cruise operators provide a waterproof expedition parka, and many also provide insulated waterproof boots." }
        },
        {
          "@type":"Question",
          "name":"How cold is Antarctica during cruise season?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Summer temperatures typically range from -5°C to 5°C (23°F to 41°F) along the Antarctic Peninsula." }
        },
        {
          "@type":"Question",
          "name":"Do I need waterproof pants?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Waterproof pants are essential for Zodiac excursions and shore landings." }
        },
        {
          "@type":"Question",
          "name":"What luggage should I bring?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Bring a checked suitcase, a carry-on for valuables and medications, and a waterproof daypack for daily excursions." }
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

export default function AntarcticaPackingGuide() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState(1); // 0=Nov .. 4=Mar
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
            <Backpack size={14} /> LUXURY EXPEDITION GUIDE
          </div>
          <h1>Antarctica Packing Guide</h1>
          <p>
            Everything you need to pack for an extraordinary Antarctic expedition. While the White
            Continent is cold, modern luxury expedition cruises make exploring one of the world's most
            remote destinations surprisingly comfortable — as long as you bring the right clothing and gear.
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
            <div className="tsa_ss_month">Base Layer</div>
            <div className="tsa_ss_best">Merino wool or synthetic thermals</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Mid Layer</div>
            <div className="tsa_ss_best">Fleece, down or synthetic insulation</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Outer Layer</div>
            <div className="tsa_ss_best">Waterproof parka &amp; waterproof pants</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Footwear</div>
            <div className="tsa_ss_best">Insulated boots, warm wool socks</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Accessories</div>
            <div className="tsa_ss_best">Gloves, hat, sunglasses &amp; SPF</div>
          </div>
        </div>
      </div>

      {/* ================= WHY PACKING PROPERLY MATTERS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY PACKING PROPERLY MATTERS
            </div>
            <h2>Antarctica's Weather Can Change Quickly</h2>
            <p>
              One moment you may be enjoying calm sunshine while photographing penguins, and the next you
              could experience wind, light snow, or sea spray during a Zodiac excursion.
            </p>
            <p>
              Fortunately, you won't be facing extreme winter conditions typical of inland Antarctica. Most
              expedition cruises operate during the Antarctic summer when coastal temperatures generally
              range from -5°C to 5°C (23°F to 41°F).
            </p>
            <p>Rather than packing bulky clothing, the secret is wearing several lightweight layers that can easily be adjusted throughout the day.</p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Moisture-wicking base layers</div>
              <div className="tsa_chip"><Check size={16} /> Warm insulating mid layer</div>
              <div className="tsa_chip"><Check size={16} /> Waterproof outer shell</div>
              <div className="tsa_chip"><Check size={16} /> Insulated waterproof boots</div>
              <div className="tsa_chip"><Check size={16} /> Sun &amp; wind protection</div>
              <div className="tsa_chip"><Check size={16} /> A well-organized daypack</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">-5° to 5°C</div>
              <div className="tsa_why_card_label">Typical coastal temperature range during the cruise season</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">3</div>
              <div className="tsa_why_card_label">Layers you need: base, mid &amp; waterproof outer</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">1 bag</div>
              <div className="tsa_why_card_label">Checked suitcase most travelers need, plus a carry-on and daypack</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK PACKING CHECKLIST TABLE ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Packing Checklist</h2>
            <p>The essentials for clothing and gear, at a glance.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Bring</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Essential Clothing</td><td>Waterproof jacket &amp; pants, thermal base layers, fleece mid-layer, wool socks, gloves, beanie</td></tr>
                <tr><td>Essential Gear</td><td>Waterproof backpack, dry bag, water bottle, SPF 50+ sunscreen, binoculars</td></tr>
                <tr><td>Photography Equipment</td><td>Camera, zoom &amp; wide-angle lens, extra batteries, memory cards, waterproof bag</td></tr>
                <tr><td>Health &amp; Personal Items</td><td>Prescriptions, motion sickness medication, moisturizer, lip balm, toiletries</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= THE LAYERING SYSTEM (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>The Layering System</h2>
            <p>The most effective way to stay comfortable in Antarctica is by using a three-layer clothing system.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Layers size={20} /></div>
              <h4>Base Layer</h4>
              <p>Sits against your skin and wicks away moisture. Choose merino wool or synthetic thermals — avoid cotton.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Shirt size={20} /></div>
              <h4>Mid Layer</h4>
              <p>Traps body heat with fleece, down, or synthetic insulated jackets, providing warmth without restricting movement.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Outer Layer</h4>
              <p>Protects against wind, snow, rain, and sea spray. Most cruise lines provide the parka; bring your own waterproof pants.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ThermometerSun size={20} /></div>
              <h4>What Cruises Provide</h4>
              <p>Many luxury operators include an expedition parka, waterproof boots, trekking poles, and life jackets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEASONAL PACKING EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Seasonal Packing Tips, Month by Month</h2>
            <p>Select a month to see how to adjust your layers.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeMonth === 0 ? "active" : ""}`} onClick={() => setActiveMonth(0)}>
                <Snowflake size={18} /> <span className="tsa_month_tab_label">November</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 1 ? "active" : ""}`} onClick={() => setActiveMonth(1)}>
                <Layers size={18} /> <span className="tsa_month_tab_label">December</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 2 ? "active" : ""}`} onClick={() => setActiveMonth(2)}>
                <Sun size={18} /> <span className="tsa_month_tab_label">January</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 3 ? "active" : ""}`} onClick={() => setActiveMonth(3)}>
                <Camera size={18} /> <span className="tsa_month_tab_label">February</span>
              </button>
              <button className={`tsa_month_tab ${activeMonth === 4 ? "active" : ""}`} onClick={() => setActiveMonth(4)}>
                <ThermometerSun size={18} /> <span className="tsa_month_tab_label">March</span>
              </button>
            </div>

            {activeMonth === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Fresh Snow, Cooler Temperatures</div>
                  <h3 className="tsa_month_title">November</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Pack extra thermal layers</li>
                    <li><Check size={16} /> Bring warmer gloves</li>
                    <li><Check size={16} /> Add an additional fleece mid-layer</li>
                    <li><Check size={16} /> Prioritize wind protection for Zodiac cruises</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Extra Warmth</span>
                    <span>Early Season</span>
                    <span>Wind Protection</span>
                  </div>
                  <p className="tsa_month_note">
                    Fresh snow and cooler temperatures make early-season layering especially important.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Extra Layers</div>
                    <div className="tsa_stat_card_label">Packing Priority</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Warmer Gloves</div>
                    <div className="tsa_stat_card_label">Key Accessory</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "90%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Balanced Layering</div>
                  <h3 className="tsa_month_title">December</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Balanced layering works well as temperatures begin to moderate</li>
                    <li><Check size={16} /> Standard base, mid, and outer layer combination</li>
                    <li><Check size={16} /> Bring versatile accessories for changing conditions</li>
                    <li><Check size={16} /> Long daylight hours mean more time outdoors — pack accordingly</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Balanced Layers</span>
                    <span>Versatile Gear</span>
                    <span>Long Days Outdoors</span>
                  </div>
                  <p className="tsa_month_note">
                    A standard three-layer system is typically all you need in December.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Balanced Layers</div>
                    <div className="tsa_stat_card_label">Packing Priority</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Standard Kit</div>
                    <div className="tsa_stat_card_label">Key Accessory</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "70%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Mar</div></div>
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
                    <li><Check size={16} /> Still requires waterproof outerwear</li>
                    <li><Check size={16} /> Lighter mid-layers are often sufficient</li>
                    <li><Check size={16} /> Great conditions for kayaking gear and lighter gloves</li>
                    <li><Check size={16} /> Sun protection becomes a higher priority</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Lighter Mid-Layers</span>
                    <span>Sun Protection</span>
                    <span>Active Travelers</span>
                  </div>
                  <p className="tsa_month_note">
                    January's mild temperatures still call for waterproof outerwear, just with lighter insulation underneath.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Light Mid-Layer</div>
                    <div className="tsa_stat_card_label">Packing Priority</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Sun Protection</div>
                    <div className="tsa_stat_card_label">Key Accessory</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "55%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Perfect for Whale Watching</div>
                  <h3 className="tsa_month_title">February</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Bring waterproof clothing for spray-heavy whale encounters</li>
                    <li><Check size={16} /> Prioritize camera gear and extra memory cards</li>
                    <li><Check size={16} /> Additional storage cards for longer excursion days</li>
                    <li><Check size={16} /> Keep spare camera batteries warm and close to your body</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Camera Gear</span>
                    <span>Waterproof Clothing</span>
                    <span>Extra Storage Cards</span>
                  </div>
                  <p className="tsa_month_note">
                    February's whale-watching conditions call for prioritizing camera gear alongside your usual layers.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Waterproof Gear</div>
                    <div className="tsa_stat_card_label">Packing Priority</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Camera Gear</div>
                    <div className="tsa_stat_card_label">Key Accessory</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "65%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "85%" }} /><div className="tsa_bar_label">Mar</div></div>
                  </div>
                </div>
              </div>
            )}

            {activeMonth === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Temperatures Begin Cooling Again</div>
                  <h3 className="tsa_month_title">March</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Pack extra fleece as temperatures drop</li>
                    <li><Check size={16} /> Bring warm socks for cooler shore landings</li>
                    <li><Check size={16} /> Add additional gloves for late-season excursions</li>
                    <li><Check size={16} /> Layer up for quieter, colder whale-watching outings</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Extra Fleece</span>
                    <span>Warm Socks</span>
                    <span>Additional Gloves</span>
                  </div>
                  <p className="tsa_month_note">
                    As the season winds down, treat March packing much like November — layer up again.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <ThermometerSun size={22} />
                    <div className="tsa_stat_card_value">Extra Fleece</div>
                    <div className="tsa_stat_card_label">Packing Priority</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Warm Socks</div>
                    <div className="tsa_stat_card_label">Key Accessory</div>
                  </div>
                  <div className="tsa_bar_chart">
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "90%" }} /><div className="tsa_bar_label">Nov</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "70%" }} /><div className="tsa_bar_label">Dec</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "55%" }} /><div className="tsa_bar_label">Jan</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar" style={{ height: "65%" }} /><div className="tsa_bar_label">Feb</div></div>
                    <div className="tsa_bar_col"><div className="tsa_bar active" style={{ height: "85%" }} /><div className="tsa_bar_label">Mar</div></div>
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
              "One of the biggest surprises for first-time Antarctica travelers is how comfortable they
              feel with the right clothing. You don't need to pack excessively—just pack wisely. A simple
              layering system, waterproof gear, and a few essential accessories allow you to fully enjoy
              every incredible moment without worrying about the weather."
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

      {/* ================= PACKING BY ACTIVITY ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Packing by Activity</h2>
            <p>What to bring changes depending on where your day takes you.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Zodiac Cruises</h4>
              <p>Waterproof gloves, warm hat, camera, dry bag, and sunglasses for spray-heavy excursions.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Shore Landings</h4>
              <p>Waterproof boots, waterproof pants, layered clothing, and your expedition parka.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Onboard</h4>
              <p>Comfortable casual clothing for dining, lectures, observation lounges, and the spa.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Backpack size={20} /></div>
              <h4>Daypack Essentials</h4>
              <p>Camera, water bottle, gloves, hat, and extra layers, all in a waterproof backpack or dry bag.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROVIDED VS BRING YOURSELF ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What's Provided vs. What You Should Bring</h2>
            <p>Your expedition advisor will confirm exactly what's included with your chosen cruise.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Usually Provided by Cruise Line</th>
                  <th>You Should Bring</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Outerwear</td><td>Waterproof expedition parka</td><td>Waterproof insulated pants</td></tr>
                <tr><td>Footwear</td><td>Waterproof insulated boots</td><td>Wool socks, casual onboard shoes</td></tr>
                <tr><td>Hiking Support</td><td>Trekking poles (select voyages)</td><td>Comfortable walking shoes for onboard</td></tr>
                <tr><td>Safety Gear</td><td>Life jackets for Zodiac excursions</td><td>Thin liner gloves, neck gaiter</td></tr>
                <tr><td>Amenities</td><td>Hair dryers, laundry service (varies)</td><td>Personal toiletries, medications</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHICH PACKING LIST DO YOU NEED ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Packing List Do You Need?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>For Zodiac Cruises, Pack:</h4>
              <ul>
                <li><Check size={14} /> Waterproof gloves</li>
                <li><Check size={14} /> Warm hat</li>
                <li><Check size={14} /> Dry bag for your camera</li>
                <li><Check size={14} /> Polarized sunglasses</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Shore Landings, Pack:</h4>
              <ul>
                <li><Check size={14} /> Waterproof boots</li>
                <li><Check size={14} /> Waterproof pants</li>
                <li><Check size={14} /> Layered clothing</li>
                <li><Check size={14} /> Expedition parka</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Onboard Days, Pack:</h4>
              <ul>
                <li><Check size={14} /> Comfortable casual clothing</li>
                <li><Check size={14} /> Slip-resistant shoes</li>
                <li><Check size={14} /> Layers for lectures &amp; lounges</li>
                <li><Check size={14} /> Swimwear for the spa</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Photography, Pack:</h4>
              <ul>
                <li><Check size={14} /> DSLR or mirrorless camera</li>
                <li><Check size={14} /> Zoom &amp; wide-angle lenses</li>
                <li><Check size={14} /> Extra batteries &amp; memory cards</li>
                <li><Check size={14} /> Waterproof camera bag</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>For Electronics, Pack:</h4>
              <ul>
                <li><Check size={14} /> Universal travel adapter</li>
                <li><Check size={14} /> Portable battery pack</li>
                <li><Check size={14} /> Waterproof phone case</li>
                <li><Check size={14} /> Chargers for every device</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMON PACKING MISTAKES ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Packing Mistakes to Avoid</h2>
            <p>Many first-time travelers make avoidable packing mistakes.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Packing Too Much</h4>
                <p>Cabin storage is efficient but limited. Bring versatile clothing rather than large quantities.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Wearing Cotton</h4>
                <p>Cotton retains moisture and can leave you feeling cold. Choose wool or synthetic performance fabrics instead.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Forgetting Waterproof Pants</h4>
                <p>Many travelers assume only a jacket is necessary. Waterproof pants are essential for Zodiac landings and shore excursions.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Not Protecting Electronics</h4>
                <p>Sea spray and snow can damage cameras and phones. Waterproof bags are inexpensive but invaluable.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Skipping the Daypack</h4>
                <p>A waterproof backpack or dry bag keeps your camera, water bottle, and extra layers ready for every excursion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PACK THIS vs LEAVE THIS AT HOME ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Pack This, Leave This at Home</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Pack This</h3>
              <ul>
                <li><Check size={14} /> Moisture-wicking base layers</li>
                <li><Check size={14} /> Waterproof pants</li>
                <li><Check size={14} /> Wool socks &amp; thin liner gloves</li>
                <li><Check size={14} /> Sunscreen &amp; SPF lip balm</li>
                <li><Check size={14} /> Waterproof backpack or dry bag</li>
                <li><Check size={14} /> Motion sickness medication</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>Leave This at Home</h3>
              <ul>
                <li><X size={14} /> Cotton clothing</li>
                <li><X size={14} /> Heavy non-waterproof coats</li>
                <li><X size={14} /> Umbrellas</li>
                <li><X size={14} /> High heels &amp; formal evening wear</li>
                <li><X size={14} /> Excessive luggage</li>
                <li><X size={14} /> Hair dryers (usually provided onboard)</li>
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
                What should I pack for an Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Pack moisture-wicking base layers, insulating mid-layers, a waterproof jacket, waterproof pants, warm gloves, a hat, sunglasses, sunscreen, and a waterproof daypack. Most luxury expedition operators also provide waterproof boots and an expedition parka.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Do I need special clothing for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. The best approach is to dress in layers. A moisture-wicking base layer, a warm insulating layer, and a waterproof outer layer will keep you comfortable during changing weather conditions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Do Antarctica cruise lines provide jackets and boots? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most luxury expedition cruise operators provide an insulated waterproof expedition parka and waterproof boots for shore landings. Check with your cruise line to confirm exactly what is included.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                What type of shoes should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Bring comfortable walking shoes or sneakers for use onboard. Waterproof expedition boots for shore excursions are usually supplied by the cruise operator.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                How cold is Antarctica during the cruise season? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>During the Antarctic summer, temperatures typically range from -5°C to 5°C (23°F to 41°F) along the Antarctic Peninsula, although weather conditions can vary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Are waterproof pants necessary? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Waterproof pants are strongly recommended for Zodiac rides and shore landings, where you may encounter snow, ice, and sea spray.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Can I wear jeans in Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Jeans are fine while relaxing onboard but are not recommended for outdoor excursions because they absorb moisture and provide little insulation when wet.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                What accessories should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Essential accessories include waterproof gloves, a warm hat, neck gaiter, polarized sunglasses, sunscreen, SPF lip balm, reusable water bottle, and a waterproof backpack or dry bag.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                What camera equipment is best for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>A DSLR or mirrorless camera with a zoom lens, wide-angle lens, spare batteries, extra memory cards, and a waterproof camera bag is ideal for capturing Antarctica's wildlife and landscapes.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Do I need motion sickness medication? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>If your itinerary includes crossing the Drake Passage, it's a good idea to bring motion sickness medication or other remedies, even if you're not usually prone to seasickness.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Is formal clothing required on a luxury Antarctica cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Most luxury expedition cruises have a smart-casual dress code, and formal attire is generally not required.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Can I do laundry onboard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many luxury expedition ships offer laundry services or self-service laundry facilities, although availability and pricing vary by cruise line.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                How much luggage should I bring? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most travelers only need one checked suitcase, one carry-on bag, and a small waterproof daypack for daily excursions. Packing efficiently makes travel easier.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                What should I avoid packing for Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Avoid cotton clothing, heavy non-waterproof coats, high heels, umbrellas, excessive luggage, and unnecessary formal wear. Lightweight layers and waterproof gear are far more practical.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                When should I start preparing for my Antarctica trip? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Ideally, begin preparing several months before departure. This gives you enough time to purchase any specialized clothing, test your gear, review your packing checklist, and ensure you're fully ready for your expedition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Start Planning?</h2>
          <p>
            Packing well means spending less time worrying about the weather and more time enjoying
            Antarctica's breathtaking wildlife, spectacular icebergs, and unforgettable landscapes. Whether
            you're preparing for your first expedition or comparing luxury cruise options, our specialists
            can help you travel with confidence.
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