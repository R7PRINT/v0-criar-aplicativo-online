"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ProductVariation {
  id: string
  name: string
  price: number
  cost: number
}

interface ProductVariationsTableProps {
  variations: ProductVariation[]
  onUpdateVariation: (variation: ProductVariation) => void
  onRemoveVariation: (variationId: string) => void
}

export function ProductVariationsTable({
  variations,
  onUpdateVariation,
  onRemoveVariation,
}: ProductVariationsTableProps) {
  const handleNameChange = (variationId: string, name: string) => {
    const variation = variations.find((v) => v.id === variationId)
    if (!variation) return

    onUpdateVariation({
      ...variation,
      name,
    })
  }

  const handlePriceChange = (variationId: string, price: number) => {
    const variation = variations.find((v) => v.id === variationId)
    if (!variation) return

    onUpdateVariation({
      ...variation,
      price,
    })
  }

  const handleCostChange = (variationId: string, cost: number) => {
    const variation = variations.find((v) => v.id === variationId)
    if (!variation) return

    onUpdateVariation({
      ...variation,
      cost,
    })
  }

  const calculateMargin = (price: number, cost: number) => {
    if (cost === 0) return 100
    return ((price - cost) / price) * 100
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome da Variação</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Custo</TableHead>
            <TableHead>Margem</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhuma variação adicionada. Clique em "Adicionar Variação" para começar.
              </TableCell>
            </TableRow>
          ) : (
            variations.map((variation) => (
              <TableRow key={variation.id}>
                <TableCell>
                  <Input
                    value={variation.name}
                    onChange={(e) => handleNameChange(variation.id, e.target.value)}
                    placeholder="Ex: Tamanho P, Cor Azul"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variation.price}
                    onChange={(e) => handlePriceChange(variation.id, Number(e.target.value))}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variation.cost}
                    onChange={(e) => handleCostChange(variation.id, Number(e.target.value))}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>{calculateMargin(variation.price, variation.cost).toFixed(2)}%</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveVariation(variation.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover variação</span>
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
