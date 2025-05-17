"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProductImageUpload } from "@/components/products/product-image-upload"
import { ProductVariationsTable } from "@/components/products/product-variations-table"
import { ProductPricingCalculator } from "@/components/products/product-pricing-calculator"

// Dados de exemplo para categorias
const categories = [
  { id: "1", name: "Impressão Digital" },
  { id: "2", name: "Impressão Gráfica" },
  { id: "3", name: "Materiais" },
  { id: "4", name: "Serviços" },
  { id: "5", name: "Acabamentos" },
  { id: "6", name: "Brindes" },
]

// Dados de exemplo para fornecedores
const suppliers = [
  { id: "1", name: "Fornecedor A" },
  { id: "2", name: "Fornecedor B" },
  { id: "3", name: "Fornecedor C" },
]

// Dados de exemplo para um produto existente (para edição)
const sampleProduct = {
  id: "PROD-001",
  name: "Banner Lona 440g",
  sku: "BAN-440",
  description: "Banner em lona 440g com acabamento em ilhós, ideal para uso externo.",
  categoryId: "1",
  type: "product",
  price: 150.0,
  cost: 75.0,
  stock: 0,
  minStock: 5,
  supplierId: "1",
  hasVariations: true,
  variations: [
    { id: "var-1", name: "1m x 1m", price: 150.0, cost: 75.0 },
    { id: "var-2", name: "2m x 1m", price: 300.0, cost: 150.0 },
    { id: "var-3", name: "3m x 1m", price: 450.0, cost: 225.0 },
  ],
  status: "active",
  images: ["/placeholder.svg?height=200&width=300"],
  customFields: {
    width: true,
    height: true,
    unit: "m²",
    basePrice: 150.0,
  },
  notes: "Material de alta qualidade, resistente a intempéries.",
}

