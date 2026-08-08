"use client";

import { useEffect, useState } from "react";
import {
  CODE,
  DIM_VALS,
  DIMS,
  INSTALL,
  L,
  LANGS,
  LINE_COLOR,
  PHASE_META,
  SCRIPTS,
  STAT_N,
  type Lang,
  type TabKey,
} from "./content";

const pad2 = (n: number) => String(n).padStart(2, "0");

function Corners() {
  return (
    <>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </>
  );
}

function LogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5980a6" strokeWidth="1.5">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
      <path d="M9.5 8.5 8 10l1.5 1.5" />
      <path d="m14.5 8.5 1.5 1.5-1.5 1.5" />
    </svg>
  );
}

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C17.5 4.7 18.5 5 18.5 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export default function Home() {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const stored = window.localStorage.getItem("rnh-lang");
      if (stored === "pt" || stored === "es" || stored === "en") return stored;
    } catch {
      // localStorage unavailable — fall back to default language
    }
    return "en";
  });
  const [tab, setTab] = useState<TabKey>("init");
  const [copied, setCopied] = useState(false);

  // Keep the <html lang> attribute in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  }, [lang]);

  function setLang(next: Lang) {
    try {
      localStorage.setItem("rnh-lang", next);
    } catch {
      // localStorage unavailable — language still updates for this session
    }
    setLangState(next);
  }

  function copyInstall() {
    navigator.clipboard?.writeText(INSTALL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const t = L[lang];

  const detections = DIMS[lang].map((dim, i) => ({ dim, val: DIM_VALS[i] }));
  const stats = t.stats.map((label, i) => ({ n: STAT_N[i], label }));
  const phases = t.phases.map(([name, body], i) => ({ ...PHASE_META[i], name, body }));
  const gates = t.gates.map(([kicker, title, body]) => ({ kicker, title, body }));
  const features = t.features.map(([title, body, tags], i) => ({ no: pad2(i + 1), title, body, tags }));
  const tabsList = (["init", "doctor", "gate"] as const).map((key, i) => ({
    key,
    cmd: ["/new-rn-project", "/rn-doctor", "git commit"][i],
    hint: t.tabHints[i],
  }));
  const lines = SCRIPTS[tab].map(([text, kind]) => ({ text: text || " ", color: LINE_COLOR[kind] }));
  const steps = t.steps.map(([title, body], i) => ({ no: pad2(i + 1), title, body, code: CODE[`s${i + 1}`] }));
  const contribute = t.contribute.map(([title, body], i) => ({ no: pad2(i + 1), title, body }));

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "var(--font-body)", color: "var(--color-text)" }}>
      {/* decorative fixed background: grid + drifting orbs + scan line */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(29,31,32,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,31,32,.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute", top: "-10vh", left: "-8vw", width: "52vw", height: "52vw",
            borderRadius: "50%", filter: "blur(90px)", opacity: 0.5,
            background: "radial-gradient(circle at 40% 40%, #94bce3, rgba(148,188,227,0) 66%)",
            animation: "orbA 34s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute", top: "34vh", right: "-14vw", width: "46vw", height: "46vw",
            borderRadius: "50%", filter: "blur(100px)", opacity: 0.42,
            background: "radial-gradient(circle at 50% 50%, #5980a6, rgba(89,128,166,0) 68%)",
            animation: "orbB 46s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-20vh", left: "22vw", width: "44vw", height: "44vw",
            borderRadius: "50%", filter: "blur(110px)", opacity: 0.38,
            background: "radial-gradient(circle at 50% 50%, #b5d9fd, rgba(181,217,253,0) 70%)",
            animation: "orbC 40s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(89,128,166,.5), transparent)",
            animation: "sweep 18s linear infinite",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <header
          style={{
            position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(10px)",
            background: "rgba(242,242,243,.72)", borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <nav style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, padding: "14px 32px" }} data-pad="1">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
              <LogoIcon />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, letterSpacing: ".01em" }}>rn-harness</span>
              <span className="tag tag-outline" style={{ border: "1px solid var(--color-divider)" }}>{t.badge}</span>
            </div>
            <div data-navlinks="1" style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 14 }}>
              <a href="#lifecycle" style={{ color: "var(--color-text)" }}>{t.navLifecycle}</a>
              <a href="#features" style={{ color: "var(--color-text)" }}>{t.navFeatures}</a>
              <a href="#terminal" style={{ color: "var(--color-text)" }}>{t.navDemo}</a>
              <a href="#start" style={{ color: "var(--color-text)" }}>{t.navStart}</a>
              <a href="#contribute" style={{ color: "var(--color-text)" }}>{t.navContribute}</a>
            </div>
            <div style={{ display: "flex", border: "1px solid var(--color-divider)" }} role="group" aria-label="Language">
              {LANGS.map(([code, label, name]) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  aria-pressed={code === lang}
                  title={name}
                  style={{
                    fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: ".08em",
                    padding: "6px 10px", cursor: "pointer", border: 0, borderLeft: "1px solid var(--color-divider)",
                    background: code === lang ? "var(--color-accent)" : "transparent",
                    color: code === lang ? "var(--color-bg)" : "var(--color-text)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <a
              className="btn btn-primary blueprint"
              href="https://github.com/Jujubalandia/rn-harness"
              target="_blank"
              rel="noopener"
              style={{ position: "relative", padding: "8px 16px" }}
            >
              <GithubIcon size={15} />
              {t.ctaGithub}
              <Corners />
            </a>
          </nav>
        </header>

        <section
          style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 32px 72px", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }}
          data-g="hero"
          data-pad="1"
        >
          <div>
            <h1 data-hero-h="1" style={{ fontSize: 74, lineHeight: 0.95, letterSpacing: "-.02em", margin: "0 0 20px" }}>
              {t.heroTitleA} <span style={{ color: "var(--color-accent-700)" }}>{t.heroTitleB}</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 78%, transparent)", margin: "0 0 12px" }}>
              {t.heroLead}
            </p>
            <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", margin: "0 0 28px" }}>{t.heroWink}</p>

            <div
              className="blueprint"
              style={{
                position: "relative", padding: "14px 16px", background: "#1d2d3d",
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, color: "#d6ebff",
                display: "flex", alignItems: "center", gap: 12, marginBottom: 22,
              }}
            >
              <span style={{ color: "#94bce3" }}>$</span>
              <span style={{ flex: 1, overflow: "auto", whiteSpace: "nowrap" }}>{INSTALL}</span>
              <button
                onClick={copyInstall}
                style={{
                  fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
                  background: "transparent", border: "1px solid rgba(214,235,255,.35)", color: "#d6ebff",
                  padding: "5px 10px", cursor: "pointer", borderRadius: 2,
                }}
              >
                {copied ? t.copied : t.copy}
              </button>
              <Corners />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary blueprint" href="#start" style={{ position: "relative", padding: "11px 22px", fontSize: 15 }}>
                {t.heroCta1}
                <Corners />
              </a>
              <a className="btn btn-secondary" href="#lifecycle" style={{ padding: "11px 22px", fontSize: 15 }}>
                {t.heroCta2}
              </a>
            </div>
          </div>

          <div className="blueprint" style={{ position: "relative", padding: 26, background: "rgba(242,242,243,.55)" }}>
            <div
              style={{
                fontFamily: "var(--font-heading)", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase",
                color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 18,
              }}
            >
              {t.figCaption}
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}
              data-g="detect"
            >
              {detections.map((d) => (
                <div key={d.dim} style={{ background: "var(--color-bg)", padding: "11px 13px" }}>
                  <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>
                    {d.dim}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, color: "var(--color-accent-800)", marginTop: 3 }}>{d.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{t.figNote}</div>
            <Corners />
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "rgba(233,233,234,.5)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} data-g="stats" data-pad="1">
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "30px 24px", borderLeft: "1px solid var(--color-divider)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 46, lineHeight: 1, color: "var(--color-accent-700)" }}>{s.n}</div>
                <div style={{ fontSize: 13.5, marginTop: 6, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="lifecycle" style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 32px 72px" }} data-pad="1">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 38, flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase",
                  color: "var(--color-accent-700)", marginBottom: 10,
                }}
              >
                {t.lifeKicker}
              </div>
              <h2 data-h2="1" style={{ fontSize: 50, lineHeight: 1, margin: 0, maxWidth: "20ch" }}>{t.lifeTitle}</h2>
            </div>
            <p style={{ maxWidth: "38ch", fontSize: 16, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: 0 }}>{t.lifeLead}</p>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}
            data-g="phases"
          >
            {phases.map((p) => (
              <div key={p.idx} style={{ background: "var(--color-bg)", padding: "22px 18px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 260 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--color-accent-700)" }}>{p.days}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 11, letterSpacing: ".1em", color: "color-mix(in srgb, var(--color-text) 40%, transparent)" }}>
                    {p.idx}
                  </span>
                </div>
                <div style={{ height: 2, background: "var(--color-accent)", width: p.weight }} />
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, lineHeight: 1.05 }}>{p.name}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "color-mix(in srgb, var(--color-text) 68%, transparent)", flex: 1 }}>{p.body}</div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "color-mix(in srgb, var(--color-text) 48%, transparent)",
                    borderTop: "1px solid var(--color-divider)", paddingTop: 9,
                  }}
                >
                  {p.doc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginTop: 22 }} data-g="gates">
            {gates.map((g, i) => (
              <div key={i} className="blueprint" style={{ position: "relative", padding: "20px 22px", background: "rgba(242,242,243,.5)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase",
                    color: "var(--color-accent-700)", marginBottom: 8,
                  }}
                >
                  {g.kicker}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, marginBottom: 6 }}>{g.title}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>{g.body}</div>
                <Corners />
              </div>
            ))}
          </div>
        </section>

        <section id="features" style={{ borderTop: "1px solid var(--color-divider)", background: "rgba(233,233,234,.4)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 32px" }} data-pad="1">
            <div
              style={{
                fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase",
                color: "var(--color-accent-700)", marginBottom: 10,
              }}
            >
              {t.featKicker}
            </div>
            <h2 data-h2="1" style={{ fontSize: 50, lineHeight: 1, margin: "0 0 38px", maxWidth: "22ch" }}>{t.featTitle}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} data-g="features">
              {features.map((f) => (
                <div
                  key={f.no}
                  className="blueprint"
                  style={{ position: "relative", padding: 24, background: "rgba(242,242,243,.6)", display: "flex", flexDirection: "column", gap: 11, minHeight: 210 }}
                >
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--color-accent-700)" }}>{f.no}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 24, lineHeight: 1.05 }}>{f.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: "color-mix(in srgb, var(--color-text) 70%, transparent)", flex: 1 }}>{f.body}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {f.tags.map((tg) => (
                      <span key={tg} className="tag tag-accent">{tg}</span>
                    ))}
                  </div>
                  <Corners />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="terminal" style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 32px" }} data-pad="1">
          <div style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: 48, alignItems: "start" }} data-g="terminal">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase",
                  color: "var(--color-accent-700)", marginBottom: 10,
                }}
              >
                {t.termKicker}
              </div>
              <h2 data-h2="1" style={{ fontSize: 46, lineHeight: 1, margin: "0 0 16px" }}>{t.termTitle}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "0 0 24px" }}>{t.termLead}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}>
                {tabsList.map((tb) => (
                  <button
                    key={tb.key}
                    onClick={() => setTab(tb.key)}
                    style={{
                      display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start", textAlign: "left",
                      padding: "14px 16px", cursor: "pointer", border: 0, fontFamily: "var(--font-body)",
                      background: tab === tb.key ? "#1d2d3d" : "var(--color-bg)",
                      color: tab === tb.key ? "#d6ebff" : "var(--color-text)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13.5 }}>{tb.cmd}</span>
                    <span style={{ fontSize: 12.5, opacity: 0.7 }}>{tb.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="blueprint" style={{ position: "relative", background: "#1d2d3d", padding: 0, boxShadow: "0 24px 60px -30px rgba(29,45,61,.6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", borderBottom: "1px solid rgba(214,235,255,.16)" }}>
                <span style={{ width: 9, height: 9, border: "1px solid rgba(214,235,255,.45)", display: "block" }} />
                <span style={{ width: 9, height: 9, border: "1px solid rgba(214,235,255,.45)", display: "block" }} />
                <span style={{ width: 9, height: 9, border: "1px solid rgba(214,235,255,.45)", display: "block" }} />
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "rgba(214,235,255,.6)", marginLeft: 8 }}>~/projects/my-app</span>
              </div>
              <div style={{ padding: "20px 22px 26px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, lineHeight: 1.75, minHeight: 420, color: "#d6ebff" }}>
                {lines.map((ln, i) => (
                  <div key={i} style={{ color: ln.color, minHeight: "1em", whiteSpace: "pre" }}>{ln.text}</div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <span style={{ color: "#94bce3" }}>$</span>
                  <span style={{ display: "inline-block", width: 8, height: 15, background: "#94bce3", animation: "blink 1.1s step-end infinite" }} />
                </div>
              </div>
              <Corners />
            </div>
          </div>
        </section>

        <section id="start" style={{ borderTop: "1px solid var(--color-divider)", background: "rgba(233,233,234,.4)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 32px" }} data-pad="1">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase",
                    color: "var(--color-accent-700)", marginBottom: 10,
                  }}
                >
                  {t.startKicker}
                </div>
                <h2 data-h2="1" style={{ fontSize: 50, lineHeight: 1, margin: 0 }}>{t.startTitle}</h2>
              </div>
              <div style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 62%, transparent)", maxWidth: "34ch" }}>{t.startLead}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--color-divider)" }}>
              {steps.map((st) => (
                <div
                  key={st.no}
                  style={{ display: "grid", gridTemplateColumns: "96px 1fr 1.15fr", gap: 28, padding: "28px 0", borderBottom: "1px solid var(--color-divider)", alignItems: "start" }}
                  data-g="step"
                >
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 56, lineHeight: 0.85, color: "var(--color-accent-300)" }}>{st.no}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 25, lineHeight: 1.1, marginBottom: 7 }}>{st.title}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>{st.body}</div>
                  </div>
                  <div
                    className="blueprint"
                    style={{
                      position: "relative", background: "#1d2d3d", padding: "14px 16px", fontFamily: "'IBM Plex Mono',monospace",
                      fontSize: 13, lineHeight: 1.7, color: "#d6ebff", whiteSpace: "pre-wrap", overflowX: "auto",
                    }}
                  >
                    {st.code}
                    <Corners />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
              <a
                className="btn btn-primary blueprint"
                href="https://github.com/Jujubalandia/rn-harness"
                target="_blank"
                rel="noopener"
                style={{ position: "relative", padding: "13px 26px", fontSize: 16 }}
              >
                <GithubIcon size={16} />
                {t.ctaGithub}
                <Corners />
              </a>
              <span style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.startNote}</span>
            </div>
          </div>
        </section>

        <section id="contribute" style={{ borderTop: "1px solid var(--color-divider)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 32px" }} data-pad="1">
            <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "start" }} data-g="terminal">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase",
                    color: "var(--color-accent-700)", marginBottom: 10,
                  }}
                >
                  {t.contribKicker}
                </div>
                <h2 data-h2="1" style={{ fontSize: 46, lineHeight: 1, margin: "0 0 16px" }}>{t.contribTitle}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 70%, transparent)", margin: "0 0 22px" }}>{t.contribLead}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    className="btn btn-secondary"
                    href="https://github.com/Jujubalandia/rn-harness/issues/new?template=bug_report.md"
                    target="_blank"
                    rel="noopener"
                    style={{ padding: "10px 20px" }}
                  >
                    {t.contribBug}
                  </a>
                  <a
                    className="btn btn-secondary"
                    href="https://github.com/Jujubalandia/rn-harness/issues/new?template=feature_request.md"
                    target="_blank"
                    rel="noopener"
                    style={{ padding: "10px 20px" }}
                  >
                    {t.contribFeat}
                  </a>
                </div>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}
                data-g="features"
              >
                {contribute.map((c) => (
                  <div key={c.no} style={{ background: "var(--color-bg)", padding: "22px 20px", display: "flex", flexDirection: "column", gap: 8, minHeight: 170 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--color-accent-700)" }}>{c.no}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, lineHeight: 1.1 }}>{c.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>{c.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer style={{ borderTop: "1px solid var(--color-divider)" }}>
          <div
            style={{
              maxWidth: 1160, margin: "0 auto", padding: "38px 32px", display: "flex", alignItems: "center",
              gap: 24, flexWrap: "wrap", fontSize: 13.5, color: "color-mix(in srgb, var(--color-text) 58%, transparent)",
            }}
            data-pad="1"
          >
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--color-text)", marginRight: "auto" }}>rn-harness</span>
            <a href="https://github.com/Jujubalandia/rn-harness" target="_blank" rel="noopener">GitHub</a>
            <a href="https://github.com/Jujubalandia/rn-harness/issues" target="_blank" rel="noopener">Issues</a>
            <a href="https://github.com/Jujubalandia/rn-harness/blob/main/README.md" target="_blank" rel="noopener">README (EN)</a>
            <a href="https://github.com/Jujubalandia/rn-harness/blob/main/README.pt-BR.md" target="_blank" rel="noopener">README (PT-BR)</a>
            <span>Expo SDK 56 · RN 0.76 · Reanimated v3</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
