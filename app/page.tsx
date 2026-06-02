"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-12 px-4 md:pt-16 md:pb-16">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            EmotionAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Detect human emotions in real-time with advanced AI technology. Analyze faces, voices, and text for comprehensive emotion insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                Get Started
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 rounded-full">
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center hover:bg-white/20 transition">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Real-time Detection</h3>
                <p className="text-slate-300">Analyze emotions from webcam feed with instant results and confidence scores.</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center hover:bg-white/20 transition">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Image Analysis</h3>
                <p className="text-slate-300">Upload photos for emotion detection with detailed analysis and export options.</p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center hover:bg-white/20 transition">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Analytics Dashboard</h3>
                <p className="text-slate-300">Track emotion trends, view charts, and get insights from your detection history.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">1</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Upload or Capture</h3>
              <p className="text-slate-300">Use your webcam or upload an image to start emotion detection.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">2</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">AI Analysis</h3>
              <p className="text-slate-300">Our advanced AI analyzes facial expressions and provides emotion predictions.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">3</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Get Insights</h3>
              <p className="text-slate-300">View results, confidence scores, and track your emotion history.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center hover:bg-white/20 transition">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Free</h3>
                <p className="text-3xl font-bold text-white mb-4">$0</p>
                <ul className="text-slate-300 mb-6 space-y-2">
                  <li>10 detections/month</li>
                  <li>Basic analytics</li>
                  <li>Webcam detection</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur border-purple-400 p-6 text-center hover:bg-white/20 transition relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Popular</div>
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">Pro</h3>
                <p className="text-3xl font-bold text-white mb-4">$9.99/month</p>
                <ul className="text-slate-300 mb-6 space-y-2">
                  <li>Unlimited detections</li>
                  <li>Advanced analytics</li>
                  <li>Voice analysis</li>
                  <li>PDF reports</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Pro Trial</Button>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center hover:bg-white/20 transition">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Enterprise</h3>
                <p className="text-3xl font-bold text-white mb-4">Custom</p>
                <ul className="text-slate-300 mb-6 space-y-2">
                  <li>All Pro features</li>
                  <li>Team collaboration</li>
                  <li>API access</li>
                  <li>Custom integrations</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Contact Sales</Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-slate-400">
          <p>&copy; 2026 EmotionAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}