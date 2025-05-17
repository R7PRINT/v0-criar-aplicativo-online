"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ProductImageUploadProps {
  images: string[]
  onUpload: (imageUrl: string) => void
  onRemove: (index: number) => void
}

export function ProductImageUpload({ images, onUpload, onRemove }: ProductImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // Em um ambiente real, você enviaria o arquivo para um servidor
    // e receberia a URL da imagem como resposta
    // Aqui estamos simulando com um placeholder
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        // Simulando upload com um placeholder
        onUpload(`/placeholder.svg?height=300&width=400&text=${file.name}`)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Em um ambiente real, você enviaria o arquivo para um servidor
    // e receberia a URL da imagem como resposta
    // Aqui estamos simulando com um placeholder
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        // Simulando upload com um placeholder
        onUpload(`/placeholder.svg?height=300&width=400&text=${file.name}`)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
        <p className="mb-1 font-medium">Arraste e solte imagens aqui</p>
        <p className="text-sm text-muted-foreground">ou clique para selecionar arquivos</p>
        <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <div className="aspect-square w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Imagem do produto ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
