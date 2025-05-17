"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Pencil, Trash2, Tag, BarChart } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados de exemplo para produtos
const products = [
  {
    id: "PROD-001",
    name: "Banner Lona 440g",
    sku: "BAN-440",
    category: "Impressão Digital",
    price: 150.0,
    cost: 75.0,
    stock: 0,
    type: "product",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: true,
  },
  {
    id: "PROD-002",
    name: "Adesivo Vinil",
    sku: "ADV-001",
    category: "Impressão Digital",
    price: 45.0,
    cost: 20.0,
    stock: 50,
    type: "product",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: true,
  },
  {
    id: "PROD-003",
    name: "Impressão A3 Colorida",
    sku: "IMP-A3C",
    category: "Impressão Gráfica",
    price: 15.0,
    cost: 5.0,
    stock: 200,
    type: "product",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: false,
  },
  {
    id: "PROD-004",
    name: "Placa PVC 3mm",
    sku: "PVC-3MM",
    category: "Materiais",
    price: 80.0,
    cost: 40.0,
    stock: 25,
    type: "product",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: false,
  },
  {
    id: "PROD-005",
    name: "Cartão de Visita",
    sku: "CV-4X0",
    category: "Impressão Gráfica",
    price: 0.5,
    cost: 0.2,
    stock: 1000,
    type: "product",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: true,
  },
  {
    id: "SERV-001",
    name: "Instalação de Comunicação Visual",
    sku: "SERV-INST",
    category: "Serviços",
    price: 200.0,
    cost: 100.0,
    stock: null,
    type: "service",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: false,
  },
  {
    id: "SERV-002",
    name: "Design Gráfico",
    sku: "SERV-DG",
    category: "Serviços",
    price: 120.0,
    cost: 60.0,
    stock: null,
    type: "service",
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: false,
  },
  {
    id: "PROD-006",
    name: "Faixa Impressa",
    sku: "FI-001",
    category: "Impressão Digital",
    price: 90.0,
    cost: 45.0,
    stock: 0,
    type: "product",
    status: "inactive",
    image: "/placeholder.svg?height=40&width=40",
    hasVariations: true,
  },
]

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "product":
        return <Badge variant="outline">Produto</Badge>
      case "service":
        return <Badge variant="secondary">Serviço</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getStockStatus = (stock: number | null, type: string) => {
    if (type === "service") return null

    if (stock === null) return null

    if (stock <= 0) {
      return <Badge variant="destructive">Sem estoque</Badge>
    } else if (stock < 10) {
      return <Badge variant="warning">Estoque baixo</Badge>
    } else {
      return <Badge variant="success">{stock} unid.</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedProducts.length === products.length && products.length > 0}
                onChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Produto</TableHead>
            <TableHead className="hidden md:table-cell">SKU</TableHead>
            <TableHead className="hidden md:table-cell">Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="hidden lg:table-cell">Tipo</TableHead>
            <TableHead className="hidden lg:table-cell">Estoque</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className={product.status === "inactive" ? "opacity-60" : ""}>
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={product.image || "/placeholder.svg"} alt={product.name} />
                    <AvatarFallback>{product.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{product.name}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{product.sku}</TableCell>
              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell className="hidden lg:table-cell">{getTypeBadge(product.type)}</TableCell>
              <TableCell className="hidden lg:table-cell">{getStockStatus(product.stock, product.type)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/produtos/${product.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/produtos/${product.id}/editar`}>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                    </Link>
                    {product.hasVariations && (
                      <Link href={`/produtos/${product.id}/variacoes`}>
                        <DropdownMenuItem>
                          <Tag className="mr-2 h-4 w-4" />
                          Variações
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <Link href={`/produtos/${product.id}/estatisticas`}>
                      <DropdownMenuItem>
                        <BarChart className="mr-2 h-4 w-4" />
                        Estatísticas
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
