import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-yellow-500/20 transition-all duration-500 shadow-lg">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent font-extrabold text-xl tracking-tight">
              BE Spectra
            </span>
          </Link>

          <div className="flex items-center gap-10">
            <div className="hidden md:flex gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "Methodology", href: "/methodology" },
                { name: "Models", href: "/models" },
                { name: "Analysis", href: "/upload" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/50 hover:text-yellow-400 transition-all duration-300 tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link href="/upload">
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-500 rounded-lg px-6"
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
