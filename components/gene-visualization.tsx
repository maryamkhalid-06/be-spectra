"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Gene {
  name: string
  isCancer: boolean
  centrality: number
  confidence: number
}

export default function GeneVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

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
  }, [animationProgress])

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Top Cancer Driver Genes - Network Visualization</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">Cancer Driver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Normal Gene</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-80 rounded-lg" style={{ background: "rgb(15, 23, 42)" }} />
        <div className="mt-6 grid grid-cols-2 gap-3">
          {genes.slice(0, 5).map((gene) => (
            <div key={gene.name} className="p-3 rounded bg-card/50 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{gene.name}</p>
                  <p className="text-xs text-muted-foreground">Centrality: {(gene.centrality * 100).toFixed(1)}%</p>
                </div>
                <Badge className={gene.isCancer ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}>
                  {(gene.confidence * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
