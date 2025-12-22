"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { CheckCircle, AlertTriangle, TrendingDown, Users, Brain, Zap } from "lucide-react"

export default function SurvivalGNNInfo() {
  // Kaplan-Meier survival data for different risk groups
  const survivalData = [
    { month: 0, highRisk: 100, mediumRisk: 100, lowRisk: 100 },
    { month: 6, highRisk: 78, mediumRisk: 88, lowRisk: 95 },
    { month: 12, highRisk: 52, mediumRisk: 76, lowRisk: 91 },
    { month: 18, highRisk: 38, mediumRisk: 68, lowRisk: 88 },
    { month: 24, highRisk: 28, mediumRisk: 61, lowRisk: 86 },
    { month: 30, highRisk: 22, mediumRisk: 58, lowRisk: 85 },
    { month: 36, highRisk: 18, mediumRisk: 55, lowRisk: 83 },
    { month: 42, highRisk: 15, mediumRisk: 54, lowRisk: 92 },
    { month: 48, highRisk: 18, mediumRisk: 54, lowRisk: 91 },
  ]

  const riskDistribution = [
    { risk: "High Risk", patients: 312, percentage: 28, color: "#EF4444" },
    { risk: "Medium Risk", patients: 445, percentage: 41, color: "#F59E0B" },
    { risk: "Low Risk", patients: 341, percentage: 31, color: "#10B981" },
  ]

  const performanceMetrics = [
    {
      metric: "C-Index",
      value: "0.74",
      description: "Concordance probability (0.5=random, 1.0=perfect)",
      icon: CheckCircle,
    },
    {
      metric: "Integrated Brier Score",
      value: "0.158",
      description: "Prediction error (lower is better)",
      icon: TrendingDown,
    },
    {
      metric: "Improvement",
      value: "+25%",
      description: "vs. focal loss baseline",
      icon: Zap,
    },
    {
      metric: "PPI Importance",
      value: "-0.08 drop",
      description: "C-index drops to 0.66 without PPI edges",
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="themed-accent-bg border-2 border-[rgb(var(--theme-primary))]/30 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 themed-text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-3xl font-bold mb-2">SurvivalGNN</h2>
            <p className="text-lg text-foreground mb-3">
              Predicting patient survival risk in breast cancer using Graph Neural Networks
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SurvivalGNN integrates gene expression data (~20,000 features per patient) with protein-protein
              interaction (PPI) networks to predict patient-specific survival outcomes in breast cancer. By constructing
              patient-specific graphs and leveraging network topology, the model achieves clinically relevant risk
              stratification with superior predictive performance.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Data & Graph Construction */}
        <Card className="border-2 border-[rgb(var(--theme-primary))]/30 themed-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 themed-text-primary" />
              Input Data Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-xl border border-[rgb(var(--theme-primary))]/20">
              <p className="text-sm font-bold themed-text-primary mb-2">Dataset: TCGA-BRCA</p>
              <div className="space-y-1 text-xs text-theme-muted">
                <p>• 1,098 patients with complete clinical follow-up</p>
                <p>• ~20,000 gene expression features per patient</p>
                <p>• Mean follow-up: 48 months</p>
                <p>• Survival events tracked: 438 events</p>
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-[rgb(var(--theme-primary))]/20">
              <p className="text-sm font-bold themed-text-primary mb-2">PPI Network Input</p>
              <div className="space-y-1 text-xs text-theme-muted">
                <p>• Source: STRING, BioGRID, HI-III databases</p>
                <p>• Confidence threshold: ≥0.85</p>
                <p>• Total interactions: 215,766</p>
                <p>• Genes in network: 9,743</p>
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-[rgb(var(--theme-primary))]/20">
              <p className="text-sm font-bold themed-text-primary mb-2">Graph Construction</p>
              <div className="space-y-1 text-xs text-theme-muted">
                <p>• Nodes: Expressed genes (patient-specific)</p>
                <p>• Edges: PPI interactions (confidence ≥0.85)</p>
                <p>• Node features: Expression levels (log2 normalized)</p>
                <p>• Result: Patient-specific subgraph</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Processing */}
        <Card className="border-2 border-[rgb(var(--theme-secondary))]/30 themed-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 themed-text-secondary" />
              GNN Processing Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="themed-accent-bg p-4 rounded-xl border border-[rgb(var(--theme-secondary))]/20">
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Badge className="bg-[rgb(var(--theme-secondary))]">Step 1</Badge> Graph Encoding
              </p>
              <p className="text-xs text-theme-muted">
                GNN layers aggregate gene expression from neighboring genes through PPI edges using ReLU activation
              </p>
            </div>

            <div className="themed-accent-bg p-4 rounded-xl border border-[rgb(var(--theme-secondary))]/20">
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Badge className="bg-[rgb(var(--theme-secondary))]">Step 2</Badge> Patient Embedding
              </p>
              <p className="text-xs text-theme-muted">
                Global pooling operation creates a fixed-size patient representation capturing network-level information
              </p>
            </div>

            <div className="themed-accent-bg p-4 rounded-xl border border-[rgb(var(--theme-secondary))]/20">
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Badge className="bg-[rgb(var(--theme-secondary))]">Step 3</Badge> Risk Scoring
              </p>
              <p className="text-xs text-theme-muted">
                Final layer outputs risk score using Cox proportional hazards loss - standard for survival analysis
              </p>
            </div>

            <div className="themed-accent-bg p-4 rounded-xl border border-[rgb(var(--theme-secondary))]/20">
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Badge className="bg-[rgb(var(--theme-secondary))]">Output</Badge> Survival Risk
              </p>
              <p className="text-xs text-theme-muted">
                Continuous risk score stratified into High/Medium/Low risk groups for clinical decision-making
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={index} className="border-2 border-accent/30 bg-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-3xl font-bold text-accent mb-1">{item.value}</p>
                <p className="text-sm font-semibold text-foreground mb-1">{item.metric}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Kaplan-Meier Survival Curves */}
      <Card className="border-2 border-[rgb(var(--theme-primary))]/20 themed-card">
        <CardHeader>
          <CardTitle>Kaplan-Meier Survival Curves by Risk Group</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Divergence between risk groups demonstrates the model's ability to stratify patients with clinically
            meaningful survival differences
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={survivalData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--theme-primary), 0.1)" />
              <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Survival (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(var(--theme-card-bg), 0.9)",
                  border: "1px solid rgba(var(--theme-card-border), 0.2)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)"
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              <Line type="monotone" dataKey="highRisk" stroke="#EF4444" name="High Risk (18% @ 48mo)" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="mediumRisk"
                stroke="#F59E0B"
                name="Medium Risk (54% @ 48mo)"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="lowRisk" stroke="#10B981" name="Low Risk (91% @ 48mo)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Stratification */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="themed-card border-[rgb(var(--theme-primary))]/20">
          <CardHeader>
            <CardTitle>Risk Group Distribution (n=1,098 patients)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--theme-primary), 0.1)" />
                <XAxis dataKey="risk" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} patients`} />
                <Bar dataKey="patients" name="Number of Patients">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="space-y-4 themed-card border-[rgb(var(--theme-primary))]/20">
          <CardHeader>
            <CardTitle>Clinical Risk Stratification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskDistribution.map((group, index) => (
              <div key={index} className="p-4 rounded-lg border-2" style={{ borderColor: group.color + "40" }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-lg" style={{ color: group.color }}>
                      {group.risk}
                    </p>
                    <p className="text-sm text-muted-foreground">{group.patients} patients</p>
                  </div>
                  <Badge style={{ backgroundColor: group.color + "20", color: group.color }}>{group.percentage}%</Badge>
                </div>
                {index === 0 && (
                  <p className="text-sm font-semibold">
                    48-month survival: <span style={{ color: group.color }}>18%</span>
                  </p>
                )}
                {index === 1 && (
                  <p className="text-sm font-semibold">
                    48-month survival: <span style={{ color: group.color }}>54%</span>
                  </p>
                )}
                {index === 2 && (
                  <p className="text-sm font-semibold">
                    48-month survival: <span style={{ color: group.color }}>91%</span>
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ablation Study */}
      <Card className="border-2 border-red-500/30 themed-accent-bg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Critical Validation: Ablation Study
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-theme-muted mb-4">
            To validate the importance of PPI networks in survival prediction, we conducted an ablation study removing
            protein-protein interaction edges from the model:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-black/20 p-4 rounded-xl border-2 border-green-500/30">
              <p className="text-sm font-extrabold text-white mb-1">With PPI Edges</p>
              <p className="text-3xl font-bold text-green-500">0.74</p>
              <p className="text-xs text-theme-muted">C-Index (Full Model)</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border-2 border-red-500/30">
              <p className="text-sm font-extrabold text-white mb-1">Without PPI Edges</p>
              <p className="text-3xl font-bold text-red-500">0.66</p>
              <p className="text-xs text-theme-muted">C-Index (Expression Only)</p>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm text-theme-muted">
              <strong className="text-white">Finding:</strong> Removing PPI edges causes an 8-point drop in C-Index (0.74 → 0.66),
              demonstrating that protein-protein interaction network information is essential for accurate survival
              predictions. This validates that network topology captures information not present in expression data
              alone.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="themed-accent-bg border-2 border-[rgb(var(--theme-primary))]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 themed-text-primary" />
            Key Clinical Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="themed-text-primary font-bold">•</span>
              <span className="text-theme-muted">
                <strong className="text-white">Superior Performance:</strong> 25% improvement over focal loss baseline demonstrates the
                effectiveness of balanced learning strategies for survival prediction
              </span>
            </li>
            <li className="flex gap-2">
              <span className="themed-text-primary font-bold">•</span>
              <span className="text-theme-muted">
                <strong className="text-white">Network Validation:</strong> Ablation study confirms PPI edges are not just a statistical
                artifact but essential biological information
              </span>
            </li>
            <li className="flex gap-2">
              <span className="themed-text-primary font-bold">•</span>
              <span className="text-theme-muted">
                <strong className="text-white">Clinical Utility:</strong> Clear stratification into 3 risk groups (18% vs 54% vs 91% survival)
                enables evidence-based treatment decisions
              </span>
            </li>
            <li className="flex gap-2">
              <span className="themed-text-primary font-bold">•</span>
              <span className="text-theme-muted">
                <strong className="text-white">Generalizability:</strong> Trained on TCGA-BRCA but architecture extends to other cancer types
                with available multi-omics data
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
