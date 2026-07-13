import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
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
  Waves,
  Binoculars,
  Anchor,
} from "lucide-react";

/**
 * Best Time to Visit Antarctica — VIVID edition
 * Same .tsa_* color tokens as every other page. All new visual
 * language lives in a new class family (tsa_zz_*, tsa_banner_full_*,
 * tsa_video_banner_*, tsa_duo_*) appended to the shared style.css —
 * nothing already in use elsewhere was touched or renamed.
 *
 * Six media sections, alternating orientation:
 *   1. Zigzag — image LEFT / text RIGHT
 *   2. Zigzag — text LEFT / image RIGHT
 *   3. Full-bleed parallax banner (TOP-style, mid-page)
 *   4. Zigzag — image LEFT / text RIGHT
 *   5. Video banner (BOTTOM-style, full width)
 *   6. Duo grid — two hover-reveal images side by side
 *
 * Image/video sources are placeholders — swap for production assets.
 */

const IMG = {
  zz1: "https://placehold.co/900x720/16243a/8fb4e8?text=Zodiac+Among+Icebergs",
  zz2: "https://placehold.co/900x720/1c2f4a/8fb4e8?text=Suite+Interior",
  zz3: "https://placehold.co/900x720/101b2c/8fb4e8?text=Gentoo+Colony",
  bannerFull: "https://placehold.co/1800x900/0f1c2e/274472?text=Antarctic+Horizon",
  videoBanner: "https://placehold.co/1800x760/0f1c2e/8fb4e8?text=Watch%3A+A+Day+Aboard",
  duo1: "https://placehold.co/700x900/16243a/8fb4e8?text=Kayaking",
  duo2: "https://placehold.co/700x900/1c2f4a/8fb4e8?text=Photography+Deck",
};

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

