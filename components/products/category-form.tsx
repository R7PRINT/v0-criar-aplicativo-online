"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export function CategoryForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [slug, setSlug] = useState("")

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setSlug(generateSlug(newName))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Aqui você faria uma chamada API para salvar a categoria
    // Simulando com um timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/produtos/categorias")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input id="name" value={name} onChange={handleNameChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
              <p className="text-xs text-muted-foreground">
                O slug é usado para URLs amigáveis. Exemplo: produtos/categoria/impressao-digital
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/produtos/categorias")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Categoria"}
        </Button>
      </div>
    </form>
  )
}
