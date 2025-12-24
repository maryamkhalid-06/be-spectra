"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, Network, Activity } from "lucide-react"
import GeneVisualization from "@/components/gene-visualization"
import SurvivalDashboard from "@/components/survival-dashboard"
import AnalysisInsights from "@/components/analysis-insights"
import { generatePDFReport, generatePathwayEnrichmentContent } from "@/utils/pdf-export"
import { AnalysisOptions } from "@/components/data-upload-form"

interface AnalysisResultsProps {
  data: any
  selectedOptions: AnalysisOptions | null
}

export default function AnalysisResults({ data, selectedOptions }: AnalysisResultsProps) {
  // Hardcoded colors for chart bars - cyan/blue gradient
  const colors = ["#06b6d4", "#0ea5e9", "#3b82f6", "#8b5cf6", "#06b6d4"]

  const handleExportPDF = () => {
    generatePDFReport({
      title: 'Pathway Enrichment Analysis Report',
      generationDate: new Date(),
      validityDays: 15,
      content: generatePathwayEnrichmentContent(data.enrichment)
    })
  }

  // Default to showing all if no options provided
  const showNetwork = selectedOptions?.networkAnalysis ?? true
  const showCancerDriver = selectedOptions?.cancerDriver ?? true
  const showPathway = selectedOptions?.pathwayEnrichment ?? true
  const showSurvival = selectedOptions?.survivalPrediction ?? false

  return (
    <div className="space-y-8">
      <AnalysisInsights data={data} selectedOptions={selectedOptions} />

      <div className="border-t border-white/10 pt-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
          Detailed Analysis Results
        </h2>

        {/* Network Statistics - Show when networkAnalysis is selected */}
        {showNetwork && (
          <div className="grid gap-4 mb-6">
            <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg text-white">Network Statistics</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50">Nodes</p>
                  <p className="text-2xl font-bold text-primary">{data.networkStats.nodes.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50">Edges</p>
                  <p className="text-2xl font-bold text-secondary">{data.networkStats.edges.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50">Avg Degree</p>
                  <p className="text-2xl font-bold text-accent">{data.networkStats.avgDegree}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/50">Clustering Coeff</p>
                  <p className="text-2xl font-bold text-primary">{data.networkStats.clustering}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gene Visualization - Show when cancerDriver is selected */}
        {showCancerDriver && <GeneVisualization />}

        {/* Enrichment Analysis - Show when pathwayEnrichment is selected */}
        {showPathway && (
          <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg text-white">Pathway Enrichment Analysis</CardTitle>
                </div>
                <Button
                  onClick={handleExportPDF}
                  size="sm"
                  className="gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                >
                  <FileDown className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                // Transform p-values to -log10 for visualization
                const transformedData = data.enrichment.map((item: any) => ({
                  ...item,
                  significance: -Math.log10(item.pValue)
                }))

                return (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transformedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="pathway"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                      />
                      <YAxis
                        label={{ value: "-log10(p-value)", angle: -90, position: "insideLeft", fill: 'rgba(255,255,255,0.6)' }}
                        tick={{ fill: 'rgba(255,255,255,0.6)' }}
                        domain={[0, 'auto']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15,15,35,0.95)",
                          border: "1px solid rgba(59,130,246,0.3)",
                          borderRadius: "12px",
                          color: "#fff"
                        }}
                        labelStyle={{ color: "#fff", fontWeight: "bold" }}
                        itemStyle={{ color: "#06b6d4" }}
                        formatter={(value: any, name: any, props: any) => [
                          `p-value: ${props.payload.pValue.toExponential(2)}`,
                          "Significance"
                        ]}
                      />
                      <Bar dataKey="significance" name="Significance" radius={[8, 8, 0, 0]}>
                        {transformedData.map((item: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )
              })()}
            </CardContent>
          </Card>
        )}

        {/* Survival Dashboard - Show when survivalPrediction is selected */}
        {showSurvival && <SurvivalDashboard />}
      </div>
    </div>
  )
}
