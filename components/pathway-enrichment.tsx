"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileDown, Calendar, Clock } from "lucide-react"
import { generatePDFReport, generatePathwayEnrichmentContent } from "@/utils/pdf-export"

interface PathwayEnrichmentProps {
  data: Array<{
    pathway: string
    pValue: number
    genes: number
  }>
}

export default function PathwayEnrichment({ data }: PathwayEnrichmentProps) {
  // Theme-aware colors using CSS variables
  const getThemeColors = () => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--primary-hex').trim() || '#06b6d4'
      const secondary = getComputedStyle(root).getPropertyValue('--secondary-hex').trim() || '#8b5cf6'
      const accent = getComputedStyle(root).getPropertyValue('--accent-hex').trim() || '#14b8a6'
      return [primary, secondary, accent, primary, secondary, accent]
    }
    // Default Arctic Aurora colors
    return ["#06b6d4", "#8b5cf6", "#14b8a6", "#06b6d4", "#8b5cf6", "#14b8a6"]
  }

  const colors = getThemeColors()

  // Convert p-values to -log10 scale for visualization
  const enrichmentData = data.map((item) => ({
    ...item,
    negLog10PValue: -Math.log10(item.pValue),
  }))

  const handleExportPDF = () => {
    generatePDFReport({
      title: 'Pathway Enrichment Analysis Report',
      generationDate: new Date(),
      validityDays: 15, // Valid for 15 days (more than 10)
      content: generatePathwayEnrichmentContent(data)
    })
  }

  // Calculate validity date for display
  const generationDate = new Date()
  const expiryDate = new Date(generationDate)
  expiryDate.setDate(expiryDate.getDate() + 15)

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-xl text-white">KEGG Pathway Enrichment Analysis</CardTitle>
              <p className="text-sm text-white/50 mt-2">
                Enriched biological pathways identified from top cancer driver genes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
                GO & KEGG Database
              </Badge>
              <Button
                onClick={handleExportPDF}
                size="sm"
                className="gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
              >
                <FileDown className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={enrichmentData} margin={{ top: 20, right: 30, left: 30, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="pathway"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
              />
              <YAxis
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
            <h4 className="font-semibold text-sm text-white">Pathway Details</h4>
            {enrichmentData.map((pathway, idx) => (
              <div
                key={pathway.pathway}
                className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                    <div>
                      <p className="font-medium text-sm text-white">{pathway.pathway}</p>
                      <p className="text-xs text-white/50">{pathway.genes} genes identified</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-primary">p = {pathway.pValue.toExponential(2)}</p>
                  <p className="text-xs text-white/50">-{Math.log10(pathway.pValue).toFixed(1)} log scale</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
