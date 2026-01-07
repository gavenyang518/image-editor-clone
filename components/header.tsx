import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="font-bold text-xl">AI Image Editor</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#editor" className="text-sm hover:text-accent transition-colors">
            Editor
          </Link>
          <Link href="#features" className="text-sm hover:text-accent transition-colors">
            Features
          </Link>
          <Link href="#showcase" className="text-sm hover:text-accent transition-colors">
            Showcase
          </Link>
          <Link href="#faq" className="text-sm hover:text-accent transition-colors">
            FAQ
          </Link>
        </nav>
        <Button size="sm">Get Started</Button>
      </div>
    </header>
  )
}
