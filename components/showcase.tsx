import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with optimized neural engine",
    badge: "AI Speed",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using advanced technology",
    badge: "AI Speed",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Delivers photorealistic results at lightning speed",
    badge: "AI Speed",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with AI",
    badge: "AI Speed",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Showcase</h2>
          <p className="text-xl text-muted-foreground">Lightning-Fast AI Creations</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">See what our AI generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-8xl opacity-30 group-hover:scale-110 transition-transform">🍌</div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">Experience the power of AI yourself</p>
          <Button size="lg" asChild>
            <Link href="#editor">Try AI Editor Generator</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
