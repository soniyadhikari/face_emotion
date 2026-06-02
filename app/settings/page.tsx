import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Settings</p>
          <h1 className="mt-3 text-4xl font-semibold">Account and workspace controls</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Jane Doe" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="workspace">Workspace name</Label>
                <Input id="workspace" placeholder="EmotionAI Lab" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@emotionai.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="about">Team notes</Label>
                <Textarea id="about" rows={4} placeholder="Add a brief note about your team's goals." className="mt-2" />
              </div>
              <Button className="w-full rounded-full bg-purple-600 px-5 py-3 text-white hover:bg-purple-500">Save settings</Button>
            </div>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Notifications</p>
                <p className="mt-2 text-slate-400">Manage alerts for live detections and admin updates.</p>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div>
                  <p className="font-semibold text-white">Realtime alerts</p>
                  <p className="text-sm text-slate-400">Receive notifications when emotion patterns change.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div>
                  <p className="font-semibold text-white">Dark mode</p>
                  <p className="text-sm text-slate-400">Use the premium dark UI for workspace monitoring.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-400">
                Tip: Set up secure API keys and session limits before sharing your workspace with teams.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}