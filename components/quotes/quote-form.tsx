"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuoteItemsTable } from "@/components/quotes/quote-items-table"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Tipos para os itens do orçamento
export interface QuoteItem {
  id: string
  product: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

// Dados de exemplo para clientes
const clients = [
  { id: "1", name: "Empresa ABC Ltda" },
  { id: "2", name: "João Silva ME" },
  { id: "3", name: "Gráfica Rápida" },
  { id: "4", name: "Maria Comunicação Visual" },
  { id: "5", name: "Pedro Oliveira Design" },
]

// Dados de exemplo para um orçamento existente (para edição)
const sampleQuote = {
  id: "ORC-001",
  clientId: "1",
  date: new Date(),
  validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  items: [
    {
      id: "item-1",
      product: "Banner Lona 440g",
      description: "Banner em lona 440g com acabamento em ilhós",
      quantity: 2,
      unitPrice: 150,
      total: 300,
    },
    {
      id: "item-2",
      product: "Adesivo Vinil",
      description: "Adesivo em vinil recorte eletrônico",
      quantity: 5,
      unitPrice: 45,
      total: 225,
    },
  ],
  notes: "Entrega em até 5 dias úteis após aprovação.",
  subtotal: 525,
  discount: 25,
  total: 500,
}

export function QuoteForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clientId, setClientId] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [validUntil, setValidUntil] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() + 1)))
  const [items, setItems] = useState<QuoteItem[]>([])
  const [notes, setNotes] = useState("")
  const [discount, setDiscount] = useState(0)

  // Carregar dados do orçamento se estiver editando
  useEffect(() => {
    if (id) {
      // Aqui você faria uma chamada API para buscar os dados do orçamento
      // Simulando com dados de exemplo
      setClientId(sampleQuote.clientId)
      setDate(sampleQuote.date)
      setValidUntil(sampleQuote.validUntil)
      setItems(sampleQuote.items)
      setNotes(sampleQuote.notes)
      setDiscount(sampleQuote.discount)
    }
  }, [id])

  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: `item-${items.length + 1}`,
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (updatedItem: QuoteItem) => {
    setItems(
      items.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() - discount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Aqui você faria uma chamada API para salvar o orçamento
    // Simulando com um timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/orcamentos")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="client">
                  Cliente <span className="text-destructive">*</span>
                </Label>
                <Select value={clientId} onValueChange={setClientId} required>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">
                  Data <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="validUntil">
                  Validade <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !validUntil && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {validUntil ? (
                        format(validUntil, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={validUntil}
                      onSelect={(date) => date && setValidUntil(date)}
                      initialFocus
                      locale={ptBR}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Itens do Orçamento</h3>
              <Button type="button" onClick={handleAddItem}>
                Adicionar Item
              </Button>
            </div>
            <QuoteItemsTable items={items} onUpdateItem={handleUpdateItem} onRemoveItem={handleRemoveItem} />

            <div className="mt-6 space-y-4">
              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="discount">Desconto:</Label>
                    <div className="w-24">
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={discount}
                        onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Informações adicionais, condições de pagamento, prazos de entrega..."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/orcamentos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || items.length === 0 || !clientId}>
            {isSubmitting ? "Salvando..." : id ? "Atualizar Orçamento" : "Criar Orçamento"}
          </Button>
        </div>
      </div>
    </form>
  )
}
