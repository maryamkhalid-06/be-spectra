"""
BE Spectra - QR Code Generator
Generates QR code for your live URL

Run: python generate_qr_auto.py
"""

import os
import urllib.request
import urllib.parse
import webbrowser
from datetime import datetime

# ==================== YOUR URL ====================
# Change this to your actual tunnel URL
# Example: "https://abc123.loca.lt" or your localhost.run URL

URL = "https://d341fbaf9f78db45-156-208-65-108.serveousercontent.com"  # Your serveo.net tunnel URL

# ==================================================

QR_SIZE = 500


def main():
    print("=" * 50)
    print("  BE Spectra - QR Code Generator")
    print("=" * 50)
    print()
    print(f"🔗 URL: {URL}")
    print()
    
    if "lhr.life" not in URL and "loca.lt" not in URL and "localhost" in URL:
        print("⚠️  Warning: localhost URLs won't work when scanned!")
        print("   Use your tunnel URL instead.")
        print()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Download PNG
    png_file = f"qr_code_{timestamp}.png"
    api_url = f"https://api.qrserver.com/v1/create-qr-code/?size={QR_SIZE}x{QR_SIZE}&data={urllib.parse.quote(URL)}"
    
    print("📥 Downloading QR code...")
    try:
        urllib.request.urlretrieve(api_url, png_file)
        print(f"✅ PNG saved: {os.path.abspath(png_file)}")
    except Exception as e:
        print(f"❌ Error: {e}")
        return
    
    # Create printable HTML
    html_file = f"qr_printable_{timestamp}.html"
    
    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>QR Code - BE Spectra</title>
    <style>
        body {{
            font-family: 'Segoe UI', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f8fafc;
        }}
        .container {{
            text-align: center;
            padding: 50px;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }}
        h1 {{ color: #3b82f6; font-size: 28px; margin-bottom: 5px; }}
        .subtitle {{ color: #64748b; margin-bottom: 30px; }}
        .qr-box {{
            background: white;
            border: 4px solid #3b82f6;
            border-radius: 20px;
            padding: 20px;
            display: inline-block;
        }}
        .url {{
            margin-top: 25px;
            padding: 12px 20px;
            background: #f1f5f9;
            border-radius: 10px;
            font-size: 12px;
            color: #64748b;
            word-break: break-all;
            max-width: 350px;
        }}
        .footer {{ margin-top: 25px; color: #94a3b8; font-size: 13px; }}
        .print-btn {{
            margin-top: 25px;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
        }}
        @media print {{
            .print-btn {{ display: none; }}
            body {{ background: white; }}
            .container {{ box-shadow: none; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🧬 BE Spectra</h1>
        <p class="subtitle">Scan to access the platform</p>
        <div class="qr-box">
            <img src="{api_url}" width="280" height="280" />
        </div>
        <div class="url">{URL}</div>
        <p class="footer">Cancer Network Analysis Platform</p>
        <button class="print-btn" onclick="window.print()">🖨️ Print</button>
    </div>
</body>
</html>"""
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ HTML saved: {os.path.abspath(html_file)}")
    print()
    print("📂 Opening in browser...")
    webbrowser.open(f'file://{os.path.abspath(html_file)}')
    print()
    print("✨ Done! Scan the QR code with your phone to test it.")


if __name__ == "__main__":
    main()
