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
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!image || !prompt) return
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
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
                      <p className="text-sm text-muted-foreground">Click to upload image (Max 10MB)</p>
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
                disabled={!image || !prompt || isProcessing}
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

            <div className="border-2 border-dashed border-border rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              {isProcessing ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-bounce">🍌</div>
                  <p className="text-muted-foreground">Processing your image...</p>
                </div>
              ) : image && prompt ? (
                <div className="text-center space-y-4">
                  <div className="relative w-full h-64">
                    <Image src={image || "/placeholder.svg"} alt="Result" fill className="object-contain rounded" />
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Result
                  </Button>
                </div>
              ) : (
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
