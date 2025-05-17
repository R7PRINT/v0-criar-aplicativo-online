"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { OrderItem } from "./order-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para produtos
const products = [
  { id: "1", name: "Banner Lona 440g", price: 150 },
  { id: "2", name: "Adesivo Vinil", price: 45 },
  { id: "3", name: "Impressão A3 Colorida", price: 15 },
  { id: "4", name: "Placa PVC 3mm", price: 80 },
  { id: "5", name: "Cartão de Visita", price: 0.5 },
]

interface OrderItemsTableProps {
  items: OrderItem[]
  onUpdateItem: (item: OrderItem) => void
  onRemoveItem: (itemId: string) => void
}

export function OrderItemsTable({ items, onUpdateItem, onRemoveItem }: OrderItemsTableProps) {
  const handleProductChange = (itemId: string, productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const updatedItem: OrderItem = {
      ...item,
      product: product.name,
      unitPrice: product.price,
      total: item.quantity * product.price,
    }

    onUpdateItem(updatedItem)
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const updatedItem: OrderItem = {
      ...item,
      quantity,
      total: quantity * item.unitPrice,
    }

    onUpdateItem(updatedItem)
  }

  const handleUnitPriceChange = (itemId: string, unitPrice: number) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const updatedItem: OrderItem = {
      ...item,
      unitPrice,
      total: item.quantity * unitPrice,
    }

    onUpdateItem(updatedItem)
  }

  const handleDescriptionChange = (itemId: string, description: string) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return

    const updatedItem: OrderItem = {
      ...item,
      description,
    }

    onUpdateItem(updatedItem)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="hidden md:table-cell">Descrição</TableHead>
            <TableHead>Qtd</TableHead>
            <TableHead>Valor Unit.</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhum item adicionado. Clique em "Adicionar Item" para começar.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Select
                    value={products.find((p) => p.name === item.product)?.id || ""}
                    onValueChange={(value) => handleProductChange(item.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Input
                    value={item.description}
                    onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                    placeholder="Descrição do item"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleUnitPriceChange(item.id, Number.parseFloat(e.target.value) || 0)}
                    className="w-24"
                  />
                </TableCell>
                <TableCell className="font-medium">{formatCurrency(item.total)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover item</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
