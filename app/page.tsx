import { Hero } from "@/components/hero"
import { Editor } from "@/components/editor"
import { Features } from "@/components/features"
import { Showcase } from "@/components/showcase"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Editor />
      <Features />
      <Showcase />
      <Testimonials />
      <FAQ />
    </main>
  )
}
