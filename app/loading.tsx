export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-24 px-4">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Loading</p>
        <h1 className="mt-6 text-5xl font-semibold">Preparing your workspace</h1>
        <p className="mt-4 text-slate-400">Please hold tight while EmotionAI loads your session data.</p>
      </div>
    </main>
  )
}