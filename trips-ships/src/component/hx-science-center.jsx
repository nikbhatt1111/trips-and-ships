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
  Microscope,
  BookOpen,
  FlaskConical,
  Binoculars,
  GraduationCap,
} from "lucide-react";

/**
 * HX Science Center — Trips & Ships Luxury Travel
 * Uses the shared .tsa_* design system (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
 *
 * MEDIA ADDED IN THIS VERSION:
 *  1. HERO        — background video/image behind the nav + headline
 *  2. DAY-IN-LIFE — left/right split: timeline (left) + stacked photos (right)
 *  3. LEARNING    — inline playable video card below the compare columns
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
      "worksFor":{ "@id":"https://www.tripsandships.com/#organization" }
    },
    {
      "@type":"WebPage",
      "@id":"https://www.tripsandships.com/hx-science-center",
      "url":"https://www.tripsandships.com/hx-science-center",
      "name":"HX Science Center Guide",
      "isPartOf":{ "@id":"https://www.tripsandships.com/#organization" }
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"What is the HX Science Center?",
          "acceptedAnswer":{ "@type":"Answer", "text":"The HX Science Center is an interactive learning hub onboard every HX expedition ship where guests attend lectures, participate in citizen science, and learn from expedition experts." }
        },
        {
          "@type":"Question",
          "name":"Is access to the Science Center included?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Access to the Science Center and its educational programs is included as part of every HX expedition." }
        },
        {
          "@type":"Question",
          "name":"What subjects are covered in the Science Center?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Topics include wildlife, marine biology, geology, glaciology, climate science, conservation, photography, history, and polar exploration." }
        },
        {
          "@type":"Question",
          "name":"Who gives the presentations?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Presentations are led by marine biologists, naturalists, historians, geologists, ornithologists, climate scientists, photographers, and expedition leaders." }
        },
        {
          "@type":"Question",
          "name":"What is citizen science?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Citizen science allows guests to assist real scientific research by recording wildlife sightings, weather observations, ocean data, and other environmental information." }
        },
        {
          "@type":"Question",
          "name":"Can beginners enjoy the Science Center?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Absolutely. Programs are designed for travelers of all ages and experience levels, with no scientific background required." }
        },
        {
          "@type":"Question",
          "name":"Are photography workshops offered?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Many HX voyages include photography workshops covering camera techniques, composition, editing, and wildlife photography." }
        },
        {
          "@type":"Question",
          "name":"Does the Science Center have scientific equipment?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Depending on the ship, guests may explore microscopes, research tools, specimen collections, digital maps, and interactive displays." }
        },
        {
          "@type":"Question",
          "name":"Can children participate?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. The Science Center offers engaging educational activities suitable for families and young explorers." }
        },
        {
          "@type":"Question",
          "name":"Is the Science Center open every day?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Educational programs, lectures, and interactive activities are typically offered throughout the voyage, although schedules vary by itinerary." }
        },
        {
          "@type":"Question",
          "name":"Does the expedition team participate in Science Center activities?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Expedition leaders and specialists regularly host lectures, workshops, and discussions while also guiding shore excursions." }
        },
        {
          "@type":"Question",
          "name":"How does the Science Center enhance the expedition experience?",
          "acceptedAnswer":{ "@type":"Answer", "text":"It helps guests better understand the wildlife, landscapes, ecosystems, and cultures they encounter, making every excursion more meaningful." }
        },
        {
          "@type":"Question",
          "name":"Is the Science Center available on every HX ship?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Every HX expedition vessel features a Science Center designed to support learning and exploration." }
        },
        {
          "@type":"Question",
          "name":"Can guests contribute to conservation efforts?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Yes. Through citizen science projects and educational initiatives, guests can support ongoing environmental and scientific research." }
        },
        {
          "@type":"Question",
          "name":"Why book an HX expedition through Trips & Ships Luxury Travel?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Trips & Ships Luxury Travel helps you compare HX ships, understand onboard experiences like the Science Center, select the ideal itinerary, and create a seamless expedition tailored to your interests." }
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

export default function HXScienceCenter() {
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
          <video autoPlay muted loop playsInline poster="https://placehold.co/1600x900/0f1c2e/1c2f4a?text=Science+Center+Hero+Poster">
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
            <Microscope size={14} /> HX SCIENCE CENTER GUIDE
          </div>
          <h1>HX Science Center</h1>
          <p>
            Where exploration meets discovery. The HX Science Center is the heart of every expedition
            cruise, transforming your journey into an immersive educational experience — a modern learning
            hub where guests interact with scientists, researchers, expedition leaders, and naturalists
            while exploring some of the world's most remote destinations.
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
            <div className="tsa_ss_month">Lectures</div>
            <div className="tsa_ss_best">Daily presentations from expedition experts</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Experts</div>
            <div className="tsa_ss_best">Marine biologists, naturalists, glaciologists &amp; more</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Citizen Science</div>
            <div className="tsa_ss_best">Contribute observations to real conservation research</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Workshops</div>
            <div className="tsa_ss_best">Photography sessions suited to every skill level</div>
          </div>
          <div className="tsa_season_strip_item">
            <div className="tsa_ss_month">Access</div>
            <div className="tsa_ss_best">Included on every HX expedition, every day</div>
          </div>
        </div>
      </div>

      {/* ================= QUICK ANSWER ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Quick Answer: What Is the HX Science Center?</h2>
            <p>
              The Science Center is an interactive educational space where guests learn about the
              destinations they visit through expert presentations, scientific research, and hands-on
              activities. Unlike a traditional cruise lecture room, it encourages participation and curiosity.
            </p>
          </div>
          <div className="tsa_chip_grid" style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="tsa_chip"><Check size={16} /> Daily expert-led lectures</div>
            <div className="tsa_chip"><Check size={16} /> Hands-on citizen science</div>
            <div className="tsa_chip"><Check size={16} /> Interactive exhibits &amp; equipment</div>
            <div className="tsa_chip"><Check size={16} /> Photography workshops</div>
            <div className="tsa_chip"><Check size={16} /> Wildlife identification tools</div>
            <div className="tsa_chip"><Check size={16} /> Family-friendly programming</div>
          </div>
        </div>
      </section>

      {/* ================= MORE THAN A LECTURE ROOM ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHAT MAKES IT DIFFERENT
            </div>
            <h2>More Than a Lecture Room</h2>
            <p>Unlike a traditional cruise lecture room, the Science Center encourages participation and curiosity, not passive viewing.</p>
            <p>
              Guests can attend daily lectures, meet expedition experts, participate in citizen science,
              view scientific equipment, learn about polar ecosystems, explore wildlife identification
              tools, and ask questions during presentations.
            </p>
            <p>Every day brings new opportunities to learn — and the Science Center team joins Zodiac cruises, shore landings, and scenic cruising to keep the learning going beyond the classroom.</p>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Every Ship</div>
              <div className="tsa_why_card_label">Every HX expedition vessel features a Science Center</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Daily</div>
              <div className="tsa_why_card_label">Lectures and interactive activities offered throughout the voyage</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">Included</div>
              <div className="tsa_why_card_label">Access to the Science Center and its programs is included</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU'LL EXPERIENCE ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What You'll Experience in the Science Center</h2>
            <p>Every voyage combines expert-led learning with hands-on participation, made meaningful by real scientific engagement.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><BookOpen size={20} /></div>
              <h4>Expert-Led Lectures</h4>
              <p>Daily presentations covering wildlife, geology, climate science, and polar history.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><FlaskConical size={20} /></div>
              <h4>Citizen Science</h4>
              <p>Contribute to real research through wildlife observations, weather monitoring, and more.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Microscope size={20} /></div>
              <h4>Interactive Exhibits</h4>
              <p>Digital maps, microscopes, specimen collections, and multimedia displays.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Camera size={20} /></div>
              <h4>Photography Workshops</h4>
              <p>Sessions on camera settings, composition, editing, and polar lighting for all levels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= A DAY OF LEARNING (TIMELINE + SPLIT MEDIA) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What a Day of Learning Looks Like</h2>
            <p>Science Center programming flows through the whole day, both onboard and out on excursion:</p>
          </div>

          <div className="tsa_split_layout">
            <div>
              <div className="tsa_timeline">
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Morning</div>
                  <h4>Daily Lecture &amp; Discussion</h4>
                  <p>Start the day with an expert-led lecture on wildlife, geology, or climate before the morning landing.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Afternoon</div>
                  <h4>Citizen Science in Action</h4>
                  <p>Experts join Zodiac cruises and shore landings, offering live commentary and citizen science opportunities.</p>
                </div>
                <div className="tsa_timeline_item">
                  <div className="tsa_timeline_dot" />
                  <div className="tsa_timeline_time">Evening</div>
                  <h4>Recap &amp; Workshops</h4>
                  <p>An evening recap, photography workshops, and interactive discussions back in the Science Center.</p>
                </div>
              </div>
              <p style={{ textAlign: "center", marginTop: 24, color: "var(--tsa-text-muted)", fontStyle: "italic" }}>
                Learning continues even between excursions.
              </p>
            </div>

            {/* Stacked photo frames — replace both src attributes with real photography */}
            <div className="tsa_split_media">
              <div className="tsa_split_media_accent" />
              <div className="tsa_split_media_frame back">
                <img src="/assets/HX_Science_Center_1.jpg" alt="Guests attending a lecture in the Science Center" />
              </div>
              <div className="tsa_split_media_frame front">
                <img src="/assets/HX_Science_Center_2.jpg" alt="Naturalist showing guests wildlife identification tools" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCIENCE CENTER VS TRADITIONAL LECTURE ROOM ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Science Center vs Traditional Cruise Lecture Room</h2>
          </div>
          <div className="tsa_table_wrap">
            <table className="tsa_table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>HX Science Center</th>
                  <th>Traditional Lecture Room</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Purpose</td><td>Hands-on discovery</td><td>Passive viewing</td></tr>
                <tr><td>Presenters</td><td>Scientists &amp; expedition experts</td><td>General cruise staff</td></tr>
                <tr><td>Participation</td><td>Citizen science &amp; interactive exhibits</td><td>Sit and listen</td></tr>
                <tr><td>Equipment</td><td>Microscopes, research tools, digital maps</td><td>Slideshow only</td></tr>
                <tr><td>Beyond the Room</td><td>Experts join Zodiacs &amp; landings</td><td>Confined to the lecture hall</td></tr>
                <tr><td>Family Friendly</td><td>Yes, all ages</td><td>Varies</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHO YOU'LL LEARN FROM (compare cols + video) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who You'll Learn From &amp; What You'll Explore</h2>
            <p>World-class specialists transform every destination into a living classroom.</p>
          </div>
          <div className="tsa_compare_grid">
            <div className="tsa_compare_col lux">
              <h3><GraduationCap size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Expert Presenters</h3>
              <div className="tsa_compare_row"><Check size={16} /> Marine biologists</div>
              <div className="tsa_compare_row"><Check size={16} /> Naturalists &amp; ornithologists</div>
              <div className="tsa_compare_row"><Check size={16} /> Glaciologists &amp; geologists</div>
              <div className="tsa_compare_row"><Check size={16} /> Climate scientists &amp; polar researchers</div>
              <div className="tsa_compare_row"><Check size={16} /> Historians</div>
              <div className="tsa_compare_row"><Check size={16} /> Professional photographers</div>
            </div>
            <div className="tsa_compare_col trad">
              <h3><Binoculars size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />Program Topics</h3>
              <div className="tsa_compare_row"><Check size={16} /> Antarctica &amp; Arctic wildlife</div>
              <div className="tsa_compare_row"><Check size={16} /> Glaciers &amp; icebergs</div>
              <div className="tsa_compare_row"><Check size={16} /> Climate change &amp; ocean conservation</div>
              <div className="tsa_compare_row"><Check size={16} /> Polar history</div>
              <div className="tsa_compare_row"><Check size={16} /> Expedition photography</div>
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
                  ? "https://www.youtube.com/embed/GV05mPwFQwY?si=It7-qAfggEko4YOz"
                  : "https://www.youtube.com/embed/GV05mPwFQwY?si=It7-qAfggEko4YOz"
              }
              title="Inside the HX Science Center"
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
              "The HX Science Center is one of the defining features of every expedition. It transforms
              sightseeing into genuine discovery by giving guests direct access to scientists, researchers,
              and expedition experts who bring each destination to life."
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

      {/* ================= WORD STRIP — HOW GUESTS DESCRIBE IT ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Guests Say the Science Center Is Unforgettable</h2>
            <p>Travelers frequently describe the Science Center in words like these:</p>
          </div>
          <div className="tsa_word_strip">
            <span>Genuine discovery</span>
            <span>Hands-on</span>
            <span>Eye-opening</span>
            <span>Inspiring</span>
            <span>Family-friendly</span>
            <span>Conservation-minded</span>
          </div>
          <p style={{ textAlign: "center", marginTop: 28, color: "var(--tsa-text-muted)", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Unlike a typical shipboard lecture series, the Science Center turns every excursion into a
            living classroom — guests leave with a deeper appreciation for the places they've explored and
            the fragile ecosystems that sustain them.
          </p>
        </div>
      </section>

      {/* ================= COMMON QUESTIONS (ICON GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Common Questions About the Science Center</h2>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><GraduationCap size={20} /></div>
              <h4>Do I Need a Science Background?</h4>
              <p>Not at all. Programs are designed for travelers of all ages and experience levels.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Is It Included in My Fare?</h4>
              <p>Yes. Access to the Science Center and its educational programs is included on every voyage.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Users size={20} /></div>
              <h4>Is It Just for Adults?</h4>
              <p>No. The Science Center welcomes families, with activities suited to young explorers too.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><FlaskConical size={20} /></div>
              <h4>Is It Only Lectures?</h4>
              <p>No. Expect hands-on citizen science, interactive exhibits, and workshops, not just slideshows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO ENJOYS IT (FIT GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Who Enjoys the HX Science Center?</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Ideal For</h3>
              <ul>
                <li><Check size={14} /> Curious travelers</li>
                <li><Check size={14} /> Families with children</li>
                <li><Check size={14} /> Wildlife enthusiasts</li>
                <li><Check size={14} /> Photographers</li>
                <li><Check size={14} /> Lifelong learners</li>
                <li><Check size={14} /> Conservation-minded guests</li>
                <li><Check size={14} /> Retired travelers</li>
                <li><Check size={14} /> First-time expedition cruisers</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>May Not Be Ideal For</h3>
              <ul>
                <li><X size={14} /> Guests seeking purely leisure entertainment</li>
                <li><X size={14} /> Travelers uninterested in structured programming</li>
                <li><X size={14} /> Those wanting spa-only, unscheduled days</li>
                <li><X size={14} /> Guests expecting nightlife-focused evenings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU CAN DO (CHOOSE GRID) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>What You Can Do in the Science Center</h2>
            <p>Every day offers a new way to get involved.</p>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Attend Lectures</h4>
              <ul>
                <li><Check size={14} /> Daily expert-led presentations</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Join Citizen Science</h4>
              <ul>
                <li><Check size={14} /> Support real conservation research</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Explore Exhibits</h4>
              <ul>
                <li><Check size={14} /> Microscopes, maps &amp; specimen collections</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Take a Workshop</h4>
              <ul>
                <li><Check size={14} /> Photography sessions for all levels</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Meet the Experts</h4>
              <ul>
                <li><Check size={14} /> Ask questions during and after presentations</li>
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
              Our specialists help you choose an HX expedition that matches your interests in science,
              wildlife, and exploration, tailored around Angela Hughes' decades of luxury travel expertise.
            </p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Compass size={20} /></div>
              <h4>Compare Itineraries</h4>
              <p>We help you compare HX itineraries side by side.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Microscope size={20} /></div>
              <h4>Understand Onboard Experiences</h4>
              <p>We explain what to expect from the Science Center and each ship's programming.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Ship size={20} /></div>
              <h4>Select the Right Ship</h4>
              <p>We help you choose the ideal ship and suite for your travel style.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Personalize Every Detail</h4>
              <p>Flights, hotels, and every arrangement coordinated around your expedition.</p>
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
                What is the HX Science Center? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The HX Science Center is an interactive learning hub onboard every HX expedition ship where guests attend lectures, participate in citizen science, and learn from expedition experts.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Is access to the Science Center included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Access to the Science Center and its educational programs is included as part of every HX expedition.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                What subjects are covered in the Science Center? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Topics include wildlife, marine biology, geology, glaciology, climate science, conservation, photography, history, and polar exploration.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                Who gives the presentations? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Presentations are led by marine biologists, naturalists, historians, geologists, ornithologists, climate scientists, photographers, and expedition leaders.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What is citizen science? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Citizen science allows guests to assist real scientific research by recording wildlife sightings, weather observations, ocean data, and other environmental information.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Can beginners enjoy the Science Center? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Absolutely. Programs are designed for travelers of all ages and experience levels, with no scientific background required.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Are photography workshops offered? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Many HX voyages include photography workshops covering camera techniques, composition, editing, and wildlife photography.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Does the Science Center have scientific equipment? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Depending on the ship, guests may explore microscopes, research tools, specimen collections, digital maps, and interactive displays.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Can children participate? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. The Science Center offers engaging educational activities suitable for families and young explorers.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Is the Science Center open every day? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Educational programs, lectures, and interactive activities are typically offered throughout the voyage, although schedules vary by itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Does the expedition team participate in Science Center activities? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Expedition leaders and specialists regularly host lectures, workshops, and discussions while also guiding shore excursions.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                How does the Science Center enhance the expedition experience? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>It helps guests better understand the wildlife, landscapes, ecosystems, and cultures they encounter, making every excursion more meaningful.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Is the Science Center available on every HX ship? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Every HX expedition vessel features a Science Center designed to support learning and exploration.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Can guests contribute to conservation efforts? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Through citizen science projects and educational initiatives, guests can support ongoing environmental and scientific research.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX expedition through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our experts help you compare HX ships, understand onboard experiences like the Science Center, select the ideal itinerary, and create a seamless expedition tailored to your interests.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Discover the HX Science Center?</h2>
          <p>
            Every HX expedition offers the opportunity to learn from world-class experts while exploring
            some of Earth's most extraordinary destinations. Let us help you choose the perfect voyage
            where curiosity, conservation, and adventure come together.
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