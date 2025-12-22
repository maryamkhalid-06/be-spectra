"use client"

import Navigation from "@/components/navigation"
import ModelInfoModal from "@/components/model-info-modal"
import SurvivalGNNInfo from "@/components/survivalGNN-info"
import PathwayEnrichmentDetail from "@/components/pathway-enrichment-detail"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function ModelsPage() {
  const [modelInfoOpen, setModelInfoOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navigation />
      <ModelInfoModal open={modelInfoOpen} onOpenChange={setModelInfoOpen} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
            Advanced AI Models
          </h1>
          <p className="text-xl text-white/50 font-light max-w-3xl mx-auto">
            Discover the powerful neural architectures driving cancer network analysis and patient survival prediction with state-of-the-art accuracy.
          </p>
        </div>

        {/* SurvivalGNN Model */}
        <div className="mb-20">
          <SurvivalGNNInfo />
        </div>

        {/* Gene Classification Model */}
        <Card className="glass-card border-white/5 mb-20 overflow-hidden">
          <CardHeader className="pb-12 pt-10 px-10 border-b border-white/5 bg-white/5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Gene Classification Engine</h2>
                <p className="text-white/40 font-light">Graph Attention Network for Cancer Driver Gene Identification</p>
              </div>
              <div className="bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Active Model</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-12 p-10">
            {/* Architecture */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-yellow-500 rounded-full" />
                  Architecture Overview
                </h3>
                <div className="space-y-4">
                  {[
                    { n: 1, t: "Input Layer", d: "Multi-omic features & high-confidence PPI topology (score ≥0.85)", c: "bg-yellow-500" },
                    { n: 2, t: "GAT Layers (3×)", d: "8-head attention mechanism aggregating neighbor information", c: "bg-pink-500" },
                    { n: 3, t: "Global Pooling", d: "Captures macro-level graph structure into single embeddings", c: "bg-blue-500" },
                    { n: 4, t: "Classification Head", d: "Softmax-activated layers for precise driver probability", c: "bg-indigo-500" }
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-lg ${step.c} text-black font-black flex items-center justify-center text-xs`}>
                        {step.n}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{step.t}</h4>
                        <p className="text-white/40 text-xs leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-black/40 rounded-2xl p-8 border border-white/5 h-full flex flex-col justify-center">
                  <h4 className="font-bold text-yellow-500 text-xs uppercase tracking-widest mb-8 text-center">Benchmark Metrics</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center group">
                      <p className="text-white/30 text-[10px] uppercase mb-1 group-hover:text-yellow-500 transition-colors">Accuracy</p>
                      <p className="text-3xl font-black text-white">70.6<span className="text-yellow-500 text-sm">%</span></p>
                    </div>
                    <div className="text-center group">
                      <p className="text-white/30 text-[10px] uppercase mb-1 group-hover:text-pink-500 transition-colors">ROC-AUC</p>
                      <p className="text-3xl font-black text-white">0.726</p>
                    </div>
                    <div className="text-center group">
                      <p className="text-white/30 text-[10px] uppercase mb-1 group-hover:text-blue-500 transition-colors">Precision</p>
                      <p className="text-3xl font-black text-white">0.68</p>
                    </div>
                    <div className="text-center group">
                      <p className="text-white/30 text-[10px] uppercase mb-1 group-hover:text-indigo-500 transition-colors">Recall</p>
                      <p className="text-3xl font-black text-white">0.72</p>
                    </div>
                  </div>

                  <div className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                      <span className="text-white/40 uppercase">Ablation Gain</span>
                      <span className="text-green-400">+12.4%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[12.4%]" />
                    </div>
                    <p className="text-[10px] text-white/30 mt-3 italic text-center">Contribution of PPI Edges to Model Performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Details */}
            <div className="bg-black/40 rounded-2xl p-8 border border-white/5">
              <h4 className="font-bold text-white text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Training Specifications
              </h4>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { l: "Dataset", v: "9,743 genes, TCGA pan-cancer expression" },
                  { l: "Optimizer", v: "Adam (LR: 0.001, WD: 1e-5)" },
                  { l: "Loss", v: "Balanced Cross-Entropy" },
                  { l: "Regularization", v: "Dropout (0.3), L2 norm" }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-white/20 uppercase mb-2 tracking-tighter">{item.l}</p>
                    <p className="text-white/80 text-xs font-medium leading-relaxed">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pathway Enrichment */}
        <div className="mb-20">
          <PathwayEnrichmentDetail />
        </div>
      </div>
    </div>
  )
}
