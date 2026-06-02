"use client"

import { useEffect } from "react"
import Link from "next/link"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-slate-950 text-white py-24 px-4">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Something went wrong</p>
        <h1 className="mt-6 text-5xl font-semibold">Unexpected error</h1>
        <p className="mt-4 text-slate-400">Please try again or return to the dashboard.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={() => reset()} className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500">
            Retry
          </button>
          <Link href="/" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}