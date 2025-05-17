"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface StockMovement {
  id: string
  date: string
  type: "in" | "out" | "adjustment"
  quantity: number
  reference: string
  user: string
  balance: number
}

// Dados de exemplo para movimentações de estoque
const sampleStockMovements: StockMovement[] = [
  {
    id: "mov-001",
    date: "15/05/2023 09:30",
    type: "in",
    quantity: 10,
    reference: "Compra #123",
    user: "João Silva",
    balance: 10,
  },
  {
    id: "mov-002",
    date: "16/05/2023 14:20",
    type: "out",
    quantity: 2,
    reference: "Pedido #PED-001",
    user: "Maria Oliveira",
    balance: 8,
  },
  {
    id: "mov-003",
    date: "18/05/2023 11:15",
    type: "out",
    quantity: 3,
    reference: "Pedido #PED-002",
    user: "Maria Oliveira",
    balance: 5,
  },
  {
    id: "mov-004",
    date: "20/05/2023 16:45",
    type: "adjustment",
    quantity: -1,
    reference: "Inventário",
    user: "Pedro Santos",
    balance: 4,
  },
  {
    id: "mov-005",
    date: "22/05/2023 10:30",
    type: "in",
    quantity: 15,
    reference: "Compra #124",
    user: "João Silva",
    balance: 19,
  },
]

export function ProductStockHistory({ productId }: { productId: string }) {
  const [movements, setMovements] = useState<StockMovement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar as movimentações de estoque
    // Simulando com um timeout e dados de exemplo
    const fetchMovements = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setMovements(sampleStockMovements)
      setLoading(false)
    }

    fetchMovements()
  }, [productId])

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "in":
        return <Badge variant="success">Entrada</Badge>
      case "out":
        return <Badge variant="destructive">Saída</Badge>
      case "adjustment":
        return <Badge variant="outline">Ajuste</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  if (loading) {
    return <div className="py-4 text-center">Carregando histórico de estoque...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Referência</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhuma movimentação de estoque encontrada.
              </TableCell>
            </TableRow>
          ) : (
            movements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{movement.date}</TableCell>
                <TableCell>{getMovementBadge(movement.type)}</TableCell>
                <TableCell className={movement.quantity > 0 ? "text-green-600" : "text-red-600"}>
                  {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                </TableCell>
                <TableCell>{movement.reference}</TableCell>
                <TableCell>{movement.user}</TableCell>
                <TableCell className="font-medium">{movement.balance}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
