"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { FileText, Pencil, DollarSign, ClipboardList } from "lucide-react"
import Link from "next/link"
import { OrderStatusSelector } from "@/components/orders/order-status-selector"
import { OrderPaymentStatusSelector } from "@/components/orders/order-payment-status-selector"
import { OrderTimeline } from "@/components/orders/order-timeline"
import { OrderPayments } from "@/components/orders/order-payments"
import type { OrderItem } from "./order-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Order {
  id: string
  client: {
    id: string
    name: string
    email: string
    phone: string
    company?: string
  }
  date: string
  deadline: string
  items: OrderItem[]
  notes?: string
  subtotal: number
  discount: number
  total: number
  status: "new" | "production" | "completed" | "delivered" | "canceled"
  paymentStatus: "pending" | "partial" | "paid" | "refunded"
  paymentMethod: "full" | "split" | "credit"
  paymentDetails?: string
  quoteId?: string
}

// Dados de exemplo para um pedido
const sampleOrder: Order = {
  id: "PED-001",
  client: {
    id: "1",
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com.br",
    phone: "(11) 98765-4321",
    company: "Empresa ABC",
  },
  date: "15/05/2023",
  deadline: "25/05/2023",
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

export function OrderDetails({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os dados do pedido
    // Simulando com um timeout e dados de exemplo
    const fetchOrder = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOrder(sampleOrder)
      setLoading(false)
    }

    fetchOrder()
  }, [id])

  const handleStatusChange = (newStatus: "new" | "production" | "completed" | "delivered" | "canceled") => {
    if (order) {
      setOrder({ ...order, status: newStatus })
      // Aqui você faria uma chamada API para atualizar o status do pedido
    }
  }

  const handlePaymentStatusChange = (newStatus: "pending" | "partial" | "paid" | "refunded") => {
    if (order) {
      setOrder({ ...order, paymentStatus: newStatus })
      // Aqui você faria uma chamada API para atualizar o status de pagamento
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando detalhes do pedido...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Pedido não encontrado.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Pedido #{order.id}
          </Badge>
          <OrderStatusSelector status={order.status} onStatusChange={handleStatusChange} />
          <OrderPaymentStatusSelector status={order.paymentStatus} onStatusChange={handlePaymentStatusChange} />
          {order.quoteId && (
            <Link href={`/orcamentos/${order.quoteId}`}>
              <Badge variant="secondary" className="cursor-pointer">
                <ClipboardList className="mr-1 h-3 w-3" />
                Orçamento #{order.quoteId}
              </Badge>
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/pedidos/${id}/pagamentos`}>
            <Button variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Pagamentos
            </Button>
          </Link>
          <Link href={`/pedidos/${id}/imprimir`} target="_blank">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </Link>
          <Link href={`/pedidos/${id}/editar`}>
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
          <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Nome:</dt>
                    <dd>{order.client.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Email:</dt>
                    <dd>{order.client.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Telefone:</dt>
                    <dd>{order.client.phone}</dd>
                  </div>
                  {order.client.company && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">Empresa:</dt>
                      <dd>{order.client.company}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Data:</dt>
                    <dd>{order.date}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Prazo de Entrega:</dt>
                    <dd>{order.deadline}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Método de Pagamento:</dt>
                    <dd>
                      {order.paymentMethod === "full"
                        ? "Pagamento Total"
                        : order.paymentMethod === "split"
                          ? "Pagamento Parcelado"
                          : "Faturado (a prazo)"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Subtotal:</dt>
                    <dd>{formatCurrency(order.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Desconto:</dt>
                    <dd>{formatCurrency(order.discount)}</dd>
                  </div>
                  <div className="flex justify-between font-bold">
                    <dt>Total:</dt>
                    <dd>{formatCurrency(order.total)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Itens do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="hidden md:table-cell">Descrição</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Valor Unit.</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{order.notes}</p>
              </CardContent>
            </Card>
          )}

          {order.paymentDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{order.paymentDetails}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          <OrderTimeline orderId={id} />
        </TabsContent>

        <TabsContent value="payments">
          <OrderPayments orderId={id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
