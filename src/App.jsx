import React, { useState } from "react";
import { Sparkles, Check, ChevronRight, Search, Shield } from "lucide-react";

/* ---------- palette ----------
   ink:      #1E2A44  (deep indigo — night sky over a fort)
   parchment #F6F0E2  (rice-paper base)
   marigold  #E5A339  (festival accent, primary CTA)
   madder    #A6373A  (craft red, secondary accent)
   teal      #2E5D59  (support / verified state)
------------------------------- */

const topics = [
  {
    id: "amber-fort",
    name: "Amber Fort",
    region: "Rajasthan",
    kind: "Monument",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <path d="M10 50 L10 30 L18 22 L18 30 M18 30 L26 20 L26 30 M26 30 L32 16 L38 30 M38 30 L38 20 L46 28 L46 30 M46 30 L54 22 L54 50 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="6" y1="50" x2="58" y2="50" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: "blue-pottery",
    name: "Jaipur Blue Pottery",
    region: "Rajasthan",
    kind: "Craft",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <path d="M24 12 h16 v6 c6 4 8 10 8 16 c0 12 -8 18 -16 18 s-16 -6 -16 -18 c0 -6 2 -12 8 -16 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M22 30 q10 6 20 0" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 38 q12 8 24 0" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    region: "Tamil Nadu",
    kind: "Performing Art",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <circle cx="32" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M32 20 v14 M32 26 L18 18 M32 26 L48 34 M32 34 L20 50 M32 34 L44 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "chola-bronze",
    name: "Chola Bronze Casting",
    region: "Tamil Nadu",
    kind: "Craft",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <circle cx="32" cy="34" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M32 18 v-6 M32 56 v-6 M18 34 h-6 M52 34 h6 M21 23 l-4 -4 M43 45 l4 4 M43 23 l4 -4 M21 45 l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="34" r="5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "patua-scroll",
    name: "Patua Scroll Singing",
    region: "West Bengal",
    kind: "Living Tradition",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <rect x="10" y="16" width="4" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="50" y="16" width="4" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 20 Q32 26 50 20 M14 32 Q32 38 50 32 M14 44 Q32 50 50 44" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "bishnupur",
    name: "Bishnupur Terracotta",
    region: "West Bengal",
    kind: "Monument",
    icon: (
      <svg viewBox="0 0 64 64" className="w-9 h-9">
        <rect x="12" y="14" width="40" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="26" x2="52" y2="26" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="12" y1="38" x2="52" y2="38" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="25" y1="14" x2="25" y2="50" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="39" y1="14" x2="39" y2="50" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

const artStyles = [
  { id: "madhubani", name: "Madhubani", region: "Bihar", fg: "#7A2E2E", bg: "#F3E2B5", note: "Bold outlines, natural dyes, dense floral fill." },
  { id: "warli", name: "Warli", region: "Maharashtra", fg: "#F3E7D3", bg: "#5B4331", note: "White rice-paste figures on an earthen ground." },
  { id: "kalamkari", name: "Kalamkari", region: "Andhra Pradesh", fg: "#1E2A44", bg: "#EFE4CE", note: "Hand-drawn indigo linework on cotton." },
  { id: "tanjore", name: "Tanjore", region: "Tamil Nadu", fg: "#C79A3E", bg: "#601F2A", note: "Gilded relief on a deep, jewel-toned base." },
  { id: "pattachitra", name: "Pattachitra", region: "Odisha", fg: "#8C2B22", bg: "#E8D6A8", note: "Fine brushwork bordered in narrative panels." },
  { id: "gond", name: "Gond", region: "Madhya Pradesh", fg: "#F0EAD6", bg: "#20211D", note: "Dot-and-dash fill built from a single flowing line." },
];

function Swatch({ style, active }) {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full rounded-lg">
      <rect width="40" height="40" fill={style.bg} />
      {style.id === "gond" && Array.from({ length: 24 }).map((_, i) => (
        <circle key={i} cx={4 + (i % 6) * 6.5} cy={4 + Math.floor(i / 6) * 9} r="1.4" fill={style.fg} />
      ))}
      {style.id === "warli" && (
        <>
          <circle cx="20" cy="12" r="3" fill="none" stroke={style.fg} strokeWidth="1.4" />
          <path d="M20 15 v8 M20 19 l-6 6 M20 19 l6 6 M20 23 l-5 8 M20 23 l5 8" stroke={style.fg} strokeWidth="1.4" fill="none" />
        </>
      )}
      {style.id === "madhubani" && (
        <path d="M4 30 Q10 10 20 20 Q30 30 36 10" stroke={style.fg} strokeWidth="2" fill="none" />
      )}
      {style.id === "kalamkari" && (
        <path d="M8 8 q12 0 12 12 q0 12 -12 12" stroke={style.fg} strokeWidth="1.6" fill="none" />
      )}
      {style.id === "tanjore" && (
        <circle cx="20" cy="20" r="10" fill="none" stroke={style.fg} strokeWidth="2.2" />
      )}
      {style.id === "pattachitra" && (
        <rect x="6" y="6" width="28" height="28" fill="none" stroke={style.fg} strokeWidth="1.6" />
      )}
      {active && (
        <rect x="1" y="1" width="38" height="38" rx="6" fill="none" stroke="#E5A339" strokeWidth="2.5" />
      )}
    </svg>
  );
}

export default function HeritageStoryCreate() {
  const [topic, setTopic] = useState(topics[0]);
  const [style, setStyle] = useState(artStyles[0]);
  const [query, setQuery] = useState("");

  const filtered = topics.filter(
    (t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full" style={{ background: "#F6F0E2", color: "#1E2A44" }}>
      <style>{`
        @keyframes threadDraw { from { stroke-dashoffset: 480; } to { stroke-dashoffset: 0; } }
        .thread-line { stroke-dasharray: 480; animation: threadDraw 1.4s ease-out forwards; }
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Work Sans', system-ui, sans-serif; }
      `}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap" />

      {/* nav */}
      <header className="font-body flex items-center justify-between px-6 md:px-10 py-5 border-b" style={{ borderColor: "#E3D8BE" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#1E2A44" }}>
            <Sparkles className="w-4 h-4" style={{ color: "#E5A339" }} />
          </div>
          <span className="font-display text-lg" style={{ color: "#1E2A44" }}>Heritage in Motion</span>
        </div>
        <nav className="hidden md:flex gap-7 text-sm" style={{ color: "#5B5342" }}>
          <span>Map</span>
          <span className="font-medium" style={{ color: "#1E2A44" }}>Create</span>
          <span>Community</span>
          <span>Then vs Now</span>
          <span>Passport</span>
        </nav>
      </header>

      {/* hero */}
      <section className="font-body px-6 md:px-10 pt-14 pb-10 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: "#1E2A44" }}>
          Every story starts with something real.
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-xl" style={{ color: "#5B5342" }}>
          Pick a place, a craft, or a tradition still practiced today. We build the story
          from verified reference notes only — nothing reaches you until it's been checked.
        </p>
        <svg viewBox="0 0 300 12" className="mt-8 w-64 h-3">
          <path d="M0 6 Q75 -4 150 6 T300 6" className="thread-line" fill="none" stroke="#A6373A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </section>

      <main className="font-body px-6 md:px-10 pb-20 grid md:grid-cols-3 gap-10">
        {/* left: topic + style pickers */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Find a topic</h2>
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5 border" style={{ borderColor: "#D9CBA6" }}>
                <Search className="w-3.5 h-3.5" style={{ color: "#8A7F63" }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a craft, region, or place"
                  className="bg-transparent outline-none text-sm placeholder:text-stone-400 w-44"
                />
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              {filtered.map((t) => {
                const active = t.id === topic.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t)}
                    className="flex-shrink-0 w-44 text-left rounded-2xl p-4 border transition-transform"
                    style={{
                      borderColor: active ? "#1E2A44" : "#E3D8BE",
                      background: active ? "#1E2A44" : "#FBF7EC",
                      color: active ? "#F6F0E2" : "#1E2A44",
                      transform: active ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div style={{ color: active ? "#E5A339" : "#A6373A" }}>{t.icon}</div>
                    <div className="mt-3 font-medium text-sm leading-snug">{t.name}</div>
                    <div className="text-xs mt-1" style={{ color: active ? "#C9BFA0" : "#8A7F63" }}>
                      {t.region} · {t.kind}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl mb-1">Choose an art style</h2>
            <p className="text-sm mb-4" style={{ color: "#8A7F63" }}>{style.note}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {artStyles.map((s) => (
                <button key={s.id} onClick={() => setStyle(s)} className="aspect-square">
                  <Swatch style={s} active={s.id === style.id} />
                  <div className="text-xs mt-1.5 text-left" style={{ color: "#5B5342" }}>{s.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* right: verification + cta */}
        <aside className="space-y-5">
          <div className="rounded-2xl border p-5" style={{ borderColor: "#E3D8BE", background: "#FBF7EC" }}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4" style={{ color: "#2E5D59" }} />
              <h3 className="font-display text-base">How we keep it honest</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "#8A7F63" }}>
              Nothing is invented. Every sentence traces back to a note we can point to.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Pulled from the verified archive for " + topic.name,
                "Drafted sentence by sentence, in order",
                "Checked line-by-line before it's shown to you",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#2E5D59" }}
                  >
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                  <span style={{ color: "#1E2A44" }}>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-5" style={{ background: "#1E2A44" }}>
            <div className="text-xs uppercase tracking-normal" style={{ color: "#C9BFA0" }}>Ready to build</div>
            <div className="font-display text-lg mt-1 mb-4" style={{ color: "#F6F0E2" }}>
              {topic.name}, in {style.name} style
            </div>
            <button
              className="w-full rounded-xl py-3 font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "#E5A339", color: "#1E2A44" }}
            >
              Weave the story <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: "#A89C7C" }}>
            Demo mode. The retrieval, writing and checking steps run on a small set of
            verified reference notes for this Smart India Hackathon build — nothing here
            should be treated as a published historical source.
          </p>
        </aside>
      </main>
    </div>
  );
}
