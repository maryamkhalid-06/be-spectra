"""
BE Spectra - Pathway Enrichment Analysis PDF Generator
Generates professional PDF reports locally on your PC

Usage:
    python generate_pdf.py

Requirements:
    pip install reportlab
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.graphics.shapes import Drawing, Rect, String
from reportlab.graphics.charts.barcharts import VerticalBarChart
from datetime import datetime
import os
import math

# ==================== PATHWAY DATA ====================
# You can modify this data with your actual analysis results
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

# Ocean Depths theme colors
COLORS = {
    "primary": colors.HexColor("#3b82f6"),      # Deep Blue
    "secondary": colors.HexColor("#06b6d4"),    # Cyan
    "accent": colors.HexColor("#0ea5e9"),       # Sky Blue
    "dark": colors.HexColor("#0f172a"),         # Dark background
    "text": colors.HexColor("#334155"),         # Text color
    "light_text": colors.HexColor("#64748b"),   # Light text
    "white": colors.white,
    "light_bg": colors.HexColor("#f8fafc"),
}


def create_header_style():
    """Create custom paragraph styles"""
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='MainTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=COLORS["primary"],
        spaceAfter=6,
        alignment=TA_CENTER,
    ))
    
    styles.add(ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=COLORS["light_text"],
        alignment=TA_CENTER,
        spaceAfter=20,
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeader',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=COLORS["primary"],
        spaceBefore=20,
        spaceAfter=10,
    ))
    
    styles.add(ParagraphStyle(
        name='BodyText',
        parent=styles['Normal'],
        fontSize=10,
        textColor=COLORS["text"],
        spaceAfter=8,
    ))
    
    styles.add(ParagraphStyle(
        name='SmallText',
        parent=styles['Normal'],
        fontSize=9,
        textColor=COLORS["light_text"],
    ))
    
    return styles


def create_bar_chart(data, width=450, height=200):
    """Create a bar chart for pathway enrichment"""
    drawing = Drawing(width, height)
    
    # Calculate -log10(p-value) for visualization
    neg_log_values = [-math.log10(d["pValue"]) for d in data]
    
    chart = VerticalBarChart()
    chart.x = 50
    chart.y = 50
    chart.width = width - 80
    chart.height = height - 80
    
    chart.data = [neg_log_values]
    chart.categoryAxis.categoryNames = [d["pathway"][:15] + "..." if len(d["pathway"]) > 15 else d["pathway"] for d in data]
    
    # Styling
    chart.bars[0].fillColor = COLORS["primary"]
    chart.bars[0].strokeColor = COLORS["secondary"]
    chart.bars[0].strokeWidth = 1
    
    chart.valueAxis.valueMin = 0
    chart.valueAxis.valueMax = max(neg_log_values) * 1.1
    chart.valueAxis.valueStep = 2
    
    chart.categoryAxis.labels.angle = 45
    chart.categoryAxis.labels.boxAnchor = 'ne'
    chart.categoryAxis.labels.fontSize = 8
    
    chart.valueAxis.labels.fontSize = 8
    chart.valueAxis.labelTextFormat = '%.1f'
    
    drawing.add(chart)
    
    # Add Y-axis label
    label = String(10, height/2, "-log10(p-value)", fontSize=9, textAnchor='middle')
    label.angle = 90
    drawing.add(label)
    
    return drawing


def create_pathway_table(data):
    """Create a formatted table for pathway data"""
    # Table headers
    table_data = [
        ["#", "Pathway", "p-Value", "-log10(p)", "Genes"]
    ]
    
    # Add data rows
    for idx, item in enumerate(data, 1):
        neg_log = -math.log10(item["pValue"])
        table_data.append([
            str(idx),
            item["pathway"],
            f"{item['pValue']:.2e}",
            f"{neg_log:.2f}",
            str(item["genes"])
        ])
    
    # Create table
    table = Table(table_data, colWidths=[30, 180, 80, 70, 50])
    
    # Style the table
    table.setStyle(TableStyle([
        # Header styling
        ('BACKGROUND', (0, 0), (-1, 0), COLORS["primary"]),
        ('TEXTCOLOR', (0, 0), (-1, 0), COLORS["white"]),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        
        # Data rows styling
        ('BACKGROUND', (0, 1), (-1, -1), COLORS["light_bg"]),
        ('TEXTCOLOR', (0, 1), (-1, -1), COLORS["text"]),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('ALIGN', (0, 1), (0, -1), 'CENTER'),
        ('ALIGN', (2, 1), (-1, -1), 'CENTER'),
        
        # Alternating row colors
        *[('BACKGROUND', (0, i), (-1, i), colors.HexColor("#f1f5f9")) for i in range(2, len(table_data), 2)],
        
        # Borders
        ('GRID', (0, 0), (-1, -1), 0.5, COLORS["secondary"]),
        ('LINEBELOW', (0, 0), (-1, 0), 2, COLORS["primary"]),
        
        # Padding
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    return table


def create_summary_table(data):
    """Create a summary statistics table"""
    total_genes = sum(d["genes"] for d in data)
    most_significant = min(data, key=lambda x: x["pValue"])
    
    summary_data = [
        ["Metric", "Value"],
        ["Total Pathways Analyzed", str(len(data))],
        ["Total Genes Mapped", str(total_genes)],
        ["Most Significant Pathway", most_significant["pathway"]],
        ["Lowest p-Value", f"{most_significant['pValue']:.2e}"],
    ]
    
    table = Table(summary_data, colWidths=[180, 200])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLORS["secondary"]),
        ('TEXTCOLOR', (0, 0), (-1, 0), COLORS["white"]),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -1), COLORS["light_bg"]),
        ('TEXTCOLOR', (0, 1), (-1, -1), COLORS["text"]),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('GRID', (0, 0), (-1, -1), 0.5, COLORS["secondary"]),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    
    return table


def generate_pdf(output_path="pathway_enrichment_report.pdf", data=None):
    """Generate the complete PDF report"""
    if data is None:
        data = ENRICHMENT_DATA
    
    # Create the PDF document
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )
    
    styles = create_header_style()
    story = []
    
    # ===== HEADER =====
    story.append(Paragraph("🧬 BE Spectra", styles['MainTitle']))
    story.append(Paragraph("Pathway Enrichment Analysis Report", styles['Subtitle']))
    story.append(Paragraph(
        f"Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}",
        styles['SmallText']
    ))
    story.append(Spacer(1, 20))
    
    # ===== INTRODUCTION =====
    story.append(Paragraph("📊 Analysis Overview", styles['SectionHeader']))
    story.append(Paragraph(
        "This report presents the results of KEGG pathway enrichment analysis performed on "
        "cancer driver genes. The analysis identifies significantly enriched biological pathways "
        "associated with the input gene set. Lower p-values indicate stronger statistical significance.",
        styles['BodyText']
    ))
    story.append(Spacer(1, 15))
    
    # ===== SUMMARY STATISTICS =====
    story.append(Paragraph("📈 Summary Statistics", styles['SectionHeader']))
    story.append(create_summary_table(data))
    story.append(Spacer(1, 20))
    
    # ===== BAR CHART =====
    story.append(Paragraph("📉 Pathway Significance Chart", styles['SectionHeader']))
    story.append(Paragraph(
        "Bar chart showing -log10(p-value) for each enriched pathway. "
        "Higher bars indicate greater statistical significance.",
        styles['SmallText']
    ))
    story.append(Spacer(1, 10))
    story.append(create_bar_chart(data))
    story.append(Spacer(1, 20))
    
    # ===== DETAILED TABLE =====
    story.append(Paragraph("📋 Detailed Pathway Results", styles['SectionHeader']))
    story.append(create_pathway_table(data))
    story.append(Spacer(1, 20))
    
    # ===== BIOLOGICAL INTERPRETATION =====
    story.append(Paragraph("🔬 Biological Interpretation", styles['SectionHeader']))
    
    interpretations = [
        "<b>Purine/Pyrimidine metabolism:</b> Essential for DNA synthesis and cell proliferation, "
        "commonly dysregulated in rapidly dividing cancer cells.",
        
        "<b>DNA repair pathways:</b> Critical for genomic stability. Defects lead to mutation "
        "accumulation and cancer progression.",
        
        "<b>Cell cycle regulation:</b> Core oncogenic mechanisms controlling cell division. "
        "Disruption enables uncontrolled proliferation.",
        
        "<b>Apoptosis:</b> Programmed cell death pathway. Cancer cells often evade apoptosis "
        "to enable tumor survival.",
    ]
    
    for interp in interpretations:
        story.append(Paragraph(f"• {interp}", styles['BodyText']))
    
    story.append(Spacer(1, 20))
    
    # ===== FOOTER =====
    story.append(Paragraph(
        "─" * 60,
        styles['SmallText']
    ))
    story.append(Paragraph(
        "© 2025 BE Spectra Research Platform | Cancer Network Analysis",
        ParagraphStyle(
            name='Footer',
            parent=styles['SmallText'],
            alignment=TA_CENTER,
        )
    ))
    
    # Build PDF
    doc.build(story)
    
    return output_path


def main():
    """Main function to generate the PDF"""
    print("=" * 50)
    print("  BE Spectra - PDF Report Generator")
    print("=" * 50)
    print()
    
    # Generate timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"pathway_enrichment_report_{timestamp}.pdf"
    
    print(f"📄 Generating PDF report...")
    
    try:
        output_path = generate_pdf(output_file)
        full_path = os.path.abspath(output_path)
        
        print(f"✅ PDF generated successfully!")
        print(f"📁 Location: {full_path}")
        print()
        print("You can now open and print this PDF file.")
        
    except ImportError:
        print("❌ Error: reportlab library not installed.")
        print()
        print("Please install it by running:")
        print("  pip install reportlab")
        return
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")
        return


if __name__ == "__main__":
    main()
