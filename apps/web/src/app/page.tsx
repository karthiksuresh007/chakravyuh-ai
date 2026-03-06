import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Interactive Conflict Map",
    desc: "Explore active global conflicts on a real-time interactive map with severity-based clustering and filtering.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Timeline & Key Events",
    desc: "Scrub through conflict timelines with filterable categories, significance markers, and auto-play.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Impact Dashboard",
    desc: "Visualize humanitarian and economic impact with interactive charts, casualty breakdowns, and displacement data.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: "AI Conflict Explainer",
    desc: "Ask questions and get AI-powered explanations at five complexity levels — from quick summaries to expert analysis.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-800/50 bg-amber-950/30 text-amber-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            AI-Powered Geopolitical Intelligence
          </div>

          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Understand any global
            <br />
            conflict in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              under 3 minutes
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
            Interactive maps, real-time timelines, impact dashboards, and
            AI-driven analysis — all in one platform. From casual readers to
            policy analysts, get the depth you need.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:brightness-110 transition-all"
            >
              Explore the Map
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 text-sm font-medium hover:border-gray-500 hover:text-white transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="features-heading">
        <div className="text-center mb-14">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold mb-3">
            Everything you need to decode conflicts
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Four powerful modules working together to give you a complete
            picture of any geopolitical situation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-gray-700 hover:bg-gray-900 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-950/50 text-amber-400 mb-4 group-hover:bg-amber-950 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" aria-labelledby="cta-heading">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-8 sm:p-12 text-center">
          <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to see the world clearly?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            Dive into the interactive map and explore conflicts with
            AI-powered intelligence at your fingertips.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:brightness-110 transition-all"
          >
            Launch Dashboard
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-amber-400">◆</span> Chakravyuh AI
          </div>
          <p className="text-xs text-gray-500">
            Built for clarity in a complex world.
          </p>
        </div>
      </footer>
    </main>
  );
}

