"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GeneVisualization from "@/components/gene-visualization"
import SurvivalDashboard from "@/components/survival-dashboard"
import AnalysisInsights from "@/components/analysis-insights"

interface AnalysisResultsProps {
  data: any
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  const colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B"]

  return (
    <div className="space-y-8">
      <AnalysisInsights data={data} />

      <div className="border-t-2 border-yellow-200 pt-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Detailed Analysis Results
        </h2>

        {/* Network Statistics */}
        <div className="grid gap-4 mb-6">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Network Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nodes</p>
                <p className="text-2xl font-bold">{data.networkStats.nodes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Edges</p>
                <p className="text-2xl font-bold">{data.networkStats.edges.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Degree</p>
                <p className="text-2xl font-bold">{data.networkStats.avgDegree}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clustering Coeff</p>
                <p className="text-2xl font-bold">{data.networkStats.clustering}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gene Visualization with Animation */}
        <GeneVisualization />

        {/* Enrichment Analysis */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg">Pathway Enrichment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.enrichment}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="pathway" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis scale="log" label={{ value: "-log10(p-value)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => value.toExponential(2)} />
                <Bar dataKey="pValue" name="Significance">
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
