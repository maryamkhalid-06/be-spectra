"""
BE Spectra - QR Code Generator
Generates QR codes locally on your PC for printing

Usage:
    python generate_qr.py

No pip install needed - uses online API to generate QR codes
"""

import os
import urllib.request
import webbrowser
from datetime import datetime

# ==================== CONFIGURATION ====================
# Change this URL to your website/tunnel URL
DEFAULT_URL = "https://fuzzy-bushes-retire.loca.lt"

# QR Code size (pixels)
QR_SIZE = 500


def generate_qr_image(url=None, output_path=None):
    """Download QR code image from API"""
    if url is None:
        url = DEFAULT_URL
    
    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"qr_code_{timestamp}.png"
    
    # Use QR Server API (free, no API key needed)
    api_url = f"https://api.qrserver.com/v1/create-qr-code/?size={QR_SIZE}x{QR_SIZE}&data={urllib.parse.quote(url)}"
    
    print(f"📥 Downloading QR code for: {url}")
    
    try:
        urllib.request.urlretrieve(api_url, output_path)
        return os.path.abspath(output_path)
    except Exception as e:
        print(f"❌ Error downloading QR code: {e}")
        return None


def generate_qr_html(url=None, output_path=None):
    """Generate a printable HTML page with QR code"""
    if url is None:
        url = DEFAULT_URL
    
    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"qr_printable_{timestamp}.html"
    
    qr_api_url = f"https://api.qrserver.com/v1/create-qr-code/?size={QR_SIZE}x{QR_SIZE}&data={urllib.parse.quote(url)}"
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BE Spectra - QR Code</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
        }}
        
        .container {{
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            padding: 50px;
            text-align: center;
            max-width: 500px;
        }}
        
        .logo {{
            font-size: 48px;
            margin-bottom: 10px;
        }}
        
        h1 {{
            font-size: 28px;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }}
        
        .subtitle {{
            color: #64748b;
            font-size: 14px;
            margin-bottom: 30px;
        }}
        
        .qr-container {{
            background: white;
            border: 4px solid #3b82f6;
            border-radius: 20px;
            padding: 20px;
            display: inline-block;
            margin-bottom: 25px;
        }}
        
        .qr-container img {{
            display: block;
            width: 280px;
            height: 280px;
        }}
        
        .url {{
            background: #f1f5f9;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 12px;
            color: #64748b;
            word-break: break-all;
            margin-bottom: 25px;
        }}
        
        .footer {{
            color: #94a3b8;
            font-size: 12px;
        }}
        
        .print-btn {{
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            transition: transform 0.2s;
        }}
        
        .print-btn:hover {{
            transform: translateY(-2px);
        }}
        
        .generated {{
            color: #94a3b8;
            font-size: 11px;
            margin-top: 20px;
        }}
        
        @media print {{
            body {{
                background: white;
                padding: 20px;
            }}
            
            .container {{
                box-shadow: none;
            }}
            
            .print-btn {{
                display: none;
            }}
            
            .qr-container {{
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🧬</div>
        <h1>BE Spectra</h1>
        <p class="subtitle">Cancer Network Analysis Platform</p>
        
        <div class="qr-container">
            <img src="{qr_api_url}" alt="QR Code" />
        </div>
        
        <div class="url">{url}</div>
        
        <p class="footer">Scan this QR code to access the platform</p>
        
        <button class="print-btn" onclick="window.print()">🖨️ Print QR Code</button>
        
        <p class="generated">Generated: {datetime.now().strftime('%B %d, %Y at %H:%M')}</p>
    </div>
</body>
</html>"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return os.path.abspath(output_path)


def main():
    """Main function"""
    print("=" * 50)
    print("  BE Spectra - QR Code Generator")
    print("=" * 50)
    print()
    
    # Ask for URL or use default
    print(f"Default URL: {DEFAULT_URL}")
    user_input = input("Enter URL (or press Enter for default): ").strip()
    
    if user_input:
        url = user_input
    else:
        url = DEFAULT_URL
    
    print()
    print("Choose output format:")
    print("  1. PNG Image (saves QR code as image file)")
    print("  2. Printable HTML (opens in browser for printing)")
    print("  3. Both")
    print()
    
    choice = input("Enter choice (1/2/3) [default: 3]: ").strip() or "3"
    
    print()
    
    if choice in ["1", "3"]:
        png_path = generate_qr_image(url)
        if png_path:
            print(f"✅ PNG saved: {png_path}")
    
    if choice in ["2", "3"]:
        html_path = generate_qr_html(url)
        if html_path:
            print(f"✅ HTML saved: {html_path}")
            print("📖 Opening in browser...")
            webbrowser.open(f'file://{html_path}')
    
    print()
    print("Done! You can now print or share your QR code.")


if __name__ == "__main__":
    import urllib.parse
    main()
