"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileUp, Download } from "lucide-react"
import { downloadSamplePPI, downloadSampleExpression, loadSampleData } from "@/utils/sample-data"

interface DataUploadFormProps {
  onSubmit: (file: File) => void
  loading: boolean
}

export default function DataUploadForm({ onSubmit, loading }: DataUploadFormProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSubmit(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSubmit(e.target.files[0])
    }
  }

  const handleLoadSampleData = async () => {
    const file = await loadSampleData("ppi")
    onSubmit(file)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="sm" onClick={downloadSamplePPI} className="gap-2 text-xs h-9 bg-transparent">
          <Download className="w-3 h-3" />
          Download PPI Sample
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSampleExpression}
          className="gap-2 text-xs h-9 bg-transparent"
        >
          <Download className="w-3 h-3" />
          Download Expression Sample
        </Button>
      </div>

      <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Tip:</strong> Download sample data above to test the platform, then upload to see live analysis
          results!
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive ? "border-accent bg-accent/10 scale-[1.02]" : "border-border hover:border-accent/50"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv,.txt"
          onChange={handleChange}
          className="hidden"
          id="file-input"
          disabled={loading}
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-accent/20 rounded-lg w-fit animate-pulse">
              <Upload className="w-6 h-6 text-accent" />
            </div>
            <p className="font-semibold text-sm">Drag and drop your file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <p className="text-xs text-muted-foreground mt-2">Supports CSV and TXT formats</p>
          </div>
        </label>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Analysis Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border bg-card" />
            <span className="text-sm">Network Analysis (Spectral Centrality)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border bg-card" />
            <span className="text-sm">Cancer Driver Prediction (GAT)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border bg-card" />
            <span className="text-sm">Pathway Enrichment Analysis (KEGG/GO)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input type="checkbox" className="w-4 h-4 rounded border-border bg-card" />
            <span className="text-sm">Survival Prediction (Cox Regression)</span>
          </label>
        </div>
      </div>

      <Button size="lg" className="w-full gap-2 bg-accent hover:bg-accent/90" disabled={loading}>
        <FileUp className="w-4 h-4" />
        {loading ? "Analyzing..." : "Start Analysis"}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Analysis typically completes in 30-60 seconds for networks with 10,000+ nodes.
        <br />
        Results include network statistics, driver gene predictions, and survival metrics.
      </p>
    </div>
  )
}
