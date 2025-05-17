"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { FileText, Pencil } from "lucide-react"
import Link from "next/link"
import { QuoteStatusSelector } from "@/components/quotes/quote-status-selector"
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

export function QuoteDetails({ id }: { id: string }) {
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
  }, [id])

  const handleStatusChange = (newStatus: "pending" | "approved" | "rejected" | "expired") => {
    if (quote) {
      setQuote({ ...quote, status: newStatus })
      // Aqui você faria uma chamada API para atualizar o status do orçamento
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando detalhes do orçamento...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!quote) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Orçamento não encontrado.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Orçamento #{quote.id}
          </Badge>
          <QuoteStatusSelector status={quote.status} onStatusChange={handleStatusChange} />
        </div>
        <div className="flex gap-2">
          <Link href={`/orcamentos/${id}/imprimir`} target="_blank">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </Link>
          <Link href={`/orcamentos/${id}/editar`}>
            <Button>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Nome:</dt>
                <dd>{quote.client.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Email:</dt>
                <dd>{quote.client.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Telefone:</dt>
                <dd>{quote.client.phone}</dd>
              </div>
              {quote.client.company && (
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">Empresa:</dt>
                  <dd>{quote.client.company}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Orçamento</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Data:</dt>
                <dd>{quote.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Validade:</dt>
                <dd>{quote.validUntil}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Subtotal:</dt>
                <dd>{formatCurrency(quote.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Desconto:</dt>
                <dd>{formatCurrency(quote.discount)}</dd>
              </div>
              <div className="flex justify-between font-bold">
                <dt>Total:</dt>
                <dd>{formatCurrency(quote.total)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens do Orçamento</CardTitle>
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
              {quote.items.map((item) => (
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

      {quote.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{quote.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
