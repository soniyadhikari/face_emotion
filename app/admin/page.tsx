"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

const adminData = [
  { name: "Users", value: 1204 },
  { name: "Sessions", value: 1872 },
  { name: "Alerts", value: 84 },
  { name: "Reports", value: 38 },
]

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin</p>
          <h1 className="mt-4 text-4xl font-semibold">Enterprise control center</h1>
          <p className="mt-3 text-slate-400">Monitor system health, active teams, and recent activity from the admin dashboard.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Live users</p>
            <p className="mt-4 text-4xl font-semibold text-white">324</p>
            <p className="mt-2 text-slate-400">Currently active on the EmotionAI platform.</p>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Uptime</p>
            <p className="mt-4 text-4xl font-semibold text-cyan-300">99.98%</p>
            <p className="mt-2 text-slate-400">Stable performance across all services.</p>
          </Card>
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Security alerts</p>
            <p className="mt-4 text-4xl font-semibold text-purple-300">2</p>
            <p className="mt-2 text-slate-400">Pending actions needing review.</p>
          </Card>
        </div>

        <Card className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Team performance</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Growth analysis</h2>
            </div>
          </div>
          <div className="h-96">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} />
                <YAxis tick={{ fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ background: "#0f172a" }} />
                <Bar dataKey="value" fill="#22d3ee" radius={[10, 10, 0, 0]} />
              </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </main>
  )
}