export function ProductForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Campos básicos
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [type, setType] = useState("product")
  const [status, setStatus] = useState("active")

  // Preços e estoque
  const [price, setPrice] = useState(0)
  const [cost, setCost] = useState(0)
  const [stock, setStock] = useState(0)
  const [minStock, setMinStock] = useState(0)
  const [supplierId, setSupplierId] = useState("")

  // Variações e personalização
  const [hasVariations, setHasVariations] = useState(false)
  const [variations, setVariations] = useState<any[]>([])
  const [customFields, setCustomFields] = useState({
    width: false,
    height: false,
    unit: "unid",
    basePrice: 0,
  })

  // Outros campos
  const [images, setImages] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  // Carregar dados do produto se estiver editando
  useEffect(() => {
    if (id) {
      // Aqui você faria uma chamada API para buscar os dados do produto
      // Simulando com dados de exemplo
      setName(sampleProduct.name)
      setSku(sampleProduct.sku)
      setDescription(sampleProduct.description)
      setCategoryId(sampleProduct.categoryId)
      setType(sampleProduct.type)
      setPrice(sampleProduct.price)
      setCost(sampleProduct.cost)
      setStock(sampleProduct.stock)
      setMinStock(sampleProduct.minStock)
      setSupplierId(sampleProduct.supplierId)
      setHasVariations(sampleProduct.hasVariations)
      setVariations(sampleProduct.variations)
      setStatus(sampleProduct.status)
      setImages(sampleProduct.images)
      setCustomFields(sampleProduct.customFields)
      setNotes(sampleProduct.notes)
    }
  }, [id])

  const handleAddVariation = () => {
    const newVariation = {
      id: `var-${variations.length + 1}`,
      name: "",
      price: price,
      cost: cost,
    }
    setVariations([...variations, newVariation])
  }

  const handleUpdateVariation = (updatedVariation: any) => {
    setVariations(
      variations.map((variation) => {
        if (variation.id === updatedVariation.id) {
          return updatedVariation
        }
        return variation
      }),
    )
  }

  const handleRemoveVariation = (variationId: string) => {
    setVariations(variations.filter((variation) => variation.id !== variationId))
  }

  const handleImageUpload = (imageUrl: string) => {
    setImages([...images, imageUrl])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Aqui você faria uma chamada API para salvar o produto
    // Simulando com um timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/produtos")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="pricing">Preços e Estoque</TabsTrigger>
          <TabsTrigger value="variations">Variações</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">
                    SKU <span className="text-destructive">*</span>
                  </Label>
                  <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">
                    Categoria <span className="text-destructive">*</span>
                  </Label>
                  <Select value={categoryId} onValueChange={setCategoryId} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">
                    Tipo <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="product" id="type-product" />
                      <Label htmlFor="type-product">Produto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="type-service" />
                      <Label htmlFor="type-service">Serviço</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="col-span-2 grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={status === "active"}
                      onCheckedChange={(checked) => setStatus(checked ? "active" : "inactive")}
                    />
                    <Label htmlFor="status">{status === "active" ? "Ativo" : "Inativo"}</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/produtos")}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => setActiveTab("pricing")}>
              Próximo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    Preço de Venda <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cost">Custo</Label>
                  <Input
                    id="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                  />
                </div>
                {type === "product" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Estoque Atual</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="minStock">Estoque Mínimo</Label>
                      <Input
                        id="minStock"
                        type="number"
                        min="0"
                        value={minStock}
                        onChange={(e) => setMinStock(Number(e.target.value))}
                      />
                    </div>
                  </>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Select value={supplierId} onValueChange={setSupplierId}>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                <Label>Produto Personalizável</Label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="custom-width"
                      checked={customFields.width}
                      onCheckedChange={(checked) => setCustomFields({ ...customFields, width: checked })}
                    />
                    <Label htmlFor="custom-width">Largura personalizável</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="custom-height"
                      checked={customFields.height}
                      onCheckedChange={(checked) => setCustomFields({ ...customFields, height: checked })}
                    />
                    <Label htmlFor="custom-height">Altura personalizável</Label>
                  </div>
                  {(customFields.width || customFields.height) && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="unit">Unidade de Medida</Label>
                        <Select
                          value={customFields.unit}
                          onValueChange={(value) => setCustomFields({ ...customFields, unit: value })}
                        >
                          <SelectTrigger id="unit">
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unid">Unidade</SelectItem>
                            <SelectItem value="m">Metro</SelectItem>
                            <SelectItem value="m²">Metro Quadrado</SelectItem>
                            <SelectItem value="cm">Centímetro</SelectItem>
                            <SelectItem value="cm²">Centímetro Quadrado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="basePrice">Preço Base (por {customFields.unit})</Label>
                        <Input
                          id="basePrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={customFields.basePrice}
                          onChange={(e) =>
                            setCustomFields({
                              ...customFields,
                              basePrice: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(customFields.width || customFields.height) && (
                <div className="mt-6">
                  <ProductPricingCalculator
                    width={customFields.width}
                    height={customFields.height}
                    unit={customFields.unit}
                    basePrice={customFields.basePrice}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
              Voltar
            </Button>
            <Button type="button" onClick={() => setActiveTab("variations")}>
              Próximo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="variations" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="has-variations" checked={hasVariations} onCheckedChange={setHasVariations} />
                  <Label htmlFor="has-variations">Este produto possui variações</Label>
                </div>
                {hasVariations && (
                  <Button type="button" onClick={handleAddVariation}>
                    Adicionar Variação
                  </Button>
                )}
              </div>

              {hasVariations ? (
                <ProductVariationsTable
                  variations={variations}
                  onUpdateVariation={handleUpdateVariation}
                  onRemoveVariation={handleRemoveVariation}
                />
              ) : (
                <div className="rounded-md border p-6 text-center">
                  <p className="text-muted-foreground">
                    Este produto não possui variações. Ative a opção acima para adicionar variações como tamanho, cor,
                    etc.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setActiveTab("pricing")}>
              Voltar
            </Button>
            <Button type="button" onClick={() => setActiveTab("images")}>
              Próximo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <ProductImageUpload images={images} onUpload={handleImageUpload} onRemove={handleRemoveImage} />

              <div className="mt-6 grid gap-2">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Informações adicionais sobre o produto, instruções especiais, etc."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setActiveTab("variations")}>
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : id ? "Atualizar Produto" : "Criar Produto"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
