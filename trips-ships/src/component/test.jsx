import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import {
  Sun,
  Moon,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ListTree,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Compass,
  Users,
  Sparkles,
  Calendar,
  Plane,
  Wallet,
  Headset,
  MapPin,
  ClipboardList,
  Route,
} from "lucide-react";

/**
 * Bespoke Antarctica Trip Planning — Trips & Ships Luxury Travel
 * A NEW page type (concierge/planning service page, not a
 * destination guide) built with the "aurora" no-photo graphic
 * system instead of images/video — see the new tsa_aurora_*,
 * tsa_ring_stat_*, tsa_stack_tile_* classes appended to style.css.
 * Existing classes/pages are untouched.
 *
 * Also carries the SEO scaffolding from the Antarctica guide pages:
 * canonical + OG/Twitter tags, Article + Breadcrumb + FAQ JSON-LD,
 * a visible breadcrumb, a jump-link table of contents, and a
 * "Read Next" internal linking grid.
 */

const SITE_URL = "https://trips-and-ships.vercel.app";
const PAGE_PATH = "/bespoke-antarctica-trip-planning";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/bespoke-antarctica-trip-planning-og.jpg`;

const TOC_ITEMS = [
  { id: "why-bespoke", label: "Why Plan Bespoke" },
  { id: "planning-includes", label: "What Planning Includes" },
  { id: "our-approach", label: "Our Approach" },
  { id: "process", label: "How It Works" },
  { id: "concierge", label: "Ongoing Concierge Support" },
  { id: "faq", label: "Frequently Asked Questions" },
];

const RELATED_PAGES = [
  { tag: "Plan", title: "Antarctica Cruise Itineraries", desc: "Compare route lengths, ships, and departure months.", href: "/antarctica-cruise-itineraries" },
  { tag: "Prepare", title: "Antarctica Packing Guide", desc: "Layering, boots, and gear for every deck and landing.", href: "/antarctica-packing-guide" },
  { tag: "Start Here", title: "First-Time Antarctica Cruise", desc: "What to know before booking your first expedition.", href: "/first-time-antarctica-cruise" },
  { tag: "Answers", title: "Antarctica Cruise FAQ", desc: "Every common question about booking and sailing.", href: "/antarctica-cruise-faq" },
];

const IMG = {
  zz1: "https://placehold.co/900x720/16243a/8fb4e8?text=Zodiac+Among+Icebergs",
  zz2: "https://placehold.co/900x720/1c2f4a/8fb4e8?text=Suite+Interior",
  zz3: "https://placehold.co/900x720/101b2c/8fb4e8?text=Gentoo+Colony",
  bannerFull: "https://placehold.co/1800x900/0f1c2e/274472?text=Antarctic+Horizon",
  videoBanner: "https://placehold.co/1800x760/0f1c2e/8fb4e8?text=Watch%3A+A+Day+Aboard",
  duo1: "https://placehold.co/700x900/16243a/8fb4e8?text=Kayaking",
  duo2: "https://placehold.co/700x900/1c2f4a/8fb4e8?text=Photography+Deck",
};

const JSON_LD = `{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Organization",
      "@id":"${SITE_URL}/#organization",
      "name":"Trips & Ships Luxury Travel",
      "url":"${SITE_URL}",
      "logo":"${SITE_URL}/logo.png",
      "sameAs":[
        "https://www.facebook.com/",
        "https://www.linkedin.com/",
        "https://www.instagram.com/"
      ]
    },
    {
      "@type":"Service",
      "@id":"${PAGE_URL}/#service",
      "serviceType":"Bespoke Antarctica Trip Planning",
      "provider":{ "@id":"${SITE_URL}/#organization" },
      "areaServed":"Worldwide"
    },
    {
      "@type":"WebPage",
      "@id":"${PAGE_URL}",
      "url":"${PAGE_URL}",
      "name":"Bespoke Antarctica Trip Planning",
      "isPartOf":{ "@id":"${SITE_URL}/#organization" },
      "primaryImageOfPage":"${OG_IMAGE}"
    },
    {
      "@type":"Article",
      "@id":"${PAGE_URL}/#article",
      "headline":"Bespoke Antarctica Trip Planning",
      "mainEntityOfPage":{ "@id":"${PAGE_URL}" },
      "publisher":{ "@id":"${SITE_URL}/#organization" },
      "image":"${OG_IMAGE}",
      "datePublished":"2026-07-01",
      "dateModified":"2026-07-13"
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        { "@type":"ListItem", "position":1, "name":"Home", "item":"${SITE_URL}" },
        { "@type":"ListItem", "position":2, "name":"Bespoke Antarctica Trip Planning", "item":"${PAGE_URL}" }
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[
        {
          "@type":"Question",
          "name":"How is bespoke planning different from booking a standard cruise?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Bespoke planning matches ship, cabin, itinerary, and travel dates to your specific goals, rather than starting from a fixed package." }
        },
        {
          "@type":"Question",
          "name":"Is there a fee for planning services?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Initial consultations are complimentary; any planning fees are disclosed upfront before work begins." }
        },
        {
          "@type":"Question",
          "name":"How far in advance should planning start?",
          "acceptedAnswer":{ "@type":"Answer", "text":"Most travelers begin the planning process 12 to 18 months before their intended departure." }
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

export default function BespokeAntarcticaTripPlanning() {
  const [theme, setTheme] = useState("light");
  const [openFaq, setOpenFaq] = useState({});
  const rootRef = useScrollReveal();

  const toggleFaq = (key) => setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON_LD;
    document.head.appendChild(script);

    const created = [];
    const setTag = (selector, make) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = make();
        document.head.appendChild(el);
        created.push(el);
      }
      return el;
    };

    setTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      l.href = PAGE_URL;
      return l;
    });

    const metaPairs = [
      ["description", "A fully bespoke Antarctica trip planning service — ship, suite, and itinerary matched to how you actually want to travel."],
      ["og:title", "Bespoke Antarctica Trip Planning | Trips & Ships"],
      ["og:description", "Ship, suite, and itinerary matched to how you actually want to travel — planned end to end."],
      ["og:type", "website"],
      ["og:url", PAGE_URL],
      ["og:image", OG_IMAGE],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", "Bespoke Antarctica Trip Planning | Trips & Ships"],
      ["twitter:image", OG_IMAGE],
    ];
    metaPairs.forEach(([key, content]) => {
      const isOg = key.startsWith("og:") || key.startsWith("twitter:");
      const attr = isOg ? "property" : "name";
      setTag(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute(attr, key);
        m.setAttribute("content", content);
        return m;
      });
    });

    return () => {
      document.head.removeChild(script);
      created.forEach((el) => document.head.removeChild(el));
    };
  }, []);

  return (
    <div className="tsa_page" data-theme={theme} ref={rootRef}>
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} floating />

      {/* ================= HERO (no image, gradient only — matches existing hero) ================= */}
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
            <ClipboardList size={14} /> BESPOKE PLANNING SERVICE
          </div>
          <h1>Bespoke Antarctica Trip Planning</h1>
          <p>
            Your Antarctica expedition, planned around you — the right ship, the right suite, and the
            right season, matched to how you actually want to travel.
          </p>
          <div className="tsa_hero_ctas">
            <button className="tsa_btn_primary">
              Schedule a Planning Consultation <ArrowRight size={16} />
            </button>
            <button className="tsa_btn_secondary">Request More Options</button>
          </div>
        </div>
      </header>

      {/* ================= BREADCRUMB ================= */}
      <div className="tsa_wrap">
        <nav className="tsa_breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={12} className="tsa_breadcrumb_sep" />
          <span className="tsa_breadcrumb_current">Bespoke Antarctica Trip Planning</span>
        </nav>
      </div>

      {/* ================= TABLE OF CONTENTS ================= */}
      <section className="tsa_section" style={{ paddingBottom: 0 }}>
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_toc">
            <div className="tsa_toc_title"><ListTree size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />On This Page</div>
            <div className="tsa_toc_list">
              {TOC_ITEMS.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}>
                  <span className="tsa_toc_num">{String(i + 1).padStart(2, "0")}</span> {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY BESPOKE — zigzag, image LEFT / text RIGHT ================= */}
      <section className="tsa_section" id="why-bespoke">
        <div className="tsa_wrap tsa_zz_row tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Discovery Call</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.zzDiscovery} alt="Planner on a video call discussing an itinerary" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Sparkles size={14} /> WHY PLAN BESPOKE</div>
            <h2>Every Detail Matched to You</h2>
            <p>
              A standard package starts from a fixed itinerary. Bespoke planning starts from your goals —
              the wildlife you want to see, the pace you prefer, and the level of comfort you expect —
              then finds the ship and season that deliver it.
            </p>
            <ul className="tsa_zz_list">
              <li><span className="tsa_zz_list_icon"><Compass size={15} /></span> Ship &amp; suite matched to your goals</li>
              <li><span className="tsa_zz_list_icon"><ShieldCheck size={15} /></span> Firsthand knowledge, not brochure copy</li>
              <li><span className="tsa_zz_list_icon"><Users size={15} /></span> One planner, start to finish</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= RING STATS ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Planning, By the Numbers</h2>
            <p>What working with a dedicated planner typically looks like.</p>
          </div>
          <div className="tsa_ring_stat_row">
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 90 }}>
                <div className="tsa_ring_stat_inner">90%</div>
              </div>
              <div className="tsa_ring_stat_label">Of guests use their planner again for a future trip</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 60 }}>
                <div className="tsa_ring_stat_inner">60+</div>
              </div>
              <div className="tsa_ring_stat_label">Ships and itineraries actively compared each season</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 45 }}>
                <div className="tsa_ring_stat_inner">2–3</div>
              </div>
              <div className="tsa_ring_stat_label">Planning calls, on average, before booking</div>
            </div>
            <div className="tsa_ring_stat">
              <div className="tsa_ring_stat_circle" style={{ "--tsa-ring-pct": 100 }}>
                <div className="tsa_ring_stat_inner">24/7</div>
              </div>
              <div className="tsa_ring_stat_label">Concierge support once you're on your way</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FULL-BLEED BANNER ================= */}
      <section className="tsa_banner_full" style={{ backgroundImage: `url(${IMG.bannerFull})` }}>
        <div className="tsa_banner_full_content tsa_reveal">
          <span className="tsa_banner_full_badge"><ShieldCheck size={13} /> Handled Personally</span>
          <h2>Every Detail, Handled Personally</h2>
          <p>From the first call to the final boarding pass, one planner stays with your trip the entire way.</p>
          <button className="tsa_btn_primary">Meet Your Planner <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ================= WHAT PLANNING INCLUDES — photo grid ================= */}
      <section className="tsa_section" id="planning-includes">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><ClipboardList size={14} /> WHAT'S INCLUDED</div>
            <h2>What Planning Includes</h2>
            <p>A single point of contact for everything from first call to final departure.</p>
          </div>
          <div className="tsa_photo_grid">
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.include1} alt="Planner mapping an itinerary" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Route size={14} /> Itinerary</span>
                <h4>Itinerary Design</h4>
                <p>Route, ports, and pacing built around the wildlife and landscapes you care about most.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.include2} alt="Comparing expedition ship suites" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><ShieldCheck size={14} /> Ships</span>
                <h4>Ship &amp; Suite Selection</h4>
                <p>Comparisons across ships based on firsthand knowledge, not just brochure ratings.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.include3} alt="Coordinating flights and transfers" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Plane size={14} /> Logistics</span>
                <h4>Flights &amp; Transfers</h4>
                <p>Gateway city flights, transfers, and pre/post-cruise stays coordinated end to end.</p>
              </div>
            </div>
            <div className="tsa_photo_card">
              <img className="tsa_photo_card_img" src={IMG.include4} alt="Reviewing travel documentation" />
              <div className="tsa_photo_card_body">
                <span className="tsa_photo_label"><Lock size={14} /> Paperwork</span>
                <h4>Documentation Support</h4>
                <p>Guidance on passports, visas, and any entry requirements for departure countries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH — zigzag, image RIGHT / text LEFT ================= */}
      <section className="tsa_section tsa_section_soft" id="our-approach">
        <div className="tsa_wrap tsa_zz_row reverse tsa_reveal">
          <div className="tsa_zz_media">
            <span className="tsa_zz_media_badge">Your Dedicated Planner</span>
            <div className="tsa_zz_media_frame" />
            <img src={IMG.zzApproach} alt="Planner reviewing a route on a chart" />
          </div>
          <div className="tsa_zz_content">
            <div className="tsa_zz_kicker"><Users size={14} /> OUR APPROACH</div>
            <h2>We Believe Planning Should Feel Personal</h2>
            <p>
              You work with one dedicated planner from your first conversation through your final day
              onboard — not a rotating call center. That continuity means fewer repeated questions and
              faster answers when plans need to change.
            </p>
            <div className="tsa_chip_grid">
              <div className="tsa_chip"><Check size={16} /> One dedicated point of contact</div>
              <div className="tsa_chip"><Check size={16} /> No generic packages</div>
              <div className="tsa_chip"><Check size={16} /> Transparent, upfront pricing</div>
              <div className="tsa_chip"><Check size={16} /> Support during the trip itself</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS — existing timeline pattern ================= */}
      <section className="tsa_section" id="process">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>How It Works</h2>
            <p>From first call to final boarding pass.</p>
          </div>
          <div className="tsa_timeline">
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Step 1</div>
              <h4>Discovery Call</h4>
              <p>A complimentary conversation about your goals, timing, and preferences.</p>
            </div>
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Step 2</div>
              <h4>Curated Options</h4>
              <p>A short list of ships and itineraries matched to what you told us, with clear tradeoffs.</p>
            </div>
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Step 3</div>
              <h4>Booking &amp; Documentation</h4>
              <p>We handle reservations, flights, transfers, and any required paperwork.</p>
            </div>
            <div className="tsa_timeline_item">
              <div className="tsa_timeline_dot" />
              <div className="tsa_timeline_time">Step 4</div>
              <h4>Departure &amp; Beyond</h4>
              <p>Concierge support stays available throughout your voyage, not just before it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO BANNER — see how planning works ================= */}
      <section className="tsa_section tsa_section_soft">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Headset size={14} /> SEE IT IN ACTION</div>
            <h2>See How Planning Works</h2>
            <p>A short walkthrough of what the first planning call actually covers.</p>
          </div>
          <div className="tsa_video_banner">
            <img src={IMG.videoBanner} alt="Planner walking through a route on a call" />
            <div className="tsa_video_banner_scrim" />
            <button className="tsa_video_banner_play" type="button" aria-label="Play video">
              <Sparkles size={30} />
            </button>
            <div className="tsa_video_banner_text">
              <div>
                <h3>Inside a Planning Call</h3>
                <p>3 minutes · What to expect from your first consultation</p>
              </div>
              <span className="tsa_video_banner_tag">Watch Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DUO GRID — two voyage styles we plan ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><Route size={14} /> TWO STARTING POINTS</div>
            <h2>Two Kinds of Voyages We Plan</h2>
            <p>Hover to see how a classic route compares to something further off the beaten path.</p>
          </div>
          <div className="tsa_duo_grid">
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Classic</span>
              <img src={IMG.duo1} alt="Classic Antarctic Peninsula route" />
              <div className="tsa_duo_overlay">
                <h4>Peninsula Classic</h4>
                <p>The most-traveled route — ideal for a confident first expedition.</p>
              </div>
            </div>
            <div className="tsa_duo_card">
              <span className="tsa_duo_ribbon">Remote</span>
              <img src={IMG.duo2} alt="Remote Weddell Sea route" />
              <div className="tsa_duo_overlay">
                <h4>Weddell Sea &amp; Beyond</h4>
                <p>For returning travelers ready for ice-strengthened, further-reaching itineraries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONCIERGE — icon grid (existing pattern) ================= */}
      <section className="tsa_section tsa_section_soft" id="concierge">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <h2>Ongoing Concierge Support</h2>
            <p>Planning doesn't stop once you've booked.</p>
          </div>
          <div className="tsa_icon_grid">
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Calendar size={20} /></div>
              <h4>Itinerary Changes</h4>
              <p>Weather and logistics can shift plans — we adjust with you in real time.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Headset size={20} /></div>
              <h4>Direct Access</h4>
              <p>A direct line to your planner, not a general support queue.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><ShieldCheck size={20} /></div>
              <h4>Issue Resolution</h4>
              <p>If something goes wrong onboard, we work it out on your behalf.</p>
            </div>
            <div className="tsa_icon_card">
              <div className="tsa_icon_circle"><Sparkles size={20} /></div>
              <h4>Future Trips</h4>
              <p>Notes from this trip carry forward, so the next one starts even smoother.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= READ NEXT — internal linking ================= */}
      <section className="tsa_section">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head">
            <div className="tsa_eyebrow tsa_eyebrow_center"><ArrowUpRight size={14} /> KEEP PLANNING</div>
            <h2>Read Next</h2>
            <p>More guides to help you plan the right Antarctica departure.</p>
          </div>
          <div className="tsa_related_grid">
            {RELATED_PAGES.map((page) => (
              <a className="tsa_related_card" href={page.href} key={page.href}>
                <span className="tsa_related_tag">{page.tag}</span>
                <h4>{page.title}</h4>
                <p>{page.desc}</p>
                <span className="tsa_related_link">Read guide <ArrowUpRight size={13} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="tsa_section tsa_section_soft" id="faq">
        <div className="tsa_wrap tsa_reveal">
          <div className="tsa_section_head"><h2>Frequently Asked Questions</h2></div>
          <div className="tsa_faq_list">
            <div className={`tsa_faq_item ${openFaq.q1 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q1")}>
                How is bespoke planning different from booking a standard cruise? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Bespoke planning matches ship, cabin, itinerary, and travel dates to your specific goals, rather than starting from a fixed package.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q2 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q2")}>
                Is there a fee for planning services? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Initial consultations are complimentary; any planning fees are disclosed upfront before work begins.</p></div>
            </div>
            <div className={`tsa_faq_item ${openFaq.q3 ? "open" : ""}`}>
              <button className="tsa_faq_q" onClick={() => toggleFaq("q3")}>
                How far in advance should planning start? <ChevronDown size={18} />
              </button>
              <div className="tsa_faq_a"><p>Most travelers begin the planning process 12 to 18 months before their intended departure.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tsa_section tsa_final">
        <div className="tsa_wrap tsa_reveal">
          <h2>Ready to Start Planning?</h2>
          <p>Tell us what you're picturing, and we'll bring back options built around it — not a brochure.</p>
          <div className="tsa_final_ctas">
            <button className="tsa_btn_primary">Schedule a Consultation <ArrowRight size={16} /></button>
            <button className="tsa_btn_secondary">Request More Options</button>
          </div>
        </div>
      </section>

      <footer className="tsa_footer">
        <p>© {new Date().getFullYear()} Trips &amp; Ships Luxury Travel. All rights reserved.</p>
      </footer>
    </div>
  );
}