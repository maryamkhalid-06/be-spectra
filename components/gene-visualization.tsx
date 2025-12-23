"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Network } from "lucide-react"

interface Gene {
  name: string
  isCancer: boolean
  centrality: number
  confidence: number
}

export default function Visualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [mode, setMode] = useState<"neural" | "genes">("neural") // Default to Neural Network visualization

  const genes: Gene[] = [
    { name: "TP53", isCancer: true, centrality: 0.892, confidence: 0.94 },
    { name: "BRCA1", isCancer: true, centrality: 0.856, confidence: 0.91 },
    { name: "EGFR", isCancer: true, centrality: 0.834, confidence: 0.88 },
    { name: "MYC", isCancer: true, centrality: 0.812, confidence: 0.86 },
    { name: "RB1", isCancer: true, centrality: 0.798, confidence: 0.84 },
    { name: "GAPDH", isCancer: false, centrality: 0.456, confidence: 0.12 },
    { name: "ACTB", isCancer: false, centrality: 0.423, confidence: 0.08 },
    { name: "TUBB", isCancer: false, centrality: 0.401, confidence: 0.06 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 0.02) % 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "rgb(15, 23, 42)"
    ctx.fillRect(0, 0, width, height)

    if (mode === "genes") {
      drawGenes(ctx, width, height)
    } else {
      drawNeural(ctx, width, height)
    }
  }, [animationProgress, mode])

  const drawGenes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw gene nodes with animation
    genes.forEach((gene, index) => {
      const angle = (index / genes.length) * Math.PI * 2 + animationProgress * 0.1
      const radius = 80 + Math.sin(animationProgress * Math.PI * 2 + index) * 10
      const x = width / 2 + Math.cos(angle) * radius
      const y = height / 2 + Math.sin(angle) * radius

      // Node color: red for cancer genes, blue for normal
      const color = gene.isCancer ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)"
      const glowColor = gene.isCancer ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"

      // Draw glow
      ctx.fillStyle = glowColor
      ctx.beginPath()
      ctx.arc(x, y, 20 + Math.sin(animationProgress * Math.PI * 2) * 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw node
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Draw label
      ctx.fillStyle = "rgb(226, 232, 240)"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(gene.name, x, y - 22)

      // Draw confidence percentage
      ctx.fillStyle = "rgb(148, 163, 184)"
      ctx.font = "10px sans-serif"
      ctx.fillText(`${(gene.confidence * 100).toFixed(0)}%`, x, y + 22)
    })

    // Draw connecting lines
    ctx.strokeStyle = "rgba(100, 116, 139, 0.3)"
    ctx.lineWidth = 1
    genes.forEach((gene1, i) => {
      genes.forEach((gene2, j) => {
        if (i < j && gene1.isCancer && gene2.isCancer) {
          const angle1 = (i / genes.length) * Math.PI * 2 + animationProgress * 0.1
          const angle2 = (j / genes.length) * Math.PI * 2 + animationProgress * 0.1
          const radius1 = 80
          const radius2 = 80
          const x1 = width / 2 + Math.cos(angle1) * radius1
          const y1 = height / 2 + Math.sin(angle1) * radius1
          const x2 = width / 2 + Math.cos(angle2) * radius2
          const y2 = height / 2 + Math.sin(angle2) * radius2

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      })
    })
  }

  const drawNeural = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Neural Network Visualization
    const layers = [4, 6, 6, 4]
    const layerSpacing = width / (layers.length + 1)

    // Draw connections
    layers.forEach((nodes, layerIndex) => {
      if (layerIndex === layers.length - 1) return

      const currentX = (layerIndex + 1) * layerSpacing
      const nextX = (layerIndex + 2) * layerSpacing
      const nextNodes = layers[layerIndex + 1]

      const currentNodeSpacing = height / (nodes + 1)
      const nextNodeSpacing = height / (nextNodes + 1)

      for (let i = 0; i < nodes; i++) {
        for (let j = 0; j < nextNodes; j++) {
          const y1 = (i + 1) * currentNodeSpacing
          const y2 = (j + 1) * nextNodeSpacing

          // Animate pulses traveling
          const offset = (layerIndex * 13 + i * 7 + j * 3)
          const pulsePos = (animationProgress * 3 + offset / 20) % 1

          ctx.strokeStyle = `rgba(59, 130, 246, 0.15)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(currentX, y1)
          ctx.lineTo(nextX, y2)
          ctx.stroke()

          // Draw pulses
          const pulseX = currentX + (nextX - currentX) * pulsePos
          const pulseY = y1 + (y2 - y1) * pulsePos

          ctx.fillStyle = `rgba(6, 182, 212, ${1 - Math.abs(0.5 - pulsePos)})`
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    })

    // Draw nodes
    layers.forEach((nodes, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing
      const nodeSpacing = height / (nodes + 1)

      for (let i = 0; i < nodes; i++) {
        const y = (i + 1) * nodeSpacing

        // Node glow
        const pulse = Math.sin(animationProgress * 5 + i + layerIndex) * 0.5 + 0.5
        const size = 6 + pulse * 2

        ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
        ctx.beginPath()
        ctx.arc(x, y, size + 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = layerIndex === 0 ? "#60a5fa" : layerIndex === layers.length - 1 ? "#34d399" : "#8b5cf6"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }

  return (
    <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-xl text-white">Network Architecture Visualization</CardTitle>
          <Tabs value={mode} onValueChange={(v: string) => setMode(v as "neural" | "genes")} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
              <TabsTrigger value="neural" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Brain className="w-4 h-4 mr-2" />
                Neural Net
              </TabsTrigger>
              <TabsTrigger value="genes" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Network className="w-4 h-4 mr-2" />
                Gene Graph
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-80 rounded-xl border border-white/10 bg-black/40" />

        {mode === "genes" && (
          <div className="mt-6 grid grid-cols-2 gap-3 animate-slide-up">
            {genes.slice(0, 4).map((gene) => (
              <div key={gene.name} className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-white">{gene.name}</p>
                    <p className="text-xs text-white/50">Centrality: {(gene.centrality * 100).toFixed(1)}%</p>
                  </div>
                  <Badge className={gene.isCancer ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}>
                    {(gene.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === "neural" && (
          <div className="mt-6 grid grid-cols-3 gap-4 animate-slide-up">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-white/50 mb-1">Input Layer</div>
              <div className="text-sm font-semibold text-blue-400">Gene Expression Features</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-white/50 mb-1">Hidden Layers</div>
              <div className="text-sm font-semibold text-purple-400">GNN Attention Blocks</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-white/50 mb-1">Output Layer</div>
              <div className="text-sm font-semibold text-emerald-400">Risk Stratification</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