export default function Test() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState(1);
  const [openFaq, setOpenFaq] = useState({});
  const rootRef = useScrollReveal();

  const toggleFaq = (key) => setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="tsa_page" data-theme={theme} ref={rootRef}>
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} floating />

      {/* ================= HERO ================= */}
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
            Experience Earth's last great wilderness at the perfect time. The month you sail shapes the
            wildlife you'll encounter, the landscapes you'll witness, and the overall feel of your voyage.
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

      {/* ================= ZIGZAG 1 — image LEFT / text RIGHT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Zodiac Excursion</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.zz1} alt="Zodiac boat weaving between icebergs" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Waves size={14} /> WHY VISIT ANTARCTICA</div>
            <h2>A Continent Unlike Any Other on Earth</h2>
            <p>
              Antarctica is a continent of towering glaciers, pristine icebergs, extraordinary wildlife,
              and untouched landscapes that few people will ever experience firsthand — best explored
              from the water, deck by deck, landing by landing.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Fish size={15} /></span> Vast penguin colonies along the peninsula</li>
              <li><span className="tsa_zz_list_icon"><Waves size={15} /></span> Humpback, minke &amp; orca whales</li>
              <li><span className="tsa_zz_list_icon"><Snowflake size={15} /></span> Spectacular, ever-shifting glaciers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= ZIGZAG 2 — text LEFT / image RIGHT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">All-Suite Ship</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.zz2} alt="Luxury suite interior with glacier view" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Ship size={14} /> ONBOARD EXPERIENCE</div>
            <h2>Comfort at the End of the World</h2>
            <p>
              Luxury expedition cruises combine world-class accommodations, exceptional dining, and expert
              naturalists — so travelers can explore responsibly while enjoying premium comfort every night
              at sea.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Compass size={15} /></span> Spacious suites with private balconies</li>
              <li><span className="tsa_zz_list_icon"><Sparkles size={15} /></span> Gourmet, chef-led dining</li>
              <li><span className="tsa_zz_list_icon"><Users size={15} /></span> Small-group expedition landings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED PARALLAX BANNER (mid-page) ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><Anchor size={13} /> Oct – Mar Season</span>
          <h2>A World Few Will Ever See</h2>
          <p>Only a limited number of visitors are permitted to explore Antarctica each season — timing your voyage right is everything.</p>
          <button className="tsa_btn_primary">Check Season Availability <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= QUICK ANSWER TABLE (existing pattern) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Is the Best Time to Visit Antarctica?</h2>
            <p>For most luxury travelers, December through February offers the best combination of wildlife viewing, comfortable temperatures, and long daylight hours.</p>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr><th>Month</th><th>Best For</th></tr>
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

      {/* ================= ZIGZAG 3 — image LEFT / text RIGHT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Gentoo Colony</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.zz3} alt="Gentoo penguin colony on rocky shoreline" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Binoculars size={14} /> WILDLIFE SEASONS</div>
            <h2>Every Month, a Different Antarctica</h2>
            <p>
              Different months offer very different wildlife highlights — from courting penguins in
              November to feeding whales in February and March. Matching your dates to your interests
              makes all the difference.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Snowflake size={15} /></span> Nov: courtship &amp; fresh snow</li>
              <li><span className="tsa_zz_list_icon"><Sun size={15} /></span> Jan: warmest, most active wildlife</li>
              <li><span className="tsa_zz_list_icon"><Waves size={15} /></span> Mar: peak whale encounters</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MONTH EXPLORER (existing pattern) ================= */}
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

            {activeMonth === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Peak Penguin Season</div>
                  <h3 className="tsa_month_title">December</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Nearly 24 hours of daylight for extended exploration</li>
                    <li><Check size={16} /> Peak penguin activity as adults incubate eggs</li>
                    <li><Check size={16} /> Comfortable expedition conditions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Holiday Travelers</span>
                    <span>Photography</span>
                  </div>
                  <p className="tsa_month_note">Luxury travelers often choose December because it combines spectacular scenery with ideal weather conditions.</p>
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
            {activeMonth === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Fresh Snow &amp; Untouched Beauty</div>
                  <h3 className="tsa_month_title">November</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Brilliant white landscapes and crystal-clear skies</li>
                    <li><Check size={16} /> Minimal visitor traffic for quieter sailings</li>
                    <li><Check size={16} /> Penguin courtship begins</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Landscape Photographers</span>
                    <span>First Expeditions</span>
                  </div>
                  <p className="tsa_month_note">Whale sightings are less frequent than later in the season.</p>
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
            {activeMonth === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Warmest Month</div>
                  <h3 className="tsa_month_title">January</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Warmest temperatures of the season</li>
                    <li><Check size={16} /> Maximum wildlife activity, chicks appearing</li>
                    <li><Check size={16} /> Excellent kayaking conditions</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Families</span>
                    <span>Couples</span>
                    <span>Active Travelers</span>
                  </div>
                  <p className="tsa_month_note">Because demand peaks in January, booking 12–18 months in advance is recommended.</p>
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
                  <div className="tsa_month_tagline">Peak Whale Watching</div>
                  <h3 className="tsa_month_title">February</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Peak humpback whale sightings</li>
                    <li><Check size={16} /> Frequent minke and orca encounters</li>
                    <li><Check size={16} /> Penguin chicks becoming active</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Wildlife Photographers</span>
                    <span>Whale Enthusiasts</span>
                  </div>
                  <p className="tsa_month_note">Often considered the most rewarding month for wildlife.</p>
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
                    <li><Check size={16} /> Spectacular sunsets and dramatic light</li>
                    <li><Check size={16} /> Fewer ships for an intimate atmosphere</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Peaceful Voyages</span>
                    <span>Whale Watchers</span>
                  </div>
                  <p className="tsa_month_note">Final weeks of the season — temperatures begin to cool.</p>
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

      {/* ================= VIDEO BANNER (bottom-style, full width) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Play size={14} /> EXPEDITION EXPERIENCE</div>
            <h2>Experience Antarctica Before You Go</h2>
            <p>What a typical expedition day feels like — Drake Passage crossings, zodiac landings, and evenings aboard.</p>
          </div>
          <div className="tsa_video_banner">
            <img src={IMG.videoBanner} alt="Expedition ship at golden hour" />
            <div className="tsa_video_banner_scrim" />
            <button className="tsa_video_banner_play" type="button" aria-label="Play video">
              <Play size={30} fill="currentColor" />
            </button>
            <div className="tsa_video_banner_text">
              <div>
                <h3>A Day Aboard Expedition</h3>
                <p>4 minutes · Drake Passage to Paradise Bay</p>
              </div>
              <span className="tsa_video_banner_tag">Watch Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERT QUOTE (existing pattern) ================= */}
      <section className="tsa_section tsa_quote_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_quote_card">
            <div className="tsa_quote_mark"><Sparkles size={32} /></div>
            <p className="tsa_quote_text">
              "After more than 40 years in the travel industry and journeys to over 121 countries, I've
              learned that Antarctica isn't simply a destination — it's one of the few places on Earth
              that genuinely transforms how people see the world."
            </p>
            <div className="tsa_quote_author">Angela Hughes</div>
            <div className="tsa_quote_role">CEO, Trips &amp; Ships Luxury Travel · Founder, Luxury Travel University</div>
            <div className="tsa_quote_badges">
              <span>40+ Years in Luxury Travel</span>
              <span>121+ Countries Visited</span>
              <span>2024 Luxury Travel Influencer of the Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DUO GRID — two hover-reveal images ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Camera size={14} /> ON DECK &amp; ASHORE</div>
            <h2>Two Ways to Explore</h2>
            <p>Hover to see how kayaking and photography excursions each shape the day differently.</p>
          </div>
          <div className="tsa_duo_grid">
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Active</span>
              <img src={IMG.duo1} alt="Guests kayaking near icebergs" />
              <div className="tsa_duo_overlay">
                <h4>Sea Kayaking</h4>
                <p>Paddle silently past ice floes and curious seals at water level.</p>
              </div>
            </div>
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Scenic</span>
              <img src={IMG.duo2} alt="Guest photographing wildlife from the ship" />
              <div className="tsa_duo_overlay">
                <h4>Photography Deck</h4>
                <p>Guided sessions on capturing ice, light, and wildlife like a pro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ (existing pattern) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head"><h2>Frequently Asked Questions</h2></div>
          <div className="tsa_faq_list">
            <div className={`tsa_faq_item ${openFaq.q1 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q1")}>
                What is the best month to visit Antarctica? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>For most travelers, January and February offer the ideal balance of wildlife, mild temperatures, and excellent expedition conditions.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                How far in advance should I book? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Luxury expedition cruises often sell out 12 to 18 months in advance, especially for peak departures.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What is the best month for whale watching? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>February and March are widely considered the best months for observing humpback, minke, and orca whales.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Experience Antarctica?</h2>
          <p>Whether your dream is towering icebergs in November or feeding whales in March, our expedition specialists can help you choose the perfect journey.</p>
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