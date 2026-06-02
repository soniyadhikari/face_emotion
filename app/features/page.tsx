import { Card } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Features</p>
          <h1 className="mt-4 text-4xl font-semibold">Powerful AI features for every workflow</h1>
          <p className="mt-3 text-slate-400">From live webcam tracking to image uploads and analytics, EmotionAI delivers enterprise-grade intelligence.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Webcam emotion detection", description: "Capture emotions live from your camera with real-time confidence scores." },
            { title: "Image analysis", description: "Upload photos and review emotional signals across multiple faces." },
            { title: "Analytics dashboard", description: "Track trends, mood distribution, and session performance." },
            { title: "Voice & text sentiment", description: "Enhance results with optional voice and text emotion insights." },
            { title: "Secure SaaS architecture", description: "Protected sessions, encrypted data, and access controls for teams." },
            { title: "Export reports", description: "Download insight summaries and share emotion heatmaps with your team." },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 hover:border-cyan-400/40">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-slate-400">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}