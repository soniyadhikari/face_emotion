import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-24 px-4">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">404</p>
        <h1 className="mt-6 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you are looking for does not exist, or the link was broken.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500">
          Return home
        </Link>
      </div>
    </main>
  )
}