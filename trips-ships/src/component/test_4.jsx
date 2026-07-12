import React, { useState } from "react";
import {
  Anchor, Moon, SunMedium, Play, ChevronDown, Snowflake, Sun,
  Camera, Users, CheckCircle2, MapPin, Calendar
} from "lucide-react";
import "./style-v2.css";

const IMG = {
  hero: "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_in_Antarctica,_Antarctic_Peninsula.JPG",
  nov: "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg_Antarctica_edit1.jpg",
  dec: "https://commons.wikimedia.org/wiki/Special:FilePath/Two_Ad%C3%A9lie_Penguins_On_Franklin_Island.png",
  jan: "https://commons.wikimedia.org/wiki/Special:FilePath/Penguins_porpoising_in_Paradise_Harbour,_Antarctica_(6087859110).jpg",
  feb: "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelmina_Bay_Antarctica_Humpback_Whale_5_(32394708687).jpg",
  mar: "https://commons.wikimedia.org/wiki/Special:FilePath/Humpback_Whales_in_the_Gerlache_Strait,_Antarctica_(6295486061).jpg",
  emperor: "https://commons.wikimedia.org/wiki/Special:FilePath/Emperor_penguin.jpg",
  seal: "https://commons.wikimedia.org/wiki/Special:FilePath/Weddell_Seal_of_Franklin_Island,_Antarctica.png",
  ship: "https://commons.wikimedia.org/wiki/Special:FilePath/Icebergs,_Mountains,_Glacier,_Cruise_Ship_in_Paradise_Bay,_Antarctica_-_panoramio.jpg",
};

const MONTHS = {
  November: { img: IMG.nov, temp: "-5° to 2°C", light: "18–20 hrs", wildlife: "Penguin courtship begins", highlights: ["Brilliant white, untouched landscapes", "Minimal visitor traffic", "Crystal-clear skies for photography"], bestFor: ["Landscape photographers", "First expeditions", "Quiet sailings"] },
  December: { img: IMG.dec, temp: "-2° to 4°C", light: "Nearly 24 hrs", wildlife: "Nesting penguins, eggs incubating", highlights: ["Nearly continuous daylight", "Peak penguin activity", "Festive holiday departures"], bestFor: ["Families", "Holiday travel", "Long exploration days"] },
  January: { img: IMG.jan, temp: "0° to 5°C", light: "20–22 hrs", wildlife: "Penguin chicks begin appearing", highlights: ["Warmest temperatures of the season", "Excellent kayaking conditions", "Maximum wildlife activity"], bestFor: ["First-time visitors", "Couples", "Active travelers"] },
  February: { img: IMG.feb, temp: "-1° to 4°C", light: "16–18 hrs", wildlife: "Peak whale activity", highlights: ["Frequent humpback & orca sightings", "Reduced sea ice opens new areas", "Golden-hour photography"], bestFor: ["Wildlife photographers", "Returning visitors", "Whale enthusiasts"] },
  March: { img: IMG.mar, temp: "-5° to 1°C", light: "12–15 hrs", wildlife: "Whales & seals", highlights: ["Outstanding whale encounters", "Fewer ships and visitors", "Dramatic polar light"], bestFor: ["Peaceful voyages", "Smaller crowds", "Photographers chasing light"] },
};

const NAV_SECTIONS = ["Overview", "Month Planner", "Wildlife", "FAQ"];

