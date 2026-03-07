"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Dynamically import the map (client-only, no SSR) ── */
const ConflictMap = dynamic(
  () => import("@/components/map/ConflictMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-border border-t-amber-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-500 font-data tracking-wide">
            LOADING MAP
          </span>
        </div>
      </div>
    ),
  }
);

/* ── Legend items ─────────────────────────────────────── */
const LEGEND_ITEMS = [
  { label: "Active War", color: "#EF4444" },
  { label: "Military Conflict", color: "#F97316" },
  { label: "Political Tension", color: "#EAB308" },
  { label: "Historical Conflict", color: "#6B7280" },
];

/* ── Feature cards data ──────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Interactive Conflict Map",
    desc: "Track active wars and geopolitical tensions worldwide with real-time severity-based clustering and filtering.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Conflict Timelines",
    desc: "Explore the historical evolution of conflicts with interactive timeline scrubbing, milestone markers, and auto-play.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: "AI Explainer",
    desc: "Ask questions and understand complex conflicts instantly with AI-powered explanations at five different depth levels.",
  },
];

/* ── Framer Motion variants ──────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: EASE_OUT },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/* ================================================================
   HOME — Hero Map Landing Page
   ================================================================ */
export default function Home() {
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-gray-100">
      {/* ── 1. FIXED NAVBAR ─────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] navbar-glass"
        role="navigation"
        aria-label="Main navigation"
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
            <span className="text-amber-400 text-lg font-bold tracking-tight group-hover:text-amber-300 transition-colors">
              ◆
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-100 group-hover:text-white transition-colors">
              Chakravyuh
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToMap}
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
              id="nav-map"
            >
              Map
            </button>
            <a
              href="#features"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
              id="nav-about"
            >
              About
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
              id="nav-github"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO SECTION — Fullscreen map background ────── */}
      <section
        className="relative w-full h-screen overflow-hidden"
        aria-labelledby="hero-heading"
        id="hero-section"
      >
        {/* Background map (decorative, non-interactive in hero) */}
        <motion.div
          className="absolute inset-0 pointer-events-none hero-map-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <ConflictMap />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient-overlay pointer-events-none" />

        {/* Hero content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 pointer-events-none">
          <motion.div
            className="text-center max-w-3xl mx-auto pointer-events-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-800/50 bg-amber-950/30 text-amber-400 text-xs font-medium mb-8"
              variants={fadeUp}
              custom={0}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              AI-Powered Geopolitical Intelligence
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]"
              variants={fadeUp}
              custom={1}
            >
              Understand the World&apos;s
              <br />
              Conflicts in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                3 Minutes
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="max-w-xl mx-auto text-base sm:text-lg text-gray-400 mb-10 leading-relaxed"
              variants={fadeUp}
              custom={2}
            >
              Interactive map&ensp;•&ensp;Conflict timelines&ensp;•&ensp;AI explanations
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={3}>
              <button
                onClick={scrollToMap}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:brightness-110 transition-all"
                id="cta-explore"
              >
                Explore the Map
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full border-2 border-gray-500/40 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <div className="w-1 h-1.5 rounded-full bg-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MAP INTERACTION SECTION ─────────────────────── */}
      <section
        ref={mapSectionRef}
        id="map-section"
        className="relative w-full h-screen"
        aria-label="Interactive conflict map"
      >
        {/* Full interactive map */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <ConflictMap />
        </motion.div>

        {/* ── Conflict Legend — bottom-left ── */}
        <motion.div
          className="absolute bottom-6 left-6 z-40 glass-panel px-4 py-3 min-w-[180px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          id="conflict-legend"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
            Conflict Legend
          </p>
          <div className="flex flex-col gap-2">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-legend text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 4. FEATURE HIGHLIGHT SECTION ──────────────────── */}
      <section
        id="features"
        className="relative py-24 sm:py-32"
        aria-labelledby="features-heading"
      >
        {/* Subtle top gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            >
              Everything you need to decode conflicts
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-base">
              Three powerful modules working together to give you a complete
              picture of any geopolitical situation.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                className="feature-card group rounded-xl border border-gray-800 bg-surface p-7 hover:border-gray-600"
                variants={cardVariant}
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-amber-950/40 text-amber-400 mb-5 group-hover:bg-amber-950/70 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. FOOTER ─────────────────────────────────────── */}
      <footer className="border-t border-gray-800/60 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-amber-400">◆</span> Chakravyuh AI
          </div>
          <p className="text-xs text-gray-500">
            Built for clarity in a complex world.
          </p>
        </div>
      </footer>
    </div>
  );
}
