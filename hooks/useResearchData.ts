"use client"

export function useResearchData() {
  return {
    // Network Construction Data
    totalGenes: 9743,
    interactions: 215766,
    dataSources: "HI-III-19, STRING v11, BioGRID, IntAct",
    featuresPerGene: 14,
    classImbalance: "14.2:1 (93.4% normal, 6.6% cancer genes)",

    // Spectral Graph Theory
    spectralCentralityFormula: "C_spec(g) = Σ |v_k(g)|² / (λ_k + ε)",
    keyProperties: [
      "Zero eigenvalue: multiplicity = connected components",
      "Algebraic connectivity (λ₂): network robustness",
      "Fiedler vector: graph partitioning & communities",
      "Spectral gap (λ₂ - λ₁): mixing time & bottlenecks",
    ],

    // GAT Model Architecture
    modelLayers: "3-layer GAT with multi-head attention",
    mechanism: "Learned attention weights on neighbor contributions",
    balancedSamplingStrategy: "Equal batch composition (50 cancer + 50 normal per batch)",
    regularization: "Dropout (0.3), Batch normalization, Residual connections",

    // Performance Metrics
    performanceMetrics: [
      { name: "Accuracy", value: "70.6%" },
      { name: "Recall", value: "69.4%" },
      { name: "ROC-AUC", value: "0.726" },
      { name: "Specificity", value: "70.7%" },
      { name: "Precision", value: "14.5%" },
    ],

    // Survival Prediction Model
    survivalPredictionModel: "SurvivalGNN",
    inputSurvivalData: "TCGA-BRCA cohort (1,098 patients) + gene expression + PPI network",
    architectureSurvival: "GNN layers → Global pooling → Survival prediction layer",
    lossFunctionSurvival: "Negative Log Partial Likelihood (Cox Loss)",

    // Survival Validation Performance
    validationPerformanceSurvival: [
      { name: "C-Index", value: "0.74" },
      { name: "IBS Score", value: "0.16" },
      { name: "Network Benefit", value: "+12% vs Expression Only" },
    ],

    // Enriched Pathways
    enrichedPathways: {
      kegg: [
        "Purine metabolism (FDR < 10⁻⁸)",
        "Pyrimidine metabolism (FDR < 10⁻⁵)",
        "DNA repair (FDR < 10⁻⁷)",
        "Cell cycle regulation (FDR < 10⁻⁶)",
      ],
      go: [
        "Nucleotide metabolic process",
        "DNA replication (FDR < 10⁻⁸)",
        "Apoptotic signaling (FDR < 10⁻⁵)",
        "Protein ubiquitination (FDR < 10⁻⁶)",
      ],
    },

    // Clinical Translation
    clinicalTranslation:
      "Model-predicted risk scores stratify patients into actionable clinical tiers (Stable, Standard Care, Emergency). Integration with mutation profiles (BRCA1, TP53 expression) enables precision medicine recommendations. Longitudinal monitoring tracks treatment response through cohort risk distribution shifts.",
  }
}
