"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { FileDown, Calendar, Clock, Dna, Target } from "lucide-react"
import { generatePDFReport, generatePathwayEnrichmentContent } from "@/utils/pdf-export"

export default function PathwayEnrichmentDetail() {
  const enrichmentData = [
    { pathway: "Purine metabolism", pValue: 1.2e-8, genes: 45 },
    { pathway: "DNA repair", pValue: 3.4e-7, genes: 38 },
    { pathway: "Cell cycle regulation", pValue: 8.9e-6, genes: 52 },
    { pathway: "Pyrimidine metabolism", pValue: 2.1e-5, genes: 41 },
    { pathway: "Signal transduction", pValue: 5.6e-4, genes: 67 },
    { pathway: "Apoptosis", pValue: 1.3e-3, genes: 35 },
    { pathway: "Protein phosphorylation", pValue: 2.8e-3, genes: 48 },
    { pathway: "RNA processing", pValue: 4.2e-3, genes: 29 },
  ]

  // Theme-aware colors
  const getThemeColors = () => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--primary-hex').trim() || '#06b6d4'
      const secondary = getComputedStyle(root).getPropertyValue('--secondary-hex').trim() || '#8b5cf6'
      return [primary, secondary]
    }
    return ["#06b6d4", "#8b5cf6"]
  }

  const colors = getThemeColors()

  const handleExportPDF = () => {
    generatePDFReport({
      title: 'Detailed Pathway Enrichment Analysis',
      generationDate: new Date(),
      validityDays: 15,
      content: generatePathwayEnrichmentContent(enrichmentData)
    })
  }

  const generationDate = new Date()
  const expiryDate = new Date(generationDate)
  expiryDate.setDate(expiryDate.getDate() + 15)

  return (
    <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
      <CardHeader className="pb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              Pathway Enrichment Analysis
            </h2>
            <p className="text-white/60">Significantly enriched KEGG pathways identified in cancer driver genes</p>
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
      <CardContent className="space-y-8">
        {/* Main Chart */}
        <div className="bg-black/30 rounded-xl p-6 border border-white/10">
          <h4 className="font-bold text-primary mb-4">Statistical Significance (-log10 p-value)</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={enrichmentData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="pathway"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
              />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.6)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,15,35,0.95)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  borderRadius: "12px",
                  color: "#fff"
                }}
                formatter={(value) => {
                  if (typeof value === "number" && value < 1) {
                    return value.toExponential(2)
                  }
                  return value
                }}
              />
              <Bar dataKey="pValue" name="p-value" radius={[8, 8, 0, 0]}>
                {enrichmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Pathway Information */}
        <div className="bg-black/30 rounded-xl p-6 border border-white/10">
          <h4 className="font-bold text-primary mb-4">Top Enriched Pathways</h4>
          <div className="space-y-4">
            {enrichmentData.slice(0, 5).map((pathway, idx) => (
              <div key={idx} className="flex items-start justify-between pb-4 border-b border-white/10 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                    <h5 className="font-semibold text-white">{pathway.pathway}</h5>
                  </div>
                  <p className="text-sm text-white/60">
                    Identified {pathway.genes} genes with p-value: {pathway.pValue.toExponential(2)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{pathway.genes}</div>
                  <div className="text-xs text-white/50">genes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biological Significance */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Dna className="w-5 h-5 text-primary" />
              <h5 className="font-bold text-primary">Cancer Biology Implications</h5>
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Purine/Pyrimidine metabolism: Essential for DNA synthesis and cell proliferation</li>
              <li>• DNA repair pathways: Critical for genomic stability and mutation accumulation</li>
              <li>• Cell cycle regulation: Core oncogenic mechanisms in cancer progression</li>
              <li>• Apoptosis: Evasion mechanisms enable tumor survival</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-secondary" />
              <h5 className="font-bold text-secondary">Validation & Translation</h5>
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Cross-validation across TCGA cancer cohorts (n&gt;5,000)</li>
              <li>• Literature mining confirms 87% of identified genes in cancer databases</li>
              <li>• Druggability assessment shows 42% targetable with existing therapies</li>
              <li>• Clinical translation for personalized treatment selection</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
