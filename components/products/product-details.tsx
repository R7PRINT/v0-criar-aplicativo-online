"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Pencil, Tag, BarChart, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductStockHistory } from "@/components/products/product-stock-history"
import { ProductSalesChart } from "@/components/products/product-sales-chart"
import { ProductImageGallery } from "@/components/products/product-image-gallery"

interface ProductVariation {
  id: string
  name: string
  price: number
  cost: number
}

interface Product {
  id: string
  name: string
  sku: string
  description: string
  category: string
  type: "product" | "service"
  price: number
  cost: number
  stock: number | null
  minStock: number
  supplier: string
  hasVariations: boolean
  variations: ProductVariation[]
  status: "active" | "inactive"
  images: string[]
  customFields: {
    width: boolean
    height: boolean
    unit: string
    basePrice: number
  }
  notes?: string
}

// Dados de exemplo para um produto
const sampleProduct: Product = {
  id: "PROD-001",
  name: "Banner Lona 440g",
  sku: "BAN-440",
  description: "Banner em lona 440g com acabamento em ilhós, ideal para uso externo.",
  category: "Impressão Digital",
  type: "product",
  price: 150.0,
  cost: 75.0,
  stock: 0,
  minStock: 5,
  supplier: "Fornecedor A",
  hasVariations: true,
  variations: [
    { id: "var-1", name: "1m x 1m", price: 150.0, cost: 75.0 },
    { id: "var-2", name: "2m x 1m", price: 300.0, cost: 150.0 },
    { id: "var-3", name: "3m x 1m", price: 450.0, cost: 225.0 },
  ],
  status: "active",
  images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  customFields: {
    width: true,
    height: true,
    unit: "m²",
    basePrice: 150.0,
  },
  notes: "Material de alta qualidade, resistente a intempéries.",
}

export function ProductDetails({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

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

  const getTypeBadge = (type: "product" | "service") => {
    switch (type) {
      case "product":
        return <Badge variant="outline">Produto</Badge>
      case "service":
        return <Badge variant="secondary">Serviço</Badge>
    }
  }

  const getStatusBadge = (status: "active" | "inactive") => {
    switch (status) {
      case "active":
        return <Badge variant="success">Ativo</Badge>
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>
    }
  }

  const getStockStatus = (stock: number | null, minStock: number) => {
    if (stock === null) return null

    if (stock <= 0) {
      return <Badge variant="destructive">Sem estoque</Badge>
    } else if (stock < minStock) {
      return <Badge variant="warning">Estoque baixo</Badge>
    } else {
      return <Badge variant="success">{stock} unid.</Badge>
    }
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
            <p>Carregando detalhes do produto...</p>
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          {getTypeBadge(product.type)}
          {getStatusBadge(product.status)}
          {product.type === "product" && getStockStatus(product.stock, product.minStock)}
        </div>
        <div className="flex gap-2">
          <Link href={`/produtos/${id}/variacoes`}>
            <Button variant="outline">
              <Tag className="mr-2 h-4 w-4" />
              Variações
            </Button>
          </Link>
          <Link href={`/produtos/${id}/estatisticas`}>
            <Button variant="outline">
              <BarChart className="mr-2 h-4 w-4" />
              Estatísticas
            </Button>
          </Link>
          <Link href={`/produtos/${id}/editar`}>
            <Button>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="variations">Variações</TabsTrigger>
          <TabsTrigger value="stock">Estoque</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <ProductImageGallery images={product.images} />
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-muted-foreground">SKU</dt>
                      <dd>{product.sku}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Categoria</dt>
                      <dd>{product.category}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-medium text-muted-foreground">Descrição</dt>
                      <dd className="mt-1 whitespace-pre-line">{product.description}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Preço de Venda</dt>
                      <dd className="font-bold">{formatCurrency(product.price)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Custo</dt>
                      <dd>{formatCurrency(product.cost)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Margem</dt>
                      <dd>{calculateMargin(product.price, product.cost).toFixed(2)}%</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Fornecedor</dt>
                      <dd>{product.supplier}</dd>
                    </div>
                    {product.type === "product" && (
                      <>
                        <div>
                          <dt className="font-medium text-muted-foreground">Estoque Atual</dt>
                          <dd>{product.stock !== null ? product.stock : "N/A"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-muted-foreground">Estoque Mínimo</dt>
                          <dd>{product.minStock}</dd>
                        </div>
                      </>
                    )}
                    {(product.customFields.width || product.customFields.height) && (
                      <div className="sm:col-span-2">
                        <dt className="font-medium text-muted-foreground">Personalização</dt>
                        <dd className="mt-1">
                          <div className="space-y-1">
                            {product.customFields.width && <p>Largura personalizável</p>}
                            {product.customFields.height && <p>Altura personalizável</p>}
                            <p>
                              Preço base: {formatCurrency(product.customFields.basePrice)} por{" "}
                              {product.customFields.unit}
                            </p>
                          </div>
                        </dd>
                      </div>
                    )}
                    {product.notes && (
                      <div className="sm:col-span-2">
                        <dt className="font-medium text-muted-foreground">Observações</dt>
                        <dd className="mt-1 whitespace-pre-line">{product.notes}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="variations">
          {product.hasVariations ? (
            <Card>
              <CardHeader>
                <CardTitle>Variações do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Nome</th>
                        <th className="p-2 text-left font-medium">Preço</th>
                        <th className="p-2 text-left font-medium">Custo</th>
                        <th className="p-2 text-left font-medium">Margem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variations.map((variation) => (
                        <tr key={variation.id} className="border-b">
                          <td className="p-2">{variation.name}</td>
                          <td className="p-2">{formatCurrency(variation.price)}</td>
                          <td className="p-2">{formatCurrency(variation.cost)}</td>
                          <td className="p-2">{calculateMargin(variation.price, variation.cost).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex h-40 items-center justify-center">
                  <p className="text-muted-foreground">Este produto não possui variações.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="stock">
          {product.type === "product" ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Histórico de Estoque</CardTitle>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Ajustar Estoque
                </Button>
              </CardHeader>
              <CardContent>
                <ProductStockHistory productId={id} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex h-40 items-center justify-center">
                  <p className="text-muted-foreground">Controle de estoque não disponível para serviços.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductSalesChart productId={id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
