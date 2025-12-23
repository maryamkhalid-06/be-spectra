import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { ArrowRight, Network, Zap, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 animate-slide-up shadow-[0_0_20px_var(--primary-hex,rgba(139,92,246,0.15))]">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-sm text-primary font-semibold tracking-wider uppercase">BE Spectra Research Platform</span>
            </div>

            <h1
              className="text-6xl md:text-7xl font-extrabold text-balance mb-6 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
                Decode Cancer Networks
              </span>
              <br />
              <span className="text-white">with Advanced AI</span>
            </h1>

            <p
              className="text-lg text-white/60 text-balance mb-8 max-w-3xl mx-auto animate-slide-up font-light"
              style={{ animationDelay: "0.2s" }}
            >
              Leverage spectral graph theory and graph neural networks to identify cancer driver genes, predict patient
              outcomes, and uncover therapeutic targets in protein-protein interaction networks.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-28 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/upload">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_30px_var(--primary-hex,rgba(139,92,246,0.3))] hover:shadow-[0_0_40px_var(--primary-hex,rgba(139,92,246,0.5))] transition-all duration-500 text-base font-bold rounded-xl px-8"
                >
                  Start Analysis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/methodology">
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-md hover:shadow-lg transition-all duration-500 text-base font-semibold bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-primary/50 rounded-xl px-8"
                >
                  Learn Our Approach
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  icon: Network,
                  title: "Network Analysis",
                  desc: "9,743 genes from STRING, BioGRID, HI-III databases analyzed with spectral methods",
                },
                {
                  icon: Zap,
                  title: "AI Predictions",
                  desc: "70.6% accuracy cancer driver classification with 0.726 ROC-AUC score",
                },
                {
                  icon: BarChart3,
                  title: "Clinical Insights",
                  desc: "Patient survival prediction (C-index 0.74) and risk stratification dashboard",
                },
              ].map((feature, idx) => (
                <Card
                  key={idx}
                  className="glass-card border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-500 hover:scale-105 group animate-scale-in"
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-500 border border-white/10">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-white font-bold tracking-tight">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/50 leading-relaxed font-light">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-slide-up">Comprehensive Research Platform</h2>
            <p className="text-muted-foreground text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Everything you need for advanced biological network analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Network,
                title: "PPI Network Integration",
                desc: "Upload protein-protein interaction data from multiple databases (STRING, HI-III, BioGRID)",
              },
              {
                icon: BarChart3,
                title: "Spectral Analysis",
                desc: "Compute spectral centrality, detect modules, and identify network bottlenecks",
              },
              {
                icon: Zap,
                title: "GNN Predictions",
                desc: "Graph attention networks for cancer driver gene prediction with high recall",
              },
              {
                icon: Network,
                title: "Enrichment Analysis",
                desc: "GO and KEGG pathway enrichment with functional validation",
              },
              {
                icon: BarChart3,
                title: "Survival Prediction",
                desc: "Patient risk stratification with C-index metrics on TCGA data",
              },
              {
                icon: Zap,
                title: "Clinical Dashboards",
                desc: "Interactive visualizations and actionable clinical recommendations",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_30px_var(--primary-hex,rgba(139,92,246,0.05))] transition-all duration-500 animate-slide-up group"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-all duration-500 border border-white/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white text-xl mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6 animate-slide-up tracking-tight">Ready to Analyze Cancer Networks?</h2>
          <p className="text-xl text-white/50 mb-12 animate-slide-up font-light" style={{ animationDelay: "0.1s" }}>
            Upload your PPI data and start discovering cancer driver genes with BE Spectra's AI-powered analysis
            platform.
          </p>
          <Link href="/upload" className="inline-block animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="gap-3 bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_50px_var(--primary-hex,rgba(139,92,246,0.2))] hover:shadow-[0_0_60px_var(--primary-hex,rgba(139,92,246,0.4))] transition-all duration-500 text-lg font-bold rounded-xl px-12 py-7"
            >
              Begin Analysis <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-20 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold mb-6 text-primary tracking-tight">Research</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li>
                  <Link href="/methodology" className="hover:text-primary transition-colors duration-300 font-light">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors duration-300 font-light">
                    Publications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-primary tracking-tight">Platform</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li>
                  <Link href="/upload" className="hover:text-primary transition-colors duration-300 font-light">
                    Upload Data
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors duration-300 font-light">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-primary tracking-tight">Resources</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors duration-300 font-light">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors duration-300 font-light">
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-primary tracking-tight">Connect</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors duration-300 font-light">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors duration-300 font-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-xs text-white/20 uppercase tracking-widest font-medium">
            <p>&copy; 2025 BE Spectra. Advanced biological systems biology research.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
