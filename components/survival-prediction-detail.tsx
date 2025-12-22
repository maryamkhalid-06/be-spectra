"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Network, Zap } from "lucide-react"

export default function SurvivalPredictionDetail() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-accent/5 to-purple-50 border-accent/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Network className="w-5 h-5 text-accent" />
              SurvivalGNN Model Architecture
            </CardTitle>
            <Badge className="bg-accent/20 text-accent">Patient-Specific GNN</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-700 font-bold text-sm">1</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Input: Patient-Specific Graphs</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Constructs patient-specific graphs where <span className="font-semibold">nodes are genes</span> (with
                  gene expression data as node features ~20,000 features per patient) and{" "}
                  <span className="font-semibold">edges are protein interactions</span> from STRING database (confidence
                  threshold ≥0.85).
                </p>
                <div className="mt-2 p-3 bg-white/50 rounded border border-blue-200/50 text-xs text-muted-foreground">
                  <p>TCGA-BRCA Cohort: 1,098 breast cancer patients</p>
                  <p>Features: Gene expression (log2 transformed, normalized)</p>
                  <p>PPI Edges: STRING database, confidence ≥0.85</p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Section */}
          <div className="space-y-3 border-t border-accent/10 pt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                  <span className="text-purple-700 font-bold text-sm">2</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  Process: Graph Neural Network Layers
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  GNN layers aggregate neighbor information using{" "}
                  <span className="font-semibold">graph attention mechanisms</span> with ReLU activation functions.
                  Multi-head attention learns different interaction patterns between genes.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>
                      <span className="font-semibold">Layer 1:</span> Initial gene feature embedding with attention
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>
                      <span className="font-semibold">Layer 2:</span> Neighbor aggregation (multi-head attention)
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>
                      <span className="font-semibold">Layer 3:</span> Patient-level pooling (global aggregation)
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>
                      <span className="font-semibold">Loss Function:</span> Cox proportional hazards loss (handles
                      censored survival data)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-3 border-t border-accent/10 pt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                  <span className="text-green-700 font-bold text-sm">3</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Output: Survival Risk Prediction
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Final GNN layer outputs a <span className="font-semibold">patient-specific risk score</span> for
                  survival prediction, enabling high/low-risk stratification with significant Kaplan-Meier survival
                  divergence over 48 months.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card className="bg-white border-border">
        <CardHeader>
          <CardTitle className="text-lg">Model Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <p className="text-xs text-muted-foreground mb-1">C-Index (Test Set)</p>
              <p className="text-2xl font-bold text-blue-700">0.74</p>
              <p className="text-xs text-muted-foreground mt-1">Higher concordance = better predictions</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <p className="text-xs text-muted-foreground mb-1">Integrated Brier Score</p>
              <p className="text-2xl font-bold text-purple-700">0.158</p>
              <p className="text-xs text-muted-foreground mt-1">Lower is better (baseline: 0.25)</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <p className="text-xs text-muted-foreground mb-1">Ablation: PPI Value</p>
              <p className="text-2xl font-bold text-green-700">0.66</p>
              <p className="text-xs text-muted-foreground mt-1">Without edges (0.74 → 0.66 drop)</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <p className="text-xs text-muted-foreground mb-1">Improvement vs Baseline</p>
              <p className="text-2xl font-bold text-orange-700">+12%</p>
              <p className="text-xs text-muted-foreground mt-1">Over expression-only models</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Details */}
      <Card className="bg-white border-border">
        <CardHeader>
          <CardTitle className="text-lg">Training & Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Dataset Split</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Training: 658 patients (60%)</li>
                <li>Validation: 220 patients (20%)</li>
                <li>Test: 220 patients (20%)</li>
              </ul>
            </div>
            <div className="p-4 border border-border/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Optimization</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Optimizer: Adam (lr=0.001)</li>
                <li>Loss: Cox proportional hazards</li>
                <li>Epochs: 100 (early stopping)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
