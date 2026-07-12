import React, { useState } from "react";
import {
  Thermometer, Sun, Fish, Camera, Ship, CheckCircle2, XCircle,
  ChevronDown, Anchor, Play, Moon, SunMedium, TrendingUp
} from "lucide-react";
import "./style-v2.css";

const IMG = {
  hero: "https://commons.wikimedia.org/wiki/Special:FilePath/Icebergs,_Mountains,_Glacier,_Cruise_Ship_in_Paradise_Bay,_Antarctica_-_panoramio.jpg",
  emperor: "https://commons.wikimedia.org/wiki/Special:FilePath/Emperor_penguin.jpg",
  porpoising: "https://commons.wikimedia.org/wiki/Special:FilePath/Penguins_porpoising_in_Paradise_Harbour,_Antarctica_(6087859110).jpg",
  franklin: "https://commons.wikimedia.org/wiki/Special:FilePath/Two_Ad%C3%A9lie_Penguins_On_Franklin_Island.png",
  seal: "https://commons.wikimedia.org/wiki/Special:FilePath/Weddell_Seal_of_Franklin_Island,_Antarctica.png",
  whale1: "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelmina_Bay_Antarctica_Humpback_Whale_5_(32394708687).jpg",
  iceberg1: "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg_Antarctica_edit1.jpg",
  glacier: "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_in_Antarctica,_Antarctic_Peninsula.JPG",
};

const WEATHER = [
  ["November", "-5° to 2°C", "18–20 hrs", "Penguin courtship"],
  ["December", "-2° to 4°C", "Nearly 24 hrs", "Nesting penguins"],
  ["January", "0° to 5°C", "20–22 hrs", "Penguin chicks"],
  ["February", "-1° to 4°C", "16–18 hrs", "Peak whales"],
  ["March", "-5° to 1°C", "12–15 hrs", "Whales & seals"],
];

const MONTH_CARDS = [
  { m: "Nov", full: "November", score: 78, img: IMG.iceberg1, note: "Pristine, quiet, dramatic ice" },
  { m: "Dec", full: "December", score: 92, img: IMG.franklin, note: "Peak penguins, endless daylight" },
  { m: "Jan", full: "January", score: 96, img: IMG.porpoising, note: "Warmest, most active wildlife" },
  { m: "Feb", full: "February", score: 94, img: IMG.whale1, note: "Peak whales, fewer crowds" },
  { m: "Mar", full: "March", score: 81, img: IMG.glacier, note: "Whales, intimate small ships" },
];

const COMPARE = [
  ["Suites", "Spacious, premium accommodations", "Smaller cabins"],
  ["Dining", "Gourmet, regionally inspired cuisine", "Traditional buffet service"],
  ["Guides", "Expert naturalists & specialists", "Standard expedition staff"],
  ["Shore Excursions", "Small groups", "Larger groups"],
  ["Wellness", "Spa, fitness & wellness programs", "Limited"],
];

