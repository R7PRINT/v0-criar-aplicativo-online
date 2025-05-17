"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

// Dados de exemplo para orçamentos
const quotes = [
  {
    id: "ORC-001",
    client: "Empresa ABC Ltda",
    items: 5,
    total: 1250.0,
    date: "15/05/2023",
    validUntil: "15/06/2023",
    status: "pending",
  },
  {
    id: "ORC-002",
    client: "João Silva ME",
    items: 3,
    total: 780.0,
    date: "14/05/2023",
    validUntil: "14/06/2023",
    status: "approved",
  },
  {
    id: "ORC-003",
    client: "Gráfica Rápida",
    items: 8,
    total: 2340.0,
    date: "12/05/2023",
    validUntil: "12/06/2023",
    status: "expired",
  },
  {
    id: "ORC-004",
    client: "Maria Comunicação Visual",
    items: 12,
    total: 4500.0,
    date: "10/05/2023",
    validUntil: "10/06/2023",
    status: "rejected",
  },
  {
    id: "ORC-005",
    client: "Pedro Oliveira Design",
    items: 2,
    total: 650.0,
    date: "08/05/2023",
    validUntil: "08/06/2023",
    status: "pending",
  },
]

export function QuotesTable() {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedQuotes.length === quotes.length) {
      setSelectedQuotes([])
    } else {
      setSelectedQuotes(quotes.map((quote) => quote.id))
    }
  }

  const toggleSelectQuote = (id: string) => {
    if (selectedQuotes.includes(id)) {
      setSelectedQuotes(selectedQuotes.filter((quoteId) => quoteId !== id))
    } else {
      setSelectedQuotes([...selectedQuotes, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pendente</Badge>
      case "approved":
        return <Badge variant="success">Aprovado</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>
      case "expired":
        return <Badge variant="secondary">Expirado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
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
                checked={selectedQuotes.length === quotes.length && quotes.length > 0}
                onChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Número</TableHead>
            <TableHead className="hidden md:table-cell">Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Itens</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead className="hidden lg:table-cell">Validade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedQuotes.includes(quote.id)}
                  onChange={() => toggleSelectQuote(quote.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{quote.id}</TableCell>
              <TableCell className="hidden md:table-cell">{quote.client}</TableCell>
              <TableCell className="hidden md:table-cell">{quote.items}</TableCell>
              <TableCell>{formatCurrency(quote.total)}</TableCell>
              <TableCell className="hidden md:table-cell">{quote.date}</TableCell>
              <TableCell className="hidden lg:table-cell">{quote.validUntil}</TableCell>
              <TableCell>{getStatusBadge(quote.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/orcamentos/${quote.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/orcamentos/${quote.id}/editar`}>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/orcamentos/${quote.id}/imprimir`} target="_blank">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Imprimir
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
