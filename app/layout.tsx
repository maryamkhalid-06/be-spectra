import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BE Spectra - Cancer Network Analysis",
  description: "Spectral Graph Theory and AI for Biological Network Analysis in Cancer",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

import BackgroundManager from "@/components/backgrounds/BackgroundManager"
import ThemeSwitcher from "@/components/theme-switcher"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased text-white`}>
        <BackgroundManager>
          {children}
          <ThemeSwitcher />
        </BackgroundManager>
        <Analytics />
      </body>
    </html>
  )
}
