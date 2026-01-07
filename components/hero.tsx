import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Banana decorations */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🍌</div>
      <div className="absolute top-40 right-20 text-8xl opacity-10 animate-float-delayed">🍌</div>
      <div className="absolute bottom-20 left-1/4 text-7xl opacity-15 animate-float">🍌</div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 text-sm font-medium">
          <span className="text-xl">🍌</span>
          <span>The AI model that delivers perfect results</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Transform Images with Simple Text
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
          Advanced AI-powered editor delivers consistent character editing and scene preservation. Experience the future
          of image editing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild className="text-lg px-8">
            <Link href="#editor">
              Start Editing
              <span className="ml-2">🍌</span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
            <Link href="#showcase">View Examples</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