function StatCard({ icon, num, label }) {
  return (
    <div className="tsa-card tsa-card-pad tsa-flex tsa-gap-16" style={{ background: "var(--tsa-bg-dark2)", border: "1px solid #ffffff1a" }}>
      <div className="tsa-icon-tile" style={{ background: "#ffffff14", color: "var(--tsa-ice)" }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "var(--tsa-font-display)", fontSize: 24, fontWeight: 700, color: "#fff" }}>{num}</div>
        <div style={{ fontSize: 12, color: "#a9b8ce", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
      </div>
    </div>
  );
}

export default function Test_2() {
  const [theme, setTheme] = useState("light");
  const [activeMonth, setActiveMonth] = useState("Jan");
  const active = MONTH_CARDS.find(m => m.m === activeMonth);

  return (
    <div className="tsa_page" data-theme={theme}>
      <header className="tsa-nav">
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8"><Anchor size={20} color="var(--tsa-navy)" /><span className="tsa-logo">Trips &amp; Ships</span></div>
          <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
          </button>
        </div>
      </header>

      {/* HERO — dashboard style, dark, stat strip */}
      <section style={{ background: "var(--tsa-bg-dark)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", padding: "90px 24px 60px" }}>
          <div>
            <span className="tsa-eyebrow" style={{ color: "var(--tsa-ice)" }}>Expedition Season Report</span>
            <h1 className="tsa-h1" style={{ color: "#fff", marginTop: 14 }}>Best Time to Visit Antarctica</h1>
            <p style={{ color: "#c9d6e8", fontSize: 17, marginTop: 16, maxWidth: 480 }}>
              A data-first breakdown of temperature, daylight and wildlife activity across the whole October–March expedition season.
            </p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32">
              <a href="#plan" className="tsa-btn tsa-btn--gold">Plan Your Expedition</a>
              <a href="#dashboard" className="tsa-btn tsa-btn--outline">View the Data</a>
            </div>
          </div>
          <div className="tsa-media tsa-ratio-4-3" style={{ boxShadow: "var(--tsa-shadow-lg)" }}>
            <img src={IMG.hero} className="tsa-img-cover" alt="Expedition ship among icebergs" />
          </div>
        </div>
        <div className="tsa-container" style={{ paddingBottom: 48 }}>
          <div className="tsa-grid tsa-grid-4">
            <StatCard icon={<Ship size={20} />} num="Oct–Mar" label="Season Window" />
            <StatCard icon={<Thermometer size={20} />} num="0°/5°C" label="Warmest (Jan)" />
            <StatCard icon={<Sun size={20} />} num="~24 hrs" label="Peak Daylight" />
            <StatCard icon={<TrendingUp size={20} />} num="12–18 mo" label="Book Ahead" />
          </div>
        </div>
      </section>

      {/* DASHBOARD — interactive month selector */}
      <section id="dashboard" className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Season Explorer</span>
          <h2 className="tsa-h2 tsa-mt-16">Select a month to see the conditions</h2>

          <div className="tsa-flex tsa-gap-12 tsa-mt-32" style={{ flexWrap: "wrap" }}>
            {MONTH_CARDS.map((mo) => (
              <button key={mo.m} onClick={() => setActiveMonth(mo.m)} className={`tsa-tab${activeMonth === mo.m ? " is-active" : ""}`}>
                {mo.full}
              </button>
            ))}
          </div>

          <div className="tsa-mt-32 tsa-card" style={{ overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ minHeight: 340 }}>
              <img src={active.img} alt={active.full} className="tsa-img-cover" style={{ height: "100%" }} />
            </div>
            <div className="tsa-card-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="tsa-badge">{active.full}</span>
              <h3 className="tsa-h3 tsa-mt-16" style={{ fontSize: 26 }}>{active.note}</h3>
              <div className="tsa-mt-24" style={{ background: "var(--tsa-navy-soft)", borderRadius: 12, padding: "16px 20px" }}>
                <div className="tsa-flex" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="tsa-muted" style={{ fontSize: 13 }}>Traveler Suitability Score</span>
                  <strong style={{ color: "var(--tsa-navy)" }}>{active.score}/100</strong>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "var(--tsa-navy-border)", overflow: "hidden" }}>
                  <div style={{ width: `${active.score}%`, height: "100%", background: "var(--tsa-navy)" }} />
                </div>
              </div>
              <a href="#plan" className="tsa-btn tsa-btn--ghost tsa-mt-24" style={{ alignSelf: "flex-start" }}>Build a {active.full} Itinerary</a>
            </div>
          </div>
        </div>
      </section>

      {/* WEATHER TABLE + IMAGE GRID */}
      <section className="tsa-section--soft">
        <div className="tsa-container" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 48 }}>
          <div>
            <span className="tsa-eyebrow">Weather by Month</span>
            <h2 className="tsa-h2 tsa-mt-16">The full season, at a glance</h2>
            <div className="tsa-card tsa-mt-24" style={{ overflow: "hidden" }}>
              <table className="tsa-table">
                <thead><tr><th>Month</th><th>Temp</th><th>Daylight</th><th>Wildlife</th></tr></thead>
                <tbody>
                  {WEATHER.map((row) => (
                    <tr key={row[0]}>{row.map((c, i) => <td key={i}>{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="tsa-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="tsa-media tsa-ratio-1-1"><img src={IMG.emperor} className="tsa-img-cover" alt="Emperor penguin" /></div>
            <div className="tsa-media tsa-ratio-1-1"><img src={IMG.seal} className="tsa-img-cover" alt="Weddell seal" /></div>
            <div className="tsa-media tsa-ratio-1-1" style={{ gridColumn: "span 2" }}><img src={IMG.glacier} className="tsa-img-cover" alt="Glacier" /></div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Briefing Room</span>
          <h2 className="tsa-h2 tsa-mt-16">Watch: how to choose your sailing</h2>
          <div className="tsa-grid tsa-grid-3 tsa-mt-32">
            <div className="tsa-video">
              <img src={IMG.hero} alt="Expedition ship" />
              <span className="tsa-video-label">Choosing Your Season</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={22} fill="var(--tsa-navy)" /></div></div>
            </div>
            <div className="tsa-video">
              <img src={IMG.porpoising} alt="Penguins porpoising" />
              <span className="tsa-video-label">Wildlife Encounters</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={22} fill="var(--tsa-navy)" /></div></div>
            </div>
            <div className="tsa-video">
              <img src={IMG.whale1} alt="Humpback whale" />
              <span className="tsa-video-label">Life Aboard, Peak Season</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={22} fill="var(--tsa-navy)" /></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="tsa-section--soft">
        <div className="tsa-container">
          <span className="tsa-eyebrow">The Trips &amp; Ships Standard</span>
          <h2 className="tsa-h2 tsa-mt-16">Luxury expedition vs. standard expedition</h2>
          <div className="tsa-card tsa-mt-32" style={{ overflow: "hidden" }}>
            <table className="tsa-table">
              <thead><tr><th>Feature</th><th>Luxury Expedition</th><th>Standard Expedition</th></tr></thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]}>
                    <td style={{ fontWeight: 600 }}>{row[0]}</td>
                    <td className="tsa-flex tsa-gap-8"><CheckCircle2 size={16} color="var(--tsa-green)" />{row[1]}</td>
                    <td className="tsa-flex tsa-gap-8" style={{ color: "var(--tsa-text-muted)" }}><XCircle size={16} color="var(--tsa-red)" />{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tsa-section" id="plan">
        <div className="tsa-container">
          <div className="tsa-cta-banner">
            <h2 className="tsa-h2 tsa-mt-16">Get a custom season report for your dates</h2>
            <p style={{ color: "#c9d6e8", maxWidth: 520, margin: "16px auto 0" }}>Tell us what you want to see — we'll tell you which month delivers it.</p>
            <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center" }}>
              <a href="#" className="tsa-btn tsa-btn--gold">Request Custom Itinerary</a>
              <a href="#" className="tsa-btn tsa-btn--outline">Speak with a Specialist</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 0", borderTop: "1px solid var(--tsa-navy-border)" }}>
        <div className="tsa-container tsa-flex" style={{ justifyContent: "space-between", fontSize: 13 }}>
          <span className="tsa-muted">© Trips &amp; Ships Luxury Travel</span>
          <span className="tsa-muted">Data reflects typical seasonal averages; conditions vary by itinerary.</span>
        </div>
      </footer>
    </div>
  );
}