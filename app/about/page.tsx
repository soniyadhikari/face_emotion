export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">About EmotionAI</p>
          <h1 className="mt-4 text-4xl font-semibold">AI experiences for modern teams</h1>
          <p className="mt-3 text-slate-400">EmotionAI was built to help companies understand human sentiment across digital interactions and real-life moments.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Mission</h2>
            <p className="mt-4 text-slate-400">We create trustworthy emotion intelligence tools for teams that need fast insights, deep analytics, and scalable AI infrastructure.</p>
          </section>
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-semibold text-white">Vision</h2>
            <p className="mt-4 text-slate-400">Enable better decisions with empathetic data and seamless emotion analytics across web, video, and collaboration workflows.</p>
          </section>
        </div>
      </div>
    </main>
  )
}