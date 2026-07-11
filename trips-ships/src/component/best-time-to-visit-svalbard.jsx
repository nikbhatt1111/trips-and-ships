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
 * Best Time to Visit Svalbard — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * MEDIA ADDED IN THIS VERSION:
 *  1. HERO        — background video/image behind the nav + headline
 *  2. A YEAR THERE — left/right split: timeline (left) + stacked photos (right)
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
      "@type":"Person",
      "@id":"https://www.tripsandships.com/#angelahughes",
      "name":"Angela Hughes",
      "jobTitle":"CEO",
      "worksFor":{"@id":"https://www.tripsandships.com/#organization"},
      "description":"Founder of Luxury Travel University and CEO of Trips & Ships Luxury Travel with more than 40 years of luxury travel experience."
    },
    {
      "@type":"WebPage",
      "@id":"https://www.tripsandships.com/best-time-to-visit-svalbard",
      "url":"https://www.tripsandships.com/best-time-to-visit-svalbard",
      "name":"Best Time to Visit Svalbard",
      "headline":"Best Time to Visit Svalbard | Month-by-Month Guide & Wildlife Seasons",
      "isPartOf":{"@id":"https://www.tripsandships.com/#organization"},
      "about":{ "@type":"Place", "name":"Svalbard" }
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"https://www.tripsandships.com" },
        { "@type":"ListItem", "position":2, "name":"Arctic Cruises", "item":"https://www.tripsandships.com/arctic-cruises" },
        { "@type":"ListItem", "position":3, "name":"Best Time to Visit Svalbard", "item":"https://www.tripsandships.com/best-time-to-visit-svalbard" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the best month to visit Svalbard?",
          "acceptedAnswer":{ "@type":"Answer", "text":"July is one of the most popular months thanks to abundant wildlife, accessible sea ice, and 24-hour daylight." }
        },
        {
          "@type":"Question",
          "name":"When can you see polar bears in Svalbard?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The best opportunities are from June through August during expedition cruises." }
        },
        {
          "@type":"Question",
          "name":"When is the Midnight Sun in Svalbard?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The Midnight Sun typically lasts from late April until late August." }
        },
        {
          "@type":"Question",
          "name":"When can you see the Northern Lights in Svalbard?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The Northern Lights are most visible between October and February." }
        },
        {
          "@type":"Question",
          "name":"Is summer the best time for Svalbard cruises?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Most expedition cruises operate between late May and early September." }
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

