"use client"

import { useEffect, useState } from "react"
import { formatCurrency } from "@/lib/utils"
import type { QuoteItem } from "./quote-form"

interface Quote {
  id: string
  client: {
    id: string
    name: string
    email: string
    phone: string
    company?: string
  }
  date: string
  validUntil: string
  items: QuoteItem[]
  notes?: string
  subtotal: number
  discount: number
  total: number
  status: "pending" | "approved" | "rejected" | "expired"
}

// Dados de exemplo para um orçamento
const sampleQuote: Quote = {
  id: "ORC-001",
  client: {
    id: "1",
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com.br",
    phone: "(11) 98765-4321",
    company: "Empresa ABC",
  },
  date: "15/05/2023",
  validUntil: "15/06/2023",
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
  status: "pending",
}

export function QuotePrintView({ id }: { id: string }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os dados do orçamento
    // Simulando com um timeout e dados de exemplo
    const fetchQuote = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setQuote(sampleQuote)
      setLoading(false)
    }

    fetchQuote()

    // Acionar impressão automaticamente quando os dados estiverem carregados
    const printTimer = setTimeout(() => {
      if (!loading) {
        window.print()
      }
    }, 1000)

    return () => clearTimeout(printTimer)
  }, [id, loading])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando orçamento para impressão...</p>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Orçamento não encontrado.</p>
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
          <h2 className="text-2xl font-bold">Orçamento #{quote.id}</h2>
          <p>Data: {quote.date}</p>
          <p>Validade: {quote.validUntil}</p>
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
          <p className="font-medium">{quote.client.name}</p>
          {quote.client.company && <p>{quote.client.company}</p>}
          <p>Email: {quote.client.email}</p>
          <p>Tel: {quote.client.phone}</p>
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
          {quote.items.map((item, index) => (
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
            <td className="py-2 pr-2 text-right">{formatCurrency(quote.subtotal)}</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td className="py-2 text-right font-medium">Desconto:</td>
            <td className="py-2 pr-2 text-right">{formatCurrency(quote.discount)}</td>
          </tr>
          <tr className="font-bold">
            <td colSpan={3}></td>
            <td className="py-2 text-right">Total:</td>
            <td className="py-2 pr-2 text-right">{formatCurrency(quote.total)}</td>
          </tr>
        </tfoot>
      </table>

      {quote.notes && (
        <div className="mb-8 rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Observações</h3>
          <p className="whitespace-pre-line">{quote.notes}</p>
        </div>
      )}

      <div className="mb-8 rounded-lg border p-4">
        <h3 className="mb-2 font-semibold">Condições Gerais</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Este orçamento tem validade até {quote.validUntil}.</li>
          <li>Pagamento: 50% de entrada e 50% na entrega.</li>
          <li>Prazo de entrega: conforme acordado após aprovação do orçamento.</li>
          <li>Alterações no projeto podem gerar custos adicionais.</li>
        </ul>
      </div>

      <div className="mt-16 border-t border-gray-300 pt-8 text-center">
        <p className="mb-8">Para aprovar este orçamento, por favor entre em contato conosco.</p>
        <div className="mx-auto w-64 border-t border-gray-300 pt-4">
          <p>Assinatura do Cliente</p>
        </div>
      </div>
    </div>
  )
}
