"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload, Sparkles, Download } from "lucide-react"
import Image from "next/image"

export function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setImageUrl("")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if ((!image && !imageUrl) || !prompt) return
    setIsProcessing(true)
    setError(null)
    setResults([])
    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageDataUrl: image || undefined, imageUrl: imageUrl || undefined }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.error || 'Failed to generate')
      if (Array.isArray(data?.images) && data.images.length > 0) {
        setResults(data.images)
      } else {
        // Fallback: if API returns raw content, we just show a message
        setError('No images returned. Check API response.')
        console.log('API raw response', data?.raw)
      }
    } catch (e: any) {
      setError(e?.message || 'Unknown error')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section id="editor" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get Started</h2>
          <p className="text-xl text-muted-foreground">Try The AI Editor</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Experience the power of natural language image editing. Transform any photo with simple text commands
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Prompt Engine</h3>
            <p className="text-sm text-muted-foreground mb-6">Transform your image with AI-powered editing</p>

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Upload Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
                >
                  {image ? (
                    <div className="relative w-full h-48">
                      <Image src={image || "/placeholder.svg"} alt="Uploaded" fill className="object-contain rounded" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload image (Max 10MB) or paste a public image URL below</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Optional Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Or Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/your-image.png"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value)
                    if (e.target.value) setImage(null)
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Main Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform your image..."
                  className="min-h-32 resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={(!image && !imageUrl) || !prompt || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Now
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Output Gallery</h3>
            <p className="text-sm text-muted-foreground mb-6">Your ultra-fast AI creations appear here instantly</p>

            <div className="border-2 border-dashed border-border rounded-lg p-8 min-h-[400px]">
              {isProcessing && (
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-bounce">🍌</div>
                  <p className="text-muted-foreground">Processing your image...</p>
                </div>
              )}

              {!isProcessing && error && (
                <div className="text-center text-red-600 text-sm">{error}</div>
              )}

              {!isProcessing && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((url, idx) => (
                    <div key={idx} className="relative w-full aspect-square overflow-hidden rounded">
                      {/* Use native img to avoid Next remote domain restrictions */}
                      <img src={url} alt={`Result ${idx + 1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}

              {!isProcessing && results.length === 0 && !error && (
                <div className="text-center space-y-2">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg font-medium">Ready for instant generation</p>
                  <p className="text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