export default function Test_4() {
  const [theme, setTheme] = useState("light");
  const [month, setMonth] = useState("January");
  const data = MONTHS[month];

  return (
    <div className="tsa_page" data-theme={theme}>
      <header className="tsa-nav">
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8"><Anchor size={20} color="var(--tsa-navy)" /><span className="tsa-logo">Trips &amp; Ships</span></div>
          <div className="tsa-flex tsa-gap-24">
            {NAV_SECTIONS.map(s => <a key={s} href={`#${s.toLowerCase().replace(" ", "-")}`} className="tsa-muted" style={{ fontSize: 14, fontWeight: 600 }}>{s}</a>)}
            <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="tsa-section" style={{ paddingBottom: 0 }}>
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="tsa-eyebrow">The Antarctica Planner</span>
            <h1 className="tsa-h1 tsa-mt-16">Find your month, build your trip</h1>
            <p className="tsa-lede tsa-mt-16">An interactive planning tool for choosing the right Antarctic expedition window — built from decades of luxury polar travel.</p>
            <a href="#month-planner" className="tsa-btn tsa-btn--primary tsa-mt-32">Open the Planner <Calendar size={16} /></a>
          </div>
          <div className="tsa-media tsa-ratio-4-3"><img src={IMG.hero} className="tsa-img-cover" alt="Antarctic glacier" /></div>
        </div>
      </section>

      {/* INTERACTIVE PLANNER — tabs + sidebar */}
      <section id="month-planner" className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Step 1</span>
          <h2 className="tsa-h2 tsa-mt-16">Choose a month to explore</h2>
          <div className="tsa-tabs tsa-mt-24">
            {Object.keys(MONTHS).map((m) => (
              <button key={m} className={`tsa-tab${month === m ? " is-active" : ""}`} onClick={() => setMonth(m)}>{m}</button>
            ))}
          </div>

          <div className="tsa-mt-32" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 0, borderRadius: "var(--tsa-radius-lg)", overflow: "hidden", boxShadow: "var(--tsa-shadow-lg)" }}>
            <div style={{ minHeight: 420, position: "relative" }}>
              <img src={data.img} className="tsa-img-cover" alt={month} style={{ position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,#0f1c2ecc 0%, transparent 40%)" }} />
              <div style={{ position: "absolute", left: 24, bottom: 24, color: "#fff" }}>
                <span className="tsa-badge" style={{ background: "#ffffff22", color: "#fff" }}>{month}</span>
                <p className="tsa-mt-8" style={{ fontSize: 15 }}>{data.wildlife}</p>
              </div>
            </div>
            <div className="tsa-card-pad" style={{ background: "var(--tsa-card-bg)" }}>
              <div className="tsa-flex tsa-gap-24" style={{ marginBottom: 20 }}>
                <div><div className="tsa-stat-num" style={{ fontSize: 20 }}>{data.temp}</div><div className="tsa-stat-label">Temperature</div></div>
                <div><div className="tsa-stat-num" style={{ fontSize: 20 }}>{data.light}</div><div className="tsa-stat-label">Daylight</div></div>
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: 10 }}>Highlights</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {data.highlights.map(h => (
                  <li key={h} className="tsa-flex tsa-gap-8" style={{ fontSize: 14, color: "var(--tsa-text-muted)" }}>
                    <CheckCircle2 size={16} color="var(--tsa-green)" style={{ flexShrink: 0 }} />{h}
                  </li>
                ))}
              </ul>
              <h4 style={{ fontWeight: 700, marginBottom: 10 }}>Best For</h4>
              <div className="tsa-flex tsa-gap-8" style={{ flexWrap: "wrap" }}>
                {data.bestFor.map(b => <span key={b} className="tsa-badge">{b}</span>)}
              </div>
              <a href="#" className="tsa-btn tsa-btn--primary tsa-mt-24">Build a {month} Itinerary</a>
            </div>
          </div>
        </div>
      </section>

      {/* WILDLIFE + VIDEO SIDE BY SIDE */}
      <section id="wildlife" className="tsa-section--soft">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <span className="tsa-eyebrow">Step 2</span>
            <h2 className="tsa-h2 tsa-mt-16">Match wildlife to your dates</h2>
            <div className="tsa-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 24 }}>
              <div className="tsa-card tsa-card-pad">
                <Snowflake size={20} color="var(--tsa-navy)" />
                <h4 className="tsa-mt-16" style={{ fontWeight: 700 }}>Gentoo & Adélie Penguins</h4>
                <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>November – February</p>
              </div>
              <div className="tsa-card tsa-card-pad">
                <Sun size={20} color="var(--tsa-navy)" />
                <h4 className="tsa-mt-16" style={{ fontWeight: 700 }}>Humpback Whales</h4>
                <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>February – March</p>
              </div>
              <div className="tsa-card tsa-card-pad">
                <Camera size={20} color="var(--tsa-navy)" />
                <h4 className="tsa-mt-16" style={{ fontWeight: 700 }}>Leopard Seals</h4>
                <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>December – March</p>
              </div>
              <div className="tsa-card tsa-card-pad">
                <Users size={20} color="var(--tsa-navy)" />
                <h4 className="tsa-mt-16" style={{ fontWeight: 700 }}>Orcas & Minke Whales</h4>
                <p className="tsa-muted" style={{ fontSize: 13, marginTop: 6 }}>January – March</p>
              </div>
            </div>
          </div>
          <div>
            <div className="tsa-video">
              <img src={IMG.ship} alt="Expedition ship" />
              <span className="tsa-video-label">How to Read This Planner</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={22} fill="var(--tsa-navy)" /></div></div>
            </div>
            <div className="tsa-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
              <div className="tsa-media tsa-ratio-1-1"><img src={IMG.emperor} className="tsa-img-cover" alt="Emperor penguin" /></div>
              <div className="tsa-media tsa-ratio-1-1"><img src={IMG.seal} className="tsa-img-cover" alt="Weddell seal" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="tsa-section" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="tsa-container">
          <span className="tsa-eyebrow">Step 3</span>
          <h2 className="tsa-h2 tsa-mt-16">Common planning questions</h2>
          <div className="tsa-mt-32">
            {[
              ["How far ahead should I book?", "Luxury suites and preferred departures often sell out 12–18 months in advance."],
              ["Which itinerary suits first-timers?", "The Antarctic Peninsula is the most popular route, offering the widest range of wildlife and scenery in a shorter sailing."],
              ["Will I cross the Drake Passage?", "Most voyages from Ushuaia do; fly-cruise itineraries can reduce or eliminate the crossing."],
            ].map(([q, a]) => <PlannerFaq key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      <section className="tsa-section">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <h2 className="tsa-h2 tsa-mt-16">Your {month} expedition, planned for you</h2>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Schedule a Consultation</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Request an Itinerary</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 0", borderTop: "1px solid var(--tsa-navy-border)" }}>
        <div className="tsa-container tsa-flex" style={{ justifyContent: "space-between", fontSize: 13 }}>
          <span className="tsa-muted">© Trips &amp; Ships Luxury Travel</span>
          <span className="tsa-muted tsa-flex tsa-gap-8"><MapPin size={14} /> Departures from Ushuaia, Argentina</span>
        </div>
      </footer>
    </div>
  );
}

function PlannerFaq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tsa-faq-item${open ? " is-open" : ""}`}>
      <button className="tsa-faq-q" onClick={() => setOpen(!open)}>{q}<span className="tsa-faq-icon"><ChevronDown size={18} /></span></button>
      <div className="tsa-faq-a">{a}</div>
    </div>
  );
}