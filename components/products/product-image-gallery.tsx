"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <Card className="overflow-hidden">
        <div className="aspect-square w-full bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Sem imagens</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square w-full">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Imagem do produto"
          fill
          className="object-contain"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-16 w-16 overflow-hidden rounded border-2 ${
                index === currentImage ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image src={image || "/placeholder.svg"} alt={`Miniatura ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </Card>
  )
}
