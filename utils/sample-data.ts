export const SAMPLE_PPI_DATA = `Gene1,Gene2,Interaction_Score,Source
TP53,MDM2,0.95,STRING
TP53,BRCA1,0.88,BioGRID
TP53,EGFR,0.82,HI-III
BRCA1,RAD51,0.91,STRING
BRCA1,BARD1,0.87,BioGRID
EGFR,SOS1,0.92,STRING
EGFR,GRB2,0.89,HI-III
MYC,MAX,0.85,STRING
MYC,MIZ1,0.79,BioGRID
RB1,E2F1,0.88,STRING
RB1,CDK4,0.84,BioGRID
TP53,RB1,0.76,STRING
BRCA1,EGFR,0.71,HI-III
MYC,BRCA1,0.68,BioGRID
EGFR,MYC,0.73,STRING
RAD51,BRCA2,0.83,BioGRID
E2F1,CCNE1,0.81,STRING
CDK4,CCND1,0.79,HI-III
SOS1,HRAS,0.86,BioGRID
GRB2,SOS1,0.84,STRING`

export const SAMPLE_EXPRESSION_DATA = `Gene,Patient_1,Patient_2,Patient_3,Patient_4,Patient_5,Patient_6,Patient_7,Patient_8,Patient_9,Patient_10
TP53,2.5,3.1,2.8,3.4,2.9,3.2,2.6,3.5,2.7,3.3
BRCA1,1.2,0.9,1.5,1.1,0.8,1.3,1.0,1.4,0.9,1.2
EGFR,4.3,5.1,4.8,5.5,4.6,5.2,4.9,5.3,4.7,5.0
MYC,3.8,4.2,3.9,4.5,4.0,4.3,3.7,4.6,3.9,4.4
RB1,1.4,1.8,1.6,1.9,1.5,1.7,1.3,2.0,1.5,1.8
RAD51,0.6,0.8,0.7,0.9,0.6,0.8,0.5,1.0,0.7,0.9
BARD1,0.9,1.1,1.0,1.2,0.9,1.1,0.8,1.3,1.0,1.2
MAX,2.1,2.4,2.2,2.5,2.0,2.3,2.1,2.6,2.2,2.4
E2F1,1.7,2.0,1.8,2.1,1.6,1.9,1.7,2.2,1.8,2.0
CDK4,1.3,1.6,1.4,1.7,1.2,1.5,1.3,1.8,1.4,1.6`

export const downloadSamplePPI = () => {
  const element = document.createElement("a")
  const file = new Blob([SAMPLE_PPI_DATA], { type: "text/csv" })
  element.href = URL.createObjectURL(file)
  element.download = "sample_ppi_network.csv"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const downloadSampleExpression = () => {
  const element = document.createElement("a")
  const file = new Blob([SAMPLE_EXPRESSION_DATA], { type: "text/csv" })
  element.href = URL.createObjectURL(file)
  element.download = "sample_gene_expression.csv"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const loadSampleData = async (type: "ppi" | "expression"): Promise<File> => {
  const data = type === "ppi" ? SAMPLE_PPI_DATA : SAMPLE_EXPRESSION_DATA
  const fileName = type === "ppi" ? "sample_ppi_network.csv" : "sample_gene_expression.csv"
  return new File([data], fileName, { type: "text/csv" })
}
