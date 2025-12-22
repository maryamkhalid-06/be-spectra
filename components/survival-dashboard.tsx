"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SurvivalDashboard() {
  // Kaplan-Meier survival data
  const survivalData = [
    { month: 0, highRisk: 100, mediumRisk: 100, lowRisk: 100 },
    { month: 6, highRisk: 92, mediumRisk: 97, lowRisk: 99 },
    { month: 12, highRisk: 78, mediumRisk: 93, lowRisk: 98 },
    { month: 18, highRisk: 65, mediumRisk: 88, lowRisk: 97 },
    { month: 24, highRisk: 52, mediumRisk: 82, lowRisk: 96 },
    { month: 30, highRisk: 41, mediumRisk: 75, lowRisk: 95 },
    { month: 36, highRisk: 32, mediumRisk: 68, lowRisk: 94 },
    { month: 42, highRisk: 25, mediumRisk: 61, lowRisk: 93 },
    { month: 48, highRisk: 18, mediumRisk: 54, lowRisk: 91 },
  ]

  const riskMetrics = [
    { name: "High Risk", patients: 312, survival: "18%", color: "bg-red-500" },
    { name: "Medium Risk", patients: 445, survival: "54%", color: "bg-amber-500" },
    { name: "Low Risk", patients: 341, survival: "91%", color: "bg-green-500" },
  ]

  const topGenes = [
    { gene: "TP53", risk: 0.95, expression: 2.8, mutation: true },
    { gene: "BRCA1", risk: 0.88, expression: 1.9, mutation: false },
    { gene: "EGFR", risk: 0.82, expression: 3.2, mutation: true },
    { gene: "MYC", risk: 0.76, expression: 4.1, mutation: true },
    { gene: "RB1", risk: 0.71, expression: 1.4, mutation: false },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kaplan-Meier Survival Curves by Risk Group</span>
            <Badge variant="outline" className="text-accent">
              TCGA-BRCA (n=1,098)
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={survivalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Survival %", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "rgb(30, 41, 59)", border: "1px solid rgb(71, 85, 105)" }} />
              <Line
                type="monotone"
                dataKey="highRisk"
                stroke="rgb(239, 68, 68)"
                strokeWidth={2}
                name="High Risk"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="mediumRisk"
                stroke="rgb(251, 146, 60)"
                strokeWidth={2}
                name="Medium Risk"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lowRisk"
                stroke="rgb(34, 197, 94)"
                strokeWidth={2}
                name="Low Risk"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Log-rank test p &lt; 0.001: Significant difference between risk groups
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {riskMetrics.map((metric) => (
          <Card key={metric.name} className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-2xl font-bold">{metric.patients}</p>
                <p className="text-xs text-muted-foreground">Patients</p>
              </div>
              <div>
                <p className="text-xl font-bold text-accent">{metric.survival}</p>
                <p className="text-xs text-muted-foreground">48-month survival</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg">Top Contributing Genes to Patient Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topGenes.map((gene, idx) => (
              <div
                key={gene.gene}
                className="flex items-center justify-between p-3 rounded bg-card/50 border border-border/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{gene.gene}</p>
                    {gene.mutation && <Badge className="bg-red-500/20 text-red-400 text-xs">Mutated</Badge>}
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Expression: {gene.expression.toFixed(1)}</span>
                    <span>Risk Score: {(gene.risk * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="w-24">
                  <div className="w-full bg-card rounded h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded"
                      style={{ width: `${gene.risk * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-accent/50">
        <CardHeader>
          <CardTitle className="text-sm">Model Performance Metrics (Test Set)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-accent">0.742</p>
            <p className="text-xs text-muted-foreground">C-Index</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">0.158</p>
            <p className="text-xs text-muted-foreground">IBS Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">+12%</p>
            <p className="text-xs text-muted-foreground">vs Expression Only</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
