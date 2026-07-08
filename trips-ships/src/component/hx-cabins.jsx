import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  BedDouble,
  Waves,
  Crown,
  Sparkles,
  Compass,
  Users,
  Camera,
  Wifi,
  Coffee,
  ShieldCheck,
  DoorOpen,
  Home,
  Clock,
  Binoculars,
} from "lucide-react";

/**
 * HX Cabins Guide — Trips & Ships Luxury Travel
 * Reuses the shared .tsa_* design system introduced in the
 * Antarctica Wildlife Guide component (see accompanying CSS).
 * Content is written directly into JSX sections rather than mapped
 * from data arrays, per project requirements.
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
      "@id": "https://www.tripsandships.com/hx-cabins",
      "url": "https://www.tripsandships.com/hx-cabins",
      "name": "HX Cabins Guide",
      "isPartOf": { "@id": "https://www.tripsandships.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What cabin categories does HX offer?", "acceptedAnswer": { "@type": "Answer", "text": "HX offers Polar Inside Cabins, Polar Outside Cabins, Balcony Cabins, Expedition Suites, and Grand Expedition Suites." } },
        { "@type": "Question", "name": "Which HX cabin is best for first-time travelers?", "acceptedAnswer": { "@type": "Answer", "text": "Polar Outside Cabins are an excellent choice for first-time travelers, offering natural light, ocean views, and outstanding value." } },
        { "@type": "Question", "name": "Are balcony cabins worth it?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many travelers appreciate balcony cabins for private wildlife viewing, photography, and enjoying the scenery throughout the voyage." } },
        { "@type": "Question", "name": "What is included in an Expedition Suite?", "acceptedAnswer": { "@type": "Answer", "text": "Expedition Suites generally include more living space, a private balcony, premium amenities, a minibar, and additional suite privileges." } },
        { "@type": "Question", "name": "What is the most luxurious cabin on an HX ship?", "acceptedAnswer": { "@type": "Answer", "text": "The Grand Expedition Suite is the most spacious and luxurious accommodation, featuring premium furnishings, a separate living area, and exclusive amenities." } },
        { "@type": "Question", "name": "Do all cabins have ocean views?", "acceptedAnswer": { "@type": "Answer", "text": "No. Polar Inside Cabins do not have windows, while Polar Outside Cabins, Balcony Cabins, and Suites offer ocean views." } },
        { "@type": "Question", "name": "Is Wi-Fi included in all cabins?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Complimentary Wi-Fi is available for guests, although connectivity may vary in remote destinations." } },
        { "@type": "Question", "name": "Are solo cabins available?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Some HX ships offer dedicated solo cabins, although availability varies by ship and itinerary." } },
        { "@type": "Question", "name": "Are accessible cabins available?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Selected HX ships offer accessible cabins for guests with reduced mobility. Early booking is recommended." } },
        { "@type": "Question", "name": "Do cabins include private bathrooms?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every HX cabin features a private ensuite bathroom with modern amenities." } },
        { "@type": "Question", "name": "Which cabin offers the best value?", "acceptedAnswer": { "@type": "Answer", "text": "Polar Outside Cabins are widely considered to offer the best combination of comfort, ocean views, and value." } },
        { "@type": "Question", "name": "How early should I book my preferred cabin?", "acceptedAnswer": { "@type": "Answer", "text": "Booking 12 to 18 months in advance provides the best selection of cabin categories and preferred cabin locations." } },
        { "@type": "Question", "name": "Can I request a specific cabin location?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Depending on availability, guests may request a preferred cabin location when booking." } },
        { "@type": "Question", "name": "Are room service and premium amenities included?", "acceptedAnswer": { "@type": "Answer", "text": "Room service and additional premium amenities are generally available in higher-category suites, depending on the ship." } },
        { "@type": "Question", "name": "Why book an HX cabin through Trips & Ships Luxury Travel?", "acceptedAnswer": { "@type": "Answer", "text": "Trips & Ships Luxury Travel helps you compare cabin categories, choose the ideal accommodation, secure the best available options, and personalize every aspect of your HX expedition." } }
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

export default function HXCabinsGuide() {
  const [theme, setTheme] = useState("light");
  const [activeCabin, setActiveCabin] = useState(0); // 0=Inside .. 4=Grand Suite
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
            <BedDouble size={14} /> LUXURY CABIN GUIDE
          </div>
          <h1>HX Cabins Guide</h1>
          <p>
            Choosing the right cabin is an important part of planning your HX Expeditions voyage. Whether
            you're looking for a comfortable inside cabin or a luxurious suite with a private balcony, HX
            offers accommodations designed to complement your expedition experience. Every cabin combines
            Scandinavian-inspired design, modern amenities, and thoughtful comforts, ensuring you can relax
            after a day of exploring some of the world's most remote destinations.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Compare HX Cabins <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Speak with an HX Cruise Specialist</button>
          </div>
        </div>
      </header>

      {/* ================= QUICK ANSWER TABLE (HX Cabins at a Glance) ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Cabins at a Glance</h2>
            <p>
              At Trips &amp; Ships Luxury Travel, we help travelers compare cabin categories, understand the
              differences between room types, and select the ideal accommodation for their expedition.
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
                <tr><td>Cabin Categories</td><td>Polar Inside, Polar Outside, Balcony, Suites</td></tr>
                <tr><td>Private Balconies</td><td>Available on selected cabins</td></tr>
                <tr><td>Largest Accommodation</td><td>Grand Expedition Suite</td></tr>
                <tr><td>Ocean Views</td><td>Most cabin categories</td></tr>
                <tr><td>Complimentary Wi-Fi</td><td>Included</td></tr>
                <tr><td>Daily Housekeeping</td><td>Included</td></tr>
                <tr><td>Room Service</td><td>Available on selected suites</td></tr>
                <tr><td>Best Value</td><td>Polar Outside Cabin</td></tr>
                <tr><td>Best Luxury</td><td>Expedition &amp; Grand Suites</td></tr>
                <tr><td>Solo Cabins</td><td>Available on select ships</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= WHY YOUR CABIN CHOICE MATTERS ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_why_grid tsa_reveal">
          <div className="tsa_why_text">
            <div className="tsa_eyebrow">
              <Sparkles size={14} /> WHY YOUR CABIN CHOICE MATTERS
            </div>
            <h2>Your Cabin Is Your Private Retreat</h2>
            <p>
              While much of your time will be spent exploring ashore or enjoying onboard experiences, your
              cabin is where you'll rest, recharge, and reflect on each day's adventures.
            </p>
            <p>
              Choosing the right accommodation can enhance your voyage with additional living space,
              panoramic ocean views, private balconies, premium amenities, and enhanced comfort. The ideal
              cabin depends on your budget, travel style, and itinerary.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> Additional living space</div>
              <div className="tsa_chip"><Check size={16} /> Panoramic ocean views</div>
              <div className="tsa_chip"><Check size={16} /> Private balconies</div>
              <div className="tsa_chip"><Check size={16} /> Premium amenities</div>
              <div className="tsa_chip"><Check size={16} /> Enhanced comfort</div>
              <div className="tsa_chip"><Check size={16} /> Priority services on select suites</div>
            </div>
          </div>
          <div className="tsa_why_card">
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">5</div>
              <div className="tsa_why_card_label">Cabin categories, from Polar Inside to Grand Expedition Suite</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">12–18mo</div>
              <div className="tsa_why_card_label">How far in advance to book for the best cabin selection</div>
            </div>
            <div className="tsa_why_card_stat">
              <div className="tsa_why_card_num">100%</div>
              <div className="tsa_why_card_label">Of cabins include a private ensuite bathroom</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HX CABIN CATEGORIES EXPLORER ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>HX Cabin Categories</h2>
            <p>Select a category to explore its features and who it suits best.</p>
          </div>

          <div className="tsa_month_explorer_shell">
            <div className="tsa_month_tabs">
              <button className={`tsa_month_tab ${activeCabin === 0 ? "active" : ""}`} onClick={() => setActiveCabin(0)}>
                <Home size={18} /> <span className="tsa_month_tab_label">Polar Inside</span>
              </button>
              <button className={`tsa_month_tab ${activeCabin === 1 ? "active" : ""}`} onClick={() => setActiveCabin(1)}>
                <Sun size={18} /> <span className="tsa_month_tab_label">Polar Outside</span>
              </button>
              <button className={`tsa_month_tab ${activeCabin === 2 ? "active" : ""}`} onClick={() => setActiveCabin(2)}>
                <Waves size={18} /> <span className="tsa_month_tab_label">Balcony</span>
              </button>
              <button className={`tsa_month_tab ${activeCabin === 3 ? "active" : ""}`} onClick={() => setActiveCabin(3)}>
                <Compass size={18} /> <span className="tsa_month_tab_label">Expedition Suite</span>
              </button>
              <button className={`tsa_month_tab ${activeCabin === 4 ? "active" : ""}`} onClick={() => setActiveCabin(4)}>
                <Crown size={18} /> <span className="tsa_month_tab_label">Grand Suite</span>
              </button>
            </div>

            {activeCabin === 0 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Perfect for Travelers Who Prioritize Exploration</div>
                  <h3 className="tsa_month_title">Polar Inside Cabins</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Comfortable queen or twin beds</li>
                    <li><Check size={16} /> Private bathroom</li>
                    <li><Check size={16} /> TV and complimentary Wi-Fi</li>
                    <li><Check size={16} /> Modern Scandinavian décor with climate control</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Budget-Conscious Travelers</span>
                    <span>Active Explorers</span>
                    <span>Best Value</span>
                  </div>
                  <p className="tsa_month_note">
                    Best for guests who sleep comfortably in darker rooms and plan to spend most of their
                    time outside the cabin exploring.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <BedDouble size={22} />
                    <div className="tsa_stat_card_value">No Window</div>
                    <div className="tsa_stat_card_label">Cabin View</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Best Value</div>
                    <div className="tsa_stat_card_label">Price Category</div>
                  </div>
                </div>
              </div>
            )}

            {activeCabin === 1 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Natural Light &amp; Ocean Views</div>
                  <h3 className="tsa_month_title">Polar Outside Cabins</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Picture window or porthole</li>
                    <li><Check size={16} /> Private bathroom</li>
                    <li><Check size={16} /> Comfortable seating and smart storage</li>
                    <li><Check size={16} /> Modern furnishings</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>First-Time Expedition Travelers</span>
                    <span>Excellent Value</span>
                    <span>Scenic Cruising</span>
                  </div>
                  <p className="tsa_month_note">
                    Widely considered the best combination of comfort, ocean views, and value across the
                    HX fleet.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Sun size={22} />
                    <div className="tsa_stat_card_value">Window / Porthole</div>
                    <div className="tsa_stat_card_label">Cabin View</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Clock size={22} />
                    <div className="tsa_stat_card_value">Best Value</div>
                    <div className="tsa_stat_card_label">Price Category</div>
                  </div>
                </div>
              </div>
            )}

            {activeCabin === 2 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Private Outdoor Space</div>
                  <h3 className="tsa_month_title">Balcony Cabins</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Private balcony</li>
                    <li><Check size={16} /> Floor-to-ceiling windows</li>
                    <li><Check size={16} /> Sitting area and premium bedding</li>
                    <li><Check size={16} /> Ocean views</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Couples</span>
                    <span>Scenic Photography</span>
                    <span>Relaxing Between Excursions</span>
                  </div>
                  <p className="tsa_month_note">
                    A balcony lets you watch whales, photograph icebergs, and enjoy fresh polar air in
                    complete privacy — many guests consider it one of the best upgrades for polar voyages.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Waves size={22} />
                    <div className="tsa_stat_card_value">Private Balcony</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Binoculars size={22} />
                    <div className="tsa_stat_card_value">Wildlife Viewing</div>
                    <div className="tsa_stat_card_label">Best For</div>
                  </div>
                </div>
              </div>
            )}

            {activeCabin === 3 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">Designed for Extra Luxury</div>
                  <h3 className="tsa_month_title">Expedition Suites</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Spacious living area</li>
                    <li><Check size={16} /> Private balcony</li>
                    <li><Check size={16} /> Espresso machine and minibar</li>
                    <li><Check size={16} /> Priority services where applicable</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Luxury Travelers</span>
                    <span>Special Occasions</span>
                    <span>Longer Expeditions</span>
                  </div>
                  <p className="tsa_month_note">
                    Ideal for travelers who want additional space, premium amenities, and enhanced comfort
                    across a longer voyage.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Coffee size={22} />
                    <div className="tsa_stat_card_value">Espresso &amp; Minibar</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Crown size={22} />
                    <div className="tsa_stat_card_value">Priority Services</div>
                    <div className="tsa_stat_card_label">Where Applicable</div>
                  </div>
                </div>
              </div>
            )}

            {activeCabin === 4 && (
              <div className="tsa_month_body">
                <div>
                  <div className="tsa_month_tagline">The Most Luxurious Accommodation Onboard</div>
                  <h3 className="tsa_month_title">Grand Expedition Suites</h3>
                  <ul className="tsa_month_highlights">
                    <li><Check size={16} /> Separate bedroom and spacious lounge</li>
                    <li><Check size={16} /> Large private balcony</li>
                    <li><Check size={16} /> Premium bath amenities and dining area</li>
                    <li><Check size={16} /> Floor-to-ceiling windows and exclusive suite benefits</li>
                  </ul>
                  <div className="tsa_month_bestfor">
                    <span>Ultimate Comfort</span>
                    <span>Honeymoons</span>
                    <span>Milestone Celebrations</span>
                  </div>
                  <p className="tsa_month_note">
                    The most spacious and exclusive accommodation on board, reserved for travelers seeking
                    the highest level of luxury.
                  </p>
                </div>
                <div className="tsa_month_stats">
                  <div className="tsa_stat_card">
                    <Crown size={22} />
                    <div className="tsa_stat_card_value">Separate Bedroom</div>
                    <div className="tsa_stat_card_label">Signature Feature</div>
                  </div>
                  <div className="tsa_stat_card">
                    <Sparkles size={22} />
                    <div className="tsa_stat_card_value">Exclusive Benefits</div>
                    <div className="tsa_stat_card_label">Suite Privileges</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CABIN AMENITIES (ICON GRID) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Cabin Amenities</h2>
            <p>Depending on category, cabins may include the following comforts.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Private Bathroom</h4>
              <p>Every cabin includes a private ensuite bathroom, hairdryer, and luxury toiletries.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Wifi size={20} /></div>
              <h4>Complimentary Wi-Fi</h4>
              <p>Stay connected with complimentary Wi-Fi and USB charging ports in every cabin.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Coffee size={20} /></div>
              <h4>Coffee &amp; Tea Facilities</h4>
              <p>Enjoy in-room coffee and tea facilities, a television, and a personal safe.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><DoorOpen size={20} /></div>
              <h4>Daily Housekeeping</h4>
              <p>Climate control and daily housekeeping keep every cabin comfortable throughout your voyage.</p>
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
              "The right cabin can elevate your entire expedition. While every HX accommodation is
              thoughtfully designed, selecting the category that best matches your travel style ensures
              you'll enjoy every moment onboard as much as every adventure ashore."
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

      {/* ================= WHICH CABIN IS RIGHT FOR YOU ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Which Cabin Is Right for You?</h2>
          </div>
          <div className="tsa_choose_grid">
            <div className="tsa_choose_card">
              <h4>Choose Polar Inside If You Want:</h4>
              <ul>
                <li><Check size={14} /> To prioritize exploring over cabin space</li>
                <li><Check size={14} /> The best available value</li>
                <li><Check size={14} /> To sleep comfortably in darker rooms</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose Polar Outside If You Want:</h4>
              <ul>
                <li><Check size={14} /> Natural daylight in your cabin</li>
                <li><Check size={14} /> A picture window or porthole view</li>
                <li><Check size={14} /> Excellent value with ocean views</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose a Balcony Cabin If You Want:</h4>
              <ul>
                <li><Check size={14} /> Private outdoor space</li>
                <li><Check size={14} /> To photograph wildlife from your room</li>
                <li><Check size={14} /> A quiet, scenic retreat between landings</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose an Expedition Suite If You Want:</h4>
              <ul>
                <li><Check size={14} /> Additional living space</li>
                <li><Check size={14} /> Premium amenities and priority services</li>
                <li><Check size={14} /> To celebrate a special occasion</li>
              </ul>
            </div>
            <div className="tsa_choose_card">
              <h4>Choose a Grand Suite If You Want:</h4>
              <ul>
                <li><Check size={14} /> The highest level of luxury onboard</li>
                <li><Check size={14} /> Expansive, separate living areas</li>
                <li><Check size={14} /> Exclusive suite privileges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOULD YOU BOOK A BALCONY / ARE SUITES WORTH IT ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Should You Upgrade Your Cabin?</h2>
            <p>Two of the most common questions we hear while planning an HX voyage.</p>
          </div>
          <div className="tsa_tables_grid">
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th colSpan={2}>Should You Book a Balcony?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={2}>Watch whales from your cabin</td></tr>
                  <tr><td colSpan={2}>Photograph icebergs in private</td></tr>
                  <tr><td colSpan={2}>Enjoy fresh polar air on demand</td></tr>
                  <tr><td colSpan={2}>Experience scenic cruising in privacy</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tsa_table_wrap">
              <table className="tsa_table">
                <thead>
                  <tr>
                    <th colSpan={2}>Are Suites Worth It?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={2}>More space and better views</td></tr>
                  <tr><td colSpan={2}>Premium amenities included</td></tr>
                  <tr><td colSpan={2}>Enhanced comfort and exclusive services</td></tr>
                  <tr><td colSpan={2}>Ideal for longer voyages</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US (NUMBERED) ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Why Book With Trips &amp; Ships Luxury Travel?</h2>
            <p>Our specialists help you find the perfect accommodation for your HX voyage.</p>
          </div>
          <div className="tsa_mistakes_list">
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">01</div>
              <div>
                <h4>Compare Cabin Categories</h4>
                <p>We walk you through every category so you know exactly what each one offers.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">02</div>
              <div>
                <h4>Select the Best Suite</h4>
                <p>We help you weigh space, view, and amenities against your budget and travel style.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">03</div>
              <div>
                <h4>Understand Ship Layouts</h4>
                <p>We explain cabin locations so you can avoid busy public areas if you prefer a quieter stay.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">04</div>
              <div>
                <h4>Find Exclusive Promotions</h4>
                <p>We surface offers and preferred cabin availability you won't find booking alone.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">05</div>
              <div>
                <h4>Coordinate Flights and Hotels</h4>
                <p>Every logistical detail is handled so you can focus on your expedition.</p>
              </div>
            </div>
            <div className="tsa_mistake_item">
              <div className="tsa_mistake_num">06</div>
              <div>
                <h4>Personalize Every Detail</h4>
                <p>With decades of luxury travel expertise, we help you choose the ideal accommodation for your HX voyage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIPS FOR CHOOSING YOUR CABIN ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Tips for Choosing Your Cabin</h2>
          </div>
          <div className="tsa_fit_grid">
            <div className="tsa_fit_card yes">
              <h3>Keep In Mind</h3>
              <ul>
                <li><Check size={14} /> Book early for the best selection</li>
                <li><Check size={14} /> Consider itinerary length</li>
                <li><Check size={14} /> Think about how much time you'll spend in your room</li>
                <li><Check size={14} /> Balance budget with comfort</li>
                <li><Check size={14} /> Ask about cabin locations</li>
              </ul>
            </div>
            <div className="tsa_fit_card no">
              <h3>Accessibility</h3>
              <ul>
                <li><Check size={14} /> Several HX ships offer accessible cabins with wider doorways</li>
                <li><Check size={14} /> Accessible bathrooms and convenient layouts</li>
                <li><X size={14} /> Availability is limited — early booking is recommended</li>
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
                What cabin categories does HX offer? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>HX offers Polar Inside Cabins, Polar Outside Cabins, Balcony Cabins, Expedition Suites, and Grand Expedition Suites.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Which HX cabin is best for first-time travelers? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Polar Outside Cabins are an excellent choice, offering natural light, ocean views, and outstanding value.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                Are balcony cabins worth it? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Many travelers find balconies worthwhile for wildlife viewing, photography, and enjoying the scenery in private.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q4 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q4")}>
                What is included in an Expedition Suite? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Expedition Suites typically include more living space, a private balcony, premium amenities, a minibar, and additional suite privileges.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q5 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q5")}>
                What is the most luxurious cabin on an HX ship? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>The Grand Expedition Suite is the most spacious and luxurious accommodation, featuring a separate living area and exclusive amenities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q6 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q6")}>
                Do all cabins have ocean views? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>No. Polar Inside Cabins do not have windows, while Polar Outside, Balcony Cabins, and Suites offer ocean views.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q7 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q7")}>
                Is Wi-Fi included in all cabins? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Complimentary Wi-Fi is included for guests, although connectivity may vary in remote destinations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q8 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q8")}>
                Are solo cabins available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Some HX ships offer dedicated solo cabins, though availability varies by ship and itinerary.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q9 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q9")}>
                Are accessible cabins available? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Selected HX ships feature accessible cabins designed for guests with reduced mobility. Early booking is recommended.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q10 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q10")}>
                Do cabins include private bathrooms? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Every cabin includes a private ensuite bathroom with modern amenities.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q11 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q11")}>
                Which cabin offers the best value? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Polar Outside Cabins are often considered the best balance of comfort, ocean views, and value.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q12 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q12")}>
                How early should I book my preferred cabin? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Booking 12–18 months in advance provides the best selection of cabin categories and preferred locations.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q13 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q13")}>
                Can I request a specific cabin location? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Yes. Depending on availability, you may choose a cabin location that best suits your preferences.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q14 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q14")}>
                Are room service and premium amenities included? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Room service and additional premium amenities are generally available in higher-category suites, depending on the ship.</p>
              </div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q15 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q15")}>
                Why book an HX cabin through Trips &amp; Ships Luxury Travel? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a">
                <p>Our specialists compare cabin categories, explain the differences, secure the best available accommodations, and help personalize every aspect of your HX expedition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Choose Your HX Cabin?</h2>
          <p>
            Whether you're looking for outstanding value or the ultimate luxury suite, our experts will help
            you compare cabin options and choose the perfect accommodation for your HX expedition.
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