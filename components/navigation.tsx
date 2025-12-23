"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Methodology", href: "/methodology" },
    { name: "Models", href: "/models" },
    { name: "Analysis", href: "/upload" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between min-h-[5rem] py-2 gap-y-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all duration-500 shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold text-lg sm:text-xl tracking-tight whitespace-nowrap">
              BE Spectra
            </span>
          </Link>

          {/* Navigation Links & Button */}
          <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-end flex-1 ml-2">
            <div className="flex items-center gap-1 sm:gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[10px] sm:text-sm font-medium text-white/60 hover:text-primary hover:bg-white/5 px-2 py-1.5 rounded-md transition-all duration-300 tracking-wide whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link href="/upload" className="shrink-0">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold shadow-lg transition-all duration-500 rounded-lg px-3 sm:px-6 text-xs sm:text-sm h-8 sm:h-9"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
