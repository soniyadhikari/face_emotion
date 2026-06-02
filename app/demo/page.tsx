import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Demo</p>
          <h1 className="mt-4 text-4xl font-semibold">Try EmotionAI instantly</h1>
          <p className="mt-3 text-slate-400">Experience the core features with live webcam detection, image analysis, and analytics dashboards.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center">
            <h2 className="text-2xl font-semibold text-white">Live webcam</h2>
            <p className="mt-4 text-slate-400">Start a live session for instant emotion detection and confidence overlays.</p>
            <Link href="/webcam">
              <Button className="mt-6 rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-500">Open webcam</Button>
            </Link>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center">
            <h2 className="text-2xl font-semibold text-white">Image upload</h2>
            <p className="mt-4 text-slate-400">Upload a photo and analyze the emotions for faces in the image.</p>
            <Link href="/upload">
              <Button className="mt-6 rounded-full bg-cyan-500 px-5 py-3 text-slate-950 hover:bg-cyan-400">Upload image</Button>
            </Link>
          </Card>
        </div>
      </div>
    </main>
  )
}