import React, { useState } from "react";
import { Anchor, Moon, SunMedium, Play, PenLine, MapPin, Feather, ChevronDown } from "lucide-react";
import "./style-v2.css";

const IMG = {
  hero: "https://commons.wikimedia.org/wiki/Special:FilePath/Penguins_porpoising_in_Paradise_Harbour,_Antarctica_(6087859110).jpg",
  nov: "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg_Antarctica_edit1.jpg",
  dec: "https://commons.wikimedia.org/wiki/Special:FilePath/Two_Ad%C3%A9lie_Penguins_On_Franklin_Island.png",
  jan: "https://commons.wikimedia.org/wiki/Special:FilePath/Penguins_porpoising_in_Paradise_Harbour,_Antarctica_(6087859110).jpg",
  feb: "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelmina_Bay_Antarctica_Humpback_Whale_5_(32394708687).jpg",
  mar: "https://commons.wikimedia.org/wiki/Special:FilePath/Humpback_Whales_in_the_Gerlache_Strait,_Antarctica_(6295486061).jpg",
  emperor: "https://commons.wikimedia.org/wiki/Special:FilePath/Emperor_penguin.jpg",
  seal: "https://commons.wikimedia.org/wiki/Special:FilePath/Weddell_Seal_of_Franklin_Island,_Antarctica.png",
  glacier: "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_in_Antarctica,_Antarctic_Peninsula.JPG",
  ship: "https://commons.wikimedia.org/wiki/Special:FilePath/Icebergs,_Mountains,_Glacier,_Cruise_Ship_in_Paradise_Bay,_Antarctica_-_panoramio.jpg",
};

const ENTRIES = [
  { date: "Nov 04", m: "November", img: IMG.nov, note: "The snow here hasn't been touched by a single boot print. Even the icebergs still look freshly cut.", tags: ["Landscapes", "Quiet sailings"] },
  { date: "Dec 18", m: "December", img: IMG.dec, note: "The sun never really sets anymore. The gentoo colony below camp hasn't stopped moving all day.", tags: ["Nesting penguins", "Long days"] },
  { date: "Jan 09", m: "January", img: IMG.jan, note: "Warm enough today to shed a layer on the Zodiac. First chick sighting of the season — everyone on deck.", tags: ["Chicks hatching", "Kayaking"] },
  { date: "Feb 21", m: "February", img: IMG.feb, note: "A pod of humpbacks fed alongside the ship for nearly forty minutes. Nobody said a word the whole time.", tags: ["Peak whales", "Golden light"] },
  { date: "Mar 12", m: "March", img: IMG.mar, note: "Half the guests of peak season, twice the whale sightings. This might be the best-kept secret of the year.", tags: ["Smaller ships", "Whale season"] },
];

