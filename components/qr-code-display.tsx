"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Copy, Check, ExternalLink } from "lucide-react"

interface QRCodeDisplayProps {
    url?: string
    title?: string
}

export default function QRCodeDisplay({ url, title = "Share this page" }: QRCodeDisplayProps) {
    const [currentUrl, setCurrentUrl] = useState("")
    const [copied, setCopied] = useState(false)
    const [qrSize] = useState(300)

    useEffect(() => {
        if (url) {
            setCurrentUrl(url)
        } else if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }
    }, [url])

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(currentUrl)}`

    const handleDownload = () => {
        // Open QR code in new tab for download
        window.open(qrApiUrl, '_blank')
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        if (!printWindow) return

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Code - BE Spectra</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f8fafc;
          }
          .container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          h1 { color: #3b82f6; margin-bottom: 10px; font-size: 24px; }
          .subtitle { color: #64748b; margin-bottom: 30px; font-size: 14px; }
          img {
            border: 4px solid #3b82f6;
            border-radius: 16px;
            padding: 10px;
            background: white;
          }
          .url {
            margin-top: 20px;
            font-size: 11px;
            color: #94a3b8;
            word-break: break-all;
            max-width: 350px;
          }
          .footer { margin-top: 25px; font-size: 13px; color: #64748b; }
          @media print {
            body { background: white; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🧬 BE Spectra</h1>
          <p class="subtitle">Scan to access the platform</p>
          <img src="${qrApiUrl}" alt="QR Code" width="280" height="280" />
          <p class="url">${currentUrl}</p>
          <p class="footer">Cancer Network Analysis Platform</p>
        </div>
        <script>window.onload = function() { setTimeout(() => window.print(), 500); }</script>
      </body>
      </html>
    `)
        printWindow.document.close()
    }

    if (!currentUrl) return null

    return (
        <Card className="glass-card border-white/10 hover:border-primary/30 transition-all duration-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <QrCode className="w-5 h-5 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                {/* QR Code Image */}
                <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
                    <img
                        src={qrApiUrl}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="rounded-lg"
                    />
                </div>

                {/* URL Display */}
                <div className="w-full p-3 bg-white/5 rounded-xl border border-white/10 mb-4">
                    <p className="text-xs text-white/50 text-center break-all">{currentUrl}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap justify-center">
                    <Button
                        onClick={handleDownload}
                        size="sm"
                        className="gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                    >
                        <Download className="w-4 h-4" />
                        Download PNG
                    </Button>

                    <Button
                        onClick={handlePrint}
                        size="sm"
                        className="gap-2 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Print
                    </Button>

                    <Button
                        onClick={handleCopy}
                        size="sm"
                        className="gap-2 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy URL"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
