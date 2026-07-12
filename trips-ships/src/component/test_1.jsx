import React, { useState } from "react";
import {
  Snowflake, Sun, Compass, Camera, Anchor, Quote, ChevronDown,
  MapPin, Ship, Play, ArrowRight, Moon, SunMedium
} from "lucide-react";
import "./style-v2.css";

/* ---------------- shared content ---------------- */
const IMG = {
  penguinHero: "https://commons.wikimedia.org/wiki/Special:FilePath/Adelie_Penguins_on_iceberg.jpg",
  emperor: "https://commons.wikimedia.org/wiki/Special:FilePath/Emperor_penguin.jpg",
  porpoising: "https://commons.wikimedia.org/wiki/Special:FilePath/Penguins_porpoising_in_Paradise_Harbour,_Antarctica_(6087859110).jpg",
  franklin: "https://commons.wikimedia.org/wiki/Special:FilePath/Two_Ad%C3%A9lie_Penguins_On_Franklin_Island.png",
  seal: "https://commons.wikimedia.org/wiki/Special:FilePath/Weddell_Seal_of_Franklin_Island,_Antarctica.png",
  whale1: "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelmina_Bay_Antarctica_Humpback_Whale_5_(32394708687).jpg",
  whale2: "https://commons.wikimedia.org/wiki/Special:FilePath/Humpback_Whales_in_the_Gerlache_Strait,_Antarctica_(6295486061).jpg",
  iceberg1: "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg_Antarctica_edit1.jpg",
  iceberg2: "https://commons.wikimedia.org/wiki/Special:FilePath/Antarctic_Iceberg_from_the_Bridge_Window_of_HMS_Scott_MOD_45152333.jpg",
  glacier: "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_in_Antarctica,_Antarctic_Peninsula.JPG",
  ship: "https://commons.wikimedia.org/wiki/Special:FilePath/Icebergs,_Mountains,_Glacier,_Cruise_Ship_in_Paradise_Bay,_Antarctica_-_panoramio.jpg",
};

const MONTHS = [
  { m: "November", tag: "Fresh Snow & Untouched Beauty", temp: "-5° to 2°C", light: "18–20 hrs", img: IMG.iceberg1,
    body: "Antarctica's season opens on landscapes no one has touched since the last thaw. Snow sits crisp and unbroken, icebergs hold their sharpest edges, and courting penguins begin drifting back to their colonies.",
    best: "Landscape photographers, first expeditions, quieter sailings" },
  { m: "December", tag: "Peak Penguin Season", temp: "-2° to 4°C", light: "~24 hrs", img: IMG.franklin,
    body: "Daylight barely ends. Gentoo, Adélie and Chinstrap colonies are in full swing as adults incubate eggs, and the long light turns every zodiac cruise into a golden-hour photograph.",
    best: "Holiday departures, families, long exploration days" },
  { m: "January", tag: "The Warmest Month", temp: "0° to 5°C", light: "20–22 hrs", img: IMG.porpoising,
    body: "Coastal snow softens, landings get easier, and the continent turns genuinely active — chicks hatch, seals haul out on ice floes, and kayaking conditions are at their calmest all season.",
    best: "First-time visitors, couples, active travelers" },
  { m: "February", tag: "Peak Whale Watching", temp: "-1° to 4°C", light: "16–18 hrs", img: IMG.whale1,
    body: "Retreating sea ice opens channels that were closed earlier in the season. Humpbacks, minkes and orcas feed in numbers, while fast-growing chicks turn increasingly independent.",
    best: "Wildlife photographers, returning visitors, whale enthusiasts" },
  { m: "March", tag: "Quiet, Peaceful, Whale-Focused", temp: "-5° to 1°C", light: "12–15 hrs", img: IMG.whale2,
    body: "The final weeks bring smaller ships, dramatic low-angle light, and some of the most reliable whale encounters of the year — a reward for travelers willing to trade daylight for intimacy.",
    best: "Peaceful voyages, whale sightings, smaller crowds" },
];

const WILDLIFE = [
  ["Gentoo Penguins", "Nov – Feb"], ["Adélie Penguins", "Nov – Jan"], ["Chinstrap Penguins", "Dec – Feb"],
  ["Humpback Whales", "Feb – Mar"], ["Orcas", "Jan – Mar"], ["Minke Whales", "Jan – Mar"],
  ["Leopard Seals", "Dec – Mar"], ["Weddell Seals", "Nov – Feb"],
];

const FAQS = [
  { q: "What is the best month to visit Antarctica?", a: "January and February offer the best balance of wildlife, milder temperatures and expedition conditions — though November suits pristine scenery and March rewards whale watchers." },
  { q: "When is Antarctica warmest?", a: "January is typically warmest, with coastal temperatures ranging roughly from 0°C to 5°C (32°F to 41°F)." },
  { q: "How far in advance should I book?", a: "Luxury suites and preferred departures often sell out 12 to 18 months ahead, particularly for peak months." },
  { q: "How long is a typical expedition?", a: "Most luxury voyages run 10–14 days; extended itineraries with South Georgia and the Falklands can reach 16–23 days." },
];

