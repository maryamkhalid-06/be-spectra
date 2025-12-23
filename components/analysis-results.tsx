"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, Calendar, Clock, Network, Activity } from "lucide-react"
import GeneVisualization from "@/components/gene-visualization"
import SurvivalDashboard from "@/components/survival-dashboard"
import AnalysisInsights from "@/components/analysis-insights"
import { generatePDFReport, generatePathwayEnrichmentContent } from "@/utils/pdf-export"

interface AnalysisResultsProps {
  data: any
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  // Theme-aware colors
  const getThemeColors = () => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--primary-hex').trim() || '#06b6d4'
      const secondary = getComputedStyle(root).getPropertyValue('--secondary-hex').trim() || '#8b5cf6'
      const accent = getComputedStyle(root).getPropertyValue('--accent-hex').trim() || '#14b8a6'
      return [primary, secondary, accent, primary, secondary]
    }
    return ["#06b6d4", "#8b5cf6", "#14b8a6", "#06b6d4", "#8b5cf6"]
  }

  const colors = getThemeColors()

  const handleExportPDF = () => {
    generatePDFReport({
      title: 'Pathway Enrichment Analysis Report',
      generationDate: new Date(),
      validityDays: 15,
      content: generatePathwayEnrichmentContent(data.enrichment)
    })
  }

  const generationDate = new Date()
  const expiryDate = new Date(generationDate)
  expiryDate.setDate(expiryDate.getDate() + 15)

  return (
    <div className="space-y-8">
      <AnalysisInsights data={data} />

      <div className="border-t border-white/10 pt-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
          Detailed Analysis Results
        </h2>

        {/* Network Statistics */}
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

        {/* Gene Visualization with Animation */}
        <GeneVisualization />

        {/* Enrichment Analysis */}
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

            {/* Validity Banner */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Generated: {generationDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Valid for 15 days (until {expiryDate.toLocaleDateString()})</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.enrichment}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="pathway"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                />
                <YAxis
                  scale="log"
                  label={{ value: "-log10(p-value)", angle: -90, position: "insideLeft", fill: 'rgba(255,255,255,0.6)' }}
                  tick={{ fill: 'rgba(255,255,255,0.6)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15,15,35,0.95)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    borderRadius: "12px",
                    color: "#fff"
                  }}
                  formatter={(value) => (value as number).toExponential(2)}
                />
                <Bar dataKey="pValue" name="Significance" radius={[8, 8, 0, 0]}>
                  {data.enrichment.map((item: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Survival Dashboard */}
        <SurvivalDashboard />
      </div>
    </div>
  )
}
