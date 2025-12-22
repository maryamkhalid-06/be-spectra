"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PathwayEnrichmentProps {
  data: Array<{
    pathway: string
    pValue: number
    genes: number
  }>
}

export default function PathwayEnrichment({ data }: PathwayEnrichmentProps) {
  const colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"]

  // Convert p-values to -log10 scale for visualization
  const enrichmentData = data.map((item) => ({
    ...item,
    negLog10PValue: -Math.log10(item.pValue),
  }))

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white to-accent/5 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">KEGG Pathway Enrichment Analysis</CardTitle>
            <Badge variant="outline" className="text-accent">
              GO & KEGG Database
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Enriched biological pathways identified from top cancer driver genes
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={enrichmentData} margin={{ top: 20, right: 30, left: 30, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" />
              <XAxis dataKey="pathway" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis label={{ value: "-log10(p-value)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "rgb(255,255,255)", border: "1px solid rgb(200,200,200)" }}
                formatter={(value: any) => [value.toFixed(2), "-log10(p-value)"]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="negLog10PValue" name="Significance" radius={[8, 8, 0, 0]}>
                {enrichmentData.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 space-y-3">
            <h4 className="font-semibold text-sm">Pathway Details</h4>
            {enrichmentData.map((pathway, idx) => (
              <div
                key={pathway.pathway}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-white/50 hover:bg-white/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                    <div>
                      <p className="font-medium text-sm">{pathway.pathway}</p>
                      <p className="text-xs text-muted-foreground">{pathway.genes} genes identified</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-accent">p = {pathway.pValue.toExponential(2)}</p>
                  <p className="text-xs text-muted-foreground">-{Math.log10(pathway.pValue).toFixed(1)} log scale</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
