"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileUp, Download, CheckCircle, X } from "lucide-react"
import { downloadSamplePPI, downloadSampleExpression, loadSampleData } from "@/utils/sample-data"

export interface AnalysisOptions {
  networkAnalysis: boolean
  cancerDriver: boolean
  pathwayEnrichment: boolean
  survivalPrediction: boolean
}

interface DataUploadFormProps {
  onSubmit: (file: File, options: AnalysisOptions) => void
  loading: boolean
}

export default function DataUploadForm({ onSubmit, loading }: DataUploadFormProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    networkAnalysis: true,
    cancerDriver: true,
    pathwayEnrichment: true,
    survivalPrediction: false,
  })

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
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleLoadSampleData = async () => {
    const file = await loadSampleData("ppi")
    setUploadedFile(file)
  }

  const handleStartAnalysis = () => {
    if (uploadedFile) {
      onSubmit(uploadedFile, analysisOptions)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleOptionChange = (option: keyof AnalysisOptions) => {
    setAnalysisOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const hasSelectedOption = Object.values(analysisOptions).some(v => v)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" onClick={downloadSamplePPI} className="gap-1.5 text-[10px] sm:text-xs h-auto min-h-[36px] py-2 px-2 bg-transparent whitespace-normal text-center justify-center leading-tight">
          <Download className="w-3 h-3 flex-shrink-0" />
          <span>PPI Sample</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSampleExpression}
          className="gap-1.5 text-[10px] sm:text-xs h-auto min-h-[36px] py-2 px-2 bg-transparent whitespace-normal text-center justify-center leading-tight"
        >
          <Download className="w-3 h-3 flex-shrink-0" />
          <span>Expression Sample</span>
        </Button>
      </div>

      <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Tip:</strong> Download sample data above to test the platform, then upload to see live analysis
          results!
        </p>
      </div>

      {/* File Upload Area or Success State */}
      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all ${dragActive ? "border-accent bg-accent/10 scale-[1.02]" : "border-border hover:border-accent/50"
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
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 sm:p-4 bg-accent/20 rounded-xl w-fit animate-pulse">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <p className="font-semibold text-sm sm:text-base">Drag and drop your file here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports CSV and TXT formats</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative border-2 border-green-500/50 bg-green-500/10 rounded-lg p-6 text-center">
          <button
            onClick={handleRemoveFile}
            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-white/60 hover:text-white" />
          </button>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 sm:p-4 bg-green-500/20 rounded-xl w-fit">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="font-semibold text-green-400">Data Uploaded Successfully!</p>
            <p className="text-xs text-muted-foreground">{uploadedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              ({(uploadedFile.size / 1024).toFixed(1)} KB)
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Analysis Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input
              type="checkbox"
              checked={analysisOptions.networkAnalysis}
              onChange={() => handleOptionChange('networkAnalysis')}
              className="w-4 h-4 rounded border-border bg-card"
            />
            <span className="text-sm">Network Analysis (Spectral Centrality)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input
              type="checkbox"
              checked={analysisOptions.cancerDriver}
              onChange={() => handleOptionChange('cancerDriver')}
              className="w-4 h-4 rounded border-border bg-card"
            />
            <span className="text-sm">Cancer Driver Prediction (GAT)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input
              type="checkbox"
              checked={analysisOptions.pathwayEnrichment}
              onChange={() => handleOptionChange('pathwayEnrichment')}
              className="w-4 h-4 rounded border-border bg-card"
            />
            <span className="text-sm">Pathway Enrichment Analysis (KEGG/GO)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-card/50 p-2 rounded transition">
            <input
              type="checkbox"
              checked={analysisOptions.survivalPrediction}
              onChange={() => handleOptionChange('survivalPrediction')}
              className="w-4 h-4 rounded border-border bg-card"
            />
            <span className="text-sm">Survival Prediction (Cox Regression)</span>
          </label>
        </div>
      </div>

      <Button
        size="lg"
        className={`w-full gap-2 ${uploadedFile && hasSelectedOption ? 'bg-accent hover:bg-accent/90' : 'bg-gray-600 cursor-not-allowed'}`}
        disabled={loading || !uploadedFile || !hasSelectedOption}
        onClick={handleStartAnalysis}
      >
        <FileUp className="w-4 h-4" />
        {loading ? "Analyzing..." : !uploadedFile ? "Upload Data First" : !hasSelectedOption ? "Select Analysis Option" : "Start Analysis"}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Analysis typically completes in 30-60 seconds for networks with 10,000+ nodes.
        <br />
        Results include network statistics, driver gene predictions, and survival metrics.
      </p>
    </div>
  )
}
