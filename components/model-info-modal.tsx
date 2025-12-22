"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, CheckCircle } from "lucide-react"

interface ModelInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModelInfoModal({ open, onOpenChange }: ModelInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            BE Spectra - Model Architecture & Performance
          </DialogTitle>
          <DialogDescription>Two integrated AI models for cancer prediction and survival analysis</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Gene Classification Model */}
          <Card className="border-2 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge className="bg-accent text-white">Model 1</Badge>
                Gene Classification Model
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Graph Attention Network (GAT) for identifying cancer driver genes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm font-semibold mb-3">Architecture</p>
                <div className="space-y-2 ml-2">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold flex-shrink-0">
                      Layer 1
                    </span>
                    <div>
                      <p className="text-sm font-medium">Input Embedding & Attention</p>
                      <p className="text-xs text-muted-foreground">
                        Gene features extracted from PPI network topology and biological properties
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold flex-shrink-0">
                      Layer 2
                    </span>
                    <div>
                      <p className="text-sm font-medium">Multi-Head Attention Aggregation</p>
                      <p className="text-xs text-muted-foreground">
                        8 attention heads learning different aspects of gene neighborhood relationships
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold flex-shrink-0">
                      Layer 3
                    </span>
                    <div>
                      <p className="text-sm font-medium">Classification Head</p>
                      <p className="text-xs text-muted-foreground">
                        Binary classification: Cancer Driver vs. Normal Gene with confidence scores
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-semibold mb-2">Balanced Loss Function</p>
                  <p className="text-xs text-muted-foreground">
                    Weighted cross-entropy with focal loss to handle class imbalance in cancer driver genes
                  </p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-semibold mb-2">Data Augmentation</p>
                  <p className="text-xs text-muted-foreground">
                    Graph-based augmentation preserving network topology while expanding training samples
                  </p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-semibold mb-2">Regularization</p>
                  <p className="text-xs text-muted-foreground">
                    L2 regularization + dropout (0.5) to prevent overfitting on small cancer gene set
                  </p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-semibold mb-2">Hyperparameters</p>
                  <p className="text-xs text-muted-foreground">
                    Learning rate: 0.001, Batch size: 32, Epochs: 100 with early stopping
                  </p>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="text-sm font-semibold mb-3">Performance on Test Set (n=2,457 genes)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-card p-3 rounded border border-accent/30">
                    <p className="text-2xl font-bold text-accent">70.6%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-accent/30">
                    <p className="text-2xl font-bold text-accent">0.726</p>
                    <p className="text-xs text-muted-foreground">ROC-AUC</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-accent/30">
                    <p className="text-2xl font-bold text-accent">82.4%</p>
                    <p className="text-xs text-muted-foreground">Recall</p>
                  </div>
                  <div className="bg-card p-3 rounded border border-accent/30">
                    <p className="text-2xl font-bold text-accent">65.3%</p>
                    <p className="text-xs text-muted-foreground">Precision</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Survival Prediction Model */}
          <Card className="border-2 border-blue-500/50 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Model 2</Badge>
                Patient Survival Prediction Model
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                SurvivalGNN: Patient-specific predictions for clinical outcomes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  SurvivalGNN Architecture
                </p>
                <div className="space-y-2 ml-2 text-sm">
                  <div>
                    <p className="font-medium">Dataset</p>
                    <p className="text-xs text-muted-foreground">TCGA-BRCA with 1,098 patients</p>
                  </div>
                  <div>
                    <p className="font-medium">Input Integration</p>
                    <p className="text-xs text-muted-foreground">
                      Patient gene expression data + PPI edges (confidence threshold: 0.85)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Loss Function</p>
                    <p className="text-xs text-muted-foreground">
                      Cox partial likelihood - standard for survival analysis
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Graph Construction</p>
                    <p className="text-xs text-muted-foreground">
                      Patient-specific subgraph based on expressed genes with high-confidence interactions
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="text-sm font-semibold mb-3">Test Set Performance</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-card p-4 rounded border-2 border-blue-500/30">
                    <p className="text-3xl font-bold text-blue-600">0.74</p>
                    <p className="text-sm font-semibold text-foreground">C-Index</p>
                    <p className="text-xs text-muted-foreground">Concordance (higher is better)</p>
                  </div>
                  <div className="bg-card p-4 rounded border-2 border-blue-500/30">
                    <p className="text-3xl font-bold text-blue-600">0.158</p>
                    <p className="text-sm font-semibold text-foreground">Integrated Brier Score</p>
                    <p className="text-xs text-muted-foreground">Lower prediction error</p>
                  </div>
                  <div className="bg-card p-4 rounded border-2 border-green-500/30">
                    <p className="text-3xl font-bold text-green-600">+25%</p>
                    <p className="text-sm font-semibold text-foreground">Improvement</p>
                    <p className="text-xs text-muted-foreground">vs. focal loss baseline</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mt-3">
                <p className="text-sm font-bold text-white mb-2">Critical Finding - Network Validation</p>
                <p className="text-xs text-theme-muted">
                  <strong className="text-white">Ablation Study:</strong> Without PPI edges, C-index drops to 0.66 (from 0.74), confirming that
                  protein-protein interactions are essential for accurate survival predictions
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-semibold">Clinical Risk Stratification</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                    <p className="text-xs font-bold text-red-700">High Risk</p>
                    <p className="text-xs text-red-600">48-month survival: 18%</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                    <p className="text-xs font-bold text-yellow-700">Medium Risk</p>
                    <p className="text-xs text-yellow-600">48-month survival: 54%</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                    <p className="text-xs font-bold text-green-700">Low Risk</p>
                    <p className="text-xs text-green-600">48-month survival: 91%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Strategy */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-base">Training & Optimization</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">Balanced Loss Function</p>
                <p className="text-xs text-muted-foreground">
                  Weighted cross-entropy with focal loss to handle class imbalance in cancer driver genes
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Data Augmentation</p>
                <p className="text-xs text-muted-foreground">
                  Graph-based augmentation preserving network topology while expanding training samples
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Regularization</p>
                <p className="text-xs text-muted-foreground">
                  L2 regularization + dropout (0.5) to prevent overfitting on small cancer gene set
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Hyperparameters</p>
                <p className="text-xs text-muted-foreground">
                  Learning rate: 0.001, Batch size: 32, Epochs: 100 with early stopping
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-base">Performance on Test Set (n=2,457 genes)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">70.6%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">0.726</p>
                  <p className="text-xs text-muted-foreground">ROC-AUC</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">82.4%</p>
                  <p className="text-xs text-muted-foreground">Recall</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">65.3%</p>
                  <p className="text-xs text-muted-foreground">Precision</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Survival Prediction */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-base">Survival Prediction Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Cox Proportional Hazards Regression</p>
                <p className="text-xs text-muted-foreground">
                  Trained on TCGA-BRCA dataset (n=1,098 patients) integrating GNN predictions with gene expression
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="p-2 rounded bg-card/50 border border-border/50">
                  <p className="text-xs font-semibold">C-Index: 0.742</p>
                  <p className="text-xs text-muted-foreground">Concordance probability</p>
                </div>
                <div className="p-2 rounded bg-card/50 border border-border/50">
                  <p className="text-xs font-semibold">IBS: 0.158</p>
                  <p className="text-xs text-muted-foreground">Integrated Brier Score</p>
                </div>
                <div className="p-2 rounded bg-card/50 border border-border/50">
                  <p className="text-xs font-semibold">+12% vs Expression</p>
                  <p className="text-xs text-muted-foreground">Improvement over baseline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrichment Analysis */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-base">Pathway Enrichment & Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge className="mt-1">GO</Badge>
                <div>
                  <p className="text-sm font-semibold">Biological Process Enrichment</p>
                  <p className="text-xs text-muted-foreground">
                    Cell cycle regulation, DNA repair, apoptosis (p &lt; 1e-6)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="mt-1">KEGG</Badge>
                <div>
                  <p className="text-sm font-semibold">Canonical Pathway Analysis</p>
                  <p className="text-xs text-muted-foreground">
                    Purine metabolism, pyrimidine metabolism, signal transduction (p &lt; 1e-5)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="mt-1">Cancer</Badge>
                <div>
                  <p className="text-sm font-semibold">Cancer Gene Database Match</p>
                  <p className="text-xs text-muted-foreground">
                    86% of predicted drivers match COSMIC/CGC cancer-associated genes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datasets Used */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-base">Training Datasets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="text-sm">
                  <p className="font-semibold">PPI Network</p>
                  <p className="text-xs text-muted-foreground">
                    9,743 genes, 215,766 interactions (STRING, BioGRID, HI-III)
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Cancer Genes</p>
                  <p className="text-xs text-muted-foreground">721 confirmed cancer driver genes (COSMIC, CGC)</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Expression Data</p>
                  <p className="text-xs text-muted-foreground">TCGA-BRCA (1,098 patients), GEO datasets</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Validation</p>
                  <p className="text-xs text-muted-foreground">
                    5-fold cross-validation + independent test set (30% holdout)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
