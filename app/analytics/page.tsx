"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useEffect, useState } from "react"

const weeklyMood = [
  { day: "Mon", score: 74 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 65 },
  { day: "Thu", score: 78 },
  { day: "Fri", score: 88 },
  { day: "Sat", score: 92 },
  { day: "Sun", score: 81 },
]

const distribution = [
  { name: "Happy", value: 38 },
  { name: "Sad", value: 18 },
  { name: "Angry", value: 9 },
  { name: "Neutral", value: 20 },
  { name: "Surprise", value: 15 },
]

const COLORS = ["#22d3ee", "#a855f7", "#fb7185", "#94a3b8", "#38bdf8"]

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Analytics</p>
          <h1 className="mt-3 text-4xl font-semibold">Emotion metrics & reports</h1>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Weekly mood score</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Stability over time</h2>
              </div>
            </div>
            <div className="h-96">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyMood} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="emotionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.75} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} />
                  <YAxis tick={{ fill: "#94a3b8" }} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "#0f172a" }} />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="url(#emotionGradient)" strokeWidth={3} />
                </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Emotion distribution</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Session breakdown</h2>
            <div className="mt-8 h-80">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>
                    {distribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0f172a" }} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ color: "#94a3b8" }} />
                </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Mood shifts</p>
            <p className="mt-4 text-4xl font-semibold text-white">+12%</p>
            <p className="mt-2 text-slate-400">Improved response after the last campaign.</p>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Accuracy</p>
            <p className="mt-4 text-4xl font-semibold text-cyan-300">93.5%</p>
            <p className="mt-2 text-slate-400">Confidence across the last 100 detections.</p>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Top emotion</p>
            <p className="mt-4 text-4xl font-semibold text-purple-300">Happy</p>
            <p className="mt-2 text-slate-400">Most frequent result from recent sessions.</p>
          </Card>
        </div>
      </div>
    </main>
  )
}