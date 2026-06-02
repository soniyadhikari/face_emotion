"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const emotionOptions = [
  { label: "Happy", color: "#22d3ee" },
  { label: "Sad", color: "#a855f7" },
  { label: "Angry", color: "#fb7185" },
  { label: "Neutral", color: "#94a3b8" },
  { label: "Surprise", color: "#38bdf8" },
]

type EmotionPrediction = {
  label: string
  value: number
  color: string
}

type DetectedFace = {
  id: string
  label: string
  predictions: EmotionPrediction[]
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function createLiveEmotionState(seed: number) {
  const random = seededRandom(seed)
  const values = emotionOptions.map(() => 0.02 + random() * 0.18)
  const total = values.reduce((sum, v) => sum + v, 0)
  return emotionOptions.map((item, index) => ({
    ...item,
    value: Number((values[index] / total).toFixed(2)),
  }))
}

function createLiveFaces(seed: number) {
  const faceCount = 1 + (seed % 3)
  return Array.from({ length: faceCount }, (_, index) => ({
    id: `face-${index + 1}`,
    label: `Face ${index + 1}`,
    predictions: createLiveEmotionState(seed + index * 53),
  }))
}

function normalizePredictions(predictions: EmotionPrediction[]) {
  const total = predictions.reduce((sum, item) => sum + item.value, 0)
  return predictions.map((item) => ({
    ...item,
    value: Number((item.value / total).toFixed(2)),
  }))
}

export default function WebcamPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [faceResults, setFaceResults] = useState<DetectedFace[]>([])

  useEffect(() => {
      let rafId: number | null = null
      let detectorInterval: ReturnType<typeof setInterval> | null = null
      let stream: MediaStream | null = null
      let mounted = true

      const startDetection = async () => {
        try {
          // Helper: try getUserMedia with a timeout and fallback options.
          const getUserMediaWithTimeout = async (constraints: MediaStreamConstraints, timeoutMs = 8000) => {
            return await new Promise<MediaStream>(async (resolve, reject) => {
              let timer: number | undefined
              try {
                // Create a timeout that rejects the promise
                timer = window.setTimeout(() => reject(new Error("getUserMedia timeout")), timeoutMs)
                const s = await navigator.mediaDevices.getUserMedia(constraints)
                if (timer) clearTimeout(timer)
                resolve(s)
              } catch (err) {
                if (timer) clearTimeout(timer)
                reject(err)
              }
            })
          }

          try {
            stream = await getUserMediaWithTimeout({ video: { width: 640, height: 480, facingMode: "user" } }, 8000)
          } catch (err) {
            console.warn("Primary camera constraints failed, retrying with relaxed constraints", err)
            // Retry with more relaxed constraints (some devices fail with strict sizes)
            stream = await getUserMediaWithTimeout({ video: true }, 8000)
          }

          if (!videoRef.current) return
          videoRef.current.srcObject = stream

          const faceapi = await import("face-api.js")
          const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights"
          // Try heavier SSD for accuracy first, fallback to tiny if not available
          try {
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
            console.info("Loaded SSD Mobilenet model for detection")
          } catch (e) {
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
            console.info("Loaded Tiny Face Detector model for detection")
          }
          await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
          await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)

          const canvas = document.createElement("canvas")
          canvas.style.position = "absolute"
          canvas.style.top = "0"
          canvas.style.left = "0"
          canvas.style.pointerEvents = "none"
          const container = videoRef.current.parentElement
          if (container) container.appendChild(canvas)

          const ctx = canvas.getContext("2d")

          // smoothing state
          const tracksPerFace: Record<string, { scores: number[][]; box: any }> = {}

          const matchFace = (box: any) => {
            const cx = box.x + box.width / 2
            const cy = box.y + box.height / 2
            let bestId: string | null = null
            let bestDist = Infinity
            for (const id of Object.keys(tracksPerFace)) {
              const b = tracksPerFace[id].box
              const bx = b.x + b.width / 2
              const by = b.y + b.height / 2
              const dx = bx - cx
              const dy = by - cy
              const d = Math.sqrt(dx * dx + dy * dy)
              if (d < bestDist && d < Math.max(box.width, box.height) * 0.6) {
                bestDist = d
                bestId = id
              }
            }
            return bestId
          }

          const getTopEmotionFromScores = (scoresArr: number[][]) => {
            if (scoresArr.length === 0) return { emotion: "neutral", confidence: 0 }
            const avg = scoresArr[0].map((_, i) => scoresArr.reduce((s, r) => s + r[i], 0) / scoresArr.length)
            const idx = avg.indexOf(Math.max(...avg))
            const labels = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"]
            return { emotion: labels[idx] || labels[0], confidence: avg[idx] }
          }

          const resizeCanvas = () => {
            if (!videoRef.current || !canvas) return
            canvas.width = videoRef.current.clientWidth
            canvas.height = videoRef.current.clientHeight
          }

          const detect = async () => {
            if (!videoRef.current || !ctx) return
            resizeCanvas()
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            let detections: any[] = []
            try {
              const detectionOptions = (faceapi.nets as any).ssdMobilenetv1?.isLoaded
                ? new faceapi.SsdMobilenetv1Options({ minConfidence: 0.6 })
                : new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 })

              detections = await faceapi
                .detectAllFaces(videoRef.current, detectionOptions)
                .withFaceLandmarks()
                .withFaceExpressions()
            } catch (e) {
              console.error("detection error", e)
            }

            const mapped = detections.map((d) => {
              const box = d.detection.box
              const expr = d.expressions || {}
              // map to ordered array [neutral,happy,sad,angry,fearful,disgusted,surprised]
              const ordered = [expr.neutral ?? 0, expr.happy ?? 0, expr.sad ?? 0, expr.angry ?? 0, expr.fearful ?? 0, expr.disgusted ?? 0, expr.surprised ?? 0]
              return { box, ordered }
            })

            // update tracks and compute smoothed predictions
            const nextFaces: DetectedFace[] = []
            mapped.forEach((m, idx) => {
              const matched = matchFace(m.box)
              let id = matched
              if (!id) {
                id = `face-${Date.now()}-${idx}`
                tracksPerFace[id] = { scores: [], box: m.box }
              }
              tracksPerFace[id].scores.push(m.ordered)
              tracksPerFace[id].box = m.box
              // keep only last 6 frames
              if (tracksPerFace[id].scores.length > 6) tracksPerFace[id].scores.shift()

              const top = getTopEmotionFromScores(tracksPerFace[id].scores)
              const labelMap: Record<string, string> = { neutral: "Neutral", happy: "Happy", sad: "Sad", angry: "Angry", fearful: "Fear", disgusted: "Disgust", surprised: "Surprise" }

              nextFaces.push({
                id,
                label: `Face ${nextFaces.length + 1}`,
                predictions: [
                  { label: labelMap[top.emotion] || "Neutral", value: Number(top.confidence.toFixed(2)), color: "#22d3ee" },
                ],
              })

              // draw box and label
              ctx.strokeStyle = "#22d3ee"
              ctx.lineWidth = 2
              ctx.strokeRect(m.box.x, m.box.y, m.box.width, m.box.height)
              ctx.fillStyle = "#00000088"
              ctx.fillRect(m.box.x, m.box.y - 22, Math.max(80, ctx.measureText(labelMap[top.emotion] || "").width + 16), 22)
              ctx.fillStyle = "#fff"
              ctx.font = "14px sans-serif"
              ctx.fillText(`${labelMap[top.emotion] || "Neutral"} ${Math.round(top.confidence * 100)}%`, m.box.x + 6, m.box.y - 6)
            })

            setFaceResults(nextFaces)
            if (mounted) rafId = requestAnimationFrame(detect)
          }

          // start loop after video plays
          const onPlay = () => {
            if (detectorInterval) clearInterval(detectorInterval)
            detectorInterval = setInterval(() => {
              if (rafId == null) detect()
            }, 200)
          }

          videoRef.current.addEventListener("playing", onPlay)
          // trigger initial detect
          detect()
        } catch (err) {
          console.error(err)
          setError("Unable to access camera or models. Check permissions and model files in /public/models.")
          setIsRunning(false)
        }
      }

      if (isRunning) startDetection()

      return () => {
        mounted = false
        if (rafId) cancelAnimationFrame(rafId)
        if (detectorInterval) clearInterval(detectorInterval)
        if (videoRef.current?.srcObject) {
          const s = videoRef.current.srcObject as MediaStream
          s.getTracks().forEach((t) => t.stop())
          videoRef.current.srcObject = null
        }
      }
    }, [isRunning])

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Webcam detection</p>
                <h1 className="mt-3 text-3xl font-semibold">Live emotion analysis</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setIsRunning(true)} className="rounded-full bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-500">Start camera</Button>
                <Button onClick={() => setIsRunning(false)} variant="outline" className="rounded-full px-4 py-2 text-sm text-cyan-300 border-cyan-500/40 hover:bg-slate-800">Stop</Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/80">
              <video ref={videoRef} className="h-[420px] w-full object-cover" autoPlay muted playsInline />
            </div>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <p className="text-slate-400">Your live camera feed is analyzed in real-time for emotion patterns and confidence levels.</p>
            </div>
          </section>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Current prediction</p>
              <div className="mt-6 space-y-5">
                {faceResults.map((face) => (
                  <div key={face.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="mb-4 flex items-center justify-between text-white">
                      <span className="font-semibold">{face.label}</span>
                      <span className="text-sm text-slate-400">Live update</span>
                    </div>
                    <div className="space-y-3">
                      {face.predictions.map((item) => (
                        <div key={item.label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-slate-200">
                            <span>{item.label}</span>
                            <span>{Math.round(item.value * 100)}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <div className="h-2 rounded-full" style={{ width: `${Math.min(100, item.value * 100)}%`, backgroundColor: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Instructions</p>
              <ul className="mt-4 space-y-3 text-slate-400">
                <li>1. Allow webcam access when prompted.</li>
                <li>2. Position your face in clear lighting.</li>
                <li>3. Watch live results update automatically.</li>
              </ul>
            </Card>
          </aside>
        </div>
        {error ? <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div> : null}
      </div>
    </main>
  )
}