export default function Test_3() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="tsa_page" data-theme={theme} style={{ background: "var(--tsa-bg-light)" }}>
      <header className="tsa-nav" style={{ background: "var(--tsa-bg-light)" }}>
        <div className="tsa-nav-inner">
          <div className="tsa-flex tsa-gap-8"><Feather size={20} color="var(--tsa-navy)" /><span className="tsa-logo">The Polar Journal</span></div>
          <div className="tsa-flex tsa-gap-16">
            <span className="tsa-muted" style={{ fontSize: 13 }}>by Trips &amp; Ships</span>
            <button className="tsa-theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO — journal cover */}
      <section className="tsa-section" style={{ paddingBottom: 40 }}>
        <div className="tsa-container tsa-center" style={{ maxWidth: 700 }}>
          <span className="tsa-eyebrow tsa-center" style={{ justifyContent: "center" }}>Field Journal · Season Notes</span>
          <h1 className="tsa-h1 tsa-mt-16">A Season on the Ice</h1>
          <p className="tsa-lede tsa-mt-16 tsa-center">Five entries, one from each month of the Antarctic expedition season — notes on what to expect, and when to go.</p>
        </div>
        <div className="tsa-container tsa-mt-32">
          <div className="tsa-media tsa-ratio-21-9" style={{ boxShadow: "var(--tsa-shadow-lg)" }}>
            <img src={IMG.hero} className="tsa-img-cover" alt="Penguins in the water" />
            <div className="tsa-caption-overlay">
              <p style={{ fontStyle: "italic", fontFamily: "var(--tsa-font-display)", fontSize: 18 }}>"Paradise Harbour, midseason — the water was full of penguins the whole crossing."</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL ENTRIES */}
      <section className="tsa-section" style={{ paddingTop: 24 }}>
        <div className="tsa-container">
          {ENTRIES.map((e, i) => (
            <div key={e.date} className="tsa-card tsa-mt-32" style={{
              display: "grid", gridTemplateColumns: i % 2 ? "1fr 1.1fr" : "1.1fr 1fr", overflow: "hidden"
            }}>
              {i % 2 === 1 && <EntryImg e={e} />}
              <div className="tsa-card-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className="tsa-flex tsa-gap-8" style={{ color: "var(--tsa-gold)", fontFamily: "var(--tsa-font-mono)", fontSize: 12, letterSpacing: ".08em" }}>
                  <PenLine size={14} /> {e.date} — {e.m}
                </div>
                <p className="tsa-mt-16" style={{ fontFamily: "var(--tsa-font-display)", fontSize: 21, lineHeight: 1.55, color: "var(--tsa-navy)", fontStyle: "italic" }}>
                  "{e.note}"
                </p>
                <div className="tsa-flex tsa-gap-8 tsa-mt-24" style={{ flexWrap: "wrap" }}>
                  {e.tags.map(t => <span key={t} className="tsa-badge">{t}</span>)}
                </div>
              </div>
              {i % 2 === 0 && <EntryImg e={e} />}
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO DIARY */}
      <section className="tsa-section--soft">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Video Log</span>
          <h2 className="tsa-h2 tsa-mt-16">From the ship's logbook</h2>
          <div className="tsa-grid tsa-grid-2 tsa-mt-32">
            <div className="tsa-video">
              <img src={IMG.ship} alt="Expedition ship" />
              <span className="tsa-video-label">Entry 04 — Paradise Bay at Sunset</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={24} fill="var(--tsa-navy)" /></div></div>
            </div>
            <div className="tsa-video">
              <img src={IMG.glacier} alt="Glacier" />
              <span className="tsa-video-label">Entry 09 — Calving Glacier, Recorded Live</span>
              <div className="tsa-video-play"><div className="tsa-video-play-btn"><Play size={24} fill="var(--tsa-navy)" /></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* POLAROID-STYLE GALLERY */}
      <section className="tsa-section">
        <div className="tsa-container">
          <span className="tsa-eyebrow">Loose Pages</span>
          <h2 className="tsa-h2 tsa-mt-16">Snapshots from the album</h2>
          <div className="tsa-flex tsa-gap-24 tsa-mt-32" style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {[[IMG.emperor, "Emperor penguin, Ross Sea"], [IMG.seal, "Weddell seal, Franklin Island"], [IMG.glacier, "Glacier, Antarctic Peninsula"]].map(([src, cap], i) => (
              <div key={i} style={{ background: "#fff", padding: 12, paddingBottom: 44, boxShadow: "var(--tsa-shadow-lg)", transform: `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg)`, width: 240 }}>
                <div className="tsa-media tsa-ratio-1-1" style={{ borderRadius: 4 }}>
                  <img src={src} className="tsa-img-cover" alt={cap} />
                </div>
                <p style={{ fontFamily: "var(--tsa-font-display)", fontStyle: "italic", fontSize: 13, textAlign: "center", marginTop: 10, color: "var(--tsa-text-body)" }}>{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA — journal signoff */}
      <section className="tsa-section">
        <div className="tsa-container tsa-center" style={{ maxWidth: 620 }}>
          <span className="tsa-eyebrow tsa-center" style={{ justifyContent: "center" }}>Write the Next Entry</span>
          <h2 className="tsa-h2 tsa-mt-16">Your season starts with a single date</h2>
          <p className="tsa-muted tsa-mt-16">Tell us what you'd like your journal to say, and we'll match the month to it.</p>
          <div className="tsa-flex tsa-gap-16 tsa-mt-32" style={{ justifyContent: "center" }}>
            <a href="#" className="tsa-btn tsa-btn--primary">Schedule a Consultation</a>
            <a href="#" className="tsa-btn tsa-btn--ghost">Request an Itinerary</a>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 0", borderTop: "1px solid var(--tsa-navy-border)" }}>
        <div className="tsa-container tsa-flex" style={{ justifyContent: "space-between", fontSize: 13 }}>
          <span className="tsa-muted">© Trips &amp; Ships Luxury Travel</span>
          <span className="tsa-muted tsa-flex tsa-gap-8"><MapPin size={14} /> Worldwide</span>
        </div>
      </footer>
    </div>
  );
}

function EntryImg({ e }) {
  return (
    <div style={{ minHeight: 280 }}>
      <img src={e.img} className="tsa-img-cover" alt={e.m} style={{ height: "100%" }} />
    </div>
  );
}