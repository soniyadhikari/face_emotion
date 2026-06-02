"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 w-full z-50 bg-transparent border-b border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-3">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          EmotionAI
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-slate-300 hover:text-cyan-400 transition">Features</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-cyan-400 transition">Pricing</Link>
          <Link href="/about" className="text-slate-300 hover:text-cyan-400 transition">About</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-slate-200 hover:text-cyan-400 transition">Dashboard</Link>
              <Link href="/upload" className="text-slate-200 hover:text-cyan-400 transition">Upload</Link>
              <Link href="/webcam" className="text-slate-200 hover:text-cyan-400 transition">Webcam</Link>
              <Link href="/analytics" className="text-slate-200 hover:text-cyan-400 transition">Analytics</Link>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-300">{session.user?.email}</span>
              <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })} className="text-slate-300 hover:text-cyan-400">Sign out</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}