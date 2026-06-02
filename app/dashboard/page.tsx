"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts"
import { useEffect, useState } from "react"

const emotionTrend = [
  { name: "Mon", happy: 32, sad: 18, angry: 8 },
  { name: "Tue", happy: 44, sad: 22, angry: 15 },
  { name: "Wed", happy: 38, sad: 16, angry: 12 },
  { name: "Thu", happy: 51, sad: 19, angry: 18 },
  { name: "Fri", happy: 57, sad: 14, angry: 10 },
  { name: "Sat", happy: 49, sad: 21, angry: 9 },
  { name: "Sun", happy: 61, sad: 23, angry: 12 },
]

const emotionShare = [
  { name: "Happy", value: 46, color: "#22d3ee" },
  { name: "Sad", value: 18, color: "#a855f7" },
  { name: "Angry", value: 12, color: "#38bdf8" },
  { name: "Neutral", value: 14, color: "#cbd5e1" },
  { name: "Surprise", value: 10, color: "#f472b6" },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold">Emotion intelligence overview</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Your AI reports and session analytics are compiled in one secure workspace.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-slate-900/80 p-6 border border-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Detections</p>
            <p className="mt-4 text-4xl font-semibold text-white">1,248</p>
            <p className="mt-2 text-slate-400">Recent sessions generated in the last 30 days.</p>
          </Card>
          <Card className="bg-slate-900/80 p-6 border border-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Average confidence</p>
            <p className="mt-4 text-4xl font-semibold text-cyan-300">92.4%</p>
            <p className="mt-2 text-slate-400">Accuracy score for active detection pipelines.</p>
          </Card>
          <Card className="bg-slate-900/80 p-6 border border-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Active users</p>
            <p className="mt-4 text-4xl font-semibold text-purple-300">1,024</p>
            <p className="mt-2 text-slate-400">Logged in users across your organization.</p>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card className="bg-slate-900/80 p-6 border border-white/10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Weekly emotion trend</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Mood over time</h2>
              </div>
            </div>
            <div className="h-80">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emotionTrend} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} />
                  <YAxis tick={{ fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ background: "#0f172a" }} />
                  <Line type="monotone" dataKey="happy" stroke="#22d3ee" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="sad" stroke="#a855f7" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="angry" stroke="#f97316" strokeWidth={3} dot={false} />
                </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card className="bg-slate-900/80 p-6 border border-white/10">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Emotion share</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Detection distribution</h2>
            </div>
            <div className="h-80">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={emotionShare} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    {emotionShare.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" wrapperStyle={{ color: "#94a3b8" }} />
                </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}