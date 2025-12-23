"""
BE Spectra - Pathway Enrichment Analysis Report Generator
Generates HTML reports that can be printed to PDF from your browser

Usage:
    python generate_report.py

No additional libraries required - uses only Python standard library
"""

import os
import math
from datetime import datetime
import webbrowser

# ==================== PATHWAY DATA ====================
# Modify this data with your actual analysis results
ENRICHMENT_DATA = [
    {"pathway": "Purine metabolism", "pValue": 1.2e-8, "genes": 45},
    {"pathway": "DNA repair", "pValue": 3.4e-7, "genes": 38},
    {"pathway": "Cell cycle regulation", "pValue": 8.9e-6, "genes": 52},
    {"pathway": "Pyrimidine metabolism", "pValue": 2.1e-5, "genes": 41},
    {"pathway": "Signal transduction", "pValue": 5.6e-4, "genes": 67},
    {"pathway": "Apoptosis", "pValue": 1.3e-3, "genes": 35},
    {"pathway": "Protein phosphorylation", "pValue": 2.8e-3, "genes": 48},
    {"pathway": "RNA processing", "pValue": 4.2e-3, "genes": 29},
]


def generate_html_report(data=None, output_path="pathway_report.html"):
    """Generate an HTML report that can be printed to PDF"""
    
    if data is None:
        data = ENRICHMENT_DATA
    
    # Calculate statistics
    total_genes = sum(d["genes"] for d in data)
    most_significant = min(data, key=lambda x: x["pValue"])
    max_neg_log = max(-math.log10(d["pValue"]) for d in data)
    
    # Generate table rows
    table_rows = ""
    for idx, item in enumerate(data, 1):
        neg_log = -math.log10(item["pValue"])
        bar_width = (neg_log / max_neg_log) * 100
        color = "#3b82f6" if idx % 2 == 1 else "#06b6d4"
        
        table_rows += f"""
        <tr>
            <td style="text-align: center; font-weight: bold;">{idx}</td>
            <td><strong>{item["pathway"]}</strong></td>
            <td style="text-align: center;">{item["pValue"]:.2e}</td>
            <td style="text-align: center;">{neg_log:.2f}</td>
            <td style="text-align: center; font-weight: bold; color: {color};">{item["genes"]}</td>
            <td style="padding: 8px;">
                <div style="background: linear-gradient(90deg, {color}, #0ea5e9); width: {bar_width}%; height: 20px; border-radius: 4px;"></div>
            </td>
        </tr>
        """
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BE Spectra - Pathway Enrichment Analysis Report</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            color: #334155;
            padding: 40px;
            min-height: 100vh;
        }}
        
        .container {{
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            overflow: hidden;
        }}
        
        .header {{
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }}
        
        .header h1 {{
            font-size: 32px;
            margin-bottom: 10px;
        }}
        
        .header .subtitle {{
            font-size: 16px;
            opacity: 0.9;
        }}
        
        .header .date {{
            font-size: 12px;
            opacity: 0.7;
            margin-top: 15px;
        }}
        
        .content {{
            padding: 40px;
        }}
        
        .section {{
            margin-bottom: 30px;
        }}
        
        .section-title {{
            font-size: 20px;
            color: #3b82f6;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        
        .stat-card {{
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }}
        
        .stat-card .value {{
            font-size: 28px;
            font-weight: bold;
            color: #3b82f6;
        }}
        
        .stat-card .label {{
            font-size: 12px;
            color: #64748b;
            margin-top: 5px;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }}
        
        th {{
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            padding: 15px 10px;
            text-align: left;
            font-weight: 600;
        }}
        
        td {{
            padding: 12px 10px;
            border-bottom: 1px solid #e2e8f0;
        }}
        
        tr:nth-child(even) {{
            background: #f8fafc;
        }}
        
        tr:hover {{
            background: #f0f9ff;
        }}
        
        .interpretation {{
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            margin-top: 15px;
        }}
        
        .interpretation ul {{
            list-style: none;
            padding: 0;
        }}
        
        .interpretation li {{
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
        }}
        
        .interpretation li:last-child {{
            border-bottom: none;
        }}
        
        .interpretation strong {{
            color: #3b82f6;
        }}
        
        .footer {{
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
            border-top: 1px solid #e2e8f0;
        }}
        
        .print-btn {{
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
        }}
        
        .print-btn:hover {{
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }}
        
        @media print {{
            body {{
                background: white;
                padding: 0;
            }}
            
            .container {{
                box-shadow: none;
                border-radius: 0;
            }}
            
            .print-btn {{
                display: none;
            }}
            
            .header {{
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
            
            th {{
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
        }}
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    
    <div class="container">
        <div class="header">
            <h1>🧬 BE Spectra</h1>
            <p class="subtitle">Pathway Enrichment Analysis Report</p>
            <p class="date">Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">📊 Summary Statistics</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="value">{len(data)}</div>
                        <div class="label">Total Pathways</div>
                    </div>
                    <div class="stat-card">
                        <div class="value">{total_genes}</div>
                        <div class="label">Total Genes Mapped</div>
                    </div>
                    <div class="stat-card">
                        <div class="value">{most_significant['pValue']:.1e}</div>
                        <div class="label">Lowest p-Value</div>
                    </div>
                    <div class="stat-card">
                        <div class="value">{most_significant['pathway'][:12]}...</div>
                        <div class="label">Most Significant</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">📋 Pathway Enrichment Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 40px;">#</th>
                            <th style="width: 180px;">Pathway</th>
                            <th style="width: 90px; text-align: center;">p-Value</th>
                            <th style="width: 80px; text-align: center;">-log10(p)</th>
                            <th style="width: 60px; text-align: center;">Genes</th>
                            <th>Significance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table_rows}
                    </tbody>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔬 Biological Interpretation</h2>
                <div class="interpretation">
                    <ul>
                        <li><strong>Purine/Pyrimidine metabolism:</strong> Essential for DNA synthesis and cell proliferation, commonly dysregulated in rapidly dividing cancer cells.</li>
                        <li><strong>DNA repair pathways:</strong> Critical for genomic stability. Defects lead to mutation accumulation and cancer progression.</li>
                        <li><strong>Cell cycle regulation:</strong> Core oncogenic mechanisms controlling cell division. Disruption enables uncontrolled proliferation.</li>
                        <li><strong>Apoptosis:</strong> Programmed cell death pathway. Cancer cells often evade apoptosis to enable tumor survival.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 BE Spectra Research Platform | Cancer Network Analysis</p>
            <p>For inquiries: research@bespectra.ai</p>
        </div>
    </div>
</body>
</html>"""
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return os.path.abspath(output_path)


def main():
    """Main function to generate the report"""
    print("=" * 50)
    print("  BE Spectra - Report Generator")
    print("=" * 50)
    print()
    
    # Generate timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"pathway_enrichment_report_{timestamp}.html"
    
    print("📄 Generating HTML report...")
    
    try:
        output_path = generate_html_report(output_path=output_file)
        
        print(f"✅ Report generated successfully!")
        print(f"📁 Location: {output_path}")
        print()
        print("Opening in browser...")
        print()
        print("💡 To save as PDF:")
        print("   1. Click the 'Print / Save as PDF' button")
        print("   2. Or press Ctrl+P")
        print("   3. Select 'Save as PDF' as the destination")
        print()
        
        # Open in default browser
        webbrowser.open(f'file://{output_path}')
        
    except Exception as e:
        print(f"❌ Error generating report: {e}")
        return


if __name__ == "__main__":
    main()
