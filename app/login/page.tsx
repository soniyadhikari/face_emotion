"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    })

    setIsLoading(false)

    if (result?.error) {
      setError("Invalid email or password. Please try again.")
      return
    }

    if (result?.ok && result.url) {
      router.push(result.url)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-24 px-4">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">EmotionAI</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Welcome back</h1>
          <p className="mt-3 text-slate-400">Sign in to access your emotion intelligence workspace.</p>
        </div>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-cyan-500/40 bg-slate-800 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/80 hover:bg-slate-700"
        >
          Continue with Google
        </button>

        {registered ? (
          <div className="my-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
            Account created successfully. Please sign in.
          </div>
        ) : null}

        <div className="my-6 flex items-center gap-3 text-sm text-slate-500">
          <span className="h-px flex-1 bg-white/10" />
          Or continue with email
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="mt-2"
            />
          </div>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-500"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-300 hover:text-cyan-100">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}