/* ---------------- small pieces ---------------- */
function FaqRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tsa-faq-item${open ? " is-open" : ""}`}>
      <button className="tsa-faq-q" onClick={() => setOpen(!open)}>
        {item.q}
        <span className="tsa-faq-icon"><ChevronDown size={18} /></span>
      </button>
      <div className="tsa-faq-a">{item.a}</div>
    </div>
  );
}

export default function Test_1() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="tsa_page" data-theme={theme} style={{ fontFamily: "var(--tsa-font-body)" }}>
      {/* NAV */}
      <header className="tsa-nav">
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8">
            <Anchor size={20} color="var(--tsa-navy)" />
            <span className="tsa-logo">Trips &amp; Ships</span>
          </div>
          <div className="tsa-flex tsa-gap-16">
            <span className="tsa-muted" style={{ fontSize: 13, fontWeight: 600 }}>THE ANTARCTIC JOURNAL</span>
            <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO — full bleed editorial */}
      <section style={{ position: "relative", height: "86vh", minHeight: 560, overflow: "hidden" }}>
        <img src={IMG.penguinHero} alt="Adélie penguins on an iceberg" className="tsa-img-cover" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #0f1c2ef2 0%, #0f1c2e55 45%, #0f1c2e33 100%)" }} />
        <div className="tsa-container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 72 }}>
          <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>A Luxury Traveler's Field Guide</span>
          <h1 className="tsa-h1" style={{ color: "#fff", marginTop: 14, maxWidth: 780 }}>
            The Best Time to Visit Antarctica
          </h1>
          <p style={{ color: "#dce7f2", fontSize: 18, maxWidth: 560, marginTop: 18 }}>
            Five months, five entirely different continents of light, ice and wildlife. Here's how to choose yours.
          </p>
          <div className="tsa-flex tsa-gap-16 tsa-mt-32">
            <a href="#plan" className="tsa-btn tsa-btn--gold">Plan Your Expedition <ArrowRight size={16} /></a>
            <a href="#months" className="tsa-btn tsa-btn--outline">Read the Guide</a>
          </div>
        </div>
      </section>

      {/* INTRO — drop cap editorial column */}
      <section className="tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 56, alignItems: "start" }}>
          <div>
            <span className="tsa-eyebrow">Why Season Matters</span>
            <h2 className="tsa-h2 tsa-mt-16">A continent that rewrites itself every few weeks</h2>
            <p className="tsa-mt-24" style={{ fontSize: 17, color: "var(--tsa-text-muted)" }}>
              <span style={{ float: "left", fontFamily: "var(--tsa-font-display)", fontSize: 64, lineHeight: .8, color: "var(--tsa-navy)", marginRight: 12, marginTop: 6 }}>E</span>
              very Antarctic journey is extraordinary, but the calendar shapes what you'll actually see. Sail in November and you'll find landscapes untouched since winter; wait until February and the same coastline is alive with whales.
              Because the continent is open to visitors only from late October through early March, choosing your month is one of the most consequential decisions a traveler makes — more so than the ship, in many ways.
            </p>
            <p className="tsa-mt-16" style={{ color: "var(--tsa-text-muted)" }}>
              At Trips &amp; Ships, we match every itinerary to the experience a guest is actually after: courtship displays, hatching chicks, feeding whales, or simply the quiet of a continent with almost no one on it.
            </p>
          </div>
          <div className="tsa-media tsa-ratio-3-4">
            <img src={IMG.iceberg2} alt="Iceberg from the ship's bridge" className="tsa-img-cover" />
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="tsa-section--soft tsa-section--tight">
        <div className="tsa-container tsa-center" style={{ maxWidth: 780 }}>
          <Quote size={32} color="var(--tsa-gold)" />
          <p style={{ fontFamily: "var(--tsa-font-display)", fontSize: 26, color: "var(--tsa-navy)", marginTop: 16, lineHeight: 1.5 }}>
            "Antarctica isn't simply a destination — it's one of the few places on Earth that genuinely transforms how people see the world."
          </p>
          <p className="tsa-muted tsa-mt-16" style={{ fontWeight: 600 }}>Angela Hughes — CEO, Trips &amp; Ships · 40+ Years in Luxury Travel</p>
        </div>
      </section>

      {/* MONTH-BY-MONTH — alternating editorial rows */}
      <section id="months" className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">The Season, Month by Month</span>
          <h2 className="tsa-h2 tsa-mt-16" style={{ maxWidth: 640 }}>Five months, five very different Antarcticas</h2>
        </div>
        <div className="tsa-mt-64">
          {MONTHS.map((mo, i) => (
            <div key={mo.m} className="tsa-container" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center",
              marginBottom: 72, direction: i % 2 ? "rtl" : "ltr"
            }}>
              <div className="tsa-media tsa-ratio-4-3" style={{ direction: "ltr" }}>
                <img src={mo.img} alt={mo.m} className="tsa-img-cover" />
              </div>
              <div style={{ direction: "ltr" }}>
                <span className="tsa-badge">{mo.m}</span>
                <h3 className="tsa-h3 tsa-mt-16" style={{ fontSize: 28 }}>{mo.tag}</h3>
                <p className="tsa-mt-16 tsa-muted">{mo.body}</p>
                <div className="tsa-flex tsa-gap-24 tsa-mt-24">
                  <div><div className="tsa-stat-num" style={{ fontSize: 22 }}>{mo.temp}</div><div className="tsa-stat-label">Avg. Temp</div></div>
                  <div><div className="tsa-stat-num" style={{ fontSize: 22 }}>{mo.light}</div><div className="tsa-stat-label">Daylight</div></div>
                </div>
                <p className="tsa-mt-16" style={{ fontSize: 14 }}><strong>Best for:</strong> {mo.best}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO FEATURE */}
      <section className="tsa-section--dark tsa-section">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Watch Before You Go</span>
            <h2 className="tsa-h2 tsa-mt-16">A sense of scale you can't get from a photograph</h2>
            <p className="tsa-muted tsa-mt-16">Our expedition specialists walk through what a day on the Antarctic Peninsula actually looks like — from Drake Passage crossing to a Zodiac landing among gentoo colonies.</p>
            <a href="#plan" className="tsa-btn tsa-btn--gold tsa-mt-24">Speak with a Specialist</a>
          </div>
          <div className="tsa-video">
            <img src={IMG.ship} alt="Expedition ship among icebergs" />
            <span className="tsa-video-tag">4 min film</span>
            <span className="tsa-video-label">A Day on the Antarctic Peninsula</span>
            <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={26} fill="var(--tsa-navy)" /></div></div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">In the Field</span>
          <h2 className="tsa-h2 tsa-mt-16">A season, captured</h2>
          <div className="tsa-gallery tsa-mt-32" style={{ height: 520 }}>
            <div className="tsa-media" style={{ height: "100%" }}><img src={IMG.emperor} className="tsa-img-cover" alt="Emperor penguins" /></div>
            <div className="tsa-media"><img src={IMG.glacier} className="tsa-img-cover" alt="Glacier" /></div>
            <div className="tsa-media"><img src={IMG.seal} className="tsa-img-cover" alt="Weddell seal" /></div>
            <div className="tsa-media"><img src={IMG.whale2} className="tsa-img-cover" alt="Humpback whales" /></div>
            <div className="tsa-media"><img src={IMG.iceberg1} className="tsa-img-cover" alt="Iceberg" /></div>
          </div>
        </div>
      </section>

      {/* WILDLIFE CALENDAR */}
      <section className="tsa-section--soft">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Wildlife Calendar</span>
          <h2 className="tsa-h2 tsa-mt-16">What you'll see, and when</h2>
          <div className="tsa-grid tsa-grid-4 tsa-mt-32">
            {WILDLIFE.map(([name, when]) => (
              <div key={name} className="tsa-card tsa-card-pad tsa-card--hover">
                <Snowflake size={20} color="var(--tsa-navy)" />
                <h4 style={{ marginTop: 12, fontWeight: 700 }}>{name}</h4>
                <p className="tsa-muted" style={{ fontSize: 13, marginTop: 4 }}>{when}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tsa-section" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="tsa-container">
          <span className="tsa-eyebrow">Questions, Answered</span>
          <h2 className="tsa-h2 tsa-mt-16">Frequently Asked</h2>
          <div className="tsa-mt-32">
            {FAQS.map((f) => <FaqRow key={f.q} item={f} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tsa-section" id="plan">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <Compass size={30} color="var(--tsa-ice)" />
            <h2 className="tsa-h2 tsa-mt-16">Ready to choose your Antarctica?</h2>
            <p style={{ color: "#c9d6e8", maxWidth: 520, margin: "16px auto 0" }}>Our expedition specialists will match your dates, ship and itinerary to the experience you're after.</p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Schedule a Consultation</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Request an Itinerary</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 0", borderTop: "1px solid var(--tsa-navy-border)" }}>
        <div className="tsa-container tsa-flex" style={{ justifyContent: "space-between" }}>
          <span className="tsa-muted" style={{ fontSize: 13 }}>© Trips &amp; Ships Luxury Travel</span>
          <span className="tsa-muted tsa-flex tsa-gap-8" style={{ fontSize: 13 }}><MapPin size={14} /> Worldwide · Ushuaia Departures</span>
        </div>
      </footer>
    </div>
  );
}