export default function BestTimeToVisitSvalbard() {
  const [theme, setTheme] = useState("light");
  const [openFaq, setOpenFaq] = useState({});
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
        {/* Background media layer — replace src with your own footage/photo */}
        {/* <div className="tsa_hero_media">
          <video autoPlay muted loop playsInline poster="https://placehold.co/1600x900/0f1c2e/1c2f4a?text=Svalbard+Hero+Poster">
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="tsa_hero_scrim" /> */}

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
            <Compass size={14} /> ARCTIC EXPEDITION GUIDE
          </div>
          <h1>Best Time to Visit Svalbard</h1>
          <p>
            Located halfway between mainland Norway and the North Pole, Svalbard is one of the world's
            most extraordinary Arctic destinations. Home to polar bears, glaciers, walruses, whales,
            seabird colonies, and dramatic fjords, this remote archipelago offers unforgettable experiences
            throughout the year.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Explore Svalbard Expeditions <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an Arctic Travel Specialist</button>
          </div>
        </div>
      </header>

      <div className="tsa_wrap">
        <div className="tsa_season_strip tsa_reveal">
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Spring</div>
            <div className="tsa_ss_best">Snowmobiling, frozen fjords, returning sunlight</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Summer</div>
            <div className="tsa_ss_best">Midnight Sun, polar bears, expedition cruises</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Autumn</div>
            <div className="tsa_ss_best">Golden tundra, fewer visitors, early Aurora</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Winter</div>
            <div className="tsa_ss_best">Northern Lights, dog sledding, Polar Night</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Expedition Season</div>
            <div className="tsa_ss_best">Late May through early September, ships at their most active</div>
          </div>
        </div>
      </div>

      {/* ================= QUICK ANSWER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: When Is the Best Time to Visit Svalbard?</h2>
            <p>
              For most travelers, June through August is the best time to visit Svalbard. During these
              months, the Midnight Sun provides 24-hour daylight, wildlife is highly active, and sea ice
              retreats enough for expedition ships to explore remote fjords.
            </p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> 24-hour Midnight Sun</div>
            <div className="tsa_chip"><Check size={16} /> Polar bears &amp; walruses</div>
            <div className="tsa_chip"><Check size={16} /> Whale watching</div>
            <div className="tsa_chip"><Check size={16} /> Northern Lights (Oct–Feb)</div>
            <div className="tsa_chip"><Check size={16} /> Snowmobiling &amp; dog sledding</div>
            <div className="tsa_chip"><Check size={16} /> Glacier exploration</div>
          </div>
        </div>
      </section>

      {/* ================= EVERY SEASON IS DIFFERENT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY SEASON MATTERS
            </div>
            <h2>Svalbard Rewards Every Season</h2>
            <p>The best time to visit Svalbard depends on what you hope to experience — every season offers something unique.</p>
            <p>
              At Trips &amp; Ships Luxury Travel, we help travelers choose the perfect season, itinerary,
              and expedition cruise to match their interests and travel goals.
            </p>
            <p>If your priority is the Northern Lights, visit between October and February, while March through May offers spectacular snowy landscapes ideal for snowmobiling.</p>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Jun–Aug</div>
              <div className="tsa_why_card_label">Best overall time to visit, for wildlife and the Midnight Sun</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Oct–Feb</div>
              <div className="tsa_why_card_label">Best window for viewing the Northern Lights</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Late May–Sept</div>
              <div className="tsa_why_card_label">When most expedition cruises operate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BEST TIME FOR (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Best Time for Svalbard's Top Experiences</h2>
            <p>A quick guide to when each Svalbard highlight is at its best.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Expedition Cruises</h4>
              <p>May through September, when sea routes are most accessible.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Polar Bears</h4>
              <p>June through August offer the greatest viewing opportunities.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sun size={20} /></div>
              <h4>Midnight Sun</h4>
              <p>Late April through late August, with 24-hour daylight.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Northern Lights</h4>
              <p>October through February, under long Arctic nights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= A YEAR IN SVALBARD (TIMELINE + SPLIT MEDIA) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>A Year in Svalbard</h2>
            <p>From the Midnight Sun to the Polar Night, Svalbard transforms dramatically through the year:</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Summer</div>
                  <h4>Peak Expedition Season</h4>
                  <p>Midnight Sun, expedition cruises, polar bear and walrus viewing, whale watching, hiking, and bird cliffs — the most popular time to visit.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Autumn &amp; Spring</div>
                  <h4>Quieter Shoulder Seasons</h4>
                  <p>Autumn brings golden tundra, fewer visitors, and early Aurora; spring offers snowmobile expeditions, frozen fjords, and returning sunlight.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Winter</div>
                  <h4>The Polar Night</h4>
                  <p>Northern Lights, dog sledding, snowmobiling, ice caves, and Arctic darkness — a magical season for adventurous travelers.</p>
                </div>
              </div>
              <p style={{ textAlign: "center", marginTop: 24, color: "var(--tsa-text-muted)", fontStyle: "italic" }}>
                Weather changes quickly, so layered clothing is essential in every season.
              </p>
            </div>

            {/* Stacked photo frames — replace both src attributes with real photography */}
            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/Best_Time_to_Visit_Svalbard_2.jpg" alt="Polar bear on sea ice in Svalbard" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/Best_Time_to_Visit_Svalbard_1.jpg" alt="Northern Lights over a Svalbard fjord" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WEATHER OVERVIEW ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Weather &amp; Best Activities by Season</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Average Temperature</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Spring</td><td>-15°C to -2°C</td><td>Snowmobiling, ski touring, photography</td></tr>
                <tr><td>Summer</td><td>2°C to 8°C</td><td>Wildlife, expedition cruises, Midnight Sun</td></tr>
                <tr><td>Autumn</td><td>-5°C to 4°C</td><td>Autumn colors, whale watching, early Aurora</td></tr>
                <tr><td>Winter</td><td>-20°C to -8°C</td><td>Northern Lights, dog sledding, ice caves</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WILDLIFE & PHOTOGRAPHY (compare cols + video) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Wildlife Calendar &amp; Best Times for Photography</h2>
            <p>Time your visit around the wildlife and light you most want to see.</p>
          </div>
          <div className="tsa_compare_grid">
            <div className="tsa_compare_col lux">
              <h3><Fish size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Wildlife Calendar</h3>
              <div className="tsa_compare_row"><Check size={16} /> Polar Bears — June–August</div>
              <div className="tsa_compare_row"><Check size={16} /> Walrus — June–August</div>
              <div className="tsa_compare_row"><Check size={16} /> Beluga &amp; Minke Whales — June–September</div>
              <div className="tsa_compare_row"><Check size={16} /> Arctic Fox — March–August</div>
              <div className="tsa_compare_row"><Check size={16} /> Puffins &amp; Little Auks — May–August</div>
              <div className="tsa_compare_row"><Check size={16} /> Reindeer &amp; Seals — Year-round</div>
            </div>
            <div className="tsa_compare_col trad">
              <h3><Camera size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Best for Photography</h3>
              <div className="tsa_compare_row"><Check size={16} /> June–August: wildlife &amp; Midnight Sun</div>
              <div className="tsa_compare_row"><Check size={16} /> June–August: icebergs &amp; glaciers</div>
              <div className="tsa_compare_row"><Check size={16} /> October–February: Northern Lights</div>
              <div className="tsa_compare_row"><Check size={16} /> October–February: snow &amp; Polar Night</div>
              <div className="tsa_compare_row"><Check size={16} /> October–February: winter scenery</div>
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
                  ? "https://www.youtube.com/embed/4ZRGMuphCXE?si=NT_V5hSsHVleoGtx"
                  : "https://www.youtube.com/embed/4ZRGMuphCXE?si=NT_V5hSsHVleoGtx"
              }
              title="Exploring Svalbard by Expedition Ship"
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
              "Every season in Svalbard offers something remarkable, but for most travelers, summer
              provides the most complete Arctic experience. The combination of the Midnight Sun,
              extraordinary wildlife, spectacular glaciers, and expertly guided expedition cruises creates
              memories that last a lifetime. We help each client choose the season that best matches their
              interests, whether that's polar bears, photography, or the Northern Lights."
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
            <h2>Why Travelers Say Svalbard Is Unlike Anywhere Else</h2>
            <p>Guests frequently describe Svalbard in words like these:</p>
          </div>
          <div className="tsa_word_strip">
            <span>Remote</span>
            <span>Wild</span>
            <span>Otherworldly</span>
            <span>Untouched</span>
            <span>Extreme</span>
            <span>Unforgettable</span>
          </div>
          <p style={{ textAlign: "center", marginTop: 28, color: "var(--tsa-text-muted)", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Halfway between mainland Norway and the North Pole, Svalbard offers a rawness few other
            destinations can match — from 24-hour summer daylight to the total darkness of the Polar Night.
          </p>
        </div>
      </section>

      {/* ================= COMMON QUESTIONS (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Questions About Visiting Svalbard</h2>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ThermometerSun size={20} /></div>
              <h4>Is It Too Cold?</h4>
              <p>Summer temperatures range from 2°C to 8°C. With proper layering, most visitors stay comfortable.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Do I Need Special Gear?</h4>
              <p>Yes — layered, insulated, waterproof clothing is recommended throughout the year.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Are Expedition Cruises Worth It?</h4>
              <p>Yes. Cruises reach remote fjords, glaciers, and wildlife habitats that can't be reached independently.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Is It Family-Friendly?</h4>
              <p>Some cruises welcome families, though many expeditions best suit older children and adults.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO SHOULD VISIT (FIT GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who Should Visit Svalbard?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Ideal For</h3>
              <ul>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Photographers</li>
                <li><Check size={14} /> Adventure seekers</li>
                <li><Check size={14} /> Northern Lights chasers</li>
                <li><Check size={14} /> Arctic explorers</li>
                <li><Check size={14} /> Luxury expedition travelers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Travelers seeking warm-weather vacations</li>
                <li><X size={14} /> Those uncomfortable with extreme cold</li>
                <li><X size={14} /> Guests wanting guaranteed wildlife sightings</li>
                <li><X size={14} /> Families traveling with very young children</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANNING YOUR TRIP (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Planning Your Svalbard Trip</h2>
            <p>To get the most from your journey, keep these essentials in mind.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Book Early</h4>
              <ul>
                <li><Check size={14} /> Peak summer cabins sell out well in advance</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Summer (Jun–Aug)</h4>
              <ul>
                <li><Check size={14} /> Wildlife, Midnight Sun, expedition cruises</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Northern Lights (Oct–Feb)</h4>
              <ul>
                <li><Check size={14} /> Long Arctic nights, clear skies</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Spring (Mar–May)</h4>
              <ul>
                <li><Check size={14} /> Snowmobiling, ski touring, returning light</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Pack in Layers</h4>
              <ul>
                <li><Check size={14} /> Waterproof, insulated clothing year-round</li>
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
              Our Arctic specialists will help you experience Svalbard at its very best, whatever season
              you choose.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Choose the Best Season</h4>
              <p>We match your interests — wildlife, Aurora, or Midnight Sun — to the right time to travel.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Compare Cruise Lines</h4>
              <p>We help you compare expedition cruise lines and select the right itinerary and cabin.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Snowflake size={20} /></div>
              <h4>Prepare for Arctic Conditions</h4>
              <p>We help you get the gear, layering, and logistics right before you go.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Personalize Your Expedition</h4>
              <p>Flights, travel insurance, and every detail arranged around your goals.</p>
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
                What is the best month to visit Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>July is one of the most popular months thanks to abundant wildlife, accessible sea ice, and 24-hour daylight.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                When can you see polar bears in Svalbard? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The best opportunities are from June through August during expedition cruises.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                When is the Midnight Sun? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>From late April until late August.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                When can you see the Northern Lights? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>From October through February.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                Is summer the best time for cruises? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Most expedition cruises operate between late May and early September.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                What wildlife can I see? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Polar bears, walruses, whales, Arctic foxes, reindeer, seals, and millions of seabirds.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Is Svalbard cold in summer? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Summer temperatures generally range from 2°C to 8°C.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Can I visit in winter? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Winter is ideal for snowmobiling, dog sledding, and Northern Lights viewing.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Is Svalbard good for photographers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Wildlife, glaciers, dramatic light, and Arctic landscapes make it one of the world's top photography destinations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                When are whales most active? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>June through September.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                How long should I stay? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Most travelers spend 7–12 days on an expedition cruise or 4–7 days for a land-based visit.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                Are expedition cruises worth it? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Cruises offer access to remote fjords, glaciers, wildlife habitats, and locations that cannot be reached independently.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Do I need special clothing? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Layered, insulated, waterproof clothing is recommended year-round.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Is Svalbard family-friendly? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Some cruises welcome families, although many expeditions are best suited to older children and adults.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists help you choose the ideal season, cruise line, itinerary, and cabin while providing expert guidance before, during, and after your Arctic adventure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Visit Svalbard?</h2>
          <p>
            Whether you're dreaming of polar bears beneath the Midnight Sun or the Northern Lights dancing
            across the Arctic sky, Svalbard promises one of the world's most unforgettable travel
            experiences. Let our specialists help you plan the perfect Arctic expedition.
          </p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule Your Complimentary Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Compare Arctic Expeditions</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}