"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProductVariation {
  id: string
  name: string
  price: number
  cost: number
  sku: string
  stock?: number
}

interface Product {
  id: string
  name: string
  variations: ProductVariation[]
}

// Dados de exemplo para um produto
const sampleProduct: Product = {
  id: "PROD-001",
  name: "Banner Lona 440g",
  variations: [
    { id: "var-1", name: "1m x 1m", price: 150.0, cost: 75.0, sku: "BAN-440-1X1" },
    { id: "var-2", name: "2m x 1m", price: 300.0, cost: 150.0, sku: "BAN-440-2X1" },
    { id: "var-3", name: "3m x 1m", price: 450.0, cost: 225.0, sku: "BAN-440-3X1" },
  ],
}

export function ProductVariations({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVariation, setEditingVariation] = useState<ProductVariation | null>(null)
  const [newVariation, setNewVariation] = useState<Partial<ProductVariation>>({
    name: "",
    price: 0,
    cost: 0,
    sku: "",
    stock: 0,
  })

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os dados do produto
    // Simulando com um timeout e dados de exemplo
    const fetchProduct = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProduct(sampleProduct)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const handleEditVariation = (variation: ProductVariation) => {
    setEditingVariation(variation)
    setNewVariation({
      name: variation.name,
      price: variation.price,
      cost: variation.cost,
      sku: variation.sku,
      stock: variation.stock,
    })
    setIsDialogOpen(true)
  }

  const handleAddVariation = () => {
    setEditingVariation(null)
    setNewVariation({
      name: "",
      price: 0,
      cost: 0,
      sku: "",
      stock: 0,
    })
    setIsDialogOpen(true)
  }

  const handleSaveVariation = () => {
    if (!product) return

    if (editingVariation) {
      // Atualizar variação existente
      const updatedVariations = product.variations.map((variation) =>
        variation.id === editingVariation.id
          ? {
              ...variation,
              name: newVariation.name || "",
              price: newVariation.price || 0,
              cost: newVariation.cost || 0,
              sku: newVariation.sku || "",
              stock: newVariation.stock,
            }
          : variation,
      )
      setProduct({ ...product, variations: updatedVariations })
    } else {
      // Criar nova variação
      const newId = `var-${product.variations.length + 1}`
      const variation: ProductVariation = {
        id: newId,
        name: newVariation.name || "",
        price: newVariation.price || 0,
        cost: newVariation.cost || 0,
        sku: newVariation.sku || "",
        stock: newVariation.stock,
      }
      setProduct({ ...product, variations: [...product.variations, variation] })
    }

    setIsDialogOpen(false)
    setEditingVariation(null)
    setNewVariation({
      name: "",
      price: 0,
      cost: 0,
      sku: "",
      stock: 0,
    })
  }

  const handleDeleteVariation = (variationId: string) => {
    if (!product) return

    const updatedVariations = product.variations.filter((variation) => variation.id !== variationId)
    setProduct({ ...product, variations: updatedVariations })
  }

  const calculateMargin = (price: number, cost: number) => {
    if (cost === 0) return 100
    return ((price - cost) / price) * 100
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando variações do produto...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!product) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Produto não encontrado.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variações de {product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.variations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma variação encontrada. Clique em "Adicionar Variação" para começar.
                  </TableCell>
                </TableRow>
              ) : (
                product.variations.map((variation) => (
                  <TableRow key={variation.id}>
                    <TableCell className="font-medium">{variation.name}</TableCell>
                    <TableCell>{variation.sku}</TableCell>
                    <TableCell>{formatCurrency(variation.price)}</TableCell>
                    <TableCell>{formatCurrency(variation.cost)}</TableCell>
                    <TableCell>{calculateMargin(variation.price, variation.cost).toFixed(2)}%</TableCell>
                    <TableCell>{variation.stock !== undefined ? variation.stock : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditVariation(variation)}>
                          <span className="sr-only">Editar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteVariation(variation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Total de variações: {product.variations.length}</p>
        <Button onClick={handleAddVariation}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Variação
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVariation ? "Editar Variação" : "Nova Variação"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={newVariation.name}
                onChange={(e) => setNewVariation({ ...newVariation, name: e.target.value })}
                placeholder="Ex: Tamanho P, Cor Azul, 1m x 1m"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={newVariation.sku}
                onChange={(e) => setNewVariation({ ...newVariation, sku: e.target.value })}
                placeholder="Ex: PROD-001-P"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newVariation.price}
                  onChange={(e) => setNewVariation({ ...newVariation, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cost">Custo</Label>
                <Input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newVariation.cost}
                  onChange={(e) => setNewVariation({ ...newVariation, cost: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Estoque</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={newVariation.stock}
                onChange={(e) => setNewVariation({ ...newVariation, stock: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveVariation} disabled={!newVariation.name}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
