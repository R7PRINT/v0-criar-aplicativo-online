"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderItemsTable } from "@/components/orders/order-items-table"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Tipos para os itens do pedido
export interface OrderItem {
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

// Dados de exemplo para orçamentos disponíveis
const availableQuotes = [
  { id: "ORC-001", client: "Empresa ABC Ltda", total: 1250.0, date: "15/05/2023" },
  { id: "ORC-002", client: "João Silva ME", total: 780.0, date: "14/05/2023" },
  { id: "ORC-003", client: "Gráfica Rápida", total: 2340.0, date: "12/05/2023" },
]

// Dados de exemplo para um pedido existente (para edição)
const sampleOrder = {
  id: "PED-001",
  clientId: "1",
  date: new Date(),
  deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
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
  status: "production",
  paymentStatus: "partial",
  paymentMethod: "split",
  paymentDetails: "50% na aprovação, 50% na entrega",
  quoteId: "ORC-001",
}

export function OrderForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clientId, setClientId] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [deadline, setDeadline] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 10)))
  const [items, setItems] = useState<OrderItem[]>([])
  const [notes, setNotes] = useState("")
  const [discount, setDiscount] = useState(0)
  const [status, setStatus] = useState("new")
  const [paymentStatus, setPaymentStatus] = useState("pending")
  const [paymentMethod, setPaymentMethod] = useState("full")
  const [paymentDetails, setPaymentDetails] = useState("")
  const [quoteId, setQuoteId] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  // Carregar dados do pedido se estiver editando
  useEffect(() => {
    if (id) {
      // Aqui você faria uma chamada API para buscar os dados do pedido
      // Simulando com dados de exemplo
      setClientId(sampleOrder.clientId)
      setDate(sampleOrder.date)
      setDeadline(sampleOrder.deadline)
      setItems(sampleOrder.items)
      setNotes(sampleOrder.notes)
      setDiscount(sampleOrder.discount)
      setStatus(sampleOrder.status)
      setPaymentStatus(sampleOrder.paymentStatus)
      setPaymentMethod(sampleOrder.paymentMethod)
      setPaymentDetails(sampleOrder.paymentDetails)
      setQuoteId(sampleOrder.quoteId)
    }
  }, [id])

  const handleAddItem = () => {
    const newItem: OrderItem = {
      id: `item-${items.length + 1}`,
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (updatedItem: OrderItem) => {
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

  const handleQuoteSelect = (selectedQuoteId: string) => {
    setQuoteId(selectedQuoteId)
    // Aqui você faria uma chamada API para buscar os dados do orçamento
    // e preencher os campos do pedido

    // Simulando com dados de exemplo
    const quote = availableQuotes.find((q) => q.id === selectedQuoteId)
    if (quote) {
      const client = clients.find((c) => c.name === quote.client)
      if (client) {
        setClientId(client.id)
      }
      // Outros campos seriam preenchidos com dados reais do orçamento
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Aqui você faria uma chamada API para salvar o pedido
    // Simulando com um timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/pedidos")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="items">Itens do Pedido</TabsTrigger>
          <TabsTrigger value="payment">Pagamento e Status</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-medium">Informações do Pedido</h3>
                {!id && (
                  <Select value={quoteId} onValueChange={handleQuoteSelect}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecionar orçamento..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Criar pedido do zero</SelectItem>
                      {availableQuotes.map((quote) => (
                        <SelectItem key={quote.id} value={quote.id}>
                          {quote.id} - {quote.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

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
                  <Label htmlFor="deadline">
                    Prazo de Entrega <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "dd/MM/yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={(date) => date && setDeadline(date)}
                        initialFocus
                        locale={ptBR}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Informações adicionais, instruções especiais, detalhes de entrega..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/pedidos")}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => setActiveTab("items")}>
              Próximo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Itens do Pedido</h3>
                <Button type="button" onClick={handleAddItem}>
                  Adicionar Item
                </Button>
              </div>
              <OrderItemsTable items={items} onUpdateItem={handleUpdateItem} onRemoveItem={handleRemoveItem} />

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

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
              Voltar
            </Button>
            <Button type="button" onClick={() => setActiveTab("payment")}>
              Próximo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Status do Pedido</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Novo</SelectItem>
                          <SelectItem value="production">Em Produção</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                          <SelectItem value="delivered">Entregue</SelectItem>
                          <SelectItem value="canceled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Informações de Pagamento</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="paymentStatus">Status do Pagamento</Label>
                      <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                        <SelectTrigger id="paymentStatus">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="partial">Parcial</SelectItem>
                          <SelectItem value="paid">Pago</SelectItem>
                          <SelectItem value="refunded">Reembolsado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Método de Pagamento</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full" id="payment-full" />
                          <Label htmlFor="payment-full">Pagamento Total</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="split" id="payment-split" />
                          <Label htmlFor="payment-split">Pagamento Parcelado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit" id="payment-credit" />
                          <Label htmlFor="payment-credit">Faturado (a prazo)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="paymentDetails">Detalhes do Pagamento</Label>
                      <Textarea
                        id="paymentDetails"
                        placeholder="Forma de pagamento, condições, parcelas..."
                        value={paymentDetails}
                        onChange={(e) => setPaymentDetails(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setActiveTab("items")}>
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting || items.length === 0 || !clientId}>
              {isSubmitting ? "Salvando..." : id ? "Atualizar Pedido" : "Criar Pedido"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
