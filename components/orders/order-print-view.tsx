"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import type { OrderItem } from "./order-form"

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

export function OrderPrintView({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os dados do pedido
    // Simulando com um timeout e dados de exemplo
    const fetchOrder = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOrder(sampleOrder)
      setLoading(false)
    }

    fetchOrder()

    // Acionar impressão automaticamente quando os dados estiverem carregados
    const printTimer = setTimeout(() => {
      if (!loading) {
        window.print()
      }
    }, 1000)

    return () => clearTimeout(printTimer)
  }, [id, loading])

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Novo"
      case "production":
        return "Em Produção"
      case "completed":
        return "Concluído"
      case "delivered":
        return "Entregue"
      case "canceled":
        return "Cancelado"
      default:
        return "Desconhecido"
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "partial":
        return "Parcial"
      case "paid":
        return "Pago"
      case "refunded":
        return "Reembolsado"
      default:
        return "Desconhecido"
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando pedido para impressão...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Pedido não encontrado.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">R7 Print Manager</h1>
          <p className="text-muted-foreground">Comunicação Visual & Gráfica</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold">Pedido #{order.id}</h2>
          <p>Data: {order.date}</p>
          <p>Prazo de Entrega: {order.deadline}</p>
        </div>
      </div>

      <div className="mb-8 grid gap-6 rounded-lg border p-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold">Dados da Empresa</h3>
          <p>R7 Print Manager Ltda</p>
          <p>CNPJ: 12.345.678/0001-90</p>
          <p>Rua Exemplo, 123 - Centro</p>
          <p>São Paulo - SP, 01234-567</p>
          <p>Tel: (11) 1234-5678</p>
          <p>Email: contato@r7printmanager.com.br</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Cliente</h3>
          <p className="font-medium">{order.client.name}</p>
          {order.client.company && <p>{order.client.company}</p>}
          <p>Email: {order.client.email}</p>
          <p>Tel: {order.client.phone}</p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 rounded-lg border p-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold">Informações do Pedido</h3>
          <p>Status: {getStatusText(order.status)}</p>
          <p>Pagamento: {getPaymentStatusText(order.paymentStatus)}</p>
          {order.quoteId && <p>Orçamento: #{order.quoteId}</p>}
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Pagamento</h3>
          <p>
            Método:{" "}
            {order.paymentMethod === "full"
              ? "Pagamento Total"
              : order.paymentMethod === "split"
                ? "Pagamento Parcelado"
                : "Faturado (a prazo)"}
          </p>
          {order.paymentDetails && <p>Detalhes: {order.paymentDetails}</p>}
        </div>
      </div>

      <table className="mb-8 w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-left">
            <th className="py-2 pl-2">Item</th>
            <th className="py-2">Descrição</th>
            <th className="py-2 text-center">Qtd</th>
            <th className="py-2 text-right">Valor Unit.</th>
            <th className="py-2 pr-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-2 pl-2">{item.product}</td>
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-center">{item.quantity}</td>
              <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
              <td className="py-2 pr-2 text-right">{formatCurrency(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td className="py-2 text-right font-medium">Subtotal:</td>
            <td className="py-2 pr-2 text-right">{formatCurrency(order.subtotal)}</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td className="py-2 text-right font-medium">Desconto:</td>
            <td className="py-2 pr-2 text-right">{formatCurrency(order.discount)}</td>
          </tr>
          <tr className="font-bold">
            <td colSpan={3}></td>
            <td className="py-2 text-right">Total:</td>
            <td className="py-2 pr-2 text-right">{formatCurrency(order.total)}</td>
          </tr>
        </tfoot>
      </table>

      {order.notes && (
        <div className="mb-8 rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Observações</h3>
          <p className="whitespace-pre-line">{order.notes}</p>
        </div>
      )}

      <div className="mb-8 rounded-lg border p-4">
        <h3 className="mb-2 font-semibold">Termos e Condições</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Prazo de entrega conforme especificado acima.</li>
          <li>Pagamento conforme condições acordadas.</li>
          <li>Alterações no projeto após aprovação podem gerar custos adicionais.</li>
          <li>Reclamações devem ser feitas em até 48 horas após a entrega.</li>
        </ul>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-300 pt-8 text-center">
        <div>
          <div className="mx-auto w-64 border-t border-gray-300 pt-4">
            <p>Assinatura do Cliente</p>
          </div>
        </div>
        <div>
          <div className="mx-auto w-64 border-t border-gray-300 pt-4">
            <p>Assinatura da Empresa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
