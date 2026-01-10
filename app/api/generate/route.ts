import { NextResponse } from 'next/server'

// Node runtime for Buffer usage
export const runtime = 'nodejs'

type GenerateBody = {
  prompt: string
  imageDataUrl?: string
  imageUrl?: string
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.APICORE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing APICORE_API_KEY' }, { status: 500 })
    }

    const { prompt, imageDataUrl, imageUrl } = (await req.json()) as GenerateBody
    if (!prompt || (!imageDataUrl && !imageUrl)) {
      return NextResponse.json({ error: 'Missing prompt or image' }, { status: 400 })
    }

    // Use the data URL directly as image_url; many OpenAI-style APIs accept data URLs
    const payload = {
      model: 'gemini-2.5-flash-image',
      stream: false,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl ?? imageDataUrl } },
          ],
        },
      ],
    }

    const resp = await fetch('https://api.apicore.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: 'API_ERROR', detail: text }, { status: 502 })
    }

    const data: any = await resp.json()

    // Attempt to extract image URLs from a few possible shapes
    const images: string[] = []
    try {
      const content = data?.choices?.[0]?.message?.content
      if (Array.isArray(content)) {
        for (const item of content) {
          if (item?.type === 'image_url' && item?.image_url?.url) images.push(item.image_url.url)
          // Some providers return base64 under image_url.b64 or item.b64
          if (item?.image_url?.b64) images.push(`data:image/png;base64,${item.image_url.b64}`)
          if (item?.b64_json) images.push(`data:image/png;base64,${item.b64_json}`)
        }
      }
      // Some providers return a markdown string in content
      if (typeof content === 'string') {
        const md = content as string
        const match = md.match(/!\[[^\]]*\]\(([^)]+)\)/)
        if (match && match[1]) {
          images.push(match[1])
        }
      }
      // Alternative shapes
      if (data?.data && Array.isArray(data.data)) {
        for (const d of data.data) {
          if (d?.url) images.push(d.url)
          if (d?.b64_json) images.push(`data:image/png;base64,${d.b64_json}`)
        }
      }
    } catch {}

    if (!images.length) {
      // As a fallback, pass through any text response for debugging
      return NextResponse.json({ images: [], raw: data })
    }

    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
