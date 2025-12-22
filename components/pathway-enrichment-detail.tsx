"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function PathwayEnrichmentDetail() {
  const enrichmentData = [
    { pathway: "Purine metabolism", pValue: 1.2e-8, genes: 45, color: "#EAB308" },
    { pathway: "DNA repair", pValue: 3.4e-7, genes: 38, color: "#EC4899" },
    { pathway: "Cell cycle regulation", pValue: 8.9e-6, genes: 52, color: "#EAB308" },
    { pathway: "Pyrimidine metabolism", pValue: 2.1e-5, genes: 41, color: "#EC4899" },
    { pathway: "Signal transduction", pValue: 5.6e-4, genes: 67, color: "#EAB308" },
    { pathway: "Apoptosis", pValue: 1.3e-3, genes: 35, color: "#EC4899" },
    { pathway: "Protein phosphorylation", pValue: 2.8e-3, genes: 48, color: "#EAB308" },
    { pathway: "RNA processing", pValue: 4.2e-3, genes: 29, color: "#EC4899" },
  ]

  const colors = ["#EAB308", "#EC4899"]

  return (
    <Card className="bg-gradient-to-br from-white to-pink-50/30 border-pink-200">
      <CardHeader className="pb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Pathway Enrichment Analysis</h2>
          <p className="text-gray-700">Significantly enriched KEGG pathways identified in cancer driver genes</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Main Chart */}
        <div className="bg-white rounded-lg p-6 border border-pink-100">
          <h4 className="font-bold text-pink-700 mb-4">Statistical Significance (-log10 p-value)</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={enrichmentData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="pathway" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis label={{ value: "-log10(p-value)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number" && value < 1) {
                    return value.toExponential(2)
                  }
                  return value
                }}
              />
              <Bar dataKey="pValue" name="p-value">
                {enrichmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Pathway Information */}
        <div className="bg-white rounded-lg p-6 border border-pink-100">
          <h4 className="font-bold text-pink-700 mb-4">Top Enriched Pathways</h4>
          <div className="space-y-4">
            {enrichmentData.slice(0, 5).map((pathway, idx) => (
              <div key={idx} className="flex items-start justify-between pb-4 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pathway.color }} />
                    <h5 className="font-semibold text-gray-900">{pathway.pathway}</h5>
                  </div>
                  <p className="text-sm text-gray-600">
                    Identified {pathway.genes} genes with p-value: {pathway.pValue.toExponential(2)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">{pathway.genes}</div>
                  <div className="text-xs text-gray-500">genes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biological Significance */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/30 rounded-lg p-6 border border-yellow-200">
            <h5 className="font-bold text-yellow-700 mb-3">Cancer Biology Implications</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Purine/Pyrimidine metabolism: Essential for DNA synthesis and cell proliferation</li>
              <li>• DNA repair pathways: Critical for genomic stability and mutation accumulation</li>
              <li>• Cell cycle regulation: Core oncogenic mechanisms in cancer progression</li>
              <li>• Apoptosis: Evasion mechanisms enable tumor survival</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100/30 rounded-lg p-6 border border-pink-200">
            <h5 className="font-bold text-pink-700 mb-3">Validation &amp; Translation</h5>
            <ul className="space-y-2 text-sm text-gray-700">
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
