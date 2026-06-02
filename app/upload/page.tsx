"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const emotionLabels = ["Happy", "Neutral", "Surprise", "Sad", "Angry", "Fear", "Disgust"]

type EmotionAnalysis = {
  emotion: string
  score: number
}

type FaceResult = {
  id: string
  label: string
  analysis: EmotionAnalysis[]
}

function createSeedFromFile(file: File) {
  const source = `${file.name}:${file.type}:${file.size}:${file.lastModified}`
  let hash = 0
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) % 2147483647
  }
  return hash || 1
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function generateEmotionAnalysis(seed: number) {
  const random = seededRandom(seed)
  const scores = emotionLabels.map(() => 0.02 + random() * 0.18)
  const topIndex = Math.floor(random() * emotionLabels.length)
  scores[topIndex] += 0.4 + random() * 0.25

  const total = scores.reduce((sum, score) => sum + score, 0)
  return emotionLabels
    .map((label, index) => ({ emotion: label, score: Number((scores[index] / total).toFixed(2)) }))
    .sort((a, b) => b.score - a.score)
}

function createFaceResults(file: File) {
  const fileSeed = createSeedFromFile(file)
  const faceCount = 1 + (fileSeed % 3)
  return Array.from({ length: faceCount }, (_, index) => ({
    id: `face-${index + 1}`,
    label: `Face ${index + 1}`,
    analysis: generateEmotionAnalysis(fileSeed + index * 97),
  }))
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [faceResults, setFaceResults] = useState<FaceResult[]>([])
  const [status, setStatus] = useState("Drag or select an image to analyze")
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const faceApiRef = useRef<any | null>(null)

  const handleFile = (selected: File) => {
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setStatus("Analyzing image...")
    ;(async () => {
      try {
        if (faceApiRef.current && modelsLoaded) {
          const faceapi = faceApiRef.current
          const imageUrl = URL.createObjectURL(selected)
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const i = new Image()
            i.crossOrigin = "anonymous"
            i.onload = () => resolve(i)
            i.onerror = (e) => reject(e)
            i.src = imageUrl
          })

          const useSSD = faceapi.nets.ssdMobilenetv1?.isLoaded
          const detectionOptions = useSSD
            ? new faceapi.SsdMobilenetv1Options({ minConfidence: 0.6 })
            : new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 })

          const detections = useSSD
            ? await faceapi.detectAllFaces(img, detectionOptions).withFaceLandmarks().withFaceExpressions()
            : await faceapi.detectAllFaces(img, detectionOptions).withFaceLandmarks().withFaceExpressions()

          if (!detections || detections.length === 0) {
            setFaceResults([])
            setStatus("No faces detected")
            URL.revokeObjectURL(imageUrl)
            return
          }

          const results: FaceResult[] = detections.map((d: any, idx: number) => {
            const expr = d.expressions || {}
            const analysis: EmotionAnalysis[] = Object.entries(expr)
              .map(([emotion, score]) => ({ emotion: capitalize(emotion), score: Number(score as number) }))
              .sort((a, b) => b.score - a.score)

            if (analysis[0] && analysis[0].score < 0.35) {
              analysis[0].emotion = "Uncertain"
            }

            return {
              id: `face-${idx + 1}`,
              label: `Face ${idx + 1}`,
              analysis,
            }
          })

          setFaceResults(results)
          setStatus("Analysis complete")
          URL.revokeObjectURL(imageUrl)
          return
        }

        setTimeout(() => {
          setFaceResults(createFaceResults(selected))
          setStatus("Analysis complete (mock)")
        }, 900)
      } catch (err) {
        console.error(err)
        setFaceResults(createFaceResults(selected))
        setStatus("Analysis complete (mock)")
      }
    })()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const selectedFile = event.dataTransfer.files?.[0]
    if (selectedFile) handleFile(selectedFile)
  }

  const downloadReport = () => {
    const payload = {
      name: file?.name || "analysis-report",
      analyzedAt: new Date().toISOString(),
      faces: faceResults,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "emotionai-report.json"
    link.click()
  }

  const displayImage = useMemo(() => preview || "", [preview])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const faceapi = await import("face-api.js")
        const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights"
        try {
          await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
          console.info("Loaded SSD Mobilenet weights from CDN")
        } catch (err) {
          console.warn("SSD Mobilenet failed, falling back to Tiny Face Detector", err)
          await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        }
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        if (!mounted) return
        faceApiRef.current = faceapi
        setModelsLoaded(true)
        setStatus("Model loaded: real face-api.js expression model")
        console.info("face-api models loaded from CDN")
      } catch (err) {
        console.warn("Unable to load face-api models — falling back to mock analysis", err)
        setModelsLoaded(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Upload detection</p>
            <h1 className="mt-3 text-4xl font-semibold">Analyze emotions from photos</h1>
            <p className="mt-3 text-slate-400">Drop a JPG, PNG, or WEBP image to run a fast emotion scan and review confidence insights.</p>
          </div>
          <Button className="rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-500">Upload image</Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              className="rounded-3xl border border-dashed border-white/20 bg-black/20 p-10 text-center transition hover:border-cyan-400 hover:bg-white/5"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Drag & drop</p>
              <p className="mt-4 text-2xl font-semibold text-white">Drop your image here</p>
              <p className="mt-2 text-slate-500">Supported: JPG, PNG, WEBP</p>
            </div>

            {displayImage ? (
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
                <img src={displayImage} alt="Preview" className="h-[360px] w-full object-cover" />
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                id="image-upload"
                onChange={(event) => {
                  const selected = event.target.files?.[0]
                  if (selected) handleFile(selected)
                }}
              />
              <label htmlFor="image-upload" className="cursor-pointer rounded-full border border-cyan-500/40 bg-slate-800 px-5 py-3 text-center text-sm font-semibold text-cyan-200 transition hover:bg-slate-700">
                Select image from device
              </label>
              <Button onClick={downloadReport} variant="outline" className="rounded-full border-cyan-500/40 text-cyan-200 hover:bg-slate-800">Download report</Button>
            </div>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Analysis summary</p>
            <p className="mt-3 text-slate-400">{status}</p>
            <div className="mt-6 space-y-6">
              {faceResults.length === 0 ? (
                <div className="rounded-3xl bg-white/5 p-6 text-center text-slate-400">Upload an image to see face-by-face emotion insights.</div>
              ) : (
                faceResults.map((face) => (
                  <div key={face.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{face.label}</p>
                        <p className="text-lg font-semibold text-white">Top emotion: {face.analysis[0]?.emotion}</p>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Confidence {Math.round((face.analysis[0]?.score ?? 0) * 100)}%</span>
                    </div>
                    <div className="space-y-3">
                      {face.analysis.map((item) => (
                        <div key={item.emotion} className="rounded-3xl bg-white/5 p-3">
                          <div className="flex items-center justify-between text-white">
                            <span>{item.emotion}</span>
                            <span>{Math.round(item.score * 100)}%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10">
                            <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${item.score * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}