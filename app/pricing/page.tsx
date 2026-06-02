import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold">Choose the plan that fits your growth</h1>
          <p className="mt-3 text-slate-400">From individual pilots to enterprise teams, EmotionAI gives you the tools for smarter emotion analytics.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Starter</p>
            <p className="mt-4 text-5xl font-semibold text-white">Free</p>
            <p className="mt-3 text-slate-400">10 detections per month, basic analytics, limited support.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>Webcam detection</li>
              <li>Image uploads</li>
              <li>Emotion history</li>
            </ul>
            <Button className="mt-8 w-full rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-500">Start free</Button>
          </Card>
          <Card className="rounded-3xl border border-cyan-400 bg-slate-900/90 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Pro</p>
            <p className="mt-4 text-5xl font-semibold text-white">$9.99</p>
            <p className="mt-3 text-slate-400">Unlimited detections, advanced analytics, voice support, report export.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>AI sentiment insights</li>
              <li>Realtime analytics</li>
              <li>PDF exports</li>
            </ul>
            <Button className="mt-8 w-full rounded-full bg-cyan-500 px-5 py-3 text-slate-950 hover:bg-cyan-400">Start Pro</Button>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Enterprise</p>
            <p className="mt-4 text-5xl font-semibold text-white">Custom</p>
            <p className="mt-3 text-slate-400">Team collaboration, API access, private deployment, premium onboarding.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>Multi-user teams</li>
              <li>Dedicated support</li>
              <li>Custom SLAs</li>
            </ul>
            <Button className="mt-8 w-full rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-500">Contact sales</Button>
          </Card>
        </div>
      </div>
    </main>
  )
}