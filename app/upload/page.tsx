"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import DataUploadForm from "@/components/data-upload-form"
import AnalysisResults from "@/components/analysis-results"
import QRCodeDisplay from "@/components/qr-code-display"
import ModelInfoModal from "@/components/model-info-modal"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, Network, BarChart3 } from "lucide-react"

export default function UploadPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [modelInfoOpen, setModelInfoOpen] = useState(false)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      setAnalysisData({
        networkStats: {
          nodes: 9743,
          edges: 215766,
          avgDegree: 44.3,
          clustering: 0.134,
        },
        topGenes: [
          { gene: "TP53", centrality: 0.892, prediction: "Cancer Driver", confidence: 0.94 },
          { gene: "BRCA1", centrality: 0.856, prediction: "Cancer Driver", confidence: 0.91 },
          { gene: "EGFR", centrality: 0.834, prediction: "Cancer Driver", confidence: 0.88 },
          { gene: "MYC", centrality: 0.812, prediction: "Cancer Driver", confidence: 0.86 },
          { gene: "RB1", centrality: 0.798, prediction: "Cancer Driver", confidence: 0.84 },
        ],
        enrichment: [
          { pathway: "Purine metabolism", pValue: 1.2e-8, genes: 45 },
          { pathway: "DNA repair", pValue: 3.4e-7, genes: 38 },
          { pathway: "Cell cycle regulation", pValue: 8.9e-6, genes: 52 },
          { pathway: "Pyrimidine metabolism", pValue: 2.1e-5, genes: 41 },
          { pathway: "Signal transduction", pValue: 5.6e-4, genes: 67 },
        ],
        survivalMetrics: {
          cIndex: 0.742,
          ibs: 0.158,
          riskGroups: {
            highRisk: 312,
            mediumRisk: 445,
            lowRisk: 341,
          },
        },
      })
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <ModelInfoModal open={modelInfoOpen} onOpenChange={setModelInfoOpen} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {!analysisData && <div className="mb-20"></div>}

        <div className="mb-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
              Analyze Cancer Networks
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-light leading-relaxed">
              Upload gene expression and protein interaction data for comprehensive network analysis, cancer driver
              prediction, and patient survival stratification.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setModelInfoOpen(true)}
            className="gap-3 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-primary/50 rounded-xl px-8 transition-all duration-500"
          >
            <Info className="w-5 h-5 text-primary" />
            Model Specs
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/5 sticky top-28 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <CardHeader className="pt-10">
                <h2 className="text-2xl font-black text-white tracking-tight">Upload Engine</h2>
                <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Ready for data ingestion</p>
              </CardHeader>
              <CardContent className="pb-10">
                <DataUploadForm onSubmit={handleFileUpload} loading={loading} />
              </CardContent>
            </Card>
          </div>

          {analysisData && (
            <div className="lg:col-span-2 space-y-8 animate-slide-up">
              <AnalysisResults data={analysisData} />
              <QRCodeDisplay title="Share Analysis Results" />
            </div>
          )}
        </div>

        {!analysisData && (
          <div className="space-y-12">
            {/* Information Card */}
            <div className="p-10 glass-card border-primary/20 bg-primary/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <Info className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-extrabold text-2xl text-white mb-3 tracking-tight">Strategic Insights Await</h3>
                  <p className="text-white/50 leading-relaxed mb-6 font-light max-w-2xl">
                    Our multi-agent pipeline will process your datasets through spectral centrality and SurvivalGNN modeling
                    to reveal critical network bottlenecks and patient risk profiles.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setModelInfoOpen(true)}
                    className="text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px]"
                  >
                    View Model Architecture
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Format Requirements */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card border-white/5 p-8 rounded-3xl">
                <h4 className="font-black text-primary mb-6 flex items-center gap-3 uppercase tracking-tighter text-xl">
                  <Network className="w-6 h-6" />
                  PPI Configuration
                </h4>
                <p className="text-xs text-white/30 mb-6 uppercase tracking-widest font-bold">Standard CSV Format Required</p>
                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 font-mono text-xs text-white/70 overflow-x-auto shadow-inner">
                  {`TP53,MDM2,0.95,STRING
BRCA1,TP53,0.88,BioGRID
EGFR,SOS1,0.92,HI-III`}
                </div>
              </Card>

              <Card className="glass-card border-white/5 p-8 rounded-3xl">
                <h4 className="font-black text-secondary mb-6 flex items-center gap-3 uppercase tracking-tighter text-xl">
                  <BarChart3 className="w-6 h-6" />
                  Expression Matrix
                </h4>
                <p className="text-xs text-white/30 mb-6 uppercase tracking-widest font-bold">Patient-Gene Correlation Map</p>
                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 font-mono text-xs text-white/70 overflow-x-auto shadow-inner">
                  {`Gene,Patient_1,Patient_2,Patient_3
TP53,2.5,3.1,1.8
BRCA1,1.2,0.9,2.1
EGFR,4.3,5.1,3.7`}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
