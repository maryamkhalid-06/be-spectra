"use client"

import React from "react"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useResearchData } from "@/hooks/useResearchData"

export default function Methodology() {
  const {
    totalGenes,
    interactions,
    dataSources,
    featuresPerGene,
    classImbalance,
    spectralCentralityFormula,
    keyProperties,
    modelLayers,
    mechanism,
    balancedSamplingStrategy,
    regularization,
    performanceMetrics,
    survivalPredictionModel,
    inputSurvivalData,
    architectureSurvival,
    lossFunctionSurvival,
    validationPerformanceSurvival,
    enrichedPathways,
    clinicalTranslation,
  } = useResearchData()

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
            Spectral Graph Theory & GNNs
          </h1>
          <p className="text-xl text-white/50 font-light leading-relaxed">
            A comprehensive framework integrating network topology with multi-omic data for cancer driver gene discovery
            and patient outcome prediction.
          </p>
        </div>

        <div className="grid gap-12">
          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-2xl text-white font-bold tracking-tight">1. Network Construction & Data Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <p className="font-bold text-yellow-500 uppercase tracking-widest text-xs">Protein-Protein Interaction Network</p>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span><strong className="text-white">Total Genes:</strong> {totalGenes} nodes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span><strong className="text-white">Interactions:</strong> {interactions} edges</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span><strong className="text-white">Data Sources:</strong> {dataSources}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  <span><strong className="text-white">Features per gene:</strong> {featuresPerGene} multi-omic features</span>
                </li>
              </ul>
              <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-sm text-yellow-500 font-medium">
                  <strong className="text-yellow-400">Class Imbalance:</strong> {classImbalance}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-2xl text-white font-bold tracking-tight">2. Spectral Graph Theory Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <p className="text-white/60 font-light italic">Eigenvalue decomposition of Graph Laplacian L = D - A to identify network bottlenecks:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                  <p className="font-bold text-blue-400 text-xs uppercase tracking-widest mb-4">Spectral Centrality Formula</p>
                  <p className="text-sm font-mono text-white/80 bg-white/5 p-4 rounded-lg border border-white/10">{spectralCentralityFormula}</p>
                </div>
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                  <p className="font-bold text-pink-400 text-xs uppercase tracking-widest mb-4">Key Properties</p>
                  <ul className="text-sm text-white/50 space-y-3">
                    {keyProperties.map((property, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-pink-500 rounded-full" />
                        {property}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-2xl text-white font-bold tracking-tight">3. Graph Attention Network (GAT)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <div className="grid gap-4">
                {[
                  { label: "Model Layers", value: modelLayers },
                  { label: "Mechanism", value: mechanism },
                  { label: "Strategy", value: balancedSamplingStrategy },
                  { label: "Regularization", value: regularization }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/40 text-sm font-medium">{item.label}</span>
                    <span className="text-white text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Performance vs Focal Loss Baseline</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-lg text-xs font-bold text-blue-400 border border-blue-500/20 text-center">Metric</div>
                  <div className="bg-blue-500/10 p-3 rounded-lg text-xs font-bold text-blue-400 border border-blue-500/20 text-center">Balanced GAT</div>
                  {performanceMetrics.map((metric, index) => (
                    <React.Fragment key={index}>
                      <div className="p-3 text-white/60 text-sm border-b border-white/5">{metric.name}</div>
                      <div className="p-3 text-white text-sm font-bold text-right border-b border-white/5">{metric.value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-2xl text-white font-bold tracking-tight">4. SurvivalGNN Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Input Data</p>
                  <p className="text-white text-sm font-medium">{inputSurvivalData}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Architecture</p>
                  <p className="text-white text-sm font-medium">{architectureSurvival}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Loss Function</p>
                  <p className="text-white text-sm font-medium">{lossFunctionSurvival}</p>
                </div>

                <div className="bg-pink-500/10 p-6 rounded-2xl border border-pink-500/20 mt-6">
                  <p className="text-sm font-bold text-pink-400 mb-4 uppercase tracking-widest">Validation Performance (Test Set)</p>
                  <div className="grid grid-cols-3 gap-6">
                    {validationPerformanceSurvival.map((performance, index) => (
                      <div key={index} className="text-center">
                        <p className="text-white/40 text-[10px] uppercase mb-1">{performance.name}</p>
                        <p className="text-white font-bold text-lg">{performance.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/40 font-light italic mt-6 leading-relaxed">
                Network topology improves survival prediction by <span className="text-pink-400 font-bold">12%</span> over expression-only models, demonstrating the value of integrating protein interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-2xl text-white font-bold tracking-tight">5. Pathway Enrichment & Biological Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <p className="font-bold text-yellow-500 uppercase tracking-widest text-xs">Top Enriched Pathways (FDR &lt; 0.01)</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-bold text-blue-400 mb-4">KEGG Pathways</p>
                  <ul className="text-sm text-white/50 space-y-2">
                    {enrichedPathways.kegg.map((pathway, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full" />
                        {pathway}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-pink-400 mb-4">GO Biological Process</p>
                  <ul className="text-sm text-white/50 space-y-2">
                    {enrichedPathways.go.map((process, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-pink-500 rounded-full" />
                        {process}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-sm text-white/40 font-light italic mt-8 leading-relaxed">
                These pathways align with known cancer hallmarks: elevated nucleotide metabolism for rapid
                proliferation, and dysregulated protein degradation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/20 p-8 rounded-3xl">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl text-white font-extrabold tracking-tight">Clinical Translation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm text-white/60 leading-relaxed italic">{clinicalTranslation}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
