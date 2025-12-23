"use client"

// PDF Export utility for analysis reports
// Uses browser's print-to-PDF functionality with custom styling

interface ExportOptions {
    title: string
    generationDate: Date
    validityDays: number
    content: string
}

export function generatePDFReport(options: ExportOptions): void {
    const { title, generationDate, validityDays, content } = options

    const expiryDate = new Date(generationDate)
    expiryDate.setDate(expiryDate.getDate() + validityDays)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
        alert('Please allow popups to export PDF')
        return
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%);
          color: #e0e0e0;
          min-height: 100vh;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 16px;
        }
        .header h1 {
          font-size: 28px;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .header .subtitle {
          color: #a0a0a0;
          font-size: 14px;
        }
        .validity-banner {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));
          border: 2px solid #06b6d4;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .validity-banner .badge {
          display: inline-block;
          background: #06b6d4;
          color: #000;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .validity-banner .dates {
          font-size: 13px;
          color: #b0b0b0;
        }
        .validity-banner .expiry {
          font-size: 16px;
          color: #06b6d4;
          font-weight: bold;
          margin-top: 8px;
        }
        .content {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 30px;
          margin-top: 30px;
        }
        .section-title {
          font-size: 20px;
          color: #06b6d4;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(6, 182, 212, 0.3);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        th {
          background: rgba(6, 182, 212, 0.2);
          color: #06b6d4;
          font-weight: 600;
        }
        tr:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #606060;
          font-size: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        @media print {
          body { background: white; color: #333; }
          .header { background: #f0f9ff; border-color: #0891b2; }
          .header h1 { -webkit-text-fill-color: #0891b2; }
          .validity-banner { background: #f0f9ff; }
          .content { background: #f8fafc; border-color: #e2e8f0; }
          th { background: #e0f2fe; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🧬 ${title}</h1>
        <p class="subtitle">BE Spectra Research Platform - Cancer Network Analysis</p>
      </div>
      
      <div class="validity-banner">
        <div class="badge">✓ VALID REPORT</div>
        <div class="dates">
          Generated: ${formatDate(generationDate)}
        </div>
        <div class="expiry">
          Valid until: ${formatDate(expiryDate)} (${validityDays} days)
        </div>
      </div>
      
      <div class="content">
        ${content}
      </div>
      
      <div class="footer">
        <p>© 2025 BE Spectra Research Platform | This report is valid for ${validityDays} days from generation date</p>
        <p>For verification, contact: research@bespectra.ai</p>
      </div>
    </body>
    </html>
  `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print()
        }, 500)
    }
}

// Helper to generate pathway enrichment specific content
export function generatePathwayEnrichmentContent(data: Array<{
    pathway: string
    pValue: number
    genes: number
}>): string {
    const rows = data.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.pathway}</strong></td>
      <td>${item.pValue.toExponential(2)}</td>
      <td>-${Math.log10(item.pValue).toFixed(2)}</td>
      <td>${item.genes}</td>
    </tr>
  `).join('')

    return `
    <h3 class="section-title">📊 KEGG Pathway Enrichment Results</h3>
    <p style="margin-bottom: 20px; color: #a0a0a0;">
      Statistical analysis of enriched biological pathways identified from cancer driver genes.
      Lower p-values indicate stronger statistical significance.
    </p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Pathway Name</th>
          <th>p-Value</th>
          <th>-log10(p)</th>
          <th>Genes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    
    <div style="margin-top: 30px; padding: 20px; background: rgba(6, 182, 212, 0.1); border-radius: 12px;">
      <h4 style="color: #06b6d4; margin-bottom: 10px;">📈 Analysis Summary</h4>
      <ul style="color: #b0b0b0; line-height: 1.8;">
        <li>Total pathways analyzed: ${data.length}</li>
        <li>Most significant: ${data[0]?.pathway || 'N/A'} (p=${data[0]?.pValue.toExponential(2) || 'N/A'})</li>
        <li>Total genes mapped: ${data.reduce((sum, d) => sum + d.genes, 0)}</li>
      </ul>
    </div>
  `
}
